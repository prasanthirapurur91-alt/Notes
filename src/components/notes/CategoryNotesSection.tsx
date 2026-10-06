'use client';

import React, { useState } from 'react';
import { Note } from '@/types';
import { useAccess } from '@/context/AccessContext';
import { useAdminData } from '@/context/AdminDataContext';
import { Layout, Eye, Download, FileText, CheckCircle2, Lock } from 'lucide-react';

interface CategoryNotesSectionProps {
  title: string;
  categorySlug: string;
  notes: Note[];
  icon?: React.ReactNode;
}

export const CategoryNotesSection: React.FC<CategoryNotesSectionProps> = ({
  title,
  categorySlug,
  notes: initialPropsNotes,
  icon,
}) => {
  const { openPreviewModal } = useAccess();
  const { notes: adminNotes } = useAdminData();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadAllMsg, setDownloadAllMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Merge live admin state for each note
  const notes = initialPropsNotes.map((pn) => {
    const live = adminNotes.find((an) => an.id === pn.id || an.title === pn.title);
    return live || pn;
  });

  const handleDownloadNote = async (note: Note) => {
    // Strict Admin Permission Check
    if (note.downloadable === false) {
      setErrorMessage(`Downloading is disabled by the administrator for "${note.title}".`);
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    setDownloadingId(note.id);
    setErrorMessage(null);

    try {
      // Trigger API endpoint which also validates download permission
      const response = await fetch(`/api/pdf/download?id=${note.id}`);
      
      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || 'Downloading is currently disabled for this resource.');
        setDownloadingId(null);
        setTimeout(() => setErrorMessage(null), 4000);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${note.slug || note.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setTimeout(() => {
        setDownloadingId(null);
      }, 800);
    }
  };

  const handleGetAllNotes = () => {
    const downloadableNotes = notes.filter((n) => n.downloadable !== false);
    
    if (downloadableNotes.length === 0) {
      setErrorMessage(`Downloading is disabled by admin for all notes in ${title}.`);
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    setDownloadAllMsg(`Downloading ${downloadableNotes.length} available ${title} notes...`);
    
    downloadableNotes.forEach((note, i) => {
      setTimeout(() => {
        handleDownloadNote(note);
      }, i * 400);
    });

    setTimeout(() => {
      setDownloadAllMsg(null);
    }, 3000);
  };

  return (
    <div className="bg-neutral-950 p-4 sm:p-8 rounded-3xl border border-neutral-800 my-8 shadow-xs">
      <div className="bg-black rounded-2xl sm:rounded-3xl border border-neutral-800 p-6 sm:p-8 shadow-sm">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
              {icon || <Layout className="w-5 h-5 text-white" />}
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {title}
              </h2>
              <p className="text-xs font-semibold text-neutral-400 mt-0.5">
                {notes.length} resources available
              </p>
            </div>
          </div>

          <button
            onClick={handleGetAllNotes}
            className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-white"
          >
            <Download className="w-4 h-4 text-black" /> Get All Notes
          </button>
        </div>

        {downloadAllMsg && (
          <div className="mb-4 p-3 bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-white" />
            {downloadAllMsg}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-neutral-900 border border-neutral-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 animate-fade-in">
            <Lock className="w-4 h-4 text-white shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* Notes Cards Grid - 3 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notes.map((note, index) => {
            const isDownloading = downloadingId === note.id;
            const isDownloadDisabled = note.downloadable === false;

            return (
              <div
                key={note.id}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-2xl p-3.5 flex items-center justify-between gap-3 transition-all duration-200 shadow-sm group"
              >
                {/* 1. Category-wise Sequential Numbering */}
                <span className="text-xs font-mono font-bold text-neutral-500 shrink-0 w-5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* 2. PDF Icon */}
                <div className="w-8 h-8 rounded-lg bg-black border border-neutral-800 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-white" />
                </div>

                {/* 3. Note title */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs font-bold text-white truncate group-hover:text-neutral-300 transition-colors cursor-pointer"
                    title={note.title}
                    onClick={() => openPreviewModal(note)}
                  >
                    {note.title}
                  </h4>
                </div>

                {/* Action Buttons: Eye Icon, Down-Arrow Icon, or Lock Icon */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Eye Icon for View */}
                  <button
                    onClick={() => openPreviewModal(note)}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer border border-neutral-700"
                    title="View / Preview Note"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Down-Arrow Icon for Download OR Lock Icon when Download is OFF */}
                  <button
                    onClick={() => handleDownloadNote(note)}
                    disabled={isDownloading || isDownloadDisabled}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      isDownloadDisabled
                        ? 'bg-neutral-950 text-neutral-600 border border-neutral-800 cursor-not-allowed'
                        : 'bg-white hover:bg-neutral-200 text-black border border-white'
                    }`}
                    title={
                      isDownloadDisabled
                        ? 'Download Disabled by Admin'
                        : 'Download Note'
                    }
                  >
                    {isDownloadDisabled ? (
                      <Lock className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

