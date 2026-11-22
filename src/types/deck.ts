export type SlideKind =
  | 'title'
  | 'macro_hero'
  | 'bottleneck_flow'
  | 'privacy_balance'
  | 'figma_full'
  | 'method_grid'
  | 'chapter_divider'
  | 'flow_three'
  | 'pain_comparison'
  | 'benchmark_trio'
  | 'affinity_clusters'
  | 'persona_trio'
  | 'crazy_eights'
  | 'week4_wireframes'
  | 'usability_scenario'
  | 'stress_matrix'
  | 'handoff_specs'
  | 'rollout_timeline'
  | 'kpi_trio';

export type InfographicIconKey =
  | 'chat'
  | 'clock'
  | 'shield'
  | 'users'
  | 'search'
  | 'eye'
  | 'scale'
  | 'compass'
  | 'layers'
  | 'check'
  | 'alert'
  | 'heart'
  | 'zap'
  | 'sparkles'
  | 'file'
  | 'lock';

export type BentoIllustrationKey =
  | 'chat_break'
  | 'evidence_card'
  | 'agent_tabs'
  | 'guided_flow'
  | 'audit_lock'
  | 'urgency_queue'
  | 'queue_preview'
  | 'split_preview'
  | 'audit_preview'
  | 'partial_payment'
  | 'forged_receipt'
  | 'silent_timer'
  | 'compliance_hold'
  | 'speed_gauge'
  | 'error_shield'
  | 'trust_heart'
  | 'sketch_bulk_queue'
  | 'sketch_split_pane'
  | 'sketch_audit_drawer'
  | 'handoff_critique'
  | 'handoff_states'
  | 'handoff_wcag'
  | 'handoff_tokens';

export interface BulletItem {
  id: string;
  leadIn: string;
  text: string;
  icon?: InfographicIconKey;
}

export interface BentoCardItem {
  id: string;
  eyebrow?: string;
  headline: string;
  caption: string;
  items?: BulletItem[];
  stat?: string;
  illustration: BentoIllustrationKey;
  accent?: 'blue' | 'amber' | 'emerald' | 'teal';
  span?: 1 | 2;
}

export interface MetricCallout {
  id: string;
  value: string;
  label: string;
  context: string;
  icon?: InfographicIconKey;
}

export interface InfographicStep {
  id: string;
  stepNumber: string;
  title: string;
  caption: string;
  icon: InfographicIconKey;
  highlight?: boolean;
}

export interface ProcessStage {
  id: string;
  stepNumber: string;
  title: string;
  summary: string;
  icon: InfographicIconKey;
}

export interface ComparisonRow {
  dimension: string;
  current: string;
  target: string;
  impact: string;
}

export interface ComparisonTable {
  headers: [string, string, string, string];
  rows: ComparisonRow[];
}

export interface BenchmarkRow {
  source: string;
  observe: string;
  extract: string;
}

export interface BenchmarkTable {
  headers: [string, string, string];
  rows: BenchmarkRow[];
}

export interface PhaseOutputsStrip {
  label: string;
  deliverables: string;
  whyItMatters: string;
}

export interface FigmaPlaceholderSpec {
  slotTitle: string;
  flowSummary: string;
  recommendedSize: string;
  aspectHint: 'vertical-panel' | 'wide-gantt';
}

export interface SlideData {
  id: string;
  slideNumber: number;
  actLabel: string;
  kicker: string;
  title: string;
  storyLead: string;
  heroStatement?: string;
  heroHighlights?: string[];
  kind: SlideKind;
  bullets: BulletItem[];
  bentoCards?: BentoCardItem[];
  infographicSteps?: InfographicStep[];
  processStages?: ProcessStage[];
  secondaryTitle?: string;
  secondaryBullets?: BulletItem[];
  metrics?: MetricCallout[];
  table?: ComparisonTable;
  benchmarkTable?: BenchmarkTable;
  affinityClusters?: string[];
  phaseOutputs?: PhaseOutputsStrip;
  deliverables?: BulletItem[];
  figmaSlot?: FigmaPlaceholderSpec;
  speakerNotes: string;
  gateLabel?: string;
}

export interface DeckMetadata {
  deckTitle: string;
  client: string;
  author: string;
  role: string;
  dateLabel: string;
  horizon: string;
}

export interface ValidationIssue {
  slideNumber: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface GoogleSlidesSyncResult {
  presentationId: string;
  presentationUrl: string;
  title: string;
  slideCount: number;
  syncedAt: string;
  mode: 'created' | 'updated';
  iconExportMode?: 'png' | 'vector-fallback';
}
