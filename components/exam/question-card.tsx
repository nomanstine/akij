import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Timer } from './timer';
import { Option } from './option';
import { cn } from '@/lib/utils';
import { RichTextEditorMock } from '@/components/ui/rich-text-editor-mock';
import { Question } from '@/lib/schemas';

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
              <RichTextEditorMock 
                placeholder="Type your answer here..."
                value={selectedOption || richTextAnswer}
                onChange={handleRichTextChange}
              />
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