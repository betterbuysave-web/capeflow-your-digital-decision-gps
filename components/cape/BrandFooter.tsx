import { View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { cn } from '@/lib/utils';

export const BRAND_FOOTER_COPY =
  'The HARNESS Project LLC | theharnessproject.org. For educational purposes only. Not medical advice. © 2026 Christopher Zacharie.';

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
      <Mono bold className="text-center text-[10px]" color={C.inkSoft} tracking={1.2}>
        The HARNESS Project LLC | theharnessproject.org.
      </Mono>
      <Mono className="mt-1 text-center text-[9px]" color={C.inkFaint}>
        For educational purposes only. Not medical advice.
      </Mono>
      <Mono className="text-center text-[9px]" color={C.inkFaint}>
        © 2026 Christopher Zacharie.
      </Mono>
    </View>
  );
}
