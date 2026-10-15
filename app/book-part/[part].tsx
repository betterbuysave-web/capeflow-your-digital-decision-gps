import { Redirect, router, useLocalSearchParams } from 'expo-router';

import { CanonGate } from '@/components/cape/CanonGate';
import { BLUE_GATE_COPY } from '@/lib/data/canon';
import { trackFor } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function BookPartGate() {
  const { part } = useLocalSearchParams<{ part: string }>();
  const band = useCapeStore((s) => s.gradeBand);
  const blue = trackFor(band) === 'blue';
  const validPart = part === '3' || part === '5';
  // Green never sees Blue-only parts, not even a lock.
  if (!blue || !validPart) return <Redirect href="/(tabs)/learn" />;
  return (
    <CanonGate
      title={`Part ${part} · Blue Track`}
      copy={`${BLUE_GATE_COPY} Use the educational library for companion topics; this app does not reproduce the full book.`}
      actionLabel="Open companion topics"
      onContinue={() => router.replace('/educational-library')}
    />
  );
}
