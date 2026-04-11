"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuestionItem, AddQuestionModal } from "@/components/admin";
import api from "@/lib/api";
import { Question, TestBasicInfoSchema, TestBasicInfo } from "@/lib/schemas";
import { z } from "zod";
import { useTestStore } from "@/store/testStore";

export default function CreateTestPage() {
  const router = useRouter();
  const {
    currentStep, setCurrentStep,
    basicInfo, setBasicInfo,
    questions, setQuestions,
    isEditMode, setIsEditMode,
    editTestId, setEditTestId,
    reset
  } = useTestStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [basicInfoErrors, setBasicInfoErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset store on component unmount
    return () => reset();
  }, [reset]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    
    if (editId) {
      setIsEditMode(true);
      setEditTestId(parseInt(editId));
      fetchTestForEdit(parseInt(editId));
    } else {
      fetchDefaultData();
    }
  }, []);

  const fetchTestForEdit = async (testId: number) => {
    try {
      const response = await api.get(`/tests/${testId}`);
      const test = response.data;
      
      setBasicInfo({
        title: test.title,
        duration: test.duration,
        questionCount: test.questionCount,
        negativeMarking: test.negativeMarking,
        candidates: test.candidates,
        questionSets: test.questionSets,
        examSlots: test.examSlots,
        questionTypes: test.questionTypes,
      });
      
      setQuestions(
        test.questions.map((q: any) => ({
          ...q,
          points: q.points ?? 1,
          type: (q.type === 'multiple-choice' ? 'radio' : (q.type === 'rich-text' ? 'text' : q.type)) as Question['type'],
          options: q.options?.map((opt: any) => ({ ...opt, isCorrect: opt.isCorrect || false })),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch test for edit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDefaultData = async () => {
    try {
      const response = await api.get('/tests');
      const defaultTest = response.data[0];
      
      if (defaultTest && defaultTest.questions) {
        setQuestions(
          defaultTest.questions.map((q: any) => ({
            ...q,
            points: q.points ?? 1,
            type: (q.type === 'multiple-choice' ? 'radio' : (q.type === 'rich-text' ? 'text' : q.type)) as Question['type'],
            options: q.options?.map((opt: any) => ({ ...opt, isCorrect: opt.isCorrect || false })),
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch test data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditQuestion = (questionId: string) => {
    // TODO: Implement edit functionality - open modal with existing question data
    console.log('Edit question:', questionId);
    const question = questions.find(q => q.id === questionId);
    if (question) {
      // For now, just remove and re-add. In future, open edit modal
      handleRemoveQuestion(questionId);
      // You could open the add modal with pre-filled data here
    }
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

  const handleSubmitTest = async () => {
    try {
      const testData = {
        ...basicInfo,
        questions: questions.map(q => ({
          text: q.text,
          type: q.type === 'radio' ? 'multiple-choice' : q.type === 'text' ? 'rich-text' : q.type,
          points: q.points,
          correctAnswer: q.correctAnswer,
          options: q.options
        }))
      };

      if (isEditMode && editTestId) {
        await api.put(`/tests/${editTestId}`, testData);
        alert('Test updated successfully!');
      } else {
        await api.post('/tests', testData);
        alert('Test created successfully!');
      }
      
      router.push('/admin');
    } catch (error) {
      console.error('Failed to save test:', error);
      alert('Failed to save test. Please try again.');
    }
  };

  const handleSaveBasicInfo = () => {
    try {
      TestBasicInfoSchema.parse(basicInfo);
      setBasicInfoErrors({});
      setCurrentStep('questions');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setBasicInfoErrors(errors);
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

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
              {/* Test Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.title || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Enter test title"
                  />
                  {basicInfoErrors.title && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.duration || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., 45 min"
                  />
                  {basicInfoErrors.duration && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.duration}</p>}
                </div>
              </div>

              {/* Question Count and Negative Marking */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Count <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={basicInfo.questionCount || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, questionCount: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="Enter question count"
                  />
                  {basicInfoErrors.questionCount && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.questionCount}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Negative Marking <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.negativeMarking || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, negativeMarking: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., -0.25/wrong"
                  />
                  {basicInfoErrors.negativeMarking && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.negativeMarking}</p>}
                </div>
              </div>

              {/* Candidates and Question Sets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidates <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.candidates || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, candidates: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., 10,000"
                  />
                  {basicInfoErrors.candidates && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.candidates}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Sets <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.questionSets || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, questionSets: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., 3"
                  />
                  {basicInfoErrors.questionSets && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.questionSets}</p>}
                </div>
              </div>

              {/* Exam Slots and Question Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exam Slots <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={basicInfo.examSlots || ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, examSlots: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., 3"
                  />
                  {basicInfoErrors.examSlots && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.examSlots}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Types <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(basicInfo.questionTypes) ? basicInfo.questionTypes.join(', ') : ''}
                    onChange={(e) => setBasicInfo({ ...basicInfo, questionTypes: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    placeholder="e.g., Multiple Choice, Essay"
                  />
                  {basicInfoErrors.questionTypes && <p className="text-red-500 text-xs mt-1">{basicInfoErrors.questionTypes}</p>}
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
                <Button 
                  onClick={handleSubmitTest}
                  className="button-primary w-full max-w-md h-14 font-bold text-lg"
                >
                  {isEditMode ? 'Update Test' : 'Save Test'}
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