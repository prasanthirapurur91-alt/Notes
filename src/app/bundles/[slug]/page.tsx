'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { bundles } from '@/data/bundles';
import { notes } from '@/data/notes';
import { faqs } from '@/data/faqs';
import { useAccess } from '@/context/AccessContext';
import { BundleCard } from '@/components/cards/BundleCard';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { FAQAccordion } from '@/components/common/FAQAccordion';
import {
  CheckCircle2,
  FileText,
  Layers,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export default function BundleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const bundle = bundles.find((b) => b.slug === slug);
  const { purchasedBundleIds, hasAllAccess, openPreviewModal } =
    useAccess();

  if (!bundle) {
    notFound();
  }

  const isPurchased = hasAllAccess || purchasedBundleIds.includes(bundle.id);
  const includedPdfs = notes.filter((n) => bundle.includedNoteIds.includes(n.id));
  const relatedBundles = bundles.filter((b) => b.id !== bundle.id).slice(0, 3);

  return (
    <div className="py-10 sm:py-16 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/bundles"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-400 hover:text-white hover:underline"
        >
          <ArrowLeft className="w-4 h-4 text-white" /> Back to All Bundles
        </Link>

        {/* Bundle Detail Hero Header */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {bundle.badge && (
                  <Badge variant="secondary" className="text-xs font-bold uppercase">
                    {bundle.badge}
                  </Badge>
                )}
                <span className="text-xs font-bold bg-white text-black px-2.5 py-0.5 rounded-full">
                  {bundle.savings}
                </span>
                {bundle.isDemo && <Badge variant="demo">DEMO BUNDLE</Badge>}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {bundle.name}
              </h1>

              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
                {bundle.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-neutral-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-white" />
                  {bundle.includedPdfCount} Major PDF Collections
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-white" />
                  {bundle.includedResourcesCount}+ Handwritten Notes & Q&As
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-white" />
                  Lifetime Updates Included
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="lg:col-span-4 bg-black text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-neutral-800 text-center space-y-4">
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  Bundle Offer Price
                </span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    ₹{bundle.price}
                  </span>
                  <span className="text-base text-neutral-500 line-through">
                    ₹{bundle.originalPrice}
                  </span>
                </div>
                <span className="text-xs text-white font-bold block mt-1">
                  Includes {bundle.savings} Instant Savings
                </span>
              </div>

              {isPurchased ? (
                <div className="p-3 bg-neutral-900 text-white rounded-xl border border-neutral-700 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Bundle Unlocked & Accessible
                </div>
              ) : (
                <Link
                  href="/payment/bundle"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md text-sm cursor-pointer border border-white"
                >
                  <Zap className="w-5 h-5 text-black" /> Buy Bundle (₹{bundle.price})
                </Link>
              )}

              <p className="text-[11px] text-neutral-500 font-medium">
                🔒 Instant PDF Digital Delivery • 100% Secure
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: What is Included (List of PDFs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-white border-b border-neutral-800 pb-3">
                Included PDF Notes & Handbooks
              </h2>

              <div className="space-y-4">
                {includedPdfs.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-black rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white transition-all"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        {note.categoryName}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {note.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {note.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPreviewModal(note)}
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-neutral-800 pb-2">
                  Who This Bundle Is For
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                  {bundle.whoItsFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-white border-b border-neutral-800 pb-2">
                  Key Benefits & Features
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                  {bundle.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Access & Future Policy */}
            <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 space-y-2 text-white">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>Lifetime Access & Future Addition Policy</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-400">
                Purchasing this bundle unlocks permanent lifetime access. Any future updates or newly created PDF notes within the included categories will automatically be added to your library without additional cost.
              </p>
            </div>

            {/* Bundle FAQ */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                Frequently Asked Questions
              </h3>
              <FAQAccordion items={faqs.slice(0, 4)} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-xs space-y-4 sticky top-24">
              <h3 className="text-lg font-bold text-white">
                Bundle Overview
              </h3>
              <div className="space-y-3 text-xs text-neutral-400">
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span>Total Included PDFs:</span>
                  <span className="font-bold text-white">
                    {bundle.includedPdfCount} PDF Collections
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span>Estimated Total Q&As:</span>
                  <span className="font-bold text-white">
                    {bundle.includedResourcesCount}+ Questions
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span>Total Discount:</span>
                  <span className="font-bold text-white">
                    {bundle.savings}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800">
                  <span>Format:</span>
                  <span className="font-bold text-white">
                    Digital Vector PDF
                  </span>
                </div>
              </div>

              {isPurchased ? (
                <Button href="/notes" variant="secondary" fullWidth>
                  Access Notes Now
                </Button>
              ) : (
                <Link
                  href="/payment/bundle"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold py-3 px-4 rounded-xl transition-all text-xs text-center cursor-pointer border border-white"
                >
                  Buy Bundle for ₹{bundle.price}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Related Bundles */}
        <div className="pt-8 border-t border-neutral-800 space-y-6">
          <h3 className="text-2xl font-bold text-white">Related Bundles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBundles.map((b) => (
              <BundleCard key={b.id} bundle={b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
