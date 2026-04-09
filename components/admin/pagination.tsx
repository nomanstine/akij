'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

const perPageOptions = [8, 16, 24];

const Pagination: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleLimitChange = () => {
    const currentIndex = perPageOptions.indexOf(limit);
    const nextIndex = (currentIndex + 1) % perPageOptions.length;
    setLimit(perPageOptions[nextIndex]);
  };

  return (
    <section className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Previous page"
          onClick={handlePrev}
          disabled={page <= 1}
          className="grid size-8 place-items-center rounded-lg border border-[#F1F2F4] bg-white text-slate-400 disabled:opacity-50"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="grid size-8 place-items-center rounded-[10px] bg-[#F8F8F8] text-xs font-semibold text-[#2E2E2F]">
          {page}
        </div>

        <button
          type="button"
          aria-label="Next page"
          onClick={handleNext}
          className="grid size-8 place-items-center rounded-lg border border-[#F1F2F4] bg-white text-slate-800"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex items-center gap-4 self-end sm:self-auto">
        <span className="text-xs font-medium text-[#666666]">Online Test Per Page</span>
        <button
          type="button"
          onClick={handleLimitChange}
          className="flex h-8 items-center gap-1 rounded-lg border border-[#F1F2F4] bg-white px-3 text-xs font-medium text-[#2E2E2F]"
        >
          {limit}
          <ChevronUp className="size-3.5" />
        </button>
      </div>
    </section>
  );
};

export default Pagination;