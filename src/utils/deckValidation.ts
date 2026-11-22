import { BulletItem, SlideData, ValidationIssue } from '../types/deck';

export const MAX_BULLET_WORDS = 12;
export const MAX_SLIDE_WORDS = 30;
export const MAX_CARD_CAPTION_WORDS = 15;

export const BANNED_TERMS: ReadonlyArray<{ label: string; pattern: RegExp }> = [
  { label: 'state-machine / state machine', pattern: /\bstate[-\s]machine\b/i },
  { label: 'JSON schema / schema', pattern: /\b(?:json\s+)?schema\b/i },
  { label: 'telemetry / instrumentation', pattern: /\b(?:telemetry(?:\s+signals)?|post[-\s]launch\s+instrumentation)\b/i },
  { label: 'append-only logs / append-only', pattern: /\bappend[-\s]only(?:\s+logs)?\b/i },
  { label: 'data taxonomy / metadata fields', pattern: /\b(?:data\s+taxonomy|metadata\s+fields)\b/i },
  { label: 'immutable / tamper-proof', pattern: /\b(?:immutable|tamper[-\s]proof)\b/i },
  { label: 'systemic operational bottlenecks', pattern: /\bsystemic(?:\s+operational)?\s+bottlenecks?\b/i },
  { label: 'high-stakes edge-case mastery', pattern: /\b(?:high[-\s]stakes\s+)?edge[-\s]case\s+mastery\b/i },
  { label: 'FIFO', pattern: /\bfifo\b/i },
  { label: 'holistic', pattern: /\bholistic\b/i },
  { label: 'synergy', pattern: /\bsynergy\b/i },
  { label: 'paradigm', pattern: /\bparadigm\b/i },
  { label: 'leverage / leveraging', pattern: /\bleverag(?:e|ing)\b/i },
  { label: 'seamless / seamlessly', pattern: /\bseamless(?:ly)?\b/i },
  { label: 'embed', pattern: /\bembed(?:ded|ding)?\b/i },
];

export const BANNED_RAW_CHARS: ReadonlyArray<{ label: string; char: string }> = [
  { label: 'dollar sign ($)', char: '$' },
  { label: 'tilde (~)', char: '~' },
  { label: 'exclamation mark (!)', char: '!' },
];

export function countWords(input: string): number {
  const trimmed = input.trim();
  if (!trimmed) return 0;
  return trimmed
    .split(/\s+/)
    .filter((token) => /[a-z0-9]/i.test(token)).length;
}

export function getBulletWordCount(bullet: BulletItem): number {
  return countWords(`${bullet.leadIn} ${bullet.text}`);
}

export function getSlideWordCount(slide: SlideData): number {
  const parts: string[] = [
    slide.title,
    slide.storyLead,
    slide.heroStatement ?? '',
    slide.secondaryTitle ?? '',
  ];

  for (const b of slide.bullets) {
    parts.push(b.leadIn, b.text);
  }
  for (const b of slide.secondaryBullets ?? []) {
    parts.push(b.leadIn, b.text);
  }
  for (const m of slide.metrics ?? []) {
    parts.push(m.value, m.label, m.context);
  }
  for (const c of slide.bentoCards ?? []) {
    parts.push(c.stat ?? '', c.headline, c.caption);
    for (const item of c.items ?? []) {
      parts.push(item.leadIn, item.text);
    }
  }
  for (const s of slide.infographicSteps ?? []) {
    parts.push(s.title, s.caption);
  }
  if (slide.benchmarkTable) {
    parts.push(...slide.benchmarkTable.headers);
    for (const r of slide.benchmarkTable.rows) {
      parts.push(r.source, r.observe, r.extract);
    }
  }
  for (const cl of slide.affinityClusters ?? []) {
    parts.push(cl);
  }

  return countWords(parts.join(' '));
}

export function findBannedContent(text: string): string[] {
  const hits: string[] = [];
  for (const term of BANNED_TERMS) {
    if (term.pattern.test(text)) {
      hits.push(`Banned term: ${term.label}`);
    }
  }
  for (const raw of BANNED_RAW_CHARS) {
    if (text.includes(raw.char)) {
      hits.push(`Disallowed character: ${raw.label}`);
    }
  }
  return hits;
}

