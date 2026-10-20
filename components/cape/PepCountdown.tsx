import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Timer } from '@/lib/icons';
import Svg, { Circle, Line } from 'react-native-svg';
import {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedView } from '@/components/ui/primitives/AnimatedView';

import { Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
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

/** Console colours: neon on the dark mission panel. */
const NEON = { amber: '#FF7A2F', red: '#FF3B4E', cyan: '#3FE0D0', dim: '#2B3A47', grid: '#1E2E3B' };

function neonFor(left: number, expired: boolean, running: boolean): string {
  if (!running) return '#7D8B97';
  return expired || left < 24 * 3_600_000 ? NEON.red : NEON.amber;
}

const glow = (color: string, radius = 14) => ({
  textShadowColor: color,
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: radius,
});

/** The mission-console countdown: 72 hour ticks, a seconds sweep, a pulse. */
export function PepRing({
  startedAt,
  left,
  expired,
}: {
  startedAt: number | null;
  left: number;
  expired: boolean;
}) {
  const running = startedAt !== null;
  const neon = neonFor(left, expired, running);
  const size = 280;
  const c = size / 2;
  const tickOuter = c - 8;
  const tickInner = c - 24;
  const sweepR = c - 34;
  const sweepCirc = 2 * Math.PI * sweepR;
  const hoursLeft = running ? Math.max(0, Math.ceil(left / 3_600_000)) : 72;
  const secondFraction = running && !expired ? (left % 60_000) / 60_000 : 0;
  const urgent = running && !expired && left < 24 * 3_600_000;

  const reduceMotion = useReducedMotion();
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (!running || expired || reduceMotion) {
      cancelAnimation(pulse);
      pulse.value = 0;
      return;
    }
    pulse.value = withRepeat(
      withTiming(1, { duration: urgent ? 650 : 1300, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [pulse, running, expired, urgent, reduceMotion]);
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: 0.25 + pulse.value * 0.55,
    transform: [{ scale: 0.94 + pulse.value * 0.08 }],
  }));

  const hms = running ? formatHMS(left) : '72:00:00';
  const [hh, mm, ss] = hms.split(':');
  const elapsedHours = 72 - hoursLeft;
  const phase = !running ? -1 : expired ? 3 : Math.min(2, Math.floor(elapsedHours / 24));
  const PHASES = ['GO TODAY', 'GO NOW', 'LAST CALL'];

  return (
    <View
      className="w-full overflow-hidden rounded-3xl"
      style={{ backgroundColor: '#0E1821', borderWidth: 1, borderColor: alpha(neon, 0.45) }}
    >
      {/* Header strip */}
      <View
        className="flex-row items-center justify-between px-4 py-2.5"
        style={{ borderBottomWidth: 1, borderBottomColor: NEON.grid }}
      >
        <View className="flex-row items-center gap-2">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: running && !expired ? neon : NEON.dim }}
          />
          <Mono
            bold
            color={running && !expired ? neon : '#7D8B97'}
            tracking={2}
            className="text-[12px]"
          >
            {running ? (expired ? 'WINDOW CLOSED' : 'LIVE · PEP WINDOW') : 'STANDING BY'}
          </Mono>
        </View>
        <Mono bold color="#7D8B97" tracking={2} className="text-[12px]">
          T-MINUS 72H
        </Mono>
      </View>

      <View
        accessible
        accessibilityRole="timer"
        accessibilityLabel={
          running
            ? expired
              ? 'The 72-hour window has passed.'
              : `${Math.floor(left / 3_600_000)} hours and ${Math.floor((left % 3_600_000) / 60_000)} minutes left in the 72-hour window.`
            : 'Clock not started. 72 hours.'
        }
        className="items-center py-6"
      >
        <View style={{ width: size, height: size }} className="items-center justify-center">
          <AnimatedView
            pointerEvents="none"
            className="absolute rounded-full"
            style={[
              {
                width: size - 20,
                height: size - 20,
                borderWidth: 18,
                borderColor: alpha(neon, 0.18),
              },
              pulseStyle,
            ]}
          />
          <Svg width={size} height={size} style={{ position: 'absolute' }}>
            <Circle
              cx={c}
              cy={c}
              r={tickInner - 6}
              fill="#0B141C"
              stroke={NEON.grid}
              strokeWidth={1}
            />
            {Array.from({ length: 72 }, (_, i) => {
              const angle = ((i * 5 - 90) * Math.PI) / 180;
              const lit = i < hoursLeft;
              const major = i % 12 === 0;
              const inner = major ? tickInner - 6 : tickInner;
              return (
                <Line
                  key={i}
                  x1={c + inner * Math.cos(angle)}
                  y1={c + inner * Math.sin(angle)}
                  x2={c + tickOuter * Math.cos(angle)}
                  y2={c + tickOuter * Math.sin(angle)}
                  stroke={lit ? neon : NEON.dim}
                  strokeWidth={major ? 4 : 3}
                  strokeLinecap="round"
                  opacity={lit ? 1 : 0.6}
                />
              );
            })}
            {running && !expired ? (
              <Circle
                cx={c}
                cy={c}
                r={sweepR}
                stroke={NEON.cyan}
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${sweepCirc} ${sweepCirc}`}
                strokeDashoffset={sweepCirc * (1 - secondFraction)}
                transform={`rotate(-90 ${c} ${c})`}
                opacity={0.85}
              />
            ) : null}
          </Svg>

          <Mono bold color={alpha(neon, 0.9)} tracking={3} className="text-[13px]">
            {running ? (expired ? 'WINDOW PASSED' : 'TIME LEFT') : 'NOT STARTED'}
          </Mono>
          <Text
            className="mt-1 text-[84px] leading-[88px]"
            style={{
              color: neon,
              fontFamily: 'BebasNeue_400Regular',
              letterSpacing: 2,
              ...glow(neon, 18),
            }}
          >
            {hh}
          </Text>
          <Text
            className="-mt-1 text-4xl"
            style={{
              color: neon,
              fontFamily: 'BebasNeue_400Regular',
              letterSpacing: 2,
              ...glow(neon, 10),
            }}
          >
            {`${mm}:${ss}`}
          </Text>
          <Mono color="#7D8B97" tracking={2} className="mt-1 text-[10px]">
            HRS · MIN : SEC
          </Mono>
        </View>
      </View>

      {/* Phase track */}
      <View className="flex-row gap-1.5 px-4 pb-4">
        {PHASES.map((label, i) => {
          const done = phase > i;
          const now = phase === i;
          const tint = i === 2 ? NEON.red : NEON.amber;
          return (
            <View key={label} className="flex-1">
              <View
                className="h-1.5 rounded-full"
                style={{ backgroundColor: now ? tint : done ? alpha(tint, 0.35) : NEON.dim }}
              />
              <Mono
                bold={now}
                color={now ? tint : '#7D8B97'}
                tracking={1.5}
                className="mt-1.5 text-center text-[11px]"
              >
                {`${i * 24}–${(i + 1) * 24}H\n${label}`}
              </Mono>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/** Live countdown row for Home and Crisis. Blue track only, only while running. */
export function PepCountdownBanner({ className }: { className?: string }) {
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const discreet = useCapeStore((s) => s.discreetPin !== null);
  const { left, expired } = usePepTime(pepStartedAt);
  if (!pepStartedAt || !pepUnlocked(gradeBand) || discreet) return null;
  const neon = neonFor(left, expired, true);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        expired
          ? 'PEP clock: the 72-hour window has passed. Open the PEP clock.'
          : `PEP clock running. ${formatHMS(left)} left. Open the PEP clock.`
      }
      onPress={() => router.push('/tools/pep-clock')}
      className={`rounded-2xl px-4 py-3 active:opacity-80 ${className ?? ''}`}
      style={{ backgroundColor: '#0E1821', borderWidth: 1, borderColor: alpha(neon, 0.55) }}
    >
      <View className="flex-row items-center gap-3">
        <Timer size={22} color={neon} />
        <View className="flex-1">
          <Mono bold color={neon} className="text-[12px]" tracking={2}>
            {expired ? 'PEP WINDOW PASSED' : 'LIVE · PEP WINDOW · T-MINUS'}
          </Mono>
          {expired ? (
            <Mono color="#C9D3DB" className="mt-0.5 text-[13px]">
              Still get checked. Tap for next steps.
            </Mono>
          ) : (
            <Text
              className="mt-0.5 text-4xl"
              style={{
                color: neon,
                fontFamily: 'BebasNeue_400Regular',
                letterSpacing: 2,
                ...glow(neon, 10),
              }}
            >
              {formatHMS(left)}
            </Text>
          )}
        </View>
        <ArrowRight size={16} color={neon} />
      </View>
    </Pressable>
  );
}
