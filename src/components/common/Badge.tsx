import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'dark' | 'outline' | 'demo';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-white text-black border border-white font-bold',
    secondary: 'bg-neutral-900 text-neutral-300 border border-neutral-700',
    accent: 'bg-neutral-800 text-white border border-neutral-600',
    dark: 'bg-black text-white border border-neutral-800',
    outline: 'border border-neutral-400 text-neutral-200',
    demo: 'bg-neutral-900 text-white border border-neutral-600 font-bold tracking-wider text-[10px]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide shadow-sm transition-all ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
