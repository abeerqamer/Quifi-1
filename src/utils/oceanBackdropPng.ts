/**
 * Renders the signature 1920x1080 Quifi ocean-cobalt radial gradient + subtle
 * halftone dot matrix to a PNG data URL so users can optionally apply it as
 * their Google Slides Master Theme background image.
 */
export function renderOceanBackdropDataUrl(width = 1920, height = 1080): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Base linear gradient
  const baseGrad = ctx.createLinearGradient(0, 0, width, height);
  baseGrad.addColorStop(0, '#0B3C72');
  baseGrad.addColorStop(0.56, '#051836');
  baseGrad.addColorStop(1, '#020B1B');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Upper-left luminous sapphire-cerulean radial glow
  const radial = ctx.createRadialGradient(
    width * 0.18,
    height * 0.36,
    0,
    width * 0.18,
    height * 0.36,
    width * 0.78
  );
  radial.addColorStop(0, 'rgba(44, 134, 198, 0.56)');
  radial.addColorStop(0.38, 'rgba(18, 72, 136, 0.38)');
  radial.addColorStop(0.76, 'rgba(6, 26, 58, 0.78)');
  radial.addColorStop(1, 'rgba(3, 14, 34, 0.92)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, width, height);

  // Subtle halftone dot matrix masked toward bottom-right
  const spacing = 22;
  for (let y = 14; y < height; y += spacing) {
    for (let x = 14; x < width; x += spacing) {
      const dx = x / width - 0.85;
      const dy = y / height - 0.82;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const strength = Math.max(0, 1 - dist / 0.75);
      if (strength <= 0.05) continue;
      ctx.fillStyle = `rgba(186, 230, 253, ${(0.14 * strength).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return canvas.toDataURL('image/png');
}

export function downloadOceanBackdropPng(): void {
  const dataUrl = renderOceanBackdropDataUrl();
  if (!dataUrl) return;
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'quifi-ocean-cobalt-backdrop-16x9.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
