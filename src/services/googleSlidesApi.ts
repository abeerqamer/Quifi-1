import { DeckMetadata, GoogleSlidesSyncResult, SlideData } from '../types/deck';
import {
  buildGoogleSlidesBatchUpdate,
  buildSpeakerNotesBatchUpdate,
  NotesUpdateTarget,
} from '../utils/googleSlidesBuilder';

const SLIDES_API_BASE = 'https://slides.googleapis.com/v1/presentations';

export interface RemotePresentationSummary {
  presentationId: string;
  title: string;
  slideCount: number;
  slideObjectIds: string[];
  revisionId?: string;
}

interface RawSlideResponse {
  objectId: string;
  slideProperties?: {
    notesPage?: {
      notesProperties?: {
        speakerNotesObjectId?: string;
      };
    };
  };
}

interface RawPresentationResponse {
  presentationId: string;
  title: string;
  revisionId?: string;
  slides?: RawSlideResponse[];
}

async function handleApiResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const errBody = (await res.json()) as { error?: { message?: string } };
      if (errBody?.error?.message) {
        detail = errBody.error.message;
      }
    } catch {
      // keep HTTP status text
    }
    throw new Error(detail);
  }
  return (await res.json()) as T;
}

export async function fetchPresentationSummary(
  presentationId: string,
  accessToken: string
): Promise<RemotePresentationSummary> {
  const res = await fetch(`${SLIDES_API_BASE}/${encodeURIComponent(presentationId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await handleApiResponse<RawPresentationResponse>(res);
  const slides = data.slides ?? [];
  return {
    presentationId: data.presentationId,
    title: data.title,
    slideCount: slides.length,
    slideObjectIds: slides.map((s) => s.objectId),
    revisionId: data.revisionId,
  };
}

async function applySpeakerNotes(
  presentationId: string,
  slides: SlideData[],
  accessToken: string
): Promise<void> {
  const res = await fetch(`${SLIDES_API_BASE}/${encodeURIComponent(presentationId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const updated = await handleApiResponse<RawPresentationResponse>(res);
  const remoteSlides = updated.slides ?? [];

  const targets: NotesUpdateTarget[] = [];
  remoteSlides.forEach((remoteSlide, idx) => {
    const localSlide = slides[idx];
    const speakerNotesObjectId =
      remoteSlide.slideProperties?.notesPage?.notesProperties?.speakerNotesObjectId;
    if (localSlide && speakerNotesObjectId && localSlide.speakerNotes.trim()) {
      targets.push({
        speakerNotesObjectId,
        notesText: localSlide.speakerNotes,
      });
    }
  });

  const noteRequests = buildSpeakerNotesBatchUpdate(targets);
  if (noteRequests.length === 0) return;

  const batchRes = await fetch(
    `${SLIDES_API_BASE}/${encodeURIComponent(presentationId)}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests: noteRequests }),
    }
  );
  await handleApiResponse(batchRes);
}

async function sendBatchUpdateInChunks(
  presentationId: string,
  requests: Record<string, unknown>[],
  accessToken: string,
  maxRequestsPerChunk = 260
): Promise<void> {
  if (requests.length === 0) return;

  const chunks: Record<string, unknown>[][] = [];
  let currentChunk: Record<string, unknown>[] = [];

  for (const req of requests) {
    const isSlideBoundary = 'createSlide' in req || 'deleteObject' in req;
    if (
      isSlideBoundary &&
      currentChunk.length >= maxRequestsPerChunk
    ) {
      chunks.push(currentChunk);
      currentChunk = [];
    }
    currentChunk.push(req);
  }
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  for (const chunk of chunks) {
    const batchRes = await fetch(
      `${SLIDES_API_BASE}/${encodeURIComponent(presentationId)}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests: chunk }),
      }
    );
    await handleApiResponse(batchRes);
  }
}

function shouldUsePngIcons(assetBaseUrl?: string): boolean {
  if (!assetBaseUrl) return false;
  return (
    assetBaseUrl.startsWith('https://') &&
    !assetBaseUrl.includes('localhost') &&
    !assetBaseUrl.includes('127.0.0.1')
  );
}

