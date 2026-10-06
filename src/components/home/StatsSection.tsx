import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { BookOpen, HelpCircle, GraduationCap, RefreshCw } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const statsList = [
    {
      label: 'PDF Notes',
      value: `${siteConfig.stats.totalNotes}+`,
      subtext: 'High-density revision sheets',
      icon: <BookOpen className="w-6 h-6 text-white" />,
    },
    {
      label: 'Interview Q&As',
      value: `${siteConfig.stats.totalQuestions}+`,
      subtext: 'Technical interview problems',
      icon: <HelpCircle className="w-6 h-6 text-white" />,
    },
    {
      label: 'Subjects Covered',
      value: `${siteConfig.stats.totalSubjects}+`,
      subtext: 'Programming, Systems & Cloud',
      icon: <GraduationCap className="w-6 h-6 text-white" />,
    },
    {
      label: 'Content Sync',
      value: siteConfig.stats.updatedLabel,
      subtext: 'Free updates for all buyers',
      icon: <RefreshCw className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="relative z-10 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
          {statsList.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 ${index > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0 border border-neutral-700">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-neutral-300">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
