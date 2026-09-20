import { View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

import { Eyebrow, Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';

export function MissionComplete({ detail }: { detail: string }) {
  return (
    <Animated.View entering={FadeIn.duration(240)}>
      <View
        className="items-center rounded-2xl px-5 py-6"
        style={{
          backgroundColor: alpha(C.teal, 0.1),
          borderWidth: 1.5,
          borderColor: alpha(C.gold, 0.5),
        }}
      >
        <Animated.View
          entering={ZoomIn.delay(80).duration(220)}
          className="h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: alpha(C.teal, 0.16),
            borderWidth: 1,
            borderColor: alpha(C.teal, 0.5),
          }}
        >
          <Check size={24} color={C.teal} />
        </Animated.View>
        <Eyebrow color={C.gold} className="mt-3">
          MISSION COMPLETE
        </Eyebrow>
        <Mono className="mt-2 text-center text-[10px]">{detail}</Mono>
      </View>
    </Animated.View>
  );
}
