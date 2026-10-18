import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { CalendarClock, CircleAlert, MapPin, Phone, RotateCcw } from 'lucide-react-native';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { ActivityGuide } from '@/components/cape/ActivityGuide';
import { StackHeader } from '@/components/cape/Screen';
import { C, alpha, wash } from '@/lib/colors';
import { GradientAction } from '@/components/cape/Buttons';
import { PepRing, formatDeadline, pepTint, usePepTime } from '@/components/cape/PepCountdown';
import { pepUnlocked } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

/** "When did it happen?" choices, in hours ago. */
const WHEN: { label: string; hours: number }[] = [
  { label: 'Just now', hours: 0 },
  { label: '1 hr ago', hours: 1 },
  { label: '3 hrs ago', hours: 3 },
  { label: '6 hrs ago', hours: 6 },
  { label: '12 hrs ago', hours: 12 },
  { label: '24 hrs ago', hours: 24 },
  { label: '36 hrs ago', hours: 36 },
  { label: '48 hrs ago', hours: 48 },
  { label: '60 hrs ago', hours: 60 },
];

function urgency(left: number, expired: boolean): string {
  const hours = left / 3_600_000;
  if (expired)
    return 'The 72-hour PEP window has passed. Still see a clinician: they can talk about testing and what to do next.';
  if (hours < 24) return 'Under 24 hours left. Go to an emergency department now.';
  if (hours < 48) return 'Go now. PEP works best the sooner it starts.';
  return 'Go today. PEP works best the sooner it starts — every hour counts.';
}

