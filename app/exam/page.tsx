'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { QuestionCard, NavigationButtons, TimeoutModal } from '@/components/exam';
import { mockQuestions, tests, type Question } from '@/mockdata/data';

interface Answer {
  questionId: string;
  optionId?: string;
  text?: string;
}

interface Answer {
  questionId: string;
  optionId?: string;
  text?: string;
}

const INITIAL_TIME_SECONDS = 0 * 60 + 10; // Fallback if duration cannot be parsed

const parseDurationToSeconds = (duration?: string) => {
  const minutesMatch = duration?.match(/(\d+)\s*min/i);
  if (!minutesMatch) return INITIAL_TIME_SECONDS;
  return Number(minutesMatch[1]) * 60;
};

const ExamPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const testId = searchParams.get('testId');
  const selectedTest = tests.find((test) => test.id === Number(testId));
  const examQuestions: Question[] = selectedTest?.questions ?? mockQuestions;
  const initialTime = selectedTest ? parseDurationToSeconds(selectedTest.duration) : INITIAL_TIME_SECONDS;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  if (!selectedTest) {
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

  const currentQuestion = examQuestions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === examQuestions.length - 1;

  useEffect(() => {
    if (currentQuestion.type !== 'rich-text') {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      setCurrentSelectedOption(existingAnswer?.optionId ?? null);
    }
  }, [currentQuestionIndex, answers, currentQuestion.id, currentQuestion.type]);

  const handleTimeUp = useCallback(() => {
    // Show timeout modal when time runs out
    setShowTimeoutModal(true);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      handleTimeUp();
    }
  }, [timeLeft, handleTimeUp]);

  const handleAnswerSelect = useCallback((questionId: string, answer: string) => {
    const currentQuestion = examQuestions.find((q: Question) => q.id === questionId);
    if (currentQuestion?.type === 'rich-text') {
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
  }, []);

  const handleSkip = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentSelectedOption(null);
    }
  }, [isLastQuestion]);

  const handleSaveContinue = useCallback(() => {
    if (currentQuestion.type === 'rich-text') {
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
  }, [currentSelectedOption, currentQuestion.id, isLastQuestion, currentQuestion.type, answers]);

  const handleSubmit = useCallback(() => {
    // Handle exam submission
    console.log('Submitting exam with answers:', answers);
    // In a real app, this would send data to an API
    router.push('/exam/completed');
  }, [answers, router]);

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