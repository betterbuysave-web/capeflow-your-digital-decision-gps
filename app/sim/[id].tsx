import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight, RotateCcw } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { MetallicButton } from '@/components/cape/Buttons';
import { StackHeader } from '@/components/cape/Screen';
import { VerdictBadge } from '@/components/cape/VerdictBadge';
import { C, alpha } from '@/lib/colors';
import { SCENARIOS, getScenario } from '@/lib/data/scenarios';
import { getModule } from '@/lib/data/match';
import { verdictColor, verdictLabel } from '@/lib/verdict';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function SimDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scenario = getScenario(id ?? '');
  const recordScenario = useCapeStore((s) => s.recordScenario);
  const scenarioResults = useCapeStore((s) => s.scenarioResults);
  const saved = scenario ? scenarioResults[scenario.id] : undefined;
  const [pickedId, setPickedId] = useState<string | null>(saved?.choiceId ?? null);

  if (!scenario) {
    return (
      <View className="bg-paper flex-1">
        <StackHeader title="Midnight Sim" fallback="/(tabs)/tools" />
        <View className="flex-1 items-center justify-center px-6">
          <Display className="text-3xl">Scenario not found</Display>
          <Body className="mt-2 text-center">Pick another night from the simulator list.</Body>
        </View>
      </View>
    );
  }

  const picked = scenario.choices.find((c) => c.id === pickedId) ?? null;
  const mod = picked ? getModule(picked.matchTag) : undefined;
  const nextScenario = SCENARIOS.find((s) => s.id !== scenario.id && !scenarioResults[s.id]);

  const choose = (choiceId: string) => {
    const choice = scenario.choices.find((c) => c.id === choiceId);
    if (!choice) return;
    setPickedId(choiceId);
    recordScenario(scenario.id, choice.id, choice.verdict, scenario.xp);
  };

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="Midnight Sim" tint={C.violet} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.violet}>{scenario.time} · MIDNIGHT SIM</Eyebrow>
        <Display className="mt-2 text-4xl">{scenario.title}</Display>

        <View
          className="mt-5 overflow-hidden rounded-2xl"
          style={{
            borderWidth: 1.5,
            borderColor: alpha(C.violet, 0.25),
            backgroundColor: alpha('#080c14', 0.9),
          }}
        >
          <View
            className="px-5 py-4"
            style={{
              backgroundColor: alpha(C.violet, 0.07),
              borderBottomWidth: 1,
              borderBottomColor: alpha(C.violet, 0.15),
            }}
          >
            <View className="mb-1 flex-row items-center gap-2">
              <Mono className="text-base">{scenario.emoji}</Mono>
              <Eyebrow color={C.violet}>SCENARIO</Eyebrow>
            </View>
            <Mono className="text-[10px]" color={alpha(C.inkFaint, 0.75)}>
              {scenario.setup}
            </Mono>
          </View>

          <View className="px-5 py-4">
            <View
              className="ml-auto max-w-[85%] rounded-2xl px-4 py-3"
              style={{
                backgroundColor: alpha(C.azure, 0.12),
                borderWidth: 1,
                borderColor: alpha(C.azure, 0.25),
                borderBottomLeftRadius: 4,
              }}
            >
              <Mono className="text-[12px]" color={alpha(C.inkSoft, 0.9)}>
                {scenario.message}
              </Mono>
              <Mono className="mt-1.5 text-right text-[8px]" color={alpha(C.inkFaint, 0.5)}>
                {scenario.bubbleTime}
              </Mono>
            </View>
          </View>

          <View className="gap-2 px-5 pb-5">
            <Mono className="mb-1 text-[9px]" color={alpha(C.inkFaint, 0.6)} tracking={2}>
              {scenario.prompt}
            </Mono>
            {scenario.choices.map((choice) => {
              const isPicked = choice.id === pickedId;
              return (
                <Pressable
                  key={choice.id}
                  accessibilityRole="button"
                  onPress={() => choose(choice.id)}
                  className="flex-row items-center justify-between gap-3 rounded-xl px-4 py-3 active:opacity-70"
                  style={{
                    backgroundColor: isPicked ? alpha(verdictColor(choice.verdict), 0.12) : C.card,
                    borderWidth: 1,
                    borderColor: isPicked
                      ? alpha(verdictColor(choice.verdict), 0.45)
                      : alpha(C.ink, 0.13),
                  }}
                >
                  <Mono className="flex-1 text-[11px]" color={alpha(C.inkSoft, 0.85)}>
                    {choice.label}
                  </Mono>
                  {isPicked ? (
                    <VerdictBadge verdict={choice.verdict} />
                  ) : (
                    <ArrowRight size={14} color={alpha(C.inkFaint, 0.5)} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {picked ? (
          <View className="mt-5 gap-3">
            <Panel tint={verdictColor(picked.verdict)} fill={0.06} stroke={0.22}>
              <Eyebrow color={verdictColor(picked.verdict)} className="mb-2">
                {verdictLabel(picked.verdict)}
              </Eyebrow>
              <Mono className="text-[11px]">{picked.feedback}</Mono>
              {mod ? (
                <View className="mt-3 flex-row items-center gap-2">
                  <Mono className="text-sm">{mod.emoji}</Mono>
                  <Mono bold color={mod.color} className="text-[10px]" tracking={1}>
                    {mod.name.toUpperCase()} MOVE
                  </Mono>
                </View>
              ) : null}
            </Panel>

            <Panel tint={C.teal} fill={0.05} stroke={0.18}>
              <Eyebrow color={C.teal} className="mb-2">
                DEBRIEF
              </Eyebrow>
              <Mono className="text-[11px]">{scenario.debrief}</Mono>
            </Panel>

            <Pressable
              accessibilityRole="button"
              onPress={() => setPickedId(null)}
              className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3 active:opacity-70"
              style={{
                backgroundColor: C.card,
                borderWidth: 1,
                borderColor: alpha(C.ink, 0.14),
              }}
            >
              <RotateCcw size={13} color={alpha(C.inkFaint, 0.8)} />
              <Mono bold color={alpha(C.inkFaint, 0.8)} tracking={2} className="text-[10px]">
                EXPLORE ANOTHER ANSWER
              </Mono>
            </Pressable>

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
      </ScrollView>
    </View>
  );
}
