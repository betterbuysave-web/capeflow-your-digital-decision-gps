import { View } from 'react-native';

import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { Display, Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';

/** CAPE FLOW wordmark: condensed display type over a metallic rule. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <View className="items-center">
      <Display className={compact ? 'text-4xl' : 'text-6xl'} color={C.white}>
        CAPE FLOW
      </Display>
      <LinearGradient
        colors={['#8ffff0', '#00ffcc', '#d4af37', '#b8860b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ height: 3, width: compact ? 110 : 190, borderRadius: 2, marginTop: 2 }}
      />
      <Mono
        bold
        color={alpha(C.slateSoft, 0.8)}
        tracking={compact ? 2 : 4}
        className={compact ? 'mt-2 text-[8px]' : 'mt-3 text-[10px]'}
      >
        ANXIETY TO AGENCY
      </Mono>
      {compact ? null : (
        <Mono className="mt-1 text-[9px]" color={alpha(C.slateFaint, 0.6)} tracking={3}>
          YOUR DIGITAL DECISION GPS
        </Mono>
      )}
    </View>
  );
}
