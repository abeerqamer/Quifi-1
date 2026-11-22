import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_QUIFI_SLIDES, QUIFI_DECK_METADATA } from '../data/quifiDeck';
import {
  buildGoogleSlidesBatchUpdate,
  buildSpeakerNotesBatchUpdate,
  parsePresentationId,
} from './googleSlidesBuilder';

test('parsePresentationId extracts ID from full Google Slides URLs and raw IDs', () => {
  assert.equal(
    parsePresentationId('https://docs.google.com/presentation/d/1AbCdEfGhIjKlMnOpQrStUvWxYz123456/edit#slide=id.p'),
    '1AbCdEfGhIjKlMnOpQrStUvWxYz123456'
  );
  assert.equal(
    parsePresentationId('1AbCdEfGhIjKlMnOpQrStUvWxYz123456'),
    '1AbCdEfGhIjKlMnOpQrStUvWxYz123456'
  );
  assert.equal(parsePresentationId('not-a-valid-url'), null);
  assert.equal(parsePresentationId(''), null);
});

test('buildGoogleSlidesBatchUpdate creates 25 BLANK slides, deletes old slides, includes 4 dividers, 4 Figma slots, and Slide 22 edge-case matrix', () => {
  const requests = buildGoogleSlidesBatchUpdate(INITIAL_QUIFI_SLIDES, QUIFI_DECK_METADATA, ['old_slide_0']);

  const createSlides = requests.filter((r) => 'createSlide' in r);
  assert.equal(createSlides.length, 25);

  const deleteObjects = requests.filter((r) => 'deleteObject' in r);
  assert.equal(deleteObjects.length, 1);
  assert.deepEqual(deleteObjects[0], { deleteObject: { objectId: 'old_slide_0' } });

  const createTables = requests.filter((r) => 'createTable' in r);
  assert.equal(createTables.length, 1); // Slide 22 Messy Real-World Trades Matrix

  const serialized = JSON.stringify(requests);
  assert.ok(serialized.includes('Quifi Enterprise Dispute & Record-Keeping System'));
  assert.ok(serialized.includes('conversational chatbot'));
  assert.ok(serialized.includes('Everything Lives in One Chat'));
  assert.ok(serialized.includes('12-Week Double Diamond'));
  assert.ok(serialized.includes('Discover: Auditing Quifi’s Foundation & Rivals'));
  assert.ok(serialized.includes('Binance & Bybit P2P'));
  assert.ok(serialized.includes('3 Proven Patterns We’ll Bring to Quifi'));
  assert.ok(serialized.includes('Service Blueprint'));
  assert.ok(serialized.includes('LINE OF VISIBILITY'));
  assert.ok(serialized.includes('Unclear Ownership'));
  assert.ok(serialized.includes('Compliance Lead'));
  assert.ok(serialized.includes('Dispute Ops Hub'));
  assert.ok(serialized.includes('DISPUTE CASE LIFECYCLE'));
  assert.ok(serialized.includes('Develop: Prototyping & Week 4 Mockup Gate'));
  assert.ok(serialized.includes('Tap “Report Issue”'));
  assert.ok(serialized.includes('Smart Triage Check'));
  assert.ok(serialized.includes('Two-Sided Resolution'));
  assert.ok(serialized.includes('TRIAGE SPEED'));
  assert.ok(serialized.includes('Bulk Actions'));
  assert.ok(serialized.includes('Testable Layout Hypotheses'));
  assert.ok(serialized.includes('Testing inline bar first'));
  assert.ok(serialized.includes('Priority Queue'));
  assert.ok(serialized.includes('3-Pane Evidence Workspace'));
  assert.ok(serialized.includes('Week 4 Sign-Off Criteria'));
  assert.ok(serialized.includes('Deliver: Validate, Stress-Test & Scale to Launch'));
  assert.ok(serialized.includes('Time-on-Task'));
  assert.ok(serialized.includes('Compare speed vs. Week 1 baseline'));
  assert.ok(serialized.includes('Altered Payment Receipts'));
  assert.ok(serialized.includes('Auto Risk-History Badge in case header'));
  assert.ok(serialized.includes('Role Views & UI States'));
  assert.ok(serialized.includes('WCAG AA'));
  assert.ok(serialized.includes('Week 11: Senior Reviewer Pilot'));
  assert.ok(serialized.includes('Lower Handling Time'));
  assert.ok(serialized.includes('auditable, scalable dispute system in 12 weeks'));
  assert.ok(serialized.includes('"shapeType":"ELLIPSE"'));
  assert.ok(serialized.includes('"shapeType":"ROUND_RECTANGLE"'));
  assert.ok(serialized.includes('"alignment":"START"'));
  assert.ok(serialized.includes('_glyph'));
  assert.ok(serialized.includes('_bdot'));
});

test('buildGoogleSlidesBatchUpdate emits crisp createImage PNG medallion URLs when iconMode=png', () => {
  const requests = buildGoogleSlidesBatchUpdate(
    INITIAL_QUIFI_SLIDES.slice(0, 8),
    QUIFI_DECK_METADATA,
    [],
    {
      iconMode: 'png',
      assetBaseUrl: 'https://example.run.app/',
    }
  );
  const createImages = requests.filter((r) => 'createImage' in r);
  assert.ok(createImages.length >= 10);
  const firstImage = createImages[0] as { createImage: { url: string } };
  assert.match(firstImage.createImage.url, /^https:\/\/example\.run\.app\/assets\/icons\/medallion-[a-z]+-(blue|amber)\.png$/);
});

test('buildSpeakerNotesBatchUpdate skips empty notes and emits insertText requests', () => {
  const requests = buildSpeakerNotesBatchUpdate([
    { speakerNotesObjectId: 'notes_1', notesText: 'Start with the human story.' },
    { speakerNotesObjectId: 'notes_2', notesText: '   ' },
  ]);
  assert.equal(requests.length, 1);
  assert.deepEqual(requests[0], {
    insertText: {
      objectId: 'notes_1',
      insertionIndex: 0,
      text: 'Start with the human story.',
    },
  });
});
