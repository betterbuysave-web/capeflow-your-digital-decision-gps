import { View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { alpha } from '@/lib/colors';
import { verdictColor, verdictShort } from '@/lib/verdict';
import type { Verdict } from '@/lib/data/scenarios';

/** Small STRONG / OK / RISKY pill shown next to a chosen option. */
export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const tint = verdictColor(verdict);
  return (
    <View
      className="rounded-full px-2 py-0.5"
      style={{
        backgroundColor: alpha(tint, 0.15),
        borderWidth: 1,
        borderColor: alpha(tint, 0.3),
      }}
    >
      <Mono bold color={tint} className="text-[8px]" tracking={1}>
        {verdictShort(verdict)}
      </Mono>
    </View>
  );
}
