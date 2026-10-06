'use client';

import React from 'react';
import Link from 'next/link';

export const WhatYouGetSection: React.FC = () => {
  const features = [
    {
      icon: '✍️',
      title: 'Handwritten Notes',
      description: 'Easy to understand and quick to revise.',
    },
    {
      icon: '🎯',
      title: 'Interview Focused',
      description: 'Important concepts and questions for interviews.',
    },
    {
      icon: '📚',
      title: 'Multiple Subjects',
      description: (
        <>
          <Link href="/notes" className="text-white font-semibold underline hover:text-neutral-300">
            Java
          </Link>
          ,{' '}
          <Link href="/notes" className="text-white font-semibold underline hover:text-neutral-300">
            DSA
          </Link>
          ,{' '}
          <Link href="/notes" className="text-white font-semibold underline hover:text-neutral-300">
            SQL
          </Link>
          ,{' '}
          <Link href="/notes" className="text-white font-semibold underline hover:text-neutral-300">
            Python
          </Link>
          ,{' '}
          <Link href="/notes" className="text-white font-semibold underline hover:text-neutral-300">
            System Design
          </Link>{' '}
          and{' '}
          <Link href="/notes" className="text-white font-semibold underline hover:text-neutral-300">
            more
          </Link>
          .
        </>
      ),
    },
    {
      icon: '🔄',
      title: 'Regularly Updated',
      description: 'New notes and resources added regularly.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black text-white border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full border border-neutral-700">
            WHY TECHNICAL PDF NOTES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            What You&apos;ll Get
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 hover:border-white hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4 p-3 bg-neutral-900 rounded-xl w-fit border border-neutral-700 shadow-xs">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
