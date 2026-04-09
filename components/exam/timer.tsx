import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  initialTime: number; // in seconds
  onTimeUp?: () => void;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, className }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("bg-gray-100 px-16 py-4 rounded-lg", className)}>
      <span className="text-xl font-semibold text-gray-700">
        {formatTime(timeLeft)} left
      </span>
    </div>
  );
};