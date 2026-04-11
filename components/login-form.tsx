"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit, 
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema as any) as any,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit = async (data: LoginValues) => {
    setError(null);
    if (onSubmit) {
      onSubmit(data.email, data.password);
    }

    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError('Invalid email or password');
      } else {
        router.refresh();
        router.push(data.email === 'admin@demo.com' ? '/admin' : '/dashboard');
      }
    } catch (err) {
      setError('An error occurred during sign in');
    }
  };

  const setDemoCredentials = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setValue('email', 'admin@demo.com');
      setValue('password', 'admin123');
    } else {
      setValue('email', 'user@demo.com');
      setValue('password', 'user123');
    }
  };

  return (
    <div className="auth-container flex flex-col gap-6 px-4 py-12">
      <h1 className="auth-heading">
        Sign In
      </h1>

      <Card className="auth-card flex flex-col gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" type="button" className="w-full flex items-center justify-center gap-2">
              Login as Demo <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuItem onClick={() => setDemoCredentials('user')}>
              Candidate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDemoCredentials('admin')}>
              Employer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <form onSubmit={handleSubmit(onFormSubmit)} className="form-stack">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

          <div className="form-field">
            <Label htmlFor="email" className="form-label">
              Email
            </Label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="form-input focus:border-transparent focus:ring-2 focus:ring-[var(--primary)]"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="form-field">
            <Label htmlFor="password" className="form-label">
              Password
            </Label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="form-input focus:border-transparent focus:ring-2 focus:ring-[var(--primary)]"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="form-help-link">
              Forget Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="button-primary font-bold w-full"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};