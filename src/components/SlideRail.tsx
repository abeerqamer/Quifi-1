import React from 'react';
import { Search } from 'lucide-react';
import { SlideData } from '../types/deck';

interface SlideRailProps {
  slides: SlideData[];
  allSlideCount: number;
  activeSlideNumber: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectSlide: (slideNumber: number) => void;
}

export const SlideRail: React.FC<SlideRailProps> = ({
  slides,
  allSlideCount,
  activeSlideNumber,
  searchQuery,
  onSearchChange,
  onSelectSlide,
}) => {
  return (
    <aside
      aria-label="Slide navigation"
      className="w-full lg:w-[276px] shrink-0 border-b lg:border-b-0 lg:border-r border-sky-200/15 bg-[#041126]/85 backdrop-blur-sm flex flex-col"
    >
      <div className="p-3.5 border-b border-sky-200/15">
        <label htmlFor="slide-filter-input" className="sr-only">
          Filter slides
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-sky-300/60"
            aria-hidden="true"
          />
          <input
            id="slide-filter-input"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Filter ${allSlideCount} slides...`}
            className="w-full rounded-md border border-sky-200/20 bg-[#030C1C] py-1.5 pl-8 pr-3 text-xs text-white placeholder:text-sky-200/45 focus:border-sky-400 focus:outline-none"
          />
        </div>
        <p className="mt-2 text-[11px] text-sky-200/70 tabular-nums">
          Showing {slides.length} of {allSlideCount} slides
        </p>
      </div>

      <nav className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto p-2 gap-0.5 lg:max-h-[calc(100vh-10rem)]">
        {slides.length === 0 ? (
          <div className="p-4 text-xs text-sky-200/70">
            No slides match "{searchQuery}".
          </div>
        ) : (
          slides.map((slide) => {
            const isActive = slide.slideNumber === activeSlideNumber;
            const hasFigmaSlot = Boolean(slide.figmaSlot);
            const isWeek4Gate = slide.kind === 'week4_wireframes';
            const isChapterDivider = slide.kind === 'chapter_divider';
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => onSelectSlide(slide.slideNumber)}
                aria-current={isActive ? 'step' : undefined}
                className={`group flex flex-col items-start text-left rounded-lg px-3 py-1.5 transition-colors duration-100 min-w-[200px] lg:min-w-0 lg:w-full focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  isActive
                    ? 'bg-sky-500/20 text-white border border-sky-400/40'
                    : 'text-sky-100/80 border border-transparent hover:bg-sky-400/10'
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2 text-[10.5px] font-mono tabular-nums">
                  <span className={isActive ? 'text-sky-300' : 'text-sky-200/50'}>
                    Slide {String(slide.slideNumber).padStart(2, '0')}
                  </span>
                  {hasFigmaSlot && (
                    <span className="text-sky-300">
                      {slide.figmaSlot?.slotTitle}
                    </span>
                  )}
                  {isWeek4Gate && (
                    <span className="text-amber-300">
                      Week 4 Gate
                    </span>
                  )}
                  {isChapterDivider && (
                    <span className="text-sky-300/85">
                      Chapter
                    </span>
                  )}
                </div>
                <span className="mt-0.5 line-clamp-1 text-xs font-semibold leading-snug">
                  {slide.title}
                </span>
              </button>
            );
          })
        )}
      </nav>
    </aside>
  );
};
