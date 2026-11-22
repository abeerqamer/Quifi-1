import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { DeckMetadata, SlideData } from '../types/deck';
import {
  AffinityClusterDiagram,
  BenchmarkTrioCards,
  BottleneckFlowDeck,
  ChapterDividerHero,
  CrazyEightsGrid,
  HandoffSpecsGrid,
  HorizontalStepFlow,
  KpiTrioCards,
  MedallionIcon,
  MethodBadgeGrid,
  PainComparisonSplit,
  PersonaTrioCards,
  PrivacyBalanceDeck,
  StressTestMatrixTable,
  UsabilityScenarioDeck,
  VisualAssetZone,
  Week4WireframesDeck,
} from './SlideInfographics';

interface SlideCanvasProps {
  slide: SlideData;
  totalSlides: number;
  metadata: DeckMetadata;
  figmaPreviewUrl?: string;
  onUploadFigmaPreview?: (slideNumber: number, dataUrl: string) => void;
  onClearFigmaPreview?: (slideNumber: number) => void;
  compact?: boolean;
  exportMode?: boolean;
}

const HighlightedHeroStatement: React.FC<{
  statement: string;
  highlights?: string[];
  compact?: boolean;
}> = ({ statement, highlights = [], compact = false }) => {
  if (!highlights.length) {
    return <span>{statement}</span>;
  }

  const escaped = highlights
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(\\b(?:${escaped.join('|')})\\b|${escaped.join('|')})`, 'gi');
  const parts = statement.split(regex).filter((p) => p !== '');

  return (
    <>
      {parts.map((part, idx) => {
        const lower = part.toLowerCase();
        const matchIdx = highlights.findIndex((h) => h.toLowerCase() === lower);
        if (matchIdx === -1) {
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        }
        const isFirst = matchIdx === 0;
        const badgeClass = isFirst
          ? 'border-amber-300/60 bg-amber-400/18 text-amber-200'
          : 'border-sky-300/60 bg-sky-400/18 text-sky-200';
        return (
          <span
            key={idx}
            className={`inline-block rounded-lg border font-extrabold tracking-tight align-baseline ${badgeClass} ${
              compact ? 'px-1 py-0 text-[9px]' : 'px-2 py-0.5'
            }`}
          >
            {part}
          </span>
        );
      })}
    </>
  );
};

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  totalSlides,
  metadata,
  figmaPreviewUrl,
  onUploadFigmaPreview,
  onClearFigmaPreview,
  compact = false,
  exportMode = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isTitle = slide.kind === 'title';
  const isMacroHero = slide.kind === 'macro_hero';
  const isChapterDivider = slide.kind === 'chapter_divider';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadFigmaPreview) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadFigmaPreview(slide.slideNumber, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const innerContent = (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 quifi-halftone-overlay"
      />

      {/* Top Kicker & Gate Metadata */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-sky-200/15 pb-2">
        <span
          className={`font-mono font-medium tracking-wide truncate ${
            compact ? 'text-[9px]' : 'text-[11px]'
          } text-sky-300`}
        >
          {slide.kicker}
        </span>
        {slide.gateLabel && !compact && !isChapterDivider && (
          <span
            className={`font-mono text-[11px] font-semibold whitespace-nowrap shrink-0 ${
              slide.gateLabel.includes('Week 4') ? 'text-amber-300' : 'text-sky-200/75'
            }`}
          >
            {slide.gateLabel}
          </span>
        )}
      </div>

      {/* Main Slide Body */}
      <div
        className={`relative z-10 my-auto flex-1 min-h-0 flex flex-col justify-center ${
          compact ? 'py-1 overflow-hidden' : 'py-2'
        }`}
      >
        {isTitle ? (
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              <h2
                className={`font-display font-extrabold tracking-tight text-balance ${
                  compact
                    ? 'text-sm leading-tight'
                    : 'text-4xl lg:text-[50px] leading-[1.06]'
                } text-white max-w-4xl`}
              >
                {slide.title}
              </h2>
              <p
                className={`font-story mt-3.5 text-sky-100/90 max-w-2xl leading-relaxed ${
                  compact ? 'text-[10px] line-clamp-2' : 'text-base lg:text-xl'
                }`}
              >
                {slide.storyLead}
              </p>
              {!compact && (
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-sky-200/80">
                  <span className="font-semibold text-white">{metadata.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{metadata.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{metadata.dateLabel}</span>
                </div>
              )}
            </div>

            {slide.metrics && (
              <div
                className={`grid grid-cols-2 md:grid-cols-4 ${
                  compact ? 'gap-1.5 mt-2' : 'gap-4 mt-5'
                }`}
              >
                {slide.metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className={`rounded-2xl border border-sky-200/20 bg-[#031026]/82 backdrop-blur-xs ${
                      compact ? 'p-1.5' : 'p-4'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`font-display font-bold text-white tabular-nums ${
                          compact ? 'text-xs' : 'text-xl lg:text-2xl'
                        }`}
                      >
                        {metric.value}
                      </div>
                      {!compact && <MedallionIcon icon={metric.icon} size="sm" />}
                    </div>
                    <div
                      className={`mt-1.5 font-medium text-sky-200 ${
                        compact ? 'text-[9px] truncate' : 'text-xs'
                      }`}
                    >
                      {metric.label}
                    </div>
                    {!compact && metric.context && (
                      <div className="mt-0.5 text-[11px] text-sky-200/70">{metric.context}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isMacroHero ? (
          <div className="flex flex-col justify-between h-full py-1">
            <div>
              <h2
                className={`font-display font-extrabold tracking-tight text-white text-balance ${
                  compact ? 'text-xs leading-tight' : 'text-3xl lg:text-[34px] leading-[1.1]'
                }`}
              >
                {slide.title}
              </h2>
            </div>

            <div className="my-auto py-4">
              <p
                className={`font-display font-semibold text-white tracking-tight max-w-4xl ${
                  compact
                    ? 'text-[10px] leading-snug line-clamp-4'
                    : 'text-2xl lg:text-[30px] leading-[1.45]'
                }`}
              >
                <HighlightedHeroStatement
                  statement={slide.heroStatement ?? slide.storyLead}
                  highlights={slide.heroHighlights}
                  compact={compact}
                />
              </p>
            </div>

            {slide.bullets.length > 0 && (
              <div
                className={`grid grid-cols-1 md:grid-cols-3 border-t border-sky-200/20 ${
                  compact ? 'gap-1.5 pt-1.5' : 'gap-4 pt-3.5'
                }`}
              >
                {slide.bullets.slice(0, 3).map((pillar) => (
                  <div
                    key={pillar.id}
                    className={`flex items-start gap-2.5 rounded-xl border border-sky-200/15 bg-[#031026]/75 ${
                      compact ? 'p-1.5' : 'px-3.5 py-2.5'
                    }`}
                  >
                    {!compact && <MedallionIcon icon={pillar.icon} size="sm" />}
                    <div className="min-w-0">
                      <div
                        className={`font-display font-bold text-sky-300 ${
                          compact ? 'text-[9px]' : 'text-xs'
                        }`}
                      >
                        {pillar.leadIn}
                      </div>
                      {!compact && (
                        <p className="mt-0.5 text-[11.5px] leading-snug text-sky-100/90">
                          {pillar.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : isChapterDivider ? (
          <ChapterDividerHero
            title={slide.title}
            storyLead={slide.storyLead}
            gateLabel={slide.gateLabel}
            compact={compact}
          />
        ) : (
          <div className="flex flex-col flex-1 min-h-0 justify-start">
            <h2
              className={`font-display font-extrabold tracking-tight text-white text-balance ${
                compact ? 'text-xs leading-tight' : 'text-2xl lg:text-[32px] leading-[1.12]'
              }`}
            >
              {slide.title}
            </h2>
            {slide.storyLead && (
              <p
                className={`font-story mt-1.5 text-sky-100/85 max-w-3xl leading-relaxed ${
                  compact ? 'text-[9px] line-clamp-1' : 'text-sm lg:text-base'
                }`}
              >
                {slide.storyLead}
              </p>
            )}

            {/* Slide 03: Bottleneck 3-Step Horizontal Flow */}
            {slide.kind === 'bottleneck_flow' && slide.infographicSteps && (
              <BottleneckFlowDeck steps={slide.infographicSteps} compact={compact} />
            )}

            {/* Slide 04: Privacy vs Transparency Balance Split */}
            {slide.kind === 'privacy_balance' && slide.bentoCards && (
              <PrivacyBalanceDeck cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slides 05, 12, 15, 17: Full-Bleed Reserved Figma SVG Diagram Slots */}
            {slide.kind === 'figma_full' && slide.figmaSlot && (
              <div className={`flex-1 min-h-0 flex flex-col ${compact ? 'mt-1.5' : 'mt-4'}`}>
                <VisualAssetZone
                  slot={slide.figmaSlot}
                  slideNumber={slide.slideNumber}
                  previewUrl={figmaPreviewUrl}
                  compact={compact}
                  fileInputRef={fileInputRef}
                  onUploadClick={exportMode ? undefined : () => fileInputRef.current?.click()}
                  onFileChange={exportMode ? undefined : handleFileChange}
                  onClearPreview={
                    !exportMode && onClearFigmaPreview
                      ? () => onClearFigmaPreview(slide.slideNumber)
                      : undefined
                  }
                  heightClass="h-full min-h-0"
                />
              </div>
            )}

            {/* Slide 06: 6-Method Research Triangulation Grid */}
            {slide.kind === 'method_grid' && slide.infographicSteps && (
              <MethodBadgeGrid steps={slide.infographicSteps} compact={compact} />
            )}

            {/* Slide 08: Week 1 3-Step Internal Discovery Flow */}
            {slide.kind === 'flow_three' && slide.infographicSteps && (
              <HorizontalStepFlow
                steps={slide.infographicSteps}
                variant="arrow"
                compact={compact}
              />
            )}

            {/* Slide 09: Trader Anxiety vs. Reviewer Friction */}
            {slide.kind === 'pain_comparison' && slide.bentoCards && (
              <PainComparisonSplit cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slide 10: Week 2 Competitor Test Cases & Quifi Takeaways */}
            {slide.kind === 'benchmark_trio' && slide.bentoCards && (
              <BenchmarkTrioCards cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slide 13: Affinity Synthesis 3 Systemic Clusters */}
            {slide.kind === 'affinity_clusters' && slide.bentoCards && (
              <AffinityClusterDiagram cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slide 14: 3 Roles, 3 Distinct Jobs-to-be-Done */}
            {slide.kind === 'persona_trio' && slide.bentoCards && (
              <PersonaTrioCards cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slide 18: Crazy 8s Wireframe Exploration */}
            {slide.kind === 'crazy_eights' && slide.bentoCards && (
              <CrazyEightsGrid cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slide 19: Week 4 Mandatory Gate Mid-Fi Wireframes */}
            {slide.kind === 'week4_wireframes' && slide.bentoCards && (
              <Week4WireframesDeck
                cards={slide.bentoCards}
                phaseOutputs={slide.phaseOutputs}
                compact={compact}
              />
            )}

            {/* Slide 21: Task-Based Usability Testing */}
            {slide.kind === 'usability_scenario' && slide.infographicSteps && (
              <UsabilityScenarioDeck
                scenarioPrompt={slide.heroStatement ?? ''}
                steps={slide.infographicSteps}
                compact={compact}
              />
            )}

            {/* Slide 22: Crypto Edge-Case Stress Matrix */}
            {slide.kind === 'stress_matrix' && slide.benchmarkTable && (
              <StressTestMatrixTable table={slide.benchmarkTable} compact={compact} />
            )}

            {/* Slide 23: Engineering Handoff Specs */}
            {slide.kind === 'handoff_specs' && slide.bentoCards && (
              <HandoffSpecsGrid cards={slide.bentoCards} compact={compact} />
            )}

            {/* Slide 24: Phased Beta Rollout Chevron Timeline */}
            {slide.kind === 'rollout_timeline' && slide.infographicSteps && (
              <HorizontalStepFlow
                steps={slide.infographicSteps}
                variant="chevron"
                compact={compact}
              />
            )}

            {/* Slide 25: Before/After Cohort KPI Trio */}
            {slide.kind === 'kpi_trio' && slide.bentoCards && (
              <KpiTrioCards
                cards={slide.bentoCards}
                closingTakeaway={slide.phaseOutputs?.whyItMatters}
                compact={compact}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer Attribution */}
      <div
        className={`relative z-10 flex items-center justify-between border-t border-sky-200/15 pt-2 tabular-nums ${
          compact ? 'text-[9px]' : 'text-[11px]'
        } text-sky-200/75`}
      >
        <span className="truncate">
          Quifi UX Execution Plan · {slide.actLabel}
        </span>
        <span className="font-mono shrink-0 ml-2">
          {String(slide.slideNumber).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
      </div>
    </>
  );

  if (compact) {
    return (
      <article
        aria-label={`Slide ${slide.slideNumber}: ${slide.title}`}
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-sky-200/15 quifi-slide-surface text-slate-100 p-3 flex flex-col justify-between shadow-sm"
      >
        {innerContent}
      </article>
    );
  }

  if (exportMode) {
    return (
      <article
        aria-label={`Slide ${slide.slideNumber}: ${slide.title}`}
        className="relative h-full w-full overflow-hidden quifi-slide-surface text-slate-100 p-6 md:p-8 lg:p-9 flex flex-col justify-between"
      >
        {innerContent}
      </article>
    );
  }

  return (
    <motion.article
      key={slide.id}
      initial={{ opacity: 0.92, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`Slide ${slide.slideNumber}: ${slide.title}`}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-sky-200/20 quifi-slide-surface text-slate-100 p-6 md:p-8 lg:p-9 flex flex-col justify-between shadow-2xl"
    >
      {innerContent}
    </motion.article>
  );
};
