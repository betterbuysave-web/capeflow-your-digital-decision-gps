import { Alert, Platform, Pressable, ScrollView, View } from 'react-native';
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
} from 'lucide-react-native';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { Chip, TintedRow } from '@/components/cape/Buttons';
import { Wordmark } from '@/components/cape/Wordmark';
import { C, alpha } from '@/lib/colors';
import { BADGES } from '@/lib/data/badges';
import { PRIVACY_NOTE, SOURCES } from '@/lib/data/content';
import {
  TOTALS,
  VAULT_TARGET,
  disarmedCount,
  lessonTotal,
  saferScore,
  useCapeStore,
} from '@/lib/store/useCapeStore';
import { BrandFooter } from '@/components/cape/BrandFooter';

export default function Me() {
  const codename = useCapeStore((s) => s.codename);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const xp = useCapeStore((s) => s.xp);
  const streak = useCapeStore((s) => s.streak);
  const badges = useCapeStore((s) => s.badges);
  const completedLessons = useCapeStore((s) => s.completedLessons);
  const boundaries = useCapeStore((s) => s.boundaries);
  const circle = useCapeStore((s) => s.circle);
  const scenarioResults = useCapeStore((s) => s.scenarioResults);
  const ghosts = useCapeStore((s) => s.ghosts);
  const reminders = useCapeStore((s) => s.reminders);
  const resetAll = useCapeStore((s) => s.resetAll);

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
    const wipe = async () => {
      await resetAll();
      router.replace('/');
    };
    if (Platform.OS === 'web') {
      void wipe();
      return;
    }
    Alert.alert(
      'Delete all local data?',
      'Your progress, badges, boundary menu, and Safety Circle are stored only on this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete everything', style: 'destructive', onPress: () => void wipe() },
      ],
    );
  };

  return (
    <View className="bg-paper flex-1">
      <SafeAreaView edges={['top']} className="bg-paper" />
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

        <View className="mt-8">
          <Eyebrow color={C.teal}>SafER SCORE BREAKDOWN</Eyebrow>
          <Display className="mt-2 text-3xl">{score} / 100</Display>
          <View className="mt-4 gap-4">
            <ScoreRow
              label="MODULE LESSONS"
              detail={`${completedLessons.length} of ${lessonTotal(gradeBand)}`}
              weight="40 pts"
              value={(completedLessons.length / lessonTotal(gradeBand)) * 100}
              tint={C.modM}
            />
            <ScoreRow
              label="MIDNIGHT SIMS"
              detail={`${Object.keys(scenarioResults).length} of ${TOTALS.scenarios}`}
              weight="22 pts"
              value={(Object.keys(scenarioResults).length / TOTALS.scenarios) * 100}
              tint={C.violet}
            />
            <ScoreRow
              label="BOUNDARY MENU"
              detail={`${Object.keys(boundaries).length} of ${TOTALS.boundaries}`}
              weight="14 pts"
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
            <ScoreRow
              label="GHOSTS DISARMED"
              detail={`${disarmedGhosts} of ${VAULT_TARGET}`}
              weight="10 pts"
              value={(Math.min(disarmedGhosts, VAULT_TARGET) / VAULT_TARGET) * 100}
              tint={C.gold}
            />
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
                <Mono bold color={C.gold} className="text-[11px]" tracking={1}>
                  PROTECTION BLUEPRINT
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
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
                <Mono bold color={C.modM} className="text-[11px]" tracking={1}>
                  ADHERENCE SETTINGS
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
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
                <Mono bold color={C.azure} className="text-[11px]" tracking={1}>
                  EDUCATIONAL LIBRARY
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
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
                <Mono bold color={C.teal} className="text-[11px]" tracking={1}>
                  ABOUT CAPE FLOW
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
                  Mission, medical disclaimer, privacy-first design
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow tint={C.gold} fill={0.06} stroke={0.2} onPress={() => router.push('/badges')}>
            <View className="flex-row items-center gap-3">
              <Award size={18} color={C.gold} />
              <View className="flex-1">
                <Mono bold color={C.gold} className="text-[11px]" tracking={1}>
                  BADGE CABINET
                </Mono>
                <Mono className="mt-0.5 text-[9px]">{badges.length} earned</Mono>
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
                <Mono bold color={C.violet} className="text-[11px]" tracking={1}>
                  PARENT &amp; SCHOOL DASHBOARD
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
                  Curriculum, parent rights, COPPA/FERPA, home activities
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
              <Mono className="text-[10px]">{PRIVACY_NOTE}</Mono>
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
                <Mono bold className="text-[10px]" color={alpha(C.inkSoft, 0.85)}>
                  {src.name}
                </Mono>
                <Mono className="mt-0.5 text-[9px]" color={alpha(C.inkFaint, 0.6)}>
                  {src.detail}
                </Mono>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-8 gap-3">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/')}
            className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3.5 active:opacity-70"
            style={{
              backgroundColor: C.card,
              borderWidth: 1,
              borderColor: alpha(C.ink, 0.14),
            }}
          >
            <RotateCcw size={14} color={alpha(C.inkFaint, 0.8)} />
            <Mono bold color={alpha(C.inkFaint, 0.8)} tracking={2} className="text-[11px]">
              REVISIT THE INTRO
            </Mono>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={confirmReset}
            className="flex-row items-center justify-center gap-2 rounded-full px-5 py-3.5 active:opacity-70"
            style={{
              backgroundColor: alpha(C.no, 0.1),
              borderWidth: 1,
              borderColor: alpha(C.no, 0.3),
            }}
          >
            <Trash2 size={14} color={C.no} />
            <Mono bold color={C.no} tracking={2} className="text-[11px]">
              DELETE ALL MY DATA
            </Mono>
          </Pressable>

          <Body className="text-center text-[11px]" color={alpha(C.inkFaint, 0.6)}>
            Nothing you do in CAPE FLOW is uploaded. Deleting here removes it permanently.
          </Body>
        </View>

        <BrandFooter className="mt-8" />
      </ScrollView>
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
        <Mono bold color={tint} className="text-[10px]" tracking={1.5}>
          {label}
        </Mono>
        <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.7)}>
          {detail} · {weight}
        </Mono>
      </View>
      <Rail value={value} color={tint} />
    </View>
  );
}
