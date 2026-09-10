import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../useCatalog';
import { Layers } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { data, isLoading } = useCategories({ limit: 12 });

  if (isLoading) {
    return (
      <div className="bg-white border-b border-neutral-200 py-2.5 px-4 overflow-x-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-3 min-w-max">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-24 bg-neutral-200 animate-pulse rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  const categories = data?.categories || [];

  return (
    <nav aria-label="Categories" className="bg-white border-b border-neutral-200 py-2 px-4 shadow-sm overflow-x-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-accent transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-accent" />
          All Departments
        </Link>
        <span className="text-neutral-300">|</span>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.slug}`}
            className="px-3 py-1 rounded-full text-xs font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
