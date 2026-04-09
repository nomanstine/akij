import React from 'react';
import { useRouter } from 'next/navigation';

interface TimeoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimeoutModal({ isOpen, onClose }: TimeoutModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gray-900/60"></div>

      {/* Modal */}
      <div className="relative bg-white border border-gray-200 rounded-2xl p-14 max-w-2xl w-full mx-4">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            {/* Clock icon */}
            <div className="w-14 h-14 relative">
              <svg className="w-full h-full text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
            </div>

            <h1 className="text-xl font-semibold text-gray-800 text-center">
              Timeout!
            </h1>

            <p className="text-base text-gray-500 text-center max-w-lg">
              Dear Md. Naimur Rahman, Your exam time has been finished. Thank you for participating.
            </p>
          </div>

          <button
            className="px-8 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              onClose();
              router.push('/dashboard');
            }}
          >
            <span className="text-base font-semibold text-gray-800">
              Back to Dashboard
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}