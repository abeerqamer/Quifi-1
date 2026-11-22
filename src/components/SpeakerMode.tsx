import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { DeckMetadata, SlideData } from '../types/deck';
import { SlideCanvas } from './SlideCanvas';

interface SpeakerModeProps {
  slides: SlideData[];
  metadata: DeckMetadata;
  activeSlideNumber: number;
  figmaPreviews: Record<number, string>;
  onSelectSlide: (slideNumber: number) => void;
  onExitSpeaker: () => void;
}

export const SpeakerMode: React.FC<SpeakerModeProps> = ({
  slides,
  metadata,
  activeSlideNumber,
  figmaPreviews,
  onSelectSlide,
  onExitSpeaker,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentIndex = slides.findIndex((s) => s.slideNumber === activeSlideNumber);
  const currentSlide = slides[currentIndex] ?? slides[0];
  const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null;

  const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
  const secs = String(elapsedSeconds % 60).padStart(2, '0');

  return (
    <section
      aria-label="Speaker presentation mode"
      className="mx-auto max-w-[1440px] px-6 py-6"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-semibold text-white tabular-nums">
            {mins}:{secs}
          </span>
          <button
            type="button"
            onClick={() => setElapsedSeconds(0)}
            aria-label="Reset presentation timer"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span>Reset Timer</span>
          </button>
          <span className="text-xs text-slate-400 tabular-nums">
            Slide {currentSlide.slideNumber} of {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentIndex <= 0}
            onClick={() => onSelectSlide(slides[currentIndex - 1].slideNumber)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            disabled={currentIndex >= slides.length - 1}
            onClick={() => onSelectSlide(slides[currentIndex + 1].slideNumber)}
            className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onExitSpeaker}
            className="ml-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
          >
            Exit Speaker Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <SlideCanvas
            slide={currentSlide}
            totalSlides={slides.length}
            metadata={metadata}
            figmaPreviewUrl={figmaPreviews[currentSlide.slideNumber]}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5">
            <h2 className="font-display text-xs font-bold tracking-wide text-blue-300">
              Executive Talking Points
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200">
              {currentSlide.speakerNotes}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h3 className="font-display text-xs font-bold tracking-wide text-slate-300">
                Next Slide
              </h3>
              {nextSlide && (
                <span className="font-mono text-xs text-slate-400 tabular-nums">
                  Slide {String(nextSlide.slideNumber).padStart(2, '0')}
                </span>
              )}
            </div>
            {nextSlide ? (
              <button
                type="button"
                onClick={() => onSelectSlide(nextSlide.slideNumber)}
                className="w-full text-left focus-visible:outline-2 focus-visible:outline-blue-400 rounded-lg"
              >
                <div className="pointer-events-none">
                  <SlideCanvas
                    slide={nextSlide}
                    totalSlides={slides.length}
                    metadata={metadata}
                    figmaPreviewUrl={figmaPreviews[nextSlide.slideNumber]}
                    compact
                  />
                </div>
              </button>
            ) : (
              <p className="py-8 text-center text-xs text-slate-400">
                Final slide reached. Ready for Week 1 kickoff alignment.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
