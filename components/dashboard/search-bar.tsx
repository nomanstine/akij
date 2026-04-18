"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 shadow-sm md:max-w-2xl">
      <input
        type="text"
        placeholder="Search by exam title"
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
      <button
        type="button"
        aria-label="Search exam"
        className="grid size-8 place-items-center rounded-full bg-violet-100 text-violet-600"
      >
        <Search className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}