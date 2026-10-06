'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminData } from '@/context/AdminDataContext';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowLeft,
  Download,
  FileText,
  Lock,
  Maximize2,
} from 'lucide-react';

export default function DedicatedPDFViewerPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params?.id as string;
  const { notes } = useAdminData();

  const note = notes.find((n) => n.id === noteId || n.slug === noteId);

  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  if (!note) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <FileText className="w-16 h-16 text-neutral-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2">PDF Document Not Found</h1>
        <p className="text-neutral-400 mb-6 text-sm">
          The requested technical note could not be located or may have been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Notes
        </button>
      </div>
    );
  }

  const rawPreviewPages = note.previewPages || [
    {
      title: `${note.title} - Main Chapter`,
      content: [
        '1. Architecture Overview & Core Principles',
        '2. System Requirements and Data Flow Diagram',
        '3. Step-by-Step Problem Solving & Algorithmic Analysis',
        '4. Interview Tips, Complexity Tradeoffs & Best Practices',
      ],
    },
  ];
  const previewPages = rawPreviewPages.slice(0, 3);

  const activePage = previewPages[currentPage] || previewPages[0];
  const isDownloadDisabled = note.downloadable === false;

  const handleDownload = async () => {
    if (isDownloadDisabled) {
      setDownloadMsg('Downloading is disabled by admin for this document.');
      setTimeout(() => setDownloadMsg(null), 3000);
      return;
    }

    try {
      const res = await fetch(`/api/pdf/download?id=${note.id}`);
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
      link.download = `${note.slug || note.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans select-none">
      {/* PDF Viewer Top Toolbar */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Back to category"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back</span>
          </button>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {note.title}
            </h1>
            <p className="text-[11px] text-neutral-400 line-clamp-1">
              {note.categoryName} • {note.pagesCount} Pages
            </p>
          </div>
        </div>

        {/* Navigation & Zoom Controls */}
        <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-xl border border-neutral-800">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono font-bold text-neutral-300 px-2">
            Page {currentPage + 1} / {previewPages.length}
          </span>
          <button
            disabled={currentPage === previewPages.length - 1}
            onClick={() => setCurrentPage((p) => Math.min(previewPages.length - 1, p + 1))}
            className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="w-px h-4 bg-neutral-800 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-neutral-400">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(180, z + 10))}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1 text-neutral-400 hover:text-white cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action: Download (only if enabled) */}
        <div className="flex items-center gap-2">
          {!isDownloadDisabled ? (
            <button
              onClick={handleDownload}
              className="bg-white text-black hover:bg-neutral-200 font-bold text-xs px-4 py-2 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          ) : (
            <div className="bg-neutral-800 text-neutral-400 font-medium text-xs px-3 py-1.5 rounded-lg border border-neutral-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" /> Read-Only
            </div>
          )}
        </div>
      </header>

      {downloadMsg && (
        <div className="bg-neutral-900 text-neutral-200 text-xs px-4 py-2 text-center border-b border-neutral-700">
          {downloadMsg}
        </div>
      )}

      {/* PDF Main Document Canvas */}
      <main className="flex-1 p-4 sm:p-8 flex flex-col items-center justify-start overflow-auto bg-neutral-950">
        {(() => {
          const driveUrl = note.fileUrl || '';
          let embedUrl: string | null = null;
          const match = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
          if (match && match[1]) embedUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
          const idMatch = driveUrl.match(/id=([a-zA-Z0-9_-]+)/);
          if (idMatch && idMatch[1] && driveUrl.includes('drive.google.com')) embedUrl = `https://drive.google.com/file/d/${idMatch[1]}/preview`;
          if (driveUrl.endsWith('.pdf') || driveUrl.includes('/preview')) embedUrl = driveUrl;

          if (embedUrl) {
            return (
              <div className="w-full max-w-4xl h-[750px] bg-white rounded-xl overflow-hidden border border-neutral-800 shadow-2xl relative">
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  title={note.title}
                  allow="autoplay"
                />
              </div>
            );
          }

          return (
            <div
              className="bg-white text-neutral-900 shadow-2xl rounded-xl p-6 sm:p-12 w-full max-w-4xl min-h-[650px] transition-transform duration-150 flex flex-col justify-between relative border border-neutral-300"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              {/* Document Top Header */}
              <div>
                <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-black">
                  <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-black" />
                    <h2 className="text-xl font-bold text-black">{note.title}</h2>
                  </div>
                  <span className="text-xs font-mono bg-black text-white font-bold px-3 py-1 rounded-full border border-black">
                    TECHNICAL PDF DOCUMENT
                  </span>
                </div>

                {/* Sub-heading & topic pills */}
                <div className="mb-6 bg-neutral-100 p-4 rounded-xl border border-neutral-300">
                  <h3 className="text-base font-bold text-black mb-2">
                    {activePage.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {note.topics.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-neutral-200 text-black px-2.5 py-0.5 rounded-md font-semibold border border-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Document Content Points */}
                <div className="space-y-4 font-mono text-sm leading-relaxed text-neutral-800">
                  {activePage.content.map((paragraph, i) => (
                    <div
                      key={i}
                      className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 shadow-xs"
                    >
                      <p className="font-sans font-medium text-neutral-900">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
                <span className="text-6xl font-black uppercase text-black -rotate-30">
                  Technical PDF Notes
                </span>
              </div>

              {/* Document Footer */}
              <div className="pt-8 mt-8 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500 font-sans">
                <span>Technical PDF Notes Library</span>
                <span>
                  Page {currentPage + 1} of {previewPages.length}
                </span>
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
}
