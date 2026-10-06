'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import { CategoryNotesSection } from '@/components/notes/CategoryNotesSection';
import { SearchBar } from '@/components/common/SearchBar';
import { ArrowLeft, Layout, Code, BookOpen, Layers } from 'lucide-react';

export default function CategoryResourcesPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = (params?.slug as string) || '';

  const { categories, notes: allNotes } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');

  // Find category by id or slug matching
  const category = categories.find((c) => {
    const normParam = slugParam.toLowerCase().replace(/^cat-/, '');
    const normId = c.id.toLowerCase().replace(/^cat-/, '');
    const normName = c.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return (
      c.id.toLowerCase() === slugParam.toLowerCase() ||
      normId === normParam ||
      normName === normParam
    );
  }) || {
    id: slugParam,
    name: slugParam.replace(/-/g, ' ').toUpperCase(),
    icon: '📚',
  };

  // Filter notes assigned to this category
  const categoryNotes = allNotes.filter((n) => {
    const catIdMatch = n.categoryId === category.id;
    const catNameMatch =
      n.categoryName.toLowerCase() === category.name.toLowerCase();
    const slugMatch =
      n.slug && n.slug.toLowerCase().includes(slugParam.toLowerCase());
    return catIdMatch || catNameMatch || slugMatch;
  });

  // Additional local search filter
  const filteredCategoryNotes = categoryNotes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Categories
          </Link>
          <span className="text-xs font-mono text-neutral-400">
            {filteredCategoryNotes.length} Resources Available
          </span>
        </div>

        {/* Category Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 text-xs font-extrabold uppercase border border-neutral-700">
            <Layers className="w-3.5 h-3.5 text-white" /> CATEGORY VIEW
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm text-neutral-400 max-w-2xl">
            Showing all handwritten technical notes and PDFs assigned to the {category.name} section.
          </p>
        </div>

        {/* Search Bar within Category */}
        <div className="max-w-2xl">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search within ${category.name}...`}
          />
        </div>

        {/* Category Resource Cards List */}
        {filteredCategoryNotes.length > 0 ? (
          <CategoryNotesSection
            title={category.name}
            categorySlug={slugParam}
            notes={filteredCategoryNotes}
            icon={<Layout className="w-5 h-5 text-white" />}
          />
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 p-12 rounded-2xl text-center space-y-4 max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Resources Found</h3>
            <p className="text-xs text-neutral-400">
              There are currently no PDFs matching your search query in {category.name}.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-bold rounded-xl"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
