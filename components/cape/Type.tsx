import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text, type TextProps } from 'react-native';

import { C, alpha, wash } from '@/lib/colors';
import { cn } from '@/lib/utils';

/** Uppercase monospace eyebrow label used above every section title. */
export function Eyebrow({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <Text
      className={cn('font-mono text-[10px]', className)}
      style={{ color, letterSpacing: 3, fontFamily: 'JetBrainsMono_700Bold' }}
    >
      {children}
    </Text>
  );
}

/** Large condensed display heading, set in ink. */
export function Display({
  children,
  className,
  color = C.ink,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <Text
      accessibilityRole="header"
      className={cn('text-3xl', className)}
      style={{ color, fontFamily: 'BebasNeue_400Regular', letterSpacing: 1 }}
    >
      {children}
    </Text>
  );
}

/** Body copy in Inter. */
export function Body({
  children,
  className,
  color = C.inkSoft,
  accessibilityRole,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  accessibilityRole?: TextProps['accessibilityRole'];
}) {
  return (
    <Text
      accessibilityRole={accessibilityRole}
      className={cn('text-sm leading-relaxed', className)}
      style={{ color, fontFamily: 'Inter_400Regular' }}
    >
      {children}
    </Text>
  );
}

/** Small monospace copy — the site's default UI text style. */
export function Mono({
  children,
  className,
  color = C.inkFaint,
  bold = false,
  tracking,
  accessibilityLiveRegion,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  bold?: boolean;
  tracking?: number;
  accessibilityLiveRegion?: TextProps['accessibilityLiveRegion'];
}) {
  return (
    <Text
      accessibilityLiveRegion={accessibilityLiveRegion}
      className={cn('text-[11px] leading-relaxed', className)}
      style={{
        color,
        fontFamily: bold ? 'JetBrainsMono_700Bold' : 'JetBrainsMono_400Regular',
        letterSpacing: tracking,
      }}
    >
      {children}
    </Text>
  );
}

/**
 * Tinted index card. Opaque on purpose: cards must sit *on* the engineering
 * grid, not let it bleed through. `fill` and `stroke` stay on their old 0–1
 * scale so every existing call site keeps its relative weight.
 */
export function Panel({
  tint,
  children,
  className,
  fill = 0.05,
  stroke = 0.16,
}: {
  tint: string;
  children: ReactNode;
  className?: string;
  fill?: number;
  stroke?: number;
}) {
  return (
    <View
      className={cn('rounded-2xl p-4', className)}
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
    </View>
  );
}

/** Thin progress rail, drawn as an ink channel on paper. */
export function Rail({
  value,
  color,
  height = 4,
}: {
  value: number;
  color: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Progress"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(pct),
        text: `${Math.round(pct)} percent`,
      }}
      className="w-full overflow-hidden rounded-full"
      style={{ height, backgroundColor: alpha(C.ink, 0.1) }}
    >
      <View className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </View>
  );
}
