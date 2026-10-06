import React from 'react';
import { categories } from '@/data/categories';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { SectionHeader } from '@/components/common/SectionHeader';

export const CategoriesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-black text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="SUBJECT ORGANIZER"
          title="Explore by Category"
          subtitle="Browse handwritten technical resources organized into 11 core computer science and engineering disciplines."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
