import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Check, ChevronDown, ChevronUp, Download, ExternalLink, LogOut, Presentation, RefreshCw, X } from 'lucide-react';
import { DeckMetadata, GoogleSlidesSyncResult, SlideData } from '../types/deck';
import { buildGoogleSlidesBatchUpdate, parsePresentationId } from '../utils/googleSlidesBuilder';
import { downloadOceanBackdropPng } from '../utils/oceanBackdropPng';
import {
  createGoogleSlidesDeck,
  fetchPresentationSummary,
  RemotePresentationSummary,
  updateExistingGoogleSlidesDeck,
} from '../services/googleSlidesApi';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  metadata: DeckMetadata;
  user: User | null;
  accessToken: string | null;
  isLoggingIn: boolean;
  authError: string | null;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  lastSync: GoogleSlidesSyncResult | null;
  onSyncComplete: (result: GoogleSlidesSyncResult) => void;
}

type SyncMode = 'create' | 'update';

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({
  isOpen,
  onClose,
  slides,
  metadata,
  user,
  accessToken,
  isLoggingIn,
  authError,
  onSignIn,
  onSignOut,
  lastSync,
  onSyncComplete,
}) => {
  const [syncMode, setSyncMode] = useState<SyncMode>('create');
  const [deckTitle, setDeckTitle] = useState(
    `${metadata.deckTitle} — ${metadata.horizon}`
  );
  const [existingUrlInput, setExistingUrlInput] = useState('');
  const [inspectedDeck, setInspectedDeck] = useState<RemotePresentationSummary | null>(null);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState<boolean>(false);
  const [showPayloadPreview, setShowPayloadPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const needsAuth = !accessToken;

  const handleInspectExisting = async () => {
    setErrorMsg(null);
    setInspectedDeck(null);
    const parsedId = parsePresentationId(existingUrlInput);
    if (!parsedId) {
      setErrorMsg('Enter a valid Google Slides URL or Presentation ID.');
      return;
    }
    if (!accessToken) {
      setErrorMsg('Sign in with Google first to inspect presentations.');
      return;
    }
    setIsInspecting(true);
    try {
      const summary = await fetchPresentationSummary(parsedId, accessToken);
      setInspectedDeck(summary);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to inspect presentation.');
    } finally {
      setIsInspecting(false);
    }
  };

  const handleRequestSync = () => {
    setErrorMsg(null);
    if (syncMode === 'create' && !deckTitle.trim()) {
      setErrorMsg('Enter a presentation title before exporting.');
      return;
    }
    if (syncMode === 'update' && !inspectedDeck) {
      setErrorMsg('Inspect an existing Google Slides presentation first.');
      return;
    }
    setPendingConfirmation(true);
  };

  const assetBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const figmaSlideNums = slides
    .filter((s) => Boolean(s.figmaSlot))
    .map((s) => s.slideNumber);
  const figmaSlideLabel =
    figmaSlideNums.length > 1
      ? `${figmaSlideNums.slice(0, -1).join(', ')}, and ${figmaSlideNums[figmaSlideNums.length - 1]}`
      : figmaSlideNums.join(', ');

  const handleConfirmSync = async () => {
    if (!accessToken) return;
    setIsSyncing(true);
    setErrorMsg(null);
    try {
      if (syncMode === 'create') {
        const res = await createGoogleSlidesDeck(
          slides,
          metadata,
          accessToken,
          deckTitle,
          assetBaseUrl
        );
        onSyncComplete(res);
      } else if (inspectedDeck) {
        const res = await updateExistingGoogleSlidesDeck(
          inspectedDeck.presentationId,
          inspectedDeck.slideObjectIds,
          slides,
          metadata,
          accessToken,
          inspectedDeck.title,
          assetBaseUrl
        );
        onSyncComplete(res);
      }
      setPendingConfirmation(false);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Google Slides sync failed.');
      setPendingConfirmation(false);
    } finally {
      setIsSyncing(false);
    }
  };

  const previewRequests = showPayloadPreview
    ? buildGoogleSlidesBatchUpdate(slides, metadata, ['existing_slide_0'], {
        iconMode: assetBaseUrl.startsWith('https://') && !assetBaseUrl.includes('localhost') ? 'png' : 'vector',
        assetBaseUrl,
      }).slice(0, 14)
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slides-sync-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-[#0F172A] text-slate-100 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Presentation className="h-4 w-4 text-blue-300" aria-hidden="true" />
            <h2 id="slides-sync-heading" className="font-display text-base font-bold text-white">
              Google Slides Integration
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setPendingConfirmation(false);
              onClose();
            }}
            aria-label="Close Google Slides dialog"
            className="rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[78vh] overflow-y-auto p-6 space-y-5">
          {/* Authentication Section */}
          {needsAuth ? (
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="font-display text-sm font-bold text-white">
                Connect Your Google Workspace Account
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Sign in with Google to create a new {slides.length}-slide dark presentation or update an existing
                Google Slides deck with all Quifi comparison tables, story leads, speaker notes,
                and 4 custom Figma SVG slots (12-Week Double Diamond, Service Blueprint, Dispute Status &amp; IA Flow, Chat-to-Record User Flow).
              </p>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={onSignIn}
                  disabled={isLoggingIn}
                  className="gsi-material-button"
                >
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        style={{ display: 'block' }}
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
                    </span>
                  </div>
                </button>
              </div>

              {authError && (
                <p className="mt-3 text-xs font-medium text-red-400" role="alert">
                  {authError}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3">
              <div>
                <div className="text-xs font-semibold text-white">
                  {user?.displayName || 'Google Workspace Connected'}
                </div>
                <div className="text-[11px] text-slate-400">{user?.email}</div>
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* Mode Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => {
                  setSyncMode('create');
                  setPendingConfirmation(false);
                  setErrorMsg(null);
                }}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                  syncMode === 'create'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create New Google Slides Deck
              </button>
              <button
                type="button"
                onClick={() => {
                  setSyncMode('update');
                  setPendingConfirmation(false);
                  setErrorMsg(null);
                }}
                className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                  syncMode === 'update'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Update Existing Presentation
              </button>
            </div>

            {syncMode === 'create' ? (
              <div>
                <label htmlFor="new-deck-title" className="block text-xs font-semibold text-slate-200">
                  New Presentation Title
                </label>
                <input
                  id="new-deck-title"
                  type="text"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Exports all {slides.length} dark ocean-cobalt widescreen slides, Double Diamond & Bento layouts,
                  crisp medallion icons, speaker notes, and built-in diagram shapes on Slides {figmaSlideLabel}.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <label
                  htmlFor="existing-slides-url"
                  className="block text-xs font-semibold text-slate-200"
                >
                  Google Slides URL or Presentation ID
                </label>
                <div className="flex gap-2">
                  <input
                    id="existing-slides-url"
                    type="text"
                    value={existingUrlInput}
                    onChange={(e) => {
                      setExistingUrlInput(e.target.value);
                      setInspectedDeck(null);
                      setPendingConfirmation(false);
                    }}
                    placeholder="https://docs.google.com/presentation/d/..."
                    className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={needsAuth || isInspecting}
                    onClick={handleInspectExisting}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${isInspecting ? 'animate-spin' : ''}`}
                      aria-hidden="true"
                    />
                    <span>{isInspecting ? 'Inspecting...' : 'Inspect'}</span>
                  </button>
                </div>

                {inspectedDeck && (
                  <div className="rounded-md border border-slate-700 bg-slate-900 p-3.5 text-xs">
                    <div className="font-semibold text-white">{inspectedDeck.title}</div>
                    <div className="mt-1 text-slate-400 tabular-nums">
                      Current Slide Count: {inspectedDeck.slideCount} · ID:{' '}
                      <span className="font-mono text-slate-300">{inspectedDeck.presentationId}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="rounded-md border border-red-500/40 bg-red-950/40 px-3.5 py-2.5 text-xs font-medium text-red-200"
              >
                {errorMsg}
              </div>
            )}

            {/* Mandatory Explicit User Confirmation Box before any mutation/creation */}
            {pendingConfirmation && !needsAuth && (
              <div
                role="alertdialog"
                aria-labelledby="confirm-sync-title"
                className="rounded-lg border border-amber-500/40 bg-amber-950/35 p-4 space-y-3"
              >
                <h4 id="confirm-sync-title" className="font-display text-sm font-bold text-white">
                  {syncMode === 'create'
                    ? `Create "${deckTitle}" in Google Slides?`
                    : `Replace ${inspectedDeck?.slideCount ?? 0} slide(s) in "${inspectedDeck?.title}"?`}
                </h4>
                <p className="text-xs leading-relaxed text-slate-200">
                  {syncMode === 'create'
                    ? `This will create a new ${slides.length}-slide dark ocean-cobalt Google Slides presentation in your Google account with Bento cards, HEART scorecard, speaker notes, and diagram shapes on Slides ${figmaSlideLabel}.`
                    : `This will replace all ${inspectedDeck?.slideCount ?? 0} existing slide(s) in "${inspectedDeck?.title}" with the ${slides.length} slides from this Quifi Execution Plan. Existing slides in that deck will be deleted.`}
                </p>
                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    type="button"
                    disabled={isSyncing}
                    onClick={() => setPendingConfirmation(false)}
                    className="rounded border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isSyncing}
                    onClick={handleConfirmSync}
                    className="rounded bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-60"
                  >
                    {isSyncing ? 'Syncing to Google Slides...' : 'Confirm & Sync'}
                  </button>
                </div>
              </div>
            )}

            {/* Last Sync Result */}
            {lastSync && (
              <div className="rounded-md border border-emerald-500/40 bg-emerald-950/35 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {lastSync.mode === 'created' ? 'Created' : 'Updated'} "{lastSync.title}" (
                      {lastSync.slideCount} slides
                      {lastSync.iconExportMode === 'png'
                        ? ' · 256px PNG Medallions'
                        : lastSync.iconExportMode === 'vector-fallback'
                        ? ' · Crisp Geometric Icons'
                        : ''}
                      )
                    </span>
                  </div>
                  <a
                    href={lastSync.presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
                  >
                    <span>Open in Google Slides</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}

            {/* Visual Fidelity Note & Optional Master Backdrop Download */}
            <div className="rounded-lg border border-sky-200/15 bg-slate-900/75 p-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-display text-xs font-bold text-sky-300">
                  Google Slides Visual Fidelity Note
                </h4>
                <button
                  type="button"
                  onClick={downloadOceanBackdropPng}
                  className="inline-flex items-center gap-1.5 rounded border border-sky-300/30 bg-[#0A2552] px-2.5 py-1 text-[11px] font-medium text-white hover:bg-[#10346E]"
                >
                  <Download className="h-3 w-3 text-sky-300" aria-hidden="true" />
                  <span>Download 16:9 Ocean Backdrop PNG</span>
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                High-resolution 256×256 transparent PNG medallion icons are embedded automatically when syncing from a public HTTPS share URL.
                When syncing from private previews or localhost, Google Slides receives pure-geometry vector medallions (zero clipped text glyphs) with left-aligned card text.
                For the pixel halftone radial backdrop, download the PNG above and apply it via Slide &rarr; Change background &rarr; Add to theme.
              </p>
            </div>

            {/* Technical API Payload Disclosure */}
            <div className="border-t border-slate-800 pt-3">
              <button
                type="button"
                aria-expanded={showPayloadPreview}
                onClick={() => setShowPayloadPreview((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white"
              >
                {showPayloadPreview ? (
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>Inspect Slides API batchUpdate Structure</span>
              </button>
              {showPayloadPreview && (
                <pre className="mt-2.5 max-h-44 overflow-auto rounded-md border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-300">
                  {JSON.stringify(previewRequests, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-6 py-3.5">
          <span className="text-[11px] font-mono text-slate-400 tabular-nums">
            {slides.length} slides · Apple Bento cards · 4 Figma SVG slots · {slides.filter((s) => Boolean(s.benchmarkTable || s.table)).length} edge-case matrix
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setPendingConfirmation(false);
                onClose();
              }}
              className="rounded border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700"
            >
              Close
            </button>
            {!pendingConfirmation && (
              <button
                type="button"
                disabled={needsAuth || (syncMode === 'update' && !inspectedDeck)}
                onClick={handleRequestSync}
                className="rounded bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
              >
                {syncMode === 'create'
                  ? 'Create in Google Slides'
                  : 'Update Google Slides Deck'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
