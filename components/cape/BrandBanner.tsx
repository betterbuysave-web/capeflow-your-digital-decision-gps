import { View } from 'react-native';

import { CapeWatchNote } from '@/components/cape/CapeWatchNote';
import { Mono } from '@/components/cape/Type';
import { Wordmark } from '@/components/cape/Wordmark';
import { useCapeStore } from '@/lib/store/useCapeStore';
import { C, alpha } from '@/lib/colors';
import { cn } from '@/lib/utils';

const BLOCK_FIELDS = [
  { label: 'PROJECT', value: 'HARNESS' },
  { label: 'SHEET', value: '01 / 05' },
  { label: 'TRACKS', value: 'GREEN · BLUE' },
  { label: 'REV', value: '2026.1' },
] as const;

/**
 * CAPE FLOW brand plate, drawn as an engineering drawing title block: the
 * supplied brand artwork with a drafted field row beneath.
 */
export function BrandBanner({ className }: { className?: string }) {
  const band = useCapeStore((st) => st.gradeBand);
  // Show only the reader's own track once they have one.
  const fields = BLOCK_FIELDS.map((f) =>
    f.label === 'TRACKS' && band
      ? { label: 'TRACK', value: band === '9-12' ? 'BLUE' : 'GREEN' }
      : f,
  );
  return (
    <View
      className={cn('rounded-2xl', className)}
      style={{
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: alpha(C.tealBright, 0.45),
        shadowColor: C.ink,
        shadowOpacity: 0.08,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
      }}
    >
      {/* Corner registration ticks, as printed on a drawing sheet. */}
      <View
        className="absolute top-2 left-2 h-3 w-3"
        style={{
          borderLeftWidth: 1,
          borderTopWidth: 1,
          borderColor: alpha(C.goldBright, 0.7),
        }}
      />
      <View
        className="absolute top-2 right-2 h-3 w-3"
        style={{
          borderRightWidth: 1,
          borderTopWidth: 1,
          borderColor: alpha(C.goldBright, 0.7),
        }}
      />

      <View className="px-2 pt-2 pb-4">
        <View className="overflow-hidden rounded-xl">
          <Wordmark />
        </View>
        <CapeWatchNote size={52} className="mt-3 px-2" />
      </View>

      <View
        className="flex-row"
        style={{ borderTopWidth: 1, borderTopColor: alpha(C.tealBright, 0.35) }}
      >
        {fields.map((field, index) => (
          <View
            key={field.label}
            className="flex-1 items-center py-2.5"
            style={
              index === 0
                ? undefined
                : { borderLeftWidth: 1, borderLeftColor: alpha(C.tealBright, 0.25) }
            }
          >
            <Mono className="text-[10px]" color={C.inkFaint} tracking={1.5}>
              {field.label}
            </Mono>
            <Mono bold className="mt-0.5 text-[11px]" color={C.teal} tracking={0.5}>
              {field.value}
            </Mono>
          </View>
        ))}
      </View>
    </View>
  );
}
