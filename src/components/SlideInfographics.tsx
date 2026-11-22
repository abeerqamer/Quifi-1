import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Eye,
  FileText,
  Heart,
  ImagePlus,
  Layers,
  Lock,
  MessageSquare,
  Scale,
  Scan,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Zap,
} from 'lucide-react';
import {
  BenchmarkTable,
  BentoCardItem,
  BentoIllustrationKey,
  FigmaPlaceholderSpec,
  InfographicIconKey,
  InfographicStep,
  PhaseOutputsStrip,
} from '../types/deck';

const SVG_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  letterSpacing: '0.02em',
  wordSpacing: '0.16em',
};

export const StepIcon: React.FC<{ icon?: InfographicIconKey; className?: string }> = ({
  icon = 'compass',
  className = 'h-4 w-4',
}) => {
  switch (icon) {
    case 'chat':
      return <MessageSquare className={className} aria-hidden="true" />;
    case 'clock':
      return <Clock className={className} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'users':
      return <Users className={className} aria-hidden="true" />;
    case 'search':
      return <Search className={className} aria-hidden="true" />;
    case 'eye':
      return <Eye className={className} aria-hidden="true" />;
    case 'scale':
      return <Scale className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'layers':
      return <Layers className={className} aria-hidden="true" />;
    case 'check':
      return <CheckCircle2 className={className} aria-hidden="true" />;
    case 'alert':
      return <AlertTriangle className={className} aria-hidden="true" />;
    case 'heart':
      return <Heart className={className} aria-hidden="true" />;
    case 'zap':
      return <Zap className={className} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'file':
      return <FileText className={className} aria-hidden="true" />;
    case 'lock':
      return <Lock className={className} aria-hidden="true" />;
    default:
      return <Compass className={className} aria-hidden="true" />;
  }
};

function renderBadgeGlyph(icon: InfographicIconKey = 'compass', sizeClass: string) {
  switch (icon) {
    case 'check':
    case 'shield':
    case 'heart':
      return <Check className={sizeClass} strokeWidth={2.75} aria-hidden="true" />;
    case 'eye':
    case 'search':
      return <Scan className={sizeClass} strokeWidth={2.4} aria-hidden="true" />;
    default:
      return <ArrowUpRight className={sizeClass} strokeWidth={2.6} aria-hidden="true" />;
  }
}

/**
 * Layered Apple-Fintech Frosted-Glass Medallion Icon (luminous orbital halo,
 * specular frosted sapphire squircle, crisp glyph, and dimensional status orb).
 */
