'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAccess } from '@/context/AccessContext';
import { useAdminData } from '@/context/AdminDataContext';
import { SearchBar } from '@/components/common/SearchBar';
import {
  BookOpen,
  HelpCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  FileText,
  Eye,
  Download,
  Lock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers,
  FilterX,
} from 'lucide-react';

export const NotesCatalogue: React.FC = () => {
  const { openPreviewModal } = useAccess();
  const { categories, notes: adminNotes, products } = useAdminData();
  const allNotesPrice = products.find((p) => p.id === 'prod-all-access' || p.type === 'all-access')?.price || 99;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('cat-java-spring');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'cat-java-spring': true, // Java & Spring open by default
  });

  // Calculate stats dynamically
  const totalNotesCount = adminNotes.length;
  const totalQuestions = useMemo(
    () => adminNotes.reduce((acc, n) => acc + (n.questionsCount || 40), 0),
    [adminNotes]
  );

  // Group notes by category ID
  const notesByCategory = useMemo(() => {
    const map: Record<string, typeof adminNotes> = {};
    categories.forEach((cat) => {
      map[cat.id] = adminNotes.filter((n) => {
        const catMatch = n.categoryId === cat.id;
        const nameMatch = n.categoryName.toLowerCase() === cat.name.toLowerCase();
        return catMatch || nameMatch;
      });
    });
    return map;
  }, [categories, adminNotes]);

  // Handle Search Filtering
  const filteredNotesByCat = useMemo(() => {
    if (!searchQuery.trim()) return notesByCategory;
    const q = searchQuery.toLowerCase().trim();
    const map: Record<string, typeof adminNotes> = {};

    categories.forEach((cat) => {
      map[cat.id] = (notesByCategory[cat.id] || []).filter((n) => {
        return (
          n.title.toLowerCase().includes(q) ||
          n.categoryName.toLowerCase().includes(q) ||
          n.subject?.toLowerCase().includes(q) ||
          n.topics.some((t) => t.toLowerCase().includes(q))
        );
      });
    });
    return map;
  }, [searchQuery, notesByCategory, categories]);

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const handleDownloadNote = async (note: (typeof adminNotes)[0]) => {
    if (note.downloadable === false) {
      alert(`Downloading is disabled by admin for "${note.title}".`);
      return;
    }

    try {
      const res = await fetch(`/api/pdf/download?id=${note.id}`);
      if (!res.ok) {
        alert('Download permission denied.');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${note.slug || note.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen text-black font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* SECTION 1: Notes Collection Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-neutral-800 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-300 shadow-xs">
            PDF NOTES COLLECTION
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            200+ Handwritten Notes
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium max-w-2xl mx-auto">
            Explore 200+ handwritten technical PDF notes across 26 categories for Java, Python, System Design, Testing, and more.
          </p>
        </div>

        {/* SECTION 2: Statistics */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-black px-3 py-1 rounded-md">
              BEST FOR QUICK REVISION ✨
            </span>
            <span className="text-xs text-neutral-500 font-mono">Verified Notes Marketplace</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-center gap-1.5 text-lg font-black text-black mb-1">
                <BookOpen className="w-5 h-5 text-black" /> 200+ Notes
              </div>
              <span className="text-[11px] text-neutral-600 font-medium">Handwritten Study Sheets</span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-center gap-1.5 text-lg font-black text-black mb-1">
                <HelpCircle className="w-5 h-5 text-black" /> 1,500+ Questions
              </div>
              <span className="text-[11px] text-neutral-600 font-medium">Technical Interview Q&As</span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="flex items-center justify-center gap-1.5 text-lg font-black text-black mb-1">
                <GraduationCap className="w-5 h-5 text-black" /> 26 Categories
              </div>
              <span className="text-[11px] text-neutral-600 font-medium">Comprehensive Coverage</span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col justify-center">
              <span className="text-xs font-extrabold text-black block">
                Easy-to-Understand
              </span>
              <span className="text-[11px] text-neutral-600 font-semibold mt-0.5">
                Interview-Focused
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Purchase Options Highlight Banner */}
        <div className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg shrink-0">
              ⚡
            </div>
            <div>
              <strong className="text-sm sm:text-base font-extrabold text-black block">
                Complete Notes Access Special Offer
              </strong>
              <span className="text-xs text-neutral-600">
                Unlock Complete Access to All 26 Categories & 200+ Notes for ₹199 (M.R.P. ₹699)
              </span>
            </div>
          </div>
          <Link
            href="/payment?type=all_notes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold px-4.5 py-2.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" /> Get All Notes Pass (₹199)
          </Link>
        </div>

        {/* SECTION 4: Search Bar */}
        <div className="space-y-2">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search handwritten notes, subjects, and topics..."
          />
          {searchQuery && (
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 px-2">
              <span>Filtering notes matching &quot;{searchQuery}&quot;</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-black hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <FilterX className="w-3.5 h-3.5" /> Clear Search
              </button>
            </div>
          )}
        </div>

        {/* SECTION 5: Category Navigation Tabs */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
            SELECT CATEGORY TO EXPLORE
          </span>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200">
            {categories.map((cat) => {
              const catNotesList = filteredNotesByCat[cat.id] || [];
              const isSelected = selectedCategorySlug === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategorySlug(cat.id);
                    setExpandedCategories((prev) => ({ ...prev, [cat.id]: true }));
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200 border border-neutral-300'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isSelected ? 'bg-white text-black' : 'bg-neutral-200 text-black'}`}>
                    {catNotesList.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 6 & 7: Expanded Category Content */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const catNotes = filteredNotesByCat[cat.id] || [];
            const isExpanded = expandedCategories[cat.id] !== false; // default true for all categories

            return (
              <div
                key={cat.id}
                id={`sec-${cat.id}`}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs"
              >
                {/* Category Header Row */}
                <div className="p-6 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1"
                    onClick={() => toggleCategoryExpand(cat.id)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {cat.id.includes('java') ? '☕' : cat.id.includes('python') ? '🐍' : cat.id.includes('dsa') ? '⚡' : cat.id.includes('web') ? '🌐' : cat.id.includes('db') ? '🗄️' : cat.id.includes('system') ? '🏗️' : cat.id.includes('devops') ? '☁️' : cat.id.includes('ai') ? '🤖' : cat.id.includes('ml') ? '🧠' : '📚'}
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                        {cat.name}
                      </h2>
                      <span className="text-xs text-neutral-600 font-semibold">
                        {catNotes.length} Technical PDF Resources
                      </span>
                    </div>

                    <button className="p-1 text-neutral-600 hover:text-black ml-2 cursor-pointer">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Single Category Action Button: Get All Notes for ₹199 */}
                  <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
                    <Link
                      href="/payment?type=all_notes"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer border border-black"
                    >
                      <Sparkles className="w-4 h-4 text-white" /> Get All Notes for ₹199
                    </Link>
                  </div>
                </div>

                {/* Expanded Resource List (3 COLUMNS GRID LAYOUT) */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 space-y-2 bg-white">
                    {catNotes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {catNotes.map((note, index) => {
                          return (
                            <div
                              key={note.id}
                              className="p-3.5 bg-white rounded-2xl border border-neutral-200 flex items-center justify-between gap-3 hover:border-black transition-all group shadow-2xs"
                            >
                              <div
                                className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
                                onClick={() => openPreviewModal(note)}
                              >
                                {/* Category-wise Sequential Numbering */}
                                <span className="text-xs font-mono font-bold text-neutral-400 shrink-0 w-5">
                                  {String(index + 1).padStart(2, '0')}
                                </span>

                                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 border border-black">
                                  <FileText className="w-4 h-4 text-white" />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <h4
                                    className="text-xs font-bold text-black truncate group-hover:text-neutral-700 transition-colors"
                                    title={note.title}
                                  >
                                    {note.title}
                                  </h4>
                                  <span className="text-[10px] text-neutral-500 font-medium block">
                                    {note.pagesCount} Pages • PDF Note
                                  </span>
                                </div>
                              </div>

                              {/* Single Action Button: Locked Download (Get Access for ₹199) */}
                              <div className="flex items-center shrink-0">
                                <button
                                  onClick={() => openPreviewModal(note)}
                                  className="inline-flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
                                  title="Get All Notes for ₹199"
                                >
                                  <Lock className="w-3.5 h-3.5 text-white" />
                                  <span>Locked</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-xs text-neutral-500 italic">
                        No PDF resources matching search filter in {cat.name}.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
