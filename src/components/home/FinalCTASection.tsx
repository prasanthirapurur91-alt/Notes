'use client';

import React from 'react';
import Link from 'next/link';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-black text-white text-center relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
          Ready to Start Your Preparation?
        </h2>

        <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto font-normal">
          Get access to All handwritten notes and interview questions.
        </p>

        <div className="pt-2">
          <Link
            href="/payment"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold text-base px-8 py-4 rounded-xl shadow-xl transition-all border border-white"
          >
            Get All Notes Now →
          </Link>
        </div>
      </div>
    </section>
  );
};
