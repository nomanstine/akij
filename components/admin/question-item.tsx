import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'text';
  points: number;
  options?: QuestionOption[];
  correctAnswer?: string;
}

interface QuestionItemProps {
  question: Question;
  questionNumber: number;
  onEdit: (questionId: string) => void;
  onRemove: (questionId: string) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  questionNumber,
  onEdit,
  onRemove,
}) => {
  return (
    <Card className="p-6 bg-white border border-gray-200 rounded-lg">
      <div className="space-y-4">
        {/* Question Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-gray-900">
              Question {questionNumber}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
              {question.type.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
              {question.points} pt
            </span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Question Text */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-black">
            {question.text}
          </h3>

          {/* Options for MCQ */}
          {question.type === 'mcq' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={option.id}
                  className={`p-3 rounded-lg border ${
                    option.isCorrect ? 'bg-gray-100 border-gray-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium">
                      {String.fromCharCode(65 + index)}. {option.text}
                    </span>
                    {option.isCorrect && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Text Answer */}
          {question.type === 'text' && question.correctAnswer && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-700">{question.correctAnswer}</p>
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => onEdit(question.id)}
            className="text-violet-600 hover:text-violet-500 font-medium text-base"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(question.id)}
            className="text-red-600 hover:text-red-500 font-medium text-base"
          >
            Remove From Exam
          </button>
        </div>
      </div>
    </Card>
  );
};