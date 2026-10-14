import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Image, Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { THREE_SECOND_RULE } from '@/lib/data/emergency';
import { PAUSE_FRAMES, PAUSE_IDLE } from '@/lib/pauseFrames';

const ART_RATIO = 560 / 454;
const TOTAL_MS = 3000;

type Phase = 'idle' | 'running' | 'done';

/**
 * The Pause Button: a real-time 3 · 2 · 1 countdown. Each second gets one
 * step of the 3-Second Rule. Urgent help never waits on it.
 */
export function PauseButton({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastNumber = useRef(0);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => stop, []);

  const tick = (number: number) => {
    if (number === lastNumber.current) return;
    lastNumber.current = number;
    AccessibilityInfo.announceForAccessibility(String(number));
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
  };

  const start = () => {
    stop();
    const startedAt = Date.now();
    lastNumber.current = 0;
    setElapsed(0);
    setPhase('running');
    tick(3);
    timer.current = setInterval(() => {
      const ms = Date.now() - startedAt;
      if (ms >= TOTAL_MS) {
        stop();
        setElapsed(TOTAL_MS);
        setPhase('done');
        AccessibilityInfo.announceForAccessibility(
          'Pause complete. Name your next move. Urgent help is always available.',
        );
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => undefined,
        );
        return;
      }
      setElapsed(ms);
      tick(3 - Math.floor(ms / 1000));
    }, 50);
  };

  const cancel = () => {
    stop();
    setPhase('idle');
    setElapsed(0);
  };

  const running = phase === 'running';
  const done = phase === 'done';
  const number = running ? 3 - Math.floor(elapsed / 1000) : 0;
  // The bar drains across each second, so every number gets a full sweep.
  const secondFraction = running ? (elapsed % 1000) / 1000 : 0;
  const ringColor = done ? C.teal : C.flame;
  const step = running ? THREE_SECOND_RULE.steps[3 - number] : null;
  const last = PAUSE_FRAMES.length - 1;
  const frameIndex = done
    ? last
    : running
      ? Math.min(last, Math.floor((elapsed / TOTAL_MS) * PAUSE_FRAMES.length))
      : -1;

  return (
    <Panel tint={ringColor} fill={running ? 0.08 : 0.04} stroke={0.24} className={className}>
      <Eyebrow color={ringColor}>THE PAUSE BUTTON</Eyebrow>
      <Mono className="mt-2 text-[13px]">{THREE_SECOND_RULE.lead}</Mono>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          running
            ? `Pausing. ${number}. Tap to stop.`
            : done
              ? 'Pause complete. Tap to pause again.'
              : 'Start a three-second pause'
        }
        onPress={running ? cancel : start}
        className="mt-5 overflow-hidden rounded-2xl active:opacity-90"
        style={{ width: '100%', aspectRatio: ART_RATIO, backgroundColor: C.ink }}
      >
        {/* All frames stay mounted so swapping is instant; only one is visible. */}
        <Image
          source={PAUSE_IDLE}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
          className="absolute inset-0"
          style={{ width: '100%', height: '100%', opacity: running || done ? 0 : 1 }}
        />
        {PAUSE_FRAMES.map((frame, i) => (
          <Image
            key={String(frame)}
            source={frame}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
            className="absolute inset-0"
            style={{ width: '100%', height: '100%', opacity: i === frameIndex ? 1 : 0 }}
          />
        ))}
        {running || done ? (
          <View
            className="absolute inset-0 items-center justify-center"
            style={{ backgroundColor: alpha(C.ink, done ? 0.35 : 0.12) }}
          >
            {running ? (
              <Text
                className="text-[150px] leading-[156px]"
                style={{
                  color: C.paper2,
                  fontFamily: 'BebasNeue_400Regular',
                  textShadowColor: alpha('#000000', 0.85),
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 18,
                }}
              >
                {number}
              </Text>
            ) : (
              <View className="items-center">
                <Display color={C.paper2} className="text-6xl">
                  NEXT MOVE
                </Display>
                <Mono bold color={C.paper2} tracking={2} className="mt-1 text-[13px]">
                  TAP TO PAUSE AGAIN
                </Mono>
              </View>
            )}
          </View>
        ) : (
          <View className="absolute inset-x-0 bottom-0 items-center pb-3">
            <View
              className="rounded-full px-4 py-1.5"
              style={{ backgroundColor: alpha(C.ink, 0.7) }}
            >
              <Mono bold color={C.paper2} tracking={3} className="text-[13px]">
                TAP TO PAUSE · 3 · 2 · 1
              </Mono>
            </View>
          </View>
        )}
        {running ? (
          <View
            className="absolute inset-x-0 bottom-0 h-2"
            style={{ backgroundColor: alpha(C.paper2, 0.2) }}
          >
            <View
              className="h-2"
              style={{ width: `${(1 - secondFraction) * 100}%`, backgroundColor: C.flame }}
            />
          </View>
        ) : null}
      </Pressable>

      <View
        accessibilityLiveRegion="polite"
        className="mt-5 min-h-14 justify-center rounded-xl px-3 py-2.5"
        style={{
          backgroundColor: done ? alpha(C.teal, 0.1) : running ? alpha(C.flame, 0.1) : C.card,
          borderWidth: 1,
          borderColor: alpha(
            done ? C.teal : running ? C.flame : C.ink,
            running || done ? 0.4 : 0.12,
          ),
        }}
      >
        <Mono bold={running || done} className="text-center text-[13px]" color={C.inkSoft}>
          {step ?? (done ? THREE_SECOND_RULE.done : 'Tap the button. Count down with it.')}
        </Mono>
      </View>

      <Mono className="mt-3 text-[13px]" color={C.inkSoft}>
        {THREE_SECOND_RULE.close}
      </Mono>
    </Panel>
  );
}
