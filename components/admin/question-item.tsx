import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/lib/schemas';

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
          {(question.type === 'mcq' || question.type === 'radio' || question.type === 'checkbox' || question.type === 'multiple-choice') && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={option.id}
                  className={`p-3 rounded-lg border ${
                    option.isCorrect ? 'bg-gray-100 border-gray-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {option.isCorrect ? (
                        <div className="w-5 h-5 rounded-full bg-green-500 border border-green-500 flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 shrink-0"></div>
                      )}
                      <span className="text-gray-700 font-medium">
                        {String.fromCharCode(65 + index)}. {option.text}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Text Answer */}
          {(question.type === 'text' || question.type === 'rich-text') && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-700">{question.correctAnswer || "No correct answer provided."}</p>
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