"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      return;
    }

    // Call custom onSubmit if provided
    if (onSubmit) {
      onSubmit(email, password);
    }

    // Redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <Card className="w-full max-w-md p-8 bg-white border border-[#E5E7EB] rounded-lg shadow-none">
    <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-[#334155] text-center">
        Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-[#334155]">
            Email Address
            </Label>
            <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
            required
            />
        </div>

        <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-[#334155]">
            Password
            </Label>
            <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6633FF] focus:border-transparent"
            required
            />
        </div>

        <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6633FF] hover:bg-[#5a2fd6] text-white py-3 rounded-lg font-semibold"
        >
            {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
        </form>
    </div>
    </Card>
  );
};