'use client';

import React from 'react';
import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import { Sparkles, ArrowRight, ArrowDown, FileCode, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { products } = useAdminData();
  const sdetPrice = products.find((p) => p.id === 'prod-sdet-bundle' || p.type === 'bundle')?.price || 99;

  return (
    <section className="relative overflow-hidden bg-white text-black pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-neutral-200">
      {/* Subtle Background Grid Texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-300 text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Handwritten Notes for Learning & Interview Prep✨</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-tight">
              Technical Notes.<br />
              <span className="text-neutral-700">
                Interview Prep.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Handwritten technical PDF notes, interview questions and QA/SDET preparation resources for developers and testers.
            </p>

            {/* Price Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 border border-neutral-300 text-sm font-bold text-black">
              <span>Special Offer:</span>
              <span className="text-base font-black text-black">₹199</span>
              <span className="line-through text-neutral-400 text-xs font-normal">M.R.P: ₹699</span>
              <span className="bg-black text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">71% OFF</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/payment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-700/30 text-sm cursor-pointer border border-emerald-500"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Get All Notes Now (₹199)
              </Link>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-neutral-200">
              <div>
                <strong className="block text-2xl font-black text-black">200+</strong>
                <span className="text-xs text-neutral-500 font-semibold">Notes</span>
              </div>
              <div>
                <strong className="block text-2xl font-black text-black">1500+</strong>
                <span className="text-xs text-neutral-500 font-semibold">Interview Questions</span>
              </div>
              <div>
                <strong className="block text-2xl font-black text-black">50+</strong>
                <span className="text-xs text-neutral-500 font-semibold">Subjects</span>
              </div>
            </div>

            {/* Mini Bullet Points */}
            <div className="space-y-2 pt-2 text-xs sm:text-sm text-neutral-600 font-medium">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Easy to Understand
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Interview Focused
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Beginner friendly
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Instant Access
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  Regularly Updated
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Notebook Stack */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-neutral-100 p-3 rounded-3xl border border-neutral-300 shadow-xl">
              <div className="relative bg-white text-black rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-md overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-black" />
                    <div className="w-3 h-3 rounded-full bg-neutral-400" />
                    <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-black px-2.5 py-0.5 rounded">
                    Handwritten Sheet #01
                  </span>
                </div>

                <div className="space-y-3 font-mono">
                  <div className="flex items-center gap-2 text-black font-bold text-sm">
                    <FileCode className="w-4 h-4 text-black" />
                    <span>Java, SQL, DSA & Testing Notes</span>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2 text-neutral-800">
                    <p className="font-semibold text-black">
                      • Token Bucket Rate Limiter:
                    </p>
                    <p className="pl-3 text-neutral-600">
                      Capacity = 100 reqs, Refill = 10 tokens/sec. Atomic Redis Lua Execution.
                    </p>
                    <p className="font-semibold text-black">
                      • Playwright Framework:
                    </p>
                    <p className="pl-3 text-neutral-600">
                      Page Object Model + REST Assured API tests + Allure reporting.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-600">High-Res PDF Download</span>
                  <span className="font-extrabold text-white bg-black px-2 py-0.5 rounded">
                    Quick Revision
                  </span>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-black text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-white" />
                <span>200+ Notes</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-white" />
                <span>50+ Subjects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


