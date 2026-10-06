'use client';

import React from 'react';
import { Note } from '@/types';
import { useAccess } from '@/context/AccessContext';
import { Badge } from '@/components/common/Badge';
import { AccessBadge } from '@/components/common/AccessBadge';
import { Button } from '@/components/common/Button';
import { BookOpen, FileText, Eye, Check, ShoppingBag, Tag, Lock, Download } from 'lucide-react';
import Link from 'next/link';

interface NoteCardProps {
  note: Note;
  index?: number;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { getNoteAccessStatus, purchaseNote, openPreviewModal } = useAccess();
  const accessStatus = getNoteAccessStatus(note);
  const isUnlocked = accessStatus === 'PURCHASED' || accessStatus === 'ALL_ACCESS';
  const isDownloadable = note.downloadable !== false;

  const displayPrice = 199;
  const originalPrice = 699;

  return (
    <div className="group flex flex-col h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-black transition-all duration-300">
      {/* Top Cover Visual */}
      <div className="relative h-40 bg-neutral-50 p-5 flex flex-col justify-between overflow-hidden border-b border-neutral-200">
        <div className="flex items-center justify-between gap-2 z-10">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-black bg-neutral-200 px-2.5 py-1 rounded-md border border-neutral-300">
            {note.categoryName}
          </span>
          <div className="flex items-center gap-1.5">
            {isDownloadable ? (
              <span className="text-[10px] font-bold text-black bg-white px-2 py-0.5 rounded border border-neutral-300 flex items-center gap-1">
                <Download className="w-3 h-3 text-black" /> PREVIEW ON
              </span>
            ) : (
              <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 flex items-center gap-1">
                <Lock className="w-3 h-3 text-neutral-600" /> LOCKED
              </span>
            )}
          </div>
        </div>

        {/* Notebook title preview in cover */}
        <div className="z-10 mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-black" />
            <span className="text-xs text-neutral-600 font-semibold">
              Handwritten PDF • {note.pagesCount} Pages
            </span>
          </div>
          <h3 className="text-black font-extrabold text-base line-clamp-2 leading-snug group-hover:text-neutral-700 transition-colors">
            {note.title}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4 bg-white text-black">
        <div>
          {/* Topics/Tags preview */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {note.topics.slice(0, 3).map((topic, i) => (
              <span
                key={i}
                className="text-[11px] font-medium bg-neutral-100 text-neutral-800 border border-neutral-200 px-2 py-0.5 rounded-md"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Page stats */}
          <div className="flex items-center justify-between py-2 border-t border-b border-neutral-200 text-xs text-neutral-600">
            <span className="flex items-center gap-1 font-semibold text-black">
              <BookOpen className="w-3.5 h-3.5 text-black" />
              {note.pagesCount} PDF Pages
            </span>
            <span className="flex items-center gap-1 font-semibold text-black">
              <Tag className="w-3.5 h-3.5 text-black" />
              Interview Ready
            </span>
          </div>
        </div>

        {/* Pricing and CTAs */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-black">
                ₹{displayPrice}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                ₹{originalPrice}
              </span>
            </div>
            <span className="text-[10px] font-extrabold text-white bg-black px-2 py-0.5 rounded-md">
              60% OFF
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openPreviewModal(note)}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs py-2.5 rounded-xl border border-neutral-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-black" />
              Preview
            </button>

            <Link
              href="/payment?type=all_notes"
              className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white" />
              Get Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
