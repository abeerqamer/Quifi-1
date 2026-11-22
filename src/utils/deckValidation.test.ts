import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_QUIFI_SLIDES } from '../data/quifiDeck';
import {
  countWords,
  filterSlides,
  getBulletWordCount,
  getSlideWordCount,
  MAX_CARD_CAPTION_WORDS,
  MAX_SLIDE_WORDS,
  validateDeck,
} from './deckValidation';

test('Quifi deck contains 25 ultra-succinct infographic slides across 5 acts with 4 chapter dividers and 4 Figma SVG slots', () => {
  assert.equal(INITIAL_QUIFI_SLIDES.length, 25);

  // Act 0 & 1: Cover, Problem & Strategy
  assert.equal(INITIAL_QUIFI_SLIDES[0].kind, 'title');
  assert.equal(INITIAL_QUIFI_SLIDES[0].metrics?.length, 4);
  assert.equal(INITIAL_QUIFI_SLIDES[1].kind, 'macro_hero');
  assert.ok(INITIAL_QUIFI_SLIDES[1].heroStatement?.includes('conversational chatbot'));
  assert.equal(INITIAL_QUIFI_SLIDES[1].heroHighlights?.length, 4);
  assert.equal(INITIAL_QUIFI_SLIDES[2].kind, 'bottleneck_flow');
  assert.equal(INITIAL_QUIFI_SLIDES[2].infographicSteps?.length, 3);
  assert.equal(INITIAL_QUIFI_SLIDES[3].kind, 'privacy_balance');
  assert.equal(INITIAL_QUIFI_SLIDES[3].bentoCards?.length, 2);
  assert.equal(INITIAL_QUIFI_SLIDES[4].kind, 'figma_full');
  assert.equal(INITIAL_QUIFI_SLIDES[5].kind, 'method_grid');
  assert.equal(INITIAL_QUIFI_SLIDES[5].infographicSteps?.length, 4);

  // 4 Chapter Dividers: Slides 7, 11, 16, 20
  const dividers = INITIAL_QUIFI_SLIDES.filter((s) => s.kind === 'chapter_divider');
  assert.deepEqual(
    dividers.map((s) => s.slideNumber),
    [7, 11, 16, 20]
  );

  // 4 Clean Figma SVG Slots: Slides 5, 12, 15, 17
  const figmaSlides = INITIAL_QUIFI_SLIDES.filter((s) => Boolean(s.figmaSlot));
  assert.deepEqual(
    figmaSlides.map((s) => s.slideNumber),
    [5, 12, 15, 17]
  );
  assert.deepEqual(
    figmaSlides.map((s) => s.figmaSlot?.slotTitle),
    [
      '12-Week Double Diamond',
      'Service Blueprint',
      'Dispute Status & IA Flow',
      'Chat-to-Record User Flow',
    ]
  );

  // Act 2–5 Key Kinds
  assert.equal(INITIAL_QUIFI_SLIDES[7].kind, 'flow_three');
  assert.equal(INITIAL_QUIFI_SLIDES[8].kind, 'pain_comparison');
  assert.equal(INITIAL_QUIFI_SLIDES[8].bentoCards?.length, 2);
  assert.equal(INITIAL_QUIFI_SLIDES[9].kind, 'benchmark_trio');
  assert.equal(INITIAL_QUIFI_SLIDES[9].bentoCards?.length, 2);
  assert.equal(INITIAL_QUIFI_SLIDES[12].kind, 'affinity_clusters');
  assert.equal(INITIAL_QUIFI_SLIDES[12].bentoCards?.length, 3);
  assert.equal(INITIAL_QUIFI_SLIDES[13].kind, 'persona_trio');
  assert.equal(INITIAL_QUIFI_SLIDES[13].bentoCards?.length, 3);
  assert.equal(INITIAL_QUIFI_SLIDES[16].title, 'Turning a Chatbot Conversation Into a Structured Case Record');
  assert.equal(INITIAL_QUIFI_SLIDES[17].kind, 'crazy_eights');
  assert.equal(INITIAL_QUIFI_SLIDES[18].kind, 'week4_wireframes');
  assert.equal(INITIAL_QUIFI_SLIDES[20].kind, 'usability_scenario');
  assert.equal(INITIAL_QUIFI_SLIDES[21].kind, 'stress_matrix');
  assert.equal(INITIAL_QUIFI_SLIDES[21].benchmarkTable?.rows.length, 4);
  assert.equal(INITIAL_QUIFI_SLIDES[22].kind, 'handoff_specs');
  assert.equal(INITIAL_QUIFI_SLIDES[23].kind, 'rollout_timeline');
  assert.equal(INITIAL_QUIFI_SLIDES[24].kind, 'kpi_trio');
});

