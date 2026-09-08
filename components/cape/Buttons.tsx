import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { C, METALLIC, METALLIC_LOCATIONS, alpha, wash } from '@/lib/colors';
import { Mono } from '@/components/cape/Type';
import { cn } from '@/lib/utils';

/** Primary action: forged teal→gold pill with a gold edge and a cream label. */
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
      style={{
        borderWidth: 1,
        borderColor: alpha(C.goldBright, 0.55),
        shadowColor: C.ink,
        shadowOpacity: 0.16,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
      }}
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
        <Mono bold color={C.paper2} tracking={2} className="text-[12px]">
          {label}
        </Mono>
        {showArrow ? <ArrowRight size={16} color={C.paper2} /> : null}
      </LinearGradient>
    </Pressable>
  );
}

/** Secondary action: index-card pill with a drafted border. */
export function GhostButton({
  label,
  onPress,
  className,
  tint = C.ink,
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
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: alpha(tint, 0.32),
      }}
    >
      {icon}
      <Mono bold color={C.inkSoft} tracking={2} className="text-[12px]">
        {label}
      </Mono>
    </Pressable>
  );
}

/** Tinted card/row that navigates somewhere. */
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
        backgroundColor: wash(tint, Math.min(fill * 1.9, 0.32)),
        borderWidth: 1,
        borderColor: alpha(tint, Math.min(stroke * 2.1, 0.6)),
        shadowColor: C.ink,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
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
        backgroundColor: wash(tint, 0.14),
        borderWidth: 1,
        borderColor: alpha(tint, 0.45),
      }}
    >
      <Mono bold color={tint} className="text-[9px]" tracking={1}>
        {label}
      </Mono>
    </View>
  );
}
