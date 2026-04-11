import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Timer } from './timer';
import { Option } from './option';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const CustomUndo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.5 10.25H8.88438L11.1263 8.00875L10.25 7.125L6.5 10.875L10.25 14.625L11.1263 13.7406L8.88625 11.5H16.5C17.4946 11.5 18.4484 11.8951 19.1517 12.5983C19.8549 13.3016 20.25 14.2554 20.25 15.25C20.25 16.2446 19.8549 17.1984 19.1517 17.9017C18.4484 18.6049 17.4946 19 16.5 19H11.5V20.25H16.5C17.8261 20.25 19.0979 19.7232 20.0355 18.7855C20.9732 17.8479 21.5 16.5761 21.5 15.25C21.5 13.9239 20.9732 12.6521 20.0355 11.7145C19.0979 10.7768 17.8261 10.25 16.5 10.25Z" fill="#212529"/>
  </svg>

);

const CustomRedo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.5 10.25H19.1156L16.8737 8.00875L17.75 7.125L21.5 10.875L17.75 14.625L16.8737 13.7406L19.1137 11.5H11.5C10.5054 11.5 9.55161 11.8951 8.84835 12.5983C8.14509 13.3016 7.75 14.2554 7.75 15.25C7.75 16.2446 8.14509 17.1984 8.84835 17.9017C9.55161 18.6049 10.5054 19 11.5 19H16.5V20.25H11.5C10.1739 20.25 8.90215 19.7232 7.96447 18.7855C7.02678 17.8479 6.5 16.5761 6.5 15.25C6.5 13.9239 7.02678 12.6521 7.96447 11.7145C8.90215 10.7768 10.1739 10.25 11.5 10.25Z" fill="#212529"/>
  </svg>

);

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

  const modules = useMemo(() => ({
    toolbar: {
      container: `#toolbar-${question.id}`,
      handlers: {
        undo: function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.quill.history.undo();
        },
        redo: function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.quill.history.redo();
        }
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  }), [question.id]);

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
              <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                <style>{`
                  .quill {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                  }
                  .ql-container {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    border-width: 0px 1px 1px 1px !important;
                    border-style: solid !important;
                    border-color: #E5E7EB !important;
                    border-radius: 0px 0px 8px 8px !important;
                  }
                  .ql-editor {
                    min-height: 181px;
                    padding: 14px 16px;
                    line-height: 150%;
                    color: #000000;
                  }
                  .ql-editor.ql-blank::before {
                    color: #94A3B8;
                    font-style: normal;
                    font-weight: 400;
                  }
                  .ql-toolbar {
                    background: #F9FAFB;
                    border-width: 1px 1px 0px 1px !important;
                    border-style: solid !important;
                    border-color: #E5E7EB !important;
                    border-radius: 8px 8px 0px 0px !important;
                    padding: 8px !important;
                    display: flex !important;
                    flex-direction: row;
                    align-items: flex-start;
                    gap: 8px;
                    height: 44px;
                    box-sizing: border-box;
                  }
                  .ql-formats {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    gap: 2px;
                    margin-right: 0 !important;
                    padding: 0px;
                  }
                  .ql-toolbar button {
                    width: 28px !important;
                    height: 28px !important;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0px 4px !important;
                    gap: 2px;
                  }
                  .ql-toolbar button:hover {
                    background: #E9ECEF;
                  }
                  .ql-toolbar svg {
                    width: 20px;
                    height: 20px;
                  }
                `}</style>
                <div id={`toolbar-${question.id}`} className="ql-toolbar ql-snow">
                  <span className="ql-formats">
                    <button type="button" className="ql-undo">
                      <CustomUndo />
                    </button>
                    <button type="button" className="ql-redo">
                      <CustomRedo />
                    </button>
                  </span>
                  <span className="ql-formats">
                    <select className="ql-header" defaultValue="">
                      <option value="1">Heading 1</option>
                      <option value="2">Heading 2</option>
                      <option value="3">Heading 3</option>
                      <option value="">Normal text</option>
                    </select>
                  </span>
                  <span className="ql-formats">
                    <button type="button" className="ql-list" value="ordered"></button>
                    <button type="button" className="ql-list" value="bullet"></button>
                  </span>
                  <span className="ql-formats">
                    <button type="button" className="ql-bold"></button>
                    <button type="button" className="ql-italic"></button>
                    <button type="button" className="ql-underline"></button>
                  </span>
                </div>
                <ReactQuill
                  theme="snow"
                  value={richTextAnswer}
                  onChange={handleRichTextChange}
                  placeholder="Type your answer here..."
                  modules={modules}
                  formats={[
                    'header', 'bold', 'italic', 'underline',
                    'list'
                  ]}
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