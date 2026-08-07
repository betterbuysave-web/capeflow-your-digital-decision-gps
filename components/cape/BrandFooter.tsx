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
        backgroundColor: alpha('#ffffff', 0.02),
        borderWidth: 1,
        borderColor: alpha('#ffffff', 0.06),
      }}
    >
      <Mono bold className="text-center text-[10px]" color={alpha(C.slateSoft, 0.8)} tracking={1.5}>
        THE HARNESS PROJECT LLC
      </Mono>
      <Mono className="text-center text-[9px]" color={alpha(C.teal, 0.75)}>
        theharnessproject.org
      </Mono>
      <Mono className="mt-1 text-center text-[9px]" color={alpha(C.slateFaint, 0.6)}>
        For educational purposes only. Not medical advice.
      </Mono>
      <Mono className="text-center text-[9px]" color={alpha(C.slateFaint, 0.5)}>
        © 2026 Christopher Zacharie.
      </Mono>
    </View>
  );
}
