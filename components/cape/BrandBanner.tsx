import { View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { Telemetry } from '@/components/cape/Telemetry';
import { Wordmark } from '@/components/cape/Wordmark';
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
 * wordmark over a telemetry trace, with a drafted field row beneath.
 */
export function BrandBanner({ className }: { className?: string }) {
  return (
    <View
      className={cn('overflow-hidden rounded-2xl', className)}
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

      <View className="px-5 pt-7 pb-5">
        <Wordmark />
        <View className="mt-4">
          <Telemetry tint={C.tealBright} height={26} />
        </View>
        <Mono bold className="mt-3 text-center text-[9px]" color={C.inkSoft} tracking={0.7}>
          Your CAPE is yours to wear—every single day.
        </Mono>
      </View>

      <View
        className="flex-row"
        style={{ borderTopWidth: 1, borderTopColor: alpha(C.tealBright, 0.35) }}
      >
        {BLOCK_FIELDS.map((field, index) => (
          <View
            key={field.label}
            className="flex-1 items-center py-2.5"
            style={
              index === 0
                ? undefined
                : { borderLeftWidth: 1, borderLeftColor: alpha(C.tealBright, 0.25) }
            }
          >
            <Mono className="text-[7px]" color={C.inkFaint} tracking={1.5}>
              {field.label}
            </Mono>
            <Mono bold className="mt-0.5 text-[8px]" color={C.teal} tracking={0.5}>
              {field.value}
            </Mono>
          </View>
        ))}
      </View>
    </View>
  );
}
