import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';

import { alpha } from '@/lib/colors';
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

/** Large condensed display heading. */
export function Display({
  children,
  className,
  color = '#ffffff',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <Text
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
  color = alpha('#cbd5e1', 0.75),
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <Text
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
  color = alpha('#cbd5e1', 0.65),
  bold = false,
  tracking,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  bold?: boolean;
  tracking?: number;
}) {
  return (
    <Text
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

/** Tinted rounded panel: translucent fill + 1px matching border. */
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
        backgroundColor: alpha(tint, fill),
        borderWidth: 1,
        borderColor: alpha(tint, stroke),
      }}
    >
      {children}
    </View>
  );
}

/** Thin progress rail. */
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
      className="w-full overflow-hidden rounded-full"
      style={{ height, backgroundColor: alpha('#ffffff', 0.07) }}
    >
      <View className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </View>
  );
}
