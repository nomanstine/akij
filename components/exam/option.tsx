import React from 'react';
import { cn } from '@/lib/utils';

interface OptionProps {
  id: string;
  text: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  className?: string;
}

export const Option: React.FC<OptionProps> = ({
  id,
  text,
  isSelected = false,
  onSelect,
  className
}) => {
  const handleClick = () => {
    onSelect?.(id);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors",
        isSelected && "border-blue-500 bg-blue-50",
        className
      )}
      onClick={handleClick}
    >
      <div className={cn(
        "w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center",
        isSelected && "border-blue-500"
      )}>
        {isSelected && (
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        )}
      </div>
      <span className="text-base text-gray-700 flex-1">{text}</span>
    </div>
  );
};