test('Quifi deck satisfies plain-English de-jargon rules and <= 15 words/card & <= 30 words/slide ceilings', () => {
  for (const slide of INITIAL_QUIFI_SLIDES) {
    if (slide.kind === 'bottleneck_flow' || slide.kind === 'usability_scenario' || slide.kind === 'rollout_timeline') {
      for (const step of slide.infographicSteps ?? []) {
        const capWords = countWords(step.caption);
        assert.ok(
          capWords <= MAX_CARD_CAPTION_WORDS,
          `Slide ${slide.slideNumber} card "${step.title}" exceeded ${MAX_CARD_CAPTION_WORDS} words (got ${capWords})`
        );
      }
    } else if (slide.kind === 'stress_matrix') {
      for (const row of slide.benchmarkTable?.rows ?? []) {
        for (const cell of [row.source, row.observe, row.extract]) {
          const cw = countWords(cell);
          assert.ok(
            cw <= MAX_CARD_CAPTION_WORDS,
            `Slide ${slide.slideNumber} row cell "${cell}" exceeded ${MAX_CARD_CAPTION_WORDS} words (got ${cw})`
          );
        }
      }
    } else if (slide.kind === 'method_grid' || slide.kind === 'flow_three') {
      for (const step of slide.infographicSteps ?? []) {
        const capWords = countWords(step.caption);
        assert.ok(
          capWords <= 20,
          `Slide ${slide.slideNumber} card "${step.title}" exceeded 20 words (got ${capWords})`
        );
      }
    } else if (
      slide.kind === 'privacy_balance' ||
      slide.kind === 'pain_comparison' ||
      slide.kind === 'benchmark_trio' ||
      slide.kind === 'affinity_clusters' ||
      slide.kind === 'persona_trio'
    ) {
      const expectedItems =
        slide.kind === 'affinity_clusters' || slide.kind === 'persona_trio' ? 2 : 3;
      for (const card of slide.bentoCards ?? []) {
        assert.equal(card.items?.length, expectedItems);
        for (const item of card.items ?? []) {
          const itemWords = getBulletWordCount(item);
          assert.ok(
            itemWords <= MAX_CARD_CAPTION_WORDS,
            `Slide ${slide.slideNumber} row "${item.leadIn}" exceeded ${MAX_CARD_CAPTION_WORDS} words (got ${itemWords})`
          );
        }
      }
    } else if (
      slide.kind === 'crazy_eights' ||
      slide.kind === 'week4_wireframes' ||
      slide.kind === 'handoff_specs' ||
      slide.kind === 'kpi_trio'
    ) {
      for (const card of slide.bentoCards ?? []) {
        const capWords = countWords(card.caption);
        assert.ok(
          capWords <= MAX_CARD_CAPTION_WORDS,
          `Slide ${slide.slideNumber} card "${card.headline}" exceeded ${MAX_CARD_CAPTION_WORDS} words (got ${capWords})`
        );
      }
    } else {
      const wc = getSlideWordCount(slide);
      assert.ok(
        wc <= MAX_SLIDE_WORDS,
        `Slide ${slide.slideNumber} exceeded ${MAX_SLIDE_WORDS} words (got ${wc})`
      );
    }
  }
  const issues = validateDeck(INITIAL_QUIFI_SLIDES);
  assert.deepEqual(issues, []);
});

test('countWords excludes separator punctuation and getBulletWordCount measures accurately', () => {
  assert.equal(countWords('Live status · Proof confirmation · Payout timer'), 6);
  assert.equal(countWords('Open → Review → Escalated → Frozen → Resolved'), 5);
  assert.equal(
    getBulletWordCount({ id: '1', leadIn: 'Core Shift', text: 'Replace chat logs with clear case views.' }),
    9
  );
});