export default function PepClock() {
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);
  const startPep = useCapeStore((s) => s.startPep);
  const clearPep = useCapeStore((s) => s.clearPep);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const { left, expired } = usePepTime(pepStartedAt);
  const [confirmReset, setConfirmReset] = useState(false);
  const tint = pepStartedAt ? pepTint(left, expired) : C.flame;

  if (!pepUnlocked(gradeBand)) return <Redirect href="/(tabs)/crisis" />;

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="PEP Clock" tint={tint} fallback="/(tabs)/crisis" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.flame}>THE 72-HOUR WINDOW</Eyebrow>
        <Display className="mt-2 text-4xl">PEP is time-limited.</Display>
        <Body className="mt-3">
          Post-exposure prophylaxis has to be started as soon as possible and within 72 hours of a
          possible exposure. This clock exists so you never have to guess.
        </Body>
        <ActivityGuide
          className="mt-5"
          tint={C.flame}
          minutes={2}
          what={
            'PEP is medicine that can stop HIV after a possible exposure, but only if it starts within 72 hours. This clock shows how much time is left.'
          }
          steps={[
            'Tap when it happened (just now, or hours ago).',
            'Watch the time left and the closing time.',
            'Tap "Find care near me" and go today with a trusted adult.',
          ]}
          outcome={'the exact deadline and where to go.'}
        />

        <View className="mt-6 items-center">
          <PepRing startedAt={pepStartedAt} left={left} expired={expired} />
        </View>

        {pepStartedAt ? (
          <View className="mt-5 gap-3">
            <Panel tint={tint} fill={0.1} stroke={0.35}>
              <Mono bold color={tint} className="text-[14px]">
                {urgency(left, expired)}
              </Mono>
              <View className="mt-3 flex-row items-center gap-2">
                <CalendarClock size={14} color={C.inkSoft} />
                <Mono className="flex-1 text-[13px]" color={C.inkSoft}>
                  {`Window ${expired ? 'closed' : 'closes'} ${formatDeadline(pepStartedAt)}`}
                </Mono>
              </View>
            </Panel>

            <GradientAction
              tint={C.flame}
              onPress={() => router.push('/clinic-finder')}
              className="flex-row items-center justify-center gap-2 rounded-full py-3.5"
            >
              <MapPin size={14} color={C.paper2} />
              <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                FIND CARE NEAR ME
              </Mono>
            </GradientAction>
            <GradientAction
              tint={C.flame}
              onPress={() => router.push('/(tabs)/crisis')}
              className="flex-row items-center justify-center gap-2 rounded-full py-3.5"
            >
              <Phone size={14} color={C.paper2} />
              <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                OPEN CRISIS PROTOCOL
              </Mono>
            </GradientAction>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={confirmReset ? 'Confirm: clear the clock' : 'Reset the clock'}
              onPress={() => {
                if (confirmReset) {
                  clearPep();
                  setConfirmReset(false);
                } else setConfirmReset(true);
              }}
              className="min-h-11 flex-row items-center justify-center gap-2 rounded-full py-3 active:opacity-70"
              style={{ borderWidth: 1, borderColor: alpha(C.ink, 0.15) }}
            >
              <RotateCcw size={13} color={confirmReset ? C.no : C.inkSoft} />
              <Mono
                bold
                color={confirmReset ? C.no : C.inkSoft}
                tracking={1}
                className="text-[13px]"
              >
                {confirmReset ? 'TAP AGAIN TO CLEAR THE CLOCK' : 'RESET CLOCK'}
              </Mono>
            </Pressable>
          </View>
        ) : (
          <View className="mt-5">
            <Eyebrow color={C.flame}>WHEN DID IT HAPPEN?</Eyebrow>
            <Mono className="mt-1.5 text-[13px]">
              Pick the closest time. The clock counts down from then, not from now.
            </Mono>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {WHEN.map((option) => (
                <Pressable
                  key={option.hours}
                  accessibilityRole="button"
                  accessibilityLabel={`Start the clock: ${option.label}`}
                  onPress={() => startPep(option.hours)}
                  className="min-h-11 items-center justify-center rounded-full px-4 active:opacity-70"
                  style={{
                    backgroundColor: option.hours === 0 ? C.flame : wash(C.flame, 0.08, C.card),
                    borderWidth: 1,
                    borderColor: alpha(C.flame, option.hours === 0 ? 1 : 0.35),
                  }}
                >
                  <Mono
                    bold
                    color={option.hours === 0 ? C.paper2 : C.flame}
                    className="text-[13px]"
                  >
                    {option.label}
                  </Mono>
                </Pressable>
              ))}
            </View>
            <Mono className="mt-3 text-[13px]" color={C.inkSoft}>
              More than 72 hours ago? PEP is no longer an option, but you should still see a
              clinician about testing and next steps.
            </Mono>
            <GradientAction
              tint={C.flame}
              onPress={() => router.push('/(tabs)/crisis')}
              className="mt-4 flex-row items-center justify-center gap-2 rounded-full py-3.5"
            >
              <Phone size={14} color={C.paper2} />
              <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                OPEN CRISIS PROTOCOL
              </Mono>
            </GradientAction>
          </View>
        )}

        <View className="mt-8 gap-2.5">
          <Panel tint={C.flame} fill={0.05} stroke={0.16}>
            <View className="flex-row items-start gap-2.5">
              <MapPin size={15} color={C.flame} />
              <View className="flex-1">
                <Mono bold color={C.flame} className="text-[13px]" tracking={1.5}>
                  WHERE TO GO
                </Mono>
                <Mono className="mt-1 text-[13px]">
                  Inside 72 hours, go to an emergency department with a trusted adult and ask to be
                  evaluated for PEP. This app does not provide medication.
                </Mono>
              </View>
            </View>
          </Panel>

          <Panel tint={C.teal} fill={0.05} stroke={0.16}>
            <Mono bold color={C.teal} className="text-[13px]" tracking={1.5}>
              WHAT TO SAY
            </Mono>
            <Mono className="mt-1 text-[13px]">
              &quot;I think I had a possible exposure within the last 72 hours and I want to ask
              about PEP.&quot; That one sentence is enough to start the conversation.
            </Mono>
          </Panel>

          <Panel tint={C.lemon} fill={0.05} stroke={0.2}>
            <View className="flex-row items-start gap-2.5">
              <CircleAlert size={15} color={C.lemon} />
              <Mono className="flex-1 text-[13px]">
                This clock is a reminder, not medical advice or a prescription. Only a clinician can
                decide whether PEP is right for your situation. In an emergency, call 911.
              </Mono>
            </View>
          </Panel>
        </View>
      </ScrollView>
    </View>
  );
}
