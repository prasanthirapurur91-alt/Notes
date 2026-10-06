import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div
      className={`mb-10 sm:mb-14 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-neutral-300 bg-neutral-900 px-3.5 py-1 rounded-full mb-3 border border-neutral-700 shadow-xs">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