test('validateDeck flags >30 word slides, >15 word cards, banned jargon, and raw disallowed characters', () => {
  const dirty = structuredClone(INITIAL_QUIFI_SLIDES);
  dirty[0].title = 'Quifi Executive Deck!';
  dirty[1].heroStatement =
    'Use holistic synergy with seamless data taxonomy and immutable logs via telemetry and high-stakes edge-case mastery.';
  dirty[2].infographicSteps![0].caption =
    'This card caption adds way too many extra words on purpose so the card crosses the strict fifteen word ceiling easily.';
  dirty[21].benchmarkTable!.rows[0].observe = 'Systemic operational bottlenecks';
  dirty[24].bentoCards![0].caption = 'Cost is $100 ~ embed';

  const issues = validateDeck(dirty);
  assert.ok(issues.some((i) => i.slideNumber === 1 && i.message.includes('exclamation')));
  assert.ok(issues.some((i) => i.slideNumber === 2 && i.message.includes('holistic')));
  assert.ok(issues.some((i) => i.slideNumber === 2 && i.message.includes('seamless')));
  assert.ok(issues.some((i) => i.slideNumber === 2 && i.message.includes('data taxonomy')));
  assert.ok(issues.some((i) => i.slideNumber === 2 && i.message.includes('immutable')));
  assert.ok(issues.some((i) => i.slideNumber === 2 && i.message.includes('telemetry')));
  assert.ok(issues.some((i) => i.slideNumber === 2 && i.message.includes('edge-case mastery')));
  assert.ok(issues.some((i) => i.slideNumber === 3 && i.field === 'infographicSteps[0].caption'));
  assert.ok(issues.some((i) => i.slideNumber === 22 && i.message.includes('bottlenecks')));
  assert.ok(issues.some((i) => i.slideNumber === 25 && i.message.includes('dollar sign')));
  assert.ok(issues.some((i) => i.slideNumber === 25 && i.message.includes('tilde')));
  assert.ok(issues.some((i) => i.slideNumber === 25 && i.message.includes('embed')));
});

test('filterSlides matches across headlines, Binance/Bybit takeaways, messy trades, and Figma slots', () => {
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'conversational chatbot').some((s) => s.slideNumber === 2));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Everything Lives in One Chat').some((s) => s.slideNumber === 3));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'What Both Traders See').some((s) => s.slideNumber === 4));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'AML & Fraud Risk Flags').some((s) => s.slideNumber === 4));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Double Diamond').some((s) => s.slideNumber === 5));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Chatbot Log & Data Audit').some((s) => s.slideNumber === 6));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Auditing Quifi’s Foundation & Rivals').some((s) => s.slideNumber === 7));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Audit Figma & Chatbot UI').some((s) => s.slideNumber === 8));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Silent Countdown Timers').some((s) => s.slideNumber === 9));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Auto-Generated Case Records').some((s) => s.slideNumber === 10));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Service Blueprint').some((s) => s.slideNumber === 12));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Missing Decision History').some((s) => s.slideNumber === 13));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Compliance Lead').some((s) => s.slideNumber === 14));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Buyer / Seller').some((s) => s.slideNumber === 14));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Open Card Sort').some((s) => s.slideNumber === 15));
  assert.ok(!INITIAL_QUIFI_SLIDES[14].kicker.includes('[Figma SVG #3]'));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Week 4 Mockup Gate').some((s) => s.slideNumber === 16));
  assert.equal(INITIAL_QUIFI_SLIDES[15].gateLabel, 'PHASE 03 · DEVELOP · WEEK 4 GATE → WEEK 8');
  assert.ok(!INITIAL_QUIFI_SLIDES[16].kicker.includes('[Figma SVG #4]'));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Crazy 8s').some((s) => s.slideNumber === 18));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Testable Layout Hypotheses').some((s) => s.slideNumber === 18));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'TRIAGE SPEED').some((s) => s.slideNumber === 18));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, '01 · QUEUE TRIAGE').some((s) => s.slideNumber === 19));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, '3-Pane Evidence Workspace').some((s) => s.slideNumber === 19));
  assert.equal(INITIAL_QUIFI_SLIDES[19].kicker, 'Slide 20 · Deliver');
  assert.equal(INITIAL_QUIFI_SLIDES[19].gateLabel, 'PHASE 04 · DELIVER · WEEKS 5–12');
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Deliver: Validate, Stress-Test & Scale to Launch').some((s) => s.slideNumber === 20));
  assert.equal(INITIAL_QUIFI_SLIDES[20].kicker, 'Slide 21 · Research Pillar 04');
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Find last week’s disputed trade').some((s) => s.slideNumber === 21));
  assert.equal(INITIAL_QUIFI_SLIDES[21].kicker, 'Slide 22 · Edge-Case Stress Test');
  assert.equal(INITIAL_QUIFI_SLIDES[21].gateLabel, 'Weeks 6–7 · Validation');
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Altered Payment Receipts').some((s) => s.slideNumber === 22));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Partial Payments').some((s) => s.slideNumber === 22));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Role Views & UI States').some((s) => s.slideNumber === 23));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'WCAG AA').some((s) => s.slideNumber === 23));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Week 11: Senior Reviewer Pilot').some((s) => s.slideNumber === 24));
  assert.ok(filterSlides(INITIAL_QUIFI_SLIDES, 'Lower Handling Time').some((s) => s.slideNumber === 25));

  const all = filterSlides(INITIAL_QUIFI_SLIDES, '   ');
  assert.equal(all.length, 25);
});
