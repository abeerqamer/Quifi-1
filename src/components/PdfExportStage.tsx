import React from 'react';
import { DeckMetadata, SlideData } from '../types/deck';
import { SlideCanvas } from './SlideCanvas';
import {
  PDF_EXPORT_BACKGROUND,
  PDF_EXPORT_BASE_HEIGHT,
  PDF_EXPORT_BASE_WIDTH,
  PDF_EXPORT_HEIGHT,
  PDF_EXPORT_SCALE,
  PDF_EXPORT_WIDTH,
} from '../utils/pdfExport';

interface PdfExportStageProps {
  slides: SlideData[];
  metadata: DeckMetadata;
  figmaPreviews: Record<number, string>;
  slideRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
}

export const PdfExportStage: React.FC<PdfExportStageProps> = ({
  slides,
  metadata,
  figmaPreviews,
  slideRefs,
}) => {
  return (
    <div
      aria-hidden="true"
      data-testid="pdf-export-stage"
      style={{
        position: 'fixed',
        left: '-10000px',
        top: 0,
        width: `${PDF_EXPORT_WIDTH}px`,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => {
            slideRefs.current[index] = el;
          }}
          data-export-slide={slide.slideNumber}
          style={{
            position: 'relative',
            width: `${PDF_EXPORT_WIDTH}px`,
            height: `${PDF_EXPORT_HEIGHT}px`,
            backgroundColor: PDF_EXPORT_BACKGROUND,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${PDF_EXPORT_BASE_WIDTH}px`,
              height: `${PDF_EXPORT_BASE_HEIGHT}px`,
              transform: `scale(${PDF_EXPORT_SCALE})`,
              transformOrigin: 'top left',
            }}
          >
            <SlideCanvas
              slide={slide}
              totalSlides={slides.length}
              metadata={metadata}
              figmaPreviewUrl={figmaPreviews[slide.slideNumber]}
              exportMode
            />
          </div>
        </div>
      ))}
    </div>
  );
};
