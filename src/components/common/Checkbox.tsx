'use client';

import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  sublabel?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  sublabel,
  checked,
  onChange,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const fallbackId = React.useId();
  const generatedId = id || fallbackId;

  return (
    <label
      htmlFor={generatedId}
      className={`inline-flex items-start gap-3 cursor-pointer select-none group ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center pt-0.5">
        <input
          type="checkbox"
          id={generatedId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="custom-checkbox shrink-0"
          {...props}
        />
      </div>
      {(label || sublabel) && (
        <div className="text-sm">
          {label && (
            <span className="font-semibold text-white group-hover:text-neutral-300 transition-colors">
              {label}
            </span>
          )}
          {sublabel && (
            <p className="text-xs text-neutral-400 mt-0.5 font-normal">{sublabel}</p>
          )}
        </div>
      )}
    </label>
  );
};
