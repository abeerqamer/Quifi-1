import React from 'react';
import { RotateCcw, X } from 'lucide-react';
import { SlideData } from '../types/deck';
import { findBannedContent, getBulletWordCount, MAX_BULLET_WORDS } from '../utils/deckValidation';

interface SlideEditorDrawerProps {
  slide: SlideData;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSlide: (updated: SlideData) => void;
  onResetSlide: (slideNumber: number) => void;
}

export const SlideEditorDrawer: React.FC<SlideEditorDrawerProps> = ({
  slide,
  isOpen,
  onClose,
  onUpdateSlide,
  onResetSlide,
}) => {
  if (!isOpen) return null;

  const handleBulletChange = (index: number, field: 'leadIn' | 'text', value: string) => {
    const nextBullets = slide.bullets.map((b, i) =>
      i === index ? { ...b, [field]: value } : b
    );
    onUpdateSlide({ ...slide, bullets: nextBullets });
  };

  return (
    <aside
      aria-label={`Edit Slide ${slide.slideNumber}`}
      className="fixed inset-y-0 right-0 z-40 w-full max-w-md border-l border-slate-800 bg-[#0F172A] text-slate-100 shadow-2xl flex flex-col"
    >
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="font-display text-sm font-bold text-white">
            Edit Slide {String(slide.slideNumber).padStart(2, '0')}
          </h2>
          <p className="text-xs text-slate-400">
            Changes update both deck preview and Google Slides export.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close slide editor"
          className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <div>
          <label htmlFor="edit-slide-title" className="block text-xs font-semibold text-slate-200">
            Headline
          </label>
          <input
            id="edit-slide-title"
            type="text"
            value={slide.title}
            onChange={(e) => onUpdateSlide({ ...slide, title: e.target.value })}
            className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="edit-slide-story" className="block text-xs font-semibold text-slate-200">
            Story Narrative Lead
          </label>
          <textarea
            id="edit-slide-story"
            rows={3}
            value={slide.storyLead}
            onChange={(e) => onUpdateSlide({ ...slide, storyLead: e.target.value })}
            className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs leading-relaxed text-slate-100 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="space-y-3 border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white">
              Structured Points (Target &le; {MAX_BULLET_WORDS} words)
            </h3>
          </div>
          {slide.bullets.map((bullet, idx) => {
            const wc = getBulletWordCount(bullet);
            const overLimit = wc > MAX_BULLET_WORDS;
            const bannedHits = findBannedContent(`${bullet.leadIn} ${bullet.text}`);
            return (
              <div key={bullet.id} className="rounded-md border border-slate-800 bg-slate-900/75 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`bullet-lead-${bullet.id}`}
                    className="text-[11px] font-semibold text-slate-300"
                  >
                    Card {idx + 1} Lead-In
                  </label>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      overLimit ? 'text-amber-300 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {wc}/{MAX_BULLET_WORDS} words
                  </span>
                </div>
                <input
                  id={`bullet-lead-${bullet.id}`}
                  type="text"
                  value={bullet.leadIn}
                  onChange={(e) => handleBulletChange(idx, 'leadIn', e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-white focus:border-blue-400 focus:outline-none"
                />
                <label htmlFor={`bullet-text-${bullet.id}`} className="sr-only">
                  Card {idx + 1} Body
                </label>
                <input
                  id={`bullet-text-${bullet.id}`}
                  type="text"
                  value={bullet.text}
                  onChange={(e) => handleBulletChange(idx, 'text', e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 focus:border-blue-400 focus:outline-none"
                />
                {bannedHits.length > 0 && (
                  <p className="text-[11px] font-medium text-red-400">
                    {bannedHits[0]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-800 pt-4">
          <label htmlFor="edit-speaker-notes" className="block text-xs font-semibold text-slate-200">
            Presenter Story Notes
          </label>
          <textarea
            id="edit-speaker-notes"
            rows={4}
            value={slide.speakerNotes}
            onChange={(e) => onUpdateSlide({ ...slide, speakerNotes: e.target.value })}
            className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs leading-relaxed text-slate-100 focus:border-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-5 py-3.5">
        <button
          type="button"
          onClick={() => onResetSlide(slide.slideNumber)}
          className="inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Slide</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500"
        >
          Done
        </button>
      </div>
    </aside>
  );
};
