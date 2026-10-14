import { cloneElement, isValidElement, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

import { LinearGradient } from '@/components/ui/primitives/LinearGradient';
import { C, CAPE_BUTTON_GRADIENT, CAPE_BUTTON_LOCATIONS, alpha, wash } from '@/lib/colors';
import { Mono } from '@/components/cape/Type';
import { cn } from '@/lib/utils';

/**
 * Shared action surface. Solid by default: CAPE Teal, or the caller's own
 * `backgroundColor` / `tint` (use flame or red for urgent actions). The
 * four-colour CAPE gradient is reserved for `brand` moments such as Get Started.
 */
export function GradientAction({
  children,
  className,
  style,
  disabled,
  accessibilityState,
  tint,
  brand = false,
  ...props
}: PressableProps & { className?: string; tint?: string; brand?: boolean }) {
  const callerBg =
    typeof style === 'function' ? undefined : StyleSheet.flatten(style)?.backgroundColor;
  const solid = tint ?? (typeof callerBg === 'string' ? callerBg : C.teal);
  return (
    <Pressable
      {...props}
      accessibilityRole={props.accessibilityRole ?? 'button'}
      accessibilityState={{
        ...accessibilityState,
        disabled: disabled || accessibilityState?.disabled,
      }}
      disabled={disabled}
      className={cn('min-h-11 overflow-hidden rounded-xl active:opacity-80', className)}
      style={(state) => [
        typeof style === 'function' ? style(state) : style,
        {
          borderWidth: 0,
          backgroundColor: brand ? 'transparent' : solid,
          zIndex: 0,
          opacity: disabled ? 0.55 : state.pressed ? 0.8 : 1,
        },
      ]}
    >
      {(state) => (
        <>
          {brand ? (
            <View pointerEvents="none" style={[StyleSheet.absoluteFill, { zIndex: -1 }]}>
              <LinearGradient
                colors={CAPE_BUTTON_GRADIENT}
                locations={CAPE_BUTTON_LOCATIONS}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={[StyleSheet.absoluteFill, { backgroundColor: alpha(C.ink, 0.4) }]} />
            </View>
          ) : null}
          {typeof children === 'function' ? children(state) : children}
        </>
      )}
    </Pressable>
  );
}

/** Primary action pill. `brand` turns on the four-colour CAPE gradient. */
export function MetallicButton({
  label,
  onPress,
  className,
  showArrow = true,
  brand = false,
  tint,
}: {
  label: string;
  onPress: () => void;
  className?: string;
  showArrow?: boolean;
  brand?: boolean;
  tint?: string;
}) {
  return (
    <GradientAction
      brand={brand}
      tint={tint}
      accessibilityLabel={label}
      onPress={onPress}
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-full px-6 py-3.5',
        className,
      )}
    >
      <Mono bold color={C.paper2} tracking={2} className="shrink text-center text-[14px]">
        {label}
      </Mono>
      {showArrow ? <ArrowRight size={16} color={C.paper2} /> : null}
    </GradientAction>
  );
}

/** Secondary action: solid pill in `tint`, without the forward arrow. */
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
    <GradientAction
      accessibilityLabel={label}
      onPress={onPress}
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-full px-6 py-3.5',
        className,
      )}
      style={{ backgroundColor: tint }}
    >
      {isValidElement<{ color?: string }>(icon) ? cloneElement(icon, { color: C.paper2 }) : icon}
      <Mono bold color={C.paper2} tracking={2} className="shrink text-center text-[14px]">
        {label}
      </Mono>
    </GradientAction>
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
  accessibilityLabel,
  accessibilityHint,
}: {
  tint: string;
  onPress: () => void;
  children: ReactNode;
  className?: string;
  fill?: number;
  stroke?: number;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
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
      <Mono bold color={tint} className="text-[12px]" tracking={1}>
        {label}
      </Mono>
    </View>
  );
}
