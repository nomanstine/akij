'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ExamCompletedPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="h-full bg-gray-50 flex items-center justify-center p-4">
      {/* Completion Box */}
      <div className="bg-white border border-gray-200 rounded-2xl p-14 max-w-4xl w-full">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            {/* Check icon */}
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-xl font-semibold text-gray-800 text-center">
              Test Completed
            </h1>

            <p className="text-base text-gray-500 text-center max-w-2xl">
              Congratulations! Md. Naimur Rahman, You have completed your MCQ Exam for Probationary Officer. Thank you for participating.
            </p>
          </div>

          <button 
            className="px-8 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => router.push('/dashboard')}
          >
            <span className="text-base font-semibold text-gray-800">
              Back to Dashboard
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCompletedPage;