'use client';

import React, { FormEvent } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (res?.error) {
        alert(res.error);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('An error occurred during sign in');
    }
  };

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-8">
          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
            CIRCUIT
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-purple-100">
          Or{' '}
          <Link href="/auth/signup" className="font-medium text-[#FFE66D] hover:text-[#FF6B6B]">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1F0940]/50 py-8 px-4 shadow-xl ring-1 ring-purple-500/20 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#FF6B6B] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#FF6B6B] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-purple-300 text-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-100">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-[#FFE66D] hover:text-[#FF6B6B]">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative group w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] p-[2px] rounded-md hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
              >
                <div className="bg-[#1F0940] rounded-md group-hover:bg-transparent transition-all duration-300">
                  <span className="block w-full px-4 py-2 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] group-hover:text-[#1F0940]">
                    Sign in
                  </span>
                </div>
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-purple-100 bg-[#1F0940]">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGitHubSignIn}
                className="w-full flex justify-center py-2 px-4 border border-purple-500/20 rounded-md shadow-sm text-sm font-medium text-purple-100 bg-[#1F0940] hover:bg-[#2D0B5A] transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 