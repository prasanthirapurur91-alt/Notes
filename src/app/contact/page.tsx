'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  const adminEmail = 'prasanthirepuru7@gmail.com';

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1.5 rounded-full border border-neutral-700">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact <span className="text-neutral-400">Us</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Have a question about our handwritten technical notes, access pass, or resources? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Email Card */}
          <a
            href={`mailto:${adminEmail}`}
            className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-lg hover:shadow-xl hover:border-white transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0 border border-neutral-700">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <small className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Email Administrator
              </small>
              <strong className="text-xs sm:text-sm font-extrabold text-white group-hover:text-neutral-300 transition-colors block truncate">
                {adminEmail}
              </strong>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/prasanthi_views/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-lg hover:shadow-xl hover:border-white transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0 border border-neutral-700">
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <small className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                FOLLOW ON INSTAGRAM
              </small>
              <strong className="text-base font-extrabold text-white block">
                @prasanthi_views
              </strong>
              <span className="text-xs text-neutral-300 font-semibold group-hover:underline flex items-center gap-1 mt-0.5">
                Open Instagram →
              </span>
            </div>
          </a>
        </div>

        <p className="text-center text-xs text-neutral-500 font-medium mt-8">
          We usually respond to inquiry emails within 24 hours.
        </p>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-16 bg-black text-white text-center border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
            START LEARNING
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Your next interview starts with better preparation.
          </h2>
          <p className="text-neutral-400 text-sm">
            Explore our collection of handwritten notes and interview resources.
          </p>
          <div className="pt-2">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all border border-white shadow-lg"
            >
              Explore All Notes →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
