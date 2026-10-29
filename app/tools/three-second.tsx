import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ShieldCheck, Timer } from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { ActivityGuide } from '@/components/cape/ActivityGuide';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  SHIELD_CHECKS,
  SHIELD_PLEDGE,
  type ShieldMove,
  shieldScenarios,
} from '@/lib/data/threeSecond';
import { useCapeStore } from '@/lib/store/useCapeStore';

const TINT = C.tealBright;
const EMPTY: Record<string, string> = {};

export default function ThreeSecondChallenge() {
  const track = trackFor(useCapeStore((s) => s.gradeBand));
  const log = useCapeStore((s) => s.activityLog['three-second']) ?? EMPTY;
  const logActivity = useCapeStore((s) => s.logActivity);
  const scenarios = shieldScenarios(track);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0); // 0 idle, 3..1 counting, -1 ready
  const [picked, setPicked] = useState<ShieldMove | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const scenario = scenarios[index];
  const finished = scenarios.every((s) => log[s.id]);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const startPause = () => {
    if (timer.current) return;
    const started = Date.now();
    setCount(3);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    timer.current = setInterval(() => {
      const left = 3 - Math.floor((Date.now() - started) / 1000);
      if (left <= 0) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setCount(-1);
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => undefined,
        );
        return;
      }
      setCount(left);
    }, 100);
  };

  const choose = (move: ShieldMove) => {
    setPicked(move);
    logActivity('three-second', scenario.id, move);
    void Haptics.selectionAsync().catch(() => undefined);
  };

  const next = () => {
    setIndex((i) => (i + 1) % scenarios.length);
    setPicked(null);
    setCount(0);
  };

  const ready = count === -1;
  const verdictTint = picked === scenario.best ? C.yes : picked === 'send' ? C.no : C.gold;

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="3-Second Rule Challenge" tint={C.teal} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.teal}>YOUR DIGITAL SHIELD</Eyebrow>
        <Display className="mt-2 text-4xl">Before you send it, pause for 3 seconds.</Display>

        <ActivityGuide
          className="mt-5"
          tint={C.teal}
          minutes={8}
          what="Screenshots last forever. This challenge trains the habit of pausing before you post, send, or share."
          steps={[
            'Read the five Shield Checks below.',
            'Read each scenario and tap "Take your 3 seconds."',
            'Pick Send, Pause, or Don’t send, then read why.',
            'Finish every scenario to unlock the Digital Shield Pledge.',
          ]}
          outcome="a pause habit and the Digital Shield Pledge."
        />

        <Panel tint={C.teal} fill={0.05} stroke={0.2} className="mt-5">
          <Eyebrow color={C.teal}>THE FIVE SHIELD CHECKS</Eyebrow>
          <View className="mt-3 gap-2">
            {SHIELD_CHECKS.map((check) => (
              <View key={check} className="flex-row items-start gap-2.5">
                <ShieldCheck size={16} color={C.teal} />
                <Body className="flex-1">{check}</Body>
              </View>
            ))}
          </View>
        </Panel>

        <View className="mt-6 flex-row items-center justify-between">
          <Mono bold color={C.ink} className="text-[13px]">
            {`SCENARIO ${index + 1} OF ${scenarios.length}`}
          </Mono>
          <Mono className="text-[13px]">{`${scenarios.filter((s) => log[s.id]).length} done`}</Mono>
        </View>

        <Panel tint={C.ink} fill={0.04} stroke={0.15} className="mt-2">
          <Mono className="text-3xl">{scenario.emoji}</Mono>
          <Display className="mt-1 text-3xl">{scenario.title}</Display>
          <Body className="mt-2" color={C.ink}>
            {scenario.setup}
          </Body>
          <Mono bold color={C.flame} className="mt-3 text-[13px]" tracking={1}>
            WHY IT IS HARD
          </Mono>
          <Body className="mt-1">{scenario.friction}</Body>
        </Panel>

        {!ready ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={count > 0 ? `Pausing, ${count}` : 'Take your 3 seconds'}
            onPress={startPause}
            className="mt-4 min-h-14 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
            style={{ backgroundColor: C.teal }}
          >
            <Timer size={18} color={C.paper2} />
            <Mono bold color={C.paper2} tracking={1} className="text-[14px]">
              {count > 0 ? `PAUSING… ${count}` : 'TAKE YOUR 3 SECONDS'}
            </Mono>
          </Pressable>
        ) : (
          <View className="mt-4">
            <Panel tint={TINT} fill={0.08} stroke={0.3}>
              <Eyebrow color={C.teal}>YOUR 3-SECOND CHECK</Eyebrow>
              <Body className="mt-1" color={C.ink}>
                {scenario.check}
              </Body>
            </Panel>
            <View className="mt-3 gap-2">
              {scenario.moves.map((move) => {
                const isPicked = picked === move.id;
                return (
                  <Pressable
                    key={move.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isPicked }}
                    onPress={() => choose(move.id)}
                    className="min-h-12 justify-center rounded-2xl px-4 active:opacity-70"
                    style={{
                      backgroundColor: isPicked ? alpha(verdictTint, 0.12) : C.card,
                      borderWidth: 1.5,
                      borderColor: isPicked ? verdictTint : alpha(C.ink, 0.15),
                    }}
                  >
                    <Mono bold color={C.ink} className="text-[14px]">
                      {move.label}
                    </Mono>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {picked ? (
          <View className="mt-4">
            <Panel tint={verdictTint} fill={0.08} stroke={0.35}>
              <Eyebrow color={verdictTint}>
                {picked === scenario.best ? 'SHIELD UP' : 'THINK IT THROUGH'}
              </Eyebrow>
              <Body className="mt-1" color={C.ink}>
                {scenario.feedback[picked]}
              </Body>
              <Mono bold color={C.ink} className="mt-3 text-[13px]">
                {`Power move: ${scenario.powerMove}`}
              </Mono>
            </Panel>
            <Pressable
              accessibilityRole="button"
              onPress={next}
              className="mt-3 min-h-12 items-center justify-center rounded-full active:opacity-80"
              style={{ borderWidth: 1.5, borderColor: C.teal }}
            >
              <Mono bold color={C.teal} tracking={1} className="text-[13px]">
                NEXT SCENARIO
              </Mono>
            </Pressable>
          </View>
        ) : null}

        <Panel
          tint={finished ? C.teal : C.inkFaint}
          fill={finished ? 0.1 : 0.03}
          stroke={0.3}
          className="mt-8"
        >
          <Eyebrow color={finished ? C.teal : C.inkFaint}>THE DIGITAL SHIELD PLEDGE</Eyebrow>
          {finished ? (
            <View>
              <Display className="mt-2 text-3xl">{SHIELD_PLEDGE}</Display>
              <Pressable
                accessibilityRole="button"
                onPress={() => logActivity('three-second', 'pledge', 'taken')}
                className="mt-4 min-h-12 items-center justify-center rounded-full active:opacity-80"
                style={{ backgroundColor: C.teal }}
              >
                <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                  {log.pledge ? 'PLEDGE TAKEN ✓' : 'I TAKE THE PLEDGE'}
                </Mono>
              </Pressable>
            </View>
          ) : (
            <Body className="mt-1">Finish every scenario above to unlock the pledge.</Body>
          )}
        </Panel>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
