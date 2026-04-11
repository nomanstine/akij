'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchFilter: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <h1 className="text-2xl font-semibold text-slate-700">Online Tests</h1>
      
      <div className="flex flex-col sm:flex-row w-full md:max-w-3xl gap-4 md:ml-auto">
        <div className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 shadow-sm">
          <input
            type="text"
            placeholder="Search by exam title"
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
        <Button 
          onClick={() => router.push('/admin/create-test')}
          className="button-primary h-12 w-full sm:w-48 whitespace-nowrap rounded-xl px-8 text-sm font-bold w-full"
        >
          Create New Test
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;