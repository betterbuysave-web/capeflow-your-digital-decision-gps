import { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedView } from '@/components/ui/primitives/AnimatedView';
import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { Path, Svg } from '@/components/ui/primitives/Svg';
import { C, alpha } from '@/lib/colors';

/** ECG-style trace: flat line punctuated by a beat every `period` px. */
function beatPath(width: number, height: number): string {
  const mid = height / 2;
  let d = `M0 ${mid}`;
  const period = 68;
  for (let x = 0; x < width; x += period) {
    d += ` L${x + 20} ${mid}`;
    d += ` L${x + 26} ${mid - height * 0.16}`;
    d += ` L${x + 31} ${mid + height * 0.12}`;
    d += ` L${x + 36} ${mid - height * 0.42}`;
    d += ` L${x + 41} ${mid + height * 0.34}`;
    d += ` L${x + 47} ${mid}`;
  }
  return `${d} L${width} ${mid}`;
}

/**
 * Cyan medical telemetry trail. A steady heartbeat trace with a sweeping
 * highlight that runs faster and brighter while the vault is active.
 */
export function Telemetry({
  tint = C.teal,
  height = 30,
  active = true,
}: {
  tint?: string;
  height?: number;
  active?: boolean;
}) {
  const [width, setWidth] = useState(0);
  const sweep = useSharedValue(0);

  useEffect(() => {
    sweep.value = 0;
    sweep.value = withRepeat(
      withTiming(1, { duration: active ? 1800 : 3600, easing: Easing.linear }),
      -1,
      false,
    );
  }, [sweep, active]);

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -120 + sweep.value * (width + 120) }],
  }));

  return (
    <View
      className="w-full overflow-hidden rounded-lg"
      style={{ height, backgroundColor: alpha(tint, 0.04) }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {width > 0 ? (
        <>
          <Svg width={width} height={height}>
            <Path
              d={beatPath(width, height)}
              stroke={alpha(tint, active ? 0.55 : 0.25)}
              strokeWidth={1.4}
              fill="none"
            />
          </Svg>
          <AnimatedView className="absolute top-0 bottom-0 w-[120px]" style={sweepStyle}>
            <LinearGradient
              colors={[alpha(tint, 0), alpha(tint, active ? 0.3 : 0.12), alpha(tint, 0)]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ flex: 1 }}
            />
          </AnimatedView>
        </>
      ) : null}
    </View>
  );
}
