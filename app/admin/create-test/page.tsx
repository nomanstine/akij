"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuestionItem, AddQuestionModal } from "@/components/admin";
import { tests } from "@/mockdata/data";
import { Question, TestBasicInfoSchema, TestBasicInfo } from "@/lib/schemas";
import { z } from "zod";

export default function CreateTestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'basic' | 'questions'>('basic');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [basicInfo, setBasicInfo] = useState<Partial<TestBasicInfo>>({});
  const [basicInfoErrors, setBasicInfoErrors] = useState<Record<string, string>>({});
  
  const [questions, setQuestions] = useState<Question[]>(
    tests[0].questions.map((q) => ({
      ...q,
      points: q.points ?? 1,
      type: (q.type === 'multiple-choice' ? 'radio' : (q.type === 'rich-text' ? 'text' : q.type)) as Question['type'],
      options: q.options?.map((opt) => ({ ...opt, isCorrect: opt.isCorrect || false })),
    }))
  );

  const handleEditQuestion = (questionId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit question:', questionId);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleAddQuestion = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setIsAddModalOpen(false);
  };

  const handleSaveBasicInfo = () => {
    const result = TestBasicInfoSchema.safeParse(basicInfo);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setBasicInfoErrors(errors);
      return;
    }
    setBasicInfoErrors({});
    setCurrentStep('questions');
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <Card className="mb-6 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Manage Online Test</h1>
            <Button variant="outline" onClick={() => router.push('/admin')}>Back to Dashboard</Button>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <button
              onClick={() => setCurrentStep('basic')}
              className={`flex items-center space-x-2 ${currentStep === 'basic' ? 'text-violet-600' : 'text-gray-500'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'basic' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-white'
              }`}>
                1
              </div>
              <span className="font-medium">Basic Info</span>
            </button>
            <div className="w-20 h-px bg-gray-400"></div>
            <button
              onClick={() => setCurrentStep('questions')}
              className={`flex items-center space-x-2 ${currentStep === 'questions' ? 'text-violet-600' : 'text-gray-500'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'questions' ? 'bg-violet-600 text-white' : 'bg-gray-300 text-white'
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
                    value={basicInfo.name || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Enter test name"
                  />
                  {basicInfoErrors.name && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.description || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Enter description"
                  />
                  {basicInfoErrors.description && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.description}</p>}
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
                      value={basicInfo.category || ''}
                      onChange={(e) => setBasicInfo({ ...basicInfo, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                      placeholder="Select category"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {basicInfoErrors.category && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={basicInfo.duration || ''}
                      onChange={(e) => setBasicInfo({ ...basicInfo, duration: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                      placeholder="Enter duration"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  {basicInfoErrors.duration && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.duration}</p>}
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
                      type="datetime-local"
                      value={basicInfo.startTime || ''}
                      onChange={(e) => setBasicInfo({ ...basicInfo, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                      placeholder="Select start time"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  {basicInfoErrors.startTime && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.startTime}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={basicInfo.endTime || ''}
                      onChange={(e) => setBasicInfo({ ...basicInfo, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                      placeholder="Select end time"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  {basicInfoErrors.endTime && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.endTime}</p>}
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
                    value={basicInfo.totalQuestions || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, totalQuestions: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Enter total questions"
                  />
                  {basicInfoErrors.totalQuestions && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.totalQuestions}</p>}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          /* Questions Management */
          <div className="space-y-6">
            {/* Add Question Button */}
            <Card className="p-8">
              <Button
                onClick={handleAddQuestion}
                className="button-primary w-full h-14 font-bold text-lg"
              >
                Add Question
              </Button>
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
                <Button className="button-primary w-full max-w-md h-14 font-bold text-lg">
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
                onClick={handleSaveBasicInfo}
                size="lg"
                className="button-primary w-48 h-10 font-bold"
              >
                Save & Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Modal for adding questions */}
        <AddQuestionModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveNewQuestion}
          questionNumber={questions.length + 1}
        />
      </div>
    </div>
  );
}