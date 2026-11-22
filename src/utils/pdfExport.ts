import { getFontEmbedCSS, toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const PDF_EXPORT_WIDTH = 1920;
export const PDF_EXPORT_HEIGHT = 1080;
export const PDF_EXPORT_BASE_WIDTH = 1080;
export const PDF_EXPORT_BASE_HEIGHT = 607.5;
export const PDF_EXPORT_SCALE = PDF_EXPORT_WIDTH / PDF_EXPORT_BASE_WIDTH;
export const PDF_EXPORT_PIXEL_RATIO = 2;
export const PDF_EXPORT_BACKGROUND = '#071326';
export const PDF_EXPORT_FILENAME = 'Quifi-UX-Execution-Plan.pdf';

export interface PdfExportProgress {
  current: number;
  total: number;
}

export function formatPdfExportProgress(progress: PdfExportProgress): string {
  const safeTotal = Math.max(1, progress.total);
  const safeCurrent = Math.min(safeTotal, Math.max(1, progress.current));
  return `Exporting Slide ${safeCurrent} / ${safeTotal}...`;
}

export function getJsPdfDocumentOptions() {
  return {
    orientation: 'landscape' as const,
    unit: 'px' as const,
    format: [PDF_EXPORT_WIDTH, PDF_EXPORT_HEIGHT] as [number, number],
    compress: true,
  };
}

export function getHtmlToImageCaptureOptions(fontEmbedCSS?: string) {
  return {
    width: PDF_EXPORT_WIDTH,
    height: PDF_EXPORT_HEIGHT,
    pixelRatio: PDF_EXPORT_PIXEL_RATIO,
    backgroundColor: PDF_EXPORT_BACKGROUND,
    cacheBust: false,
    skipAutoScale: true,
    fetchRequestInit: {
      mode: 'cors' as RequestMode,
      credentials: 'omit' as RequestCredentials,
    },
    ...(fontEmbedCSS !== undefined ? { fontEmbedCSS } : {}),
    filter: (node: HTMLElement) => {
      if (node instanceof HTMLElement && node.dataset?.exportHide === 'true') {
        return false;
      }
      return true;
    },
  };
}

function nextAnimationFrames(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function yieldToBrowser(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export async function exportSlidesToPdf(
  slideElements: Array<HTMLElement | null>,
  onProgress: (progress: PdfExportProgress) => void,
  filename: string = PDF_EXPORT_FILENAME
): Promise<void> {
  const validNodes = slideElements.filter(
    (el): el is HTMLElement => el !== null
  );

  if (validNodes.length === 0) {
    throw new Error('No slides are mounted for PDF export.');
  }

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }
  await nextAnimationFrames();

  let sharedFontCss: string | undefined;
  try {
    sharedFontCss = await getFontEmbedCSS(validNodes[0], {
      fetchRequestInit: {
        mode: 'cors',
        credentials: 'omit',
      },
    });
  } catch {
    sharedFontCss = undefined;
  }

  const pdf = new jsPDF(getJsPdfDocumentOptions());
  const total = validNodes.length;

  for (let i = 0; i < total; i += 1) {
    onProgress({ current: i + 1, total });
    await yieldToBrowser();

    const node = validNodes[i];
    const dataUrl = await toPng(node, getHtmlToImageCaptureOptions(sharedFontCss));

    if (i > 0) {
      pdf.addPage([PDF_EXPORT_WIDTH, PDF_EXPORT_HEIGHT], 'landscape');
    }

    pdf.addImage(
      dataUrl,
      'PNG',
      0,
      0,
      PDF_EXPORT_WIDTH,
      PDF_EXPORT_HEIGHT,
      undefined,
      'FAST'
    );
  }

  pdf.save(filename);
}
