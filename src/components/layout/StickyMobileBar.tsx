'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const pathname = usePathname();

  // Hide on checkout/payment pages to avoid cluttering checkout form
  if (pathname === '/payment' || pathname === '/payment/upi' || pathname === '/payment/bundle') return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black/95 backdrop-blur-lg text-white border-t-2 border-emerald-500/40 px-5 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300 font-sans">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Lifetime All-Access</span>
        </div>
        <div className="flex items-baseline gap-2 mt-0.5">
          <strong className="text-xl font-black text-white">₹199</strong>
          <span className="text-xs text-neutral-400 line-through font-medium">₹699</span>
          <span className="text-[10px] font-extrabold text-black bg-emerald-400 px-1.5 py-0.5 rounded-md">
            71% OFF
          </span>
        </div>
      </div>

      <Link
        href="/payment?type=all_notes"
        className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-black px-5 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/50 transition-all shrink-0 active:scale-95 cursor-pointer border border-emerald-400/40"
      >
        <Sparkles className="w-4 h-4 text-white shrink-0 animate-pulse" />
        <span className="text-xs font-black">Pay ₹199 for All Notes</span>
        <ArrowRight className="w-4 h-4 text-white shrink-0" />
      </Link>
    </div>
  );
};
