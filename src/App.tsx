import { useEffect, useMemo, useRef, useState } from 'react';
import { User } from 'firebase/auth';
import { ChevronLeft, ChevronRight, Maximize2, MessageSquareText, Pencil, X } from 'lucide-react';
import { INITIAL_QUIFI_SLIDES, QUIFI_DECK_METADATA } from './data/quifiDeck';
import { GoogleSlidesSyncResult, SlideData } from './types/deck';
import { filterSlides, validateDeck } from './utils/deckValidation';
import { exportSlidesToPdf, PdfExportProgress } from './utils/pdfExport';
import { googleSignIn, initAuth, logout } from './services/googleAuth';
import { TopBar, WorkspaceView } from './components/TopBar';
import { SlideRail } from './components/SlideRail';
import { SlideCanvas } from './components/SlideCanvas';
import { GridOverview } from './components/GridOverview';
import { SpeakerMode } from './components/SpeakerMode';
import { SlideEditorDrawer } from './components/SlideEditorDrawer';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import { PdfExportStage } from './components/PdfExportStage';

export default function App() {
  const [slides, setSlides] = useState<SlideData[]>(INITIAL_QUIFI_SLIDES);
  const [activeSlideNumber, setActiveSlideNumber] = useState<number>(1);
  const [activeView, setActiveView] = useState<WorkspaceView>('deck');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isSlidesModalOpen, setIsSlidesModalOpen] = useState<boolean>(false);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [showCinemaNotes, setShowCinemaNotes] = useState<boolean>(false);
  const [figmaPreviews, setFigmaPreviews] = useState<Record<number, string>>({});

  // Google Workspace Auth state (token strictly cached in memory inside googleAuth.ts)
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<GoogleSlidesSyncResult | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [pdfExportProgress, setPdfExportProgress] = useState<PdfExportProgress | null>(null);
  const [pdfExportError, setPdfExportError] = useState<string | null>(null);
  const exportSlideRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
      },
      () => {
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Keyboard navigation for slides and Escape exit from Cinema Present mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === 'Escape' && isCinemaMode) {
        setIsCinemaMode(false);
        return;
      }
      if (isSlidesModalOpen || isEditorOpen) return;

      if (e.key === 'ArrowRight') {
        setActiveSlideNumber((prev) => Math.min(slides.length, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideNumber((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, isSlidesModalOpen, isEditorOpen, isCinemaMode]);

  const filteredSlides = useMemo(
    () => filterSlides(slides, searchQuery),
    [slides, searchQuery]
  );

  const activeSlide =
    slides.find((s) => s.slideNumber === activeSlideNumber) ?? slides[0];

  const validationIssues = useMemo(() => validateDeck(slides), [slides]);

  const handleUpdateSlide = (updated: SlideData) => {
    setSlides((prev) =>
      prev.map((s) => (s.slideNumber === updated.slideNumber ? updated : s))
    );
  };

  const handleResetSlide = (slideNumber: number) => {
    const original = INITIAL_QUIFI_SLIDES.find((s) => s.slideNumber === slideNumber);
    if (!original) return;
    setSlides((prev) =>
      prev.map((s) => (s.slideNumber === slideNumber ? original : s))
    );
  };

  const handleUploadFigmaPreview = (slideNumber: number, dataUrl: string) => {
    setFigmaPreviews((prev) => ({ ...prev, [slideNumber]: dataUrl }));
  };

  const handleClearFigmaPreview = (slideNumber: number) => {
    setFigmaPreviews((prev) => {
      const next = { ...prev };
      delete next[slideNumber];
      return next;
    });
  };

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      setUser(result.user);
      setAccessToken(result.accessToken);
    } catch (err: unknown) {
      setAuthError(
        err instanceof Error ? err.message : 'Google Sign-In did not complete.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
  };

  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    setPdfExportError(null);
    setIsExportingPdf(true);
    setPdfExportProgress({ current: 1, total: slides.length });

    try {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
      await exportSlidesToPdf(
        exportSlideRefs.current.slice(0, slides.length),
        (progress) => setPdfExportProgress(progress)
      );
    } catch (err: unknown) {
      setPdfExportError(
        err instanceof Error ? err.message : 'PDF export could not complete.'
      );
    } finally {
      setIsExportingPdf(false);
      setPdfExportProgress(null);
    }
  };

  const progressPct = Math.round((activeSlide.slideNumber / slides.length) * 100);

  return (
    <div className="min-h-screen flex flex-col quifi-ocean-bg text-slate-100">
      <TopBar
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenSlidesSync={() => setIsSlidesModalOpen(true)}
        onStartCinemaPresent={() => setIsCinemaMode(true)}
        onExportPdf={handleExportPdf}
        isExportingPdf={isExportingPdf}
        pdfExportProgress={pdfExportProgress}
        isGoogleConnected={Boolean(accessToken)}
      />

      {pdfExportError && (
        <div
          role="alert"
          className="mx-auto mt-3 flex w-full max-w-[1440px] items-center justify-between gap-3 px-6"
        >
          <div className="flex w-full items-center justify-between rounded-lg border border-amber-400/40 bg-amber-950/70 px-4 py-2.5 text-xs text-amber-100">
            <span>PDF export failed: {pdfExportError}</span>
            <button
              type="button"
              onClick={() => setPdfExportError(null)}
              aria-label="Dismiss PDF export error"
              className="rounded p-1 text-amber-200 hover:bg-amber-900/60"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {activeView === 'deck' && (
          <div className="mx-auto w-full max-w-[1440px] flex-1 flex flex-col lg:flex-row">
            <div
              data-export-hide="true"
              className={`transition-opacity duration-150 ${
                isExportingPdf ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <SlideRail
                slides={filteredSlides}
                allSlideCount={slides.length}
                activeSlideNumber={activeSlideNumber}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectSlide={(num) => setActiveSlideNumber(num)}
              />
            </div>

            <div className="flex-1 flex flex-col p-6 lg:p-8 min-w-0">
              {/* Slide Stage Controls */}
              <div
                data-export-hide="true"
                className={`mb-4 flex flex-wrap items-center justify-between gap-4 transition-opacity duration-150 ${
                  isExportingPdf ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 text-xs text-sky-200/75 tabular-nums">
                  <span className="font-semibold text-white">
                    Slide {String(activeSlide.slideNumber).padStart(2, '0')} of {slides.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {validationIssues.length === 0
                      ? 'One Big Idea · Plain English'
                      : `${validationIssues.length} copy notice(s)`}
                  </span>
                  {lastSync && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href={lastSync.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sky-300 hover:underline"
                      >
                        Open Synced Google Slides
                      </a>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCinemaMode(true)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-sky-200/20 bg-[#05142D]/80 px-3 py-1.5 text-xs font-medium text-sky-100 hover:bg-[#0B234D] hover:text-white"
                  >
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Present</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-sky-200/20 bg-[#05142D]/80 px-3 py-1.5 text-xs font-medium text-sky-100 hover:bg-[#0B234D] hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Edit Slide</span>
                  </button>
                  <button
                    type="button"
                    disabled={activeSlideNumber <= 1}
                    onClick={() => setActiveSlideNumber((n) => Math.max(1, n - 1))}
                    aria-label="Previous slide"
                    className="inline-flex items-center justify-center rounded-md border border-sky-200/20 bg-[#05142D]/80 p-1.5 text-sky-100 hover:bg-[#0B234D] disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    disabled={activeSlideNumber >= slides.length}
                    onClick={() =>
                      setActiveSlideNumber((n) => Math.min(slides.length, n + 1))
                    }
                    aria-label="Next slide"
                    className="inline-flex items-center justify-center rounded-md border border-sky-200/20 bg-[#05142D]/80 p-1.5 text-sky-100 hover:bg-[#0B234D] disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* 16:9 Slide Canvas */}
              <div className="w-full max-w-[1080px] mx-auto">
                <SlideCanvas
                  slide={activeSlide}
                  totalSlides={slides.length}
                  metadata={QUIFI_DECK_METADATA}
                  figmaPreviewUrl={figmaPreviews[activeSlide.slideNumber]}
                  onUploadFigmaPreview={handleUploadFigmaPreview}
                  onClearFigmaPreview={handleClearFigmaPreview}
                />
              </div>

              {/* Executive Talking Points Footer Strip */}
              <div className="mt-5 w-full max-w-[1080px] mx-auto rounded-xl border border-sky-200/15 bg-[#041126]/85 px-5 py-3.5">
                <div className="text-[11px] font-mono font-semibold tracking-wide text-sky-300">
                  Presenter Talking Point
                </div>
                <p className="mt-1 text-xs leading-relaxed text-sky-100/85">
                  {activeSlide.speakerNotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'grid' && (
          <GridOverview
            slides={slides}
            metadata={QUIFI_DECK_METADATA}
            activeSlideNumber={activeSlideNumber}
            figmaPreviews={figmaPreviews}
            onOpenSlide={(num) => {
              setActiveSlideNumber(num);
              setActiveView('deck');
            }}
          />
        )}

        {activeView === 'speaker' && (
          <SpeakerMode
            slides={slides}
            metadata={QUIFI_DECK_METADATA}
            activeSlideNumber={activeSlideNumber}
            figmaPreviews={figmaPreviews}
            onSelectSlide={(num) => setActiveSlideNumber(num)}
            onExitSpeaker={() => setActiveView('deck')}
          />
        )}
      </main>

      {/* Immersive Cinema Present Mode */}
      {isCinemaMode && (
        <div
          role="region"
          aria-label="Cinema presentation view"
          className="fixed inset-0 z-50 flex flex-col quifi-ocean-bg text-slate-100"
        >
          <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-3">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-display font-bold text-white">Quifi Execution Plan</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="font-mono text-blue-300">{activeSlide.actLabel}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowCinemaNotes((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  showCinemaNotes
                    ? 'border-blue-500/50 bg-blue-600/20 text-blue-200'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Presenter Notes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCinemaMode(false)}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Exit Presentation</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 overflow-y-auto">
            <div className="w-full max-w-[1180px] mx-auto">
              <SlideCanvas
                slide={activeSlide}
                totalSlides={slides.length}
                metadata={QUIFI_DECK_METADATA}
                figmaPreviewUrl={figmaPreviews[activeSlide.slideNumber]}
                onUploadFigmaPreview={handleUploadFigmaPreview}
                onClearFigmaPreview={handleClearFigmaPreview}
              />
            </div>

            {showCinemaNotes && (
              <div className="mt-4 w-full max-w-[1180px] mx-auto rounded-lg border border-slate-800 bg-[#0F172A] px-5 py-3 text-xs leading-relaxed text-slate-200">
                <span className="font-mono font-semibold text-blue-300 mr-2">
                  Talking Point:
                </span>
                {activeSlide.speakerNotes}
              </div>
            )}
          </div>

          <div className="border-t border-slate-800/80 bg-[#090D16]">
            <div className="h-1 w-full bg-slate-800">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3">
              <div className="font-mono text-xs text-slate-400 tabular-nums">
                Slide {String(activeSlide.slideNumber).padStart(2, '0')} / {slides.length} · Arrow keys to navigate · Esc to exit
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeSlideNumber <= 1}
                  onClick={() => setActiveSlideNumber((n) => Math.max(1, n - 1))}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-40"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={activeSlideNumber >= slides.length}
                  onClick={() => setActiveSlideNumber((n) => Math.min(slides.length, n + 1))}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SlideEditorDrawer
        slide={activeSlide}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onUpdateSlide={handleUpdateSlide}
        onResetSlide={handleResetSlide}
      />

      <GoogleSlidesModal
        isOpen={isSlidesModalOpen}
        onClose={() => setIsSlidesModalOpen(false)}
        slides={slides}
        metadata={QUIFI_DECK_METADATA}
        user={user}
        accessToken={accessToken}
        isLoggingIn={isLoggingIn}
        authError={authError}
        onSignIn={handleGoogleSignIn}
        onSignOut={handleGoogleSignOut}
        lastSync={lastSync}
        onSyncComplete={(res) => setLastSync(res)}
      />

      {isExportingPdf && (
        <PdfExportStage
          slides={slides}
          metadata={QUIFI_DECK_METADATA}
          figmaPreviews={figmaPreviews}
          slideRefs={exportSlideRefs}
        />
      )}
    </div>
  );
}
