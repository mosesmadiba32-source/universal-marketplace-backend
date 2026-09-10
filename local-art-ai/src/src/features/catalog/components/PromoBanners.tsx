import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  const promos = [
    {
      titleLine1: 'Up to 50% Off',
      titleLine2: 'Top Electronics',
      subtitle: 'Latest tech. Better living.',
      link: '/category/electronics',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
    },
    {
      titleLine1: 'Fashion That',
      titleLine2: 'Fits Your Lifestyle',
      subtitle: 'Trendy. Comfortable. You.',
      link: '/category/fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    },
    {
      titleLine1: 'Transform',
      titleLine2: 'Your Home',
      subtitle: 'Stylish. Functional. Yours.',
      link: '/category/home-living',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-8 md:py-12 px-6 max-w-7xl mx-auto select-none">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((promo, idx) => (
          <Link
            key={idx}
            to={promo.link}
            className="group relative rounded-[12px] overflow-hidden min-h-[220px] sm:min-h-[240px] flex flex-col justify-end p-6 border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            {/* Background Image */}
            <img
              src={promo.image}
              alt={promo.titleLine2}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Dark Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(10,24,48,0.2) 0%, rgba(10,24,48,0.85) 100%)',
              }}
            />

            {/* Text & Button Content */}
            <div className="relative z-10 space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                <span className="block">{promo.titleLine1}</span>
                <span className="block text-gold-500">{promo.titleLine2}</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-medium">
                {promo.subtitle}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-4 py-1.5 rounded-[8px] text-xs transition-colors shadow-sm">
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
