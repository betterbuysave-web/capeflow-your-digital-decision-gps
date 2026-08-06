import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { C, METALLIC, METALLIC_LOCATIONS, alpha } from '@/lib/colors';
import { Mono } from '@/components/cape/Type';
import { cn } from '@/lib/utils';

/** Primary action: metallic teal→gold gradient pill with dark label. */
export function MetallicButton({
  label,
  onPress,
  className,
  showArrow = true,
}: {
  label: string;
  onPress: () => void;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn('overflow-hidden rounded-full active:opacity-80', className)}
      style={{ shadowColor: C.teal, shadowOpacity: 0.4, shadowRadius: 18 }}
    >
      <LinearGradient
        colors={METALLIC}
        locations={METALLIC_LOCATIONS}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          paddingHorizontal: 26,
          paddingVertical: 14,
        }}
      >
        <Mono bold color={C.ink} tracking={2} className="text-[12px]">
          {label}
        </Mono>
        {showArrow ? <ArrowRight size={16} color={C.ink} /> : null}
      </LinearGradient>
    </Pressable>
  );
}

/** Secondary action: hairline outlined pill. */
export function GhostButton({
  label,
  onPress,
  className,
  tint = '#ffffff',
  icon,
}: {
  label: string;
  onPress: () => void;
  className?: string;
  tint?: string;
  icon?: ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-full px-6 py-3.5 active:opacity-70',
        className,
      )}
      style={{
        backgroundColor: alpha(tint, 0.05),
        borderWidth: 1,
        borderColor: alpha(tint, 0.16),
      }}
    >
      {icon}
      <Mono bold color={alpha(C.slateSoft, 0.85)} tracking={2} className="text-[12px]">
        {label}
      </Mono>
    </Pressable>
  );
}

/** Tinted row/tile that navigates somewhere. */
export function TintedRow({
  tint,
  onPress,
  children,
  className,
  fill = 0.05,
  stroke = 0.16,
}: {
  tint: string;
  onPress: () => void;
  children: ReactNode;
  className?: string;
  fill?: number;
  stroke?: number;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn('rounded-2xl p-4 active:opacity-70', className)}
      style={{
        backgroundColor: alpha(tint, fill),
        borderWidth: 1,
        borderColor: alpha(tint, stroke),
      }}
    >
      {children}
    </Pressable>
  );
}

/** Small pill chip, e.g. YES / MAYBE / NO or XP counters. */
export function Chip({ label, tint }: { label: string; tint: string }) {
  return (
    <View
      className="rounded-full px-2.5 py-0.5"
      style={{
        backgroundColor: alpha(tint, 0.14),
        borderWidth: 1,
        borderColor: alpha(tint, 0.28),
      }}
    >
      <Mono bold color={tint} className="text-[9px]" tracking={1}>
        {label}
      </Mono>
    </View>
  );
}
