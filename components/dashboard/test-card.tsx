import Link from "next/link";
import { CircleX, Clock3, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TestCardProps {
  id: number;
  title: string;
  duration: string;
  questionCount: number;
  negativeMarking: string;
}

export function TestCard({ id, title, duration, questionCount, negativeMarking }: TestCardProps) {
  return (
    <Card className="gap-0 rounded-2xl border border-slate-200 bg-white px-6 py-6 text-slate-700 shadow-none">
      <h2 className="text-xl leading-relaxed font-semibold text-slate-700">
        {title}
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700">
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-slate-400" strokeWidth={1.8} />
          <span className="text-slate-500">Duration:</span>
          <span className="font-medium text-slate-700">{duration}</span>
        </div>

        <div className="flex items-center gap-2">
          <FileText className="size-4 text-slate-400" strokeWidth={1.8} />
          <span className="text-slate-500">Question:</span>
          <span className="font-medium text-slate-700">{questionCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <CircleX className="size-4 text-slate-400" strokeWidth={1.8} />
          <span className="text-slate-500">Negative Marking:</span>
          <span className="font-medium text-slate-700">{negativeMarking}</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          asChild
          variant="outline"
          className="h-11 w-[20%] rounded-xl border-violet-600 px-6 text-sm font-semibold text-violet-600 hover:bg-violet-600/5"
        >
          <Link href={`/exam?testId=${id}`}>Start</Link>
        </Button>
      </div>
    </Card>
  );
}