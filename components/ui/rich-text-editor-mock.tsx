import React from 'react';
import { Undo, Redo, ChevronDown, List } from 'lucide-react';

interface RichTextEditorMockProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const RichTextEditorMock: React.FC<RichTextEditorMockProps> = ({ placeholder, value, onChange }) => (
  <div className="border border-slate-200 rounded-xl overflow-hidden mt-3">
    <div className="flex items-center gap-2 p-3 border-b border-slate-100 bg-white">
      <button type="button" className="p-1 hover:bg-slate-100 rounded text-slate-600"><Undo className="size-4" /></button>
      <button type="button" className="p-1 hover:bg-slate-100 rounded text-slate-600"><Redo className="size-4" /></button>
      <div className="w-px h-4 bg-slate-200 mx-1"></div>
      <button type="button" className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded text-sm text-slate-600">
        Normal text <ChevronDown className="size-3" />
      </button>
      <div className="w-px h-4 bg-slate-200 mx-1"></div>
      <button type="button" className="flex items-center gap-1 p-1 hover:bg-slate-100 rounded text-slate-600">
        <List className="size-4" /> <ChevronDown className="size-3" />
      </button>
      <div className="w-px h-4 bg-slate-200 mx-1"></div>
      <button type="button" className="p-1 hover:bg-slate-100 rounded text-slate-600 font-serif font-bold">B</button>
      <button type="button" className="p-1 hover:bg-slate-100 rounded text-slate-600 font-serif italic">I</button>
    </div>
    <textarea 
      className="w-full min-h-[100px] p-4 outline-none resize-none text-slate-700"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
);
