import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import type { Href } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { C, alpha } from '@/lib/colors';
import { Mono } from '@/components/cape/Type';
import { goBackOrReplace } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/** Dark screen shell with a scroll area and safe-area padding. */
export function Screen({
  children,
  className,
  contentClassName,
  scroll = true,
}: {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  scroll?: boolean;
}) {
  if (!scroll) {
    return (
      <View className={cn('bg-ink flex-1', className)}>
        <View className={cn('flex-1', contentClassName)}>{children}</View>
      </View>
    );
  }

  return (
    <View className={cn('bg-ink flex-1', className)}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={cn('px-5 pt-4 pb-16', contentClassName)}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

/** Stack-screen header with a guaranteed-safe back action. */
export function StackHeader({
  title,
  tint = C.teal,
  fallback = '/(tabs)',
  right,
}: {
  title: string;
  tint?: string;
  fallback?: Href;
  right?: ReactNode;
}) {
  return (
    <SafeAreaView edges={['top']} className="bg-ink">
      <View
        className="flex-row items-center gap-3 px-4 pt-2 pb-3"
        style={{ borderBottomWidth: 1, borderBottomColor: alpha('#ffffff', 0.06) }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => goBackOrReplace(fallback)}
          className="h-9 w-9 items-center justify-center rounded-full active:opacity-60"
          style={{
            backgroundColor: alpha('#ffffff', 0.05),
            borderWidth: 1,
            borderColor: alpha('#ffffff', 0.1),
          }}
        >
          <ChevronLeft size={18} color={alpha(C.slateSoft, 0.9)} />
        </Pressable>
        <View className="flex-1">
          <Mono bold color={tint} tracking={2.5} className="text-[11px]">
            {title.toUpperCase()}
          </Mono>
        </View>
        {right}
      </View>
    </SafeAreaView>
  );
}
