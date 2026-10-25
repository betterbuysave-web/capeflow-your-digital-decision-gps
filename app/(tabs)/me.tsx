import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import {
  Award,
  BellRing,
  BookOpen,
  FileText,
  Info,
  Library,
  Lock,
  RotateCcw,
  Trash2,
  Users,
} from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { StackHeader } from '@/components/cape/Screen';

import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { DiscreetModeCard } from '@/components/cape/DiscreetModeCard';
import { Chip, GradientAction, TintedRow } from '@/components/cape/Buttons';
import { Wordmark } from '@/components/cape/Wordmark';
import { C, alpha } from '@/lib/colors';
import { badgesForTrack } from '@/lib/data/badges';
import { PRIVACY_NOTE, SOURCES, trackFor } from '@/lib/data/content';
import {
  TOTALS,
  VAULT_TARGET,
  disarmedCount,
  saferScore,
  useCapeStore,
} from '@/lib/store/useCapeStore';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { AccessibleSheet } from '@/components/cape/AccessibleSheet';
import { allLessonsForTrack } from '@/lib/data/match';
import { scenariosForTrack } from '@/lib/data/scenarios';

export default function Me() {
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
  const reminders = useCapeStore((s) => s.reminders);
  const resetAll = useCapeStore((s) => s.resetAll);
  const [resetOpen, setResetOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const track = trackFor(gradeBand);
  const BADGES = badgesForTrack(track);
  const badges = storedBadges.filter((id) => BADGES.some((badge) => badge.id === id));
  const availableLessons = allLessonsForTrack(track);
  const doneLessons = availableLessons.filter((lesson) =>
    completedLessons.includes(lesson.id),
  ).length;
  const availableScenarios = scenariosForTrack(track);
  const doneScenarios = availableScenarios.filter(
    (scenario) => scenarioResults[scenario.id],
  ).length;

  const score = saferScore({
    completedLessons,
    boundaries,
    circle,
    scenarioResults,
    ghosts,
    gradeBand,
  });
  const disarmedGhosts = disarmedCount(ghosts);
  const armedReminders = reminders.filter((r) => r.enabled).length;

  const confirmReset = () => {
    setResetError(null);
    setResetOpen(true);
  };
  const wipe = async () => {
    if (deleting) return;
    setDeleting(true);
    setResetError(null);
    try {
      await resetAll();
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => undefined,
      );
      setResetOpen(false);
      router.replace('/');
    } catch {
      setResetError('We could not finish clearing your data and reminders. Please try again.');
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="Me" tint={C.teal} fallback="/(tabs)" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pt-2">
          <Wordmark compact />
        </View>

        <Panel tint={C.teal} fill={0.06} stroke={0.2} className="mt-8">
          <Eyebrow color={C.teal}>THIS DEVICE</Eyebrow>
          <Display className="mt-1.5 text-3xl">
            {codename.length > 0 ? codename : 'Anonymous'}
          </Display>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {gradeBand ? <Chip label={`GRADES ${gradeBand}`} tint={C.gold} /> : null}
            <Chip label={`${xp} XP`} tint={C.teal} />
            <Chip label={`${streak}-DAY STREAK`} tint={C.flame} />
            <Chip label={`${badges.length}/${BADGES.length} BADGES`} tint={C.violet} />
          </View>
        </Panel>

        <DiscreetModeCard className="mt-5" />

        <View className="mt-8">
          <Eyebrow color={C.teal}>SafER SCORE BREAKDOWN</Eyebrow>
          <Display className="mt-2 text-3xl">{score} / 100</Display>
          <Mono className="mt-2 text-[12px]" color={alpha(C.inkFaint, 0.85)}>
            {`Module lessons are short MATCH-letter steps (${availableLessons.length} on your track), separate from the book's chapters. Point weights depend on your track's activities; the total is always 100.`}
          </Mono>
          <View className="mt-4 gap-4">
            <ScoreRow
              label="MODULE LESSONS"
              detail={`${doneLessons} of ${availableLessons.length}`}
              weight="40 pts"
              value={(doneLessons / availableLessons.length) * 100}
              tint={C.modM}
            />
            <ScoreRow
              label="MIDNIGHT SIMS"
              detail={`${doneScenarios} of ${availableScenarios.length}`}
              weight="22 pts"
              value={(doneScenarios / availableScenarios.length) * 100}
              tint={C.violet}
            />
            <ScoreRow
              label="BOUNDARY MENU"
              detail={`${Object.keys(boundaries).length} of ${TOTALS.boundaries}`}
              weight={gradeBand === '9-12' ? '14 pts' : '24 pts'}
              value={(Object.keys(boundaries).length / TOTALS.boundaries) * 100}
              tint={C.amber}
            />
            <ScoreRow
              label="SAFETY CIRCLE"
              detail={`${circle.length} of 3`}
              weight="14 pts"
              value={(Math.min(circle.length, 3) / 3) * 100}
              tint={C.azure}
            />
            {gradeBand === '9-12' ? (
              <ScoreRow
                label="HEALTHCARE GHOSTS DISARMED"
                detail={`${disarmedGhosts} of ${VAULT_TARGET}`}
                weight="10 pts"
                value={(Math.min(disarmedGhosts, VAULT_TARGET) / VAULT_TARGET) * 100}
                tint={C.gold}
              />
            ) : null}
          </View>
        </View>

        <View className="mt-8 gap-3">
          <TintedRow
            tint={C.gold}
            fill={0.07}
            stroke={0.22}
            onPress={() => router.push('/protection-blueprint')}
          >
            <View className="flex-row items-center gap-3">
              <FileText size={18} color={C.gold} />
              <View className="flex-1">
                <Mono bold color={C.gold} className="text-[13px]" tracking={1}>
                  PROTECTION BLUEPRINT
                </Mono>
                <Mono className="mt-0.5 text-[12px]">
                  Signature Shield readout, active plans, adherence history
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow
            tint={C.modM}
            fill={0.06}
            stroke={0.2}
            onPress={() => router.push('/adherence-settings')}
          >
            <View className="flex-row items-center gap-3">
              <BellRing size={18} color={C.modM} />
              <View className="flex-1">
                <Mono bold color={C.modM} className="text-[13px]" tracking={1}>
                  ADHERENCE SETTINGS
                </Mono>
                <Mono className="mt-0.5 text-[12px]">
                  {reminders.length > 0
                    ? `${armedReminders} of ${reminders.length} reminders armed`
                    : 'Set reminders, tones, and weekly schedules'}
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow
            tint={C.azure}
            fill={0.06}
            stroke={0.2}
            onPress={() => router.push('/educational-library')}
          >
            <View className="flex-row items-center gap-3">
              <Library size={18} color={C.azure} />
              <View className="flex-1">
                <Mono bold color={C.azure} className="text-[13px]" tracking={1}>
                  EDUCATIONAL LIBRARY
                </Mono>
                <Mono className="mt-0.5 text-[12px]">
                  Glossary and topics, searchable by category
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow
            tint={C.teal}
            fill={0.06}
            stroke={0.2}
            onPress={() => router.push('/about-cape')}
          >
            <View className="flex-row items-center gap-3">
              <Info size={18} color={C.teal} />
              <View className="flex-1">
                <Mono bold color={C.teal} className="text-[13px]" tracking={1}>
                  ABOUT CAPE FLOW
                </Mono>
                <Mono className="mt-0.5 text-[12px]">
                  Mission, medical disclaimer, privacy-first design
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow tint={C.gold} fill={0.06} stroke={0.2} onPress={() => router.push('/badges')}>
            <View className="flex-row items-center gap-3">
              <Award size={18} color={C.gold} />
              <View className="flex-1">
                <Mono bold color={C.gold} className="text-[13px]" tracking={1}>
                  BADGE CABINET
                </Mono>
                <Mono className="mt-0.5 text-[12px]">{badges.length} earned</Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow
            tint={C.violet}
            fill={0.06}
            stroke={0.2}
            onPress={() => router.push('/parents')}
          >
            <View className="flex-row items-center gap-3">
              <Users size={18} color={C.violet} />
              <View className="flex-1">
                <Mono bold color={C.violet} className="text-[13px]" tracking={1}>
                  PARENT &amp; SCHOOL DASHBOARD
                </Mono>
                <Mono className="mt-0.5 text-[12px]">
                  Curriculum, parent rights, COPPA/FERPA, home activities
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow tint={C.azure} fill={0.06} stroke={0.2} onPress={() => router.push('/legal')}>
            <View className="flex-row items-center gap-3">
              <FileText size={18} color={C.azure} />
              <View className="flex-1">
                <Mono bold color={C.azure} className="text-[13px]" tracking={1}>
                  LEGAL &amp; PRIVACY
                </Mono>
                <Mono className="mt-0.5 text-[12px]">
                  Terms, privacy policy, health disclaimer, parent notice
                </Mono>
              </View>
            </View>
          </TintedRow>
        </View>

        <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-8">
          <View className="flex-row items-start gap-3">
            <Lock size={16} color={C.teal} />
            <View className="flex-1">
              <Eyebrow color={C.teal} className="mb-1.5">
                ZERO STIGMA TAX — NO TRACKING
              </Eyebrow>
              <Mono className="text-[13px]">{PRIVACY_NOTE}</Mono>
            </View>
          </View>
        </Panel>

        <View className="mt-8">
          <View className="flex-row items-center gap-2">
            <BookOpen size={15} color={alpha(C.inkFaint, 0.7)} />
            <Eyebrow color={alpha(C.inkFaint, 0.7)}>SOURCES &amp; REFERENCES</Eyebrow>
          </View>
          <View className="mt-3 gap-2">
            {SOURCES.map((src) => (
              <View
                key={src.name}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.1),
                }}
              >
                <Mono bold className="text-[13px]" color={alpha(C.inkSoft, 0.85)}>
                  {src.name}
                </Mono>
                <Mono className="mt-0.5 text-[12px]" color={alpha(C.inkFaint, 0.6)}>
                  {src.detail}
                </Mono>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-8 gap-3">
          <GradientAction
            onPress={() => router.push('/')}
            className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3.5"
          >
            <RotateCcw size={14} color={C.paper2} />
            <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
              REVISIT THE INTRO
            </Mono>
          </GradientAction>

          <GradientAction
            onPress={confirmReset}
            className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3.5"
          >
            <Trash2 size={14} color={C.paper2} />
            <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
              DELETE ALL MY DATA
            </Mono>
          </GradientAction>

          <Body className="text-center text-[13px]" color={C.inkFaint}>
            Clears saved CAPE entries and reminders on this device. Shared copies and existing
            device backups are not erased.
          </Body>
        </View>

        <BrandFooter className="mt-8" />
      </ScrollView>
      <AccessibleSheet
        visible={resetOpen}
        onClose={() => {
          if (!deleting) setResetOpen(false);
        }}
        title="Delete all saved data?"
        tint={C.no}
        footer={
          <View className="gap-3">
            <GradientAction
              accessibilityState={{ disabled: deleting, busy: deleting }}
              disabled={deleting}
              onPress={() => void wipe()}
              className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3.5"
            >
              {deleting ? <ActivityIndicator size="small" color={C.paper2} /> : null}
              <Mono bold color={C.paper2} className="text-[14px]">
                {deleting ? 'Deleting…' : resetError ? 'Retry deletion' : 'Delete everything'}
              </Mono>
            </GradientAction>
            <GradientAction
              disabled={deleting}
              onPress={() => setResetOpen(false)}
              className="items-center justify-center rounded-full px-5 py-3"
            >
              <Mono bold color={C.paper2} className="text-[14px]">
                Cancel
              </Mono>
            </GradientAction>
          </View>
        }
      >
        <Body>
          This clears your private inputs, scripts, plans, Safety Circle, progress, preferences, and
          reminders saved in CAPE Flow on this device. It cannot be undone.
        </Body>
        <Body className="mt-3 text-[14px]">
          Shared or copied text, call history, and existing device backups are outside CAPE Flow and
          are not erased.
        </Body>
        {resetError ? (
          <Body accessibilityRole="alert" color={C.no} className="mt-3">
            {resetError}
          </Body>
        ) : null}
      </AccessibleSheet>
    </View>
  );
}

function ScoreRow({
  label,
  detail,
  weight,
  value,
  tint,
}: {
  label: string;
  detail: string;
  weight: string;
  value: number;
  tint: string;
}) {
  return (
    <View>
      <View className="mb-2 flex-row items-center justify-between">
        <Mono bold color={tint} className="text-[13px]" tracking={1.5}>
          {label}
        </Mono>
        <Mono className="text-[12px]" color={alpha(C.inkFaint, 0.7)}>
          {detail} · {weight}
        </Mono>
      </View>
      <Rail value={value} color={tint} />
    </View>
  );
}
