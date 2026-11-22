import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PDF_EXPORT_BACKGROUND,
  PDF_EXPORT_BASE_HEIGHT,
  PDF_EXPORT_BASE_WIDTH,
  PDF_EXPORT_FILENAME,
  PDF_EXPORT_HEIGHT,
  PDF_EXPORT_PIXEL_RATIO,
  PDF_EXPORT_SCALE,
  PDF_EXPORT_WIDTH,
  formatPdfExportProgress,
  getHtmlToImageCaptureOptions,
  getJsPdfDocumentOptions,
} from './pdfExport';

test('PDF export enforces exact 16:9 1920x1080 dimensions and scaling', () => {
  assert.equal(PDF_EXPORT_WIDTH, 1920);
  assert.equal(PDF_EXPORT_HEIGHT, 1080);
  assert.equal(PDF_EXPORT_BASE_WIDTH / PDF_EXPORT_BASE_HEIGHT, 16 / 9);
  assert.equal(Math.round(PDF_EXPORT_BASE_WIDTH * PDF_EXPORT_SCALE), 1920);
  assert.equal(Math.round(PDF_EXPORT_BASE_HEIGHT * PDF_EXPORT_SCALE), 1080);
  assert.equal(PDF_EXPORT_PIXEL_RATIO, 2);
  assert.equal(PDF_EXPORT_BACKGROUND, '#071326');
  assert.equal(PDF_EXPORT_FILENAME, 'Quifi-UX-Execution-Plan.pdf');
});

test('jsPDF document config uses landscape 1920x1080 px format with compression', () => {
  const opts = getJsPdfDocumentOptions();
  assert.equal(opts.orientation, 'landscape');
  assert.equal(opts.unit, 'px');
  assert.deepEqual(opts.format, [1920, 1080]);
  assert.equal(opts.compress, true);
});

test('html-to-image capture config enforces retina pixelRatio, navy background, and CORS fetch', () => {
  const opts = getHtmlToImageCaptureOptions('/* fonts */');
  assert.equal(opts.width, 1920);
  assert.equal(opts.height, 1080);
  assert.equal(opts.pixelRatio, 2);
  assert.equal(opts.backgroundColor, '#071326');
  assert.equal(opts.fetchRequestInit?.mode, 'cors');
  assert.equal(opts.fontEmbedCSS, '/* fonts */');
});

test('progress label formats cleanly within 1..total bounds', () => {
  assert.equal(
    formatPdfExportProgress({ current: 1, total: 25 }),
    'Exporting Slide 1 / 25...'
  );
  assert.equal(
    formatPdfExportProgress({ current: 14, total: 25 }),
    'Exporting Slide 14 / 25...'
  );
  assert.equal(
    formatPdfExportProgress({ current: 99, total: 25 }),
    'Exporting Slide 25 / 25...'
  );
});
