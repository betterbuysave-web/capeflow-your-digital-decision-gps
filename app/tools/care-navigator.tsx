import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Redirect, router } from 'expo-router';
import { Check, MapPin, Mic } from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { ActivityGuide, NextStepButton, StepTabs } from '@/components/cape/ActivityGuide';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

const TINT = C.azure;
const STEPS = [
  'The mission',
  'Name the ghost',
  'Find care',
  'Map the path',
  'Front desk',
  'Autonomy',
];
const EMPTY: Record<string, string> = {};

const GHOSTS = [
  {
    id: 'phone',
    name: 'The Phone Ghost',
    fear: 'Freezing up when you have to call and make an appointment.',
    tip: 'Write your first sentence before you dial: "Hi, I need to be seen today for a possible exposure."',
  },
  {
    id: 'language',
    name: 'The Language Ghost',
    fear: 'Not understanding the medical words.',
    tip: 'Ask: "Can you say that in plain words?" and "What happens next?" You are allowed to ask twice.',
  },
  {
    id: 'money',
    name: 'The Money Ghost',
    fear: 'Being turned away or embarrassed about cost in a full waiting room.',
    tip: 'Use the front-desk script in Step 5. Emergency departments must examine you even if you cannot pay.',
  },
] as const;

const PATH_FIELDS = [
  { id: 'line', label: 'The transit line', placeholder: 'Which bus or train? (number)' },
  { id: 'stop', label: 'The drop-off', placeholder: 'The exact stop you get off at' },
  { id: 'mile', label: 'The final mile', placeholder: 'How far from the stop to the door?' },
] as const;

const DESK_SCRIPT = 'I am uninsured. How do I apply for financial assistance today?';

