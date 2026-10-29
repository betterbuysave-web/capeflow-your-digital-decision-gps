import { ScrollView, View } from 'react-native';
import { type Href, router } from 'expo-router';
import { ArrowRight, BellRing, BookOpen, Coffee, Ghost, MapPin, Timer, Users } from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { StackHeader } from '@/components/cape/Screen';

import { Body, Display, Eyebrow, Mono } from '@/components/cape/Type';
import { TintedRow } from '@/components/cape/Buttons';
import { VerdictBadge } from '@/components/cape/VerdictBadge';
import { C, alpha } from '@/lib/colors';
import { scenariosForTrack } from '@/lib/data/scenarios';
import { pepUnlocked, trackFor } from '@/lib/data/content';
import { networksForTrack } from '@/lib/data/clinics';
import { entriesForTrack } from '@/lib/data/library';
import { disarmedCount, namedGhostCount, useCapeStore } from '@/lib/store/useCapeStore';

export default function ToolsTab() {
  const circle = useCapeStore((s) => s.circle);
  const scenarioResults = useCapeStore((s) => s.scenarioResults);
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const ghosts = useCapeStore((s) => s.ghosts);
  const reminders = useCapeStore((s) => s.reminders);
  const pepAvailable = pepUnlocked(gradeBand);
  const namedGhosts = namedGhostCount(ghosts);
  const disarmedGhosts = disarmedCount(ghosts);
  const track = trackFor(gradeBand);
  const scenarios = scenariosForTrack(track);
  const networkCount = networksForTrack(track).length;
  const libraryCount = entriesForTrack(track).length;
  const activeReminders = reminders.filter((r) => r.enabled).length;
  const activities: { title: string; detail: string; emoji: string; tint: string; href: Href }[] =
    track === 'blue'
      ? [
          {
            title: 'THE GREEN LIGHT PIVOT',
            detail: 'Practice the enthusiastic yes: say what you want and stay safe.',
            emoji: '🟢',
            tint: C.yes,
            href: '/tools/green-light',
          },
          {
            title: '3-SECOND RULE CHALLENGE',
            detail:
              'Pause before you post. Four real-life scenarios and the Digital Shield Pledge.',
            emoji: '⏸️',
            tint: C.teal,
            href: '/tools/three-second',
          },
          {
            title: 'CARE NAVIGATOR',
            detail: 'A mission: get Persona B from "I need care" to the clinic door.',
            emoji: '🧭',
            tint: C.magenta,
            href: '/tools/care-navigator',
          },
          {
            title: 'STRONGEST VOICE SCRIPT LAB',
            detail: 'Write your line, say it three times, practice it against pushback.',
            emoji: '🎤',
            tint: C.modC,
            href: '/tools/strongest-voice',
          },
        ]
      : [
          {
            title: 'VIBE CHECK NAVIGATOR',
            detail: 'Tell a real "Heck yes!" from a polite maybe, and build your Graceful Pivot.',
            emoji: '✅',
            tint: C.modA,
            href: '/tools/vibe-check',
          },
          {
            title: '3-SECOND RULE CHALLENGE',
            detail:
              'Pause before you send. Four real-life scenarios and the Digital Shield Pledge.',
            emoji: '⏸️',
            tint: C.teal,
            href: '/tools/three-second',
          },
          {
            title: 'STRONGEST VOICE SCRIPT LAB',
            detail: 'Write your line, say it three times, practice it against pushback.',
            emoji: '🎤',
            tint: C.modC,
            href: '/tools/strongest-voice',
          },
        ];

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="Tools" tint={C.modT} fallback="/(tabs)" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.modT}>YOUR TOOLKIT</Eyebrow>
        <Display className="mt-2 text-4xl">Build your team early.</Display>
        <Body className="mt-3">
          Interactive tools that build muscle memory before the moment arrives. Everything here is
          stored on this device only.
        </Body>

        <View className="mt-6">
          <Eyebrow color={C.teal}>PRACTICE ACTIVITIES</Eyebrow>
          <Body className="mt-1">Start here. Each one explains what to do, step by step.</Body>
          <View className="mt-3 gap-3">
            {activities.map((activity) => (
              <TintedRow
                key={activity.title}
                tint={activity.tint}
                fill={0.08}
                stroke={0.24}
                onPress={() => router.push(activity.href)}
              >
                <View className="flex-row items-center gap-3">
                  <Mono className="text-2xl">{activity.emoji}</Mono>
                  <View className="flex-1">
                    <Mono bold color={activity.tint} className="text-[14px]" tracking={1}>
                      {activity.title}
                    </Mono>
                    <Mono className="mt-1 text-[13px]">{activity.detail}</Mono>
                  </View>
                  <ArrowRight size={14} color={activity.tint} />
                </View>
              </TintedRow>
            ))}
          </View>
        </View>

        <Eyebrow color={C.modT} className="mt-8">
          YOUR TOOLS
        </Eyebrow>
        <View className="mt-3 gap-3">
          {gradeBand === '9-12' ? (
            <TintedRow
              tint={C.purple}
              fill={0.07}
              stroke={0.22}
              onPress={() => router.push('/tools/ghost-vault')}
            >
              <View className="flex-row items-center gap-3">
                <Ghost size={20} color={C.purple} />
                <View className="flex-1">
                  <Mono bold color={C.purple} className="text-[14px]" tracking={1}>
                    Healthcare Anxiety Audit
                  </Mono>
                  <Mono className="mt-1 text-[13px]">
                    {namedGhosts === 0
                      ? 'Six healthcare ghosts — questions and care plans'
                      : `${namedGhosts} named · ${disarmedGhosts} shields online`}
                  </Mono>
                </View>
                <ArrowRight size={14} color={C.purple} />
              </View>
            </TintedRow>
          ) : null}

          <TintedRow
            tint={C.gold}
            fill={0.07}
            stroke={0.2}
            onPress={() => router.push('/tools/consent-cafe')}
          >
            <View className="flex-row items-center gap-3">
              <Coffee size={20} color={C.gold} />
              <View className="flex-1">
                <Mono bold color={C.gold} className="text-[14px]" tracking={1}>
                  THE CONSENT CAFÉ
                </Mono>
                <Mono className="mt-1 text-[13px]">
                  Five stations: F.R.I.E.S., your menu, your rights, practice, exit card
                </Mono>
              </View>
              <ArrowRight size={14} color={C.gold} />
            </View>
          </TintedRow>

          <TintedRow
            tint={C.magenta}
            fill={0.07}
            stroke={0.2}
            onPress={() => router.push('/tools/safety-circle')}
          >
            <View className="flex-row items-center gap-3">
              <Users size={20} color={C.magenta} />
              <View className="flex-1">
                <Mono bold color={C.magenta} className="text-[14px]" tracking={1}>
                  SAFETY CIRCLE
                </Mono>
                <Mono className="mt-1 text-[13px]">
                  {circle.length === 0
                    ? 'Add the people who answer at 2 AM'
                    : `${circle.length} people on call`}
                </Mono>
              </View>
              <ArrowRight size={14} color={C.magenta} />
            </View>
          </TintedRow>

          {pepAvailable ? (
            <TintedRow
              tint={C.flame}
              fill={0.07}
              stroke={0.2}
              onPress={() => router.push('/tools/pep-clock')}
            >
              <View className="flex-row items-center gap-3">
                <Timer size={20} color={C.flame} />
                <View className="flex-1">
                  <Mono bold color={C.flame} className="text-[14px]" tracking={1}>
                    PEP CLOCK
                  </Mono>
                  <Mono className="mt-1 text-[13px]">
                    {pepStartedAt ? 'Running — tap for time left' : '72-hour window tracker'}
                  </Mono>
                </View>
                <ArrowRight size={14} color={C.flame} />
              </View>
            </TintedRow>
          ) : null}
        </View>

        <View className="mt-8">
          <Eyebrow color={C.teal}>CARE & INTEL</Eyebrow>
          <Display className="mt-2 text-3xl">Find it. Learn it. Keep it running.</Display>
          <Body className="mt-2">
            Real locators, reminder control, and the plain-words library — all sized to your track.
          </Body>

          <View className="mt-4 gap-3">
            <TintedRow
              tint={C.modM}
              fill={0.07}
              stroke={0.2}
              onPress={() => router.push('/clinic-finder')}
            >
              <View className="flex-row items-center gap-3">
                <MapPin size={20} color={C.modM} />
                <View className="flex-1">
                  <Mono bold color={C.modM} className="text-[14px]" tracking={1}>
                    CLINIC FINDER
                  </Mono>
                  <Mono className="mt-1 text-[13px]">
                    {networkCount} national locators · free and confidential filters
                  </Mono>
                </View>
                <ArrowRight size={14} color={C.modM} />
              </View>
            </TintedRow>

            <TintedRow
              tint={C.gold}
              fill={0.07}
              stroke={0.2}
              onPress={() => router.push('/adherence-settings')}
            >
              <View className="flex-row items-center gap-3">
                <BellRing size={20} color={C.gold} />
                <View className="flex-1">
                  <Mono bold color={C.gold} className="text-[14px]" tracking={1}>
                    ADHERENCE SETTINGS
                  </Mono>
                  <Mono className="mt-1 text-[13px]">
                    {reminders.length === 0
                      ? 'Set reminders, tones, and schedules'
                      : `${activeReminders} of ${reminders.length} reminders armed`}
                  </Mono>
                </View>
                <ArrowRight size={14} color={C.gold} />
              </View>
            </TintedRow>

            <TintedRow
              tint={C.modA}
              fill={0.07}
              stroke={0.2}
              onPress={() => router.push('/educational-library')}
            >
              <View className="flex-row items-center gap-3">
                <BookOpen size={20} color={C.modA} />
                <View className="flex-1">
                  <Mono bold color={C.modA} className="text-[14px]" tracking={1}>
                    EDUCATIONAL LIBRARY
                  </Mono>
                  <Mono className="mt-1 text-[13px]">
                    {libraryCount} plain-words entries · search by topic
                  </Mono>
                </View>
                <ArrowRight size={14} color={C.modA} />
              </View>
            </TintedRow>
          </View>
        </View>

        <View className="mt-10">
          <Eyebrow color={C.purple}>MIDNIGHT SIMULATOR</Eyebrow>
          <Display className="mt-2 text-3xl">Run the hard nights first.</Display>
          <Body className="mt-2">
            Pick a response and see how the M.A.T.C.H. framework turns panic into a plan. No grades
            — practice feedback only. XP is for finishing, not for picking a &quot;right&quot;
            answer.
          </Body>

          <View className="mt-4 gap-3">
            {scenarios.map((scenario) => {
              const result = scenarioResults[scenario.id];
              return (
                <TintedRow
                  key={scenario.id}
                  tint={C.purple}
                  fill={result ? 0.04 : 0.07}
                  stroke={0.18}
                  onPress={() =>
                    router.push({ pathname: '/sim/[id]', params: { id: scenario.id } })
                  }
                >
                  <View className="flex-row items-center gap-3">
                    <Mono className="text-xl">{scenario.emoji}</Mono>
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2">
                        <Mono bold color={C.purple} className="text-[13px]" tracking={1}>
                          {scenario.time}
                        </Mono>
                        {result ? <VerdictBadge verdict={result.verdict} /> : null}
                      </View>
                      <Mono bold className="mt-1 text-[13px]" color={alpha(C.inkSoft, 0.9)}>
                        {scenario.title}
                      </Mono>
                      <Mono className="mt-1 text-[12px]" color={alpha(C.inkFaint, 0.7)}>
                        {scenario.choices.length} responses · {scenario.xp} XP
                      </Mono>
                    </View>
                    <ArrowRight size={14} color={C.purple} />
                  </View>
                </TintedRow>
              );
            })}
          </View>
        </View>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}
