import { View } from 'react-native';

import { CapeWatchNote } from '@/components/cape/CapeWatchNote';
import { Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { cn } from '@/lib/utils';

/** W-12: the mandated footer line, word for word as on theharnessproject.org. Do not reword or split it. */
export const BRAND_FOOTER_COPY =
  'The HARNESS Project LLC | theharnessproject.org. For educational purposes only. Not medical advice. © 2026 Christopher Zacharie and The HARNESS Project LLC. All rights reserved.';

/** Mandatory HARNESS Project footer. */
export function BrandFooter({ className }: { className?: string }) {
  return (
    <View
      accessibilityLabel={BRAND_FOOTER_COPY}
      className={cn('items-center gap-1.5 rounded-2xl px-4 py-5', className)}
      style={{
        backgroundColor: C.paper2,
        borderWidth: 1,
        borderColor: alpha(C.ink, 0.12),
      }}
    >
      <CapeWatchNote size={44} className="mb-2 self-stretch" />
      <Mono className="text-center text-[12px] leading-5" color={C.inkSoft}>
        {BRAND_FOOTER_COPY}
      </Mono>
    </View>
  );
}
