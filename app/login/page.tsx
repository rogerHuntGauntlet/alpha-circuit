import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2D0B5A] to-[#1B0B3B] p-4">
      <div className="relative">
        {/* Background effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] rounded-lg blur opacity-25"></div>
        
        <div className="relative bg-[#1F0940] p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D]">
              Developer Login
            </h2>
            <p className="mt-2 text-purple-100">
              Access your Circuit developer console
            </p>
          </div>

          <form action="/api/auth/callback/credentials" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-[#2D0B5A] border border-purple-500/20 rounded-md text-purple-100 placeholder-purple-400
                         focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-[#2D0B5A] border border-purple-500/20 rounded-md text-purple-100 placeholder-purple-400
                         focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-purple-500/20 bg-[#2D0B5A] text-[#FF6B6B] focus:ring-[#FF6B6B]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-purple-100">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-[#FF6B6B] hover:text-[#FFE66D]">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full relative group bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] p-[2px] rounded-md hover:from-[#FFE66D] hover:to-[#FF6B6B] transition-all duration-300"
            >
              <div className="bg-[#1F0940] rounded-md group-hover:bg-transparent transition-all duration-300">
                <span className="block px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] group-hover:text-[#1F0940]">
                  Sign In
                </span>
              </div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-purple-100">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-[#FF6B6B] hover:text-[#FFE66D]">
                Register for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 