'use client';

import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-5 gap-5 w-full max-w-[1280px] mx-auto">
      {/* Icon placeholder - you can replace with actual SVG */}
      <div className="w-[120px] h-[120px] relative">
        {/* This would be the illustration from the CSS */}
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-[20px] font-semibold text-slate-700 leading-[140%]">
          No Tests Available
        </h2>
        <p className="text-[14px] text-slate-500 leading-[140%] max-w-[539px]">
          There are no online tests created yet. Create your first test to get started with managing examinations.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;