import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Redirect } from 'expo-router';

import { ActivityGuide, NextStepButton, StepTabs } from '@/components/cape/ActivityGuide';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { PivotBuilder, SortGame } from '@/components/cape/Drills';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  CONNECTION_SCRIPTS,
  EVERYDAY_YES,
  GREEN_LIGHT_PIVOT,
  PILOT_CLOSE,
  PIVOT_BINS,
  PIVOT_DRILL_STEPS,
  PIVOT_RULE,
  PIVOT_SORT,
} from '@/lib/data/vibe';
import { useCapeStore } from '@/lib/store/useCapeStore';

const TINT = C.yes;
const STEPS = ['Fire drill or fireplace?', 'C + E', 'Scripts', 'Your pivot', 'Be the pilot'];

/** Blue Track: The Green Light Pivot (the Enthusiastic Yes). */
export default function GreenLightPivot() {
  const track = trackFor(useCapeStore((s) => s.gradeBand));
  const saveScript = useCapeStore((s) => s.saveStrongestVoiceScript);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  if (track !== 'blue') return <Redirect href="/tools/vibe-check" />;

  const go = (next: number) => {
    setDone((d) => (d.includes(step) ? d : [...d, step]));
    setStep(next);
  };

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="The Green Light Pivot" tint={TINT} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={TINT}>THE ENTHUSIASTIC YES</Eyebrow>
        <Display className="mt-2 text-4xl">Hitting the gas, safely.</Display>

        <ActivityGuide
          className="mt-5"
          tint={TINT}
          minutes={12}
          what="Most safety education is a fire drill: spot the threat, slam the brakes. That matters. But healthy connection also means saying exactly what you DO want, and staying safe while you do."
          steps={[
            'Sort each racing-heart moment: danger, or positive friction?',
            'Learn the two gears: Confident + Enthusiastic.',
            'Read three connection scripts and why they work.',
            'Build your own Green Light Pivot line and save it.',
          ]}
          outcome="your own Green Light Pivot line, saved to Strongest Voice."
        />

        <StepTabs steps={STEPS} active={step} done={done} tint={TINT} onSelect={setStep} />

        <View className="mt-5">
          {step === 0 ? (
            <View>
              <Eyebrow color={TINT}>STEP 1 · FIRE DRILL OR FIREPLACE?</Eyebrow>
              <Body className="mt-2">
                A racing heart and sweaty palms do not always mean danger. Sometimes it is positive
                friction: the awkward, brave feeling of saying what you want. Sort each one.
              </Body>
              <View className="mt-4">
                <SortGame items={PIVOT_SORT} bins={PIVOT_BINS} tint={TINT} rule={PIVOT_RULE} />
              </View>
              <NextStepButton label="NEXT: THE TWO GEARS" tint={TINT} onPress={() => go(1)} />
            </View>
          ) : null}

          {step === 1 ? (
            <View>
              <Eyebrow color={TINT}>STEP 2 · RECLAIMING C AND E</Eyebrow>
              <Display className="mt-2 text-3xl">
                Confidence + Enthusiasm = a safe green light.
              </Display>
              <View className="mt-4 gap-3">
                <Panel tint={C.teal} fill={0.06} stroke={0.25}>
                  <Mono bold color={C.teal} className="text-[13px]" tracking={1}>
                    C · CONFIDENT (FROM CAPE)
                  </Mono>
                  <Body className="mt-1">Knowing your worth and trusting your instincts.</Body>
                </Panel>
                <Panel tint={C.modT} fill={0.06} stroke={0.25}>
                  <Mono bold color={C.modT} className="text-[13px]" tracking={1}>
                    E · ENTHUSIASTIC (FROM F.R.I.E.S.)
                  </Mono>
                  <Body className="mt-1">The genuine “Heck yes!” — from you and from them.</Body>
                </Panel>
                <Panel tint={C.amber} fill={0.06} stroke={0.25}>
                  <Mono bold color={C.amber} className="text-[13px]" tracking={1}>
                    THE BRAKES VS. THE GAS
                  </Mono>
                  <Body className="mt-1">
                    Brakes (Reversible, Freely given) stop a threat. The gas (Enthusiastic,
                    Confident) moves you forward with agency.
                  </Body>
                </Panel>
              </View>
              <Eyebrow color={TINT} className="mt-6">
                EVERYDAY EXCITEMENT
              </Eyebrow>
              <View className="mt-2 gap-2">
                {EVERYDAY_YES.map((line) => (
                  <Body key={line}>{`• ${line}`}</Body>
                ))}
              </View>
              <NextStepButton label="NEXT: CONNECTION SCRIPTS" tint={TINT} onPress={() => go(2)} />
            </View>
          ) : null}

          {step === 2 ? (
            <View>
              <Eyebrow color={TINT}>STEP 3 · CONNECTION SCRIPTS</Eyebrow>
              <Body className="mt-2">
                Say each one out loud once. Notice how it keeps the vibe.
              </Body>
              <View className="mt-4 gap-3">
                {CONNECTION_SCRIPTS.map((script) => (
                  <Panel key={script.id} tint={TINT} fill={0.05} stroke={0.22}>
                    <Mono bold color={TINT} className="text-[13px]" tracking={1}>
                      {script.title.toUpperCase()}
                    </Mono>
                    <Display className="mt-2 text-2xl">{script.line}</Display>
                    <Mono bold color={C.ink} className="mt-2 text-[13px]">
                      {`Why it works: ${script.why}`}
                    </Mono>
                  </Panel>
                ))}
              </View>
              <NextStepButton label="NEXT: BUILD YOUR PIVOT" tint={TINT} onPress={() => go(3)} />
            </View>
          ) : null}

          {step === 3 ? (
            <View>
              <Eyebrow color={TINT}>STEP 4 · THE DRILL: PRACTISING THE PIVOT</Eyebrow>
              <View className="mt-3 gap-2">
                {PIVOT_DRILL_STEPS.map((item, i) => (
                  <Body key={item.title}>{`${i + 1}. ${item.title}: ${item.detail}`}</Body>
                ))}
              </View>
              <View className="mt-4">
                <PivotBuilder slots={GREEN_LIGHT_PIVOT} tint={TINT} onSave={saveScript} />
              </View>
              <NextStepButton label="NEXT: BE THE PILOT" tint={TINT} onPress={() => go(4)} />
            </View>
          ) : null}

          {step === 4 ? (
            <Panel tint={TINT} fill={0.1} stroke={0.35}>
              <Eyebrow color={TINT}>BE THE PILOT</Eyebrow>
              <Display className="mt-2 text-2xl">{PILOT_CLOSE}</Display>
            </Panel>
          ) : null}
        </View>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
