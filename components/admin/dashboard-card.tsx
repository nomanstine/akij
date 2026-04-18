'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardCardProps } from '@/lib/admin-types';

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </Card>
  );
};

export default DashboardCard;