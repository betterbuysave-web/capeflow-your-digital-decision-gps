/**
 * Raw hex palette for props that cannot resolve Uniwind classes
 * (icon colors, gradients, navigation tints, status bar).
 */
export const C = {
  ink: '#050508',
  ink2: '#0b0b14',
  card: '#0f0f1a',
  hairline: '#1c1c2b',

  teal: '#00ffcc',
  tealDim: '#00c4a8',
  gold: '#d4af37',
  goldLight: '#f7e9a0',
  flame: '#ff4d00',
  azure: '#0088ff',
  amber: '#f59e0b',
  violet: '#cc44ff',
  lemon: '#ffcc00',

  yes: '#00d084',
  maybe: '#ffd500',
  no: '#e8003d',

  modM: '#90b14b',
  modA: '#6e99a3',
  modT: '#a8005d',
  modC: '#dfc401',
  modH: '#ff751f',

  white: '#ffffff',
  slateSoft: '#cbd5e1',
  slateFaint: '#94a3b8',
} as const;

/** Metallic teal → gold sweep used for every primary action on the site. */
export const METALLIC: readonly [string, string, ...string[]] = [
  '#8ffff0',
  '#00ffcc',
  '#00c4a8',
  '#d4af37',
  '#f7e9a0',
  '#b8860b',
];
export const METALLIC_LOCATIONS: readonly [number, number, ...number[]] = [
  0, 0.2, 0.38, 0.58, 0.75, 1,
];

/** Adds an alpha channel to a 6-digit hex color. */
export function alpha(hex: string, a: number): string {
  const value = Math.round(Math.min(Math.max(a, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${value}`;
}
