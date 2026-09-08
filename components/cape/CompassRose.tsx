import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Circle, Path, Svg } from '@/components/ui/primitives/Svg';
import { Display, Mono } from '@/components/cape/Type';
import { C, alpha, wash } from '@/lib/colors';
import type { CompassNode } from '@/lib/data/compass';

const MARKER = 34;
const CARDINALS = [
  { label: 'N', bearing: 0 },
  { label: 'E', bearing: 90 },
  { label: 'S', bearing: 180 },
  { label: 'W', bearing: 270 },
] as const;

function polar(cx: number, cy: number, radius: number, bearing: number) {
  const a = ((bearing - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
}

/** Radial tick ring; every `majorEvery`-th tick runs longer. */
function ticks(
  cx: number,
  cy: number,
  inner: number,
  outer: number,
  count: number,
  majorEvery: number,
): { minor: string; major: string } {
  let minor = '';
  let major = '';
  for (let i = 0; i < count; i += 1) {
    const bearing = (i / count) * 360;
    const isMajor = i % majorEvery === 0;
    const from = polar(cx, cy, isMajor ? inner - (outer - inner) * 0.8 : inner, bearing);
    const to = polar(cx, cy, outer, bearing);
    const seg = `M${from.x.toFixed(1)} ${from.y.toFixed(1)} L${to.x.toFixed(1)} ${to.y.toFixed(1)} `;
    if (isMajor) major += seg;
    else minor += seg;
  }
  return { minor: minor.trim(), major: major.trim() };
}

/** Eight-point star: `long` points on the cardinals, `short` on the diagonals. */
function starPath(cx: number, cy: number, tip: number, waist: number, offset: number): string {
  let d = '';
  for (let i = 0; i < 4; i += 1) {
    const bearing = offset + i * 90;
    const point = polar(cx, cy, tip, bearing);
    const left = polar(cx, cy, waist, bearing - 45);
    const right = polar(cx, cy, waist, bearing + 45);
    d +=
      `M${cx.toFixed(1)} ${cy.toFixed(1)} L${left.x.toFixed(1)} ${left.y.toFixed(1)} ` +
      `L${point.x.toFixed(1)} ${point.y.toFixed(1)} L${right.x.toFixed(1)} ${right.y.toFixed(1)} Z `;
  }
  return d.trim();
}

/** Flat-topped cog outline for the rose hub. */
function hubGear(cx: number, cy: number, radius: number, teeth: number): string {
  const step = 360 / teeth;
  const root = radius * 0.78;
  const at = (r: number, b: number) => {
    const p = polar(cx, cy, r, b);
    return `${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  };
  let d = `M${at(root, 0)}`;
  for (let i = 0; i < teeth; i += 1) {
    const b = i * step;
    d += ` L${at(radius, b + step * 0.18)}`;
    d += ` L${at(radius, b + step * 0.36)}`;
    d += ` L${at(root, b + step * 0.54)}`;
    d += ` L${at(root, b + step)}`;
  }
  return `${d} Z`;
}

/**
 * The drafted M.A.T.C.H. compass rose: a blueprint dial with a cog hub and one
 * tappable node marker per letter, sitting on the ring at its bearing.
 */
export function CompassRose({
  nodes,
  onSelect,
}: {
  nodes: CompassNode[];
  onSelect: (id: CompassNode['id']) => void;
}) {
  const [width, setWidth] = useState(0);
  const height = width > 0 ? Math.round(width * 0.74) : 0;

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(0, Math.min(width * 0.33, height / 2 - MARKER * 0.78));

  const ring = radius > 0 ? ticks(cx, cy, radius * 0.86, radius * 0.94, 72, 9) : null;

  return (
    <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)} style={{ height }}>
      {width > 0 && radius > 0 ? (
        <>
          <Svg width={width} height={height}>
            {/* Construction axes. */}
            <Path
              d={
                `M${(cx - radius * 1.22).toFixed(1)} ${cy.toFixed(1)} L${(cx + radius * 1.22).toFixed(1)} ${cy.toFixed(1)} ` +
                `M${cx.toFixed(1)} ${(cy - radius * 1.22).toFixed(1)} L${cx.toFixed(1)} ${(cy + radius * 1.22).toFixed(1)}`
              }
              stroke={alpha(C.ink, 0.1)}
              strokeWidth={0.6}
              fill="none"
            />

            {/* Leader lines out to each node marker. */}
            {nodes.map((node) => {
              const to = polar(cx, cy, radius, node.bearing);
              return (
                <Path
                  key={`leader-${node.id}`}
                  d={`M${cx.toFixed(1)} ${cy.toFixed(1)} L${to.x.toFixed(1)} ${to.y.toFixed(1)}`}
                  stroke={alpha(node.color, 0.3)}
                  strokeWidth={0.8}
                  fill="none"
                />
              );
            })}

            {/* Dial rings. */}
            <Circle
              cx={cx}
              cy={cy}
              r={radius}
              stroke={alpha(C.tealBright, 0.55)}
              strokeWidth={1.3}
              fill="none"
            />
            <Circle
              cx={cx}
              cy={cy}
              r={radius * 0.94}
              stroke={alpha(C.teal, 0.3)}
              strokeWidth={0.7}
              fill="none"
            />
            <Circle
              cx={cx}
              cy={cy}
              r={radius * 0.86}
              stroke={alpha(C.teal, 0.3)}
              strokeWidth={0.7}
              fill="none"
            />
            {ring ? (
              <>
                <Path
                  d={ring.minor}
                  stroke={alpha(C.inkFaint, 0.35)}
                  strokeWidth={0.6}
                  fill="none"
                />
                <Path
                  d={ring.major}
                  stroke={alpha(C.goldBright, 0.75)}
                  strokeWidth={0.9}
                  fill="none"
                />
              </>
            ) : null}

            {/* Star rose: teal diagonals behind gold cardinals. */}
            <Path
              d={starPath(cx, cy, radius * 0.56, radius * 0.15, 45)}
              stroke={alpha(C.teal, 0.5)}
              strokeWidth={0.8}
              fill={alpha(C.tealBright, 0.1)}
            />
            <Path
              d={starPath(cx, cy, radius * 0.78, radius * 0.19, 0)}
              stroke={alpha(C.gold, 0.6)}
              strokeWidth={1}
              fill={alpha(C.goldBright, 0.16)}
            />

            {/* Cog hub. */}
            <Path
              d={hubGear(cx, cy, radius * 0.2, 12)}
              stroke={alpha(C.gold, 0.65)}
              strokeWidth={0.9}
              fill={C.card}
            />
            <Circle
              cx={cx}
              cy={cy}
              r={radius * 0.08}
              stroke={alpha(C.tealBright, 0.7)}
              strokeWidth={1}
              fill={alpha(C.tealBright, 0.14)}
            />
          </Svg>

          {/* Cardinal labels, printed just inside the tick ring. */}
          {CARDINALS.map((cardinal) => {
            const p = polar(cx, cy, radius * 0.7, cardinal.bearing);
            return (
              <View
                key={cardinal.label}
                pointerEvents="none"
                className="absolute h-4 w-4 items-center justify-center"
                style={{ left: p.x - 8, top: p.y - 8 }}
              >
                <Mono bold className="text-[8px]" color={alpha(C.inkFaint, 0.9)}>
                  {cardinal.label}
                </Mono>
              </View>
            );
          })}

          {/* Node markers. */}
          {nodes.map((node) => {
            const p = polar(cx, cy, radius, node.bearing);
            return (
              <Pressable
                key={node.id}
                accessibilityRole="button"
                accessibilityLabel={`${node.letter} — ${node.callsign}`}
                onPress={() => onSelect(node.id)}
                className="absolute items-center justify-center rounded-full active:opacity-70"
                style={{
                  left: p.x - MARKER / 2,
                  top: p.y - MARKER / 2,
                  width: MARKER,
                  height: MARKER,
                  backgroundColor: wash(node.color, 0.16),
                  borderWidth: 1.2,
                  borderColor: alpha(node.color, 0.7),
                }}
              >
                <Display color={node.color} className="text-lg">
                  {node.letter}
                </Display>
              </Pressable>
            );
          })}
        </>
      ) : null}
    </View>
  );
}
