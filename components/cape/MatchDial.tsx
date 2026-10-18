import { useId } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

/**
 * M.A.T.C.H. node dial — the single badge used anywhere a node letter appears.
 *
 * A bezel-style instrument dial: cream halo, metallic ring in the node's
 * spec-locked hue with tick marks, a deep-shade face, an outlined Bebas Neue
 * letter, and a pointer chevron at twelve o'clock.
 */

/** Spec-locked M.A.T.C.H. hues (shared with the HARNESS adult track). */
export const MATCH_SPEC: Record<string, string> = {
  M: '#90B14B',
  A: '#6E99A3',
  T: '#A8005D',
  C: '#DFC401',
  H: '#FF751F',
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(hex: string, target: string, t: number) {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  const out = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `#${out.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const INK = '#16232E';
const CREAM = '#FBF7EC';
const WHITE = '#FFFFFF';

export function MatchDial({
  letter,
  color,
  size = 48,
  style,
}: {
  letter: string;
  /** Optional override; defaults to the spec hue for the letter. */
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const key = letter.toUpperCase();
  const base = MATCH_SPEC[key] ?? color ?? '#2A9D8F';

  const ringHi = mix(base, WHITE, 0.32);
  const ringLo = mix(base, INK, 0.22);
  const halo = mix(base, CREAM, 0.6);
  const faceHi = mix(base, '#000000', 0.48);
  const faceLo = mix(base, '#000000', 0.66);
  const edge = mix(base, '#000000', 0.55);

  // Tick marks: 24 minor, 3 major (left, right, bottom); top carries the pointer.
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          shadowColor: INK,
          shadowOpacity: 0.22,
          shadowRadius: size * 0.08,
          shadowOffset: { width: 0, height: size * 0.04 },
          elevation: 3,
        },
        style,
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id={`ring${uid}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ringHi} />
            <Stop offset="0.55" stopColor={base} />
            <Stop offset="1" stopColor={ringLo} />
          </LinearGradient>
          <RadialGradient id={`face${uid}`} cx="50" cy="42" r="40" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={faceHi} />
            <Stop offset="1" stopColor={faceLo} />
          </RadialGradient>
        </Defs>

        {/* Cream halo + tinted rim */}
        <Circle cx="50" cy="50" r="48.5" fill={CREAM} stroke={halo} strokeWidth="1.5" />

        {/* Metallic bezel */}
        <Circle cx="50" cy="50" r="44" fill={`url(#ring${uid})`} stroke={edge} strokeWidth="1" />

        {/* Tick ring */}
        <G>
          {ticks.map((deg) => {
            if (deg === 0) return null;
            const major = deg % 90 === 0;
            return (
              <Rect
                key={deg}
                x={major ? 48.4 : 49.3}
                y={major ? 7.5 : 8.5}
                width={major ? 3.2 : 1.4}
                height={major ? 7 : 4.5}
                rx={0.6}
                fill={major ? WHITE : ringHi}
                opacity={major ? 0.95 : 0.7}
                transform={`rotate(${deg} 50 50)`}
              />
            );
          })}
        </G>

        {/* Face */}
        <Circle cx="50" cy="50" r="33" fill={edge} />
        <Circle cx="50" cy="50" r="31.5" fill={`url(#face${uid})`} />
        <Circle cx="50" cy="50" r="31.5" fill="none" stroke={base} strokeOpacity={0.35} strokeWidth="1" />

        {/* Pointer chevron at twelve o'clock */}
        <Path
          d="M41 5 L50 15 L59 5"
          fill={ringHi}
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Letter: outline pass, then fill */}
        <SvgText
          x="50"
          y="66"
          textAnchor="middle"
          fontFamily="BebasNeue_400Regular"
          fontSize="48"
          fill={INK}
          stroke={INK}
          strokeWidth="6"
          strokeLinejoin="round"
        >
          {key}
        </SvgText>
        <SvgText
          x="50"
          y="66"
          textAnchor="middle"
          fontFamily="BebasNeue_400Regular"
          fontSize="48"
          fill={WHITE}
        >
          {key}
        </SvgText>
      </Svg>
    </View>
  );
}