export function validateDeck(slides: SlideData[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const slide of slides) {
    const usesPerCardLimit =
      slide.kind === 'bottleneck_flow' ||
      slide.kind === 'benchmark_trio' ||
      slide.kind === 'privacy_balance' ||
      slide.kind === 'pain_comparison' ||
      slide.kind === 'affinity_clusters' ||
      slide.kind === 'persona_trio' ||
      slide.kind === 'crazy_eights' ||
      slide.kind === 'week4_wireframes' ||
      slide.kind === 'usability_scenario' ||
      slide.kind === 'stress_matrix' ||
      slide.kind === 'handoff_specs' ||
      slide.kind === 'rollout_timeline' ||
      slide.kind === 'kpi_trio' ||
      slide.kind === 'method_grid' ||
      slide.kind === 'flow_three';

    if (usesPerCardLimit) {
      const cardCapLimit =
        slide.kind === 'method_grid' || slide.kind === 'flow_three' ? 20 : MAX_CARD_CAPTION_WORDS;
      for (const [idx, step] of (slide.infographicSteps ?? []).entries()) {
        const capWords = countWords(step.caption);
        if (capWords > cardCapLimit) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `infographicSteps[${idx}].caption`,
            message: `Card caption has ${capWords} words (ceiling <= ${cardCapLimit} words).`,
            severity: 'error',
          });
        }
      }
      if (slide.kind === 'stress_matrix' && slide.benchmarkTable) {
        slide.benchmarkTable.rows.forEach((row, rIdx) => {
          [row.source, row.observe, row.extract].forEach((cell, cIdx) => {
            const cw = countWords(cell);
            if (cw > MAX_CARD_CAPTION_WORDS) {
              issues.push({
                slideNumber: slide.slideNumber,
                field: `benchmarkTable.rows[${rIdx}][${cIdx}]`,
                message: `Table cell has ${cw} words (ceiling <= ${MAX_CARD_CAPTION_WORDS} words).`,
                severity: 'error',
              });
            }
          });
        });
      }
      for (const [cIdx, card] of (slide.bentoCards ?? []).entries()) {
        if (
          card.caption &&
          (slide.kind === 'crazy_eights' ||
            slide.kind === 'week4_wireframes' ||
            slide.kind === 'handoff_specs' ||
            slide.kind === 'kpi_trio')
        ) {
          const capWords = countWords(card.caption);
          if (capWords > MAX_CARD_CAPTION_WORDS) {
            issues.push({
              slideNumber: slide.slideNumber,
              field: `bentoCards[${cIdx}].caption`,
              message: `Card caption has ${capWords} words (ceiling <= ${MAX_CARD_CAPTION_WORDS} words).`,
              severity: 'error',
            });
          }
        }
        for (const [iIdx, item] of (card.items ?? []).entries()) {
          const itemWords = getBulletWordCount(item);
          if (itemWords > MAX_CARD_CAPTION_WORDS) {
            issues.push({
              slideNumber: slide.slideNumber,
              field: `bentoCards[${cIdx}].items[${iIdx}]`,
              message: `Card row has ${itemWords} words (ceiling <= ${MAX_CARD_CAPTION_WORDS} words).`,
              severity: 'error',
            });
          }
        }
      }
    } else {
      const slideWords = getSlideWordCount(slide);
      if (slideWords > MAX_SLIDE_WORDS) {
        issues.push({
          slideNumber: slide.slideNumber,
          field: 'wordCount',
          message: `Slide has ${slideWords} words (ceiling <= ${MAX_SLIDE_WORDS} words).`,
          severity: 'error',
        });
      }
    }

    const textFields: Array<[string, string | undefined]> = [
      ['title', slide.title],
      ['storyLead', slide.storyLead],
      ['heroStatement', slide.heroStatement],
      ['kicker', slide.kicker],
      ['actLabel', slide.actLabel],
      ['speakerNotes', slide.speakerNotes],
      ['gateLabel', slide.gateLabel],
      ['secondaryTitle', slide.secondaryTitle],
    ];

    for (const [field, value] of textFields) {
      if (!value) continue;
      for (const msg of findBannedContent(value)) {
        issues.push({
          slideNumber: slide.slideNumber,
          field,
          message: msg,
          severity: 'error',
        });
      }
    }

    if (slide.bentoCards) {
      slide.bentoCards.forEach((card, idx) => {
        const itemsText = (card.items ?? []).map((i) => `${i.leadIn} ${i.text}`).join(' ');
        for (const msg of findBannedContent(`${card.eyebrow ?? ''} ${card.headline} ${card.caption} ${card.stat ?? ''} ${itemsText}`)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `bentoCards[${idx}]`,
            message: msg,
            severity: 'error',
          });
        }
      });
    }

    if (slide.infographicSteps) {
      slide.infographicSteps.forEach((step, idx) => {
        for (const msg of findBannedContent(`${step.stepNumber} ${step.title} ${step.caption}`)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `infographicSteps[${idx}]`,
            message: msg,
            severity: 'error',
          });
        }
      });
    }

    if (slide.metrics) {
      slide.metrics.forEach((metric, idx) => {
        for (const msg of findBannedContent(`${metric.value} ${metric.label} ${metric.context}`)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `metrics[${idx}]`,
            message: msg,
            severity: 'error',
          });
        }
      });
    }

    if (slide.table) {
      for (const header of slide.table.headers) {
        for (const msg of findBannedContent(header)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: 'table.headers',
            message: msg,
            severity: 'error',
          });
        }
      }
      for (const row of slide.table.rows) {
        for (const cell of [row.dimension, row.current, row.target, row.impact]) {
          for (const msg of findBannedContent(cell)) {
            issues.push({
              slideNumber: slide.slideNumber,
              field: 'table.rows',
              message: msg,
              severity: 'error',
            });
          }
        }
      }
    }

    if (slide.benchmarkTable) {
      for (const header of slide.benchmarkTable.headers) {
        for (const msg of findBannedContent(header)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: 'benchmarkTable.headers',
            message: msg,
            severity: 'error',
          });
        }
      }
      for (const row of slide.benchmarkTable.rows) {
        for (const cell of [row.source, row.observe, row.extract]) {
          for (const msg of findBannedContent(cell)) {
            issues.push({
              slideNumber: slide.slideNumber,
              field: 'benchmarkTable.rows',
              message: msg,
              severity: 'error',
            });
          }
        }
      }
    }

    if (slide.affinityClusters) {
      slide.affinityClusters.forEach((cluster, idx) => {
        for (const msg of findBannedContent(cluster)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `affinityClusters[${idx}]`,
            message: msg,
            severity: 'error',
          });
        }
      });
    }

    if (slide.phaseOutputs) {
      for (const part of [
        slide.phaseOutputs.label,
        slide.phaseOutputs.deliverables,
        slide.phaseOutputs.whyItMatters,
      ]) {
        for (const msg of findBannedContent(part)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: 'phaseOutputs',
            message: msg,
            severity: 'error',
          });
        }
      }
    }

    const allBulletLists: Array<[string, BulletItem[] | undefined]> = [
      ['bullets', slide.bullets],
      ['secondaryBullets', slide.secondaryBullets],
      ['deliverables', slide.deliverables],
    ];

    for (const [groupName, list] of allBulletLists) {
      if (!list) continue;
      list.forEach((bullet, idx) => {
        if (!bullet.leadIn.trim()) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `${groupName}[${idx}]`,
            message: 'Bullet is missing a bold lead-in.',
            severity: 'error',
          });
        }
        const wc = getBulletWordCount(bullet);
        if (wc > MAX_BULLET_WORDS) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `${groupName}[${idx}]`,
            message: `Bullet has ${wc} words (target <= ${MAX_BULLET_WORDS} words).`,
            severity: 'warning',
          });
        }
        for (const msg of findBannedContent(`${bullet.leadIn} ${bullet.text}`)) {
          issues.push({
            slideNumber: slide.slideNumber,
            field: `${groupName}[${idx}]`,
            message: msg,
            severity: 'error',
          });
        }
      });
    }
  }

  return issues;
}

