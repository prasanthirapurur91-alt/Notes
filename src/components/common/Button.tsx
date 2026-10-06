import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-bold',
  };

  const variantStyles = {
    primary:
      'bg-white hover:bg-neutral-200 text-black border border-white font-extrabold focus:ring-white',
    secondary:
      'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 focus:ring-neutral-700',
    dark:
      'bg-black hover:bg-neutral-900 text-white border border-neutral-800 focus:ring-black',
    outline:
      'border-2 border-white text-white hover:bg-white hover:text-black focus:ring-white',
    ghost:
      'bg-transparent text-neutral-300 hover:bg-neutral-900 hover:text-white focus:ring-neutral-700',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

