import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 group select-none ${className}`}
      aria-label="Local Art AI Homepage"
    >
      {/* Circular Gold Monogram Icon */}
      <div
        className={`${iconSizes[size]} rounded-full bg-gold-500 text-navy-900 font-extrabold flex items-center justify-center shadow-sm flex-shrink-0 transition-transform group-hover:scale-105`}
        style={{ backgroundColor: '#F0A824', color: '#0A1830' }}
      >
        <span className="tracking-tighter font-black">LA</span>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-bold tracking-[0.5px] uppercase ${textSizes[size]} whitespace-nowrap transition-colors`}
          style={{ color: '#F0A824' }}
        >
          LOCAL ART AI
        </span>
      )}
    </Link>
  );
};
