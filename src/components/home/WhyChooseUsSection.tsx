import React from 'react';
import { SectionHeader } from '@/components/common/SectionHeader';
import { FileEdit, Target, Layers, RefreshCw } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      title: 'Handwritten Notes',
      description: 'Clean, structured, and visually highlighted notes designed to make complex technical concepts easy to understand and quick to revise.',
      icon: <FileEdit className="w-8 h-8 text-white" />,
    },
    {
      title: 'Interview Focused',
      description: 'Targeted focus on high-yield technical interview topics, coding patterns, system design trade-offs, and mandatory Q&A problems.',
      icon: <Target className="w-8 h-8 text-white" />,
    },
    {
      title: 'Multiple Subjects',
      description: 'Comprehensive coverage of 50+ topics including Programming, Backend, DSA, System Design, Testing, DevOps, Databases & AI.',
      icon: <Layers className="w-8 h-8 text-white" />,
    },
    {
      title: 'Regularly Updated',
      description: 'New notes and updated resource editions are added continuously over time, ensuring your access always stays up to date.',
      icon: <RefreshCw className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black border-t border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="WHY TECHNICAL PDF NOTES"
          title="What You'll Get"
          subtitle="Everything you need to accelerate your technical learning, clear university exams, and ace technical interviews."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl hover:border-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center mb-6 shadow-md border border-neutral-700">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 text-xs font-bold text-neutral-400 flex items-center gap-1">
                ✓ Included in access pass
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
