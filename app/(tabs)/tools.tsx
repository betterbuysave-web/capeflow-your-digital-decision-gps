import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import {
  ArrowRight,
  BellRing,
  BookOpen,
  Coffee,
  Ghost,
  Lock,
  MapPin,
  MessageSquareText,
  Timer,
  Users,
} from 'lucide-react-native';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { Body, Display, Eyebrow, Mono } from '@/components/cape/Type';
import { TintedRow } from '@/components/cape/Buttons';
import { VerdictBadge } from '@/components/cape/VerdictBadge';
import { C, alpha } from '@/lib/colors';
import { scenariosForTrack } from '@/lib/data/scenarios';
import { PEP_LOCK_NOTE, pepUnlocked, trackFor } from '@/lib/data/content';
import { networksForTrack } from '@/lib/data/clinics';
import { entriesForTrack } from '@/lib/data/library';
import { disarmedCount, namedGhostCount, useCapeStore } from '@/lib/store/useCapeStore';

export default function ToolsTab() {
  const boundaries = useCapeStore((s) => s.boundaries);
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

  return (
    <View className="bg-paper flex-1">
      <SafeAreaView edges={['top']} className="bg-paper" />
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

        <View className="mt-6 gap-3">
          {gradeBand === '9-12' ? (
            <TintedRow
              tint={C.violet}
              fill={0.07}
              stroke={0.22}
              onPress={() => router.push('/tools/ghost-vault')}
            >
              <View className="flex-row items-center gap-3">
                <Ghost size={20} color={C.violet} />
                <View className="flex-1">
                  <Mono bold color={C.violet} className="text-[14px]" tracking={1}>
                    Healthcare Anxiety Audit
                  </Mono>
                  <Mono className="mt-1 text-[13px]">
                    {namedGhosts === 0
                      ? 'Six healthcare ghosts — questions and care plans'
                      : `${namedGhosts} named · ${disarmedGhosts} shields online`}
                  </Mono>
                </View>
                <ArrowRight size={14} color={C.violet} />
              </View>
            </TintedRow>
          ) : null}

          <TintedRow
            tint={C.amber}
            fill={0.07}
            stroke={0.2}
            onPress={() => router.push('/tools/consent-cafe')}
          >
            <View className="flex-row items-center gap-3">
              <Coffee size={20} color={C.amber} />
              <View className="flex-1">
                <Mono bold color={C.amber} className="text-[14px]" tracking={1}>
                  THE CONSENT CAFÉ
                </Mono>
                <Mono className="mt-1 text-[13px]">
                  F.R.I.E.S. drills, your menu, exit card — {Object.keys(boundaries).length}{' '}
                  boundaries answered
                </Mono>
              </View>
              <ArrowRight size={14} color={C.amber} />
            </View>
          </TintedRow>

          <TintedRow
            tint={C.modC}
            fill={0.07}
            stroke={0.2}
            onPress={() => router.push('/tools/strongest-voice')}
          >
            <View className="flex-row items-center gap-3">
              <MessageSquareText size={20} color={C.modC} />
              <View className="flex-1">
                <Mono bold color={C.modC} className="text-[14px]" tracking={1}>
                  STRONGEST VOICE SCRIPT LAB
                </Mono>
                <Mono className="mt-1 text-[13px]">
                  Build and rehearse the line before pressure arrives
                </Mono>
              </View>
              <ArrowRight size={14} color={C.modC} />
            </View>
          </TintedRow>

          <TintedRow
            tint={C.azure}
            fill={0.07}
            stroke={0.2}
            onPress={() => router.push('/tools/safety-circle')}
          >
            <View className="flex-row items-center gap-3">
              <Users size={20} color={C.azure} />
              <View className="flex-1">
                <Mono bold color={C.azure} className="text-[14px]" tracking={1}>
                  SAFETY CIRCLE
                </Mono>
                <Mono className="mt-1 text-[13px]">
                  {circle.length === 0
                    ? 'Add the people who answer at 2 AM'
                    : `${circle.length} people on call`}
                </Mono>
              </View>
              <ArrowRight size={14} color={C.azure} />
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
          ) : (
            <View
              className="rounded-2xl p-4"
              style={{
                backgroundColor: alpha(C.lemon, 0.04),
                borderWidth: 1,
                borderColor: alpha(C.lemon, 0.16),
              }}
            >
              <View className="flex-row items-start gap-3">
                <Lock size={18} color={C.lemon} />
                <View className="flex-1">
                  <Mono bold color={C.lemon} className="text-[14px]" tracking={1}>
                    PEP CLOCK · LOCKED
                  </Mono>
                  <Mono className="mt-1 text-[13px]">{PEP_LOCK_NOTE}</Mono>
                </View>
              </View>
            </View>
          )}
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
          <Eyebrow color={C.violet}>MIDNIGHT SIMULATOR</Eyebrow>
          <Display className="mt-2 text-3xl">Run the hard nights first.</Display>
          <Body className="mt-2">
            Pick a response and see how the M.A.T.C.H. framework turns panic into a plan. No scores,
            no judgment.
          </Body>

          <View className="mt-4 gap-3">
            {scenarios.map((scenario) => {
              const result = scenarioResults[scenario.id];
              return (
                <TintedRow
                  key={scenario.id}
                  tint={C.violet}
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
                        <Mono bold color={C.violet} className="text-[13px]" tracking={1}>
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
                    <ArrowRight size={14} color={C.violet} />
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
