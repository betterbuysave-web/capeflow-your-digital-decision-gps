import { router, useLocalSearchParams } from 'expo-router';

import { CanonGate } from '@/components/cape/CanonGate';
import { BLUE_GATE_COPY } from '@/lib/data/canon';
import { trackFor } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function BookPartGate() {
  const { part } = useLocalSearchParams<{ part: string }>();
  const band = useCapeStore((s) => s.gradeBand);
  const blue = trackFor(band) === 'blue';
  const validPart = part === '3' || part === '5';
  return (
    <CanonGate
      title={
        validPart ? `Part ${part} · ${blue ? 'Blue Track' : 'Locked on Green'}` : 'Part not found'
      }
      copy={
        !validPart
          ? 'Return to M.A.T.C.H. to choose an available part.'
          : blue
            ? `${BLUE_GATE_COPY} Use the educational library for companion topics; this app does not reproduce the full book.`
            : 'Parts 3 and 5 of CAPE Youth Edition are gated for Blue Track, grades 9–12. They are not available on Green Track, grades 6–8. Keep building mindset, communication, consent, boundaries, decision-making, recovery, and leadership.'
      }
      actionLabel={blue && validPart ? 'Open companion topics' : 'Back to M.A.T.C.H.'}
      onContinue={() =>
        router.replace(blue && validPart ? '/educational-library' : '/(tabs)/learn')
      }
    />
  );
}
