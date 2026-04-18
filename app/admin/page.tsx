'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchFilter, TestCard, Pagination, EmptyState } from '@/components/admin';
import api from '@/lib/api';
import { useTestListStore } from '@/store/testListStore';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { testData, setTestData, isLoading, setIsLoading } = useTestListStore();

  const fetchTests = async () => {
    try {
      const response = await api.get('/tests');
      setTestData(response.data.map((test: any) => ({
        id: test.id,
        title: test.title,
        candidates: test.candidates,
        questionSets: test.questionSets,
        examSlots: test.examSlots,
      })));
    } catch (error) {
      console.error("Failed to fetch test data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleViewDetails = (id: number) => {
    router.push(`/admin/test/${id}`);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/create-test?edit=${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        await api.delete(`/tests/${id}`);
        setTestData(testData.filter(test => test.id !== id));
      } catch (error) {
        console.error("Failed to delete test:", error);
        alert('Failed to delete test');
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="container mx-auto flex flex-1 flex-col gap-5 px-4 py-10 sm:px-6 lg:px-8">
      <SearchFilter />

      {testData.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {testData.map((test) => (
            <TestCard
              key={test.id}
              id={test.id}
              title={test.title}
              candidates={test.candidates}
              questionSets={test.questionSets}
              examSlots={test.examSlots}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

      {testData.length > 0 && <Pagination />}
    </main>
  );
};

export default AdminDashboard;