import { useEffect } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import {
  ArrowRight,
  Award,
  Coffee,
  FileText,
  Flame,
  Ghost,
  LifeBuoy,
  Moon,
  Users,
} from 'lucide-react-native';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { Chip, TintedRow } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { BrandBanner } from '@/components/cape/BrandBanner';
import { MatchCompass } from '@/components/cape/MatchCompass';
import { PauseButton } from '@/components/cape/PauseButton';
import { PepCountdownBanner } from '@/components/cape/PepCountdown';
import { C, alpha } from '@/lib/colors';
import { MATCH_MODULES, lessonsForTrack, allLessonsForTrack } from '@/lib/data/match';
import { scenariosForTrack } from '@/lib/data/scenarios';
import { badgesForTrack } from '@/lib/data/badges';
import { trackFor } from '@/lib/data/content';
import {
  TOTALS,
  disarmedCount,
  namedGhostCount,
  ghostTotal,
  lessonTotal,
  moduleProgress,
  saferScore,
  useCapeStore,
} from '@/lib/store/useCapeStore';

export default function Compass() {
  const codename = useCapeStore((s) => s.codename);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const xp = useCapeStore((s) => s.xp);
  const streak = useCapeStore((s) => s.streak);
  const storedBadges = useCapeStore((s) => s.badges);
  const completedLessons = useCapeStore((s) => s.completedLessons);
  const boundaries = useCapeStore((s) => s.boundaries);
  const circle = useCapeStore((s) => s.circle);
  const scenarioResults = useCapeStore((s) => s.scenarioResults);
  const ghosts = useCapeStore((s) => s.ghosts);
  const registerVisit = useCapeStore((s) => s.registerVisit);

  useEffect(() => {
    registerVisit();
  }, [registerVisit]);

  const score = saferScore({
    completedLessons,
    boundaries,
    circle,
    scenarioResults,
    ghosts,
    gradeBand,
  });
  const track = trackFor(gradeBand);
  const badges = storedBadges.filter((id) =>
    badgesForTrack(track).some((badge) => badge.id === id),
  );
  const doneLessons = allLessonsForTrack(track).filter((lesson) =>
    completedLessons.includes(lesson.id),
  ).length;
  const scenarios = scenariosForTrack(track);
  const playedSims = scenarios.filter((scenario) => scenarioResults[scenario.id]).length;
  const nextSim = scenarios.find((scenario) => !scenarioResults[scenario.id]) ?? scenarios[0];
  const namedGhosts = namedGhostCount(ghosts);
  const disarmedGhosts = disarmedCount(ghosts);
  const ghostRange = ghostTotal(gradeBand);

  return (
    <View className="bg-paper flex-1">
      <SafeAreaView edges={['top']} className="bg-paper" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        {/* BRAND BANNER */}
        <BrandBanner />

        {/* SafER SCORE */}
        <Panel tint={C.teal} fill={0.06} stroke={0.2} className="mt-5">
          <View className="flex-row items-end justify-between">
            <View>
              <Eyebrow color={C.teal}>SafER SCORE</Eyebrow>
              <Mono className="mt-1.5 text-[10px]">Readiness across five MATCH letters</Mono>
            </View>
            <Display color={C.teal} className="text-5xl">
              {score}
            </Display>
          </View>
          <View className="mt-3">
            <Rail value={score} color={C.teal} height={6} />
          </View>
          <View className="mt-4 flex-row flex-wrap gap-2">
            <Chip label={`${doneLessons}/${lessonTotal(gradeBand)} LESSONS`} tint={C.modM} />
            <Chip label={`${playedSims}/${scenarios.length} SIMS`} tint={C.violet} />
            <Chip
              label={`${Object.keys(boundaries).length}/${TOTALS.boundaries} MENU`}
              tint={C.amber}
            />
            <Chip label={`${circle.length} CIRCLE`} tint={C.azure} />
            {gradeBand === '9-12' ? (
              <Chip label={`${disarmedGhosts}/${ghostRange} HEALTHCARE GHOSTS`} tint={C.gold} />
            ) : null}
          </View>
        </Panel>

        {/* PROTECTION BLUEPRINT */}
        <TintedRow
          tint={C.gold}
          fill={0.06}
          stroke={0.2}
          className="mt-3"
          onPress={() => router.push('/protection-blueprint')}
        >
          <View className="flex-row items-center gap-3">
            <FileText size={18} color={C.gold} />
            <View className="flex-1">
              <Mono bold color={C.gold} className="text-[11px]" tracking={1}>
                PROTECTION BLUEPRINT
              </Mono>
              <Mono className="mt-0.5 text-[9px]">
                Full readout of your shield, plans, and adherence history
              </Mono>
            </View>
            <ArrowRight size={14} color={C.gold} />
          </View>
        </TintedRow>

        <View className="mt-4 flex-row items-center justify-between">
          <View>
            <Eyebrow color={C.teal}>WEAR YOUR CAPE</Eyebrow>
            <Display className="mt-1.5 text-3xl">
              {codename.length > 0 ? codename : 'Anonymous'}
            </Display>
          </View>
          <View className="flex-row items-center gap-2">
            <View
              className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: alpha(C.flame, 0.1),
                borderWidth: 1,
                borderColor: alpha(C.flame, 0.28),
              }}
            >
              <Flame size={13} color={C.flame} />
              <Mono bold color={C.flame} className="text-[10px]">
                {streak}d
              </Mono>
            </View>
            <View
              className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                backgroundColor: alpha(C.gold, 0.1),
                borderWidth: 1,
                borderColor: alpha(C.gold, 0.28),
              }}
            >
              <Award size={13} color={C.gold} />
              <Mono bold color={C.gold} className="text-[10px]">
                {xp} XP
              </Mono>
            </View>
          </View>
        </View>
        <Mono className="mt-2 text-[10px]">
          Leadership is the next safe move—for you and the people around you.
        </Mono>

        <PepCountdownBanner className="mt-4" />

        {/* GHOST VAULT */}
        {gradeBand === '9-12' ? (
          <TintedRow
            tint={C.violet}
            fill={0.07}
            stroke={0.22}
            className="mt-4"
            onPress={() => router.push('/tools/ghost-vault')}
          >
            <View className="flex-row items-center gap-3">
              <Ghost size={18} color={C.violet} />
              <View className="flex-1">
                <Mono bold color={C.violet} className="text-[11px]" tracking={1}>
                  Healthcare Anxiety Audit
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
                  {namedGhosts === 0
                    ? 'Name a healthcare ghost — plan your next care step'
                    : `${namedGhosts} named · ${disarmedGhosts} shields online`}
                </Mono>
              </View>
              <ArrowRight size={14} color={C.violet} />
            </View>
          </TintedRow>
        ) : null}

        {/* PAUSE BUTTON */}
        <PauseButton className="mt-6" />

        {/* MATCH COMPASS */}
        <View className="mt-8">
          <Eyebrow color={C.teal}>MATCH COMPASS</Eyebrow>
          <Display className="mt-2 text-3xl">Five MATCH letters. One compass.</Display>
          <View className="mt-4">
            <MatchCompass />
          </View>
          <View className="mt-5 gap-3">
            {MATCH_MODULES.map((mod) => {
              const progress = moduleProgress(mod.id, completedLessons, track);
              const available = lessonsForTrack(mod, track);
              const done = available.filter((l) => completedLessons.includes(l.id)).length;
              return (
                <TintedRow
                  key={mod.id}
                  tint={mod.color}
                  fill={0.05}
                  stroke={0.16}
                  onPress={() => router.push({ pathname: '/module/[id]', params: { id: mod.id } })}
                >
                  <View className="flex-row items-center gap-4">
                    <View
                      className="h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: alpha(mod.color, 0.1),
                        borderWidth: 1,
                        borderColor: alpha(mod.color, 0.25),
                      }}
                    >
                      <Display color={mod.color} className="text-2xl">
                        {mod.letter}
                      </Display>
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2">
                        <Mono className="text-sm">{mod.emoji}</Mono>
                        <Mono bold color={mod.color} className="flex-1 text-[12px]">
                          {mod.name}
                        </Mono>
                      </View>
                      <View className="mt-2">
                        <Rail value={progress} color={mod.color} />
                      </View>
                      <Mono className="mt-1.5 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                        {done}/{available.length} lessons · {progress}%
                      </Mono>
                    </View>
                    <ArrowRight size={14} color={alpha(mod.color, 0.8)} />
                  </View>
                </TintedRow>
              );
            })}
          </View>
        </View>

        {/* TONIGHT'S SIM */}
        <View className="mt-8">
          <Eyebrow color={C.violet}>MIDNIGHT SIM</Eyebrow>
          <Display className="mt-2 text-3xl">Practice before it&apos;s real.</Display>
          <TintedRow
            tint={C.violet}
            fill={0.07}
            stroke={0.22}
            className="mt-4"
            onPress={() => router.push({ pathname: '/sim/[id]', params: { id: nextSim.id } })}
          >
            <View className="flex-row items-center gap-3">
              <Mono className="text-xl">{nextSim.emoji}</Mono>
              <View className="flex-1">
                <Mono bold color={C.violet} className="text-[11px]" tracking={1}>
                  {nextSim.time} · {nextSim.title.toUpperCase()}
                </Mono>
                <Mono className="mt-1 text-[10px]">{nextSim.setup}</Mono>
              </View>
              <ArrowRight size={14} color={C.violet} />
            </View>
          </TintedRow>
        </View>

        {/* QUICK TOOLS */}
        <View className="mt-8">
          <Eyebrow color={C.amber}>QUICK ACCESS</Eyebrow>
          <View className="mt-4 flex-row flex-wrap gap-3">
            <QuickTile
              tint={C.amber}
              icon={<Coffee size={18} color={C.amber} />}
              label="CONSENT CAFÉ"
              detail={`${Object.keys(boundaries).length} items ordered`}
              onPress={() => router.push('/tools/consent-cafe')}
            />
            <QuickTile
              tint={C.azure}
              icon={<Users size={18} color={C.azure} />}
              label="SAFETY CIRCLE"
              detail={`${circle.length} people`}
              onPress={() => router.push('/tools/safety-circle')}
            />
            <QuickTile
              tint={C.flame}
              icon={<LifeBuoy size={18} color={C.flame} />}
              label="CRISIS PROTOCOL"
              detail="24/7 lines"
              onPress={() => router.push('/(tabs)/crisis')}
            />
            <QuickTile
              tint={C.violet}
              icon={<Moon size={18} color={C.violet} />}
              label="ALL SCENARIOS"
              detail={`${playedSims}/${scenarios.length} played`}
              onPress={() => router.push('/(tabs)/tools')}
            />
          </View>
        </View>

        {/* BADGES */}
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push('/badges')}
          className="mt-8 active:opacity-70"
        >
          <Panel tint={C.gold} fill={0.05} stroke={0.2}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Eyebrow color={C.gold}>BADGES</Eyebrow>
                <Body className="mt-1.5" color={alpha(C.inkSoft, 0.7)}>
                  {badges.length === 0
                    ? 'Finish one lesson to earn your first badge.'
                    : `${badges.length} earned. Keep stacking.`}
                </Body>
              </View>
              <Award size={22} color={C.gold} />
            </View>
          </Panel>
        </Pressable>

        <BrandFooter className="mt-10" />
      </ScrollView>
    </View>
  );
}

function QuickTile({
  tint,
  icon,
  label,
  detail,
  onPress,
}: {
  tint: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="flex-1 basis-[45%] rounded-2xl p-4 active:opacity-70"
      style={{
        backgroundColor: alpha(tint, 0.06),
        borderWidth: 1,
        borderColor: alpha(tint, 0.18),
      }}
    >
      {icon}
      <Mono bold color={tint} className="mt-2.5 text-[10px]" tracking={1}>
        {label}
      </Mono>
      <Mono className="mt-1 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
        {detail}
      </Mono>
    </Pressable>
  );
}
