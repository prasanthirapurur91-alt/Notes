'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-16 sm:py-24 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
                ABOUT PREP LIBRARY
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Making Tech <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                  Easier to Learn.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
                Prep Library is a technology-focused learning platform creating simple, practical and easy-to-revise handwritten technical PDF notes for developers, students and interview candidates.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <Link
                  href="/notes"
                  className="bg-white hover:bg-neutral-200 text-black font-extrabold px-6 py-3.5 rounded-xl transition-all border border-white text-sm shadow-md"
                >
                  Explore Our Notes →
                </Link>
                <a
                  href="#what-we-create"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-5 py-3.5 rounded-xl transition-all border border-neutral-700 text-sm"
                >
                  See What We Create ↓
                </a>
              </div>
            </div>

            {/* Visual preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-neutral-900 p-4 rounded-3xl border border-neutral-800 shadow-2xl">
                <div className="bg-black text-white rounded-2xl p-6 text-center space-y-4 border border-neutral-800">
                  <div className="w-16 h-16 rounded-2xl bg-white text-black text-2xl font-black flex items-center justify-center mx-auto shadow-md border border-white">
                    <BookOpen className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">Prep Library</h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Learn. Revise. Grow.
                  </p>

                  <div className="p-3 bg-neutral-900 rounded-xl text-xs font-medium text-neutral-300 border border-neutral-800">
                    Handwritten PDF Notes • Interview Guides • Tech Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-neutral-950 border-b border-neutral-800 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <strong className="block text-2xl sm:text-3xl font-black text-white">160+</strong>
              <span className="text-xs text-neutral-400 font-medium">Handwritten Notes</span>
            </div>
            <div>
              <strong className="block text-2xl sm:text-3xl font-black text-white">1200+</strong>
              <span className="text-xs text-neutral-400 font-medium">Interview Questions</span>
            </div>
            <div>
              <strong className="block text-2xl sm:text-3xl font-black text-white">50+</strong>
              <span className="text-xs text-neutral-400 font-medium">Technology Subjects</span>
            </div>
            <div>
              <strong className="block text-2xl sm:text-3xl font-black text-white">11</strong>
              <span className="text-xs text-neutral-400 font-medium">Core Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE CREATE SECTION */}
      <section id="what-we-create" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
            WHAT WE CREATE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Everything you need to <br />
            <em className="not-italic text-neutral-400">learn and revise tech.</em>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2">
            We turn complex technical concepts into content that is easier to understand, remember and apply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-lg hover:border-white transition-all">
            <div className="text-3xl mb-3">🎥</div>
            <span className="text-xs font-bold text-neutral-400">01</span>
            <h3 className="text-lg font-extrabold text-white mt-1 mb-2">Tech Reels</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Short, practical videos explaining programming, system design and real-world technology.
            </p>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-lg hover:border-white transition-all">
            <div className="text-3xl mb-3">💡</div>
            <span className="text-xs font-bold text-neutral-400">02</span>
            <h3 className="text-lg font-extrabold text-white mt-1 mb-2">Interview Content</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Interview questions, coding problems and quick explanations to help you prepare smarter.
            </p>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-lg hover:border-white transition-all">
            <div className="text-3xl mb-3">📝</div>
            <span className="text-xs font-bold text-neutral-400">03</span>
            <h3 className="text-lg font-extrabold text-white mt-1 mb-2">Handwritten Notes</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Detailed PDF notes covering Java, Python, DSA, SQL, System Design, Testing, DevOps and more.
            </p>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 shadow-lg hover:border-white transition-all">
            <div className="text-3xl mb-3">📚</div>
            <span className="text-xs font-bold text-neutral-400">04</span>
            <h3 className="text-lg font-extrabold text-white mt-1 mb-2">Educational Posts</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Cheat sheets, coding tricks and quick-reference posts designed for fast revision.
            </p>
          </div>
        </div>
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
              Explore 160+ Notes →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
