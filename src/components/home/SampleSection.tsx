'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface SampleNoteItem {
  id: number;
  title: string;
  category: string;
  topic: string;
  highlights: string[];
  pagesCount: number;
}

export const SampleSection: React.FC = () => {
  const samples: SampleNoteItem[] = [
    {
      id: 1,
      title: 'SQL Join Types & Query Tuning',
      category: 'Database & Data',
      topic: 'DBMS & SQL',
      pagesCount: 44,
      highlights: [
        'INNER JOIN vs LEFT JOIN vs FULL OUTER JOIN',
        'B-Tree Indexing mechanism & WHERE clause filtering',
        'GROUP BY & HAVING clause execution order',
        'Window functions: ROW_NUMBER(), DENSE_RANK()',
      ],
    },
    {
      id: 2,
      title: 'Java JVM Memory & Garbage Collection',
      category: 'Programming',
      topic: 'Java Core',
      pagesCount: 42,
      highlights: [
        'Heap vs Stack Memory distribution',
        'Eden, Survivor S0/S1 & Tenured Space',
        'Strong, Soft, Weak & Phantom references',
        'Concurrency primitives & volatile keyword',
      ],
    },
    {
      id: 3,
      title: 'Playwright UI & API Automation Framework',
      category: 'Testing & Automation',
      topic: 'SDET & Automation',
      pagesCount: 38,
      highlights: [
        'Page Object Model (POM) structure',
        'API RequestContext & JSON assertion handling',
        'Allure Reporting & Tracing integration',
        'Parallel browser context setup',
      ],
    },
    {
      id: 4,
      title: 'Data Structures 14 Algorithmic Patterns',
      category: 'DSA & Algorithms',
      topic: 'LeetCode & DSA',
      pagesCount: 64,
      highlights: [
        'Sliding Window & Two Pointers technique',
        'Monotonic Stack for Next Greater Element',
        'Dynamic Programming Memoization vs Tabulation',
        'Tree traversals & Graph Dijkstra BFS/DFS',
      ],
    },
    {
      id: 5,
      title: 'System Design Token Bucket Rate Limiter',
      category: 'System Design',
      topic: 'High-Level Design',
      pagesCount: 75,
      highlights: [
        'Atomic Redis Lua script for token refill',
        'CAP theorem & High Availability trade-offs',
        'Consistent Hashing & Virtual Nodes',
        'Load Balancer Round-Robin vs Least Conn',
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect every 2 seconds (2000ms) with reduced motion check
  useEffect(() => {
    if (isPaused) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, samples.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? samples.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === samples.length - 1 ? 0 : prev + 1));
  };

  const leftIndex = activeIndex === 0 ? samples.length - 1 : activeIndex - 1;
  const rightIndex = activeIndex === samples.length - 1 ? 0 : activeIndex + 1;

  return (
    <section className="py-16 sm:py-24 bg-black text-white overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
            QUICK REVISION HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Handwritten Notes. Quick Revision.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 font-medium">
            Automatically updating revision sheets every 2 seconds for high-yield interview prep.
          </p>
        </div>

        {/* 3D Sliding Carousel Window */}
        <div
          className="relative max-w-6xl mx-auto py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-0">
            {/* Left Preview Card */}
            <div
              onClick={prevSlide}
              className="hidden md:block md:col-span-3 transform transition-all duration-500 scale-90 opacity-50 hover:opacity-80 cursor-pointer bg-neutral-950 rounded-2xl p-5 border border-neutral-800 shadow-md"
            >
              <div className="text-[10px] font-bold text-black uppercase bg-white px-2 py-0.5 rounded w-fit mb-2">
                {samples[leftIndex].category}
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-1">
                {samples[leftIndex].title}
              </h4>
              <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2">
                {samples[leftIndex].highlights[0]}
              </p>
            </div>

            {/* Center Active Card */}
            <div className="md:col-span-6 z-20 transform transition-all duration-500 scale-100 md:scale-105 bg-neutral-950 rounded-3xl p-6 sm:p-8 border-2 border-white shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-black bg-white px-3 py-1 rounded-md">
                  {samples[activeIndex].category}
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  Revision Card {activeIndex + 1} of {samples.length} (2s Cycle)
                </span>
              </div>

              <div className="my-5">
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-white" />
                  {samples[activeIndex].title}
                </h3>
                <p className="text-xs font-mono text-neutral-300 font-semibold">
                  Topic: {samples[activeIndex].topic} • {samples[activeIndex].pagesCount} Handwritten Pages
                </p>
              </div>

              {/* Excerpt Box */}
              <div className="bg-black rounded-2xl p-4 sm:p-5 border border-neutral-800 font-mono text-xs sm:text-sm text-white space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white mb-1">
                  Key Revision Points:
                </div>
                {samples[activeIndex].highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-white font-bold">✓</span>
                    <span className="text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-semibold">
                <span>Included in All-Access Technical Pass</span>
                <span className="text-black font-extrabold bg-white px-2.5 py-1 rounded">
                  Instant Vector PDF
                </span>
              </div>
            </div>

            {/* Right Preview Card */}
            <div
              onClick={nextSlide}
              className="hidden md:block md:col-span-3 transform transition-all duration-500 scale-90 opacity-50 hover:opacity-80 cursor-pointer bg-neutral-950 rounded-2xl p-5 border border-neutral-800 shadow-md"
            >
              <div className="text-[10px] font-bold text-black uppercase bg-white px-2 py-0.5 rounded w-fit mb-2">
                {samples[rightIndex].category}
              </div>
              <h4 className="text-sm font-bold text-white line-clamp-1">
                {samples[rightIndex].title}
              </h4>
              <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2">
                {samples[rightIndex].highlights[0]}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:-left-4 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center shadow-lg transition-all border border-white z-30 cursor-pointer"
            aria-label="Previous revision note"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:-right-4 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center shadow-lg transition-all border border-white z-30 cursor-pointer"
            aria-label="Next revision note"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {samples.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === index
                    ? 'w-8 bg-white'
                    : 'w-2.5 bg-neutral-800 hover:bg-neutral-700'
                }`}
                aria-label={`Show revision card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
