'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const pathname = usePathname();

  // Hide on checkout/payment pages to avoid cluttering checkout form
  if (pathname === '/payment' || pathname === '/payment/upi' || pathname === '/payment/bundle') return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-black text-white border-t border-neutral-800 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300 font-sans">
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-bold text-neutral-300 block truncate">
          Lifetime All-Access Pass
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <strong className="text-base font-black text-white">₹199</strong>
          <span className="text-[11px] text-neutral-400 line-through font-medium">₹699</span>
          <span className="text-[9px] font-black text-black bg-white px-1.5 py-0.5 rounded">
            71% OFF
          </span>
        </div>
      </div>

      <Link
        href="/payment?type=all_notes"
        className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-200 text-black text-xs font-black px-4 py-3 rounded-xl shadow-lg transition-all shrink-0 border border-white active:scale-95 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
        <span>Pay ₹199 for All Notes</span>
        <ArrowRight className="w-3.5 h-3.5 text-black shrink-0" />
      </Link>
    </div>
  );
};
