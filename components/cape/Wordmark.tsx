import { View } from 'react-native';

import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { Display, Mono } from '@/components/cape/Type';
import { C, FORGED_RULE } from '@/lib/colors';

/** CAPE FLOW wordmark: condensed display ink over a forged teal→gold rule. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <View className="items-center">
      <Display className={compact ? 'text-4xl' : 'text-6xl'} color={C.ink}>
        CAPE FLOW
      </Display>
      <LinearGradient
        colors={FORGED_RULE}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 3, width: compact ? 110 : 190, borderRadius: 2, marginTop: 2 }}
      />
      <Mono
        bold
        color={C.inkSoft}
        tracking={compact ? 2 : 4}
        className={compact ? 'mt-2 text-[8px]' : 'mt-3 text-[10px]'}
      >
        ANXIETY TO AGENCY
      </Mono>
      {compact ? null : (
        <Mono className="mt-1 text-[9px]" color={C.inkFaint} tracking={3}>
          YOUR DIGITAL DECISION GPS
        </Mono>
      )}
    </View>
  );
}
