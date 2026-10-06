import React from 'react';
import { AccessStatus } from '@/types';
import { CheckCircle2, Lock, Sparkles, RefreshCw } from 'lucide-react';

interface AccessBadgeProps {
  status: AccessStatus | 'NEW' | 'UPDATED' | 'POPULAR';
}

export const AccessBadge: React.FC<AccessBadgeProps> = ({ status }) => {
  switch (status) {
    case 'PURCHASED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-white text-black rounded-full border border-white">
          <CheckCircle2 className="w-3.5 h-3.5 text-black" />
          Unlocked
        </span>
      );
    case 'ALL_ACCESS':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-neutral-900 text-white rounded-full border border-neutral-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          All-Access Pass
        </span>
      );
    case 'LOCKED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-neutral-900 text-neutral-400 rounded-full border border-neutral-800">
          <Lock className="w-3.5 h-3.5 text-neutral-400" />
          Locked
        </span>
      );
    case 'NEW':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 bg-white text-black rounded-full border border-white">
          <Sparkles className="w-3 h-3 text-black" />
          New
        </span>
      );
    case 'UPDATED':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 bg-neutral-900 text-neutral-300 rounded-full border border-neutral-700">
          <RefreshCw className="w-3 h-3 text-neutral-300" />
          Updated
        </span>
      );
    case 'POPULAR':
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 bg-neutral-800 text-white rounded-full border border-neutral-600">
          Popular
        </span>
      );
    default:
      return null;
  }
};
