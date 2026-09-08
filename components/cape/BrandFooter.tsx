import { View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { cn } from '@/lib/utils';

/** Mandatory HARNESS Project footer. */
export function BrandFooter({ className }: { className?: string }) {
  return (
    <View
      className={cn('items-center gap-1.5 rounded-2xl px-4 py-5', className)}
      style={{
        backgroundColor: C.paper2,
        borderWidth: 1,
        borderColor: alpha(C.ink, 0.12),
      }}
    >
      <Mono bold className="text-center text-[10px]" color={C.inkSoft} tracking={1.5}>
        THE HARNESS PROJECT LLC
      </Mono>
      <Mono className="text-center text-[9px]" color={C.teal}>
        theharnessproject.org
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
