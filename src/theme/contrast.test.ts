import { blendOver, contrastRatio } from './contrast';
import { colors, SCRIM_ALPHA } from './colors';

it('calculates WCAG contrast for black and white', () => {
  expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 1);
  expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2);
});

it('blends alpha over an opaque background and rounds channels', () => {
  expect(blendOver('#000000', '#ffffff', 0.5)).toBe('#808080');
});

const photo = blendOver(colors.surface.base, '#b3b3b3', SCRIM_ALPHA);
const darkSurfaces = ['base', 'DEFAULT', 'sunken', 'section'] as const;
const darkInk = ['ink', 'inkMuted', 'accent', 'accentSoft', 'accentStrong'] as const;
const allowedPairs: [string, string, string][] = [
  ...darkSurfaces.flatMap((surface) =>
    darkInk.map((ink): [string, string, string] => [
      `${ink} on surface-${surface}`,
      colors[ink],
      colors.surface[surface],
    ])
  ),
  ...(['ink', 'inkMuted', 'accent', 'accentSoft'] as const).map(
    (ink): [string, string, string] => [`${ink} on surface-card`, colors[ink], colors.surface.card]
  ),
  ...(['action', 'actionHover'] as const).map(
    (surface): [string, string, string] => [`ink on ${surface}`, colors.ink, colors[surface]]
  ),
  ...(['ink', 'inkMuted', 'accent', 'accentSoft'] as const).map(
    (ink): [string, string, string] => [`${ink} on photo`, colors[ink], photo]
  ),
];

it.each(allowedPairs)('%s meets WCAG AA text contrast', (_name, foreground, background) => {
  expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
});

it('preserves the specified accent contrast margins', () => {
  expect(contrastRatio(colors.accent, photo)).toBeCloseTo(5.87, 2);
  expect(contrastRatio(colors.accentStrong, colors.surface.DEFAULT)).toBeCloseTo(5.57, 2);
});
