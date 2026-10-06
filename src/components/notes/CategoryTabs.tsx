'use client';

import React from 'react';
import { categories } from '@/data/categories';

interface CategoryTabsProps {
  selectedSlug: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedSlug,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-neutral-800">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
          selectedSlug === 'all'
            ? 'bg-white text-black font-bold shadow-sm'
            : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
        }`}
      >
        All Notes (160+)
      </button>

      {categories.map((cat) => {
        const isSelected = selectedSlug === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-white text-black font-bold shadow-sm'
                : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-white border border-neutral-800'
            }`}
          >
            {cat.name} ({cat.resourceCount})
          </button>
        );
      })}
    </div>
  );
};

