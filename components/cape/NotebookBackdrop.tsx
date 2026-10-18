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
 * TACTICAL NOTEBOOK canvas — the CAPE background shared with
 * theharnessproject.org's CAPE pages.
 *
 * Cream engineering graph paper (#FDFBF7, 20px cells, heavier line every
 * 100px), a slowly turning drafting cog in the top-right margin, a compass
 * rose with gold points in the bottom-left, and faint teal schematic traces.
 *
 * Purely decorative: sits behind screen content and never takes touches.
 * `tint` is accepted for older call sites but no longer changes the canvas,
 * so every CAPE screen reads as one notebook.
 */

const PAPER = '#FDFBF7';
const GRID_MAJOR = '#E7DCC4';
const GRID_MINOR = '#F1EBDD';
const LINE_TEAL = '#BFDDD8';
const LINE_GOLD = '#DCC79A';
const LINE_SCHEM = '#D3E6E3';

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
    spin.value = withRepeat(withTiming(360, { duration: 120000, easing: Easing.linear }), -1, false);
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
      </Svg>

      {/* Schematic traces, lower right */}
      <Svg
        width={schemW}
        height={schemW / 2}
        viewBox="0 0 600 300"
        style={{ position: 'absolute', right: -6 * vw, bottom: 10 * vh }}
      >
        <Path d={SCHEM} stroke={LINE_SCHEM} strokeWidth={1.5} fill="none" />
        <Circle cx={180} cy={60} r={6} stroke={LINE_SCHEM} strokeWidth={1.5} fill="none" />
        <Circle cx={340} cy={150} r={6} stroke={LINE_SCHEM} strokeWidth={1.5} fill="none" />
        <Circle cx={260} cy={200} r={6} stroke={LINE_SCHEM} strokeWidth={1.5} fill="none" />
        <Circle
          cx={420}
          cy={40}
          r={22}
          stroke={LINE_SCHEM}
          strokeWidth={1.5}
          strokeDasharray="3 5"
          fill="none"
        />
        <Circle cx={420} cy={40} r={40} stroke={LINE_SCHEM} strokeWidth={1.5} fill="none" />
      </Svg>

      {/* Compass rose, bottom left */}
      <Svg
        width={roseW}
        height={roseW}
        viewBox="0 0 400 400"
        style={{ position: 'absolute', left: -16 * vw, bottom: -8 * vh }}
      >
        <Circle cx={200} cy={200} r={156.8} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
        <Circle
          cx={200}
          cy={200}
          r={179.2}
          stroke={LINE_TEAL}
          strokeWidth={1.5}
          strokeDasharray="2 7"
          fill="none"
        />
        <Circle cx={200} cy={200} r={42} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
        <Path d={ROSE.ticks} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
        <Path d={ROSE.star} stroke={LINE_GOLD} strokeWidth={1.5} fill="none" />
      </Svg>

      {/* Drafting cog, top right — turns once every two minutes */}
      <Animated.View
        style={[
          { position: 'absolute', width: cogW, height: cogW, right: -12 * vw, top: 6 * vh },
          cogStyle,
        ]}
      >
        <Svg width={cogW} height={cogW} viewBox="0 0 400 400">
          <Path d={COG_A} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
          <Circle cx={200} cy={200} r={26} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
          <Circle
            cx={200}
            cy={200}
            r={93}
            stroke={LINE_TEAL}
            strokeWidth={1.5}
            strokeDasharray="4 6"
            fill="none"
          />
          <Path d={COG_B} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
          <Circle cx={352} cy={352} r={12} stroke={LINE_TEAL} strokeWidth={1.5} fill="none" />
          <Circle
            cx={352}
            cy={352}
            r={43.4}
            stroke={LINE_TEAL}
            strokeWidth={1.5}
            strokeDasharray="4 6"
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
