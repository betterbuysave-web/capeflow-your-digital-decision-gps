/**
 * TACTICAL NOTEBOOK — the CAPE Youth Edition light skin.
 *
 * Raw hex palette for props that cannot resolve Uniwind classes
 * (icon colors, gradients, navigation tints, status bar, SVG paint).
 *
 * Ratios the palette is built to hold:
 *   70% warm paper neutrals · 20% CAPE Teal structure · 10% CAPE Gold accents,
 *   with P-Magenta and E-Purple reserved for thin accent work only.
 *
 * Every brand colour ships in two tiers, because gold and teal at their locked
 * spec values do not carry AA contrast as small type on cream:
 *   `teal` / `gold`             → depth-corrected, safe for 9–12px text
 *   `tealBright` / `goldBright` → the locked spec values, for rules, borders,
 *                                 fills, icons, rails and display type
 */
export const C = {
  // ── 70% — the paper canvas ────────────────────────────────────────────────
  /** Warm cream base sheet. */
  paper: '#F6F1E3',
  /** Raised paper: headers, tab bar, sticky bars. */
  paper2: '#FBF7EC',
  /** Index-card stock for panels and rows. */
  card: '#FFFDF6',
  /** Fine engineering grid line. */
  grid: '#DBD2BC',
  /** Every fifth grid line. */
  gridBold: '#C7BA97',
  /** Default border on paper. */
  hairline: '#DED6C4',

  // ── Ink — the foreground scale ────────────────────────────────────────────
  /** Primary ink: headings and high-contrast type. */
  ink: '#16232E',
  /** Body ink. */
  inkSoft: '#33434F',
  /** Muted ink: captions, meta, placeholders. */
  inkFaint: '#5E6B77',

  // ── 20% CAPE Teal / 10% CAPE Gold ─────────────────────────────────────────
  /** Text-safe CAPE Teal. */
  teal: '#1F7A6E',
  /** CAPE Teal, spec-locked #2A9D8F — structural lines, borders, rails. */
  tealBright: '#2A9D8F',
  /** Text-safe CAPE Gold. */
  gold: '#806419',
  /** Mid bronze-gold, still text-safe. */
  goldLight: '#9C7C1E',
  /** CAPE Gold, spec-locked #C29B38 — active icons, headings, compass points. */
  goldBright: '#C29B38',

  // ── Sparing accents: thin borders, letter highlights, badge rows ──────────
  /** P-Magenta. */
  magenta: '#A6387E',
  /** E-Purple. */
  purple: '#533B77',

  // ── Semantics, depth-corrected for paper ──────────────────────────────────
  flame: '#C2410C',
  azure: '#1D5FA8',
  amber: '#996515',
  violet: '#6D3BA8',
  lemon: '#7E6318',

  yes: '#0F7A52',
  maybe: '#8A6A0B',
  no: '#B01030',

  // ── M.A.T.C.H. nodes — original hues, depth-corrected for cream ───────────
  modM: '#5F7A21',
  modA: '#3F6874',
  modT: '#A8005D',
  modC: '#7F6F0A',
  modH: '#C2540A',
} as const;

/**
 * Forged teal → gold sweep for every primary action. Kept deep enough that a
 * cream label clears AA across the whole pill.
 */
export const METALLIC: readonly [string, string, ...string[]] = [
  '#1F7A6E',
  '#1B6E63',
  '#155A51',
  '#4E3F10',
  '#7A5F16',
  '#5C4711',
];
export const METALLIC_LOCATIONS: readonly [number, number, ...number[]] = [
  0, 0.18, 0.4, 0.62, 0.84, 1,
];

/** Bright teal → gold rule used under the wordmark and as a section divider. */
export const FORGED_RULE: readonly [string, string, ...string[]] = [
  '#2A9D8F',
  '#1F7A6E',
  '#C29B38',
  '#806419',
];

/** Adds an alpha channel to a 6-digit hex color. */
export function alpha(hex: string, a: number): string {
  const value = Math.round(Math.min(Math.max(a, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${value}`;
}

function channels(hex: string): [number, number, number] {
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw.slice(0, 6);
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ];
}

/** Opaque blend of two hex colors; `t` is how much of `b` to mix in. */
export function mix(a: string, b: string, t: number): string {
  const ratio = Math.min(Math.max(t, 0), 1);
  const [ar, ag, ab] = channels(a);
  const [br, bg, bb] = channels(b);
  const channel = (x: number, y: number) =>
    Math.round(x + (y - x) * ratio)
      .toString(16)
      .padStart(2, '0');
  return `#${channel(ar, br)}${channel(ag, bg)}${channel(ab, bb)}`;
}

/**
 * Tinted paper stock: an opaque card washed with a tint. Opaque on purpose —
 * cards must sit *on* the engineering grid rather than let it bleed through.
 */
export function wash(tint: string, amount = 0.09, base: string = C.card): string {
  return mix(base, tint, amount);
}
