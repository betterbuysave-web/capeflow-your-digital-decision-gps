import { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  Easing,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedView } from '@/components/ui/primitives/AnimatedView';
import { C, alpha } from '@/lib/colors';

/**
 * One shared clock drives every glitch layer on a screen, so a long checklist
 * of un-named ghosts costs a single animation instead of dozens.
 */
export function useGlitchClock(): SharedValue<number> {
  const clock = useSharedValue(0);

  useEffect(() => {
    clock.value = 0;
    clock.value = withRepeat(withTiming(1, { duration: 2600, easing: Easing.linear }), -1, false);
  }, [clock]);

  return clock;
}

/**
 * An un-processed fear: misregistered type with a P-Magenta / CAPE Teal
 * chromatic split, like a mis-printed plate. Once named, render solid ink.
 */
export function GlitchLabel({
  text,
  clock,
  phase,
  size = 12,
}: {
  text: string;
  clock: SharedValue<number>;
  phase: number;
  size?: number;
}) {
  const magenta = useAnimatedStyle(() => {
    const p = (clock.value + phase) % 1;
    const burst = p > 0.9;
    return {
      opacity: burst ? 0.85 : 0.32,
      transform: [{ translateX: burst ? -2 : -0.7 }],
    };
  });

  const teal = useAnimatedStyle(() => {
    const p = (clock.value + phase + 0.04) % 1;
    const burst = p > 0.9;
    return {
      opacity: burst ? 0.8 : 0.28,
      transform: [{ translateX: burst ? 2.2 : 0.7 }],
    };
  });

  const baseStyle = {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: size,
    letterSpacing: 1,
  } as const;

  return (
    <View>
      <Text style={[baseStyle, { color: alpha(C.inkFaint, 0.8) }]}>{text}</Text>
      <AnimatedView className="absolute top-0 left-0" style={magenta} pointerEvents="none">
        <Text style={[baseStyle, { color: C.magenta }]}>{text}</Text>
      </AnimatedView>
      <AnimatedView className="absolute top-0 left-0" style={teal} pointerEvents="none">
        <Text style={[baseStyle, { color: C.tealBright }]}>{text}</Text>
      </AnimatedView>
    </View>
  );
}
