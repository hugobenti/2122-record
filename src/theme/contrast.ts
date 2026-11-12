const channels = (hex: string): number[] => [1, 3, 5].map((position) =>
  parseInt(hex.slice(position, position + 2), 16)
);

const luminance = (hex: string): number => {
  const [red, green, blue] = channels(hex).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return red * 0.2126 + green * 0.7152 + blue * 0.0722;
};

export const contrastRatio = (foreground: string, background: string): number => {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

export const blendOver = (top: string, bottom: string, alpha: number): string => {
  const background = channels(bottom);
  return `#${channels(top).map((channel, index) =>
    Math.round(channel * alpha + background[index] * (1 - alpha))
      .toString(16).padStart(2, '0')
  ).join('')}`;
};
