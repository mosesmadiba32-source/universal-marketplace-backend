import React from 'react';
import { Outlet } from 'react-router-dom';
import { Logo } from '../shared/components/Logo';

export function AuthLayout() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-navy-900 text-white select-none"
      style={{ backgroundColor: '#0A1830' }}
    >
      {/* Brand mark */}
      <div className="mb-8">
        <Logo size="lg" />
      </div>

      {/* Auth card */}
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
        <Outlet />
      </div>

      <p className="mt-8 text-xs text-white/50">
        © {new Date().getFullYear()} Local Art AI. All rights reserved.
      </p>
    </div>
  );
}
