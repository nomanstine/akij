"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuestionItem } from "@/components/admin";

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

export default function CreateTestPage() {
  const [currentStep, setCurrentStep] = useState<'basic' | 'questions'>('basic');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'What is the Capital of Bangladesh?',
      type: 'mcq',
      points: 1,
      options: [
        { id: 'a', text: 'Dhaka', isCorrect: true },
        { id: 'b', text: 'Chattogram', isCorrect: false },
        { id: 'c', text: 'Rajshahi', isCorrect: false },
        { id: 'd', text: 'Barishal', isCorrect: false },
      ],
    },
    {
      id: '2',
      text: 'What is the Capital of Bangladesh?',
      type: 'mcq',
      points: 1,
      options: [
        { id: 'a', text: 'Dhaka', isCorrect: true },
        { id: 'b', text: 'Chattogram', isCorrect: false },
        { id: 'c', text: 'Rajshahi', isCorrect: false },
        { id: 'd', text: 'Barishal', isCorrect: false },
      ],
    },
    {
      id: '3',
      text: 'Write a brief of your capital city',
      type: 'text',
      points: 5,
      correctAnswer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.',
    },
  ]);

  const handleEditQuestion = (questionId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit question:', questionId);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleAddQuestion = () => {
    // TODO: Implement add question modal/form
    console.log('Add new question');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Card className="mb-6 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Manage Online Test</h1>
            <Button variant="outline">Back to Dashboard</Button>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={() => setCurrentStep('basic')}
              className={`flex items-center space-x-2 ${currentStep === 'basic' ? 'text-[#6633FF]' : 'text-gray-500'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'basic' ? 'bg-[#6633FF] text-white' : 'bg-gray-300 text-white'
              }`}>
                1
              </div>
              <span className="font-medium">Basic Info</span>
            </button>
            <div className="w-20 h-px bg-gray-400"></div>
            <button
              onClick={() => setCurrentStep('questions')}
              className={`flex items-center space-x-2 ${currentStep === 'questions' ? 'text-[#6633FF]' : 'text-gray-500'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'questions' ? 'bg-[#6633FF] text-white' : 'bg-gray-300 text-white'
              }`}>
                2
              </div>
              <span className="font-medium">Questions Sets</span>
            </button>
          </div>
        </Card>

        {currentStep === 'basic' ? (
          /* Basic Info Form */
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

            <div className="space-y-6">
              {/* Test Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                    placeholder="Enter test name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                    placeholder="Enter description"
                  />
                </div>
              </div>

              {/* Category and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                      placeholder="Select category"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                      placeholder="Enter duration"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Time and End Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                      placeholder="Select start time"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                      placeholder="Select end time"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Questions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Questions <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
                    placeholder="Enter total questions"
                  />
                </div>
              </div>
            </div>
          </Card>
        ) : (
          /* Questions Management */
          <div className="space-y-6">
            {/* Questions Header */}
            <Card className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Questions Sets</h2>
                <Button
                  onClick={handleAddQuestion}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                >
                  Add Question
                </Button>
              </div>
            </Card>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question, index) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  onEdit={handleEditQuestion}
                  onRemove={handleRemoveQuestion}
                />
              ))}
            </div>

            {/* Save Button */}
            <Card className="p-6">
              <div className="flex justify-center">
                <Button className="w-full max-w-md h-14 bg-[#6633FF] hover:bg-[#6633FF]/90 text-white font-semibold text-lg">
                  Save
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Action Buttons for Basic Info */}
        {currentStep === 'basic' && (
          <Card className="mt-6 p-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="lg" className="w-48 h-10 border-gray-300 font-semibold">
                Cancel
              </Button>
              <Button
                onClick={() => setCurrentStep('questions')}
                size="lg"
                className="w-48 h-10 bg-[#6633FF] hover:bg-[#6633FF]/90 text-white font-semibold"
              >
                Save & Continue
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}