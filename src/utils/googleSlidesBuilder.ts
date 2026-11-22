import { DeckMetadata, InfographicIconKey, SlideData } from '../types/deck';

export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export interface GoogleSlidesBuildOptions {
  iconMode?: 'png' | 'vector';
  assetBaseUrl?: string;
}

const SLIDE_BG: RgbColor = { red: 3 / 255, green: 14 / 255, blue: 34 / 255 }; // #030E22 Abyssal Navy
const GLOW_COBALT: RgbColor = { red: 11 / 255, green: 59 / 255, blue: 115 / 255 }; // #0B3B73 Cobalt Bloom
const GLOW_CERULEAN: RgbColor = { red: 36 / 255, green: 120 / 255, blue: 184 / 255 }; // #2478B8 Cerulean Core
const CARD_BG: RgbColor = { red: 4 / 255, green: 20 / 255, blue: 46 / 255 }; // #04142E Frosted Ocean Card
const TABLE_HEADER_BG: RgbColor = { red: 8 / 255, green: 34 / 255, blue: 74 / 255 }; // #08224A
const TABLE_ROW_BG: RgbColor = { red: 5 / 255, green: 22 / 255, blue: 51 / 255 }; // #051633
const BORDER_GLASS: RgbColor = { red: 125 / 255, green: 211 / 255, blue: 252 / 255 }; // #7DD3FC Sky Hairline
const MEDALLION_RING: RgbColor = { red: 14 / 255, green: 50 / 255, blue: 102 / 255 }; // #0E3266
const MEDALLION_GLASS: RgbColor = { red: 42 / 255, green: 108 / 255, blue: 196 / 255 }; // #2A6CC4
const ELECTRIC_BLUE: RgbColor = { red: 29 / 255, green: 107 / 255, blue: 255 / 255 }; // #1D6BFF
const TEXT_WHITE: RgbColor = { red: 248 / 255, green: 250 / 255, blue: 252 / 255 }; // #F8FAFC
const TEXT_MUTED: RgbColor = { red: 203 / 255, green: 224 / 255, blue: 245 / 255 }; // #CBE0F5
const BLUE_ACCENT: RgbColor = { red: 125 / 255, green: 211 / 255, blue: 252 / 255 }; // #7DD3FC
const AMBER_ACCENT: RgbColor = { red: 251 / 255, green: 191 / 255, blue: 36 / 255 }; // #FBBF24
const EMERALD_ACCENT: RgbColor = { red: 52 / 255, green: 211 / 255, blue: 153 / 255 }; // #34D399

/**
 * Extracts a Google Slides Presentation ID from either a full URL or raw ID.
 * Returns null if invalid.
 */
export function parsePresentationId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const urlMatch = trimmed.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

type VectorShapeType =
  | 'TEXT_BOX'
  | 'RECTANGLE'
  | 'ROUND_RECTANGLE'
  | 'ELLIPSE'
  | 'DIAMOND'
  | 'STAR_5'
  | 'PLUS'
  | 'HEART'
  | 'HEXAGON';

function getGeometricEmblemShape(icon: InfographicIconKey = 'compass'): VectorShapeType {
  switch (icon) {
    case 'shield':
    case 'lock':
    case 'scale':
      return 'DIAMOND';
    case 'heart':
      return 'HEART';
    case 'zap':
    case 'alert':
      return 'STAR_5';
    case 'layers':
    case 'compass':
      return 'HEXAGON';
    case 'check':
    case 'sparkles':
      return 'PLUS';
    default:
      return 'ELLIPSE';
  }
}

