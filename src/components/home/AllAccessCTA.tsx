'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { useAccess } from '@/context/AccessContext';
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const AllAccessCTA: React.FC = () => {
  const { hasAllAccess } = useAccess();

  return (
    <section className="py-16 sm:py-20 bg-black text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                ULTIMATE PLATFORM PASS
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Get Access to the Complete Notes Collection
              </h2>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                Unlock immediate lifetime access to all 160+ handwritten technical PDF notes across 11 categories. Pay once and receive every future note added for FREE!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-semibold text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>All 160+ Current Technical PDFs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Lifetime Access — No Subscription Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Includes All Future Added Notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>High-Res Printable Vector PDF Format</span>
                </div>
              </div>
            </div>

            {/* Right Offer Box */}
            <div className="lg:col-span-4 bg-black text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between text-center border border-neutral-800">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-black bg-white px-3 py-1 rounded-full inline-block mb-3 border border-white">
                  ONE-TIME INVESTMENT
                </span>

                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    ₹{siteConfig.allAccessPrice}
                  </span>
                  <span className="text-sm text-neutral-500 line-through font-semibold">
                    ₹{siteConfig.allAccessOriginalPrice}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mb-6 font-medium">
                  Instant library activation • Lifetime ownership
                </p>
              </div>

              {hasAllAccess ? (
                <div className="p-3 bg-neutral-900 text-white rounded-xl border border-neutral-700 text-sm font-bold flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  Pass Active on Your Account
                </div>
              ) : (
                <Link
                  href="/payment"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black font-extrabold text-sm px-6 py-3.5 rounded-xl border border-emerald-400 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-black" /> Get All Notes Pass (₹{siteConfig.allAccessPrice})
                </Link>
              )}

              <span className="text-[11px] text-neutral-500 mt-3 block font-medium">
                🔒 Safe & Instant Digital Unlocking
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
