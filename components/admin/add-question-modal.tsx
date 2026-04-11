import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RichTextEditorMock } from '@/components/ui/rich-text-editor-mock';
import { Question, QuestionSchema, QuestionType, QuestionOption } from '@/lib/schemas';

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  questionNumber: number;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  questionNumber
}) => {
  const [questionType, setQuestionType] = useState<'checkbox' | 'radio' | 'text'>('checkbox');
  const [score, setScore] = useState(1);
  const [options, setOptions] = useState([
    { id: '1', text: '', isCorrect: false },
    { id: '2', text: '', isCorrect: false },
    { id: '3', text: '', isCorrect: false },
  ]);

  if (!isOpen) return null;

  const letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const handleAddOption = () => {
    if (options.length >= letterArray.length) return;
    setOptions([...options, { id: Date.now().toString(), text: '', isCorrect: false }]);
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };

  const handleOptionChange = (id: string, isCorrect: boolean) => {
    if (questionType === 'radio' && isCorrect) {
      setOptions(options.map(o => ({ ...o, isCorrect: o.id === id })));
    } else {
      setOptions(options.map(o => (o.id === id ? { ...o, isCorrect } : o)));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl my-auto flex flex-col shadow-xl">
        <div className="p-8 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-sm font-semibold text-slate-600">
                {questionNumber}
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Question {questionNumber}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Score:</span>
                <input 
                  type="number" 
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-16 h-10 border border-slate-200 rounded-lg text-center font-medium outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 px-3 h-10 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <span className="text-sm font-medium text-slate-700">
                      {questionType === 'checkbox' ? 'Checkbox' : questionType === 'radio' ? 'Radio' : 'Text'}
                    </span>
                    <ChevronDown className="size-4 text-slate-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[100]">
                  <DropdownMenuItem onClick={() => setQuestionType('checkbox')}>
                    Checkbox (Multiple Answers)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuestionType('radio')}>
                    Radio (Single Answer)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuestionType('text')}>
                    Text (Written Answer)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button 
                type="button"
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                onClick={onClose}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Question Text Area */}
          <RichTextEditorMock placeholder="Type your question here..." />

          {/* Options */}
          {questionType !== 'text' ? (
            <>
              <div className="flex flex-col gap-8 mt-4">
                {options.map((option, index) => (
                  <div key={option.id} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-sm font-medium text-slate-500 shrink-0">
                          {letterArray[index]}
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          {questionType === 'checkbox' ? (
                            <Checkbox 
                              id={`correct-${option.id}`} 
                              checked={option.isCorrect}
                              onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
                              className="rounded-sm border-slate-300"
                            />
                          ) : (
                            <input 
                              type="radio" 
                              name={`correct-answer-${questionNumber}`}
                              id={`correct-${option.id}`}
                              checked={option.isCorrect}
                              onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                              className="size-4 text-violet-600 focus:ring-violet-600 border-slate-300"
                            />
                          )}
                          <span className="text-sm text-slate-600">Set as correct answer</span>
                        </label>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveOption(option.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                    <RichTextEditorMock placeholder={`Option ${letterArray[index]}`} />
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button 
                  type="button"
                  onClick={handleAddOption}
                  className="flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 hover:bg-violet-50 py-2 px-3 rounded-lg transition-colors -ml-3"
                >
                  <Plus className="size-4" /> Another options
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">Expected Ideal Answer (Optional)</h3>
              <RichTextEditorMock placeholder="Type the expected answer or keywords here to assist grading..." />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-6 flex justify-end gap-4 bg-white rounded-b-2xl">
          <Button 
            variant="outline" 
            onClick={() => {
              const newQuestion = {
                id: Date.now().toString(),
                text: 'New Question', // In reality, this would come from a text input
                type: questionType === 'text' ? 'text' : ('mcq' as const),
                points: score,
                options: questionType !== 'text' ? options : undefined
              };
              
              const result = QuestionSchema.safeParse(newQuestion);
              if (result.success) {
                onSave(result.data);
                onClose();
              } else {
                console.error("Validation failed:", result.error);
                onClose();
              }
            }}
            className="border-violet-600 text-violet-600 hover:bg-violet-50 hover:text-violet-700 font-semibold px-8 h-12 rounded-xl"
          >
            Save
          </Button>
          <Button 
            className="button-primary font-bold px-8 h-12 rounded-xl"
            onClick={() => {
              const newQuestion = {
                id: Date.now().toString(),
                text: 'New Question', // In reality, this would come from a text input
                type: questionType === 'text' ? 'text' : ('mcq' as const),
                points: score,
                options: questionType !== 'text' ? options : undefined
              };
              
              const result = QuestionSchema.safeParse(newQuestion);
              if (result.success) {
                onSave(result.data);
              } else {
                console.error("Validation failed:", result.error);
              }
            }}
          >
            Save & Add More
          </Button>
        </div>
      </div>
    </div>
  );
};
