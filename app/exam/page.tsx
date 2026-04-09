'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionCard, NavigationButtons, TimeoutModal } from '@/components/exam';
import { mockQuestions } from '@/mockdata/data';

interface Question {
  id: string;
  text: string;
  type?: 'multiple-choice' | 'rich-text';
  options?: { id: string; text: string }[];
}

interface Answer {
  questionId: string;
  optionId?: string;
  text?: string;
}

const INITIAL_TIME_SECONDS = 0 * 60 + 10; // Change this value to set any time you want (in seconds)

const ExamPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_SECONDS);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string | null>(null);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1;

  useEffect(() => {
    if (currentQuestion.type !== 'rich-text') {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      setCurrentSelectedOption(existingAnswer ? existingAnswer.optionId : null);
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
    const currentQuestion = mockQuestions.find(q => q.id === questionId);
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
          <QuestionCard
            question={currentQuestion}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={mockQuestions.length}
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