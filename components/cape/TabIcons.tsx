import type { ReactNode } from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { C } from '@/lib/colors';

/**
 * Custom tab-bar icons — Tactical Notebook line art.
 * Thin ink/teal strokes with one CAPE Gold accent that lights up when the
 * tab is active (SOS uses flame instead of gold so it always reads urgent).
 */

type IconProps = { color: ColorValue; focused: boolean; size?: number };

const STROKE = 1.7;

function Frame({ size = 26, children }: { size?: number; children: ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

const line = (color: ColorValue) => ({
  stroke: color,
  strokeWidth: STROKE,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

/** GPS — targeting reticle with a navigation arrow. */
export function GpsIcon({ color, focused, size }: IconProps) {
  const accent = focused ? C.goldBright : color;
  return (
    <Frame size={size}>
      <Circle cx={12} cy={12} r={8.5} {...line(color)} />
      <Path d="M12 1.8V4.6M12 19.4V22.2M1.8 12H4.6M19.4 12H22.2" {...line(color)} />
      <Path
        d="M12 7.2L15.6 16.4L12 14.5L8.4 16.4Z"
        {...line(accent)}
        fill={focused ? accent : 'none'}
      />
    </Frame>
  );
}

/** COMPASS — bezel with a split needle; north half in gold. */
export function CompassIcon({ color, focused, size }: IconProps) {
  const accent = focused ? C.goldBright : color;
  return (
    <Frame size={size}>
      <Circle cx={12} cy={12} r={9.2} {...line(color)} />
      <Circle cx={12} cy={12} r={6.8} {...line(color)} strokeDasharray="1 2.2" strokeWidth={1.1} />
      <Path d="M12 4.2L14.4 12H9.6Z" {...line(accent)} fill={focused ? accent : 'none'} />
      <Path d="M12 19.8L14.4 12H9.6Z" {...line(color)} />
      <Circle cx={12} cy={12} r={1} fill={color} />
    </Frame>
  );
}

/** FIELD KIT — pack with a gold front pocket. */
export function FieldKitIcon({ color, focused, size }: IconProps) {
  const accent = focused ? C.goldBright : color;
  return (
    <Frame size={size}>
      <Path d="M9.6 5.2V4a1.2 1.2 0 0 1 1.2-1.2h2.4A1.2 1.2 0 0 1 14.4 4v1.2" {...line(color)} />
      <Path
        d="M5.8 9.6a4.4 4.4 0 0 1 4.4-4.4h3.6a4.4 4.4 0 0 1 4.4 4.4v9.2a2.4 2.4 0 0 1-2.4 2.4H8.2a2.4 2.4 0 0 1-2.4-2.4Z"
        {...line(color)}
      />
      <Path d="M8.8 13.6h6.4v4.6H8.8Z" {...line(accent)} />
      <Path d="M8.8 15.4h6.4M12 11v2.6" {...line(accent)} />
    </Frame>
  );
}

/** SOS — shield with an alert mark. Accent is flame, not gold. */
export function SosIcon({ color, focused, size }: IconProps) {
  const alert = focused ? C.flame : color;
  return (
    <Frame size={size}>
      <Path
        d="M12 2.6L19.4 5.6V11.4C19.4 16.1 16.3 19.6 12 21.2C7.7 19.6 4.6 16.1 4.6 11.4V5.6Z"
        {...line(alert)}
        fill={focused ? alert : 'none'}
        fillOpacity={focused ? 0.12 : 0}
      />
      <Path d="M12 7.6V12.6" {...line(alert)} strokeWidth={2.1} />
      <Circle cx={12} cy={15.8} r={1.2} fill={alert} />
    </Frame>
  );
}

/** MY GEAR — earned medal on a ribbon. */
export function MyGearIcon({ color, focused, size }: IconProps) {
  const accent = focused ? C.goldBright : color;
  return (
    <Frame size={size}>
      <Path d="M8.6 14.4L7 21.2L12 19L17 21.2L15.4 14.4" {...line(color)} />
      <Circle cx={12} cy={9.4} r={6.4} {...line(accent)} fill={focused ? accent : 'none'} fillOpacity={0.18} />
      <Path d="M9.4 9.5L11.2 11.3L14.7 7.8" {...line(focused ? C.ink : color)} />
    </Frame>
  );
}
