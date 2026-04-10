"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
    <div className="auth-container flex flex-col gap-6 px-4 py-12">
      {/* Sign In Heading */}
      <h1 className="auth-heading">
        Sign In
      </h1>

      {/* Form Container */}
      <Card className="auth-card flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="form-stack">
          {/* Email Input Field */}
          <div className="form-field">
            <Label htmlFor="email" className="form-label">
              Email
            </Label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input focus:border-transparent focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          {/* Password Input Field */}
          <div className="form-field">
            <Label htmlFor="password" className="form-label">
              Password
            </Label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input focus:border-transparent focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="form-help-link">
              Forget Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="button-primary font-bold"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
};