export function filterSlides(slides: SlideData[], query: string): SlideData[] {
  const q = query.trim().toLowerCase();
  if (!q) return slides;
  return slides.filter((slide) => {
    const haystack = [
      slide.actLabel,
      slide.title,
      slide.storyLead,
      slide.heroStatement ?? '',
      slide.kicker,
      slide.gateLabel ?? '',
      slide.figmaSlot?.slotTitle ?? '',
      ...(slide.metrics ?? []).map((m) => `${m.value} ${m.label} ${m.context}`),
      ...(slide.bentoCards ?? []).map(
        (c) =>
          `${c.eyebrow ?? ''} ${c.headline} ${c.caption} ${c.stat ?? ''} ${(c.items ?? [])
            .map((i) => `${i.leadIn} ${i.text}`)
            .join(' ')}`
      ),
      ...(slide.infographicSteps ?? []).map((s) => `${s.stepNumber} ${s.title} ${s.caption}`),
      ...(slide.benchmarkTable?.headers ?? []),
      ...(slide.benchmarkTable?.rows ?? []).map((r) => `${r.source} ${r.observe} ${r.extract}`),
      ...(slide.affinityClusters ?? []),
      slide.phaseOutputs
        ? `${slide.phaseOutputs.label} ${slide.phaseOutputs.deliverables} ${slide.phaseOutputs.whyItMatters}`
        : '',
      ...slide.bullets.map((b) => `${b.leadIn} ${b.text}`),
      ...(slide.secondaryBullets ?? []).map((b) => `${b.leadIn} ${b.text}`),
      ...(slide.deliverables ?? []).map((b) => `${b.leadIn} ${b.text}`),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
