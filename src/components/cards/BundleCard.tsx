'use client';

import React from 'react';
import Link from 'next/link';
import { Bundle } from '@/types';
import { useAccess } from '@/context/AccessContext';
import { Badge } from '@/components/common/Badge';
import { Layers, FileText, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface BundleCardProps {
  bundle: Bundle;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const { purchasedBundleIds, hasAllAccess } = useAccess();
  const isPurchased = hasAllAccess || purchasedBundleIds.includes(bundle.id);

  return (
    <div className="group flex flex-col justify-between bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white transition-all duration-300 text-white">
      {/* Header Accent Banner */}
      <div className="bg-black p-4 text-white border-b border-neutral-800">
        <div className="flex items-center justify-between gap-2">
          {bundle.badge && (
            <Badge variant="primary" className="text-[10px] tracking-wider uppercase font-bold">
              {bundle.badge}
            </Badge>
          )}
          <span className="text-xs font-bold text-black bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-white">
            {bundle.savings}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neutral-300 transition-colors">
            {bundle.name}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4 font-medium">
            {bundle.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-black rounded-xl border border-neutral-800 text-xs">
            <div className="flex items-center gap-2 text-white font-medium">
              <Layers className="w-4 h-4 text-white" />
              <span>{bundle.includedPdfCount} PDF Collections</span>
            </div>
            <div className="flex items-center gap-2 text-white font-medium">
              <FileText className="w-4 h-4 text-white" />
              <span>{bundle.includedResourcesCount}+ Notes & Q&As</span>
            </div>
          </div>

          {/* Included Key Benefits */}
          <div className="space-y-1.5 mb-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Bundle Highlights:
            </span>
            {bundle.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-medium">
                <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                <span className="line-clamp-1">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between pt-4 border-t border-neutral-800 mb-4">
            <div>
              <span className="text-2xl font-black text-white">₹{bundle.price}</span>
              <span className="text-sm text-neutral-500 line-through ml-2">₹{bundle.originalPrice}</span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              Lifetime Access
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/bundles/${bundle.slug}`}
              className="inline-flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-neutral-700 transition-colors"
            >
              View Bundle <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {isPurchased ? (
              <Link
                href="/notes"
                className="inline-flex items-center justify-center gap-1.5 bg-white text-black font-extrabold text-xs py-2.5 px-3 rounded-xl border border-white"
              >
                <Check className="w-3.5 h-3.5 text-black" /> Open Bundle
              </Link>
            ) : (
              <Link
                href="/payment/bundle"
                className="inline-flex items-center justify-center bg-white hover:bg-neutral-200 text-black font-extrabold text-xs py-2.5 px-3 rounded-xl border border-white transition-colors shadow-md"
              >
                Get Bundle
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
