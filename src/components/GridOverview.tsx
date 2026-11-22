import React from 'react';
import { DeckMetadata, SlideData } from '../types/deck';
import { SlideCanvas } from './SlideCanvas';

interface GridOverviewProps {
  slides: SlideData[];
  metadata: DeckMetadata;
  activeSlideNumber: number;
  figmaPreviews: Record<number, string>;
  onOpenSlide: (slideNumber: number) => void;
}

export const GridOverview: React.FC<GridOverviewProps> = ({
  slides,
  metadata,
  activeSlideNumber,
  figmaPreviews,
  onOpenSlide,
}) => {
  return (
    <section aria-label="All slides overview grid" className="mx-auto max-w-[1440px] px-6 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-xl font-bold text-white">
            Executive Deck Overview ({slides.length} Slides)
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Select any slide to inspect storytelling layouts, infographics, or edit copy.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 tabular-nums">
          4 Figma SVG Slots: 12-Week Double Diamond · Service Blueprint · Dispute Status &amp; IA Flow · Chat-to-Record User Flow
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {slides.map((slide) => {
          const isCurrent = slide.slideNumber === activeSlideNumber;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onOpenSlide(slide.slideNumber)}
              className={`group flex flex-col text-left rounded-xl p-2 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400 ${
                isCurrent
                  ? 'bg-blue-600/15 ring-2 ring-blue-500'
                  : 'hover:bg-slate-800/60'
              }`}
            >
              <div className="w-full pointer-events-none">
                <SlideCanvas
                  slide={slide}
                  totalSlides={slides.length}
                  metadata={metadata}
                  figmaPreviewUrl={figmaPreviews[slide.slideNumber]}
                  compact
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-100 truncate">
                  {String(slide.slideNumber).padStart(2, '0')}. {slide.title}
                </span>
                <span className="text-[11px] font-mono text-slate-400 shrink-0 ml-2">
                  {slide.figmaSlot
                    ? slide.figmaSlot.slotTitle
                    : slide.gateLabel
                    ? 'Milestone'
                    : 'Infographic'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
