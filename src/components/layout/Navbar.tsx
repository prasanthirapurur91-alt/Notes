'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { BookOpen, Sparkles, Menu, ShieldCheck, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Notes Store', href: '/' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white text-black border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-sm group-hover:bg-neutral-800 transition-colors">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-black flex items-center gap-1.5">
                PREP <span className="text-neutral-500">LIBRARY</span>
              </span>
              <span className="text-[10px] text-neutral-500 tracking-wider uppercase font-semibold block -mt-1">
                Notes & Category Store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-neutral-100 text-black border border-neutral-300'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/payment?type=all_notes"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-700/30 cursor-pointer border border-emerald-400 green-blinking-border shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Get All Notes (₹199)</span>
            </Link>
          </div>

          {/* Mobile Hamburger & Quick Action */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/payment?type=all_notes"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black px-3 py-1.5 rounded-lg border border-emerald-400 green-blinking-border"
            >
              Get All Notes (₹199)
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={[...navLinks, { name: 'Get All Notes (₹199)', href: '/payment?type=all_notes' }]}
      />
    </>
  );
};