/** Blue Track: the Care Navigator mission, from the Medical Autonomy deck. */
export default function CareNavigator() {
  const track = trackFor(useCapeStore((s) => s.gradeBand));
  const log = useCapeStore((s) => s.activityLog['care-navigator']) ?? EMPTY;
  const logActivity = useCapeStore((s) => s.logActivity);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [said, setSaid] = useState(0);
  if (track !== 'blue') return <Redirect href="/(tabs)/tools" />;

  const go = (next: number) => {
    setDone((d) => (d.includes(step) ? d : [...d, step]));
    setStep(next);
  };

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="Care Navigator" tint={TINT} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={TINT}>MEDICAL AUTONOMY MISSION</Eyebrow>
        <Display className="mt-2 text-4xl">Get from “I need care” to the clinic door.</Display>

        <ActivityGuide
          className="mt-5"
          tint={TINT}
          minutes={15}
          what="After high school, nobody walks you to the clinic. This mission practices the whole trip with a made-up person, so the real one feels familiar."
          steps={[
            'Meet Persona B and the clock you are racing.',
            'Name the healthcare ghost that would stop you.',
            'Use the Clinic Finder to pick two places.',
            'Map the exact bus, stop, and final walk.',
            'Practice the front-desk script out loud.',
          ]}
          outcome="a clinic, a route, and a script you have already said three times."
        />

        <StepTabs steps={STEPS} active={step} done={done} tint={TINT} onSelect={setStep} />

        <View className="mt-5">
          {step === 0 ? (
            <View>
              <Eyebrow color={TINT}>STEP 1 · THE MISSION</Eyebrow>
              <Panel tint={C.flame} fill={0.06} stroke={0.3} className="mt-3">
                <Mono bold color={C.flame} className="text-[13px]" tracking={1}>
                  PERSONA B
                </Mono>
                <Display className="mt-2 text-3xl">Age 17 · Uninsured · 72-hour PEP window</Display>
                <Body className="mt-2">
                  Persona B had a possible HIV exposure last night. PEP has to start within 72
                  hours. They have no insurance, no car, and school in the morning.
                </Body>
              </Panel>
              <Body className="mt-4">
                Your job: get Persona B to the right door, today, with words ready. The clock is the
                hardest part, so the rest has to be easy.
              </Body>
              <NextStepButton label="NEXT: NAME THE GHOST" tint={TINT} onPress={() => go(1)} />
            </View>
          ) : null}

          {step === 1 ? (
            <View>
              <Eyebrow color={TINT}>STEP 2 · NAME IT TO TAME IT</Eyebrow>
              <Body className="mt-2">Which one would stop Persona B — or you — first? Tap it.</Body>
              <View className="mt-4 gap-3">
                {GHOSTS.map((ghost) => {
                  const selected = log.ghost === ghost.id;
                  return (
                    <Pressable
                      key={ghost.id}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      onPress={() => logActivity('care-navigator', 'ghost', ghost.id)}
                      className="rounded-2xl p-4 active:opacity-70"
                      style={{
                        backgroundColor: selected ? alpha(TINT, 0.1) : C.card,
                        borderWidth: 1.5,
                        borderColor: selected ? TINT : alpha(C.ink, 0.15),
                      }}
                    >
                      <Mono bold color={C.ink} className="text-[14px]">
                        {ghost.name}
                      </Mono>
                      <Body className="mt-1">{ghost.fear}</Body>
                      {selected ? (
                        <Mono bold color={TINT} className="mt-2 text-[13px]">
                          {`Counter-move: ${ghost.tip}`}
                        </Mono>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/tools/ghost-vault')}
                className="mt-4 min-h-11 justify-center active:opacity-60"
              >
                <Mono bold color={TINT} className="text-[13px] underline">
                  More ghosts: open the Healthcare Anxiety Audit
                </Mono>
              </Pressable>
              <NextStepButton label="NEXT: FIND CARE" tint={TINT} onPress={() => go(2)} />
            </View>
          ) : null}

          {step === 2 ? (
            <View>
              <Eyebrow color={TINT}>STEP 3 · FILTER OUT THE NOISE</Eyebrow>
              <Body className="mt-2">
                Open the Clinic Finder. Pick the PEP / urgent care finder and look for places that
                see uninsured patients. Write down two.
              </Body>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/clinic-finder')}
                className="mt-4 min-h-12 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
                style={{ backgroundColor: TINT }}
              >
                <MapPin size={16} color={C.paper2} />
                <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                  OPEN THE CLINIC FINDER
                </Mono>
              </Pressable>
              <Panel tint={TINT} fill={0.05} stroke={0.2} className="mt-4">
                <Mono bold color={TINT} className="text-[13px]" tracking={1}>
                  HOUSTON EXAMPLE
                </Mono>
                <Body className="mt-1">
                  In Houston, an emergency department such as Ben Taub Hospital, or a clinic such as
                  Legacy Community Health. Your city will have its own.
                </Body>
              </Panel>
              {(['clinic1', 'clinic2'] as const).map((key, i) => (
                <TextInput
                  key={key}
                  accessibilityLabel={`Option ${i + 1}`}
                  value={log[key] ?? ''}
                  onChangeText={(text) => logActivity('care-navigator', key, text)}
                  placeholder={`Option ${i + 1}`}
                  placeholderTextColor={C.inkFaint}
                  className="mt-3 rounded-2xl p-4 text-[15px]"
                  style={{
                    color: C.ink,
                    backgroundColor: C.card,
                    borderWidth: 1,
                    borderColor: C.hairline,
                    fontFamily: 'Inter_400Regular',
                  }}
                />
              ))}
              <NextStepButton label="NEXT: MAP THE PATH" tint={TINT} onPress={() => go(3)} />
            </View>
          ) : null}

          {step === 3 ? (
            <View>
              <Eyebrow color={TINT}>STEP 4 · MAP THE PATH TO THE DOOR</Eyebrow>
              <Body className="mt-2">
                Access is not real until you know exactly how to get there. Use a maps app, then
                fill these in.
              </Body>
              {PATH_FIELDS.map((field) => (
                <View key={field.id} className="mt-4">
                  <Mono bold color={C.ink} className="text-[14px]">
                    {field.label}
                  </Mono>
                  <TextInput
                    accessibilityLabel={field.label}
                    value={log[field.id] ?? ''}
                    onChangeText={(text) => logActivity('care-navigator', field.id, text)}
                    placeholder={field.placeholder}
                    placeholderTextColor={C.inkFaint}
                    className="mt-2 rounded-2xl p-4 text-[15px]"
                    style={{
                      color: C.ink,
                      backgroundColor: C.card,
                      borderWidth: 1,
                      borderColor: C.hairline,
                      fontFamily: 'Inter_400Regular',
                    }}
                  />
                </View>
              ))}
              <Mono className="mt-2 text-[12px]">Saved on this device only.</Mono>
              <NextStepButton label="NEXT: THE FRONT DESK" tint={TINT} onPress={() => go(4)} />
            </View>
          ) : null}

          {step === 4 ? (
            <View>
              <Eyebrow color={TINT}>STEP 5 · THE FRONT DESK</Eyebrow>
              <Body className="mt-2">
                Getting there means nothing if you turn around and walk out. Load these words into
                memory. Say them out loud three times.
              </Body>
              <Panel tint={TINT} fill={0.1} stroke={0.35} className="mt-4">
                <Display className="text-3xl">{`“${DESK_SCRIPT}”`}</Display>
                <Mono className="mt-2 text-[13px]">
                  In Harris County, ask about the Harris Health Gold Card. For a possible HIV
                  exposure, add: “I need to be evaluated for PEP now.”
                </Mono>
              </Panel>
              <Pressable
                accessibilityRole="button"
                disabled={said >= 3}
                onPress={() => {
                  void Haptics.selectionAsync().catch(() => undefined);
                  setSaid((n) => Math.min(3, n + 1));
                }}
                className="mt-4 min-h-12 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
                style={{ backgroundColor: said >= 3 ? C.yes : TINT }}
              >
                {said >= 3 ? (
                  <Check size={16} color={C.paper2} />
                ) : (
                  <Mic size={16} color={C.paper2} />
                )}
                <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                  {said >= 3 ? 'SAID IT 3 TIMES' : `I SAID IT OUT LOUD · ${said} OF 3`}
                </Mono>
              </Pressable>
              <NextStepButton label="NEXT: AUTONOMY" tint={TINT} onPress={() => go(5)} />
            </View>
          ) : null}

          {step === 5 ? (
            <View>
              <Eyebrow color={TINT}>STEP 6 · THE ARCHITECTURE OF AUTONOMY</Eyebrow>
              <View className="mt-3 gap-3">
                {[
                  ['Internal awareness', 'You notice what you need and how urgent it is.'],
                  [
                    'Digital navigation',
                    'You use your tools to find the right door and the route.',
                  ],
                  ['Vocal armor', 'You walk in with words already said three times.'],
                ].map(([title, detail]) => (
                  <Panel key={title} tint={TINT} fill={0.05} stroke={0.2}>
                    <Mono bold color={TINT} className="text-[13px]" tracking={1}>
                      {title.toUpperCase()}
                    </Mono>
                    <Body className="mt-1">{detail}</Body>
                  </Panel>
                ))}
              </View>
              <Panel tint={TINT} fill={0.1} stroke={0.35} className="mt-4">
                <Display className="text-2xl">
                  You can recognize your needs, map your path, and ask for your care.
                </Display>
              </Panel>
            </View>
          ) : null}
        </View>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