export const MedallionIcon: React.FC<{
  icon?: InfographicIconKey;
  size?: 'sm' | 'md' | 'lg';
  accent?: 'blue' | 'amber';
  showBadge?: boolean;
}> = ({ icon = 'compass', size = 'md', accent = 'blue', showBadge = true }) => {
  const outerDim =
    size === 'lg' ? 'h-18 w-18' : size === 'md' ? 'h-12 w-12' : 'h-8 w-8';
  const glassDim =
    size === 'lg' ? 'h-11 w-11 rounded-2xl' : size === 'md' ? 'h-7.5 w-7.5 rounded-xl' : 'h-5 w-5 rounded-md';
  const glyphDim =
    size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5';
  const badgeDim =
    size === 'lg'
      ? 'h-6 w-6 -bottom-0.5 -right-0.5'
      : size === 'md'
      ? 'h-4.5 w-4.5 -bottom-0.5 -right-0.5'
      : 'h-3.5 w-3.5 -bottom-0.5 -right-0.5';
  const badgeGlyphDim =
    size === 'lg' ? 'h-3 w-3' : size === 'md' ? 'h-2.5 w-2.5' : 'h-2 w-2';

  const ringTint =
    accent === 'amber'
      ? 'border-amber-300/25 from-amber-300/18 to-amber-950/35'
      : 'border-sky-300/22 from-sky-300/16 to-sky-950/40';
  const glassTint =
    accent === 'amber'
      ? 'border-amber-100/35 from-amber-200/35 via-amber-500/20 to-amber-950/60'
      : 'border-sky-100/35 from-[#5BB4FF]/38 via-[#1D6BFF]/22 to-[#071D46]/70';
  const badgeColor =
    accent === 'amber'
      ? 'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_2px_8px_rgba(245,158,11,0.45)]'
      : 'bg-gradient-to-br from-[#4BA3FF] via-[#1D6BFF] to-[#0044CC] shadow-[0_2px_8px_rgba(29,107,255,0.5)]';

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full border bg-gradient-to-b shadow-inner ${ringTint} ${outerDim}`}
    >
      <span className="absolute inset-1 rounded-full border border-white/10 bg-[#051531]/65" />
      <span
        className={`relative z-10 inline-flex items-center justify-center border border-t-white/45 bg-gradient-to-br backdrop-blur-xs text-white shadow-[0_4px_12px_rgba(2,11,27,0.45)] ${glassTint} ${glassDim}`}
      >
        <StepIcon icon={icon} className={glyphDim} />
      </span>
      {showBadge && (
        <span
          className={`absolute z-20 inline-flex items-center justify-center rounded-full border border-white/45 text-white ${badgeColor} ${badgeDim}`}
        >
          {renderBadgeGlyph(icon, badgeGlyphDim)}
        </span>
      )}
    </div>
  );
};

/**
 * Custom Apple-style inline SVG illustrations & mini UI wireframes for Bento Cards
 */
export const BentoIllustration: React.FC<{
  kind: BentoIllustrationKey;
  compact?: boolean;
}> = ({ kind, compact = false }) => {
  if (compact) return null;

  switch (kind) {
    case 'queue_preview':
      return (
        <svg viewBox="0 0 268 148" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          <rect x="4" y="4" width="260" height="140" rx="8" fill="#051328" stroke="#38BDF8" strokeOpacity="0.28" />

          {/* Row 1: Amber Urgent SLA */}
          <rect x="11" y="12" width="246" height="28" rx="6" fill="#2A1705" stroke="#F59E0B" strokeOpacity="0.7" />
          <rect x="18" y="20" width="11" height="11" rx="2.5" fill="#D97706" stroke="#FCD34D" strokeWidth="1" />
          <path d="M20.5 25.5L22.5 27.5L26.5 23.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="38" cy="25.5" r="3.5" fill="#FBBF24" />
          <text x="47" y="28.5" fontSize="8.8" fill="#FEF3C7" fontWeight="800">#Q-8941 · 12m SLA</text>
          <rect x="196" y="18" width="53" height="15" rx="7.5" fill="#451A03" stroke="#FBBF24" strokeOpacity="0.65" />
          <text x="222.5" y="28" textAnchor="middle" fontSize="7" fill="#FDE68A" fontWeight="800">URGENT</text>

          {/* Row 2: Blue Assigned */}
          <rect x="11" y="45" width="246" height="28" rx="6" fill="#09244A" stroke="#38BDF8" strokeOpacity="0.45" />
          <rect x="18" y="53" width="11" height="11" rx="2.5" fill="#1D6BFF" stroke="#7DD3FC" strokeWidth="1" />
          <path d="M20.5 58.5L22.5 60.5L26.5 56.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="38" cy="58.5" r="3.5" fill="#38BDF8" />
          <text x="47" y="61.5" fontSize="8.8" fill="#E0F2FE" fontWeight="700">#Q-8938 · Assigned</text>
          <rect x="196" y="51" width="53" height="15" rx="7.5" fill="#0B2E5E" stroke="#38BDF8" strokeOpacity="0.5" />
          <text x="222.5" y="61" textAnchor="middle" fontSize="7" fill="#BAE6FD" fontWeight="700">REVIEW</text>

          {/* Row 3: Teal Resolved */}
          <rect x="11" y="78" width="246" height="28" rx="6" fill="#06292E" stroke="#2DD4BF" strokeOpacity="0.45" />
          <rect x="18" y="86" width="11" height="11" rx="2.5" fill="#07223B" stroke="#64748B" strokeWidth="1" />
          <circle cx="38" cy="91.5" r="3.5" fill="#2DD4BF" />
          <text x="47" y="94.5" fontSize="8.8" fill="#CCFBF1" fontWeight="700">#Q-8932 · Resolved</text>
          <rect x="196" y="84" width="53" height="15" rx="7.5" fill="#064E3B" stroke="#34D399" strokeOpacity="0.55" />
          <text x="222.5" y="94" textAnchor="middle" fontSize="7" fill="#A7F3D0" fontWeight="700">CLOSED</text>

          {/* Compact Bottom Bulk-Action Bar */}
          <rect x="11" y="113" width="246" height="24" rx="6" fill="#063B3A" stroke="#2DD4BF" strokeOpacity="0.8" />
          <text x="134" y="128" textAnchor="middle" fontSize="8.2" fill="#ECFDF5" fontWeight="800">
            2 Selected · Assign / Escalate
          </text>
        </svg>
      );
    case 'split_preview':
      return (
        <svg viewBox="0 0 268 148" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          <rect x="4" y="4" width="260" height="140" rx="8" fill="#051328" stroke="#38BDF8" strokeOpacity="0.28" />

          {/* Column 1: Chat Log */}
          <rect x="11" y="12" width="78" height="124" rx="6" fill="#082042" stroke="#38BDF8" strokeOpacity="0.48" />
          <rect x="11" y="12" width="78" height="22" rx="6" fill="#0B2D5C" />
          <text x="50" y="26" textAnchor="middle" fontSize="8.2" fill="#BAE6FD" fontWeight="800">Chat Log</text>
          <rect x="17" y="42" width="56" height="15" rx="4" fill="#1D6BFF" fillOpacity="0.42" stroke="#60A5FA" strokeOpacity="0.4" />
          <text x="22" y="52" fontSize="6.6" fill="#E0F2FE" fontWeight="600">Paid via wire</text>
          <rect x="27" y="63" width="56" height="15" rx="4" fill="#0F2E5A" stroke="#38BDF8" strokeOpacity="0.35" />
          <text x="32" y="73" fontSize="6.6" fill="#BAE6FD" fontWeight="600">Proof saved</text>
          <rect x="17" y="84" width="58" height="15" rx="4" fill="#1D6BFF" fillOpacity="0.42" stroke="#60A5FA" strokeOpacity="0.4" />
          <text x="22" y="94" fontSize="6.6" fill="#E0F2FE" fontWeight="600">Check receipt</text>
          <rect x="17" y="110" width="66" height="16" rx="4" fill="#071936" stroke="#475569" strokeOpacity="0.55" />
          <text x="50" y="120.5" textAnchor="middle" fontSize="6.4" fill="#94A3B8" fontWeight="600">Order #Q-8941</text>

          {/* Column 2: Receipt Check */}
          <rect x="95" y="12" width="78" height="124" rx="6" fill="#05292E" stroke="#2DD4BF" strokeOpacity="0.82" strokeWidth="1.3" />
          <rect x="95" y="12" width="78" height="22" rx="6" fill="#064044" />
          <text x="134" y="26" textAnchor="middle" fontSize="8.2" fill="#99F6E4" fontWeight="800">Receipt ✓</text>
          <rect x="103" y="42" width="62" height="54" rx="5" fill="#093B40" stroke="#2DD4BF" strokeOpacity="0.6" />
          <circle cx="134" cy="61" r="10.5" fill="#065F46" stroke="#34D399" strokeWidth="1.4" />
          <path d="M129.5 61L132.5 64L139 57.5" stroke="#6EE7B7" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="134" y="81" textAnchor="middle" fontSize="7" fill="#ECFDF5" fontWeight="700">Matched ID</text>
          <text x="134" y="90" textAnchor="middle" fontSize="6.3" fill="#99F6E4">Bank Ref OK</text>
          <rect x="103" y="106" width="62" height="20" rx="4" fill="#064E3B" stroke="#34D399" strokeOpacity="0.7" />
          <text x="134" y="118.5" textAnchor="middle" fontSize="7" fill="#A7F3D0" fontWeight="800">Verified</text>

          {/* Column 3: Risk Flags */}
          <rect x="179" y="12" width="78" height="124" rx="6" fill="#1D1408" stroke="#FBBF24" strokeOpacity="0.68" />
          <rect x="179" y="12" width="78" height="22" rx="6" fill="#3B2106" />
          <text x="218" y="26" textAnchor="middle" fontSize="8.2" fill="#FDE68A" fontWeight="800">Risk Flags</text>
          <rect x="186" y="42" width="64" height="20" rx="4" fill="#451A03" stroke="#F59E0B" strokeOpacity="0.65" />
          <text x="218" y="54.5" textAnchor="middle" fontSize="6.9" fill="#FEF3C7" fontWeight="700">2x Velocity</text>
          <rect x="186" y="68" width="64" height="18" rx="4" fill="#0B234A" stroke="#38BDF8" strokeOpacity="0.45" />
          <text x="218" y="79.5" textAnchor="middle" fontSize="6.7" fill="#BAE6FD" fontWeight="600">Tier 2 KYC</text>
          <rect x="186" y="92" width="64" height="16" rx="4" fill="#091D3E" stroke="#64748B" strokeOpacity="0.45" />
          <text x="218" y="102.5" textAnchor="middle" fontSize="6.5" fill="#CBD5E1" fontWeight="600">98% History</text>
          <rect x="186" y="113" width="64" height="15" rx="4" fill="#064E3B" stroke="#2DD4BF" strokeOpacity="0.5" />
          <text x="218" y="123" textAnchor="middle" fontSize="6.5" fill="#99F6E4" fontWeight="700">Release Safe</text>
        </svg>
      );
    case 'audit_preview':
      return (
        <svg viewBox="0 0 268 148" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          <rect x="4" y="4" width="260" height="140" rx="8" fill="#051328" stroke="#38BDF8" strokeOpacity="0.28" />
          <line x1="27" y1="26" x2="27" y2="122" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.8" />

          {/* Node 1: 14:02 Case Opened */}
          <circle cx="27" cy="30" r="5" fill="#38BDF8" />
          <rect x="42" y="14" width="214" height="32" rx="6" fill="#09294D" stroke="#38BDF8" strokeOpacity="0.52" />
          <text x="54" y="33.5" fontSize="9.2" fill="#E0F2FE" fontWeight="700">14:02 · Case Opened</text>
          <rect x="206" y="22" width="40" height="15" rx="7.5" fill="#0B3B73" stroke="#38BDF8" strokeOpacity="0.45" />
          <text x="226" y="32" textAnchor="middle" fontSize="6.8" fill="#BAE6FD" fontWeight="700">BOT</text>

          {/* Node 2: 14:09 Risk Flagged */}
          <circle cx="27" cy="74" r="5" fill="#FBBF24" />
          <rect x="42" y="58" width="214" height="32" rx="6" fill="#2A1705" stroke="#FBBF24" strokeOpacity="0.6" />
          <text x="54" y="77.5" fontSize="9.2" fill="#FEF3C7" fontWeight="700">14:09 · Risk Flagged</text>
          <rect x="206" y="66" width="40" height="15" rx="7.5" fill="#451A03" stroke="#FBBF24" strokeOpacity="0.55" />
          <text x="226" y="76" textAnchor="middle" fontSize="6.8" fill="#FDE68A" fontWeight="700">OPS</text>

          {/* Node 3: 14:15 Funds Released */}
          <circle cx="27" cy="118" r="5" fill="#2DD4BF" />
          <rect x="42" y="102" width="214" height="32" rx="6" fill="#063B3A" stroke="#2DD4BF" strokeOpacity="0.72" />
          <text x="54" y="121.5" fontSize="9.2" fill="#ECFDF5" fontWeight="700">14:15 · Funds Released</text>
          <rect x="200" y="110" width="46" height="15" rx="7.5" fill="#064E3B" stroke="#34D399" strokeOpacity="0.65" />
          <text x="223" y="120" textAnchor="middle" fontSize="6.8" fill="#A7F3D0" fontWeight="800">LOCKED</text>
        </svg>
      );
    case 'chat_break':
      return (
        <svg viewBox="0 0 220 72" className="w-full h-16" aria-hidden="true">
          <rect x="10" y="10" width="96" height="18" rx="9" fill="#1E3A5F" stroke="#7DD3FC" strokeOpacity="0.25" />
          <rect x="24" y="17" width="64" height="4" rx="2" fill="#94A3B8" />
          <rect x="86" y="34" width="110" height="18" rx="9" fill="#7F1D1D" fillOpacity="0.45" stroke="#F87171" strokeOpacity="0.45" />
          <rect x="102" y="41" width="76" height="4" rx="2" fill="#FCA5A5" />
          <circle cx="204" cy="18" r="10" fill="#F59E0B" fillOpacity="0.2" stroke="#FBBF24" />
          <path d="M204 13v5M204 21v1" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'evidence_card':
      return (
        <svg viewBox="0 0 220 82" className="w-full h-20" style={SVG_TEXT_STYLE} aria-hidden="true">
          <rect x="8" y="8" width="204" height="66" rx="8" fill="#061630" stroke="#38BDF8" strokeOpacity="0.45" />
          <rect x="18" y="21" width="102" height="14" rx="4" fill="#062E2B" stroke="#34D399" strokeOpacity="0.55" />
          <text x="69" y="30.5" textAnchor="middle" fontSize="7.2" fill="#A7F3D0" fontWeight="700">PROOF VERIFIED</text>
          <rect x="18" y="45" width="102" height="14" rx="4" fill="#0B254E" stroke="#38BDF8" strokeOpacity="0.55" />
          <text x="69" y="54.5" textAnchor="middle" fontSize="6.9" fill="#BAE6FD" fontWeight="600">ESCROW PROTECTED</text>
          <circle cx="139" cy="41" r="12" fill="#10B981" fillOpacity="0.2" stroke="#34D399" strokeWidth="1.5" />
          <path d="M134 41l3.5 3.5 7-7" stroke="#34D399" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="158" y="18" width="44" height="46" rx="6" fill="#08224A" stroke="#38BDF8" strokeOpacity="0.4" />
          <text x="180" y="39" textAnchor="middle" fontSize="9.5" fill="#FFFFFF" fontWeight="700">24h</text>
          <text x="180" y="52" textAnchor="middle" fontSize="7.5" fill="#7DD3FC">TIMER</text>
        </svg>
      );
    case 'audit_lock':
      return (
        <svg viewBox="0 0 220 82" className="w-full h-20" style={SVG_TEXT_STYLE} aria-hidden="true">
          <rect x="8" y="8" width="204" height="66" rx="8" fill="#1C1408" fillOpacity="0.65" stroke="#FBBF24" strokeOpacity="0.55" />
          <rect x="20" y="20" width="108" height="12" rx="4" fill="#451A03" stroke="#FBBF24" strokeOpacity="0.55" />
          <text x="74" y="29" textAnchor="middle" fontSize="7.5" fill="#FDE68A" fontWeight="700">INTERNAL RISK FLAG</text>
          <rect x="20" y="40" width="108" height="12" rx="4" fill="#451A03" stroke="#FBBF24" strokeOpacity="0.4" />
          <text x="74" y="49" textAnchor="middle" fontSize="7.5" fill="#FEF3C7" fontWeight="600">AML &amp; COUNTERPARTY ID</text>
          <circle cx="170" cy="41" r="18" fill="#451A03" stroke="#FBBF24" strokeWidth="1.5" />
          <rect x="162" y="39" width="16" height="12" rx="3" fill="#FBBF24" />
          <path d="M165 39v-4a5 5 0 0 1 10 0v4" fill="none" stroke="#FDE68A" strokeWidth="2" />
        </svg>
      );
    case 'urgency_queue':
      return <MedallionIcon icon="clock" size="md" accent="amber" />;
    case 'agent_tabs':
      return (
        <svg viewBox="0 0 220 82" className="w-full h-20" style={SVG_TEXT_STYLE} aria-hidden="true">
          <rect x="14" y="10" width="124" height="44" rx="6" fill="#071936" stroke="#475569" />
          <rect x="38" y="20" width="124" height="44" rx="6" fill="#0B234A" stroke="#64748B" />
          <rect x="62" y="30" width="142" height="42" rx="6" fill="#103266" stroke="#38BDF8" strokeOpacity="0.65" />
          <text x="133" y="49" textAnchor="middle" fontSize="8.5" fill="#FFFFFF" fontWeight="700">4 DISCONNECTED TABS</text>
          <path d="M104 60h46M142 55l8 5-8 5" stroke="#7DD3FC" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'guided_flow':
      return <MedallionIcon icon="chat" size="md" />;
    case 'partial_payment':
      return (
        <svg viewBox="0 0 220 68" className="w-full h-14" style={SVG_TEXT_STYLE} aria-hidden="true">
          <rect x="12" y="22" width="196" height="14" rx="7" fill="#091D3E" stroke="#38BDF8" strokeOpacity="0.25" />
          <rect x="12" y="22" width="138" height="14" rx="7" fill="#1D6BFF" />
          <rect x="152" y="22" width="56" height="14" rx="7" fill="#F59E0B" fillOpacity="0.55" />
          <text x="12" y="54" fontSize="10" fill="#7DD3FC" fontFamily="monospace">70% Received</text>
          <text x="148" y="54" fontSize="10" fill="#FBBF24" fontFamily="monospace">30% Split</text>
        </svg>
      );
    case 'forged_receipt':
      return (
        <svg viewBox="0 0 220 68" className="w-full h-14" aria-hidden="true">
          <rect x="14" y="10" width="84" height="48" rx="5" fill="#0C244A" stroke="#38BDF8" strokeOpacity="0.4" />
          <rect x="24" y="20" width="52" height="4" rx="2" fill="#7DD3FC" fillOpacity="0.65" />
          <rect x="24" y="30" width="62" height="4" rx="2" fill="#94A3B8" fillOpacity="0.45" />
          <rect x="24" y="40" width="38" height="4" rx="2" fill="#34D399" fillOpacity="0.6" />
          <rect x="114" y="10" width="90" height="48" rx="5" fill="#0C244A" stroke="#F59E0B" strokeOpacity="0.65" />
          <rect x="124" y="20" width="32" height="4" rx="2" fill="#FBBF24" fillOpacity="0.55" />
          <rect x="124" y="30" width="24" height="4" rx="2" fill="#94A3B8" fillOpacity="0.4" />
          <circle cx="164" cy="34" r="14" fill="#F59E0B" fillOpacity="0.18" stroke="#FBBF24" strokeWidth="1.6" />
          <path d="M164 28v6M164 38v1" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="174" y1="44" x2="184" y2="52" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'silent_timer':
      return (
        <svg viewBox="0 0 220 82" className="w-full h-20" style={SVG_TEXT_STYLE} aria-hidden="true">
          <circle cx="48" cy="41" r="24" fill="none" stroke="#1E3A5F" strokeWidth="4.5" />
          <circle cx="48" cy="41" r="24" fill="none" stroke="#FBBF24" strokeWidth="4.5" strokeDasharray="106 150" strokeLinecap="round" />
          <text x="48" y="45" textAnchor="middle" fontSize="11" fill="#FEF3C7" fontWeight="700">24h?</text>
          <rect x="88" y="22" width="118" height="12" rx="6" fill="#451A03" fillOpacity="0.7" stroke="#FBBF24" strokeOpacity="0.5" />
          <text x="147" y="31" textAnchor="middle" fontSize="7.5" fill="#FDE68A" fontWeight="700">SILENT FREEZE</text>
          <rect x="88" y="42" width="96" height="8" rx="4" fill="#64748B" fillOpacity="0.45" />
          <rect x="88" y="55" width="76" height="6" rx="3" fill="#64748B" fillOpacity="0.3" />
        </svg>
      );
    case 'compliance_hold':
      return <MedallionIcon icon="lock" size="md" accent="amber" />;
    case 'speed_gauge':
      return <MedallionIcon icon="zap" size="md" />;
    case 'error_shield':
      return <MedallionIcon icon="shield" size="md" accent="amber" />;
    case 'trust_heart':
      return <MedallionIcon icon="heart" size="md" />;
    case 'sketch_bulk_queue':
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          {/* OPT A · INLINE BAR (Winner - Glowing Teal + SELECTED) */}
          <rect
            x="4"
            y="10"
            width="132"
            height="144"
            rx="8"
            fill="#042228"
            stroke="#2DD4BF"
            strokeWidth="1.75"
          />
          <rect x="52" y="3" width="78" height="14" rx="7" fill="#064E3B" stroke="#34D399" strokeWidth="1.1" />
          <text x="91" y="12.2" textAnchor="middle" fontSize="6.1" fill="#A7F3D0" fontWeight="800">
            WK 4 HYPOTHESIS
          </text>
          <text x="70" y="29" textAnchor="middle" fontSize="7.4" fill="#5EEAD4" fontWeight="800">
            OPT A · INLINE BAR
          </text>

          {/* Multi-select checkbox rows */}
          <rect x="13" y="39" width="12" height="12" rx="3" fill="#0D9488" stroke="#5EEAD4" strokeWidth="1.1" />
          <path d="M15.8 45L18 47.2L22.2 42.8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="31" y="41" width="93" height="8" rx="3" fill="#CBD5E1" fillOpacity="0.65" />

          <rect x="13" y="58" width="12" height="12" rx="3" fill="#0D9488" stroke="#5EEAD4" strokeWidth="1.1" />
          <path d="M15.8 64L18 66.2L22.2 61.8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="31" y="60" width="81" height="8" rx="3" fill="#CBD5E1" fillOpacity="0.65" />

          <rect x="13" y="77" width="12" height="12" rx="3" fill="#07223B" stroke="#64748B" strokeWidth="1" />
          <rect x="31" y="79" width="87" height="8" rx="3" fill="#64748B" fillOpacity="0.45" />

          <rect x="13" y="96" width="12" height="12" rx="3" fill="#07223B" stroke="#64748B" strokeWidth="1" />
          <rect x="31" y="98" width="75" height="8" rx="3" fill="#64748B" fillOpacity="0.4" />

          {/* Floating bottom bar */}
          <rect x="11" y="118" width="118" height="28" rx="6" fill="#064E3B" stroke="#2DD4BF" strokeWidth="1.3" />
          <text x="70" y="135" textAnchor="middle" fontSize="6.9" fill="#ECFDF5" fontWeight="800">
            2 Selected · Assign / Escalate
          </text>

          {/* OPT B · BATCH DRAWER (Muted) */}
          <rect
            x="144"
            y="10"
            width="132"
            height="144"
            rx="8"
            fill="#051328"
            stroke="#475569"
            strokeOpacity="0.55"
            strokeDasharray="3 2"
          />
          <text x="210" y="29" textAnchor="middle" fontSize="7.4" fill="#94A3B8" fontWeight="700">
            OPT B · BATCH DRAWER
          </text>
          <rect x="152" y="42" width="56" height="8" rx="2.5" fill="#475569" fillOpacity="0.45" />
          <rect x="152" y="58" width="56" height="8" rx="2.5" fill="#475569" fillOpacity="0.45" />
          <rect x="152" y="74" width="56" height="8" rx="2.5" fill="#475569" fillOpacity="0.4" />
          <rect x="152" y="90" width="56" height="8" rx="2.5" fill="#475569" fillOpacity="0.35" />
          <rect x="214" y="39" width="54" height="106" rx="5" fill="#0B1E3D" stroke="#64748B" strokeOpacity="0.55" />
          <text x="241" y="54" textAnchor="middle" fontSize="6.8" fill="#94A3B8" fontWeight="700">
            Drawer
          </text>
          <rect x="221" y="63" width="40" height="14" rx="3" fill="#334155" fillOpacity="0.6" />
          <rect x="221" y="83" width="40" height="14" rx="3" fill="#334155" fillOpacity="0.45" />
          <rect x="221" y="118" width="40" height="16" rx="3" fill="#475569" fillOpacity="0.55" />
        </svg>
      );
    case 'sketch_split_pane':
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          {/* 2-PANE SPLIT (Muted) */}
          <rect
            x="4"
            y="10"
            width="124"
            height="144"
            rx="8"
            fill="#051328"
            stroke="#475569"
            strokeOpacity="0.55"
            strokeDasharray="3 2"
          />
          <text x="66" y="29" textAnchor="middle" fontSize="7.4" fill="#94A3B8" fontWeight="700">
            2-PANE SPLIT
          </text>
          <rect x="12" y="39" width="52" height="106" rx="5" fill="#0B1E3D" stroke="#64748B" strokeOpacity="0.45" />
          <text x="38" y="52" textAnchor="middle" fontSize="6.8" fill="#94A3B8" fontWeight="700">Chat</text>
          <rect x="18" y="61" width="34" height="8" rx="3" fill="#475569" fillOpacity="0.55" />
          <rect x="24" y="75" width="34" height="8" rx="3" fill="#475569" fillOpacity="0.4" />
          <rect x="68" y="39" width="52" height="106" rx="5" fill="#0B1E3D" stroke="#64748B" strokeOpacity="0.45" />
          <text x="94" y="52" textAnchor="middle" fontSize="6.8" fill="#94A3B8" fontWeight="700">Receipt</text>
          <rect x="75" y="61" width="38" height="34" rx="3" fill="#334155" fillOpacity="0.5" />
          <rect x="75" y="103" width="38" height="7" rx="2" fill="#475569" fillOpacity="0.5" />

          {/* 3-PANE INSPECTOR (Winner - Glowing Teal + SELECTED) */}
          <rect
            x="134"
            y="10"
            width="142"
            height="144"
            rx="8"
            fill="#042228"
            stroke="#2DD4BF"
            strokeWidth="1.75"
          />
          <rect x="192" y="3" width="78" height="14" rx="7" fill="#064E3B" stroke="#34D399" strokeWidth="1.1" />
          <text x="231" y="12.2" textAnchor="middle" fontSize="6.1" fill="#A7F3D0" fontWeight="800">
            WK 4 HYPOTHESIS
          </text>
          <text x="205" y="29" textAnchor="middle" fontSize="7.4" fill="#5EEAD4" fontWeight="800">
            3-PANE INSPECTOR
          </text>

          {/* Pane 1: Live Chat */}
          <rect x="141" y="39" width="40" height="106" rx="4" fill="#072736" stroke="#38BDF8" strokeOpacity="0.55" />
          <text x="161" y="51" textAnchor="middle" fontSize="6.5" fill="#BAE6FD" fontWeight="700">Chat</text>
          <rect x="146" y="59" width="26" height="7" rx="2.5" fill="#1D6BFF" fillOpacity="0.65" />
          <rect x="150" y="72" width="26" height="7" rx="2.5" fill="#38BDF8" fillOpacity="0.4" />
          <rect x="146" y="85" width="28" height="7" rx="2.5" fill="#1D6BFF" fillOpacity="0.55" />

          {/* Pane 2: Receipt Zoom */}
          <rect x="185" y="39" width="42" height="106" rx="4" fill="#06343A" stroke="#2DD4BF" strokeWidth="1.2" />
          <text x="206" y="51" textAnchor="middle" fontSize="6.5" fill="#99F6E4" fontWeight="800">Receipt</text>
          <rect x="191" y="59" width="30" height="42" rx="3" fill="#0D9488" fillOpacity="0.28" stroke="#5EEAD4" strokeOpacity="0.65" />
          <path d="M200 79L204 83L212 74" stroke="#6EE7B7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="191" y="109" width="30" height="6" rx="2" fill="#99F6E4" fillOpacity="0.6" />

          {/* Pane 3: Trader Risk Metadata */}
          <rect x="231" y="39" width="38" height="106" rx="4" fill="#072736" stroke="#FBBF24" strokeOpacity="0.6" />
          <text x="250" y="51" textAnchor="middle" fontSize="6.5" fill="#FDE68A" fontWeight="700">Risk</text>
          <rect x="236" y="59" width="28" height="12" rx="3" fill="#451A03" stroke="#FBBF24" strokeOpacity="0.6" />
          <rect x="236" y="77" width="28" height="6" rx="2" fill="#7DD3FC" fillOpacity="0.55" />
          <rect x="236" y="89" width="24" height="6" rx="2" fill="#7DD3FC" fillOpacity="0.4" />
          <rect x="236" y="121" width="28" height="16" rx="3" fill="#0D9488" fillOpacity="0.5" />
        </svg>
      );
    case 'sketch_audit_drawer':
      return (
        <svg viewBox="0 0 280 160" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          {/* INLINE COLLAPSE (Muted) */}
          <rect
            x="4"
            y="10"
            width="124"
            height="144"
            rx="8"
            fill="#051328"
            stroke="#475569"
            strokeOpacity="0.55"
            strokeDasharray="3 2"
          />
          <text x="66" y="29" textAnchor="middle" fontSize="7.4" fill="#94A3B8" fontWeight="700">
            INLINE COLLAPSE
          </text>
          <rect x="12" y="39" width="108" height="24" rx="5" fill="#0B1E3D" stroke="#64748B" strokeOpacity="0.45" />
          <rect x="20" y="48" width="70" height="6" rx="2" fill="#64748B" fillOpacity="0.55" />
          <rect x="12" y="71" width="108" height="72" rx="5" fill="#091730" stroke="#64748B" strokeOpacity="0.35" strokeDasharray="2 2" />
          <circle cx="24" cy="87" r="3.5" fill="#64748B" />
          <rect x="34" y="84" width="72" height="5" rx="2" fill="#475569" fillOpacity="0.65" />
          <circle cx="24" cy="106" r="3.5" fill="#64748B" />
          <rect x="34" y="103" width="62" height="5" rx="2" fill="#475569" fillOpacity="0.55" />
          <circle cx="24" cy="125" r="3.5" fill="#64748B" />
          <rect x="34" y="122" width="66" height="5" rx="2" fill="#475569" fillOpacity="0.45" />

          {/* AUDIT DRAWER (Winner - Glowing Teal + SELECTED) */}
          <rect
            x="134"
            y="10"
            width="142"
            height="144"
            rx="8"
            fill="#042228"
            stroke="#2DD4BF"
            strokeWidth="1.75"
          />
          <rect x="192" y="3" width="78" height="14" rx="7" fill="#064E3B" stroke="#34D399" strokeWidth="1.1" />
          <text x="231" y="12.2" textAnchor="middle" fontSize="6.1" fill="#A7F3D0" fontWeight="800">
            WK 4 HYPOTHESIS
          </text>
          <text x="205" y="29" textAnchor="middle" fontSize="7.4" fill="#5EEAD4" fontWeight="800">
            AUDIT DRAWER
          </text>

          {/* Locked Header Bar */}
          <rect x="142" y="37" width="126" height="18" rx="4" fill="#06343A" stroke="#2DD4BF" strokeOpacity="0.7" />
          <text x="205" y="48.5" textAnchor="middle" fontSize="6.7" fill="#CCFBF1" fontWeight="700">
            LOCKED DECISION TIMELINE
          </text>

          {/* Chronological Timeline with Timestamps & Reviewer IDs */}
          <line x1="154" y1="66" x2="154" y2="134" stroke="#2DD4BF" strokeOpacity="0.6" strokeWidth="1.6" />

          <circle cx="154" cy="70" r="4" fill="#38BDF8" />
          <rect x="164" y="61" width="102" height="18" rx="4" fill="#09294D" stroke="#38BDF8" strokeOpacity="0.45" />
          <text x="170" y="72.5" fontSize="6.6" fill="#E0F2FE" fontWeight="700">14:02 · Ops #08 Opened</text>

          <circle cx="154" cy="100" r="4" fill="#FBBF24" />
          <rect x="164" y="91" width="102" height="18" rx="4" fill="#361905" stroke="#FBBF24" strokeOpacity="0.55" />
          <text x="170" y="102.5" fontSize="6.6" fill="#FEF3C7" fontWeight="700">14:09 · Risk #03 Flag</text>

          <circle cx="154" cy="130" r="4" fill="#2DD4BF" />
          <rect x="164" y="121" width="102" height="18" rx="4" fill="#064E3B" stroke="#34D399" strokeOpacity="0.7" />
          <text x="170" y="132.5" fontSize="6.6" fill="#ECFDF5" fontWeight="700">14:15 · Locked Final</text>
        </svg>
      );
    case 'handoff_critique':
      return (
        <svg viewBox="0 0 240 108" className="w-full h-full" style={SVG_TEXT_STYLE} aria-hidden="true">
          <rect x="6" y="8" width="108" height="92" rx="8" fill="#061630" stroke="#38BDF8" strokeOpacity="0.45" />
          <text x="60" y="24" textAnchor="middle" fontSize="8" fill="#7DD3FC" fontWeight="700">FRONTLINE AGENT</text>
          <rect x="14" y="34" width="92" height="24" rx="5" fill="#0B254E" stroke="#38BDF8" strokeOpacity="0.4" />
          <text x="60" y="49" textAnchor="middle" fontSize="8" fill="#E0F2FE" fontWeight="600">Verify Proof &amp; Chat</text>
          <rect x="14" y="65" width="92" height="24" rx="5" fill="#0B254E" stroke="#38BDF8" strokeOpacity="0.4" />
          <text x="60" y="80" textAnchor="middle" fontSize="8" fill="#E0F2FE" fontWeight="600">Escalate to Risk</text>

          <rect x="126" y="8" width="108" height="92" rx="8" fill="#061630" stroke="#FBBF24" strokeOpacity="0.55" />
          <text x="180" y="24" textAnchor="middle" fontSize="8" fill="#FDE68A" fontWeight="700">COMPLIANCE LEAD</text>
          <rect x="134" y="34" width="92" height="24" rx="5" fill="#451A03" fillOpacity="0.7" stroke="#FBBF24" strokeOpacity="0.55" />
          <text x="180" y="49" textAnchor="middle" fontSize="8" fill="#FEF3C7" fontWeight="600">Freeze Escrow Hold</text>
          <rect x="134" y="65" width="92" height="24" rx="5" fill="#064E3B" fillOpacity="0.65" stroke="#34D399" strokeOpacity="0.6" />
          <text x="180" y="80" textAnchor="middle" fontSize="8" fill="#ECFDF5" fontWeight="600">Export Case Audit</text>
        </svg>
      );
    case 'handoff_states':
      return (
        <svg viewBox="0 0 264 148" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          {/* 1. EMPTY QUEUE */}
          <rect x="6" y="8" width="122" height="62" rx="8" fill="#061630" stroke="#38BDF8" strokeOpacity="0.55" strokeDasharray="3 2" />
          <text x="67" y="32" textAnchor="middle" fontSize="8.6" fill="#7DD3FC" fontWeight="800">EMPTY QUEUE</text>
          <text x="67" y="48" textAnchor="middle" fontSize="7.4" fill="#BAE6FD" fontWeight="500">Clear next action</text>

          {/* 2. LOADING PROOF */}
          <rect x="136" y="8" width="122" height="62" rx="8" fill="#071D3E" stroke="#38BDF8" strokeOpacity="0.55" />
          <text x="197" y="32" textAnchor="middle" fontSize="8.6" fill="#7DD3FC" fontWeight="800">LOADING PROOF</text>
          <text x="197" y="48" textAnchor="middle" fontSize="7.4" fill="#BAE6FD" fontWeight="500">Skeleton + retry</text>

          {/* 3. ROLE LOCK */}
          <rect x="6" y="78" width="122" height="62" rx="8" fill="#231607" stroke="#FBBF24" strokeOpacity="0.6" />
          <text x="67" y="102" textAnchor="middle" fontSize="8.6" fill="#FDE68A" fontWeight="800">ROLE LOCK</text>
          <text x="67" y="118" textAnchor="middle" fontSize="7.4" fill="#FEF3C7" fontWeight="500">Agent vs. Compliance view</text>

          {/* 4. READ-ONLY ARCHIVE */}
          <rect x="136" y="78" width="122" height="62" rx="8" fill="#06292E" stroke="#2DD4BF" strokeOpacity="0.6" />
          <text x="197" y="102" textAnchor="middle" fontSize="8.6" fill="#99F6E4" fontWeight="800">READ-ONLY ARCHIVE</text>
          <text x="197" y="118" textAnchor="middle" fontSize="7.4" fill="#CCFBF1" fontWeight="500">Locked decision log</text>
        </svg>
      );
    case 'handoff_wcag':
      return (
        <svg viewBox="0 0 264 148" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          {/* Spec 1: 4.5:1 TEXT CONTRAST */}
          <rect x="6" y="8" width="252" height="40" rx="8" fill="#062E2C" stroke="#2DD4BF" strokeOpacity="0.65" />
          <rect x="15" y="16" width="32" height="24" rx="5" fill="#064E3B" stroke="#5EEAD4" strokeOpacity="0.7" />
          <text x="31" y="31.5" textAnchor="middle" fontSize="9.5" fill="#ECFDF5" fontWeight="800">Aa</text>
          <text x="58" y="25.5" fontSize="8.5" fill="#99F6E4" fontWeight="800">4.5:1 TEXT CONTRAST</text>
          <text x="58" y="38.5" fontSize="7.4" fill="#CCFBF1" fontWeight="500">Readable in bright offices</text>

          {/* Spec 2: 3.0:1 UI BORDERS */}
          <rect x="6" y="54" width="252" height="40" rx="8" fill="#082042" stroke="#38BDF8" strokeOpacity="0.6" />
          <rect x="15" y="62" width="32" height="24" rx="5" fill="#0B2D5C" stroke="#7DD3FC" strokeWidth="1.5" />
          <rect x="21" y="70" width="20" height="8" rx="4" fill="#38BDF8" fillOpacity="0.75" />
          <text x="58" y="71.5" fontSize="8.5" fill="#BAE6FD" fontWeight="800">3.0:1 UI BORDERS</text>
          <text x="58" y="84.5" fontSize="7.4" fill="#E0F2FE" fontWeight="500">Clear buttons &amp; status pills</text>

          {/* Spec 3: KEYBOARD NAVIGATION */}
          <rect x="6" y="100" width="252" height="40" rx="8" fill="#221708" stroke="#FBBF24" strokeOpacity="0.58" />
          <rect x="15" y="108" width="32" height="24" rx="5" fill="#451A03" stroke="#FCD34D" strokeWidth="1.3" />
          <text x="31" y="123" textAnchor="middle" fontSize="8" fill="#FEF3C7" fontWeight="800">Tab</text>
          <text x="58" y="117.5" fontSize="8.5" fill="#FDE68A" fontWeight="800">KEYBOARD NAVIGATION</text>
          <text x="58" y="130.5" fontSize="7.4" fill="#FEF3C7" fontWeight="500">Fast triage without mouse</text>
        </svg>
      );
    case 'handoff_tokens':
      return (
        <svg viewBox="0 0 264 148" className="w-full h-full" style={{ fontFamily: 'Inter, system-ui, sans-serif' }} aria-hidden="true">
          <rect x="6" y="10" width="252" height="36" rx="8" fill="#0B2E63" stroke="#7DD3FC" strokeOpacity="0.62" />
          <text x="132" y="31.5" textAnchor="middle" fontSize="8.6" fill="#E0F2FE" fontWeight="800">
            QUIFI FIGMA KIT · TYPE · COLOR · GRID
          </text>
          <path d="M50 46 V64 M132 46 V64 M214 46 V64" stroke="#38BDF8" strokeOpacity="0.7" strokeWidth="1.6" />

          <rect x="6" y="64" width="78" height="72" rx="8" fill="#061630" stroke="#38BDF8" strokeOpacity="0.55" />
          <text x="45" y="96" textAnchor="middle" fontSize="9.5" fill="#FFFFFF" fontWeight="800">Case</text>
          <text x="45" y="112" textAnchor="middle" fontSize="8.2" fill="#BAE6FD" fontWeight="600">Tables</text>

          <rect x="93" y="64" width="78" height="72" rx="8" fill="#2A1705" stroke="#FBBF24" strokeOpacity="0.62" />
          <text x="132" y="96" textAnchor="middle" fontSize="9.5" fill="#FEF3C7" fontWeight="800">SLA</text>
          <text x="132" y="112" textAnchor="middle" fontSize="8.2" fill="#FDE68A" fontWeight="600">Badges</text>

          <rect x="180" y="64" width="78" height="72" rx="8" fill="#062E2C" stroke="#2DD4BF" strokeOpacity="0.65" />
          <text x="219" y="96" textAnchor="middle" fontSize="9.5" fill="#ECFDF5" fontWeight="800">Audit</text>
          <text x="219" y="112" textAnchor="middle" fontSize="8.2" fill="#99F6E4" fontWeight="600">Timeline</text>
        </svg>
      );
    default:
      return <MedallionIcon icon="sparkles" size="md" />;
  }
};

const BottleneckIllustration: React.FC<{ icon?: InfographicIconKey }> = ({ icon }) => {
  switch (icon) {
    case 'chat':
      // Card 01: Overlapping messy chat bubbles tangled with a receipt/photo card and an alert badge
      return (
        <svg viewBox="0 0 240 132" className="w-full h-full max-h-[144px]" aria-hidden="true">
          <defs>
            <linearGradient id="s3-c1-card" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0D2C5C" />
              <stop offset="100%" stopColor="#061735" />
            </linearGradient>
          </defs>

          {/* Tangled thread curve behind elements */}
          <path
            d="M36 92 C 58 112, 92 24, 126 58 C 154 86, 178 28, 206 46"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity="0.32"
            strokeWidth="1.6"
            strokeDasharray="4 3"
          />

          {/* Top-left messy incoming bubble */}
          <g transform="translate(18, 16) rotate(-4 48 16)">
            <rect x="0" y="0" width="96" height="34" rx="10" fill="#0B2650" stroke="#38BDF8" strokeOpacity="0.4" />
            <rect x="12" y="11" width="54" height="4.5" rx="2.25" fill="#93C5FD" fillOpacity="0.7" />
            <rect x="12" y="20" width="70" height="4" rx="2" fill="#64748B" fillOpacity="0.65" />
          </g>

          {/* Middle buried receipt / photo attachment card */}
          <g transform="translate(78, 32) rotate(5 40 34)">
            <rect x="0" y="0" width="80" height="68" rx="8" fill="url(#s3-c1-card)" stroke="#7DD3FC" strokeOpacity="0.6" strokeWidth="1.25" />
            {/* Photo / receipt thumbnail frame */}
            <rect x="9" y="10" width="62" height="30" rx="4" fill="#071C3E" stroke="#38BDF8" strokeOpacity="0.35" />
            <circle cx="22" cy="21" r="4" fill="#38BDF8" fillOpacity="0.75" />
            <path d="M14 36 L28 24 L40 33 L50 26 L65 36 Z" fill="#1D6BFF" fillOpacity="0.55" />
            {/* Receipt line items */}
            <rect x="10" y="47" width="42" height="4" rx="2" fill="#E2E8F0" fillOpacity="0.8" />
            <rect x="10" y="55" width="28" height="3.5" rx="1.75" fill="#7DD3FC" fillOpacity="0.55" />
          </g>

          {/* Foreground overlapping argument bubble burying the receipt */}
          <g transform="translate(22, 68) rotate(-2 58 20)">
            <rect x="0" y="0" width="116" height="40" rx="11" fill="#12366D" fillOpacity="0.95" stroke="#38BDF8" strokeOpacity="0.58" />
            <rect x="12" y="12" width="76" height="4.5" rx="2.25" fill="#F8FAFC" fillOpacity="0.88" />
            <rect x="12" y="22" width="90" height="4" rx="2" fill="#BAE6FD" fillOpacity="0.55" />
          </g>

          {/* Second right-side overlapping reply */}
          <g transform="translate(132, 74) rotate(3 44 18)">
            <rect x="0" y="0" width="88" height="36" rx="10" fill="#092147" fillOpacity="0.94" stroke="#38BDF8" strokeOpacity="0.4" />
            <rect x="12" y="12" width="52" height="4" rx="2" fill="#CBD5E1" fillOpacity="0.7" />
            <rect x="12" y="21" width="64" height="4" rx="2" fill="#64748B" fillOpacity="0.6" />
          </g>

          {/* Alert badge highlighting buried evidence */}
          <g transform="translate(148, 20)">
            <circle cx="14" cy="14" r="14" fill="#F59E0B" fillOpacity="0.22" stroke="#FBBF24" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="10" fill="#D97706" />
            <path d="M14 9v6" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="14" cy="19" r="1.3" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'clock':
      // Card 02: Tall chat scroll indicator paired with a magnifying glass and a circular repeat-question arrow
      return (
        <svg viewBox="0 0 240 132" className="w-full h-full max-h-[144px]" aria-hidden="true">
          {/* Tall scrollable chat history panel */}
          <rect x="20" y="10" width="108" height="112" rx="10" fill="#071B3B" stroke="#38BDF8" strokeOpacity="0.38" />

          {/* Stacked dense message rows */}
          <rect x="30" y="20" width="56" height="9" rx="4.5" fill="#103266" fillOpacity="0.65" />
          <rect x="44" y="34" width="60" height="9" rx="4.5" fill="#1D6BFF" fillOpacity="0.35" />
          <rect x="30" y="48" width="64" height="9" rx="4.5" fill="#103266" fillOpacity="0.85" />
          <rect x="38" y="62" width="66" height="11" rx="5" fill="#16468C" stroke="#7DD3FC" strokeOpacity="0.55" />
          <rect x="30" y="78" width="52" height="9" rx="4.5" fill="#103266" fillOpacity="0.7" />
          <rect x="42" y="92" width="62" height="9" rx="4.5" fill="#1D6BFF" fillOpacity="0.3" />
          <rect x="30" y="106" width="48" height="7" rx="3.5" fill="#103266" fillOpacity="0.5" />

          {/* Tall vertical scroll track + thumb + arrows */}
          <path d="M118 20l2.5-3 2.5 3" fill="none" stroke="#7DD3FC" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="118.5" y="25" width="4" height="82" rx="2" fill="#0B2854" />
          <rect x="118.5" y="50" width="4" height="28" rx="2" fill="#38BDF8" />
          <path d="M118 112l2.5 3 2.5-3" fill="none" stroke="#7DD3FC" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Magnifying glass inspecting the buried message row */}
          <g transform="translate(88, 52)">
            <circle cx="20" cy="20" r="17" fill="#092754" fillOpacity="0.82" stroke="#7DD3FC" strokeWidth="2.2" />
            <circle cx="20" cy="20" r="12" fill="none" stroke="#38BDF8" strokeOpacity="0.35" strokeWidth="1" />
            <path d="M14 18h12M14 23h8" stroke="#E0F2FE" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="33" y1="33" x2="45" y2="45" stroke="#7DD3FC" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Circular repeat-question arrow (repetitive intake) */}
          <g transform="translate(154, 24)">
            <circle cx="30" cy="30" r="28" fill="#071C3E" fillOpacity="0.9" stroke="#38BDF8" strokeOpacity="0.25" />
            {/* Dual circular repeat arcs */}
            <path
              d="M15 26 A16 16 0 0 1 43 19"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M44 13 L45 21 L37 20" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M45 34 A16 16 0 0 1 17 41"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M16 47 L15 39 L23 40" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Question mark inside repeat loop */}
            <path
              d="M26.5 25.5a3.7 3.7 0 0 1 7.2 1.2c0 2.3-3.5 3.1-3.5 5.3"
              fill="none"
              stroke="#F8FAFC"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="30.2" cy="36.5" r="1.4" fill="#F8FAFC" />
          </g>

          {/* Small repeat-intake bar beneath loop */}
          <rect x="152" y="92" width="64" height="16" rx="6" fill="#0B254E" stroke="#38BDF8" strokeOpacity="0.3" />
          <rect x="160" y="98" width="48" height="4" rx="2" fill="#BAE6FD" fillOpacity="0.65" />
        </svg>
      );

    case 'lock':
    default:
      // Card 03: Split balance/shield graphic showing a visible status checkmark on one side and a masked/protected wallet card on the other
      return (
        <svg viewBox="0 0 240 132" className="w-full h-full max-h-[144px]" aria-hidden="true">
          {/* Left Panel: Visible status card with checkmark */}
          <rect x="14" y="24" width="92" height="84" rx="10" fill="#072148" stroke="#34D399" strokeOpacity="0.55" />
          <circle cx="60" cy="54" r="16" fill="#10B981" fillOpacity="0.2" stroke="#34D399" strokeWidth="1.8" />
          <path d="M52.5 54.5l5 5 10-10" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="28" y="80" width="64" height="5" rx="2.5" fill="#E2E8F0" fillOpacity="0.85" />
          <rect x="36" y="90" width="48" height="4" rx="2" fill="#6EE7B7" fillOpacity="0.7" />

          {/* Right Panel: Masked / protected wallet card */}
          <rect x="134" y="24" width="92" height="84" rx="10" fill="#0A1B3A" stroke="#FBBF24" strokeOpacity="0.52" />
          {/* Wallet card silhouette inside */}
          <rect x="144" y="38" width="72" height="42" rx="6" fill="#132952" stroke="#7DD3FC" strokeOpacity="0.32" />
          <rect x="152" y="47" width="16" height="11" rx="2.5" fill="#FBBF24" fillOpacity="0.75" />
          {/* Masked dots representing hidden wallet/personal details */}
          <circle cx="155" cy="68" r="2.2" fill="#94A3B8" />
          <circle cx="163" cy="68" r="2.2" fill="#94A3B8" />
          <circle cx="171" cy="68" r="2.2" fill="#94A3B8" />
          <circle cx="179" cy="68" r="2.2" fill="#94A3B8" />
          <circle cx="191" cy="68" r="2.2" fill="#FDE68A" />
          <circle cx="199" cy="68" r="2.2" fill="#FDE68A" />
          <circle cx="207" cy="68" r="2.2" fill="#FDE68A" />
          {/* Redacted bar below wallet */}
          <rect x="148" y="89" width="64" height="6" rx="3" fill="#475569" fillOpacity="0.65" />

          {/* Center vertical divider & balance shield crest */}
          <line x1="120" y1="12" x2="120" y2="120" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 3" />
          <path
            d="M120 42 L134 48 V64 C134 74 127.5 81.5 120 85 C112.5 81.5 106 74 106 64 V48 Z"
            fill="#071F45"
            stroke="#7DD3FC"
            strokeWidth="1.8"
          />
          {/* Left/Right shield split tint + lock */}
          <path
            d="M120 44.5 L120 82.5 C126.2 79.6 131.5 73 131.5 64 V49.5 Z"
            fill="#F59E0B"
            fillOpacity="0.22"
          />
          <rect x="115" y="61" width="10" height="8" rx="2" fill="#F8FAFC" />
          <path d="M117 61v-2.5a3 3 0 0 1 6 0V61" fill="none" stroke="#F8FAFC" strokeWidth="1.6" />
        </svg>
      );
  }
};

/**
 * Slide 03: Three Equal-Height Parallel Problem Cards with Custom SVG Micro-Illustrations
 */
export const BottleneckFlowDeck: React.FC<{
  steps: InfographicStep[];
  compact?: boolean;
}> = ({ steps, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-5 mt-5'
      } flex-1 min-h-0 items-stretch`}
    >
      {steps.slice(0, 3).map((step) => (
        <div key={step.id} className="flex items-stretch min-h-0">
          <div
            className={`flex-1 flex flex-col justify-between rounded-2xl border border-sky-200/20 bg-[#031026]/82 backdrop-blur-xs min-h-0 ${
              compact ? 'p-2' : 'p-5 lg:p-6'
            }`}
          >
            <div
              className={
                compact
                  ? 'flex items-center justify-between gap-2 shrink-0'
                  : 'relative flex-1 min-h-[144px] rounded-xl border border-sky-200/12 bg-[#04142E]/70 px-3 pt-4 pb-2 flex items-center justify-center overflow-hidden'
              }
            >
              {compact ? (
                <>
                  <StepIcon icon={step.icon} className="h-3.5 w-3.5 text-sky-300" />
                  <span className="font-mono font-bold tabular-nums text-sky-300 text-[8px]">
                    {step.stepNumber}
                  </span>
                </>
              ) : (
                <>
                  <span className="absolute right-3 top-2.5 font-mono text-xs font-bold tabular-nums text-sky-300/85">
                    {step.stepNumber}
                  </span>
                  <BottleneckIllustration icon={step.icon} />
                </>
              )}
            </div>

            <div className={compact ? 'mt-1.5' : 'mt-4 shrink-0 min-h-[134px] flex flex-col justify-start'}>
              <h3
                className={`font-display font-extrabold text-white ${
                  compact ? 'text-[9.5px] leading-tight truncate' : 'text-xl leading-tight'
                }`}
              >
                {step.title}
              </h3>
              {!compact && (
                <p className="mt-2.5 text-sm leading-relaxed font-medium text-sky-100/88">
                  {step.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ShieldLockGlyph: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.5L4.5 5.8v5.7c0 5.1 3.2 9.4 7.5 10.9 4.3-1.5 7.5-5.8 7.5-10.9V5.8L12 2.5z" />
    <rect x="9.2" y="11" width="5.6" height="4.6" rx="1.1" />
    <path d="M10.3 11V9.5a1.7 1.7 0 0 1 3.4 0V11" />
  </svg>
);

const ConcentricGlowBadge: React.FC<{
  variant: 'blue' | 'amber';
  children: React.ReactNode;
}> = ({ variant, children }) => {
  const outerClass =
    variant === 'amber'
      ? 'border-amber-300/30 bg-gradient-to-b from-amber-400/20 to-[#161006]/90 shadow-[0_0_24px_rgba(251,191,36,0.22)]'
      : 'border-sky-300/30 bg-gradient-to-b from-sky-400/20 to-[#04142E]/90 shadow-[0_0_24px_rgba(56,189,248,0.24)]';
  const middleClass =
    variant === 'amber'
      ? 'border-amber-200/20 bg-[#221807]/85'
      : 'border-sky-200/20 bg-[#061C42]/85';
  const innerClass =
    variant === 'amber'
      ? 'border-amber-100/45 bg-gradient-to-br from-amber-300/35 via-amber-500/28 to-amber-950/90 text-amber-100 shadow-[0_0_14px_rgba(251,191,36,0.32)]'
      : 'border-sky-100/45 bg-gradient-to-br from-[#5BB4FF]/38 via-[#1D6BFF]/32 to-[#071D46]/90 text-sky-100 shadow-[0_0_14px_rgba(56,189,248,0.34)]';

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-full border ${outerClass}`}
    >
      <span
        className={`inline-flex h-9.5 w-9.5 items-center justify-center rounded-full border ${middleClass}`}
      >
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${innerClass}`}
        >
          {children}
        </span>
      </span>
    </div>
  );
};

/**
 * Slide 04: Visual Balance Scale Split (What Both Traders See vs. What Stays Strictly Private)
 */
export const PrivacyBalanceDeck: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  const left = cards[0];
  const right = cards[1];
  if (!left || !right) return null;

  const renderCard = (card: BentoCardItem, side: 'left' | 'right') => {
    const isAmber = side === 'right' || card.accent === 'amber';
    const items = card.items ?? [];

    return (
      <div
        className={`flex flex-col rounded-2xl border backdrop-blur-xs min-h-0 ${
          isAmber
            ? 'border-amber-400/35 bg-[#111423]/88'
            : 'border-sky-300/25 bg-[#031026]/86'
        } ${compact ? 'justify-between p-2' : 'justify-start p-5 lg:p-6'}`}
      >
        {/* Top Row: Concentric Glowing Icon Badge (left) + Subtle Tag (right) */}
        {compact ? (
          <div className="flex items-center justify-between gap-1 shrink-0">
            {isAmber ? (
              <ShieldLockGlyph className="h-3 w-3 text-amber-300" />
            ) : (
              <Eye className="h-3 w-3 text-sky-300" aria-hidden="true" />
            )}
            {card.eyebrow && (
              <span
                className={`font-mono font-bold tabular-nums text-[7px] ${
                  isAmber ? 'text-amber-300/85' : 'text-sky-300/85'
                }`}
              >
                {card.eyebrow}
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-start justify-between gap-3 shrink-0">
            <ConcentricGlowBadge variant={isAmber ? 'amber' : 'blue'}>
              {isAmber ? (
                <ShieldLockGlyph className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2.1} aria-hidden="true" />
              )}
            </ConcentricGlowBadge>
            {card.eyebrow && (
              <span
                className={`font-mono text-[11px] font-bold tracking-wider pt-0.5 ${
                  isAmber ? 'text-amber-300/85' : 'text-sky-300/85'
                }`}
              >
                {card.eyebrow}
              </span>
            )}
          </div>
        )}

        {/* Card Title + 3 Scannable Rows */}
        <div className={compact ? 'mt-1.5' : 'mt-5 flex-1 flex flex-col justify-start min-h-0'}>
          <h3
            className={`font-display font-extrabold text-white ${
              compact ? 'text-[9px] leading-tight line-clamp-2' : 'text-xl leading-snug'
            }`}
          >
            {card.headline}
          </h3>

          {!compact && items.length > 0 && (
            <ul className="mt-4 flex-1 flex flex-col justify-center gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${
                    isAmber
                      ? 'border-amber-300/15 bg-[#1B150A]/55'
                      : 'border-sky-200/14 bg-[#051836]/65'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isAmber
                        ? 'border-amber-400/35 bg-amber-400/12 text-amber-300'
                        : 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300'
                    }`}
                  >
                    {isAmber ? (
                      <Lock className="h-3 w-3" strokeWidth={2.2} />
                    ) : (
                      <Check className="h-3 w-3" strokeWidth={2.6} />
                    )}
                  </span>
                  <p className="text-[13.5px] leading-snug text-sky-100/85">
                    <span className="font-semibold text-white">{item.leadIn}</span>
                    <span className="mx-1 text-slate-400" aria-hidden="true">
                      —
                    </span>
                    <span className={isAmber ? 'text-amber-100/80' : 'text-sky-100/82'}>
                      {item.text}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}

          {!compact && items.length === 0 && card.caption && (
            <p className="mt-2 text-sm font-medium text-sky-100/85">{card.caption}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] flex-1 min-h-0 items-stretch ${
        compact ? 'gap-1 mt-1.5' : 'gap-4 mt-5'
      }`}
    >
      {renderCard(left, 'left')}

      {/* Minimal Center Divider */}
      <div className="flex md:flex-col items-center justify-center gap-2 py-0.5">
        {compact ? (
          <Scale className="h-3 w-3 text-slate-300/80" aria-hidden="true" />
        ) : (
          <>
            <div className="hidden md:block w-px flex-1 bg-gradient-to-b from-transparent via-sky-200/25 to-sky-200/20" />
            <div
              aria-hidden="true"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-200/20 bg-[#051531]/85 text-slate-300"
            >
              <Scale className="h-4 w-4" strokeWidth={1.85} />
            </div>
            <div className="hidden md:block w-px flex-1 bg-gradient-to-t from-transparent via-sky-200/25 to-sky-200/20" />
          </>
        )}
      </div>

      {renderCard(right, 'right')}
    </div>
  );
};

const ResearchPillarSvg: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  if (id === 's6-1' || index === 0) {
    // Chat bubble stream feeding into a bar-chart magnifier
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
        {/* Chat bubble stream */}
        <rect x="6" y="10" width="16" height="7" rx="3.5" fill="#1D6BFF" fillOpacity="0.4" stroke="#7DD3FC" strokeWidth="1.4" />
        <line x1="9.5" y1="13.5" x2="18.5" y2="13.5" stroke="#E0F2FE" strokeWidth="1.4" strokeLinecap="round" />
        <rect x="6" y="21" width="13" height="6.5" rx="3.25" fill="#0B2E63" stroke="#38BDF8" strokeWidth="1.3" />
        <line x1="9" y1="24.2" x2="15.5" y2="24.2" stroke="#BAE6FD" strokeWidth="1.3" strokeLinecap="round" />
        {/* Dotted feed line into magnifier */}
        <path d="M19 17.5 C 22 17.5, 22 23, 24 23" stroke="#38BDF8" strokeOpacity="0.7" strokeWidth="1.3" strokeDasharray="2 2" />
        {/* Magnifier lens framing bar chart */}
        <circle cx="30" cy="24" r="11" fill="#061D42" stroke="#7DD3FC" strokeWidth="1.8" />
        <rect x="24" y="25" width="3" height="5.5" rx="1" fill="#38BDF8" />
        <rect x="28.5" y="21.5" width="3" height="9" rx="1" fill="#7DD3FC" />
        <rect x="33" y="18.5" width="3" height="12" rx="1" fill="#FBBF24" />
        <line x1="38" y1="32" x2="43" y2="37" stroke="#7DD3FC" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 's6-2' || index === 1) {
    // Split dashboard screen with live eye and cursor path
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
        {/* Split dashboard screen */}
        <rect x="7" y="9" width="32" height="23" rx="4" fill="#072148" stroke="#7DD3FC" strokeWidth="1.6" />
        <line x1="22" y1="9" x2="22" y2="32" stroke="#38BDF8" strokeOpacity="0.5" strokeWidth="1.3" />
        {/* Left chat rows */}
        <rect x="10.5" y="13" width="8" height="3.5" rx="1.75" fill="#38BDF8" fillOpacity="0.65" />
        <rect x="10.5" y="19" width="8" height="3.5" rx="1.75" fill="#1D6BFF" fillOpacity="0.7" />
        <rect x="10.5" y="25" width="6" height="3" rx="1.5" fill="#7DD3FC" fillOpacity="0.45" />
        {/* Right panel + cursor path */}
        <rect x="25.5" y="13" width="10" height="7" rx="2" fill="#0B2E63" stroke="#38BDF8" strokeOpacity="0.55" />
        <path d="M16 26 Q 23 18 30 22" stroke="#FBBF24" strokeWidth="1.4" strokeDasharray="2 2" strokeLinecap="round" />
        <polygon points="31,20 35,23 32,26" fill="#FBBF24" />
        {/* Live Eye badge */}
        <circle cx="33" cy="34" r="9.5" fill="#051736" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M26.5 34 C 28.5 30.2, 37.5 30.2, 39.5 34 C 37.5 37.8, 28.5 37.8, 26.5 34 Z" stroke="#E0F2FE" strokeWidth="1.4" fill="#0B2E63" />
        <circle cx="33" cy="34" r="2.2" fill="#7DD3FC" />
      </svg>
    );
  }

  if (id === 's6-3' || index === 2) {
    // Two P2P exchange arrows paired with countdown timer and verified receipt
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
        {/* Two P2P exchange arrows */}
        <path d="M8 14 H21 M18 11 L21.5 14 L18 17" stroke="#7DD3FC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 21 H9 M12 18 L8.5 21 L12 24" stroke="#38BDF8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        {/* Countdown timer */}
        <circle cx="15" cy="34" r="7.5" fill="#072148" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M15 26.5 A 7.5 7.5 0 0 1 22.5 34" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 30.5 V34 L17.5 35.5" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Verified receipt card */}
        <rect x="26" y="10" width="15" height="23" rx="3" fill="#072148" stroke="#7DD3FC" strokeWidth="1.5" />
        <line x1="29.5" y1="15.5" x2="37.5" y2="15.5" stroke="#BAE6FD" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="29.5" y1="20" x2="35.5" y2="20" stroke="#7DD3FC" strokeOpacity="0.65" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="36" cy="32" r="6.5" fill="#064E3B" stroke="#34D399" strokeWidth="1.5" />
        <path d="M33.2 32 L35.2 34 L39 30" stroke="#6EE7B7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Interactive wireframe card with stopwatch and target checkmark (Teal)
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
      {/* Interactive wireframe card */}
      <rect x="7" y="12" width="25" height="25" rx="4" fill="#06292E" stroke="#5EEAD4" strokeWidth="1.6" />
      <line x1="7" y1="18.5" x2="32" y2="18.5" stroke="#2DD4BF" strokeOpacity="0.45" strokeWidth="1.3" />
      <rect x="10.5" y="22" width="14" height="4.5" rx="1.5" fill="#14B8A6" fillOpacity="0.35" stroke="#5EEAD4" strokeWidth="1.1" />
      <rect x="10.5" y="29" width="10" height="4" rx="1.5" fill="#2DD4BF" fillOpacity="0.25" />
      {/* Stopwatch top-right */}
      <circle cx="34" cy="15.5" r="7" fill="#052024" stroke="#5EEAD4" strokeWidth="1.5" />
      <line x1="34" y1="6.5" x2="34" y2="8.5" stroke="#5EEAD4" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M34 12.5 V15.5 L36.5 17" stroke="#F0FDFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Target checkmark bottom-right */}
      <circle cx="34" cy="33" r="8" fill="#064E3B" stroke="#34D399" strokeWidth="1.6" />
      <path d="M30.5 33 L33 35.5 L37.8 30.5" stroke="#A7F3D0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * Slide 06: 2x2 Grid of 4 Core Research Pillars Tailored to Quifi's Chatbot
 */
export const MethodBadgeGrid: React.FC<{
  steps: InfographicStep[];
  compact?: boolean;
}> = ({ steps, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-4 lg:gap-5 mt-5'
      } flex-1 min-h-0 content-stretch`}
    >
      {steps.slice(0, 4).map((step, idx) => {
        const isTeal = idx === 3;
        return (
          <div
            key={step.id}
            className={`flex flex-col justify-center rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'justify-between p-2' : 'p-5 lg:p-6'
            }`}
          >
            {compact ? (
              <>
                <div className="flex items-center justify-between gap-1 shrink-0">
                  <StepIcon
                    icon={step.icon}
                    className={`h-3 w-3 ${isTeal ? 'text-teal-300' : 'text-sky-300'}`}
                  />
                  <span
                    className={`font-mono font-bold tabular-nums text-[7px] ${
                      isTeal ? 'text-teal-300' : 'text-sky-300'
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                </div>
                <div className="mt-1">
                  <h3 className="font-display font-bold text-white text-[8.5px] leading-tight line-clamp-2">
                    {step.title}
                  </h3>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-5 lg:gap-6 min-h-0">
                {/* Left: 80px 3-Ring Concentric Glowing Circular SVG Icon Badge */}
                <div
                  aria-hidden="true"
                  className={`relative inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border ${
                    isTeal
                      ? 'border-teal-300/30 bg-gradient-to-b from-teal-400/20 to-[#041E24]/92 shadow-[0_0_28px_rgba(45,212,191,0.24)]'
                      : 'border-sky-300/30 bg-gradient-to-b from-sky-400/20 to-[#04142E]/92 shadow-[0_0_28px_rgba(56,189,248,0.24)]'
                  }`}
                >
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-full border ${
                      isTeal
                        ? 'border-teal-200/22 bg-[#052429]/88'
                        : 'border-sky-200/22 bg-[#061C42]/88'
                    }`}
                  >
                    <span
                      className={`inline-flex h-12.5 w-12.5 items-center justify-center rounded-full border ${
                        isTeal
                          ? 'border-teal-100/35 bg-gradient-to-br from-teal-300/24 via-teal-500/18 to-[#041E24]/92 shadow-[0_0_16px_rgba(45,212,191,0.28)]'
                          : 'border-sky-100/35 bg-gradient-to-br from-[#5BB4FF]/26 via-[#1D6BFF]/22 to-[#071D46]/92 shadow-[0_0_16px_rgba(56,189,248,0.28)]'
                      }`}
                    >
                      <ResearchPillarSvg id={step.id} index={idx} />
                    </span>
                  </span>
                </div>

                {/* Right: Title + Top-Right Monospace Timing Badge, and Tight Plain-English Copy */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[18px] lg:text-[19px] font-extrabold text-white leading-snug">
                      {step.title}
                    </h3>
                    <span
                      className={`mt-0.5 shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${
                        isTeal
                          ? 'border-teal-300/25 bg-teal-950/45 text-teal-300'
                          : 'border-sky-300/22 bg-[#071D42]/90 text-sky-300'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed font-medium text-sky-100/85">
                    {step.caption}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Slides 07, 11, 16, 20: Minimalist High-Impact Chapter Divider Hero
 */
export const ChapterDividerHero: React.FC<{
  title: string;
  storyLead: string;
  gateLabel?: string;
  compact?: boolean;
}> = ({ title, storyLead, gateLabel, compact = false }) => {
  return (
    <div className="flex flex-col justify-center items-start h-full py-2">
      {gateLabel && (
        <span
          className={`inline-flex items-center rounded-full border font-mono font-bold uppercase tracking-widest ${
            gateLabel.includes('Week 4')
              ? 'border-amber-300/50 bg-amber-400/15 text-amber-200'
              : 'border-sky-300/40 bg-sky-400/15 text-sky-200'
          } ${compact ? 'px-1.5 py-0.5 text-[7px] mb-1' : 'px-3.5 py-1 text-xs mb-5'}`}
        >
          {gateLabel}
        </span>
      )}

      <h2
        className={`font-display font-extrabold tracking-tight text-white text-balance max-w-4xl ${
          compact ? 'text-xs leading-tight' : 'text-4xl lg:text-[48px] leading-[1.06]'
        }`}
      >
        {title}
      </h2>

      {!compact && (
        <div className="mt-6 h-px w-28 bg-gradient-to-r from-sky-300 to-transparent" />
      )}

      {storyLead && (
        <p
          className={`font-sans font-medium text-sky-100/85 max-w-2xl ${
            compact ? 'mt-1 text-[8.5px] line-clamp-2' : 'mt-5 text-lg lg:text-[20px] leading-relaxed'
          }`}
        >
          {storyLead}
        </p>
      )}
    </div>
  );
};

const Week1DiscoverySvg: React.FC<{ id: string; index: number }> = ({ id, index }) => {
  if (id === 's8-1' || index === 0) {
    // Figma token grid + chatbot bubble
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
        {/* Figma 2x2 token grid card */}
        <rect x="6" y="8" width="22" height="22" rx="4" fill="#061D42" stroke="#7DD3FC" strokeWidth="1.5" />
        <rect x="9.5" y="11.5" width="6.5" height="6.5" rx="1.8" fill="#38BDF8" />
        <rect x="18" y="11.5" width="6.5" height="6.5" rx="1.8" fill="#1D6BFF" />
        <rect x="9.5" y="20" width="6.5" height="6.5" rx="1.8" fill="#7DD3FC" fillOpacity="0.65" />
        <circle cx="21.25" cy="23.25" r="3.25" fill="#0B2E63" stroke="#7DD3FC" strokeWidth="1.3" />
        {/* Chatbot speech bubble overlapping bottom-right */}
        <path
          d="M21 24.5 C21 22.5, 22.6 21, 24.5 21 H38.5 C40.4 21, 42 22.5, 42 24.5 V34 C42 36, 40.4 37.5, 38.5 37.5 H29 L24 41.5 V37.5 H24.5 C22.6 37.5, 21 36, 21 34 Z"
          fill="#072654"
          stroke="#7DD3FC"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <line x1="25.5" y1="27" x2="37.5" y2="27" stroke="#E0F2FE" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="25.5" y1="31.5" x2="33.5" y2="31.5" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 's8-2' || index === 1) {
    // Chat log lines + bar-chart magnifier
    return (
      <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
        {/* Chat log panel */}
        <rect x="6" y="9" width="21" height="27" rx="3.5" fill="#061D42" stroke="#38BDF8" strokeOpacity="0.65" strokeWidth="1.4" />
        <circle cx="10.5" cy="14.5" r="1.5" fill="#7DD3FC" />
        <line x1="14" y1="14.5" x2="23" y2="14.5" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10.5" cy="20.5" r="1.5" fill="#38BDF8" />
        <line x1="14" y1="20.5" x2="22" y2="20.5" stroke="#7DD3FC" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10.5" cy="26.5" r="1.5" fill="#FBBF24" />
        <line x1="14" y1="26.5" x2="21" y2="26.5" stroke="#BAE6FD" strokeOpacity="0.65" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9.5" y1="31.5" x2="18.5" y2="31.5" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
        {/* Bar-chart magnifier */}
        <circle cx="30" cy="24.5" r="11" fill="#072148" stroke="#7DD3FC" strokeWidth="1.8" />
        <rect x="24" y="25.5" width="3" height="5.5" rx="1" fill="#38BDF8" />
        <rect x="28.5" y="22" width="3" height="9" rx="1" fill="#7DD3FC" />
        <rect x="33" y="19" width="3" height="12" rx="1" fill="#FBBF24" />
        <line x1="38" y1="32.5" x2="43" y2="37.5" stroke="#7DD3FC" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    );
  }

  // Reviewer screen + eye & privacy shield
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden="true">
      {/* Reviewer split screen */}
      <rect x="6" y="8.5" width="31" height="21" rx="3.5" fill="#072148" stroke="#7DD3FC" strokeWidth="1.5" />
      <line x1="6" y1="14" x2="37" y2="14" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.2" />
      <line x1="20" y1="14" x2="20" y2="29.5" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.2" />
      <rect x="9.5" y="17.5" width="7.5" height="3" rx="1.5" fill="#38BDF8" fillOpacity="0.7" />
      <rect x="9.5" y="22.5" width="6" height="3" rx="1.5" fill="#1D6BFF" fillOpacity="0.75" />
      <rect x="23" y="17.5" width="10.5" height="6" rx="1.5" fill="#0B2E63" stroke="#7DD3FC" strokeOpacity="0.5" />
      {/* Live Eye bottom-left */}
      <circle cx="17" cy="34" r="7.5" fill="#051736" stroke="#38BDF8" strokeWidth="1.4" />
      <path
        d="M11.8 34 C13.4 31, 20.6 31, 22.2 34 C20.6 37, 13.4 37, 11.8 34 Z"
        fill="#0B2E63"
        stroke="#E0F2FE"
        strokeWidth="1.3"
      />
      <circle cx="17" cy="34" r="1.8" fill="#7DD3FC" />
      {/* Privacy shield bottom-right */}
      <path
        d="M34.5 24 L42 27 V32.2 C42 36.8, 38.8 40.3, 34.5 41.8 C30.2 40.3, 27 36.8, 27 32.2 V27 L34.5 24 Z"
        fill="#061D42"
        stroke="#7DD3FC"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="32.1" y="32.2" width="4.8" height="3.8" rx="1" stroke="#E0F2FE" strokeWidth="1.3" />
      <path d="M33.1 32.2 V30.8 C33.1 30, 35.9 30, 35.9 30.8 V32.2" stroke="#E0F2FE" strokeWidth="1.3" />
    </svg>
  );
};

/**
 * Slides 08 & 24: Clean 3-Step Horizontal Flow (Arrow or Chevron Stages)
 */
const RolloutStageBadge: React.FC<{ index: number }> = ({ index }) => {
  if (index === 0) {
    // Stage 01: Blue Concentric Users Icon
    return (
      <div
        aria-hidden="true"
        className="relative inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-sky-300/30 bg-gradient-to-b from-sky-400/20 to-[#04142E]/92 shadow-[0_0_28px_rgba(56,189,248,0.24)]"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-sky-200/22 bg-[#061C42]/88">
          <span className="inline-flex h-12.5 w-12.5 items-center justify-center rounded-full border border-sky-100/35 bg-gradient-to-br from-[#5BB4FF]/26 via-[#1D6BFF]/22 to-[#071D46]/92 shadow-[0_0_16px_rgba(56,189,248,0.28)]">
            <Users className="h-6 w-6 text-sky-100" strokeWidth={1.9} />
          </span>
        </span>
      </div>
    );
  }
  if (index === 1) {
    // Stage 02: Amber Concentric Shield Icon
    return (
      <div
        aria-hidden="true"
        className="relative inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-amber-300/32 bg-gradient-to-b from-amber-400/20 to-[#161006]/92 shadow-[0_0_28px_rgba(251,191,36,0.22)]"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/22 bg-[#221807]/88">
          <span className="inline-flex h-12.5 w-12.5 items-center justify-center rounded-full border border-amber-100/35 bg-gradient-to-br from-amber-300/24 via-amber-500/18 to-[#161006]/92 shadow-[0_0_16px_rgba(251,191,36,0.26)]">
            <ShieldCheck className="h-6 w-6 text-amber-100" strokeWidth={1.9} />
          </span>
        </span>
      </div>
    );
  }
  // Stage 03: Teal Concentric Chat-Check Icon
  return (
    <div
      aria-hidden="true"
      className="relative inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-teal-300/30 bg-gradient-to-b from-teal-400/20 to-[#041E24]/92 shadow-[0_0_28px_rgba(45,212,191,0.22)]"
    >
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-teal-200/22 bg-[#052429]/88">
        <span className="inline-flex h-12.5 w-12.5 items-center justify-center rounded-full border border-teal-100/35 bg-gradient-to-br from-teal-300/24 via-teal-500/18 to-[#041E24]/92 shadow-[0_0_16px_rgba(45,212,191,0.26)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8A2.5 2.5 0 0 1 17.5 17H9l-4.5 3.5V6.5Z"
              stroke="#CCFBF1"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="m8.8 10.7 2.2 2.2 4.3-4.3" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </div>
  );
};

export const HorizontalStepFlow: React.FC<{
  steps: InfographicStep[];
  variant?: 'arrow' | 'chevron';
  compact?: boolean;
}> = ({ steps, variant = 'arrow', compact = false }) => {
  const isWeek1Discovery = variant === 'arrow';
  const isRolloutChevron = variant === 'chevron';

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-5 mt-5'
      } flex-1 min-h-0 items-stretch`}
    >
      {steps.slice(0, 3).map((step, idx) => (
        <div key={step.id} className="relative flex items-stretch min-h-0">
          <div
            className={`flex-1 flex flex-col justify-between rounded-2xl border backdrop-blur-xs min-h-0 border-sky-200/18 bg-[#031026]/86 ${
              compact ? 'p-2' : 'p-5 lg:p-6'
            }`}
          >
            <div className="flex items-start justify-between gap-3 shrink-0">
              {compact ? (
                <StepIcon icon={step.icon} className="h-3.5 w-3.5 text-sky-300" />
              ) : isWeek1Discovery ? (
                <div
                  aria-hidden="true"
                  className="relative inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-sky-300/30 bg-gradient-to-b from-sky-400/20 to-[#04142E]/92 shadow-[0_0_28px_rgba(56,189,248,0.24)]"
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-sky-200/22 bg-[#061C42]/88">
                    <span className="inline-flex h-12.5 w-12.5 items-center justify-center rounded-full border border-sky-100/35 bg-gradient-to-br from-[#5BB4FF]/26 via-[#1D6BFF]/22 to-[#071D46]/92 shadow-[0_0_16px_rgba(56,189,248,0.28)]">
                      <Week1DiscoverySvg id={step.id} index={idx} />
                    </span>
                  </span>
                </div>
              ) : isRolloutChevron ? (
                <RolloutStageBadge index={idx} />
              ) : (
                <MedallionIcon
                  icon={step.icon}
                  size="lg"
                  accent="blue"
                  showBadge={false}
                />
              )}
              <span
                className={`shrink-0 rounded-md border border-sky-300/22 bg-[#071D42]/90 font-mono font-bold tracking-wider uppercase text-sky-300 tabular-nums ${
                  compact ? 'px-1 py-0 text-[7px]' : 'px-2.5 py-0.5 text-[10.5px]'
                }`}
              >
                {step.stepNumber}
              </span>
            </div>

            <div className={compact ? 'mt-1.5' : 'mt-auto pt-5'}>
              <h3
                className={`font-display font-extrabold text-white ${
                  compact
                    ? 'text-[9.5px] leading-tight truncate'
                    : 'text-[18px] lg:text-[19px] leading-snug'
                }`}
              >
                {step.title}
              </h3>
              {!compact && (
                <p className="mt-2.5 font-medium text-sky-100/86 text-[13.5px] leading-relaxed">
                  {step.caption}
                </p>
              )}
            </div>
          </div>

          {idx < 2 && !compact && (
            <div
              aria-hidden="true"
              className="hidden md:flex items-center justify-center pl-2 -mr-3 text-sky-300/65"
            >
              {variant === 'chevron' ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ConcentricStoryBadge: React.FC<{
  accent: 'amber' | 'blue' | 'teal';
  children: React.ReactNode;
}> = ({ accent, children }) => {
  const outerClass =
    accent === 'amber'
      ? 'border-amber-300/32 bg-gradient-to-b from-amber-400/20 to-[#161006]/92 shadow-[0_0_24px_rgba(251,191,36,0.22)]'
      : accent === 'teal'
      ? 'border-teal-300/30 bg-gradient-to-b from-teal-400/20 to-[#041E24]/92 shadow-[0_0_24px_rgba(45,212,191,0.22)]'
      : 'border-sky-300/30 bg-gradient-to-b from-sky-400/20 to-[#04142E]/92 shadow-[0_0_24px_rgba(56,189,248,0.22)]';
  const middleClass =
    accent === 'amber'
      ? 'border-amber-200/22 bg-[#221807]/88'
      : accent === 'teal'
      ? 'border-teal-200/22 bg-[#052429]/88'
      : 'border-sky-200/22 bg-[#061C42]/88';
  const innerClass =
    accent === 'amber'
      ? 'border-amber-100/35 bg-gradient-to-br from-amber-300/24 via-amber-500/18 to-[#161006]/92 shadow-[0_0_14px_rgba(251,191,36,0.26)]'
      : accent === 'teal'
      ? 'border-teal-100/35 bg-gradient-to-br from-teal-300/24 via-teal-500/18 to-[#041E24]/92 shadow-[0_0_14px_rgba(45,212,191,0.26)]'
      : 'border-sky-100/35 bg-gradient-to-br from-[#5BB4FF]/26 via-[#1D6BFF]/22 to-[#071D46]/92 shadow-[0_0_14px_rgba(56,189,248,0.26)]';

  return (
    <div
      aria-hidden="true"
      className={`relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border ${outerClass}`}
    >
      <span
        className={`inline-flex h-12.5 w-12.5 items-center justify-center rounded-full border ${middleClass}`}
      >
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${innerClass}`}
        >
          {children}
        </span>
      </span>
    </div>
  );
};

const PainComparisonSvg: React.FC<{ isAmber: boolean }> = ({ isAmber }) => {
  if (isAmber) {
    // User silhouette with an alert pulse
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden="true">
        {/* Alert pulse arcs */}
        <path
          d="M27.5 8.5 A 9 9 0 0 1 32.5 16.5"
          stroke="#FBBF24"
          strokeOpacity="0.6"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M30 5.8 A 12.5 12.5 0 0 1 35.8 17.5"
          stroke="#F59E0B"
          strokeOpacity="0.35"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* User silhouette */}
        <circle cx="17.5" cy="14" r="5" fill="#2A1C07" stroke="#FDE68A" strokeWidth="1.5" />
        <path
          d="M8.5 31.5 C 8.5 25.2, 12.5 22, 17.5 22 C 22.5 22, 26.5 25.2, 26.5 31.5"
          fill="#2A1C07"
          stroke="#FDE68A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Alert pulse orb */}
        <circle cx="29.5" cy="14" r="5" fill="#451A03" stroke="#FBBF24" strokeWidth="1.5" />
        <line x1="29.5" y1="11.6" x2="29.5" y2="14.4" stroke="#FEF3C7" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="29.5" cy="16.4" r="0.9" fill="#FEF3C7" />
      </svg>
    );
  }

  // Split browser tabs with a magnifying glass
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden="true">
      {/* Stacked browser tab frames */}
      <rect x="6" y="8" width="23" height="19" rx="3" fill="#061D42" stroke="#38BDF8" strokeOpacity="0.65" strokeWidth="1.3" />
      <path d="M6 12.5 H29" stroke="#38BDF8" strokeOpacity="0.45" strokeWidth="1.1" />
      <line x1="17.5" y1="12.5" x2="17.5" y2="27" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1.1" />
      <rect x="8.5" y="15.5" width="6.5" height="2.6" rx="1.3" fill="#38BDF8" fillOpacity="0.7" />
      <rect x="8.5" y="20" width="5.5" height="2.6" rx="1.3" fill="#1D6BFF" fillOpacity="0.75" />
      <rect x="20" y="15.5" width="6" height="5.5" rx="1.2" fill="#0B2E63" stroke="#7DD3FC" strokeOpacity="0.55" />
      {/* Magnifying glass */}
      <circle cx="26.5" cy="24.5" r="7.5" fill="#07224A" fillOpacity="0.92" stroke="#7DD3FC" strokeWidth="1.7" />
      <line x1="23" y1="23.5" x2="30" y2="23.5" stroke="#E0F2FE" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="23" y1="26.5" x2="27.5" y2="26.5" stroke="#7DD3FC" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="31.8" y1="29.8" x2="36" y2="34" stroke="#7DD3FC" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
};

const BenchmarkPillarSvg: React.FC<{ isTeal: boolean }> = ({ isTeal }) => {
  if (!isTeal) {
    // P2P exchange arrows paired with a stopwatch
    return (
      <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden="true">
        {/* P2P exchange arrows */}
        <path d="M7 11.5 H19.5 M16.5 8.8 L19.8 11.5 L16.5 14.2" stroke="#7DD3FC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.5 18 H8 M11 15.3 L7.7 18 L11 20.7" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stopwatch */}
        <line x1="27.5" y1="9.5" x2="27.5" y2="12" stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="25" y1="9.5" x2="30" y2="9.5" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="27.5" cy="22.5" r="9.5" fill="#061D42" stroke="#7DD3FC" strokeWidth="1.6" />
        <path d="M27.5 13 A 9.5 9.5 0 0 1 37 22.5" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M27.5 17.5 V22.5 L31 24.5" stroke="#E0F2FE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Chat bubble transforming into a verified ticket card (Teal)
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden="true">
      {/* Chat bubble (left-top) */}
      <path
        d="M5.5 11.5 C5.5 9.8, 6.8 8.5, 8.5 8.5 H18.5 C20.2 8.5, 21.5 9.8, 21.5 11.5 V18.5 C21.5 20.2, 20.2 21.5, 18.5 21.5 H12 L8 24.5 V21.5 H8.5 C6.8 21.5, 5.5 20.2, 5.5 18.5 Z"
        fill="#052429"
        stroke="#5EEAD4"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="9" y1="13.5" x2="17.5" y2="13.5" stroke="#CCFBF1" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="9" y1="17" x2="14.5" y2="17" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round" />
      {/* Transform arrow */}
      <path d="M16 27.5 C 18.5 29.5, 21 29.5, 22.5 28" stroke="#2DD4BF" strokeWidth="1.4" strokeDasharray="2 2" strokeLinecap="round" />
      {/* Verified ticket card (right-bottom) */}
      <rect x="22" y="13" width="13.5" height="19" rx="3" fill="#06292E" stroke="#5EEAD4" strokeWidth="1.5" />
      <line x1="25" y1="17.5" x2="32.5" y2="17.5" stroke="#99F6E4" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="25" y1="21" x2="30.5" y2="21" stroke="#5EEAD4" strokeOpacity="0.65" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="31.5" cy="28.5" r="5.5" fill="#064E3B" stroke="#34D399" strokeWidth="1.5" />
      <path d="M29 28.5 L30.8 30.2 L34.2 26.8" stroke="#A7F3D0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * Slide 09: Side-by-Side Two-Sided Pain Comparison (Traders vs. Support & Compliance)
 */
export const PainComparisonSplit: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-6 mt-5'
      } flex-1 min-h-0 items-stretch`}
    >
      {cards.slice(0, 2).map((card) => {
        const isAmber = card.accent === 'amber';
        const items = card.items ?? [];

        return (
          <div
            key={card.id}
            className={`flex flex-col rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'justify-between p-2' : 'justify-start p-5 lg:p-6'
            }`}
          >
            {compact ? (
              <>
                <div className="flex items-center justify-between gap-1 shrink-0">
                  {isAmber ? (
                    <AlertTriangle className="h-3 w-3 text-amber-300" aria-hidden="true" />
                  ) : (
                    <Layers className="h-3 w-3 text-sky-300" aria-hidden="true" />
                  )}
                  {card.eyebrow && (
                    <span
                      className={`font-mono font-bold uppercase text-[6.5px] truncate ${
                        isAmber ? 'text-amber-300' : 'text-sky-300'
                      }`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <h3 className="font-display font-bold text-white text-[9px] leading-tight truncate">
                    {card.headline}
                  </h3>
                </div>
              </>
            ) : (
              <>
                {/* Top Row: Concentric Glowing Icon Badge (left) + Top-Right Pill */}
                <div className="flex items-start justify-between gap-3 shrink-0">
                  <ConcentricStoryBadge accent={isAmber ? 'amber' : 'blue'}>
                    <PainComparisonSvg isAmber={isAmber} />
                  </ConcentricStoryBadge>
                  {card.eyebrow && (
                    <span
                      className={`shrink-0 rounded-md border px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wider uppercase ${
                        isAmber
                          ? 'border-amber-300/25 bg-amber-950/35 text-amber-300'
                          : 'border-sky-300/22 bg-[#071D42]/90 text-sky-300'
                      }`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                </div>

                {/* Title, Italic Quote & 3 Scannable Rows */}
                <div className="mt-4 flex-1 flex flex-col justify-start min-h-0">
                  <h3 className="font-display text-xl font-extrabold text-white leading-snug">
                    {card.headline}
                  </h3>
                  {card.caption && (
                    <p
                      className={`mt-1 text-[13.5px] italic font-medium leading-snug ${
                        isAmber ? 'text-amber-200/90' : 'text-sky-200/90'
                      }`}
                    >
                      {card.caption}
                    </p>
                  )}

                  {items.length > 0 && (
                    <ul className="mt-3.5 flex-1 flex flex-col justify-center gap-2.5">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className={`flex items-start gap-3 rounded-xl border px-3.5 py-2.5 ${
                            isAmber
                              ? 'border-amber-300/14 bg-[#181308]/50'
                              : 'border-sky-200/14 bg-[#051836]/65'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isAmber
                                ? 'border-amber-400/35 bg-amber-400/12 text-amber-300'
                                : 'border-sky-400/35 bg-sky-400/12 text-sky-300'
                            }`}
                          >
                            {isAmber ? (
                              <AlertTriangle className="h-3 w-3" strokeWidth={2.2} />
                            ) : (
                              <Search className="h-3 w-3" strokeWidth={2.2} />
                            )}
                          </span>
                          <p className="text-[13px] leading-snug text-sky-100/85">
                            <span className="font-semibold text-white">{item.leadIn}:</span>{' '}
                            <span className={isAmber ? 'text-amber-100/82' : 'text-sky-100/82'}>
                              {item.text}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Slide 10: Week 2 Competitor Test Cases & Quifi Takeaways
 */
export const BenchmarkTrioCards: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-6 mt-5'
      } flex-1 min-h-0 items-stretch`}
    >
      {cards.slice(0, 2).map((card, idx) => {
        const isTeal = card.accent === 'teal' || idx === 1;
        const items = card.items ?? [];

        return (
          <div
            key={card.id}
            className={`flex flex-col rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'justify-between p-2' : 'justify-start p-5 lg:p-6'
            }`}
          >
            {compact ? (
              <>
                <div className="flex items-center justify-between gap-1 shrink-0">
                  {isTeal ? (
                    <CheckCircle2 className="h-3 w-3 text-teal-300" aria-hidden="true" />
                  ) : (
                    <Clock className="h-3 w-3 text-sky-300" aria-hidden="true" />
                  )}
                  {card.eyebrow && (
                    <span
                      className={`font-mono font-bold uppercase text-[6.5px] truncate ${
                        isTeal ? 'text-teal-300' : 'text-sky-300'
                      }`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <h3 className="font-display font-bold text-white text-[9px] leading-tight line-clamp-2">
                    {card.headline}
                  </h3>
                </div>
              </>
            ) : (
              <>
                {/* Top Row: Concentric Glowing Icon Badge (left) + Top-Right Pill */}
                <div className="flex items-start justify-between gap-3 shrink-0">
                  <ConcentricStoryBadge accent={isTeal ? 'teal' : 'blue'}>
                    <BenchmarkPillarSvg isTeal={isTeal} />
                  </ConcentricStoryBadge>
                  {card.eyebrow && (
                    <span
                      className={`shrink-0 rounded-md border px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wider uppercase ${
                        isTeal
                          ? 'border-teal-300/25 bg-teal-950/45 text-teal-300'
                          : 'border-sky-300/22 bg-[#071D42]/90 text-sky-300'
                      }`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                </div>

                {/* Title & 3 Scannable Rows */}
                <div className="mt-4 flex-1 flex flex-col justify-start min-h-0">
                  <h3 className="font-display text-xl font-extrabold text-white leading-snug">
                    {card.headline}
                  </h3>

                  {items.length > 0 && (
                    <ul className="mt-4 flex-1 flex flex-col justify-center gap-3">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${
                            isTeal
                              ? 'border-teal-300/14 bg-[#041E22]/55'
                              : 'border-sky-200/14 bg-[#051836]/65'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isTeal
                                ? 'border-teal-400/35 bg-teal-400/12 text-teal-300'
                                : 'border-sky-400/35 bg-sky-400/12 text-sky-300'
                            }`}
                          >
                            {isTeal ? (
                              <Check className="h-3 w-3" strokeWidth={2.5} />
                            ) : (
                              <Search className="h-3 w-3" strokeWidth={2.2} />
                            )}
                          </span>
                          <p className="text-[13.5px] leading-snug text-sky-100/85">
                            <span className="font-semibold text-white">{item.leadIn}:</span>{' '}
                            <span className={isTeal ? 'text-teal-50/85' : 'text-sky-100/82'}>
                              {item.text}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const AffinityClusterSvg: React.FC<{ id: string; accent: 'blue' | 'amber' | 'teal' }> = ({
  id,
  accent,
}) => {
  if (id === 's13-2' || accent === 'amber') {
    // Document with a missing/broken history line
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
        <rect
          x="8"
          y="6"
          width="20"
          height="28"
          rx="3"
          fill="#2A1C07"
          stroke="#FBBF24"
          strokeWidth="1.75"
        />
        <path d="M13 13H23" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M13 19H17M21 19H23"
          stroke="#F59E0B"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <path d="M13 25H19" stroke="#FDE68A" strokeOpacity="0.6" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="28" cy="26" r="6.5" fill="#1C1405" stroke="#FBBF24" strokeWidth="1.75" />
        <path d="M28 23V26.5" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="28" cy="29" r="0.9" fill="#FDE68A" />
      </svg>
    );
  }

  if (id === 's13-3' || accent === 'teal') {
    // Chat bubble with a stalled pause timer
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M7 11C7 8.79 8.79 7 11 7H27C29.21 7 31 8.79 31 11V21C31 23.21 29.21 25 27 25H15L9.5 29.5V25H11C8.79 25 7 23.21 7 21V11Z"
          fill="#06282D"
          stroke="#2DD4BF"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12.5 13.5H21.5" stroke="#99F6E4" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M12.5 18.5H18" stroke="#5EEAD4" strokeOpacity="0.7" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="28.5" cy="27.5" r="7" fill="#041F24" stroke="#2DD4BF" strokeWidth="1.75" />
        <path d="M26.5 24.8V30.2M30.5 24.8V30.2" stroke="#99F6E4" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Split user-routing arrows
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
      <circle cx="11" cy="20" r="4" fill="#0A2859" stroke="#7DD3FC" strokeWidth="1.75" />
      <path
        d="M15 20H20C22.5 20 23 13 27 13H32"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15 20H20C22.5 20 23 27 27 27H32"
        stroke="#7DD3FC"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="2.5 2.5"
      />
      <path
        d="M29.5 10L33 13L29.5 16"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 24L33 27L29.5 30"
        stroke="#7DD3FC"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Slide 13: 3-Cluster Visual Affinity Diagram
 */
export const AffinityClusterDiagram: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-5 mt-5'
      } flex-1 min-h-0 items-stretch`}
    >
      {cards.slice(0, 3).map((card) => {
        const accent: 'blue' | 'amber' | 'teal' =
          card.accent === 'amber'
            ? 'amber'
            : card.accent === 'teal' || card.accent === 'emerald'
            ? 'teal'
            : 'blue';
        const pillClass =
          accent === 'amber'
            ? 'border-amber-300/25 bg-amber-950/35 text-amber-300'
            : accent === 'teal'
            ? 'border-teal-300/25 bg-teal-950/35 text-teal-300'
            : 'border-sky-300/22 bg-[#071D42]/90 text-sky-300';
        const rowClass =
          accent === 'amber'
            ? 'border-amber-300/14 bg-[#181308]/50'
            : accent === 'teal'
            ? 'border-teal-300/14 bg-[#041D22]/55'
            : 'border-sky-200/14 bg-[#051836]/65';
        const iconRingClass =
          accent === 'amber'
            ? 'border-amber-400/35 bg-amber-400/12 text-amber-300'
            : accent === 'teal'
            ? 'border-teal-400/35 bg-teal-400/12 text-teal-300'
            : 'border-sky-400/35 bg-sky-400/12 text-sky-300';
        const leadInClass =
          accent === 'amber'
            ? 'text-amber-300'
            : accent === 'teal'
            ? 'text-teal-300'
            : 'text-sky-300';
        const items = card.items ?? [];

        return (
          <div
            key={card.id}
            className={`flex flex-col rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'justify-between p-2' : 'justify-start p-5 lg:p-6'
            }`}
          >
            {compact ? (
              <>
                <div className="flex items-center justify-between gap-1 shrink-0">
                  <span className={`font-mono font-bold uppercase text-[6.5px] truncate ${leadInClass}`}>
                    {card.eyebrow}
                  </span>
                </div>
                <div className="mt-1">
                  <h3 className="font-display font-bold text-white text-[9px] leading-tight truncate">
                    {card.headline}
                  </h3>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 shrink-0">
                  <ConcentricStoryBadge accent={accent}>
                    <AffinityClusterSvg id={card.id} accent={accent} />
                  </ConcentricStoryBadge>
                  {card.eyebrow && (
                    <span
                      className={`shrink-0 rounded-md border px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wider uppercase ${pillClass}`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex-1 flex flex-col justify-start min-h-0">
                  <h3 className="font-display text-[18px] lg:text-[19px] font-extrabold text-white leading-snug">
                    {card.headline}
                  </h3>

                  {items.length > 0 && (
                    <ul className="mt-4 flex-1 flex flex-col justify-start gap-3">
                      {items.map((item, idx) => (
                        <li
                          key={item.id}
                          className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${rowClass}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${iconRingClass}`}
                          >
                            {idx === 0 ? (
                              <Eye className="h-3 w-3" strokeWidth={2.2} />
                            ) : (
                              <Search className="h-3 w-3" strokeWidth={2.2} />
                            )}
                          </span>
                          <div className="min-w-0">
                            <span
                              className={`block font-mono text-[10.5px] font-bold uppercase tracking-wider ${leadInClass}`}
                            >
                              {item.leadIn}
                            </span>
                            <p className="mt-1 text-[13.5px] leading-snug text-sky-100/88">
                              {item.text}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const PersonaRoleSvg: React.FC<{ id: string; accent: 'blue' | 'amber' | 'teal' }> = ({
  id,
  accent,
}) => {
  if (id === 's14-2' || accent === 'amber') {
    // Split-screen workspace panels
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
        <rect
          x="6"
          y="8"
          width="28"
          height="24"
          rx="3.5"
          fill="#241906"
          stroke="#FBBF24"
          strokeWidth="1.75"
        />
        <path d="M20 8V32" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M10 14H16.5M10 19H15.5M10 24H16.5" stroke="#FDE68A" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="23" y="13" width="7.5" height="6" rx="1.5" stroke="#FBBF24" strokeWidth="1.5" />
        <path d="M23.5 24H30.5" stroke="#FDE68A" strokeOpacity="0.8" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 's14-3' || accent === 'teal') {
    // Shield with locked audit timeline
    return (
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
        <path
          d="M20 6L31 10.5V19.5C31 26.8 26.3 32.1 20 34.5C13.7 32.1 9 26.8 9 19.5V10.5L20 6Z"
          fill="#06282D"
          stroke="#2DD4BF"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M15 14V26" stroke="#5EEAD4" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="15" cy="14" r="1.6" fill="#99F6E4" />
        <circle cx="15" cy="20" r="1.6" fill="#99F6E4" />
        <circle cx="15" cy="26" r="1.6" fill="#99F6E4" />
        <rect x="19" y="18.5" width="7" height="5.5" rx="1.2" stroke="#99F6E4" strokeWidth="1.5" />
        <path d="M20.5 18.5V16.8C20.5 15.7 21.4 14.8 22.5 14.8C23.6 14.8 24.5 15.7 24.5 16.8V18.5" stroke="#99F6E4" strokeWidth="1.4" />
      </svg>
    );
  }

  // Chat bubble with verified receipt checkmark
  return (
    <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
      <path
        d="M7 10.5C7 8.57 8.57 7 10.5 7H29.5C31.43 7 33 8.57 33 10.5V22.5C33 24.43 31.43 26 29.5 26H16L10 31V26H10.5C8.57 26 7 24.43 7 22.5V10.5Z"
        fill="#082452"
        stroke="#38BDF8"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <rect x="14" y="11" width="12" height="11" rx="2" fill="#0B2E66" stroke="#7DD3FC" strokeWidth="1.5" />
      <path
        d="M17.2 16.5L19.2 18.5L23.2 14.5"
        stroke="#BAE6FD"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Slide 14: 3-Card Role & JTBD Matrix
 */
export const PersonaTrioCards: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-5 mt-5'
      } flex-1 min-h-0 items-stretch`}
    >
      {cards.slice(0, 3).map((card) => {
        const accent: 'blue' | 'amber' | 'teal' =
          card.accent === 'amber'
            ? 'amber'
            : card.accent === 'teal' || card.accent === 'emerald'
            ? 'teal'
            : 'blue';
        const pillClass =
          accent === 'amber'
            ? 'border-amber-300/25 bg-amber-950/35 text-amber-300'
            : accent === 'teal'
            ? 'border-teal-300/25 bg-teal-950/35 text-teal-300'
            : 'border-sky-300/22 bg-[#071D42]/90 text-sky-300';
        const focusClass =
          accent === 'amber'
            ? 'text-amber-300'
            : accent === 'teal'
            ? 'text-teal-300'
            : 'text-sky-300';
        const rowClass =
          accent === 'amber'
            ? 'border-amber-300/14 bg-[#181308]/50'
            : accent === 'teal'
            ? 'border-teal-300/14 bg-[#041D22]/55'
            : 'border-sky-200/14 bg-[#051836]/65';
        const iconRingClass =
          accent === 'amber'
            ? 'border-amber-400/35 bg-amber-400/12 text-amber-300'
            : accent === 'teal'
            ? 'border-teal-400/35 bg-teal-400/12 text-teal-300'
            : 'border-sky-400/35 bg-sky-400/12 text-sky-300';
        const items = card.items ?? [];

        return (
          <div
            key={card.id}
            className={`flex flex-col rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'justify-between p-2' : 'justify-start p-5 lg:p-6'
            }`}
          >
            {compact ? (
              <>
                <div className="flex items-center justify-between gap-1 shrink-0">
                  <span className={`font-mono font-bold uppercase text-[6.5px] truncate ${focusClass}`}>
                    {card.eyebrow}
                  </span>
                </div>
                {card.stat && (
                  <div className={`font-display font-extrabold text-[9px] truncate ${focusClass}`}>
                    {card.stat}
                  </div>
                )}
                <div className="mt-0.5">
                  <h3 className="font-display font-bold text-white text-[9px] leading-tight truncate">
                    {card.headline}
                  </h3>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3 shrink-0">
                  <ConcentricStoryBadge accent={accent}>
                    <PersonaRoleSvg id={card.id} accent={accent} />
                  </ConcentricStoryBadge>
                  {card.eyebrow && (
                    <span
                      className={`shrink-0 rounded-md border px-2.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wider uppercase ${pillClass}`}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-start min-h-0">
                  {card.stat && (
                    <div
                      className={`font-display text-[22px] lg:text-[23px] font-extrabold tracking-tight tabular-nums leading-tight ${focusClass}`}
                    >
                      {card.stat}
                    </div>
                  )}
                  <h3 className="mt-1 font-display text-[17px] lg:text-[18px] font-extrabold text-white leading-snug">
                    {card.headline}
                  </h3>

                  {items.length > 0 && (
                    <ul className="mt-4 flex-1 flex flex-col justify-start gap-3">
                      {items.map((item, idx) => (
                        <li
                          key={item.id}
                          className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 ${rowClass}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${iconRingClass}`}
                          >
                            {idx === 0 ? (
                              <Check className="h-3 w-3" strokeWidth={2.5} />
                            ) : (
                              <Zap className="h-3 w-3" strokeWidth={2.2} />
                            )}
                          </span>
                          <div className="min-w-0">
                            <span
                              className={`block font-mono text-[10.5px] font-bold uppercase tracking-wider ${focusClass}`}
                            >
                              {item.leadIn}
                            </span>
                            <p className="mt-1 text-[13.5px] leading-snug text-sky-100/88">
                              {item.text}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Slide 25: 3-Column KPI Bento Trio (Before / After Cohort Metrics)
 */
const ImpactKpiBadge: React.FC<{ index: number }> = ({ index }) => {
  if (index === 0) {
    // Blue Concentric Stopwatch Icon
    return (
      <ConcentricStoryBadge accent="blue">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M9.5 3h5M12 3v2.5" stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="13.5" r="7" stroke="#E0F2FE" strokeWidth="1.7" fill="#0B2E5E" fillOpacity="0.45" />
          <path d="M12 9.8v3.8l2.6 1.6" stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ConcentricStoryBadge>
    );
  }
  if (index === 1) {
    // Amber Concentric Workspace Icon (3-pane window)
    return (
      <ConcentricStoryBadge accent="amber">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke="#FEF3C7" strokeWidth="1.6" fill="#451A03" fillOpacity="0.4" />
          <line x1="9" y1="5" x2="9" y2="19" stroke="#FCD34D" strokeWidth="1.4" />
          <line x1="15" y1="5" x2="15" y2="19" stroke="#FCD34D" strokeWidth="1.4" />
          <path d="M5.5 9.5h1.5M5.5 13h1.5M11 10h2M17 10h1.5" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </ConcentricStoryBadge>
    );
  }
  // Teal Concentric Chat-Timer Icon
  return (
    <ConcentricStoryBadge accent="teal">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7.5A2.5 2.5 0 0 1 17.5 16.5H9L4.5 20V6.5Z"
          stroke="#CCFBF1"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10.2" r="3.6" stroke="#5EEAD4" strokeWidth="1.5" />
        <path d="M12 8.5v1.8l1.3.9" stroke="#ECFDF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </ConcentricStoryBadge>
  );
};

export const KpiTrioCards: React.FC<{
  cards: BentoCardItem[];
  closingTakeaway?: string;
  compact?: boolean;
}> = ({ cards, closingTakeaway, compact = false }) => {
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 justify-between ${
        compact ? 'mt-1.5 gap-1' : 'mt-4 gap-3.5'
      }`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-3 ${
          compact ? 'gap-1.5' : 'gap-5'
        } flex-1 min-h-0 items-stretch`}
      >
        {cards.slice(0, 3).map((card, idx) => {
          const statAccent =
            idx === 1 ? 'text-amber-300' : idx === 2 ? 'text-teal-300' : 'text-sky-300';
          const tagStyle =
            idx === 1
              ? 'border-amber-300/28 bg-[#1F1506]/80 text-amber-300'
              : idx === 2
              ? 'border-teal-300/28 bg-[#052328]/80 text-teal-300'
              : 'border-sky-300/28 bg-[#071D42]/90 text-sky-300';

          return (
            <div
              key={card.id}
              className={`flex flex-col justify-between rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
                compact ? 'p-2' : 'p-5 lg:p-6'
              }`}
            >
              <div className="flex items-start justify-between gap-2 shrink-0">
                {!compact && (
                  <span
                    className={`rounded-md border px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-wider ${tagStyle}`}
                  >
                    {card.eyebrow}
                  </span>
                )}
                {compact ? (
                  <StepIcon icon="zap" className="h-3.5 w-3.5 text-sky-300" />
                ) : (
                  <ImpactKpiBadge index={idx} />
                )}
              </div>

              {card.stat && (
                <div
                  className={`font-display font-extrabold tracking-tight leading-tight ${statAccent} ${
                    compact ? 'text-[10px] mt-1' : 'text-[27px] lg:text-[31px] mt-2'
                  }`}
                >
                  {card.stat}
                </div>
              )}

              <div className={compact ? 'mt-0.5' : 'mt-auto pt-2'}>
                <h3
                  className={`font-display font-extrabold text-white ${
                    compact ? 'text-[9px] truncate' : 'text-[17.5px] leading-snug'
                  }`}
                >
                  {card.headline}
                </h3>
                {!compact && (
                  <p className="mt-1.5 text-[13.5px] leading-relaxed font-medium text-sky-100/86">
                    {card.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {closingTakeaway && !compact && (
        <div className="shrink-0 rounded-xl border border-sky-300/25 bg-[#051836]/90 px-4 py-2.5 text-center text-[13px] font-medium text-sky-100/95">
          {closingTakeaway}
        </div>
      )}
    </div>
  );
};

/**
 * Clean, Uncrowded Built-In Diagrams for the 4 Reserved Figma SVG Slots:
 * Slide 5 ('12-Week Double Diamond'), Slide 12 ('Service Blueprint'),
 * Slide 15 ('Dispute Status & IA Flow'), Slide 17 ('Chat-to-Record User Flow')
 */
export const VisualAssetZone: React.FC<{
  slot: FigmaPlaceholderSpec;
  slideNumber: number;
  previewUrl?: string;
  compact?: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onUploadClick?: () => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearPreview?: () => void;
  heightClass: string;
}> = ({
  slot,
  slideNumber,
  previewUrl,
  compact = false,
  fileInputRef,
  onUploadClick,
  onFileChange,
  onClearPreview,
  heightClass,
}) => {
  const renderDoubleDiamondSlide = () => (
    <div className="flex flex-col justify-between h-full w-full px-5 py-4 gap-2.5">
      {/* Row 1: Plain-English Diamond Headers */}
      <div className="grid grid-cols-[minmax(0,1fr)_104px_minmax(0,1fr)] items-center shrink-0">
        <div className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-sky-300">
          PHASE 1: FIND THE RIGHT PROBLEM
        </div>
        <div aria-hidden="true" />
        <div className="text-center font-mono text-[11px] font-bold uppercase tracking-wider text-teal-300">
          PHASE 2: BUILD THE RIGHT SOLUTION
        </div>
      </div>

      {/* Row 2: Clean Double Diamond SVG + Center Week 4 Gate Pill */}
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <svg
          viewBox="0 0 920 186"
          className="w-full h-full max-h-[196px]"
          style={SVG_TEXT_STYLE}
          aria-label="12-Week Double Diamond Design Cadence"
        >
          {/* Left Blue Diamond: Discover -> Define */}
          <polygon
            points="16,93 204,10 392,93 204,176"
            fill="#1D6BFF"
            fillOpacity="0.14"
            stroke="#38BDF8"
            strokeOpacity="0.75"
            strokeWidth="2"
          />
          <line
            x1="204"
            y1="10"
            x2="204"
            y2="176"
            stroke="#38BDF8"
            strokeOpacity="0.32"
            strokeDasharray="5 4"
          />

          {/* Connector Lines to Center Gate */}
          <line x1="392" y1="93" x2="404" y2="93" stroke="#FBBF24" strokeOpacity="0.6" strokeWidth="1.6" />
          <line x1="516" y1="93" x2="528" y2="93" stroke="#FBBF24" strokeOpacity="0.6" strokeWidth="1.6" />

          {/* Right Teal Diamond: Develop -> Deliver */}
          <polygon
            points="528,93 716,10 904,93 716,176"
            fill="#14B8A6"
            fillOpacity="0.14"
            stroke="#2DD4BF"
            strokeOpacity="0.75"
            strokeWidth="2"
          />
          <line
            x1="716"
            y1="10"
            x2="716"
            y2="176"
            stroke="#2DD4BF"
            strokeOpacity="0.32"
            strokeDasharray="5 4"
          />

          {/* Left Diamond Left Half: 1. Discover / Weeks 1–2 */}
          <text x="142" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="16.5" fontWeight="700">
            1. Discover
          </text>
          <text x="142" y="109" textAnchor="middle" fill="#7DD3FC" fontSize="12.5" fontWeight="600">
            Weeks 1–2
          </text>

          {/* Left Diamond Right Half: 2. Define / Week 3 */}
          <text x="266" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="16.5" fontWeight="700">
            2. Define
          </text>
          <text x="266" y="109" textAnchor="middle" fill="#7DD3FC" fontSize="12.5" fontWeight="600">
            Week 3
          </text>

          {/* Center Highlighted Pill: Week 4 Gate / First Mockups */}
          <rect
            x="404"
            y="60"
            width="112"
            height="66"
            rx="14"
            fill="#451A03"
            fillOpacity="0.96"
            stroke="#FBBF24"
            strokeWidth="2"
          />
          <text x="460" y="88" textAnchor="middle" fill="#FDE68A" fontSize="13.5" fontWeight="700">
            Week 4 Gate
          </text>
          <text x="460" y="109" textAnchor="middle" fill="#FEF3C7" fontSize="11" fontWeight="600">
            First Mockups
          </text>

          {/* Right Diamond Left Half: 3. Develop / Weeks 5–8 */}
          <text x="654" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="16.5" fontWeight="700">
            3. Develop
          </text>
          <text x="654" y="109" textAnchor="middle" fill="#5EEAD4" fontSize="12.5" fontWeight="600">
            Weeks 5–8
          </text>

          {/* Right Diamond Right Half: 4. Deliver / Weeks 9–12 */}
          <text x="778" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="16.5" fontWeight="700">
            4. Deliver
          </text>
          <text x="778" y="109" textAnchor="middle" fill="#5EEAD4" fontSize="12.5" fontWeight="600">
            Weeks 9–12
          </text>
        </svg>
      </div>

      {/* Row 3: 4 Simple Captions Directly Below the Diamonds */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_104px_minmax(0,1fr)_minmax(0,1fr)] gap-2 shrink-0 items-stretch">
        <div className="rounded-lg border border-sky-300/20 bg-[#051836]/70 px-2.5 py-2 text-center flex items-center justify-center">
          <p className="text-[11.5px] leading-snug text-sky-100/90 font-medium">
            Audit data, shadow agents &amp; test rivals
          </p>
        </div>
        <div className="rounded-lg border border-sky-300/20 bg-[#051836]/70 px-2.5 py-2 text-center flex items-center justify-center">
          <p className="text-[11.5px] leading-snug text-sky-100/90 font-medium">
            Map blueprint, roles &amp; case statuses
          </p>
        </div>
        <div aria-hidden="true" />
        <div className="rounded-lg border border-teal-300/20 bg-[#042126]/65 px-2.5 py-2 text-center flex items-center justify-center">
          <p className="text-[11.5px] leading-snug text-teal-100/90 font-medium">
            Prototype, test with staff &amp; stress edge cases
          </p>
        </div>
        <div className="rounded-lg border border-teal-300/20 bg-[#042126]/65 px-2.5 py-2 text-center flex items-center justify-center">
          <p className="text-[11.5px] leading-snug text-teal-100/90 font-medium">
            Specs, accessibility &amp; phased beta launch
          </p>
        </div>
      </div>

      {/* Row 4: 1-Line Bottom Takeaway Strip */}
      <div className="rounded-xl border border-amber-400/35 bg-amber-950/20 px-4 py-2 text-center shrink-0">
        <p className="text-[12px] leading-snug text-amber-100/90">
          <span className="font-bold text-amber-300">Why not a 5-day sprint?</span>{' '}
          Crypto dispute compliance across 100k+ traders requires real workflow validation before engineering writes code.
        </p>
      </div>
    </div>
  );

  const renderBuiltInDiagram = () => {
    if (slot.slotTitle === '12-Week Double Diamond') {
      return renderDoubleDiamondSlide();
    }

    if (slot.slotTitle === 'Service Blueprint') {
      return (
        <div
          aria-label="3-Swimlane Service Blueprint"
          className="flex flex-col justify-between h-full w-full px-5 py-4 gap-1"
        >
          {/* Swimlane 1: FRONTSTAGE (Trader Chatbot) */}
          <div className="grid grid-cols-[136px_minmax(0,1fr)_22px_minmax(0,1fr)_22px_minmax(0,1fr)] items-stretch gap-y-0">
            <div className="flex flex-col justify-center pr-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-300">
                FRONTSTAGE
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-sky-200/65">
                Trader Chatbot
              </span>
            </div>

            {/* Col 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-full rounded-xl border border-sky-300/35 bg-[#07224A]/88 px-3.5 py-3 text-center">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  1. In-Chat Trigger
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-sky-100/85">
                  Taps “Report Issue”
                </div>
              </div>
              <div aria-hidden="true" className="flex flex-col items-center py-0.5 text-sky-300/75">
                <div className="h-3 w-px border-l border-dashed border-sky-300/65" />
                <span className="text-[9px] leading-none">▼</span>
              </div>
            </div>

            <div aria-hidden="true" className="flex items-center justify-center pb-4 text-sky-300/75">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Col 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-full rounded-xl border border-sky-300/35 bg-[#07224A]/88 px-3.5 py-3 text-center">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  2. Guided Proof
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-sky-100/85">
                  Uploads receipt in one step
                </div>
              </div>
              <div aria-hidden="true" className="flex flex-col items-center py-0.5 text-sky-300/75">
                <div className="h-3 w-px border-l border-dashed border-sky-300/65" />
                <span className="text-[9px] leading-none">▼</span>
              </div>
            </div>

            <div aria-hidden="true" className="flex items-center justify-center pb-4 text-sky-300/75">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Col 3 (Teal Highlight) */}
            <div className="relative flex flex-col items-center">
              <div className="w-full rounded-xl border border-teal-400/55 bg-[#052E32]/88 px-3.5 py-3 text-center shadow-[0_0_20px_rgba(45,212,191,0.14)]">
                <div className="font-display text-[13.5px] font-extrabold text-teal-50">
                  3. Live Status Update
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-teal-200/90">
                  Sees clear payout timer
                </div>
              </div>
              <div aria-hidden="true" className="flex flex-col items-center py-0.5 text-teal-300/80">
                <span className="text-[9px] leading-none">▲</span>
                <div className="h-3 w-px border-l border-dashed border-teal-300/70" />
              </div>
            </div>
          </div>

          {/* Horizontal Dashed Divider: LINE OF VISIBILITY on far right edge */}
          <div className="relative flex items-center py-1 shrink-0">
            <div className="w-full border-t border-dashed border-amber-400/70" />
            <span className="absolute right-0 rounded border border-amber-400/60 bg-[#241204]/95 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
              LINE OF VISIBILITY
            </span>
          </div>

          {/* Swimlane 2: BACKSTAGE (Reviewer Ops) */}
          <div className="grid grid-cols-[136px_minmax(0,1fr)_22px_minmax(0,1fr)_22px_minmax(0,1fr)] items-stretch pt-1">
            <div className="flex flex-col justify-center pr-3 pb-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300">
                BACKSTAGE
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-sky-200/65">
                Reviewer Ops
              </span>
            </div>

            {/* Col 1 */}
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 flex flex-col justify-center rounded-xl border border-sky-300/28 bg-[#081C3E]/88 px-3.5 py-2.5 text-center">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  Auto-Triage &amp; Hold
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-sky-100/82">
                  Bot locks escrow &amp; queues case
                </div>
              </div>
              <div aria-hidden="true" className="flex flex-col items-center py-0.5 text-teal-300/70">
                <div className="h-3 w-px border-l border-dashed border-teal-300/60" />
                <span className="text-[9px] leading-none">▼</span>
              </div>
            </div>

            <div aria-hidden="true" className="flex items-center justify-center pb-4 text-sky-300/70">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Col 2 */}
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 flex flex-col justify-center rounded-xl border border-sky-300/28 bg-[#081C3E]/88 px-3.5 py-2.5 text-center">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  Split-Screen Review
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-sky-100/82">
                  Inspects chat + receipt side-by-side
                </div>
                <div className="mt-1.5 flex justify-center">
                  <span className="inline-flex items-center rounded-full border border-amber-400/45 bg-amber-950/55 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold text-amber-200">
                    Escalation Path: Compliance Hold
                  </span>
                </div>
              </div>
              <div aria-hidden="true" className="flex flex-col items-center py-0.5 text-teal-300/70">
                <div className="h-3 w-px border-l border-dashed border-teal-300/60" />
                <span className="text-[9px] leading-none">▼</span>
              </div>
            </div>

            <div aria-hidden="true" className="flex items-center justify-center pb-4 text-teal-300/75">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Col 3 */}
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 flex flex-col justify-center rounded-xl border border-sky-300/28 bg-[#081C3E]/88 px-3.5 py-2.5 text-center">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  Resolution Action
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-sky-100/82">
                  Releases funds or issues refund
                </div>
              </div>
              <div aria-hidden="true" className="flex flex-col items-center py-0.5 text-teal-300/70">
                <div className="h-3 w-px border-l border-dashed border-teal-300/60" />
                <span className="text-[9px] leading-none">▼</span>
              </div>
            </div>
          </div>

          {/* Swimlane 3: SYSTEM LAYER (Auto-Captured Record) */}
          <div className="grid grid-cols-[136px_minmax(0,1fr)] items-stretch shrink-0">
            <div className="flex flex-col justify-center pr-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-300">
                SYSTEM LAYER
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-sky-200/65">
                Auto-Captured Record
              </span>
            </div>
            <div className="rounded-xl border border-teal-400/45 bg-[#042428]/90 px-5 py-3 text-center">
              <div className="font-display text-[13.5px] font-extrabold text-teal-200">
                Auto-Captured Case Record &amp; Locked Audit Trail
              </div>
              <div className="mt-0.5 text-[11.5px] font-medium text-sky-100/85">
                Every message, Trade ID, receipt, and reviewer decision saves automatically to an uneditable history.
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slot.slotTitle === 'Dispute Status & IA Flow') {
      return (
        <div
          aria-label="Reviewer Workspace Navigation and Dispute Case Lifecycle"
          className="flex flex-col justify-between h-full w-full px-6 py-4 gap-2"
        >
          {/* Top Tier: REVIEWER WORKSPACE NAVIGATION */}
          <div className="flex flex-col">
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-sky-300">
              REVIEWER WORKSPACE NAVIGATION
            </div>

            {/* Root Node */}
            <div className="mt-1.5 flex justify-center">
              <div className="min-w-[210px] rounded-xl border border-sky-300/65 bg-[#0B2E63]/95 px-6 py-2 text-center shadow-[0_0_22px_rgba(56,189,248,0.16)]">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  Dispute Ops Hub
                </div>
              </div>
            </div>

            {/* Crisp Tree Connector */}
            <div aria-hidden="true" className="grid grid-cols-3 gap-4 px-1">
              <div className="relative h-5 col-span-3">
                {/* Vertical stem from root */}
                <div className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-sky-300/60" />
                {/* Horizontal bus connecting center of Col 1 to center of Col 3 */}
                <div
                  className="absolute top-2.5 h-px bg-sky-300/60"
                  style={{ left: 'calc((100% - 2rem) / 6)', right: 'calc((100% - 2rem) / 6)' }}
                />
                {/* Vertical drops into each child */}
                <div
                  className="absolute top-2.5 bottom-0 w-px bg-sky-300/60"
                  style={{ left: 'calc((100% - 2rem) / 6)' }}
                />
                <div className="absolute left-1/2 top-2.5 bottom-0 w-px -translate-x-1/2 bg-sky-300/60" />
                <div
                  className="absolute top-2.5 bottom-0 w-px bg-teal-300/65"
                  style={{ right: 'calc((100% - 2rem) / 6)' }}
                />
              </div>
            </div>

            {/* 3 Child Nodes */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-sky-300/35 bg-[#041530]/92 px-3.5 py-2.5 text-center">
                <div className="font-display text-[13px] font-extrabold text-white">
                  Priority Queues
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-sky-200/80">
                  Countdown Timer &amp; Owner
                </div>
              </div>

              <div className="rounded-xl border border-sky-300/35 bg-[#041530]/92 px-3.5 py-2.5 text-center">
                <div className="font-display text-[13px] font-extrabold text-white">
                  Split-Screen Case
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-sky-200/80">
                  Trade ID, Amount &amp; Proof
                </div>
              </div>

              <div className="rounded-xl border border-teal-400/50 bg-[#042428]/90 px-3.5 py-2.5 text-center">
                <div className="font-display text-[13px] font-extrabold text-teal-100">
                  Locked Decision Log
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-teal-200/80">
                  Uneditable History &amp; Export
                </div>
              </div>
            </div>
          </div>

          {/* Dashed Divider */}
          <div className="border-t border-dashed border-sky-200/20" />

          {/* Bottom Tier: DISPUTE CASE LIFECYCLE */}
          <div className="flex flex-col justify-center">
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-amber-300">
              DISPUTE CASE LIFECYCLE
            </div>

            <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)_44px_minmax(0,1fr)] items-center">
              {/* Row 1: Primary Horizontal Flow */}
              {/* 1. Open */}
              <div className="rounded-xl border border-sky-400/55 bg-[#07224A]/92 px-4 py-2.5 text-center">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  1. Open
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-sky-200/80">
                  Intake logged
                </div>
              </div>

              {/* Arrow: Open -> In Review */}
              <div aria-hidden="true" className="flex items-center justify-center px-1">
                <svg viewBox="0 0 36 14" className="h-3.5 w-full" fill="none">
                  <line x1="2" y1="7" x2="29" y2="7" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="27,2.5 34,7 27,11.5" fill="#7DD3FC" />
                </svg>
              </div>

              {/* 2. In Review */}
              <div className="rounded-xl border border-sky-300/75 bg-[#0B2E63]/95 px-4 py-2.5 text-center shadow-[0_0_18px_rgba(56,189,248,0.14)]">
                <div className="font-display text-[13.5px] font-extrabold text-white">
                  2. In Review
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-sky-100/85">
                  Reviewer assigned
                </div>
              </div>

              {/* Arrow: In Review -> Resolved */}
              <div aria-hidden="true" className="flex items-center justify-center px-1">
                <svg viewBox="0 0 36 14" className="h-3.5 w-full" fill="none">
                  <line x1="2" y1="7" x2="29" y2="7" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="27,2.5 34,7 27,11.5" fill="#2DD4BF" />
                </svg>
              </div>

              {/* 3. Resolved (Teal Highlight) */}
              <div className="rounded-xl border border-teal-400/75 bg-[#052E32]/92 px-4 py-2.5 text-center shadow-[0_0_22px_rgba(45,212,191,0.16)]">
                <div className="font-display text-[13.5px] font-extrabold text-teal-50">
                  3. Resolved
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-teal-200/90">
                  Locked &amp; archived
                </div>
              </div>

              {/* Row 2: Vertical Branch Connectors */}
              <div aria-hidden="true" className="h-6" />
              <div aria-hidden="true" className="h-6" />

              {/* Downward Amber Arrow from 2. In Review */}
              <div aria-hidden="true" className="flex flex-col items-center justify-center h-6 text-amber-300">
                <div className="w-[2px] flex-1 bg-amber-400/80" />
                <svg viewBox="0 0 12 8" className="h-2 w-3 -mt-0.5 shrink-0" fill="none">
                  <polygon points="6,8 0.5,0.5 11.5,0.5" fill="#FBBF24" />
                </svg>
              </div>

              <div aria-hidden="true" className="h-6" />

              {/* Upward Amber Arrow into 3. Resolved */}
              <div aria-hidden="true" className="flex flex-col items-center justify-center h-6 text-amber-300">
                <svg viewBox="0 0 12 8" className="h-2 w-3 -mb-0.5 shrink-0" fill="none">
                  <polygon points="6,0 11.5,7.5 0.5,7.5" fill="#FBBF24" />
                </svg>
                <div className="w-[2px] flex-1 bg-amber-400/80" />
              </div>

              {/* Row 3: Conditional Exception Node + Routed Forward Connector */}
              <div aria-hidden="true" />
              <div aria-hidden="true" />

              {/* Escalated / Frozen Pill Node */}
              <div className="rounded-full border border-amber-400/70 bg-gradient-to-r from-[#451A03]/90 via-[#3F1512]/90 to-[#3B1018]/90 px-4 py-2 text-center shadow-[0_0_18px_rgba(251,191,36,0.14)]">
                <div className="font-display text-[12.5px] font-extrabold text-amber-200">
                  Escalated / Frozen
                </div>
                <div className="mt-0.5 text-[10.5px] font-medium text-rose-100/85">
                  Risk tier or Compliance hold
                </div>
              </div>

              {/* Routed Elbow Connector from Escalated / Frozen -> bottom of 3. Resolved */}
              <div aria-hidden="true" className="col-start-4 col-span-2 relative h-full min-h-[44px]">
                <div
                  className="absolute left-0 top-0 rounded-br-xl border-b-2 border-r-2 border-amber-400/80"
                  style={{ width: 'calc(50% + 22px)', bottom: '50%' }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Chat-to-Record User Flow (Slide 17) — Clean 2-Row Connected 6-Step Flow
    return (
      <div
        aria-label="2-Row Chat-to-Record User Flow"
        className="flex flex-col justify-center h-full w-full px-6 py-5"
      >
        {/* Top Row: Automated Chatbot Intake (Trader Side) */}
        <div className="flex flex-col flex-1 justify-end">
          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-sky-300">
            TRADER SIDE · AUTOMATED CHATBOT INTAKE
          </div>

          <div className="mt-2 grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)] items-stretch">
            {/* Step 1 */}
            <div className="rounded-xl border border-sky-300/45 bg-[#07224A]/92 px-4 py-4 text-center flex flex-col justify-center">
              <div className="font-display text-[14px] font-extrabold text-white">
                1. Tap “Report Issue”
              </div>
              <div className="mt-1 text-[12px] font-medium text-sky-100/85">
                In-chat dispute trigger
              </div>
            </div>

            {/* Arrow 1 -> 2 */}
            <div aria-hidden="true" className="flex items-center justify-center px-0.5">
              <svg viewBox="0 0 32 14" className="h-3.5 w-full" fill="none">
                <line x1="2" y1="7" x2="25" y2="7" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
                <polygon points="23,2.5 30,7 23,11.5" fill="#7DD3FC" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-sky-300/45 bg-[#07224A]/92 px-4 py-4 text-center flex flex-col justify-center">
              <div className="font-display text-[14px] font-extrabold text-white">
                2. Guided Proof Prompt
              </div>
              <div className="mt-1 text-[12px] font-medium text-sky-100/85">
                Uploads receipt + Order ID
              </div>
            </div>

            {/* Arrow 2 -> 3 */}
            <div aria-hidden="true" className="flex items-center justify-center px-0.5">
              <svg viewBox="0 0 32 14" className="h-3.5 w-full" fill="none">
                <line x1="2" y1="7" x2="25" y2="7" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
                <polygon points="23,2.5 30,7 23,11.5" fill="#7DD3FC" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-sky-300/75 bg-[#0B2E63]/95 px-4 py-4 text-center shadow-[0_0_18px_rgba(56,189,248,0.16)] flex flex-col justify-center">
              <div className="font-display text-[14px] font-extrabold text-white">
                3. Auto-Case &amp; Escrow Lock
              </div>
              <div className="mt-1 text-[12px] font-medium text-sky-100/90">
                Bot creates Case ID &amp; freezes funds
              </div>
            </div>
          </div>
        </div>

        {/* Z-Connector: Touching bottom of Step 3 directly down to top of Step 4 */}
        <div aria-hidden="true" className="relative h-16 w-full shrink-0">
          {/* Vertical drop touching bottom center of Step 3 */}
          <div
            className="absolute top-0 h-8 w-[2px] bg-sky-300/80"
            style={{ right: 'calc((100% - 72px) / 6)' }}
          />
          {/* Horizontal bridge from Col 3 center to Col 1 center */}
          <div
            className="absolute top-8 h-[2px] bg-gradient-to-l from-sky-300/80 via-amber-300/80 to-amber-400/90"
            style={{
              left: 'calc((100% - 72px) / 6)',
              right: 'calc((100% - 72px) / 6)',
            }}
          />
          {/* Centered handoff badge on bridge */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/35 bg-[#051836] px-3 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-sky-200">
            AUTO-CAPTURED TO OPS QUEUE
          </div>
          {/* Downward drop into Step 4 (Col 1 center) */}
          <div
            className="absolute top-8 bottom-1.5 w-[2px] bg-amber-400/90"
            style={{ left: 'calc((100% - 72px) / 6)' }}
          />
          <svg
            viewBox="0 0 12 8"
            className="absolute bottom-0 h-2 w-3 -translate-x-1/2"
            style={{ left: 'calc((100% - 72px) / 6 + 1px)' }}
            fill="none"
          >
            <polygon points="6,8 0.5,0.5 11.5,0.5" fill="#FBBF24" />
          </svg>
          {/* Ops Side Row Header positioned cleanly to the right of the vertical arrow */}
          <div
            className="absolute bottom-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-amber-300"
            style={{ left: 'calc((100% - 72px) / 3 + 36px)' }}
          >
            OPS SIDE · TRIAGE ROUTING &amp; RESOLUTION
          </div>
        </div>

        {/* Bottom Row: Triage Routing & Resolution (Ops Side) */}
        <div className="flex flex-col flex-1 justify-start">
          <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)] items-stretch">
            {/* Step 4: Amber Diamond/Pill Decision Node */}
            <div className="rounded-full border border-amber-400/75 bg-gradient-to-br from-[#2B1704]/95 to-[#160D03]/95 px-4 py-4 text-center shadow-[0_0_20px_rgba(251,191,36,0.16)] flex flex-col items-center justify-center">
              <div className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] border border-amber-200 bg-amber-400"
                />
                <span className="font-display text-[13.5px] font-extrabold text-amber-100">
                  4. Smart Triage Check
                </span>
              </div>
              <div className="mt-1 text-[12px] font-medium text-amber-200/90">
                Routine vs. High-Risk?
              </div>
            </div>

            {/* Arrow 4 -> 5 */}
            <div aria-hidden="true" className="flex items-center justify-center px-0.5">
              <svg viewBox="0 0 32 14" className="h-3.5 w-full" fill="none">
                <line x1="2" y1="7" x2="25" y2="7" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
                <polygon points="23,2.5 30,7 23,11.5" fill="#FBBF24" />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="rounded-xl border border-sky-300/55 bg-[#07224A]/92 px-4 py-4 text-center flex flex-col justify-center">
              <div className="font-display text-[14px] font-extrabold text-white">
                5. Split-Screen Review
              </div>
              <div className="mt-1 text-[12px] font-medium text-sky-100/85">
                Chat, receipt &amp; risk flags in 1 view
              </div>
            </div>

            {/* Arrow 5 -> 6 */}
            <div aria-hidden="true" className="flex items-center justify-center px-0.5">
              <svg viewBox="0 0 32 14" className="h-3.5 w-full" fill="none">
                <line x1="2" y1="7" x2="25" y2="7" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
                <polygon points="23,2.5 30,7 23,11.5" fill="#2DD4BF" />
              </svg>
            </div>

            {/* Step 6 */}
            <div className="rounded-xl border border-teal-400/75 bg-[#052E32]/92 px-4 py-4 text-center shadow-[0_0_22px_rgba(45,212,191,0.16)] flex flex-col justify-center">
              <div className="font-display text-[14px] font-extrabold text-teal-50">
                6. Two-Sided Resolution
              </div>
              <div className="mt-1 text-[12px] font-medium text-teal-200/90">
                Funds released + live timer pushed to chat
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      data-testid={`figma-slot-slide-${slideNumber}`}
      className={`relative flex flex-col justify-between rounded-xl border border-sky-300/25 bg-[#031026]/80 ${heightClass} overflow-hidden`}
    >
      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt={`${slot.slotTitle} preview`}
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain p-2"
          />
          {!compact && onClearPreview && (
            <button
              type="button"
              onClick={onClearPreview}
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded border border-sky-300/30 bg-[#051836] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#0B2A5A]"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Restore Built-In Diagram</span>
            </button>
          )}
        </>
      ) : (
        <>
          {!compact &&
            slot.slotTitle !== '12-Week Double Diamond' &&
            slot.slotTitle !== 'Service Blueprint' &&
            slot.slotTitle !== 'Dispute Status & IA Flow' &&
            slot.slotTitle !== 'Chat-to-Record User Flow' && (
            <div className="flex items-center justify-between gap-2 border-b border-sky-200/15 bg-[#051836]/80 px-3.5 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10.5px] font-semibold text-sky-300 truncate shrink-0 max-w-full">
                  {slot.slotTitle}
                </span>
                <span className="hidden sm:inline text-[10px] text-sky-200/60 truncate">
                  · {slot.flowSummary}
                </span>
              </div>
              {onUploadClick && onFileChange && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    onChange={onFileChange}
                    className="hidden"
                    aria-label={`Attach ${slot.slotTitle} asset for Slide ${slideNumber}`}
                  />
                  <button
                    type="button"
                    onClick={onUploadClick}
                    className="inline-flex shrink-0 items-center gap-1 rounded border border-sky-300/30 bg-[#0A2552] px-2 py-1 text-[10.5px] font-medium text-white hover:border-sky-300 hover:bg-[#10346E]"
                  >
                    <ImagePlus className="h-3 w-3 text-sky-300" aria-hidden="true" />
                    <span>Replace w/ Figma SVG</span>
                  </button>
                </>
              )}
            </div>
          )}
          <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
            {compact ? (
              <span className="font-mono text-[10px] font-semibold text-sky-300 px-2 text-center">
                {slot.slotTitle}
              </span>
            ) : (
              renderBuiltInDiagram()
            )}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * 3-Column Crazy 8s Wireframe Exploration Comparison Grid (Slide 18)
 */
export const CrazyEightsGrid: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-4 mt-4'
      } flex-1 min-h-0 items-stretch`}
    >
      {cards.slice(0, 3).map((card) => (
        <div
          key={card.id}
          className={`flex flex-col justify-between rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
            compact ? 'p-1.5' : 'p-4 lg:p-4.5'
          }`}
        >
          {!compact && (
            <div className="flex items-center justify-between gap-2 shrink-0">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-sky-300">
                {card.eyebrow ?? 'SKETCH'}
              </span>
              {card.stat && (
                <span className="rounded-md border border-teal-300/25 bg-teal-950/35 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-teal-300">
                  {card.stat}
                </span>
              )}
            </div>
          )}

          {!compact && (
            <div className="my-2.5 flex-1 min-h-[168px] rounded-xl border border-dashed border-sky-300/25 bg-[#04142B]/90 p-2 flex items-center justify-center">
              <BentoIllustration kind={card.illustration} compact={compact} />
            </div>
          )}

          <div className={compact ? 'my-auto' : 'shrink-0'}>
            <h3
              className={`font-display font-extrabold text-white ${
                compact ? 'text-[8.5px] leading-tight line-clamp-2' : 'text-[16px] leading-snug'
              }`}
            >
              {card.headline}
            </h3>
            {!compact && (
              <p className="mt-1 text-[12.5px] leading-snug font-medium text-sky-100/88">
                {card.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Top 3 Clickable Mid-Fi Wireframe Preview Cards (Slide 19)
 */
export const Week4WireframesDeck: React.FC<{
  cards: BentoCardItem[];
  phaseOutputs?: PhaseOutputsStrip;
  compact?: boolean;
}> = ({ cards, phaseOutputs, compact = false }) => {
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 justify-between ${
        compact ? 'mt-1 gap-1' : 'mt-4 gap-3'
      }`}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-3 ${
          compact ? 'gap-1' : 'gap-4'
        } flex-1 min-h-0 items-stretch`}
      >
        {cards.slice(0, 3).map((card) => (
          <div
            key={card.id}
            className={`flex flex-col justify-between rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'p-1.5' : 'p-4'
            }`}
          >
            {!compact && (
              <div className="flex items-center justify-between gap-2 shrink-0">
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-sky-300">
                  {card.eyebrow ?? 'FRAME'}
                </span>
                <span className="rounded-md border border-sky-300/25 bg-[#072146]/80 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-sky-200">
                  {card.stat ?? 'Figma Gate'}
                </span>
              </div>
            )}

            {!compact && (
              <div className="my-2 flex-1 min-h-[146px] rounded-xl border border-sky-300/22 bg-[#04142B]/90 p-2 flex items-center justify-center">
                <BentoIllustration kind={card.illustration} compact={compact} />
              </div>
            )}

            <div className="shrink-0">
              <h3
                className={`font-display font-extrabold text-white ${
                  compact ? 'text-[8px] leading-tight truncate' : 'text-[15.5px] leading-snug'
                }`}
              >
                {card.headline}
              </h3>
              {!compact && (
                <p className="mt-1 text-[12.5px] leading-snug font-medium text-sky-100/88">
                  {card.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {phaseOutputs && !compact && (
        <div className="shrink-0 rounded-xl border border-sky-300/25 bg-[#051836]/90 px-4 py-2.5 text-[12.5px] leading-snug text-sky-100/92">
          <strong className="font-semibold text-amber-300">{phaseOutputs.label}:</strong>{' '}
          {phaseOutputs.whyItMatters}
        </div>
      )}
    </div>
  );
};

const UsabilityMetricIcon: React.FC<{ index: number }> = ({ index }) => {
  if (index === 0) {
    // Blue Concentric Stopwatch Icon
    return (
      <ConcentricStoryBadge accent="blue">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path d="M9.5 3h5M12 3v2.5" stroke="#BAE6FD" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="12" cy="13.5" r="7" stroke="#E0F2FE" strokeWidth="1.7" fill="#0B2E5E" fillOpacity="0.45" />
          <path d="M12 9.8v3.8l2.6 1.6" stroke="#7DD3FC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.2 7.8l1.3-1.3" stroke="#7DD3FC" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </ConcentricStoryBadge>
    );
  }
  if (index === 1) {
    // Amber Concentric Cursor-Alert Icon
    return (
      <ConcentricStoryBadge accent="amber">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M4.5 4.5L9.8 18l2.1-4.9 4.9-2.1L4.5 4.5Z"
            fill="#F59E0B"
            fillOpacity="0.28"
            stroke="#FEF3C7"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="17.5" cy="17.5" r="4" fill="#B45309" stroke="#FDE68A" strokeWidth="1.4" />
          <path d="M17.5 15.6v2.1" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17.5" cy="19.3" r="0.7" fill="#FFFFFF" />
        </svg>
      </ConcentricStoryBadge>
    );
  }
  // Teal Concentric 1-7 Scale Gauge Icon
  return (
    <ConcentricStoryBadge accent="teal">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M4.5 16.5a7.5 7.5 0 0 1 15 0"
          stroke="#5EEAD4"
          strokeOpacity="0.4"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M4.5 16.5a7.5 7.5 0 0 1 11.4-6.4"
          stroke="#2DD4BF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M12 16.5l3.6-4.4" stroke="#ECFDF5" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1.6" fill="#FFFFFF" />
        <text x="6.2" y="20.5" fontSize="5.2" fill="#99F6E4" fontWeight="700">1</text>
        <text x="16.2" y="20.5" fontSize="5.2" fill="#99F6E4" fontWeight="700">7</text>
      </svg>
    </ConcentricStoryBadge>
  );
};

/**
 * Slide 21: Left Usability Test Scenario Card + Right 3 Equal-Styled Metric Cards
 */
export const UsabilityScenarioDeck: React.FC<{
  scenarioPrompt: string;
  steps: InfographicStep[];
  compact?: boolean;
}> = ({ scenarioPrompt, steps, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0 items-stretch ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-5 mt-5'
      }`}
    >
      {/* Left: Usability Test Scenario Card */}
      <div
        className={`md:col-span-5 flex flex-col justify-between rounded-2xl border border-sky-200/20 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
          compact ? 'p-2' : 'p-6'
        }`}
      >
        <div className="flex items-center justify-between gap-2 shrink-0">
          <span
            className={`font-mono font-bold uppercase tracking-wider text-sky-300 ${
              compact ? 'text-[7.5px]' : 'text-[10.5px]'
            }`}
          >
            TEST SCENARIO
          </span>
        </div>

        <div
          className={`my-auto rounded-xl border border-sky-200/18 bg-[#04142E]/88 ${
            compact ? 'p-1.5' : 'p-5'
          }`}
        >
          <p
            className={`font-display font-bold text-white ${
              compact ? 'text-[8px] leading-snug line-clamp-3' : 'text-[19px] lg:text-[20px] leading-snug'
            }`}
          >
            {scenarioPrompt}
          </p>
        </div>

        {!compact && (
          <div className="font-mono text-[11px] font-semibold text-amber-300">
            Weeks 5–6 · Tested with 5–8 Internal Reviewers
          </div>
        )}
      </div>

      {/* Right: 3 Equal-Styled Metric Cards */}
      <div
        className={`md:col-span-7 flex flex-col justify-between min-h-0 ${
          compact ? 'gap-1' : 'gap-3.5'
        }`}
      >
        {steps.slice(0, 3).map((step, idx) => (
          <div
            key={step.id}
            className={`flex-1 flex items-center rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
              compact ? 'px-2 py-1' : 'px-5 py-3.5'
            }`}
          >
            <div className="flex items-center gap-4 min-w-0 w-full">
              {!compact && <UsabilityMetricIcon index={idx} />}
              <div className="min-w-0 flex-1 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3
                    className={`font-display font-extrabold text-white ${
                      compact ? 'text-[8.5px] truncate' : 'text-[17px] leading-snug'
                    }`}
                  >
                    {step.title}
                  </h3>
                  {!compact && (
                    <p className="mt-0.5 text-[13px] font-medium text-sky-100/85 leading-snug">
                      {step.caption}
                    </p>
                  )}
                </div>
                {!compact && step.stepNumber && (
                  <span className="shrink-0 rounded-md border border-sky-300/22 bg-[#071D42]/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-sky-200">
                    {step.stepNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SAFEGUARD_PILL_STYLES: Array<{
  pillPrefix: string;
  pillClass: string;
}> = [
  {
    pillPrefix: 'Auto Risk-History Badge',
    pillClass: 'border-amber-300/40 bg-amber-950/45 text-amber-200',
  },
  {
    pillPrefix: 'Guided Split-Payout Calculator',
    pillClass: 'border-sky-300/40 bg-sky-950/55 text-sky-200',
  },
  {
    pillPrefix: 'Linked-Case Grouping',
    pillClass: 'border-teal-300/40 bg-teal-950/50 text-teal-200',
  },
  {
    pillPrefix: 'Side-by-Side Proof Zoom',
    pillClass: 'border-amber-300/40 bg-amber-950/45 text-amber-200',
  },
];

function renderSafeguardCell(text: string, rowIdx: number) {
  const styleCfg = SAFEGUARD_PILL_STYLES[rowIdx];
  if (styleCfg && text.startsWith(styleCfg.pillPrefix)) {
    const rest = text.slice(styleCfg.pillPrefix.length).trim();
    return (
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[12px] font-bold tracking-tight ${styleCfg.pillClass}`}
        >
          {styleCfg.pillPrefix}
        </span>
        {rest && <span className="text-[13px] font-medium text-sky-100/90">{rest}</span>}
      </div>
    );
  }
  return <span className="text-[13px] font-semibold text-sky-200">{text}</span>;
}

/**
 * Slide 22: Clean 4-Row Edge-Case Stress-Test Matrix Table
 */
export const StressTestMatrixTable: React.FC<{
  table: BenchmarkTable;
  compact?: boolean;
}> = ({ table, compact = false }) => {
  return (
    <div className={`flex flex-col flex-1 min-h-0 ${compact ? 'mt-1' : 'mt-4'}`}>
      {compact ? (
        <div className="overflow-hidden rounded-lg border border-sky-200/20 bg-[#031026]/85 flex-1 min-h-0 flex flex-col justify-between p-1.5 gap-0.5">
          <div className="grid grid-cols-12 gap-1 rounded bg-[#08224A]/95 px-1.5 py-0.5 font-display font-bold text-[6.5px] text-sky-300">
            <span className="col-span-4 truncate">{table.headers[0]}</span>
            <span className="col-span-4 truncate">{table.headers[1]}</span>
            <span className="col-span-4 truncate">{table.headers[2]}</span>
          </div>
          {table.rows.slice(0, 4).map((row) => (
            <div
              key={row.source}
              className="grid grid-cols-12 gap-1 border-t border-sky-200/10 px-1.5 pt-0.5 text-[6.5px]"
            >
              <span className="col-span-4 font-semibold text-white truncate">{row.source}</span>
              <span className="col-span-4 text-amber-200/85 truncate">{row.observe}</span>
              <span className="col-span-4 text-sky-200 truncate">{row.extract}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-sky-200/22 bg-[#031026]/86 flex-1 min-h-0 flex flex-col">
          <table className="w-full h-full border-collapse text-left table-fixed">
            <thead>
              <tr className="bg-[#08224A]/95 text-sky-300 border-b border-sky-200/18">
                <th className="w-[24%] font-display font-bold px-5 py-3.5 text-[13px] tracking-wide">
                  {table.headers[0]}
                </th>
                <th className="w-[34%] font-display font-bold px-5 py-3.5 text-[13px] tracking-wide">
                  {table.headers[1]}
                </th>
                <th className="w-[42%] font-display font-bold px-5 py-3.5 text-[13px] tracking-wide">
                  {table.headers[2]}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-200/12">
              {table.rows.slice(0, 4).map((row, rowIdx) => (
                <tr key={row.source} className="hover:bg-sky-400/5">
                  <td className="font-display font-bold text-white px-5 py-3.5 text-[15px]">
                    {row.source}
                  </td>
                  <td className="text-amber-100/90 px-5 py-3.5 text-[13.5px] font-medium leading-snug">
                    {row.observe}
                  </td>
                  <td className="px-5 py-3.5">{renderSafeguardCell(row.extract, rowIdx)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/**
 * Slide 23: Three Side-by-Side Handoff Spec Cards
 */
export const HandoffSpecsGrid: React.FC<{
  cards: BentoCardItem[];
  compact?: boolean;
}> = ({ cards, compact = false }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 ${
        compact ? 'gap-1.5 mt-1.5' : 'gap-4 mt-4'
      } flex-1 min-h-0 items-stretch`}
    >
      {cards.slice(0, 3).map((card) => (
        <div
          key={card.id}
          className={`flex flex-col justify-between rounded-2xl border border-sky-200/18 bg-[#031026]/86 backdrop-blur-xs min-h-0 ${
            compact ? 'p-1.5' : 'p-4'
          }`}
        >
          {!compact && (
            <div className="flex items-center justify-between gap-2 shrink-0">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-sky-300">
                {card.eyebrow ?? 'PILLAR'}
              </span>
              {card.stat && (
                <span className="rounded-md border border-sky-300/25 bg-[#072146]/80 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-sky-200">
                  {card.stat}
                </span>
              )}
            </div>
          )}

          {!compact && (
            <div className="my-2.5 flex-1 min-h-[154px] rounded-xl border border-sky-300/22 bg-[#04142B]/90 p-2 flex items-center justify-center">
              <BentoIllustration kind={card.illustration} compact={compact} />
            </div>
          )}

          <div className={compact ? 'my-auto' : 'shrink-0'}>
            <h3
              className={`font-display font-extrabold text-white ${
                compact ? 'text-[8.5px] leading-tight line-clamp-2' : 'text-[16px] leading-snug'
              }`}
            >
              {card.headline}
            </h3>
            {!compact && (
              <p className="mt-1 text-[12.5px] leading-snug font-medium text-sky-100/88">
                {card.caption}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
