import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationButtonsProps {
  onSkip?: () => void;
  onSaveContinue?: () => void;
  onSubmit?: () => void;
  isFirstQuestion?: boolean;
  isLastQuestion?: boolean;
  className?: string;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onSkip,
  onSaveContinue,
  onSubmit,
  isFirstQuestion = false,
  isLastQuestion = false,
  className
}) => {
  return (
    <div className={cn("flex justify-between items-center gap-5", className)}>
      <Button
        variant="outline"
        onClick={onSkip}
        className="w-44 h-12 px-8 py-3 border-gray-300 rounded-xl font-semibold"
      >
        Skip this question
      </Button>

      <div className="flex gap-5">
        {!isLastQuestion ? (
          <Button
            onClick={onSaveContinue}
            className="button-primary font-bold"
          >
            Save & Continue
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            className="button-primary font-bold"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};