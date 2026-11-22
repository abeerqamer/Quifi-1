import React from 'react';
import { FileDown, Loader2, Maximize2, Presentation } from 'lucide-react';
import { formatPdfExportProgress, PdfExportProgress } from '../utils/pdfExport';

export type WorkspaceView = 'deck' | 'grid' | 'speaker';

interface TopBarProps {
  activeView: WorkspaceView;
  onSelectView: (view: WorkspaceView) => void;
  onOpenSlidesSync: () => void;
  onStartCinemaPresent: () => void;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  pdfExportProgress: PdfExportProgress | null;
  isGoogleConnected: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onSelectView,
  onOpenSlidesSync,
  onStartCinemaPresent,
  onExportPdf,
  isExportingPdf,
  pdfExportProgress,
  isGoogleConnected,
}) => {
  const navItems: Array<{ id: WorkspaceView; label: string }> = [
    { id: 'deck', label: 'Deck View' },
    { id: 'grid', label: 'Grid Overview' },
    { id: 'speaker', label: 'Speaker Mode' },
  ];

  const progressText = pdfExportProgress
    ? formatPdfExportProgress(pdfExportProgress)
    : 'Exporting Slides...';

  return (
    <header
      data-export-hide="true"
      className="sticky top-0 z-30 border-b border-sky-200/15 bg-[#030D1E]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 lg:gap-8 px-6">
        <button
          type="button"
          onClick={() => onSelectView('deck')}
          disabled={isExportingPdf}
          className="font-display text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 disabled:pointer-events-none"
        >
          Quifi Execution Deck
        </button>

        <nav
          aria-label="Presentation workspace views"
          className={`hidden md:flex items-center gap-5 lg:gap-7 transition-opacity duration-150 ${
            isExportingPdf ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400"
                  />
                )}
              </button>
            );
          })}
          <button
            type="button"
            onClick={onStartCinemaPresent}
            className="relative inline-flex items-center gap-1.5 py-5 text-sm font-medium text-slate-400 transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Present</span>
          </button>
          <button
            type="button"
            onClick={onOpenSlidesSync}
            className="relative py-5 text-sm font-medium text-slate-400 transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            {isGoogleConnected ? 'Slides Connected' : 'Google Slides'}
          </button>
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          {isExportingPdf ? (
            <div
              role="status"
              aria-live="polite"
              className="inline-flex items-center gap-2 rounded-lg border border-sky-300/30 bg-[#071A38] px-3.5 py-2 text-xs font-medium text-sky-100 whitespace-nowrap shrink-0"
            >
              <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-300" aria-hidden="true" />
              <span className="tabular-nums">{progressText}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onExportPdf}
              className="inline-flex items-center gap-2 rounded-lg border border-sky-200/20 bg-[#05142D]/90 px-3.5 py-2 text-xs font-medium text-sky-100 transition-colors hover:border-sky-300/40 hover:bg-[#0B234D] hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <FileDown className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
              <span>Export PDF</span>
            </button>
          )}
          <button
            type="button"
            onClick={onOpenSlidesSync}
            disabled={isExportingPdf}
            className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-500 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
              isExportingPdf ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Presentation className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Export to Slides</span>
          </button>
        </div>
      </div>
    </header>
  );
};
