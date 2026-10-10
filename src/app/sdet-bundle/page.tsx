'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminData } from '@/context/AdminDataContext';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Terminal,
  Check,
} from 'lucide-react';

export default function SDETBundlePage() {
  const { products } = useAdminData();
  const sdetPrice = products.find((p) => p.id === 'prod-sdet-bundle' || p.type === 'bundle')?.price || 99;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'What exactly will I receive?',
      a: 'You receive 27+ SDET PDF notes, 400+ QA and SDET interview questions and answers covering manual testing, Java, Selenium, Playwright, REST Assured, TestNG, API testing, and coding/DSA, plus framework guides and a real Playwright project.',
    },
    {
      q: 'Is this useful for beginners?',
      a: 'Yes. The roadmap begins with testing fundamentals and builds toward UI automation, API automation, frameworks, and interview preparation.',
    },
    {
      q: 'Does it include a real Playwright framework?',
      a: 'Yes. It includes a downloadable Playwright E2E automation framework with working UI and API examples, reusable components, reporting, and setup guidance.',
    },
    {
      q: 'Are UI and API automation included?',
      a: 'Yes. The material and Playwright project cover both UI and API automation workflows.',
    },
    {
      q: 'How will I receive the bundle?',
      a: 'The bundle will be delivered digitally using the purchase email once the Payment is completed.',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white pt-14 pb-20 sm:py-24 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-700 text-xs font-bold tracking-wider uppercase">
                QA / SDET JOB PREPARATION BUNDLE
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                QA / SDET Job <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
                  Preparation Bundle
                </span>
              </h1>

              <div className="space-y-1">
                <p className="text-base sm:text-lg text-neutral-300 font-bold">
                  Learn. Practice. Build. Prepare for QA / SDET Interviews.
                </p>
                <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed font-medium">
                  Master key concepts, practise real questions, understand frameworks, and build with a complete Playwright project.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/payment/bundle"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-900/40 border border-emerald-500 text-sm cursor-pointer"
                >
                  Get Complete SDET Bundle (₹{sdetPrice})
                </Link>

                <a
                  href="#whats-inside"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-5 py-3.5 rounded-xl transition-all border border-neutral-700 text-sm"
                >
                  See What&apos;s Inside ↓
                </a>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-neutral-800 text-center">
                <div>
                  <strong className="block text-2xl sm:text-3xl font-black text-white">27+</strong>
                  <span className="text-xs text-neutral-400 font-semibold">PDF Notes</span>
                </div>
                <div>
                  <strong className="block text-2xl sm:text-3xl font-black text-white">400+</strong>
                  <span className="text-xs text-neutral-400 font-semibold">Interview Questions</span>
                </div>
                <div>
                  <strong className="block text-2xl sm:text-3xl font-black text-white">1</strong>
                  <span className="text-xs text-neutral-400 font-semibold">Playwright E2E Project</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-neutral-900 p-4 rounded-3xl border border-neutral-800 shadow-2xl">
                <div className="bg-black text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-neutral-800">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-xs font-bold text-black uppercase tracking-wider bg-white px-2.5 py-1 rounded">
                      SDET Bundle Preview
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold">Updated 2026</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-white" /> 27+ Handcrafted PDFs
                      </div>
                      <p className="text-neutral-400 font-sans">
                        Manual Testing, SQL, Java, Selenium, Playwright, REST Assured, TestNG, Docker, Git.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-white" /> Real Playwright Project
                      </div>
                      <p className="text-neutral-400 font-sans">
                        22 working tests, Page Object Model, JSON/Jackson POJOs, Allure reporting & video traces.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400">Special Bundle Price</span>
                    <span className="text-xl font-black text-white">₹{sdetPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-neutral-950 border-b border-neutral-800 py-4 text-neutral-300 text-xs sm:text-sm font-semibold">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" /> Structured Preparation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" /> Interview Focused
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" /> Real Framework
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-white" /> Learn at Your Own Pace
          </span>
        </div>
      </section>

      {/* WHAT'S INSIDE SECTION */}
      <section id="whats-inside" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
            WHAT&apos;S INSIDE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            One focused bundle. Four ways to prepare.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 font-medium">
            Build a practical QA and software testing interview preparation path from core concepts to framework explanations and automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Core Notes */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-xl hover:border-white transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0 border border-neutral-700">
                📚
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Foundation</span>
                <h3 className="text-lg font-extrabold text-white">Core QA / SDET Notes</h3>
                <p className="text-xs text-neutral-400">27+ focused PDFs for concepts, tools, and quick revision.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {[
                  'Manual Testing',
                  'SQL',
                  'Java',
                  'Python',
                  'OOPs',
                  'Selenium',
                  'Playwright',
                  'Postman',
                  'REST Assured',
                  'TestNG',
                  'Maven',
                  'Docker',
                  'Git & GitHub',
                  'Jenkins / CI-CD',
                  'JavaScript',
                  'System Design',
                ].map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-black text-white font-semibold px-2.5 py-1 rounded-md border border-neutral-800"
                  >
                    <Check className="w-3 h-3 text-white" /> {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Question Banks */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-xl hover:border-white transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0 border border-neutral-700">
                🎯
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Practice</span>
                <h3 className="text-lg font-extrabold text-white">Interview Question Banks</h3>
                <p className="text-xs text-neutral-400">400+ questions across key QA / SDET interview areas.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {[
                  'Coding / DSA',
                  'Java',
                  'Selenium',
                  'Playwright',
                  'REST Assured',
                  'TestNG',
                  'Software Testing',
                ].map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-black text-white font-semibold px-2.5 py-1 rounded-md border border-neutral-800"
                  >
                    <Check className="w-3 h-3 text-white" /> {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Framework Guides */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-xl hover:border-white transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0 border border-neutral-700">
                ⚙️
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Explain</span>
                <h3 className="text-lg font-extrabold text-white">Framework Explanation Guides</h3>
                <p className="text-xs text-neutral-400">Speak clearly about framework design, structure, and decisions.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {[
                  'Explain Your Selenium Framework',
                  'Explain Your REST Assured Framework',
                  'Explain Your Playwright Framework',
                ].map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-black text-white font-semibold px-2.5 py-1 rounded-md border border-neutral-800"
                  >
                    <Check className="w-3 h-3 text-white" /> {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Complete Playwright Project */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-xl hover:border-white transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shrink-0 border border-neutral-700">
                🚀
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-400 uppercase">Build</span>
                <h3 className="text-lg font-extrabold text-white">Complete Playwright Project</h3>
                <p className="text-xs text-neutral-400">1 production-style project combining UI and API automation.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800">
              <div className="flex flex-wrap gap-2">
                {[
                  'Complete Playwright E2E Framework',
                  'UI + API automation',
                  'Java 21 / Maven',
                  'TestNG & Page Objects',
                  'Reporting and logging',
                  'Screenshots, traces & video',
                  'Parallel execution',
                  'Cross-browser coverage',
                ].map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-black text-white font-semibold px-2.5 py-1 rounded-md border border-neutral-800"
                  >
                    <Check className="w-3 h-3 text-white" /> {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-16 sm:py-24 bg-black border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-800 text-center space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700 inline-block">
              COMPLETE PREPARATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">
              Complete QA / SDET Job Preparation Bundle
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Get a clear SDET preparation path without piecing together disconnected resources.
            </p>

            <div className="py-4">
              <div className="text-4xl sm:text-5xl font-black text-white mb-1">₹{sdetPrice}</div>
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                One-time payment • Instant digital access
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/payment/bundle"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold text-base px-8 py-4 rounded-xl shadow-xl transition-all border border-white"
              >
                Get Complete SDET Bundle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
            QUICK ANSWERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 shadow-md">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left font-bold text-white text-sm sm:text-base cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-neutral-400" />}
              </button>
              {openFaq === idx && (
                <p className="mt-3 pt-3 border-t border-neutral-800 text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
