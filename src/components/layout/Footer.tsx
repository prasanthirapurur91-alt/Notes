'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-neutral-300 border-t border-neutral-800 py-8 sm:py-12 px-2 sm:px-6 lg:px-8 w-full overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Single-row responsive flex container */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-800 w-full min-w-0">
          {/* Block 1: Brand & Tagline */}
          <div className="min-w-0 shrink flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shrink-0 border border-white">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <div>
              <Link href="/" className="logo text-base sm:text-lg font-black text-white tracking-tight block truncate">
                PREP <span className="text-neutral-400">LIBRARY</span>
              </Link>
              <p className="text-[10px] sm:text-xs font-semibold text-neutral-400 mt-0.5 truncate">
                {siteConfig.tagline}
              </p>
            </div>
          </div>

          {/* Block 2: Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold">
            <Link href="/" className="text-neutral-300 hover:text-white transition-colors">
              Notes Store
            </Link>
            <Link href="/payment?type=all_notes" className="text-white hover:text-neutral-300 transition-colors underline font-extrabold">
              Get All Notes (₹199)
            </Link>
          </div>

          {/* Block 3: Social & Contact */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition-all shadow-xs"
              title="Follow handbook_library on Instagram"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@handbook_library</span>
            </a>

            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-neutral-400 hover:text-white transition-colors block text-xs"
            >
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] sm:text-xs text-neutral-500 font-medium">
          © 2026 Prep Library. All rights reserved.
        </div>
      </div>
    </footer>
  );
};


