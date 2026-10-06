'use client';

import React, { createContext, useContext, useState } from 'react';
import { AccessStatus, Note } from '@/types';

interface AccessContextType {
  purchasedNoteIds: string[];
  purchasedBundleIds: string[];
  purchasedCategoryIds: string[];
  hasAllAccess: boolean;
  purchaseNote: (noteId: string) => void;
  purchaseBundle: (bundleId: string, includedNoteIds: string[]) => void;
  purchaseCategory: (categoryId: string) => void;
  purchaseAllAccess: () => void;
  getNoteAccessStatus: (note: Note) => AccessStatus;
  resetAccess: () => void;
  activePreviewNote: Note | null;
  openPreviewModal: (note: Note) => void;
  closePreviewModal: () => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export const AccessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [purchasedNoteIds, setPurchasedNoteIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('nc_purchased_notes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [purchasedBundleIds, setPurchasedBundleIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('nc_purchased_bundles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [purchasedCategoryIds, setPurchasedCategoryIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('nc_purchased_categories');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hasAllAccess, setHasAllAccess] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('nc_all_access') === 'true';
    } catch {
      return false;
    }
  });

  const [activePreviewNote, setActivePreviewNote] = useState<Note | null>(null);

  const purchaseNote = (noteId: string) => {
    if (!purchasedNoteIds.includes(noteId)) {
      const updated = [...purchasedNoteIds, noteId];
      setPurchasedNoteIds(updated);
      localStorage.setItem('nc_purchased_notes', JSON.stringify(updated));
    }
  };

  const purchaseBundle = (bundleId: string, includedNoteIds: string[]) => {
    if (!purchasedBundleIds.includes(bundleId)) {
      const updatedBundles = [...purchasedBundleIds, bundleId];
      const updatedNotes = Array.from(new Set([...purchasedNoteIds, ...includedNoteIds]));
      setPurchasedBundleIds(updatedBundles);
      setPurchasedNoteIds(updatedNotes);
      localStorage.setItem('nc_purchased_bundles', JSON.stringify(updatedBundles));
      localStorage.setItem('nc_purchased_notes', JSON.stringify(updatedNotes));
    }
  };

  const purchaseCategory = (categoryId: string) => {
    if (!purchasedCategoryIds.includes(categoryId)) {
      const updated = [...purchasedCategoryIds, categoryId];
      setPurchasedCategoryIds(updated);
      localStorage.setItem('nc_purchased_categories', JSON.stringify(updated));
    }
  };

  const purchaseAllAccess = () => {
    setHasAllAccess(true);
    localStorage.setItem('nc_all_access', 'true');
  };

  const resetAccess = () => {
    setPurchasedNoteIds([]);
    setPurchasedBundleIds([]);
    setPurchasedCategoryIds([]);
    setHasAllAccess(false);
    localStorage.removeItem('nc_purchased_notes');
    localStorage.removeItem('nc_purchased_bundles');
    localStorage.removeItem('nc_purchased_categories');
    localStorage.removeItem('nc_all_access');
  };

  const getNoteAccessStatus = (note: Note): AccessStatus => {
    if (hasAllAccess) return 'ALL_ACCESS';
    if (purchasedNoteIds.includes(note.id)) return 'PURCHASED';
    if (purchasedCategoryIds.includes(note.categoryId)) return 'PURCHASED';
    // Check if part of purchased bundle
    return 'NOT_PURCHASED';
  };

  const openPreviewModal = (note: Note) => {
    setActivePreviewNote(note);
  };

  const closePreviewModal = () => {
    setActivePreviewNote(null);
  };

  return (
    <AccessContext.Provider
      value={{
        purchasedNoteIds,
        purchasedBundleIds,
        purchasedCategoryIds,
        hasAllAccess,
        purchaseNote,
        purchaseBundle,
        purchaseCategory,
        purchaseAllAccess,
        getNoteAccessStatus,
        resetAccess,
        activePreviewNote,
        openPreviewModal,
        closePreviewModal,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
};
