'use client';

import React, { useState } from 'react';
import { useAccess } from '@/context/AccessContext';
import { useAdminData } from '@/context/AdminDataContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  BookOpen,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Lock,
} from 'lucide-react';

export const PDFPreviewModal: React.FC = () => {
  const { activePreviewNote, closePreviewModal } = useAccess();
  const { notes: adminNotes } = useAdminData();
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  if (!activePreviewNote) return null;

  // Sync live admin data for this note
  const liveNote =
    adminNotes.find((n) => n.id === activePreviewNote.id || n.title === activePreviewNote.title) ||
    activePreviewNote;

  const rawPages = liveNote.previewPages || [
    {
      title: `${liveNote.title} - Key Concepts`,
      content: [
        '1. Architecture & Design Principles',
        '2. Step-by-Step Practical Implementation',
        '3. Complexity Matrix & Optimization',
      ],
    },
    {
      title: `${liveNote.title} - Implementation Details`,
      content: [
        '• Code patterns and code snippets',
        '• Performance benchmarking',
      ],
    },
    {
      title: `${liveNote.title} - Interview Q&A`,
      content: [
        '• Frequently asked interview questions',
        '• Revision summary points',
      ],
    },
  ];

  // Enforce user instruction: Maximum 3 preview pages allowed
  const previewPages = rawPages.slice(0, 3);
  const activePage = previewPages[currentPage] || previewPages[0];
  const isDownloadDisabled = liveNote.downloadable === false;

  const handleDownload = async () => {
    if (isDownloadDisabled) {
      setDownloadMsg('Downloading is disabled by admin for this document.');
      setTimeout(() => setDownloadMsg(null), 3000);
      return;
    }

    try {
      const res = await fetch(`/api/pdf/download?id=${liveNote.id}`);
      if (!res.ok) {
        const data = await res.json();
        setDownloadMsg(data.error || 'Download disabled.');
        setTimeout(() => setDownloadMsg(null), 3000);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${liveNote.slug || liveNote.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="bg-black text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white text-black rounded-lg shrink-0">
              <FileText className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider block">
                {liveNote.categoryName}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {liveNote.title}
              </h3>
            </div>
          </div>

          {/* Header Controls: Close button */}
          <div className="flex items-center gap-2">
            <button
              onClick={closePreviewModal}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-black text-white text-xs px-4 py-2.5 text-center font-bold border-b border-neutral-800 flex flex-wrap items-center justify-between gap-2">
          <span>🔒 Locked Resource: Get All 200+ Notes for ₹199 (M.R.P. ₹699)</span>
          <a
            href="/payment?type=all_notes"
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-black px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer border border-emerald-400 shadow-sm"
          >
            Get All Notes Now (₹199) →
          </a>
        </div>

        {/* Modal Body Container - Focused PDF Document Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black flex flex-col items-center">
          {/* Embedded Google Drive Iframe or Document Canvas */}
          {(() => {
            const driveUrl = liveNote.fileUrl || '';
            let embedUrl: string | null = null;
            const match = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) embedUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
            const idMatch = driveUrl.match(/id=([a-zA-Z0-9_-]+)/);
            if (idMatch && idMatch[1] && driveUrl.includes('drive.google.com')) embedUrl = `https://drive.google.com/file/d/${idMatch[1]}/preview`;
            if (driveUrl.endsWith('.pdf') || driveUrl.includes('/preview')) embedUrl = driveUrl;

            if (embedUrl) {
              return (
                <div className="w-full max-w-3xl h-[650px] bg-white rounded-xl overflow-hidden border border-neutral-800 shadow-2xl relative">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    title={liveNote.title}
                    allow="autoplay"
                  />
                </div>
              );
            }

            return (
              <>
                {/* Page Info Bar */}
                <div className="w-full max-w-3xl bg-neutral-900 px-4 py-2 rounded-t-xl border-t border-x border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-400 shadow-xs">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <BookOpen className="w-4 h-4 text-white" />
                    Page {currentPage + 1} of {previewPages.length}
                  </span>
                </div>

                {/* Document Sheet */}
                <div
                  className="w-full max-w-3xl min-h-[420px] bg-white rounded-b-xl border border-neutral-300 p-6 sm:p-10 shadow-2xl flex flex-col justify-between relative transition-transform duration-150"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Watermark Lines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(to bottom, #000000 1px, transparent 1px)',
                      backgroundSize: '100% 28px',
                    }}
                  />

                  <div className="relative z-10 space-y-4">
                    <div className="pb-3 border-b-2 border-black">
                      <h4 className="text-lg font-extrabold text-black">
                        {activePage.title || 'Document Content'}
                      </h4>
                      <p className="text-xs text-neutral-600 font-medium mt-1">
                        Topics: {liveNote.topics.join(' • ')}
                      </p>
                    </div>

                    {/* Content Points */}
                    <div className="space-y-3 pt-2 text-sm font-sans font-medium text-neutral-900 leading-relaxed">
                      {activePage.content.map((point, idx) => (
                        <div
                          key={idx}
                          className="bg-neutral-100 p-3.5 rounded-lg border border-neutral-200 shadow-2xs"
                        >
                          <p>{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Document Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
                    <span className="text-4xl sm:text-5xl font-black uppercase text-black -rotate-25">
                      Technical PDF Notes
                    </span>
                  </div>

                  {/* Bottom Page Navigation Controls */}
                  {previewPages.length > 1 && (
                    <div className="relative z-10 flex items-center justify-between pt-6 mt-6 border-t border-neutral-200">
                      <button
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="flex items-center gap-1 text-xs font-bold text-black disabled:opacity-30 hover:underline cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>

                      <div className="flex gap-1.5">
                        {previewPages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              currentPage === idx ? 'bg-black w-6' : 'bg-neutral-300'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        disabled={currentPage === previewPages.length - 1}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="flex items-center gap-1 text-xs font-bold text-black disabled:opacity-30 hover:underline cursor-pointer"
                      >
                        Next <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};



