import { useEffect, useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

/**
 * TACTICAL NOTEBOOK canvas — the CAPE Flow background.
 *
 * Cream engineering graph paper (#FDFBF7, 20px cells, heavier line every
 * 100px) drawn with the exact CAPE hexes as accents:
 *   C Teal #2A9D8F — heartbeat trace, cog, compass tick ring, schematic traces
 *   A Gold #C29B38 — compass rose points, registration marks
 *   P Magenta #A6387E — notebook margin rule, trace pads
 *   E Purple #533B77 — small cog, trace pads
 * A slowly turning drafting cog sits top right, the compass rose bottom left.
 *
 * Purely decorative: sits behind screen content and never takes touches.
 * `tint` is accepted for older call sites but no longer changes the canvas,
 * so every CAPE screen reads as one notebook.
 */

const PAPER = '#FDFBF7';
const GRID_MAJOR = '#E7DCC4';
const GRID_MINOR = '#F1EBDD';

// Exact CAPE hexes; strength comes from stroke/fill opacity, never a washed hex.
const CAPE_C = '#2A9D8F';
const CAPE_A = '#C29B38';
const CAPE_P = '#A6387E';
const CAPE_E = '#533B77';
const LINE = 1.5;

const MINOR = 20;
const MAJOR = 100;

function gridPaths(width: number, height: number) {
  let minor = '';
  let major = '';
  for (let x = 0; x <= width; x += MINOR) {
    const line = `M${x} 0V${height}`;
    if (x % MAJOR === 0) major += line;
    else minor += line;
  }
  for (let y = 0; y <= height; y += MINOR) {
    const line = `M0 ${y}H${width}`;
    if (y % MAJOR === 0) major += line;
    else minor += line;
  }
  return { minor, major };
}

/** Square-toothed gear outline + dashed pitch circle (400×400 art space). */
function gear(cx: number, cy: number, r: number, teeth: number, depth: number) {
  const n = teeth * 4;
  let d = '';
  for (let i = 0; i < n; i += 1) {
    const a = (2 * Math.PI * i) / n;
    const rr = i % 4 === 0 || i % 4 === 1 ? r : r - depth;
    d += `${i === 0 ? 'M' : 'L'}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`;
  }
  return `${d}Z`;
}

/** Eight-point compass rose: star polygons (gold) + tick ring (teal). */
function rose(cx: number, cy: number, R: number) {
  let star = '';
  for (let k = 0; k < 8; k += 1) {
    const a = (Math.PI / 4) * k - Math.PI / 2;
    const L = k % 2 === 0 ? R : R * 0.55;
    const w = R * 0.12;
    const tip = [cx + L * Math.cos(a), cy + L * Math.sin(a)];
    const l = [cx + w * Math.cos(a - Math.PI / 2), cy + w * Math.sin(a - Math.PI / 2)];
    const rt = [cx + w * Math.cos(a + Math.PI / 2), cy + w * Math.sin(a + Math.PI / 2)];
    star += `M${l[0].toFixed(1)} ${l[1].toFixed(1)}L${tip[0].toFixed(1)} ${tip[1].toFixed(1)}L${rt[0].toFixed(1)} ${rt[1].toFixed(1)}L${cx} ${cy}Z`;
  }
  let ticks = '';
  for (let k = 0; k < 72; k += 1) {
    const a = (2 * Math.PI * k) / 72;
    const r1 = R * 1.12;
    const r2 = R * (k % 9 === 0 ? 1.2 : 1.16);
    ticks += `M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)}L${(cx + r2 * Math.cos(a)).toFixed(1)} ${(cy + r2 * Math.sin(a)).toFixed(1)}`;
  }
  return { star, ticks };
}

/** Heartbeat trace, like the line through the CAPE Flow logo (1000×80 art space). */
const PULSE =
  'M0 40H300L318 40L330 18L344 64L360 6L376 74L390 40H560L574 40L584 26L596 54L608 40H1000';

const COG_A = gear(200, 200, 150, 16, 22);
const COG_B = gear(352, 352, 70, 10, 14);
const ROSE = rose(200, 200, 140);
const SCHEM = 'M0 60H180V150H340V40H600M60 300V200H260V260H600';

export function NotebookBackdrop(_props: { tint?: string } = {}) {
  const { width, height } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const spin = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) {
      cancelAnimation(spin);
      return;
    }
    spin.value = withRepeat(
      withTiming(360, { duration: 120000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => cancelAnimation(spin);
  }, [reduceMotion, spin]);

  const cogStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));

  const grid = useMemo(
    () => (width > 0 && height > 0 ? gridPaths(Math.ceil(width), Math.ceil(height)) : null),
    [width, height],
  );
  if (!grid) return null;

  // Same placement rules as the website canvas (vw / vh based).
  const vw = width / 100;
  const vh = height / 100;
  const cogW = Math.min(52 * vw, 420);
  const roseW = Math.min(60 * vw, 460);
  const schemW = Math.min(70 * vw, 620);

  return (
    <View
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: PAPER }}
    >
      <Svg width={width} height={height} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Path d={grid.minor} stroke={GRID_MINOR} strokeWidth={1} fill="none" />
        <Path d={grid.major} stroke={GRID_MAJOR} strokeWidth={1} fill="none" />
        {/* Notebook margin rule in P-Magenta */}
        <Path
          d={`M10 0V${height}M13 0V${height}`}
          stroke={CAPE_P}
          strokeOpacity={0.18}
          strokeWidth={1}
          fill="none"
        />
      </Svg>

      {/* Heartbeat trace across the upper third */}
      <Svg
        width={width}
        height={Math.min(80, width * 0.08)}
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, top: 30 * vh }}
      >
        <Path
          d={PULSE}
          stroke={CAPE_C}
          strokeOpacity={0.22}
          strokeWidth={LINE}
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </Svg>

      {/* Schematic traces, lower right, with C · A · P · E pads */}
      <Svg
        width={schemW}
        height={schemW / 2}
        viewBox="0 0 600 300"
        style={{ position: 'absolute', right: -6 * vw, bottom: 10 * vh }}
      >
        <Path d={SCHEM} stroke={CAPE_C} strokeOpacity={0.24} strokeWidth={LINE} fill="none" />
        <Circle cx={180} cy={60} r={6} fill={CAPE_C} fillOpacity={0.42} />
        <Circle cx={340} cy={150} r={6} fill={CAPE_A} fillOpacity={0.5} />
        <Circle cx={260} cy={200} r={6} fill={CAPE_P} fillOpacity={0.36} />
        <Circle cx={60} cy={200} r={6} fill={CAPE_E} fillOpacity={0.36} />
        <Circle
          cx={420}
          cy={40}
          r={22}
          stroke={CAPE_C}
          strokeOpacity={0.24}
          strokeWidth={LINE}
          strokeDasharray="3 5"
          fill="none"
        />
        <Circle
          cx={420}
          cy={40}
          r={40}
          stroke={CAPE_C}
          strokeOpacity={0.24}
          strokeWidth={LINE}
          fill="none"
        />
      </Svg>

      {/* Compass rose, bottom left: gold points on a teal tick ring */}
      <Svg
        width={roseW}
        height={roseW}
        viewBox="0 0 400 400"
        style={{ position: 'absolute', left: -16 * vw, bottom: -8 * vh }}
      >
        <Circle
          cx={200}
          cy={200}
          r={156.8}
          stroke={CAPE_C}
          strokeOpacity={0.26}
          strokeWidth={LINE}
          fill="none"
        />
        <Circle
          cx={200}
          cy={200}
          r={179.2}
          stroke={CAPE_C}
          strokeOpacity={0.26}
          strokeWidth={LINE}
          strokeDasharray="2 7"
          fill="none"
        />
        <Circle
          cx={200}
          cy={200}
          r={42}
          stroke={CAPE_C}
          strokeOpacity={0.26}
          strokeWidth={LINE}
          fill="none"
        />
        <Path d={ROSE.ticks} stroke={CAPE_C} strokeOpacity={0.3} strokeWidth={LINE} fill="none" />
        <Path
          d={ROSE.star}
          stroke={CAPE_A}
          strokeOpacity={0.55}
          strokeWidth={LINE}
          fill={CAPE_A}
          fillOpacity={0.07}
        />
      </Svg>

      {/* Drafting cog, top right — turns once every two minutes */}
      <Animated.View
        style={[
          { position: 'absolute', width: cogW, height: cogW, right: -12 * vw, top: 6 * vh },
          cogStyle,
        ]}
      >
        <Svg width={cogW} height={cogW} viewBox="0 0 400 400">
          <Path d={COG_A} stroke={CAPE_C} strokeOpacity={0.26} strokeWidth={LINE} fill="none" />
          <Circle
            cx={200}
            cy={200}
            r={26}
            stroke={CAPE_C}
            strokeOpacity={0.26}
            strokeWidth={LINE}
            fill="none"
          />
          <Circle
            cx={200}
            cy={200}
            r={93}
            stroke={CAPE_C}
            strokeOpacity={0.26}
            strokeWidth={LINE}
            strokeDasharray="4 6"
            fill="none"
          />
          <Path d={COG_B} stroke={CAPE_E} strokeOpacity={0.24} strokeWidth={LINE} fill="none" />
          <Circle
            cx={352}
            cy={352}
            r={12}
            stroke={CAPE_E}
            strokeOpacity={0.24}
            strokeWidth={LINE}
            fill="none"
          />
          <Circle
            cx={352}
            cy={352}
            r={43.4}
            stroke={CAPE_E}
            strokeOpacity={0.24}
            strokeWidth={LINE}
            strokeDasharray="4 6"
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
