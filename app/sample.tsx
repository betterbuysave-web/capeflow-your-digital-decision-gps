import { useState } from 'react';
import { AccessibilityInfo, Platform, Pressable, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ArrowRight, RotateCcw } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { MetallicButton } from '@/components/cape/Buttons';
import { StackHeader } from '@/components/cape/Screen';
import { VerdictBadge } from '@/components/cape/VerdictBadge';
import { C, alpha } from '@/lib/colors';
import { SAMPLE_SCENARIO } from '@/lib/data/scenarios';
import { getModule } from '@/lib/data/match';
import { verdictColor, verdictLabel } from '@/lib/verdict';

export default function SampleScenario() {
  const scenario = SAMPLE_SCENARIO;
  const [pickedId, setPickedId] = useState<string | null>(null);
  const picked = scenario.choices.find((c) => c.id === pickedId) ?? null;
  const mod = picked ? getModule(picked.matchTag) : undefined;

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="Sample Scenario" fallback="/" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.teal}>TRY IT NOW</Eyebrow>
        <Display className="mt-3 text-4xl">What would you do at 1:47 AM?</Display>
        <Body className="mt-3">
          A taste of the Midnight Simulator. Pick a response and see how the M.A.T.C.H. framework
          turns panic into a plan.
        </Body>

        <View
          className="mt-6 overflow-hidden rounded-2xl"
          style={{
            borderWidth: 1.5,
            borderColor: alpha(C.teal, 0.25),
            backgroundColor: C.paper2,
          }}
        >
          <View
            className="px-5 py-4"
            style={{
              backgroundColor: alpha(C.teal, 0.06),
              borderBottomWidth: 1,
              borderBottomColor: alpha(C.teal, 0.15),
            }}
          >
            <View className="mb-1 flex-row items-center gap-2">
              <Mono className="text-base">{scenario.emoji}</Mono>
              <Eyebrow color={C.teal}>SAMPLE SCENARIO · MIDNIGHT SIM</Eyebrow>
            </View>
            <Mono className="text-[10px]" color={C.inkFaint}>
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
              <Mono className="text-[12px]" color={C.inkSoft}>
                {scenario.message}
              </Mono>
              <Mono className="mt-1.5 text-right text-[10px]" color={C.inkFaint}>
                {scenario.bubbleTime}
              </Mono>
            </View>
          </View>

          <View className="gap-2 px-5 pb-5">
            <Mono className="mb-1 text-[9px]" color={C.inkFaint} tracking={2}>
              {scenario.prompt}
            </Mono>
            {scenario.choices.map((choice) => {
              const isPicked = choice.id === pickedId;
              return (
                <Pressable
                  key={choice.id}
                  accessibilityRole="radio"
                  accessibilityLabel={choice.label}
                  accessibilityState={{ checked: isPicked, selected: isPicked }}
                  onPress={() => {
                    setPickedId(choice.id);
                    void Haptics.selectionAsync();
                    if (Platform.OS !== 'web') {
                      AccessibilityInfo.announceForAccessibility(
                        `${verdictLabel(choice.verdict)}. ${choice.feedback}`,
                      );
                    }
                  }}
                  className="flex-row items-center justify-between gap-3 rounded-xl px-4 py-3 active:opacity-70"
                  style={{
                    backgroundColor: isPicked ? alpha(verdictColor(choice.verdict), 0.12) : C.card,
                    borderWidth: 1,
                    borderColor: isPicked
                      ? alpha(verdictColor(choice.verdict), 0.45)
                      : alpha(C.ink, 0.13),
                  }}
                >
                  <Mono className="flex-1 text-[11px]" color={C.inkSoft}>
                    {choice.label}
                  </Mono>
                  {isPicked ? (
                    <VerdictBadge verdict={choice.verdict} />
                  ) : (
                    <ArrowRight size={14} color={C.inkFaint} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {picked ? (
          <View className="mt-5 gap-3" accessibilityLiveRegion="polite">
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
                TRY ANOTHER ANSWER
              </Mono>
            </Pressable>
          </View>
        ) : null}

        <View className="mt-8">
          <MetallicButton
            label="UNLOCK THE FULL COMPASS"
            onPress={() => router.replace('/onboarding')}
          />
          <Mono className="mt-4 text-center text-[9px]" color={C.inkFaint} tracking={2}>
            FREE · NO SIGN-UP NEEDED · GRADES 6–12
          </Mono>
        </View>
      </ScrollView>
    </View>
  );
}
