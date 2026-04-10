import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Timer } from './timer';
import { Option } from './option';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  type?: 'multiple-choice' | 'rich-text';
  options?: { id: string; text: string }[];
}

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  selectedOption?: string | null;
  onAnswerSelect?: (questionId: string, optionId: string) => void;
  onTimeUp?: () => void;
  className?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentQuestion,
  totalQuestions,
  timeLeft,
  selectedOption,
  onAnswerSelect,
  onTimeUp,
  className
}) => {
  const [richTextAnswer, setRichTextAnswer] = useState('');

  const handleOptionSelect = (optionId: string) => {
    onAnswerSelect?.(question.id, optionId);
  };

  const handleRichTextChange = (value: string) => {
    setRichTextAnswer(value);
    onAnswerSelect?.(question.id, value);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with question number and timer */}
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-700">
            Question ({currentQuestion}/{totalQuestions})
          </h2>
          <Timer initialTime={timeLeft} onTimeUp={onTimeUp} />
        </div>
      </Card>

      {/* Question and options */}
      <Card className="p-6">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-700">
            {question.text}
          </h3>

          {question.type === 'rich-text' ? (
            <div className="space-y-4">
              {/* Simple rich text editor placeholder */}
              <div className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex gap-2">
                  <button className="p-1 hover:bg-gray-200 rounded">B</button>
                  <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
                  <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
                </div>
                <textarea
                  className="w-full p-4 min-h-52 border-0 resize-none focus:outline-none"
                  placeholder="Type your answer here..."
                  value={richTextAnswer}
                  onChange={(e) => handleRichTextChange(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {question.options?.map((option) => (
                <Option
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  isSelected={selectedOption === option.id}
                  onSelect={handleOptionSelect}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};