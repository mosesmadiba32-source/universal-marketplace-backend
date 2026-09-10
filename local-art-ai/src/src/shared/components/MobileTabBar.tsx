import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const { getItemCount, openDrawer } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const cartCount = getItemCount();

  const isHome = location.pathname === '/';
  const isCategories = location.pathname === '/categories' || location.pathname.startsWith('/category');
  const isAccount = location.pathname.startsWith('/account') || location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-900 border-t border-white/10 pb-safe shadow-2xl">
      <div className="grid grid-cols-4 h-14 items-center">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center h-full tap-target transition-colors ${
            isHome ? 'text-gold-500' : 'text-white/70 hover:text-white'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </Link>

        {/* Categories */}
        <Link
          to="/categories"
          className={`flex flex-col items-center justify-center h-full tap-target transition-colors ${
            isCategories ? 'text-gold-500' : 'text-white/70 hover:text-white'
          }`}
          aria-label="Categories"
        >
          <Grid className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium mt-0.5">Categories</span>
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center h-full tap-target text-white/70 hover:text-white transition-colors"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">Cart</span>
        </button>

        {/* Account */}
        <Link
          to={isAuthenticated ? '/account' : '/login'}
          className={`flex flex-col items-center justify-center h-full tap-target transition-colors ${
            isAccount ? 'text-gold-500' : 'text-white/70 hover:text-white'
          }`}
          aria-label="Account"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] font-medium mt-0.5">Account</span>
        </Link>
      </div>
    </div>
  );
};
