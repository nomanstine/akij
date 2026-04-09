"use client";

import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const perPageOptions = [8, 16, 24];

export function Pagination() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const handlePrev = () => {
    if (page > 1) {
      updateParams("page", (page - 1).toString());
    }
  };

  const handleNext = () => {
    updateParams("page", (page + 1).toString());
  };

  const handleLimitChange = () => {
    const currentIndex = perPageOptions.indexOf(limit);
    const nextIndex = (currentIndex + 1) % perPageOptions.length;
    updateParams("limit", perPageOptions[nextIndex].toString());
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
}