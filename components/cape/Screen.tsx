import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import type { Href } from 'expo-router';
import { ChevronLeft } from '@/lib/icons';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { C, alpha } from '@/lib/colors';
import { Mono } from '@/components/cape/Type';
import { goBackOrReplace } from '@/lib/navigation';
import { usePageTitle } from '@/lib/usePageTitle';
import { cn } from '@/lib/utils';

/** Notebook screen shell: engineering paper, a scroll area and safe-area padding. */
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
      <View className={cn('bg-paper flex-1', className)}>
        <NotebookBackdrop />
        <View className={cn('flex-1', contentClassName)}>{children}</View>
      </View>
    );
  }

  return (
    <View className={cn('bg-paper flex-1', className)}>
      <NotebookBackdrop />
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

/**
 * Stack-screen header, drawn as a drawing-sheet title bar: raised paper, a
 * CAPE Teal rule underneath, and a guaranteed-safe back action.
 */
export function StackHeader({
  title,
  tint = C.teal,
  fallback = '/(tabs)',
  right,
  onBack,
}: {
  title: string;
  tint?: string;
  fallback?: Href;
  right?: ReactNode;
  /** Overrides the default back behaviour (history, then `fallback`). */
  onBack?: () => void;
}) {
  usePageTitle(title, 'CAPE Flow');
  return (
    <SafeAreaView edges={['top']} className="bg-paper-2">
      <View
        className="flex-row items-center gap-3 px-4 pt-2 pb-3"
        style={{ borderBottomWidth: 1, borderBottomColor: alpha(C.tealBright, 0.35) }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => (onBack ? onBack() : goBackOrReplace(fallback))}
          className="h-11 w-11 items-center justify-center rounded-full active:opacity-60"
          style={{
            backgroundColor: C.card,
            borderWidth: 1,
            borderColor: alpha(C.ink, 0.18),
          }}
        >
          <ChevronLeft size={18} color={C.inkSoft} />
        </Pressable>
        <View className="flex-1">
          <Mono bold color={tint} tracking={2.5} className="text-[13px]">
            {title.toUpperCase()}
          </Mono>
        </View>
        {right}
      </View>
    </SafeAreaView>
  );
}
