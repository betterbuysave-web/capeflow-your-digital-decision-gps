import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Redirect } from 'expo-router';

import { ActivityGuide, NextStepButton, StepTabs } from '@/components/cape/ActivityGuide';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { FieldDrillCard, PivotBuilder, SortGame } from '@/components/cape/Drills';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  CAPE_LETTERS,
  VIBE_BINS,
  VIBE_DRILLS,
  VIBE_PIVOT,
  VIBE_RULE,
  VIBE_SORT,
} from '@/lib/data/vibe';
import { useCapeStore } from '@/lib/store/useCapeStore';

const TINT = C.modA;
const STEPS = ['Real yes?', 'Field drills', 'Graceful Pivot', 'Wear your CAPE'];

/** Green Track: the Vibe Check Navigator. */
export default function VibeCheck() {
  const track = trackFor(useCapeStore((s) => s.gradeBand));
  const saveScript = useCapeStore((s) => s.saveStrongestVoiceScript);
  const letter = useCapeStore((s) => s.activityLog['vibe-check']?.letter);
  const logActivity = useCapeStore((s) => s.logActivity);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  if (track !== 'green') return <Redirect href="/tools/green-light" />;

  const go = (next: number) => {
    setDone((d) => (d.includes(step) ? d : [...d, step]));
    setStep(next);
  };

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="Vibe Check Navigator" tint={TINT} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={TINT}>THE VIBE CHECK</Eyebrow>
        <Display className="mt-2 text-4xl">
          Healthy friendships feel like freedom, not pressure.
        </Display>

        <ActivityGuide
          className="mt-5"
          tint={TINT}
          minutes={10}
          what="Your body has a built-in radar. A relaxed chest and real smiles mean go. A tight stomach or feeling trapped means stop and check in. This activity trains that radar for everyday friendships."
          steps={[
            'Sort each reaction: real "Heck yes!" or "Polite maybe"?',
            'Run the field drills and spot which F.R.I.E.S. dial is off.',
            'Build your Graceful Pivot line and save it.',
            'Pick the CAPE letter you will lean on this week.',
          ]}
          outcome="a Graceful Pivot line saved to your Strongest Voice scripts."
        />

        <StepTabs steps={STEPS} active={step} done={done} tint={TINT} onSelect={setStep} />

        <View className="mt-5">
          {step === 0 ? (
            <View>
              <Eyebrow color={TINT}>STEP 1 · THE REAL YES VS. THE FAKE YES</Eyebrow>
              <Body className="mt-2">Tap where each one belongs.</Body>
              <View className="mt-4">
                <SortGame items={VIBE_SORT} bins={VIBE_BINS} tint={TINT} rule={VIBE_RULE} />
              </View>
              <NextStepButton label="NEXT: FIELD DRILLS" tint={TINT} onPress={() => go(1)} />
            </View>
          ) : null}

          {step === 1 ? (
            <View>
              <Eyebrow color={TINT}>STEP 2 · FIELD DRILLS</Eyebrow>
              <Body className="mt-2">Read each one and pick the dial that is off.</Body>
              <View className="mt-4 gap-4">
                {VIBE_DRILLS.map((drill) => (
                  <FieldDrillCard key={drill.id} drill={drill} tint={TINT} />
                ))}
              </View>
              <NextStepButton label="NEXT: GRACEFUL PIVOT" tint={TINT} onPress={() => go(2)} />
            </View>
          ) : null}

          {step === 2 ? (
            <View>
              <Eyebrow color={TINT}>STEP 3 · THE GRACEFUL PIVOT</Eyebrow>
              <Body className="mt-2">
                Keep the mood positive and still be clear about what you need. Pick one line from
                each step.
              </Body>
              <View className="mt-4">
                <PivotBuilder slots={VIBE_PIVOT} tint={TINT} onSave={saveScript} />
              </View>
              <NextStepButton label="NEXT: WEAR YOUR CAPE" tint={TINT} onPress={() => go(3)} />
            </View>
          ) : null}

          {step === 3 ? (
            <View>
              <Eyebrow color={TINT}>STEP 4 · WEAR YOUR CAPE</Eyebrow>
              <Display className="mt-2 text-3xl">Which letter will you lean on this week?</Display>
              <View className="mt-4 gap-2">
                {CAPE_LETTERS.map((item) => {
                  const selected = letter === item.letter;
                  return (
                    <Pressable
                      key={item.letter}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => logActivity('vibe-check', 'letter', item.letter)}
                      className="flex-row items-center gap-3 rounded-2xl p-4 active:opacity-70"
                      style={{
                        backgroundColor: selected ? alpha(TINT, 0.14) : C.card,
                        borderWidth: 1.5,
                        borderColor: selected ? TINT : alpha(C.ink, 0.15),
                      }}
                    >
                      <Display color={TINT} className="w-8 text-3xl">
                        {item.letter}
                      </Display>
                      <View className="flex-1">
                        <Mono bold color={C.ink} className="text-[14px]">
                          {item.word}
                        </Mono>
                        <Body>{item.detail}</Body>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
              {letter ? (
                <Panel tint={TINT} fill={0.1} stroke={0.35} className="mt-4">
                  <Body color={C.ink}>
                    Living with your CAPE on is a choice you make every day. This week, lean on{' '}
                    {letter}.
                  </Body>
                </Panel>
              ) : null}
            </View>
          ) : null}
        </View>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
