'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { useAccess } from '@/context/AccessContext';
import { X, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  const pathname = usePathname();
  const { hasAllAccess } = useAccess();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200">
      <div className="bg-black text-white p-6 shadow-2xl flex flex-col h-full overflow-y-auto border-l border-neutral-800">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold border border-white">
              <BookOpen className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight flex items-center gap-1">
                TECHNICAL <span className="text-neutral-400">PDF NOTES</span>
              </span>
              <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-semibold block">
                Learn • Revise • Prepare
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer border border-neutral-700"
            aria-label="Close Mobile Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-6 space-y-2 flex-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                  isActive
                    ? 'bg-white text-black border border-white shadow-md'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Bottom Action CTA in Mobile Menu */}
        <div className="pt-6 border-t border-neutral-800 space-y-3">
          {hasAllAccess ? (
            <div className="p-3 bg-neutral-900 rounded-xl text-center text-xs font-bold text-white border border-neutral-700 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              All-Access Pass Activated
            </div>
          ) : (
            <Link
              href="/payment"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold text-sm px-5 py-3.5 rounded-xl border border-white shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-black" /> Get All Notes Pass (₹99)
            </Link>
          )}

          <p className="text-center text-xs text-neutral-400 font-medium">
            Handwritten technical notes for learning & interview prep.
          </p>
        </div>
      </div>
    </div>
  );
};
