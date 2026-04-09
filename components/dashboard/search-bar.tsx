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
    <div className="flex h-12 w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-3 shadow-[2px_2px_6px_rgba(73,123,241,0.24)] md:max-w-[620px]">
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
        className="grid size-8 place-items-center rounded-full bg-[#673FED1A] text-[#6633FF]"
      >
        <Search className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}