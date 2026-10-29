import type { ReactNode } from 'react';
import { Image, View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { C } from '@/lib/colors';
import { cn } from '@/lib/utils';

/** The CAPE watch: a red cape and gold compass star on the watch face. */
const CAPE_WATCH = require('@/assets/images/cape-watch.webp');
/** Cutout artwork is 578 × 672 (width / height). */
const CAPE_WATCH_RATIO = 578 / 672;

/** The core mantra, word for word. */
export const CAPE_MANTRA = 'Your CAPE is yours to wear—every single day.';
/** How the app explains the mantra: the CAPE is a watch you put on every day. */
export const CAPE_WATCH_LINE = 'Wear it like a watch: put it on every day, check it before every decision.';

/**
 * Wherever the app says "wear your CAPE every day", it points to the watch:
 * the CAPE watch beside the words.
 */
export function CapeWatchNote({
  size = 48,
  mantra = true,
  color = C.teal,
  children,
  className,
}: {
  /** Height of the watch, in points. */
  size?: number;
  /** Show the core mantra above the watch line. */
  mantra?: boolean;
  color?: string;
  /** Replaces the default watch line. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <View className={cn('flex-row items-center gap-3', className)}>
      <Image
        source={CAPE_WATCH}
        accessible={false}
        importantForAccessibility="no"
        resizeMode="contain"
        style={{ width: size * CAPE_WATCH_RATIO, height: size }}
      />
      <View className="flex-1">
        {mantra ? (
          <Mono bold className="text-[13px] leading-snug" color={color}>
            {CAPE_MANTRA}
          </Mono>
        ) : null}
        <Mono className={cn('text-[12px] leading-snug', mantra && 'mt-0.5')} color={C.inkSoft}>
          {children ?? CAPE_WATCH_LINE}
        </Mono>
      </View>
    </View>
  );
}