function makeShape(
  objectId: string,
  pageObjectId: string,
  shapeType: VectorShapeType,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  options: {
    fontSize?: number;
    bold?: boolean;
    color?: RgbColor;
    fontFamily?: string;
    fill?: RgbColor;
    fillAlpha?: number;
    outline?: RgbColor;
    outlineAlpha?: number;
    outlineWeight?: number;
    dashStyle?: 'SOLID' | 'DASH';
    boldPrefixLength?: number;
    alignCenter?: boolean;
    middleAlign?: boolean;
    topAlign?: boolean;
  }
): Record<string, unknown>[] {
  const requests: Record<string, unknown>[] = [
    {
      createShape: {
        objectId,
        shapeType,
        elementProperties: {
          pageObjectId,
          size: {
            width: { magnitude: w, unit: 'PT' },
            height: { magnitude: h, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: x,
            translateY: y,
            unit: 'PT',
          },
        },
      },
    },
  ];

  if (options.fill || options.outline || options.middleAlign || options.topAlign) {
    const shapeProperties: Record<string, unknown> = {};
    const fields: string[] = [];

    if (options.fill) {
      shapeProperties.shapeBackgroundFill = {
        solidFill: {
          color: { rgbColor: options.fill },
          alpha: options.fillAlpha ?? 1,
        },
      };
      fields.push('shapeBackgroundFill.solidFill.color', 'shapeBackgroundFill.solidFill.alpha');
    }

    if (options.outline) {
      shapeProperties.outline = {
        outlineFill: {
          solidFill: {
            color: { rgbColor: options.outline },
            alpha: options.outlineAlpha ?? 1,
          },
        },
        weight: { magnitude: options.outlineWeight ?? 1, unit: 'PT' },
        dashStyle: options.dashStyle ?? 'SOLID',
      };
      fields.push(
        'outline.outlineFill.solidFill.color',
        'outline.outlineFill.solidFill.alpha',
        'outline.weight',
        'outline.dashStyle'
      );
    } else if (shapeType !== 'TEXT_BOX') {
      shapeProperties.outline = { propertyState: 'NOT_RENDERED' };
      fields.push('outline.propertyState');
    }

    if (options.middleAlign) {
      shapeProperties.contentAlignment = 'MIDDLE';
      fields.push('contentAlignment');
    } else if (options.topAlign) {
      shapeProperties.contentAlignment = 'TOP';
      fields.push('contentAlignment');
    }

    if (fields.length > 0) {
      requests.push({
        updateShapeProperties: {
          objectId,
          shapeProperties,
          fields: fields.join(','),
        },
      });
    }
  }

  if (text.length > 0) {
    requests.push({
      insertText: {
        objectId,
        insertionIndex: 0,
        text,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId,
        textRange: { type: 'ALL' },
        style: {
          fontFamily: options.fontFamily ?? 'Plus Jakarta Sans',
          fontSize: { magnitude: options.fontSize ?? 10, unit: 'PT' },
          bold: Boolean(options.bold),
          foregroundColor: {
            opaqueColor: { rgbColor: options.color ?? TEXT_WHITE },
          },
        },
        fields: 'fontFamily,fontSize,bold,foregroundColor',
      },
    });

    requests.push({
      updateParagraphStyle: {
        objectId,
        textRange: { type: 'ALL' },
        style: { alignment: options.alignCenter ? 'CENTER' : 'START' },
        fields: 'alignment',
      },
    });

    if (
      options.boldPrefixLength &&
      options.boldPrefixLength > 0 &&
      options.boldPrefixLength <= text.length
    ) {
      requests.push({
        updateTextStyle: {
          objectId,
          textRange: {
            type: 'FIXED_RANGE',
            startIndex: 0,
            endIndex: options.boldPrefixLength,
          },
          style: {
            bold: true,
          },
          fields: 'bold',
        },
      });
    }
  }

  return requests;
}

/**
 * Renders either a crisp transparent PNG Medallion image (`createImage`) when hosted at a
 * public HTTPS origin, or a pure-geometry vector Medallion.
 */
function makeMedallionIcon(
  prefix: string,
  pageObjectId: string,
  x: number,
  y: number,
  size: number,
  icon: InfographicIconKey = 'compass',
  accent: 'blue' | 'amber' = 'blue',
  options?: GoogleSlidesBuildOptions
): Record<string, unknown>[] {
  if (options?.iconMode === 'png' && options.assetBaseUrl) {
    const cleanBase = options.assetBaseUrl.replace(/\/+$/, '');
    const pngUrl = `${cleanBase}/assets/icons/medallion-${icon}-${accent}.png`;
    return [
      {
        createImage: {
          objectId: `${prefix}_png`,
          url: pngUrl,
          elementProperties: {
            pageObjectId,
            size: {
              width: { magnitude: size, unit: 'PT' },
              height: { magnitude: size, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: x,
              translateY: y,
              unit: 'PT',
            },
          },
        },
      },
    ];
  }

  const tileSize = Math.round(size * 0.62);
  const tileOffset = Math.round((size - tileSize) / 2);
  const glyphSize = Math.max(6, Math.round(tileSize * 0.48));
  const glyphOffset = Math.round((size - glyphSize) / 2);
  const badgeSize = Math.max(8, Math.round(size * 0.32));
  const badgeOffset = Math.round(size - badgeSize);
  const badgeDotSize = Math.max(3, Math.round(badgeSize * 0.36));
  const badgeDotOffset = badgeOffset + Math.round((badgeSize - badgeDotSize) / 2);

  return [
    ...makeShape(`${prefix}_ring`, pageObjectId, 'ELLIPSE', x, y, size, size, '', {
      fill: MEDALLION_RING,
      fillAlpha: 0.55,
      outline: accent === 'amber' ? AMBER_ACCENT : BORDER_GLASS,
      outlineAlpha: 0.35,
      outlineWeight: 0.75,
    }),
    ...makeShape(
      `${prefix}_tile`,
      pageObjectId,
      'ROUND_RECTANGLE',
      x + tileOffset,
      y + tileOffset,
      tileSize,
      tileSize,
      '',
      {
        fill: MEDALLION_GLASS,
        fillAlpha: 0.58,
        outline: BORDER_GLASS,
        outlineAlpha: 0.52,
        outlineWeight: 0.75,
      }
    ),
    ...makeShape(
      `${prefix}_glyph`,
      pageObjectId,
      getGeometricEmblemShape(icon),
      x + glyphOffset,
      y + glyphOffset,
      glyphSize,
      glyphSize,
      '',
      {
        fill: TEXT_WHITE,
        fillAlpha: 0.92,
      }
    ),
    ...makeShape(
      `${prefix}_badge`,
      pageObjectId,
      'ELLIPSE',
      x + badgeOffset,
      y + badgeOffset,
      badgeSize,
      badgeSize,
      '',
      {
        fill: accent === 'amber' ? AMBER_ACCENT : ELECTRIC_BLUE,
        fillAlpha: 1,
        outline: TEXT_WHITE,
        outlineAlpha: 0.45,
        outlineWeight: 0.6,
      }
    ),
    ...makeShape(
      `${prefix}_bdot`,
      pageObjectId,
      'ELLIPSE',
      x + badgeDotOffset,
      y + badgeDotOffset,
      badgeDotSize,
      badgeDotSize,
      '',
      {
        fill: TEXT_WHITE,
        fillAlpha: 0.95,
      }
    ),
  ];
}

/**
 * Generates Google Slides API v1 batchUpdate requests for all 25 Quifi slides.
 * Widescreen 16:9 canvas is 720pt x 405pt.
 */
export function buildGoogleSlidesBatchUpdate(
  slides: SlideData[],
  metadata: DeckMetadata,
  existingSlideIdsToRemove: string[],
  options?: GoogleSlidesBuildOptions
): Record<string, unknown>[] {
  const requests: Record<string, unknown>[] = [];
  const runPrefix = `quifi_${Date.now().toString(36)}`;

  slides.forEach((slide, index) => {
    const slideId = `${runPrefix}_s${slide.slideNumber}`;
    requests.push({
      createSlide: {
        objectId: slideId,
        insertionIndex: index,
        slideLayoutReference: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    const isTitle = slide.kind === 'title';
    const isMacroHero = slide.kind === 'macro_hero';
    const isChapterDivider = slide.kind === 'chapter_divider';

    // Base abyssal ocean fill
    requests.push({
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: {
            solidFill: { color: { rgbColor: SLIDE_BG } },
          },
        },
        fields: 'pageBackgroundFill.solidFill.color',
      },
    });

    // Layered soft ocean-cobalt & cerulean radial luminance blooms
    requests.push(
      ...makeShape(`${slideId}_glow1`, slideId, 'ELLIPSE', -110, -90, 560, 470, '', {
        fill: GLOW_COBALT,
        fillAlpha: 0.58,
      }),
      ...makeShape(`${slideId}_glow2`, slideId, 'ELLIPSE', -35, -35, 340, 300, '', {
        fill: GLOW_CERULEAN,
        fillAlpha: 0.34,
      })
    );

    // Top & bottom subtle hairline dividers
    requests.push(
      ...makeShape(`${slideId}_toprule`, slideId, 'RECTANGLE', 36, 40, 648, 0.75, '', {
        fill: BORDER_GLASS,
        fillAlpha: 0.22,
      }),
      ...makeShape(`${slideId}_botrule`, slideId, 'RECTANGLE', 36, 379, 648, 0.75, '', {
        fill: BORDER_GLASS,
        fillAlpha: 0.2,
      })
    );

    // Kicker
    requests.push(
      ...makeShape(`${slideId}_kicker`, slideId, 'TEXT_BOX', 36, 18, 460, 18, slide.kicker, {
        fontSize: 9,
        bold: true,
        color: BLUE_ACCENT,
      })
    );

    // Gate label if present
    if (slide.gateLabel && !isChapterDivider) {
      requests.push(
        ...makeShape(`${slideId}_gate`, slideId, 'TEXT_BOX', 490, 18, 194, 18, slide.gateLabel, {
          fontSize: 8.5,
          bold: true,
          color: slide.gateLabel.includes('Week 4') ? AMBER_ACCENT : TEXT_MUTED,
        })
      );
    }

    if (isChapterDivider) {
      if (slide.gateLabel) {
        requests.push(
          ...makeShape(
            `${slideId}_ch_pill`,
            slideId,
            'ROUND_RECTANGLE',
            36,
            96,
            180,
            24,
            slide.gateLabel.toUpperCase(),
            {
              fontSize: 8.5,
              bold: true,
              color: slide.gateLabel.includes('Week 4') ? AMBER_ACCENT : BLUE_ACCENT,
              fill: CARD_BG,
              fillAlpha: 0.85,
              outline: slide.gateLabel.includes('Week 4') ? AMBER_ACCENT : BORDER_GLASS,
              outlineAlpha: 0.6,
              alignCenter: true,
              middleAlign: true,
            }
          )
        );
      }

      requests.push(
        ...makeShape(`${slideId}_title`, slideId, 'TEXT_BOX', 36, 134, 620, 110, slide.title, {
          fontSize: 30,
          bold: true,
          color: TEXT_WHITE,
        }),
        ...makeShape(`${slideId}_ch_rule`, slideId, 'RECTANGLE', 36, 254, 140, 1.5, '', {
          fill: BLUE_ACCENT,
          fillAlpha: 0.75,
        })
      );

      if (slide.storyLead) {
        requests.push(
          ...makeShape(
            `${slideId}_story`,
            slideId,
            'TEXT_BOX',
            36,
            270,
            560,
            48,
            slide.storyLead,
            {
              fontSize: 13,
              color: TEXT_MUTED,
              fontFamily: 'Lora',
            }
          )
        );
      }
    } else {
      // Standard Header Headline
      requests.push(
        ...makeShape(
          `${slideId}_title`,
          slideId,
          'TEXT_BOX',
          36,
          isTitle ? 54 : 44,
          648,
          isTitle ? 66 : 44,
          slide.title,
          {
            fontSize: isTitle ? 30 : isMacroHero ? 22 : 20,
            bold: true,
            color: TEXT_WHITE,
          }
        )
      );

      if (slide.storyLead) {
        requests.push(
          ...makeShape(
            `${slideId}_story`,
            slideId,
            'TEXT_BOX',
            36,
            isTitle ? 124 : 84,
            620,
            32,
            slide.storyLead,
            {
              fontSize: isTitle ? 13 : 10,
              color: TEXT_MUTED,
              fontFamily: 'Lora',
            }
          )
        );
      }

      if (isTitle) {
        const metaText = `${metadata.author} · ${metadata.role} · ${metadata.dateLabel}`;
        requests.push(
          ...makeShape(`${slideId}_meta`, slideId, 'TEXT_BOX', 36, 178, 648, 22, metaText, {
            fontSize: 11,
            bold: true,
            color: TEXT_WHITE,
          })
        );

        if (slide.metrics) {
          slide.metrics.slice(0, 4).forEach((m, mIdx) => {
            const cardX = 36 + mIdx * 165;
            const body = m.context ? `${m.value}\n\n${m.label}\n${m.context}` : `${m.value}\n\n${m.label}`;
            requests.push(
              ...makeShape(
                `${slideId}_m_${mIdx}`,
                slideId,
                'ROUND_RECTANGLE',
                cardX,
                244,
                152,
                102,
                body,
                {
                  fontSize: 10,
                  color: TEXT_WHITE,
                  fill: CARD_BG,
                  fillAlpha: 0.78,
                  outline: BORDER_GLASS,
                  outlineAlpha: 0.28,
                  boldPrefixLength: m.value.length,
                  topAlign: true,
                }
              ),
              ...makeMedallionIcon(
                `${slideId}_mm_${mIdx}`,
                slideId,
                cardX + 114,
                254,
                28,
                m.icon,
                'blue',
                options
              )
            );
          });
        }
      } else if (isMacroHero) {
        const statement = slide.heroStatement ?? '';
        const heroId = `${slideId}_hero`;
        requests.push(
          ...makeShape(
            heroId,
            slideId,
            'TEXT_BOX',
            36,
            116,
            648,
            slide.bullets.length > 0 ? 148 : 228,
            statement,
            {
              fontSize: 20,
              bold: true,
              color: TEXT_WHITE,
              middleAlign: true,
            }
          )
        );
        (slide.heroHighlights ?? []).forEach((phrase, hIdx) => {
          const start = statement.toLowerCase().indexOf(phrase.toLowerCase());
          if (start >= 0) {
            requests.push({
              updateTextStyle: {
                objectId: heroId,
                textRange: {
                  type: 'FIXED_RANGE',
                  startIndex: start,
                  endIndex: start + phrase.length,
                },
                style: {
                  bold: true,
                  foregroundColor: {
                    opaqueColor: { rgbColor: hIdx === 0 ? AMBER_ACCENT : BLUE_ACCENT },
                  },
                },
                fields: 'bold,foregroundColor',
              },
            });
          }
        });
      } else if (slide.kind === 'figma_full' && slide.figmaSlot) {
        const slot = slide.figmaSlot;
        requests.push(
          ...makeShape(`${slideId}_ff_box`, slideId, 'ROUND_RECTANGLE', 36, 102, 648, 266, '', {
            fill: CARD_BG,
            fillAlpha: 0.82,
            outline: BORDER_GLASS,
            outlineAlpha: 0.38,
          })
        );

        if (
          slot.slotTitle !== '12-Week Double Diamond' &&
          slot.slotTitle !== 'Service Blueprint' &&
          slot.slotTitle !== 'Dispute Status & IA Flow' &&
          slot.slotTitle !== 'Chat-to-Record User Flow'
        ) {
          requests.push(
            ...makeShape(
              `${slideId}_ff_hdr`,
              slideId,
              'TEXT_BOX',
              48,
              106,
              624,
              18,
              `${slot.slotTitle} · ${slot.flowSummary}`,
              {
                fontSize: 8.5,
                bold: true,
                color: BLUE_ACCENT,
              }
            )
          );
        }

        if (slot.slotTitle === '12-Week Double Diamond') {
          requests.push(
            ...makeShape(`${slideId}_dd_p1`, slideId, 'TEXT_BOX', 48, 110, 244, 18, 'PHASE 1: FIND THE RIGHT PROBLEM', {
              fontSize: 8.5,
              bold: true,
              color: BLUE_ACCENT,
              alignCenter: true,
            }),
            ...makeShape(`${slideId}_dd_p2`, slideId, 'TEXT_BOX', 428, 110, 244, 18, 'PHASE 2: BUILD THE RIGHT SOLUTION', {
              fontSize: 8.5,
              bold: true,
              color: EMERALD_ACCENT,
              alignCenter: true,
            }),
            ...makeShape(
              `${slideId}_dd_note`,
              slideId,
              'ROUND_RECTANGLE',
              48,
              322,
              624,
              36,
              'Why not a 5-day sprint? Crypto dispute compliance across 100k+ traders requires real workflow validation before engineering writes code.',
              {
                fontSize: 8.5,
                color: AMBER_ACCENT,
                fill: TABLE_ROW_BG,
                fillAlpha: 0.9,
                outline: AMBER_ACCENT,
                outlineAlpha: 0.45,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: 23,
              }
            )
          );
          const blocks = [
            { id: 'd1', x: 48, y: 134, w: 118, h: 174, txt: '1. Discover\nWeeks 1–2\n\nAudit data, shadow agents & test rivals', outline: BORDER_GLASS, amber: false },
            { id: 'd2', x: 174, y: 134, w: 118, h: 174, txt: '2. Define\nWeek 3\n\nMap blueprint, roles & case statuses', outline: BORDER_GLASS, amber: false },
            { id: 'dg', x: 300, y: 178, w: 120, h: 86, txt: 'Week 4 Gate\nFirst Mockups', outline: AMBER_ACCENT, amber: true },
            { id: 'd3', x: 428, y: 134, w: 118, h: 174, txt: '3. Develop\nWeeks 5–8\n\nPrototype, test with staff & stress edge cases', outline: EMERALD_ACCENT, amber: false },
            { id: 'd4', x: 554, y: 134, w: 118, h: 174, txt: '4. Deliver\nWeeks 9–12\n\nSpecs, accessibility & phased beta launch', outline: EMERALD_ACCENT, amber: false },
          ];
          blocks.forEach((b) => {
            requests.push(
              ...makeShape(`${slideId}_${b.id}`, slideId, 'ROUND_RECTANGLE', b.x, b.y, b.w, b.h, b.txt, {
                fontSize: 9,
                color: b.amber ? AMBER_ACCENT : TEXT_WHITE,
                fill: b.amber ? TABLE_HEADER_BG : TABLE_ROW_BG,
                fillAlpha: 0.94,
                outline: b.outline,
                outlineAlpha: 0.7,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: b.txt.split('\n')[0].length,
              })
            );
          });
        } else if (slot.slotTitle === 'Service Blueprint') {
          requests.push(
            ...makeShape(`${slideId}_sb_l1`, slideId, 'TEXT_BOX', 44, 126, 92, 34, 'FRONTSTAGE\nTrader Chatbot', {
              fontSize: 8,
              bold: true,
              color: BLUE_ACCENT,
            }),
            ...makeShape(`${slideId}_sb_f1`, slideId, 'ROUND_RECTANGLE', 142, 122, 166, 40, '1. In-Chat Trigger\nTaps “Report Issue”', {
              fontSize: 8,
              color: TEXT_WHITE,
              fill: TABLE_ROW_BG,
              fillAlpha: 0.92,
              outline: BORDER_GLASS,
              outlineAlpha: 0.6,
              alignCenter: true,
              middleAlign: true,
              boldPrefixLength: 18,
            }),
            ...makeShape(`${slideId}_sb_f2`, slideId, 'ROUND_RECTANGLE', 324, 122, 166, 40, '2. Guided Proof\nUploads receipt in one step', {
              fontSize: 8,
              color: TEXT_WHITE,
              fill: TABLE_ROW_BG,
              fillAlpha: 0.92,
              outline: BORDER_GLASS,
              outlineAlpha: 0.6,
              alignCenter: true,
              middleAlign: true,
              boldPrefixLength: 15,
            }),
            ...makeShape(`${slideId}_sb_f3`, slideId, 'ROUND_RECTANGLE', 506, 122, 166, 40, '3. Live Status Update\nSees clear payout timer', {
              fontSize: 8,
              color: TEXT_WHITE,
              fill: TABLE_ROW_BG,
              fillAlpha: 0.92,
              outline: EMERALD_ACCENT,
              outlineAlpha: 0.7,
              alignCenter: true,
              middleAlign: true,
              boldPrefixLength: 21,
            }),
            ...makeShape(`${slideId}_sb_lov_line`, slideId, 'RECTANGLE', 44, 178, 628, 1, '', {
              fill: AMBER_ACCENT,
              fillAlpha: 0.75,
            }),
            ...makeShape(`${slideId}_sb_lov_lbl`, slideId, 'ROUND_RECTANGLE', 562, 170, 110, 16, 'LINE OF VISIBILITY', {
              fontSize: 7,
              bold: true,
              color: AMBER_ACCENT,
              fill: CARD_BG,
              fillAlpha: 0.96,
              outline: AMBER_ACCENT,
              outlineAlpha: 0.75,
              alignCenter: true,
              middleAlign: true,
            }),
            ...makeShape(`${slideId}_sb_l2`, slideId, 'TEXT_BOX', 44, 206, 92, 34, 'BACKSTAGE\nReviewer Ops', {
              fontSize: 8,
              bold: true,
              color: AMBER_ACCENT,
            }),
            ...makeShape(`${slideId}_sb_b0`, slideId, 'ROUND_RECTANGLE', 142, 198, 166, 56, 'Auto-Triage & Hold\nBot locks escrow & queues case', {
              fontSize: 8,
              color: TEXT_WHITE,
              fill: TABLE_HEADER_BG,
              fillAlpha: 0.92,
              outline: BLUE_ACCENT,
              outlineAlpha: 0.6,
              alignCenter: true,
              middleAlign: true,
              boldPrefixLength: 18,
            }),
            ...makeShape(`${slideId}_sb_b1`, slideId, 'ROUND_RECTANGLE', 324, 198, 166, 56, 'Split-Screen Review\nInspects chat + receipt side-by-side\nEscalation Path: Compliance Hold', {
              fontSize: 7.5,
              color: TEXT_WHITE,
              fill: TABLE_HEADER_BG,
              fillAlpha: 0.92,
              outline: BLUE_ACCENT,
              outlineAlpha: 0.65,
              alignCenter: true,
              middleAlign: true,
              boldPrefixLength: 19,
            }),
            ...makeShape(`${slideId}_sb_b2`, slideId, 'ROUND_RECTANGLE', 506, 198, 166, 56, 'Resolution Action\nReleases funds or issues refund', {
              fontSize: 8,
              color: TEXT_WHITE,
              fill: TABLE_HEADER_BG,
              fillAlpha: 0.92,
              outline: BLUE_ACCENT,
              outlineAlpha: 0.6,
              alignCenter: true,
              middleAlign: true,
              boldPrefixLength: 17,
            }),
            ...makeShape(`${slideId}_sb_l3`, slideId, 'TEXT_BOX', 44, 286, 92, 34, 'SYSTEM LAYER\nAuto-Captured Record', {
              fontSize: 7.5,
              bold: true,
              color: EMERALD_ACCENT,
            }),
            ...makeShape(
              `${slideId}_sb_sys`,
              slideId,
              'ROUND_RECTANGLE',
              142,
              276,
              530,
              58,
              'Auto-Captured Case Record & Locked Audit Trail\nEvery message, Trade ID, receipt, and reviewer decision saves automatically to an uneditable history.',
              {
                fontSize: 8.5,
                color: TEXT_WHITE,
                fill: TABLE_ROW_BG,
                fillAlpha: 0.94,
                outline: EMERALD_ACCENT,
                outlineAlpha: 0.6,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: 46,
              }
            )
          );
        } else if (slot.slotTitle === 'Dispute Status & IA Flow') {
          requests.push(
            ...makeShape(`${slideId}_ia_hdr`, slideId, 'TEXT_BOX', 48, 110, 624, 16, 'REVIEWER WORKSPACE NAVIGATION', {
              fontSize: 8,
              bold: true,
              color: BLUE_ACCENT,
            }),
            ...makeShape(`${slideId}_ia_root`, slideId, 'ROUND_RECTANGLE', 274, 128, 172, 30, 'Dispute Ops Hub', {
              fontSize: 9,
              bold: true,
              color: TEXT_WHITE,
              fill: TABLE_HEADER_BG,
              fillAlpha: 0.95,
              outline: BLUE_ACCENT,
              outlineAlpha: 0.8,
              alignCenter: true,
              middleAlign: true,
            })
          );
          const branches = [
            { id: 'q', x: 76, txt: 'Priority Queues\nCountdown Timer & Owner', outline: BORDER_GLASS },
            { id: 'w', x: 274, txt: 'Split-Screen Case\nTrade ID, Amount & Proof', outline: BORDER_GLASS },
            { id: 'a', x: 472, txt: 'Locked Decision Log\nUneditable History & Export', outline: EMERALD_ACCENT },
          ];
          branches.forEach((b) => {
            requests.push(
              ...makeShape(`${slideId}_iab_${b.id}`, slideId, 'ROUND_RECTANGLE', b.x, 170, 172, 40, b.txt, {
                fontSize: 8,
                color: TEXT_WHITE,
                fill: TABLE_ROW_BG,
                fillAlpha: 0.92,
                outline: b.outline,
                outlineAlpha: 0.65,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: b.txt.split('\n')[0].length,
              })
            );
          });
          requests.push(
            ...makeShape(`${slideId}_ia_div`, slideId, 'RECTANGLE', 48, 222, 624, 1, '', {
              fill: BORDER_GLASS,
              fillAlpha: 0.25,
            }),
            ...makeShape(`${slideId}_ia_lbl`, slideId, 'TEXT_BOX', 48, 230, 624, 16, 'DISPUTE CASE LIFECYCLE', {
              fontSize: 8,
              bold: true,
              color: AMBER_ACCENT,
            })
          );
          const primaryStates = [
            { id: 's1', x: 48, txt: '1. Open\nIntake logged', outline: BORDER_GLASS },
            { id: 's2', x: 274, txt: '2. In Review\nReviewer assigned', outline: BLUE_ACCENT },
            { id: 's3', x: 500, txt: '3. Resolved\nLocked & archived', outline: EMERALD_ACCENT },
          ];
          primaryStates.forEach((st) => {
            requests.push(
              ...makeShape(`${slideId}_ias_${st.id}`, slideId, 'ROUND_RECTANGLE', st.x, 252, 172, 46, st.txt, {
                fontSize: 8.5,
                color: TEXT_WHITE,
                fill: TABLE_ROW_BG,
                fillAlpha: 0.94,
                outline: st.outline,
                outlineAlpha: 0.72,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: st.txt.split('\n')[0].length,
              })
            );
          });
          requests.push(
            ...makeShape(
              `${slideId}_ias_esc`,
              slideId,
              'ROUND_RECTANGLE',
              274,
              314,
              172,
              40,
              'Escalated / Frozen\nRisk tier or Compliance hold',
              {
                fontSize: 8,
                color: AMBER_ACCENT,
                fill: TABLE_HEADER_BG,
                fillAlpha: 0.94,
                outline: AMBER_ACCENT,
                outlineAlpha: 0.75,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: 18,
              }
            )
          );
        } else {
          // Chat-to-Record User Flow (Slide 17) — 2-Row 6-Step Flow
          requests.push(
            ...makeShape(`${slideId}_cr_r1`, slideId, 'TEXT_BOX', 48, 110, 624, 14, 'TRADER SIDE · AUTOMATED CHATBOT INTAKE', {
              fontSize: 8,
              bold: true,
              color: BLUE_ACCENT,
            }),
            ...makeShape(`${slideId}_cr_r2`, slideId, 'TEXT_BOX', 48, 236, 624, 14, 'OPS SIDE · TRIAGE ROUTING & RESOLUTION', {
              fontSize: 8,
              bold: true,
              color: AMBER_ACCENT,
            })
          );
          const flowNodes = [
            { id: 'c1', x: 48, y: 128, txt: '1. Tap “Report Issue”\nIn-chat dispute trigger', outline: BORDER_GLASS },
            { id: 'c2', x: 262, y: 128, txt: '2. Guided Proof Prompt\nUploads receipt + Order ID', outline: BORDER_GLASS },
            { id: 'c3', x: 476, y: 128, txt: '3. Auto-Case & Escrow Lock\nBot creates Case ID & freezes funds', outline: BLUE_ACCENT },
            { id: 'c4', x: 48, y: 254, txt: '4. Smart Triage Check\nRoutine vs. High-Risk?', outline: AMBER_ACCENT },
            { id: 'c5', x: 262, y: 254, txt: '5. Split-Screen Review\nChat, receipt & risk flags in 1 view', outline: BLUE_ACCENT },
            { id: 'c6', x: 476, y: 254, txt: '6. Two-Sided Resolution\nFunds released + live timer pushed to chat', outline: EMERALD_ACCENT },
          ];
          flowNodes.forEach((s) => {
            const lines = s.txt.split('\n');
            requests.push(
              ...makeShape(`${slideId}_cr_${s.id}`, slideId, 'ROUND_RECTANGLE', s.x, s.y, 196, 84, s.txt, {
                fontSize: 8.5,
                color: TEXT_WHITE,
                fill: TABLE_ROW_BG,
                fillAlpha: 0.94,
                outline: s.outline,
                outlineAlpha: 0.8,
                alignCenter: true,
                middleAlign: true,
                boldPrefixLength: lines[0].length,
              })
            );
          });
        }
      } else if (slide.kind === 'method_grid' && slide.infographicSteps) {
        slide.infographicSteps.slice(0, 4).forEach((step, sIdx) => {
          const col = sIdx % 2;
          const row = Math.floor(sIdx / 2);
          const rx = 36 + col * 336;
          const ry = 108 + row * 130;
          const isTeal = sIdx === 3;
          const header = `${step.stepNumber} · ${step.title}`;
          requests.push(
            ...makeShape(
              `${slideId}_mg_${sIdx}`,
              slideId,
              'ROUND_RECTANGLE',
              rx,
              ry,
              312,
              116,
              `\n\n${header}\n${step.caption}`,
              {
                fontSize: 9.5,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.86,
                outline: BORDER_GLASS,
                outlineAlpha: 0.25,
                boldPrefixLength: 2 + header.length,
                topAlign: true,
              }
            ),
            ...makeMedallionIcon(
              `${slideId}_mgm_${sIdx}`,
              slideId,
              rx + 14,
              ry + 12,
              28,
              step.icon,
              isTeal ? 'blue' : 'blue',
              options
            )
          );
        });
      } else if (
        (slide.kind === 'privacy_balance' ||
          slide.kind === 'pain_comparison' ||
          slide.kind === 'benchmark_trio') &&
        slide.bentoCards
      ) {
        slide.bentoCards.slice(0, 2).forEach((card, cIdx) => {
          const bx = 36 + cIdx * 336;
          const isAmber = card.accent === 'amber';
          const isPrivacyBalance = slide.kind === 'privacy_balance';
          const quoteBlock = card.caption ? `\n${card.caption}` : '';
          const header = `${card.eyebrow ?? ''}\n${card.headline}${quoteBlock}`;
          const bulletPrefix = isPrivacyBalance ? (isAmber ? '🔒 ' : '✓ ') : '• ';
          const bodyText = card.items?.length
            ? card.items
                .map((item) =>
                  isPrivacyBalance
                    ? `${bulletPrefix}${item.leadIn} — ${item.text}`
                    : `${bulletPrefix}${item.leadIn}: ${item.text}`
                )
                .join('\n\n')
            : card.caption;
          requests.push(
            ...makeShape(
              `${slideId}_cmp_${cIdx}`,
              slideId,
              'ROUND_RECTANGLE',
              bx,
              108,
              312,
              254,
              `\n\n\n${header}\n\n${bodyText}`,
              {
                fontSize: card.items?.length ? 9.5 : 10,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.85,
                outline: isPrivacyBalance && isAmber ? AMBER_ACCENT : BORDER_GLASS,
                outlineAlpha: isPrivacyBalance && isAmber ? 0.6 : 0.25,
                boldPrefixLength: 3 + (card.eyebrow?.length ?? 0) + 1 + card.headline.length,
                topAlign: true,
              }
            ),
            ...makeMedallionIcon(
              `${slideId}_cmpm_${cIdx}`,
              slideId,
              bx + 16,
              120,
              34,
              isPrivacyBalance
                ? isAmber
                  ? 'lock'
                  : 'eye'
                : slide.kind === 'pain_comparison'
                ? isAmber
                  ? 'alert'
                  : 'search'
                : cIdx === 0
                ? 'clock'
                : 'check',
              isAmber ? 'amber' : 'blue',
              options
            )
          );
        });
      } else if (
        (slide.kind === 'affinity_clusters' ||
          slide.kind === 'persona_trio' ||
          slide.kind === 'kpi_trio') &&
        slide.bentoCards
      ) {
        const isUniformCardSlide =
          slide.kind === 'affinity_clusters' ||
          slide.kind === 'persona_trio' ||
          slide.kind === 'kpi_trio';
        const hasClosingStrip = slide.kind === 'kpi_trio' && Boolean(slide.phaseOutputs?.whyItMatters);
        const cardH = hasClosingStrip ? 216 : 254;
        slide.bentoCards.slice(0, 3).forEach((card, cIdx) => {
          const bx = 36 + cIdx * 222;
          const outlineColor = isUniformCardSlide
            ? BORDER_GLASS
            : card.accent === 'amber'
            ? AMBER_ACCENT
            : card.accent === 'emerald'
            ? EMERALD_ACCENT
            : BORDER_GLASS;
          const statBlock = card.stat ? `${card.stat}\n` : '';
          const itemsBlock =
            card.items && card.items.length > 0
              ? card.items.map((item) => `• ${item.leadIn}: ${item.text}`).join('\n')
              : card.caption;
          const body = `\n\n\n${card.eyebrow ?? ''}\n${statBlock}${card.headline}\n${itemsBlock}`;
          const boldLen =
            3 +
            (card.eyebrow?.length ?? 0) +
            1 +
            statBlock.length +
            card.headline.length;
          const iconKey: InfographicIconKey =
            slide.kind === 'kpi_trio'
              ? cIdx === 0
                ? 'clock'
                : cIdx === 1
                ? 'layers'
                : 'chat'
              : slide.kind === 'affinity_clusters'
              ? cIdx === 0
                ? 'users'
                : cIdx === 1
                ? 'file'
                : 'clock'
              : cIdx === 0
              ? 'chat'
              : cIdx === 1
              ? 'layers'
              : 'shield';

          requests.push(
            ...makeShape(
              `${slideId}_pk_${cIdx}`,
              slideId,
              'ROUND_RECTANGLE',
              bx,
              108,
              204,
              cardH,
              body,
              {
                fontSize: 9.5,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.84,
                outline: outlineColor,
                outlineAlpha: !isUniformCardSlide && card.accent ? 0.6 : 0.28,
                boldPrefixLength: Math.min(boldLen, body.length),
                topAlign: true,
              }
            ),
            ...makeMedallionIcon(
              `${slideId}_pkm_${cIdx}`,
              slideId,
              bx + 14,
              120,
              32,
              iconKey,
              card.accent === 'amber' ? 'amber' : 'blue',
              options
            )
          );
        });
        if (hasClosingStrip && slide.phaseOutputs?.whyItMatters) {
          requests.push(
            ...makeShape(
              `${slideId}_closing`,
              slideId,
              'ROUND_RECTANGLE',
              36,
              334,
              648,
              36,
              slide.phaseOutputs.whyItMatters,
              {
                fontSize: 9,
                bold: true,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.9,
                outline: BORDER_GLASS,
                outlineAlpha: 0.35,
                alignCenter: true,
                middleAlign: true,
              }
            )
          );
        }
      } else if (
        (slide.kind === 'crazy_eights' ||
          slide.kind === 'week4_wireframes' ||
          slide.kind === 'handoff_specs') &&
        slide.bentoCards
      ) {
        const hasSignOffStrip = slide.kind === 'week4_wireframes' && Boolean(slide.phaseOutputs);
        const cardH = hasSignOffStrip ? 216 : 254;
        slide.bentoCards.slice(0, 3).forEach((card, cIdx) => {
          const bx = 36 + cIdx * 222;
          const isUniformGrid =
            slide.kind === 'crazy_eights' ||
            slide.kind === 'week4_wireframes' ||
            slide.kind === 'handoff_specs';
          const outlineColor = isUniformGrid
            ? BORDER_GLASS
            : card.accent === 'amber'
            ? AMBER_ACCENT
            : card.accent === 'emerald'
            ? EMERALD_ACCENT
            : BORDER_GLASS;
          const tagSuffix = card.stat ? ` · ${card.stat}` : '';
          const header = `${card.eyebrow ?? `Card 0${cIdx + 1}`}${tagSuffix}`;
          requests.push(
            ...makeShape(
              `${slideId}_bc_${cIdx}`,
              slideId,
              'ROUND_RECTANGLE',
              bx,
              108,
              204,
              cardH,
              `${header}\n\n\n\n\n\n${card.headline}\n${card.caption}`,
              {
                fontSize: 9,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.84,
                outline: outlineColor,
                outlineAlpha: !isUniformGrid && card.accent ? 0.58 : 0.26,
                boldPrefixLength: header.length,
                topAlign: true,
              }
            ),
            ...makeShape(
              `${slideId}_bcv_${cIdx}`,
              slideId,
              'ROUND_RECTANGLE',
              bx + 12,
              134,
              180,
              78,
              card.headline,
              {
                fontSize: 8.5,
                bold: true,
                color: BLUE_ACCENT,
                fill: TABLE_ROW_BG,
                fillAlpha: 0.92,
                outline: outlineColor,
                outlineAlpha: 0.5,
                dashStyle: slide.kind === 'crazy_eights' ? 'DASH' : 'SOLID',
                alignCenter: true,
                middleAlign: true,
              }
            )
          );
        });
        if (hasSignOffStrip && slide.phaseOutputs) {
          const stripText = `${slide.phaseOutputs.label}: ${slide.phaseOutputs.whyItMatters}`;
          requests.push(
            ...makeShape(
              `${slideId}_signoff`,
              slideId,
              'ROUND_RECTANGLE',
              36,
              334,
              648,
              36,
              stripText,
              {
                fontSize: 8.5,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.9,
                outline: BORDER_GLASS,
                outlineAlpha: 0.35,
                boldPrefixLength: slide.phaseOutputs.label.length + 1,
                middleAlign: true,
              }
            )
          );
        }
      } else if (slide.kind === 'usability_scenario' && slide.infographicSteps) {
        requests.push(
          ...makeShape(
            `${slideId}_us_card`,
            slideId,
            'ROUND_RECTANGLE',
            36,
            108,
            260,
            254,
            `TEST SCENARIO\n\n${slide.heroStatement ?? ''}\n\nWeeks 5–6 · Tested with 5–8 Internal Reviewers`,
            {
              fontSize: 10,
              color: TEXT_WHITE,
              fill: CARD_BG,
              fillAlpha: 0.88,
              outline: BORDER_GLASS,
              outlineAlpha: 0.3,
              boldPrefixLength: 13,
              middleAlign: true,
            }
          )
        );

        slide.infographicSteps.slice(0, 3).forEach((step, sIdx) => {
          const py = 108 + sIdx * 88;
          const header = `${step.title}  ·  ${step.stepNumber}`;
          requests.push(
            ...makeShape(
              `${slideId}_usp_${sIdx}`,
              slideId,
              'ROUND_RECTANGLE',
              312,
              py,
              372,
              78,
              `${header}\n${step.caption}`,
              {
                fontSize: 9.5,
                color: TEXT_WHITE,
                fill: CARD_BG,
                fillAlpha: 0.84,
                outline: BORDER_GLASS,
                outlineAlpha: 0.25,
                boldPrefixLength: step.title.length,
                middleAlign: true,
              }
            ),
            ...makeMedallionIcon(
              `${slideId}_usm_${sIdx}`,
              slideId,
              646,
              py + 25,
              26,
              step.icon,
              sIdx === 1 ? 'amber' : 'blue',
              options
            )
          );
        });
      } else if (slide.kind === 'stress_matrix' && slide.benchmarkTable) {
        const tableId = `${slideId}_st_table`;
        const rowCount = slide.benchmarkTable.rows.length + 1;
        requests.push({
          createTable: {
            objectId: tableId,
            rows: rowCount,
            columns: 3,
            elementProperties: {
              pageObjectId: slideId,
              size: {
                width: { magnitude: 648, unit: 'PT' },
                height: { magnitude: 250, unit: 'PT' },
              },
              transform: {
                scaleX: 1,
                scaleY: 1,
                translateX: 36,
                translateY: 108,
                unit: 'PT',
              },
            },
          },
        });

        slide.benchmarkTable.headers.forEach((header, colIdx) => {
          requests.push(
            {
              updateTableCellProperties: {
                objectId: tableId,
                tableRange: {
                  location: { rowIndex: 0, columnIndex: colIdx },
                  rowSpan: 1,
                  columnSpan: 1,
                },
                tableCellProperties: {
                  tableCellBackgroundFill: {
                    solidFill: { color: { rgbColor: TABLE_HEADER_BG } },
                  },
                },
                fields: 'tableCellBackgroundFill.solidFill.color',
              },
            },
            {
              insertText: {
                objectId: tableId,
                cellLocation: { rowIndex: 0, columnIndex: colIdx },
                text: header,
                insertionIndex: 0,
              },
            },
            {
              updateTextStyle: {
                objectId: tableId,
                cellLocation: { rowIndex: 0, columnIndex: colIdx },
                textRange: { type: 'ALL' },
                style: {
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: { magnitude: 9.5, unit: 'PT' },
                  bold: true,
                  foregroundColor: { opaqueColor: { rgbColor: BLUE_ACCENT } },
                },
                fields: 'fontFamily,fontSize,bold,foregroundColor',
              },
            }
          );
        });

        slide.benchmarkTable.rows.forEach((row, rIdx) => {
          const vals = [row.source, row.observe, row.extract];
          vals.forEach((cellVal, colIdx) => {
            requests.push(
              {
                updateTableCellProperties: {
                  objectId: tableId,
                  tableRange: {
                    location: { rowIndex: rIdx + 1, columnIndex: colIdx },
                    rowSpan: 1,
                    columnSpan: 1,
                  },
                  tableCellProperties: {
                    tableCellBackgroundFill: {
                      solidFill: { color: { rgbColor: TABLE_ROW_BG } },
                    },
                  },
                  fields: 'tableCellBackgroundFill.solidFill.color',
                },
              },
              {
                insertText: {
                  objectId: tableId,
                  cellLocation: { rowIndex: rIdx + 1, columnIndex: colIdx },
                  text: cellVal,
                  insertionIndex: 0,
                },
              },
              {
                updateTextStyle: {
                  objectId: tableId,
                  cellLocation: { rowIndex: rIdx + 1, columnIndex: colIdx },
                  textRange: { type: 'ALL' },
                  style: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: { magnitude: 9, unit: 'PT' },
                    bold: colIdx === 0,
                    foregroundColor: {
                      opaqueColor: {
                        rgbColor: colIdx === 0 ? TEXT_WHITE : colIdx === 1 ? AMBER_ACCENT : BLUE_ACCENT,
                      },
                    },
                  },
                  fields: 'fontFamily,fontSize,bold,foregroundColor',
                },
              }
            );
          });
        });
      } else if (slide.infographicSteps && slide.infographicSteps.length > 0) {
        // bottleneck_flow, flow_three, benchmark_trio, affinity_clusters, rollout_timeline
        const visibleSteps = slide.infographicSteps.slice(0, 3);
        const isPair = visibleSteps.length === 2;
        const isParallelProblems = slide.kind === 'bottleneck_flow';
        visibleSteps.forEach((step, sIdx) => {
          const sx = isPair ? 36 + sIdx * 336 : 36 + sIdx * 222;
          const cardW = isPair ? 312 : 204;
          const outlineColor =
            !isParallelProblems && step.highlight
              ? slide.kind === 'benchmark_trio' || slide.kind === 'rollout_timeline'
                ? EMERALD_ACCENT
                : AMBER_ACCENT
              : BORDER_GLASS;
          const header = `${step.stepNumber} · ${step.title}`;
          if (isParallelProblems) {
            requests.push(
              ...makeShape(
                `${slideId}_trio_${sIdx}`,
                slideId,
                'ROUND_RECTANGLE',
                sx,
                108,
                cardW,
                254,
                `\n\n\n\n\n\n${header}\n\n${step.caption}`,
                {
                  fontSize: 10,
                  color: TEXT_WHITE,
                  fill: CARD_BG,
                  fillAlpha: 0.84,
                  outline: BORDER_GLASS,
                  outlineAlpha: 0.25,
                  boldPrefixLength: 6 + header.length,
                  topAlign: true,
                }
              ),
              ...makeShape(
                `${slideId}_trio_viz_${sIdx}`,
                slideId,
                'ROUND_RECTANGLE',
                sx + 12,
                120,
                cardW - 24,
                92,
                step.stepNumber,
                {
                  fontSize: 9,
                  bold: true,
                  color: BLUE_ACCENT,
                  fill: TABLE_ROW_BG,
                  fillAlpha: 0.9,
                  outline: BORDER_GLASS,
                  outlineAlpha: 0.22,
                  alignCenter: true,
                  middleAlign: true,
                }
              )
            );
          } else {
            requests.push(
              ...makeShape(
                `${slideId}_trio_${sIdx}`,
                slideId,
                'ROUND_RECTANGLE',
                sx,
                108,
                cardW,
                254,
                `\n\n\n\n${header}\n\n${step.caption}`,
                {
                  fontSize: 10,
                  color: TEXT_WHITE,
                  fill: CARD_BG,
                  fillAlpha: 0.84,
                  outline: outlineColor,
                  outlineAlpha: step.highlight ? 0.6 : 0.25,
                  boldPrefixLength: 4 + header.length,
                  topAlign: true,
                }
              ),
              ...makeMedallionIcon(
                `${slideId}_triom_${sIdx}`,
                slideId,
                sx + 16,
                122,
                36,
                step.icon,
                step.highlight && slide.kind !== 'benchmark_trio' && slide.kind !== 'rollout_timeline'
                  ? 'amber'
                  : 'blue',
                options
              )
            );
          }
        });
      }
    }

    // Footer attribution
    requests.push(
      ...makeShape(
        `${slideId}_footer`,
        slideId,
        'TEXT_BOX',
        36,
        382,
        648,
        16,
        `Quifi UX Execution Plan · ${slide.actLabel} · Slide ${slide.slideNumber} of ${slides.length}`,
        {
          fontSize: 7.5,
          color: TEXT_MUTED,
        }
      )
    );
  });

  for (const oldId of existingSlideIdsToRemove) {
    requests.push({
      deleteObject: {
        objectId: oldId,
      },
    });
  }

  return requests;
}

export interface NotesUpdateTarget {
  speakerNotesObjectId: string;
  notesText: string;
}

export function buildSpeakerNotesBatchUpdate(targets: NotesUpdateTarget[]): Record<string, unknown>[] {
  const requests: Record<string, unknown>[] = [];
  for (const target of targets) {
    if (!target.speakerNotesObjectId || !target.notesText.trim()) continue;
    requests.push({
      insertText: {
        objectId: target.speakerNotesObjectId,
        insertionIndex: 0,
        text: target.notesText,
      },
    });
  }
  return requests;
}
