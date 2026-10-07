import { useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { Circle, Path, Svg } from '@/components/ui/primitives/Svg';
import { C, alpha, mix } from '@/lib/colors';

/**
 * TACTICAL NOTEBOOK backdrop.
 *
 * A warm cream sheet with a precise engineering grid, faint paper speckle, and
 * blueprint margin furniture — drafting circles, gear vectors, registration
 * crosshairs and dimension lines. Reads as a physics workbook or a power-suit
 * blueprint, never as clip-art.
 *
 * Purely decorative: sits behind screen content and never takes touches.
 * Self-sizing, so screens mount it with no props.
 */

/** Deterministic pseudo-random so the paper grain never re-shuffles on re-render. */
function seeded(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const CELL = 22;
const MAJOR_EVERY = 5;

function gridPaths(width: number, height: number): { minor: string; major: string } {
  let minor = '';
  let major = '';

  const columns = Math.ceil(width / CELL);
  for (let i = 0; i <= columns; i += 1) {
    const x = (i * CELL).toFixed(1);
    const line = `M${x} 0 L${x} ${height.toFixed(1)} `;
    if (i % MAJOR_EVERY === 0) major += line;
    else minor += line;
  }

  const rows = Math.ceil(height / CELL);
  for (let i = 0; i <= rows; i += 1) {
    const y = (i * CELL).toFixed(1);
    const line = `M0 ${y} L${width.toFixed(1)} ${y} `;
    if (i % MAJOR_EVERY === 0) major += line;
    else minor += line;
  }

  return { minor: minor.trim(), major: major.trim() };
}

/** Paper fibre: sparse warm specks so the cream never looks like flat #fff. */
function speckle(width: number, height: number, count: number) {
  const random = seeded(31337);
  return Array.from({ length: count }, (_, i) => ({
    key: `fibre-${i}`,
    cx: random() * width,
    cy: random() * height,
    r: 0.4 + random() * 0.9,
    opacity: 0.05 + random() * 0.09,
  }));
}

/** Radial tick marks around a drafting circle. */
function tickRing(cx: number, cy: number, inner: number, outer: number, count: number): string {
  let d = '';
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    d += `M${(cx + inner * cos).toFixed(1)} ${(cy + inner * sin).toFixed(1)} L${(cx + outer * cos).toFixed(1)} ${(cy + outer * sin).toFixed(1)} `;
  }
  return d.trim();
}

/** Involute-ish cog outline: flat-topped teeth around a hub. */
function gearPath(cx: number, cy: number, radius: number, teeth: number, depth: number): string {
  const step = (Math.PI * 2) / teeth;
  const root = radius - depth;
  const at = (r: number, a: number) =>
    `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;

  let d = `M${at(root, 0)}`;
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step;
    d += ` L${at(radius, a + step * 0.16)}`;
    d += ` L${at(radius, a + step * 0.34)}`;
    d += ` L${at(root, a + step * 0.5)}`;
    d += ` L${at(root, a + step)}`;
  }
  return `${d} Z`;
}

/** Registration crosshair, as used to align a print plate. */
function crosshair(cx: number, cy: number, arm: number): string {
  return (
    `M${(cx - arm).toFixed(1)} ${cy.toFixed(1)} L${(cx + arm).toFixed(1)} ${cy.toFixed(1)} ` +
    `M${cx.toFixed(1)} ${(cy - arm).toFixed(1)} L${cx.toFixed(1)} ${(cy + arm).toFixed(1)}`
  );
}

/** Dimension line with end serifs, drawn down the left margin. */
function dimensionLine(x: number, top: number, bottom: number, serif: number): string {
  return (
    `M${x} ${top} L${x} ${bottom} ` +
    `M${x - serif} ${top} L${x + serif} ${top} ` +
    `M${x - serif} ${bottom} L${x + serif} ${bottom}`
  );
}

export function NotebookBackdrop({ tint = C.tealBright }: { tint?: string }) {
  const { width, height } = useWindowDimensions();

  const art = useMemo(() => {
    if (width <= 0 || height <= 0) return null;

    const grid = gridPaths(width, height);
    const fibres = speckle(width, height, 110);

    // Drafting assembly bleeding off the top-right margin.
    const dialX = width + 46;
    const dialY = Math.round(height * 0.16);
    const dialR = Math.max(96, Math.round(width * 0.34));

    // Cog vector bleeding off the bottom-left margin.
    const cogX = -30;
    const cogY = Math.round(height * 0.84);
    const cogR = Math.max(74, Math.round(width * 0.24));

    return {
      grid,
      fibres,
      dial: {
        x: dialX,
        y: dialY,
        r: dialR,
        ticks: tickRing(dialX, dialY, dialR * 0.66, dialR * 0.74, 36),
      },
      cog: {
        x: cogX,
        y: cogY,
        r: cogR,
        outline: gearPath(cogX, cogY, cogR, 14, cogR * 0.17),
      },
      marks: [
        crosshair(30, 30, 9),
        crosshair(width - 30, 30, 9),
        crosshair(30, height - 30, 9),
        crosshair(width - 30, height - 30, 9),
      ].join(' '),
      dims: dimensionLine(12, Math.round(height * 0.32), Math.round(height * 0.62), 4),
      construction:
        `M0 ${Math.round(height * 0.5)} L${width} ${Math.round(height * 0.5)} ` +
        `M${Math.round(width * 0.5)} 0 L${Math.round(width * 0.5)} ${height}`,
    };
  }, [width, height]);

  if (!art) return null;

  const fibreColor = mix(C.grid, C.ink, 0.4);

  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      aria-hidden
      className="absolute inset-0"
      style={{ backgroundColor: C.paper }}
    >
      <Svg width={width} height={height}>
        {/* Engineering grid: fine cells with a heavier line every fifth. */}
        <Path d={art.grid.minor} stroke={alpha(C.grid, 0.85)} strokeWidth={0.5} fill="none" />
        <Path d={art.grid.major} stroke={alpha(C.gridBold, 0.9)} strokeWidth={0.8} fill="none" />

        {/* Construction centrelines — the sheet's own axes. */}
        <Path d={art.construction} stroke={alpha(tint, 0.07)} strokeWidth={0.6} fill="none" />

        {/* Paper fibre. */}
        {art.fibres.map((f) => (
          <Circle key={f.key} cx={f.cx} cy={f.cy} r={f.r} fill={alpha(fibreColor, f.opacity)} />
        ))}

        {/* Drafting dial, top-right margin. */}
        <Circle
          cx={art.dial.x}
          cy={art.dial.y}
          r={art.dial.r}
          stroke={alpha(tint, 0.16)}
          strokeWidth={1}
          fill="none"
        />
        <Circle
          cx={art.dial.x}
          cy={art.dial.y}
          r={art.dial.r * 0.74}
          stroke={alpha(tint, 0.11)}
          strokeWidth={0.7}
          fill="none"
        />
        <Circle
          cx={art.dial.x}
          cy={art.dial.y}
          r={art.dial.r * 0.42}
          stroke={alpha(C.goldBright, 0.16)}
          strokeWidth={0.8}
          fill="none"
        />
        <Path d={art.dial.ticks} stroke={alpha(tint, 0.14)} strokeWidth={0.7} fill="none" />

        {/* Cog vector, bottom-left margin. */}
        <Path
          d={art.cog.outline}
          stroke={alpha(tint, 0.15)}
          strokeWidth={1}
          fill={alpha(tint, 0.02)}
        />
        <Circle
          cx={art.cog.x}
          cy={art.cog.y}
          r={art.cog.r * 0.4}
          stroke={alpha(C.goldBright, 0.18)}
          strokeWidth={0.8}
          fill="none"
        />
        <Circle
          cx={art.cog.x}
          cy={art.cog.y}
          r={art.cog.r * 0.16}
          stroke={alpha(tint, 0.16)}
          strokeWidth={0.7}
          fill="none"
        />

        {/* Margin furniture. */}
        <Path d={art.marks} stroke={alpha(tint, 0.2)} strokeWidth={0.8} fill="none" />
        <Path d={art.dims} stroke={alpha(C.goldBright, 0.22)} strokeWidth={0.8} fill="none" />
      </Svg>
    </View>
  );
}
