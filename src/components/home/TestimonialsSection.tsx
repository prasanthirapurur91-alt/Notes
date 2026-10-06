'use client';

import React from 'react';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  // Duplicate array to ensure seamless continuous scrolling loop
  const doubleTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 sm:py-24 bg-black text-white overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
          WHAT PEOPLE SAY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
          User Testimonials
        </h2>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 py-2 px-4 hover:[animation-play-state:paused]">
          {doubleTestimonials.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[300px] sm:w-[360px] shrink-0 bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-sm hover:border-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-white text-lg mb-3 tracking-wider">★★★★★</div>
                <p className="text-neutral-300 text-sm italic leading-relaxed mb-6">
                  &quot;{item.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-sm font-bold text-white">{item.name}</strong>
                  <span className="text-xs text-neutral-400 font-medium">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
