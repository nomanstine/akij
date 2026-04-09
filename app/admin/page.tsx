'use client';

import React from 'react';
import { SearchFilter, TestCard, Pagination, EmptyState } from '@/components/admin';
import { tests } from '@/mockdata/data';

interface TestData {
  id: number;
  title: string;
  candidates: string;
  questionSets: string;
  examSlots: string;
}

const AdminDashboard: React.FC = () => {
  const testData: TestData[] = tests.map(test => ({
    id: test.id,
    title: test.title,
    candidates: test.candidates,
    questionSets: test.questionSets,
    examSlots: test.examSlots,
  }));

  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <SearchFilter />

      {testData.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {testData.map((test) => (
            <TestCard
              key={test.id}
              title={test.title}
              candidates={test.candidates}
              questionSets={test.questionSets}
              examSlots={test.examSlots}
            />
          ))}
        </section>
      )}

      {testData.length > 0 && <Pagination />}
    </main>
  );
};

export default AdminDashboard;