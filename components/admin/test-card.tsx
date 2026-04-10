'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, FileText, Clock3 } from 'lucide-react';

interface TestCardProps {
  title: string;
  candidates: string;
  questionSets: string;
  examSlots: string;
}

const TestCard: React.FC<TestCardProps> = ({ title, candidates, questionSets, examSlots }) => {
  return (
    <Card className="gap-0 rounded-2xl border border-slate-200 bg-white px-6 py-6 text-slate-700 shadow-none">
      <h2 className="text-xl leading-relaxed font-semibold text-slate-700">
        {title}
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-slate-400" strokeWidth={1.8} />
          <span className="text-slate-500">Candidates:</span>
          <span className="font-medium text-slate-700">{candidates}</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="size-4 text-slate-400" strokeWidth={1.8} />
          <span className="text-slate-500">Question Set:</span>
          <span className="font-medium text-slate-700">{questionSets}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-slate-400" strokeWidth={1.8} />
          <span className="text-slate-500">Exam Slots:</span>
          <span className="font-medium text-slate-700">{examSlots}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          className="h-10 w-28 rounded-xl border-violet-600 px-8 text-sm font-semibold text-violet-600 hover:bg-violet-600/5"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="h-10 w-28 rounded-xl border-violet-600 px-8 text-sm font-semibold text-violet-600 hover:bg-violet-600/5"
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};

export default TestCard;