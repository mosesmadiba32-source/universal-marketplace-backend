import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { ShopByCategory } from './components/ShopByCategory';
import { TrendingProductsRail } from './components/TrendingProductsRail';
import { PromoBanners } from './components/PromoBanners';
import { BestSellersSection } from './components/BestSellersSection';
import { OrderTrackingPanel } from './components/OrderTrackingPanel';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {/* 1. Hero Banner (with overlapping Trust Panel) */}
      <HeroBanner />

      {/* 2. Shop by Category */}
      <ShopByCategory />

      {/* 3. Trending Products Rail */}
      <TrendingProductsRail />

      {/* 4. Promo Banner Row */}
      <PromoBanners />

      {/* 5. Best Sellers Section (Checkout-preview widget) */}
      <BestSellersSection />

      {/* 6. Order Tracking Panel */}
      <OrderTrackingPanel />
    </div>
  );
};
