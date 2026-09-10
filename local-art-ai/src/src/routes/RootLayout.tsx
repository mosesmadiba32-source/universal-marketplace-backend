import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../shared/components/Header';
import { Footer } from '../shared/components/Footer';
import { MobileTabBar } from '../shared/components/MobileTabBar';
import { CartDrawer } from '../features/cart/CartDrawer';
import { ToastContainer } from '../shared/components/ToastContainer';
import { AiConcierge } from '../shared/components/AiConcierge';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-page text-text-primary antialiased">
      {/* Header mounts exactly once */}
      <Header />

      {/* Main Content Area (extra pb for mobile tab bar) */}
      <main className="flex-1 pb-16 sm:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed Bottom Tab Bar */}
      <MobileTabBar />

      {/* Global Slide-in Cart Drawer */}
      <CartDrawer />

      {/* Global AI Artisan Concierge (Floating) */}
      <AiConcierge />

      {/* Global Toasts */}
      <ToastContainer />
    </div>
  );
};
