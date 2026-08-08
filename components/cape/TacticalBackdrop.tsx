import { View } from 'react-native';

import { Circle, Path, Svg } from '@/components/ui/primitives/Svg';
import { C, alpha } from '@/lib/colors';

/**
 * Dark navy-to-black starfield with a perspective-warped grid floor.
 * Purely decorative: sits behind screen content and never takes touches.
 */

/** Deterministic pseudo-random so the star field never re-shuffles on re-render. */
function seeded(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function starField(width: number, height: number, count: number) {
  const random = seeded(90210);
  return Array.from({ length: count }, (_, i) => ({
    key: `star-${i}`,
    cx: random() * width,
    cy: random() * height,
    r: 0.5 + random() * 1.3,
    opacity: 0.16 + random() * 0.5,
  }));
}

function floorPath(width: number, height: number, horizon: number): string {
  const depth = height - horizon;
  let d = '';

  // Receding horizontals: spacing grows toward the viewer.
  const rows = 14;
  for (let i = 1; i <= rows; i += 1) {
    const y = horizon + depth * (i / rows) ** 2.25;
    d += `M0 ${y.toFixed(1)} L${width.toFixed(1)} ${y.toFixed(1)} `;
  }

  // Verticals converging on the vanishing point.
  const columns = 11;
  const spread = width * 1.9;
  for (let i = 0; i <= columns; i += 1) {
    const bottomX = width / 2 - spread / 2 + (spread * i) / columns;
    d += `M${(width / 2).toFixed(1)} ${horizon.toFixed(1)} L${bottomX.toFixed(1)} ${height.toFixed(1)} `;
  }

  return d.trim();
}

export function TacticalBackdrop({
  width,
  height,
  tint = C.teal,
}: {
  width: number;
  height: number;
  tint?: string;
}) {
  if (width <= 0 || height <= 0) return null;

  const horizon = Math.round(height * 0.46);
  const stars = starField(width, horizon, 70);

  return (
    <View pointerEvents="none" className="absolute inset-0" style={{ width, height }}>
      <Svg width={width} height={height}>
        {stars.map((star) => (
          <Circle
            key={star.key}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={alpha(C.white, star.opacity)}
          />
        ))}
        <Path
          d={`M0 ${horizon} L${width} ${horizon}`}
          stroke={alpha(tint, 0.28)}
          strokeWidth={1}
          fill="none"
        />
        <Path
          d={floorPath(width, height, horizon)}
          stroke={alpha(tint, 0.09)}
          strokeWidth={1}
          fill="none"
        />
      </Svg>
    </View>
  );
}
