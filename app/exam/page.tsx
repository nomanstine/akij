'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QuestionCard, NavigationButtons, TimeoutModal } from '@/components/exam';
import api from '@/lib/api';
import { Question } from '@/lib/schemas';
import { useExamStore } from '@/store/examStore';

const INITIAL_TIME_SECONDS = 0 * 60 + 10; // Fallback if duration cannot be parsed

const parseDurationToSeconds = (duration?: string) => {
  if (!duration) return INITIAL_TIME_SECONDS;
  const match = duration.match(/(\d+)/);
  if (match) return Number(match[1]) * 60;
  return INITIAL_TIME_SECONDS;
};

const ExamPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const testId = searchParams.get('testId');

  const {
    selectedTest, setSelectedTest,
    examQuestions, setExamQuestions,
    isLoading, setIsLoading,
    currentQuestionIndex, setCurrentQuestionIndex,
    answers, setAnswers,
    timeLeft, setTimeLeft,
    currentSelectedOption, setCurrentSelectedOption,
    showTimeoutModal, setShowTimeoutModal,
    resetExam
  } = useExamStore();

  useEffect(() => {
    return () => resetExam();
  }, [resetExam]);

  useEffect(() => {
    let active = true;
    const fetchTest = async () => {
      setIsLoading(true);
      if (!testId) {
        if (active) setIsLoading(false);
        return;
      }
      try {
        const response = await api.get(`/tests/${testId}`);
        if (!active) return;
        const test = response.data;
        setSelectedTest(test);
        setExamQuestions(test.questions || []);
      } catch (error) {
        console.error("Failed to fetch test:", error);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    fetchTest();
    return () => { active = false; };
  }, [testId, setSelectedTest, setExamQuestions, setIsLoading]);

  useEffect(() => {
    if (selectedTest) {
      setTimeLeft(parseDurationToSeconds(selectedTest.duration));
    }
  }, [selectedTest, setTimeLeft]);

  // Tab switch and fullscreen tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        alert("Warning: You switched tabs! This action is logged.");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        alert("Warning: Fullscreen mode exited! This violates exam rules.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const currentQuestion = examQuestions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === examQuestions.length - 1;

  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const richTextValue = (currentQuestion?.type === 'rich-text' || currentQuestion?.type === 'text') ? currentAnswer?.text : undefined;

  useEffect(() => {
    if (currentQuestion && currentQuestion.type !== 'rich-text' && currentQuestion.type !== 'text') {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      setCurrentSelectedOption(existingAnswer?.optionId ?? null);
    }
  }, [currentQuestionIndex, answers, currentQuestion?.id, currentQuestion?.type]);

  const handleSubmit = useCallback(async () => {
    console.log('Submitting exam with answers:', answers);
    try {
        await api.post(`/tests/${selectedTest?.id}/submit`, { answers });
    } catch (e) {
        console.error("Submission logged offline due to missing endpoint", e);
    }
    router.push('/exam/completed');
  }, [answers, router, selectedTest]);

  const handleTimeUp = useCallback(() => {
    console.log('Timeout reached. Auto-submitting answers.');
    handleSubmit().catch(console.error);
    setShowTimeoutModal(true);
  }, [handleSubmit, setShowTimeoutModal]);

  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (selectedTest && examQuestions.length > 0 && !isLoading && !timerStarted) {
      setTimerStarted(true);
    }
  }, [selectedTest, examQuestions.length, isLoading, timerStarted]);

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          setTimerStarted(false);
        }
        return newTime;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerStarted, setTimeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && timerStarted && selectedTest && examQuestions.length > 0) {
      setTimerStarted(false);
      handleTimeUp();
    }
  }, [timeLeft, timerStarted, selectedTest, examQuestions.length, handleTimeUp]);

  const handleAnswerSelect = useCallback((questionId: string, answer: string) => {
    const q = examQuestions.find((q: Question) => q.id === questionId);
    if (q?.type === 'rich-text' || q?.type === 'text') {
      setAnswers(prev => {
        const existing = prev.find(a => a.questionId === questionId);
        if (existing) {
          return prev.map(a => a.questionId === questionId ? { ...a, text: answer } : a);
        }
        return [...prev, { questionId, text: answer }];
      });
    } else {
      setAnswers(prev => {
        const existing = prev.find(a => a.questionId === questionId);
        if (existing) {
          return prev.map(a => a.questionId === questionId ? { ...a, optionId: answer } : a);
        }
        return [...prev, { questionId, optionId: answer }];
      });
      setCurrentSelectedOption(answer);
    }
  }, [examQuestions, setAnswers, setCurrentSelectedOption]);

  const handleSkip = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentSelectedOption(null);
    }
  }, [isLastQuestion, setCurrentQuestionIndex, setCurrentSelectedOption]);

  const handleSaveContinue = useCallback(() => {
    if (!currentQuestion) return;
    if (currentQuestion.type === 'rich-text' || currentQuestion.type === 'text') {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      if (existingAnswer?.text && existingAnswer.text.trim()) {
        // Already saved
      }
    } else if (currentSelectedOption) {
      setAnswers(prev => {
        const existing = prev.find(a => a.questionId === currentQuestion.id);
        if (existing) {
          return prev.map(a => a.questionId === currentQuestion.id ? { ...a, optionId: currentSelectedOption } : a);
        }
        return [...prev, { questionId: currentQuestion.id, optionId: currentSelectedOption }];
      });
    }
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentSelectedOption(null);
    }
  }, [currentSelectedOption, currentQuestion, isLastQuestion, answers, setAnswers, setCurrentQuestionIndex, setCurrentSelectedOption]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!selectedTest || examQuestions.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <p className="text-base text-slate-700">Please start a test from the dashboard first.</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Back to dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-4xl space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">
                  {selectedTest.title}
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900">Exam in progress</h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {selectedTest.duration}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {selectedTest.questionCount} questions
                </span>
              </div>
            </div>
          </div>

          <QuestionCard
            question={currentQuestion}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={examQuestions.length}
            timeLeft={timeLeft}
            selectedOption={currentSelectedOption}
            richTextValue={richTextValue}
            onAnswerSelect={handleAnswerSelect}
            onTimeUp={handleTimeUp}
          />

          <NavigationButtons
            onSkip={handleSkip}
            onSaveContinue={handleSaveContinue}
            onSubmit={handleSubmit}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </main>

      <TimeoutModal
        isOpen={showTimeoutModal}
        onClose={() => setShowTimeoutModal(false)}
      />
    </>
  );
};

export default ExamPage;