function isImageFetchError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  const msg = err.message.toLowerCase();
  return (
    msg.includes('image') ||
    msg.includes('fetch') ||
    msg.includes('url') ||
    msg.includes('retrieve')
  );
}

export async function createGoogleSlidesDeck(
  slides: SlideData[],
  metadata: DeckMetadata,
  accessToken: string,
  customTitle?: string,
  assetBaseUrl?: string
): Promise<GoogleSlidesSyncResult> {
  const title = (customTitle?.trim() || `${metadata.deckTitle} — ${metadata.horizon}`).slice(0, 140);

  const createRes = await fetch(SLIDES_API_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  const created = await handleApiResponse<RawPresentationResponse>(createRes);
  const initialSlideIds = (created.slides ?? []).map((s) => s.objectId);
  const tryPng = shouldUsePngIcons(assetBaseUrl);
  let iconExportMode: 'png' | 'vector-fallback' = tryPng ? 'png' : 'vector-fallback';

  if (tryPng) {
    try {
      const pngRequests = buildGoogleSlidesBatchUpdate(slides, metadata, initialSlideIds, {
        iconMode: 'png',
        assetBaseUrl,
      });
      await sendBatchUpdateInChunks(created.presentationId, pngRequests, accessToken);
    } catch (err: unknown) {
      if (!isImageFetchError(err)) throw err;
      iconExportMode = 'vector-fallback';
      const freshSummary = await fetchPresentationSummary(created.presentationId, accessToken);
      const fallbackRequests = buildGoogleSlidesBatchUpdate(
        slides,
        metadata,
        freshSummary.slideObjectIds,
        { iconMode: 'vector' }
      );
      await sendBatchUpdateInChunks(created.presentationId, fallbackRequests, accessToken);
    }
  } else {
    const vectorRequests = buildGoogleSlidesBatchUpdate(slides, metadata, initialSlideIds, {
      iconMode: 'vector',
    });
    await sendBatchUpdateInChunks(created.presentationId, vectorRequests, accessToken);
  }

  await applySpeakerNotes(created.presentationId, slides, accessToken);

  return {
    presentationId: created.presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${created.presentationId}/edit`,
    title: created.title,
    slideCount: slides.length,
    syncedAt: new Date().toISOString(),
    mode: 'created',
    iconExportMode,
  };
}

export async function updateExistingGoogleSlidesDeck(
  presentationId: string,
  existingSlideIds: string[],
  slides: SlideData[],
  metadata: DeckMetadata,
  accessToken: string,
  presentationTitle: string,
  assetBaseUrl?: string
): Promise<GoogleSlidesSyncResult> {
  const tryPng = shouldUsePngIcons(assetBaseUrl);
  let iconExportMode: 'png' | 'vector-fallback' = tryPng ? 'png' : 'vector-fallback';

  if (tryPng) {
    try {
      const pngRequests = buildGoogleSlidesBatchUpdate(slides, metadata, existingSlideIds, {
        iconMode: 'png',
        assetBaseUrl,
      });
      await sendBatchUpdateInChunks(presentationId, pngRequests, accessToken);
    } catch (err: unknown) {
      if (!isImageFetchError(err)) throw err;
      iconExportMode = 'vector-fallback';
      const freshSummary = await fetchPresentationSummary(presentationId, accessToken);
      const fallbackRequests = buildGoogleSlidesBatchUpdate(
        slides,
        metadata,
        freshSummary.slideObjectIds,
        { iconMode: 'vector' }
      );
      await sendBatchUpdateInChunks(presentationId, fallbackRequests, accessToken);
    }
  } else {
    const vectorRequests = buildGoogleSlidesBatchUpdate(slides, metadata, existingSlideIds, {
      iconMode: 'vector',
    });
    await sendBatchUpdateInChunks(presentationId, vectorRequests, accessToken);
  }

  await applySpeakerNotes(presentationId, slides, accessToken);

  return {
    presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
    title: presentationTitle,
    slideCount: slides.length,
    syncedAt: new Date().toISOString(),
    mode: 'updated',
    iconExportMode,
  };
}
