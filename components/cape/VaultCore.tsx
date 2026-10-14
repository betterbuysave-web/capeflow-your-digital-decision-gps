import { useEffect } from 'react';
import { View } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedView } from '@/components/ui/primitives/AnimatedView';
import { Path, Svg } from '@/components/ui/primitives/Svg';
import { Display, Eyebrow, Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';

const SIZE = 188;

function hexPoints(radius: number, cx: number, cy: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((-90 + i * 60) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });
}

function polygon(points: { x: number; y: number }[]): string {
  return `${points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')} Z`;
}

/** One expanding energy signal ring. */
function Pulse({ color, delay, active }: { color: string; delay: number; active: boolean }) {
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = 0;
    p.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 2800, easing: Easing.out(Easing.quad) }), -1, false),
    );
  }, [p, delay]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 0.52 + p.value * 0.82 }],
    opacity: (1 - p.value) * (active ? 0.6 : 0.22),
  }));

  return (
    <AnimatedView
      className="absolute inset-0 rounded-full"
      style={[{ borderWidth: 1, borderColor: color }, style]}
    />
  );
}

/**
 * The vault core: a drafted geodesic shield that inks in solid as ghosts are
 * disarmed, ringed by P-Magenta / CAPE Gold / CAPE Teal signal pulses.
 */
export function VaultCore({
  named,
  disarmed,
  total,
}: {
  named: number;
  disarmed: number;
  total: number;
}) {
  const ratio = total > 0 ? Math.min(disarmed / total, 1) : 0;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const outer = hexPoints(SIZE / 2 - 12, cx, cy);
  const inner = hexPoints((SIZE / 2 - 12) * 0.54, cx, cy);
  const facets = outer
    .map((p, i) => {
      const target = inner[i];
      return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} L${target.x.toFixed(1)} ${target.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <View className="items-center">
      <View style={{ width: SIZE, height: SIZE }} className="items-center justify-center">
        <Pulse color={C.magenta} delay={0} active={named > 0} />
        <Pulse color={C.goldBright} delay={900} active={named > 0} />
        <Pulse color={C.tealBright} delay={1800} active={named > 0} />

        <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
          <Path
            d={polygon(outer)}
            stroke={alpha(C.teal, 0.45 + ratio * 0.5)}
            strokeWidth={1.6}
            fill={alpha(C.tealBright, 0.06 + ratio * 0.18)}
          />
          <Path
            d={facets}
            stroke={alpha(C.teal, 0.18 + ratio * 0.32)}
            strokeWidth={1}
            fill="none"
          />
          <Path
            d={polygon(inner)}
            stroke={alpha(C.gold, 0.35 + ratio * 0.45)}
            strokeWidth={1.2}
            fill={alpha(C.goldBright, 0.05 + ratio * 0.14)}
          />
        </Svg>

        <View className="items-center">
          <Display color={C.teal} className="text-5xl">
            {disarmed}
          </Display>
          <Eyebrow color={C.inkFaint}>DISARMED</Eyebrow>
          <Mono className="mt-1.5 text-[12px]" color={C.inkFaint}>
            {named} named · {total} in range
          </Mono>
        </View>
      </View>
    </View>
  );
}
