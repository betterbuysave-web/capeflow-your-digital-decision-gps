import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Timer } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';

import { TintedRow } from '@/components/cape/Buttons';
import { Display, Mono } from '@/components/cape/Type';
import { C, alpha, wash } from '@/lib/colors';
import { PEP_WINDOW_MS } from '@/lib/data/crisis';
import { pepUnlocked } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

const pad = (n: number) => n.toString().padStart(2, '0');

export function formatHMS(msLeft: number): string {
  const clamped = Math.max(0, msLeft);
  const hours = Math.floor(clamped / 3_600_000);
  const minutes = Math.floor((clamped % 3_600_000) / 60_000);
  const seconds = Math.floor((clamped % 60_000) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/** Closing time of the window, in the phone's local time. */
export function formatDeadline(startedAt: number): string {
  return new Date(startedAt + PEP_WINDOW_MS).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Ticks once a second while a clock is running. */
export function usePepTime(startedAt: number | null) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!startedAt) return undefined;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [startedAt]);
  const left = startedAt ? PEP_WINDOW_MS - (now - startedAt) : PEP_WINDOW_MS;
  return { left, expired: startedAt !== null && left <= 0 };
}

/** Under 24 hours left turns the clock red. */
export function pepTint(left: number, expired: boolean): string {
  if (expired || left < 24 * 3_600_000) return C.no;
  return C.flame;
}

/** The big countdown ring. */
export function PepRing({
  startedAt,
  left,
  expired,
}: {
  startedAt: number | null;
  left: number;
  expired: boolean;
}) {
  const size = 248;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const fraction = startedAt ? Math.max(0, Math.min(1, left / PEP_WINDOW_MS)) : 1;
  const tint = startedAt ? pepTint(left, expired) : C.inkFaint;

  return (
    <View
      accessible
      accessibilityRole="timer"
      accessibilityLabel={
        startedAt
          ? expired
            ? 'The 72-hour window has passed.'
            : `${Math.floor(left / 3_600_000)} hours and ${Math.floor((left % 3_600_000) / 60_000)} minutes left in the 72-hour window.`
          : 'Clock not started. 72 hours.'
      }
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={alpha(tint, 0.14)}
          strokeWidth={stroke}
          fill={wash(tint, 0.06, C.card)}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={tint}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={circ * (1 - fraction)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Mono bold color={tint} tracking={2} className="text-[10px]">
        {startedAt ? (expired ? 'WINDOW PASSED' : 'TIME LEFT') : 'NOT STARTED'}
      </Mono>
      <Display color={startedAt ? tint : C.ink} className="mt-1 text-5xl">
        {startedAt ? formatHMS(left) : '72:00:00'}
      </Display>
      <Mono className="mt-1 text-[9px]" color={C.inkFaint} tracking={2}>
        HRS : MIN : SEC
      </Mono>
    </View>
  );
}

/** Live countdown row for Home and Crisis. Blue track only, only while running. */
export function PepCountdownBanner({ className }: { className?: string }) {
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const { left, expired } = usePepTime(pepStartedAt);
  if (!pepStartedAt || !pepUnlocked(gradeBand)) return null;
  const tint = pepTint(left, expired);

  return (
    <TintedRow
      tint={tint}
      fill={0.12}
      stroke={0.4}
      className={className}
      accessibilityLabel={
        expired
          ? 'PEP clock: the 72-hour window has passed. Open the PEP clock.'
          : `PEP clock running. ${formatHMS(left)} left. Open the PEP clock.`
      }
      onPress={() => router.push('/tools/pep-clock')}
    >
      <View className="flex-row items-center gap-3">
        <Timer size={20} color={tint} />
        <View className="flex-1">
          <Mono bold color={tint} className="text-[10px]" tracking={1.5}>
            {expired ? 'PEP WINDOW PASSED' : 'PEP CLOCK RUNNING'}
          </Mono>
          {expired ? (
            <Mono className="mt-0.5 text-[10px]">Still get checked. Tap for next steps.</Mono>
          ) : (
            <Display color={tint} className="mt-0.5 text-3xl">
              {formatHMS(left)}
            </Display>
          )}
        </View>
        <ArrowRight size={14} color={tint} />
      </View>
    </TintedRow>
  );
}
