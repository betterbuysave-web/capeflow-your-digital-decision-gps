import { useState } from 'react';
import { AccessibilityInfo, Platform, Pressable, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { ArrowRight, RotateCcw, Zap } from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { GradientAction, MetallicButton } from '@/components/cape/Buttons';
import { MissionComplete } from '@/components/cape/MissionComplete';
import { ActivityGuide } from '@/components/cape/ActivityGuide';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { VerdictBadge } from '@/components/cape/VerdictBadge';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  getPivotChallenge,
  getScenario,
  scenariosForTrack,
  type Verdict,
} from '@/lib/data/scenarios';
import { getModule } from '@/lib/data/match';
import { useCapeStore } from '@/lib/store/useCapeStore';
import { verdictColor, verdictLabel } from '@/lib/verdict';

export default function SimDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scenario = getScenario(id ?? '');
  const gradeBand = useCapeStore((state) => state.gradeBand);
  const recordScenario = useCapeStore((state) => state.recordScenario);
  const scenarioResults = useCapeStore((state) => state.scenarioResults);
  const saved = scenario ? scenarioResults[scenario.id] : undefined;
  const [pickedId, setPickedId] = useState<string | null>(saved?.choiceId ?? null);
  const [pivotId, setPivotId] = useState<string | null>(saved?.pivotChoiceId ?? null);
  const track = trackFor(gradeBand);

  if (!scenario) {
    return (
      <View className="bg-paper flex-1">
        <NotebookBackdrop />
        <StackHeader title="Midnight Sim" fallback="/(tabs)/tools" />
        <View className="flex-1 items-center justify-center px-6">
          <Display className="text-3xl">Scenario not found</Display>
          <Body className="mt-2 text-center">Pick another night from the simulator list.</Body>
        </View>
      </View>
    );
  }

  // Each track has its own scenarios; the other track's never show.
  if (scenario.track !== track) return <Redirect href="/(tabs)/tools" />;

  const picked = scenario.choices.find((choice) => choice.id === pickedId) ?? null;
  const pivot = getPivotChallenge(scenario.id);
  const pivotChoice = pivot.choices.find((choice) => choice.id === pivotId) ?? null;
  const mod = picked ? getModule(picked.matchTag) : undefined;
  const availableScenarios = scenariosForTrack(track);
  const nextScenario = availableScenarios.find(
    (item) => item.id !== scenario.id && !scenarioResults[item.id],
  );

  const choosePivot = (choiceId: string, verdict: Verdict) => {
    if (!picked) return;
    setPivotId(choiceId);
    if (Platform.OS !== 'web') {
      AccessibilityInfo.announceForAccessibility(
        `Pivot complete. ${verdictLabel(verdict)}. ${scenario.debrief}`,
      );
    }
    const combinedVerdict: Verdict =
      picked.verdict === 'risky' || verdict === 'risky'
        ? 'risky'
        : picked.verdict === 'ok'
          ? 'ok'
          : 'best';
    recordScenario(scenario.id, picked.id, choiceId, combinedVerdict, scenario.xp);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="Midnight Sim" tint={C.violet} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.violet}>{scenario.time} · STRESS TEST</Eyebrow>
        <Display className="mt-2 text-4xl">{scenario.title}</Display>
        <ActivityGuide
          className="mt-5"
          tint={C.violet}
          minutes={3}
          what={
            "A Midnight Sim is a practice run of a hard moment. No grades — practice feedback only. You earn XP for finishing a scenario, not for picking a 'right' answer."
          }
          steps={[
            'Read the message.',
            'Pick what you would really do.',
            'Read why it works or what to watch for.',
            'Handle the twist, then read the debrief.',
          ]}
          outcome={'a plan for this moment before it happens.'}
        />

        <Panel tint={C.violet} fill={0.06} stroke={0.22} className="mt-5">
          <Mono className="text-[13px]">{scenario.setup}</Mono>
          <View
            className="mt-4 ml-auto max-w-[90%] rounded-2xl px-4 py-3"
            style={{
              backgroundColor: alpha(C.azure, 0.1),
              borderWidth: 1,
              borderColor: alpha(C.azure, 0.28),
            }}
          >
            <Mono className="text-[14px]">{scenario.message}</Mono>
            <Mono className="mt-1 text-right text-[11px]" color={C.inkFaint}>
              {scenario.bubbleTime}
            </Mono>
          </View>
          <Eyebrow color={C.violet} className="mt-5">
            {scenario.prompt}
          </Eyebrow>
          <View className="mt-3 gap-2">
            {scenario.choices.map((choice) => {
              const selected = choice.id === pickedId;
              return (
                <Pressable
                  key={choice.id}
                  accessibilityRole="radio"
                  accessibilityLabel={choice.label}
                  accessibilityState={{ checked: selected, selected }}
                  onPress={() => {
                    setPickedId(choice.id);
                    void Haptics.selectionAsync();
                    if (Platform.OS !== 'web') {
                      AccessibilityInfo.announceForAccessibility(
                        `${verdictLabel(choice.verdict)}. ${choice.feedback} The Pivot: ${pivot.trigger}`,
                      );
                    }
                    setPivotId(null);
                  }}
                  className="flex-row items-center gap-3 rounded-xl px-4 py-3 active:opacity-70"
                  style={{
                    backgroundColor: selected ? alpha(verdictColor(choice.verdict), 0.12) : C.card,
                    borderWidth: 1,
                    borderColor: selected
                      ? alpha(verdictColor(choice.verdict), 0.45)
                      : alpha(C.ink, 0.13),
                  }}
                >
                  <Mono className="flex-1 text-[13px]">{choice.label}</Mono>
                  {selected ? (
                    <VerdictBadge verdict={choice.verdict} />
                  ) : (
                    <ArrowRight size={14} color={C.inkFaint} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Panel>

        {picked ? (
          <View className="mt-5 gap-3" accessibilityLiveRegion="polite">
            <Panel tint={verdictColor(picked.verdict)} fill={0.06} stroke={0.22}>
              <Eyebrow color={verdictColor(picked.verdict)}>{verdictLabel(picked.verdict)}</Eyebrow>
              <Mono className="mt-2 text-[13px]">{picked.feedback}</Mono>
              {mod ? (
                <Mono bold color={mod.color} className="mt-3 text-[13px]">
                  {mod.name.toUpperCase()} MOVE
                </Mono>
              ) : null}
            </Panel>
            <Panel tint={C.flame} fill={0.08} stroke={0.3}>
              <View className="flex-row items-center gap-2">
                <Zap size={17} color={C.flame} />
                <Eyebrow color={C.flame}>THE PIVOT</Eyebrow>
              </View>
              <Mono bold className="mt-3 text-[13px]">
                {pivot.trigger}
              </Mono>
              <Body className="mt-2">
                The first plan changed. Choose the redundant layer that keeps you moving safely.
              </Body>
              <View className="mt-4 gap-2">
                {pivot.choices.map((choice) => (
                  <Pressable
                    key={choice.id}
                    accessibilityRole="radio"
                    accessibilityLabel={choice.label}
                    accessibilityState={{
                      checked: pivotId === choice.id,
                      selected: pivotId === choice.id,
                    }}
                    onPress={() => choosePivot(choice.id, choice.verdict)}
                    className="rounded-xl px-4 py-3 active:opacity-70"
                    style={{
                      backgroundColor:
                        pivotId === choice.id ? alpha(verdictColor(choice.verdict), 0.12) : C.card,
                      borderWidth: 1,
                      borderColor:
                        pivotId === choice.id
                          ? alpha(verdictColor(choice.verdict), 0.45)
                          : alpha(C.ink, 0.14),
                    }}
                  >
                    <Mono className="text-[13px]">{choice.label}</Mono>
                  </Pressable>
                ))}
              </View>
            </Panel>
          </View>
        ) : null}

        {picked && pivotChoice ? (
          <View className="mt-5 gap-3" accessibilityLiveRegion="polite">
            <MissionComplete detail="You practiced the Pivot: when one layer fails, deploy another instead of freezing." />
            <Panel tint={C.teal} fill={0.05} stroke={0.18}>
              <Eyebrow color={C.teal}>DEBRIEF</Eyebrow>
              <Mono className="mt-2 text-[13px]">{scenario.debrief}</Mono>
            </Panel>
            <GradientAction
              onPress={() => {
                setPickedId(null);
                setPivotId(null);
              }}
              className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3"
            >
              <RotateCcw size={13} color={C.paper2} />
              <Mono bold color={C.paper2} className="text-[13px]">
                RUN IT AGAIN
              </Mono>
            </GradientAction>
            {nextScenario ? (
              <MetallicButton
                label="NEXT SCENARIO"
                onPress={() =>
                  router.replace({ pathname: '/sim/[id]', params: { id: nextScenario.id } })
                }
              />
            ) : null}
          </View>
        ) : null}

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
