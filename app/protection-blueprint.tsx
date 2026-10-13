import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { type Href, router } from 'expo-router';
import {
  Activity,
  BellRing,
  CalendarCheck,
  CircleAlert,
  Eye,
  Ghost,
  HeartPulse,
  ListChecks,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Timer,
  Users,
} from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { Chip, GhostButton, MetallicButton } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Telemetry } from '@/components/cape/Telemetry';
import { VaultCore } from '@/components/cape/VaultCore';
import { C, alpha } from '@/lib/colors';
import { badgesForTrack, getBadge } from '@/lib/data/badges';
import { BOUNDARY_MENU } from '@/lib/data/boundaries';
import { DISCLAIMER, TRACKS, pepUnlocked, trackFor } from '@/lib/data/content';
import { PEP_WINDOW_MS } from '@/lib/data/crisis';
import { MATCH_MODULES, lessonsForTrack } from '@/lib/data/match';
import { getScenario, scenariosForTrack } from '@/lib/data/scenarios';
import { SAFETY_EXCEPTION, fearStateInfo, ghostsForTrack, nodeMeta } from '@/lib/data/ghosts';
import { describeDays, formatTime, logDayKey, recentDayKeys, toneInfo } from '@/lib/data/adherence';
import { verdictLabel } from '@/lib/verdict';
import {
  TOTALS,
  VAULT_TARGET,
  disarmedCount,
  namedGhostCount,
  lessonTotal,
  moduleProgress,
  saferScore,
  useCapeStore,
} from '@/lib/store/useCapeStore';

const HISTORY_DAYS = 14;

/** Readiness read-out for the top of the report. */
function readiness(score: number): { label: string; tint: string; line: string } {
  if (score >= 85)
    return {
      label: 'FIELD READY',
      tint: C.teal,
      line: 'Layers are redundant. Keep the streak and re-run a drill when something changes.',
    };
  if (score >= 60)
    return {
      label: 'ARMORED',
      tint: C.gold,
      line: 'The core plan holds. Close the thinnest layer below before the night that needs it.',
    };
  if (score >= 30)
    return {
      label: 'CALIBRATING',
      tint: C.amber,
      line: 'You have started building. One more layer turns a good intention into a plan.',
    };
  return {
    label: 'UNCALIBRATED',
    tint: C.flame,
    line: 'Nothing here is a verdict on you. Pick the smallest move below and start there.',
  };
}

export default function ProtectionBlueprint() {
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
  const fearState = useCapeStore((s) => s.fearState);
  const cafeMenu = useCapeStore((s) => s.cafeMenu);
  const cafeExit = useCapeStore((s) => s.cafeExit);
  const reminders = useCapeStore((s) => s.reminders);
  const adherenceLog = useCapeStore((s) => s.adherenceLog);
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);

  const track = trackFor(gradeBand);
  const auditAvailable = gradeBand === '9-12';
  const BADGES = badgesForTrack(track);
  const badges = storedBadges.filter((id) => BADGES.some((badge) => badge.id === id));
  const trackInfo = TRACKS[track];
  const availableScenarios = scenariosForTrack(track);
  const availableScenarioIds = new Set(availableScenarios.map((scenario) => scenario.id));
  const score = saferScore({
    completedLessons,
    boundaries,
    circle,
    scenarioResults,
    ghosts,
    gradeBand,
  });
  const verdict = readiness(score);
  const lessonsAvailable = lessonTotal(gradeBand);
  const disarmed = disarmedCount(ghosts);
  const named = namedGhostCount(ghosts);

  const history = useMemo(() => recentDayKeys(HISTORY_DAYS), []);
  const today = logDayKey();
  const armed = reminders.filter((r) => r.enabled);
  const loggedToday = reminders.filter((r) => (adherenceLog[r.id] ?? []).includes(today)).length;

  const adherence = useMemo(() => {
    if (reminders.length === 0) return { hits: 0, expected: 0, rate: 0 };
    let hits = 0;
    let expected = 0;
    for (const reminder of reminders) {
      const logged = adherenceLog[reminder.id] ?? [];
      for (const day of history) {
        const weekday = new Date(`${day}T12:00:00`).getDay();
        if (!reminder.days.includes(weekday)) continue;
        expected += 1;
        if (logged.includes(day)) hits += 1;
      }
    }
    return { hits, expected, rate: expected === 0 ? 0 : Math.round((hits / expected) * 100) };
  }, [reminders, adherenceLog, history]);

  const answered = Object.keys(boundaries).length;
  const yesCount = Object.values(boundaries).filter((a) => a === 'yes').length;
  const maybeCount = Object.values(boundaries).filter((a) => a === 'maybe').length;
  const noCount = Object.values(boundaries).filter((a) => a === 'no').length;
  const hardLimits = cafeMenu.notserved.filter((item) => item.text.trim().length > 0);

  const sims = Object.entries(scenarioResults).filter(([id]) => availableScenarioIds.has(id));
  const bestRuns = sims.filter(([, r]) => r.verdict === 'best').length;

  const shields = useMemo(
    () =>
      ghostsForTrack(track).flatMap((def) => {
        const record = ghosts[def.id];
        if (record?.status !== 'disarmed') return [];
        return [
          {
            id: def.id,
            name: def.name,
            shield: def.shield,
            node: def.node,
            plan: record.plan.trim(),
          },
        ];
      }),
    [ghosts, track],
  );

  const pepActive =
    pepUnlocked(gradeBand) && pepStartedAt !== null && Date.now() - pepStartedAt < PEP_WINDOW_MS;
  const pepHoursLeft = pepStartedAt
    ? Math.max(0, Math.ceil((pepStartedAt + PEP_WINDOW_MS - Date.now()) / 3_600_000))
    : 0;

  const nextMoves = useMemo(() => {
    const moves: { label: string; detail: string; tint: string; href: Href }[] = [];
    if (circle.length < 3)
      moves.push({
        label: 'NAME 3 PEOPLE IN YOUR SAFETY CIRCLE',
        detail: `${circle.length} of 3 saved. A ride, a bed, and an adult who answers.`,
        tint: C.azure,
        href: '/tools/safety-circle',
      });
    if (answered < BOUNDARY_MENU.length)
      moves.push({
        label: 'FINISH YOUR BOUNDARY MENU',
        detail: `${answered} of ${BOUNDARY_MENU.length} answered in the Consent Café.`,
        tint: C.amber,
        href: '/tools/consent-cafe',
      });
    if (auditAvailable && disarmed < VAULT_TARGET)
      moves.push({
        label: 'OPEN HEALTHCARE ANXIETY AUDIT',
        detail: `${disarmed} of ${VAULT_TARGET} healthcare ghosts turned into care plans.`,
        tint: C.modT,
        href: '/tools/ghost-vault',
      });
    if (sims.length < availableScenarios.length)
      moves.push({
        label: 'RUN A MIDNIGHT SIM',
        detail: `${sims.length} of ${availableScenarios.length} drills played. Practice the pivot before it is real.`,
        tint: C.violet,
        href: '/(tabs)/tools',
      });
    if (completedLessons.length < lessonsAvailable)
      moves.push({
        label: 'CLEAR THE NEXT M.A.T.C.H. LESSON',
        detail: `${completedLessons.length} of ${lessonsAvailable} on your track.`,
        tint: C.modM,
        href: '/(tabs)/learn',
      });
    if (reminders.length === 0)
      moves.push({
        label: 'ARM ONE REMINDER',
        detail: 'A plan you have to remember is a plan you will forget.',
        tint: C.teal,
        href: '/adherence-settings',
      });
    return moves.slice(0, 4);
  }, [
    auditAvailable,
    circle.length,
    answered,
    disarmed,
    sims.length,
    completedLessons.length,
    lessonsAvailable,
    availableScenarios.length,
    reminders.length,
  ]);

  const fearInfo = auditAvailable ? fearStateInfo(fearState) : null;

  const generated = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.goldBright} />
      <StackHeader title="Protection Blueprint" tint={C.gold} fallback="/(tabs)/me" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        {/* MASTHEAD */}
        <View className="mt-2">
          <Eyebrow color={C.gold}>PERSONAL FIELD REPORT</Eyebrow>
          <Display className="mt-2 text-4xl">Your Protection Blueprint</Display>
          <Body className="mt-2">
            A read-out of everything you have built so far — score, active plans, adherence history,
            and the thinnest layer left. Generated on this device, from this device.
          </Body>
          <View className="mt-3 flex-row flex-wrap gap-2">
            <Chip
              label={codename.length > 0 ? codename.toUpperCase() : 'ANONYMOUS'}
              tint={C.teal}
            />
            <Chip label={trackInfo.label} tint={trackInfo.tint} />
            <Chip label={generated} tint={alpha(C.inkFaint, 0.9)} />
          </View>
        </View>

        {/* SIGNATURE SHIELD */}
        <Panel tint={verdict.tint} fill={0.07} stroke={0.24} className="mt-6">
          <View className="flex-row items-center justify-between">
            <Eyebrow color={verdict.tint}>SIGNATURE SHIELD</Eyebrow>
            <Chip label={verdict.label} tint={verdict.tint} />
          </View>
          <View className="mt-2 flex-row items-end gap-2">
            <Display className="text-5xl" color={verdict.tint}>
              {score}
            </Display>
            <Mono className="pb-2 text-[11px]">/ 100 SafER</Mono>
          </View>
          <View className="mt-3">
            <Rail value={score} color={verdict.tint} height={6} />
          </View>
          <Mono className="mt-3 text-[10px]">{verdict.line}</Mono>
          <View className="mt-4">
            <Telemetry tint={C.teal} height={30} active={armed.length > 0} />
          </View>
          <View className="mt-4 flex-row flex-wrap gap-2">
            <Chip label={`${xp} XP`} tint={C.teal} />
            <Chip label={`${streak}-DAY STREAK`} tint={C.flame} />
            <Chip label={`${badges.length}/${BADGES.length} BADGES`} tint={C.violet} />
            {fearInfo ? <Chip label={fearInfo.label.toUpperCase()} tint={fearInfo.tint} /> : null}
          </View>
        </Panel>

        {/* LAYER BREAKDOWN */}
        <View className="mt-8">
          <Eyebrow color={C.teal}>LAYER BREAKDOWN</Eyebrow>
          <Display className="mt-2 text-3xl">Where the 100 points sit.</Display>
          <View className="mt-4 gap-4">
            <LayerRow
              label="MODULE LESSONS"
              detail={`${completedLessons.length} of ${lessonsAvailable}`}
              weight="40 pts"
              value={(completedLessons.length / lessonsAvailable) * 100}
              tint={C.modM}
            />
            <LayerRow
              label="MIDNIGHT SIMS"
              detail={`${sims.length} of ${availableScenarios.length}`}
              weight="22 pts"
              value={(sims.length / availableScenarios.length) * 100}
              tint={C.violet}
            />
            <LayerRow
              label="BOUNDARY MENU"
              detail={`${answered} of ${TOTALS.boundaries}`}
              weight={auditAvailable ? '14 pts' : '24 pts'}
              value={(answered / TOTALS.boundaries) * 100}
              tint={C.amber}
            />
            <LayerRow
              label="SAFETY CIRCLE"
              detail={`${circle.length} of 3`}
              weight="14 pts"
              value={(Math.min(circle.length, 3) / 3) * 100}
              tint={C.azure}
            />
            {auditAvailable ? (
              <LayerRow
                label="HEALTHCARE GHOSTS DISARMED"
                detail={`${disarmed} of ${VAULT_TARGET}`}
                weight="10 pts"
                value={(Math.min(disarmed, VAULT_TARGET) / VAULT_TARGET) * 100}
                tint={C.gold}
              />
            ) : null}
          </View>
        </View>

        {/* M.A.T.C.H. NODES */}
        <View className="mt-10">
          <Eyebrow color={C.modC}>NODE CALIBRATION</Eyebrow>
          <Display className="mt-2 text-3xl">Five nodes, five readings.</Display>
          <View className="mt-4 gap-2.5">
            {MATCH_MODULES.map((mod) => {
              const available = lessonsForTrack(mod, track);
              const done = available.filter((l) => completedLessons.includes(l.id)).length;
              const pct = moduleProgress(mod.id, completedLessons, track);
              return (
                <View
                  key={mod.id}
                  className="rounded-2xl p-3.5"
                  style={{
                    backgroundColor: alpha(mod.color, 0.06),
                    borderWidth: 1,
                    borderColor: alpha(mod.color, 0.2),
                  }}
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className="h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: alpha(mod.color, 0.16),
                        borderWidth: 1,
                        borderColor: alpha(mod.color, 0.4),
                      }}
                    >
                      <Mono bold color={mod.color} className="text-[12px]">
                        {mod.letter}
                      </Mono>
                    </View>
                    <View className="flex-1">
                      <Mono bold color={mod.color} className="text-[10px]" tracking={1.5}>
                        {mod.name.toUpperCase()}
                      </Mono>
                      <Mono className="mt-0.5 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                        {done} of {available.length} lessons · {pct}%
                      </Mono>
                    </View>
                  </View>
                  <View className="mt-2.5">
                    <Rail value={pct} color={mod.color} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ACTIVE PLANS */}
        <View className="mt-10">
          <Eyebrow color={C.teal}>ACTIVE PLANS</Eyebrow>
          <Display className="mt-2 text-3xl">What is armed right now.</Display>

          {pepActive ? (
            <Panel tint={C.flame} fill={0.08} stroke={0.28} className="mt-4">
              <View className="flex-row items-start gap-3">
                <Timer size={16} color={C.flame} />
                <View className="flex-1">
                  <Mono bold color={C.flame} className="text-[10px]" tracking={1.5}>
                    PEP CLOCK RUNNING
                  </Mono>
                  <Mono className="mt-1 text-[10px]">
                    About {pepHoursLeft} hours left in the 72-hour window. Call a clinic or an ER
                    now — sooner is stronger.
                  </Mono>
                </View>
              </View>
            </Panel>
          ) : null}

          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <BellRing size={15} color={C.teal} />
                <Mono bold color={C.teal} className="text-[10px]" tracking={1.5}>
                  REMINDERS
                </Mono>
              </View>
              <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                {armed.length} armed · {loggedToday} logged today
              </Mono>
            </View>
            {reminders.length === 0 ? (
              <Mono className="mt-2 text-[10px]">
                No reminders set. The Adherence Deck can arm a daily check-in in two taps.
              </Mono>
            ) : (
              <View className="mt-3 gap-2">
                {reminders.map((reminder) => {
                  const logged = adherenceLog[reminder.id] ?? [];
                  const hits = history.filter((day) => logged.includes(day)).length;
                  return (
                    <View
                      key={reminder.id}
                      className="rounded-xl p-3"
                      style={{
                        backgroundColor: alpha(reminder.tint, 0.06),
                        borderWidth: 1,
                        borderColor: alpha(reminder.tint, reminder.enabled ? 0.24 : 0.1),
                      }}
                    >
                      <View className="flex-row items-center justify-between gap-2">
                        <Mono
                          bold
                          color={reminder.enabled ? reminder.tint : alpha(C.inkFaint, 0.7)}
                          className="flex-1 text-[10px]"
                          tracking={1}
                        >
                          {reminder.label.toUpperCase()}
                        </Mono>
                        <Chip
                          label={reminder.enabled ? 'ARMED' : 'PAUSED'}
                          tint={reminder.enabled ? reminder.tint : alpha(C.inkFaint, 0.8)}
                        />
                      </View>
                      <Mono className="mt-1 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                        {formatTime(reminder.time)} · {describeDays(reminder.days)} ·{' '}
                        {toneInfo(reminder.tone).label}
                      </Mono>
                      <View className="mt-2 flex-row items-center gap-2">
                        <View className="flex-1">
                          <Rail value={(hits / HISTORY_DAYS) * 100} color={reminder.tint} />
                        </View>
                        <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                          {hits}/{HISTORY_DAYS}d
                        </Mono>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </Panel>

          <Panel tint={C.azure} fill={0.05} stroke={0.18} className="mt-3">
            <View className="flex-row items-center gap-2">
              <Users size={15} color={C.azure} />
              <Mono bold color={C.azure} className="text-[10px]" tracking={1.5}>
                SAFETY CIRCLE · {circle.length}
              </Mono>
            </View>
            {circle.length === 0 ? (
              <Mono className="mt-2 text-[10px]">
                No one saved yet. Three names is the target: a ride, a bed, and an adult who
                answers.
              </Mono>
            ) : (
              <View className="mt-2 gap-1.5">
                {circle.map((contact) => (
                  <Mono key={contact.id} className="text-[10px]">
                    · {contact.name} — {contact.role}
                  </Mono>
                ))}
              </View>
            )}
          </Panel>

          <Panel tint={C.amber} fill={0.05} stroke={0.18} className="mt-3">
            <View className="flex-row items-center gap-2">
              <ListChecks size={15} color={C.amber} />
              <Mono bold color={C.amber} className="text-[10px]" tracking={1.5}>
                BOUNDARY ORDER
              </Mono>
            </View>
            <View className="mt-2 flex-row flex-wrap gap-2">
              <Chip label={`${yesCount} YES`} tint={C.yes} />
              <Chip label={`${maybeCount} ASK FIRST`} tint={C.maybe} />
              <Chip label={`${noCount} NO`} tint={C.no} />
            </View>
            {hardLimits.length > 0 ? (
              <View className="mt-3">
                <Mono bold className="text-[9px]" color={alpha(C.inkFaint, 0.8)} tracking={1.5}>
                  NOT ON THE MENU
                </Mono>
                <View className="mt-1.5 gap-1">
                  {hardLimits.map((item) => (
                    <Mono key={item.id} className="text-[10px]">
                      · {item.text}
                    </Mono>
                  ))}
                </View>
              </View>
            ) : null}
            {cafeExit.completedAt !== null ? (
              <Mono className="mt-3 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                Consent Café exit card completed
                {cafeExit.confidence ? ` · confidence ${cafeExit.confidence}/5` : ''}
              </Mono>
            ) : null}
          </Panel>
        </View>

        {/* ADHERENCE HISTORY */}
        <View className="mt-10">
          <Eyebrow color={C.modM}>ADHERENCE HISTORY</Eyebrow>
          <Display className="mt-2 text-3xl">Last {HISTORY_DAYS} days.</Display>
          <Body className="mt-2">
            Missed days are data, not failure. A pattern you can see is a pattern you can fix.
          </Body>
          <Panel tint={C.modM} fill={0.05} stroke={0.18} className="mt-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <CalendarCheck size={15} color={C.modM} />
                <Mono bold color={C.modM} className="text-[10px]" tracking={1.5}>
                  ON-TIME RATE
                </Mono>
              </View>
              <Mono bold color={C.modM} className="text-[12px]">
                {adherence.expected === 0 ? '—' : `${adherence.rate}%`}
              </Mono>
            </View>
            <View className="mt-3">
              <Rail value={adherence.rate} color={C.modM} height={6} />
            </View>
            <Mono className="mt-2 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
              {adherence.expected === 0
                ? 'Nothing scheduled in this window yet.'
                : `${adherence.hits} of ${adherence.expected} scheduled check-ins logged`}
            </Mono>
            <View className="mt-4 flex-row justify-between">
              {history.map((day) => {
                const anyLogged = reminders.some((r) => (adherenceLog[r.id] ?? []).includes(day));
                return (
                  <View key={day} className="items-center gap-1">
                    <View
                      className="h-7 w-3.5 rounded-full"
                      style={{
                        backgroundColor: anyLogged ? alpha(C.modM, 0.75) : alpha(C.ink, 0.08),
                        borderWidth: 1,
                        borderColor: anyLogged ? alpha(C.modM, 0.9) : alpha(C.ink, 0.14),
                      }}
                    />
                    <Mono className="text-[7px]" color={alpha(C.inkFaint, 0.55)}>
                      {day.slice(8)}
                    </Mono>
                  </View>
                );
              })}
            </View>
          </Panel>
        </View>

        {/* Healthcare care plans — Blue Track only */}
        {auditAvailable ? (
          <View className="mt-10">
            <Eyebrow color={C.modT}>HEALTHCARE ANXIETY AUDIT</Eyebrow>
            <Display className="mt-2 text-3xl">Your care plans.</Display>
            <View className="mt-4 items-center">
              <VaultCore named={named} disarmed={disarmed} total={ghostsForTrack(track).length} />
            </View>
            <View className="mt-4 flex-row flex-wrap justify-center gap-2">
              <Chip label={`${named} NAMED`} tint={C.modT} />
              <Chip label={`${disarmed} DISARMED`} tint={C.teal} />
            </View>
            {shields.length === 0 ? (
              <Panel tint={C.modT} fill={0.05} stroke={0.16} className="mt-4">
                <View className="flex-row items-start gap-3">
                  <Ghost size={16} color={C.modT} />
                  <Mono className="flex-1 text-[10px]">
                    Your care plans will appear here. Name one of the six healthcare ghosts to
                    start.
                  </Mono>
                </View>
                <GhostButton
                  label="OPEN HEALTHCARE AUDIT"
                  tint={C.modT}
                  onPress={() => router.push('/tools/ghost-vault')}
                />
              </Panel>
            ) : (
              <View className="mt-4 gap-2">
                {shields.map((shield) => {
                  const meta = nodeMeta(shield.node);
                  return (
                    <View
                      key={shield.id}
                      className="rounded-2xl p-3.5"
                      style={{
                        backgroundColor: alpha(meta.color, 0.06),
                        borderWidth: 1,
                        borderColor: alpha(meta.color, 0.22),
                      }}
                    >
                      <View className="flex-row items-center gap-3">
                        <View
                          className="h-7 w-7 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: alpha(meta.color, 0.16),
                            borderWidth: 1,
                            borderColor: alpha(meta.color, 0.4),
                          }}
                        >
                          <Mono bold color={meta.color} className="text-[11px]">
                            {meta.letter}
                          </Mono>
                        </View>
                        <View className="flex-1">
                          <Mono bold color={meta.color} className="text-[10px]" tracking={1}>
                            {shield.shield.toUpperCase()}
                          </Mono>
                          <Mono className="mt-0.5 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
                            Answers: {shield.name} · {meta.callsign}
                          </Mono>
                        </View>
                        <ShieldCheck size={15} color={meta.color} />
                      </View>
                      {shield.plan.length > 0 ? (
                        <Mono className="mt-2 text-[10px]">&quot;{shield.plan}&quot;</Mono>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ) : null}

        {/* DRILL LOG */}
        <View className="mt-10">
          <Eyebrow color={C.violet}>DRILL LOG</Eyebrow>
          <Display className="mt-2 text-3xl">How the pivots went.</Display>
          {sims.length === 0 ? (
            <Panel tint={C.violet} fill={0.05} stroke={0.16} className="mt-4">
              <View className="flex-row items-start gap-3">
                <Radio size={16} color={C.violet} />
                <Mono className="flex-1 text-[10px]">
                  No Midnight Sims run yet. Each drill takes about a minute and shows what a
                  redundant layer buys you.
                </Mono>
              </View>
            </Panel>
          ) : (
            <View className="mt-4 gap-2">
              <View className="flex-row flex-wrap gap-2">
                <Chip label={`${sims.length}/${availableScenarios.length} RUN`} tint={C.violet} />
                <Chip label={`${bestRuns} BEST CALLS`} tint={C.yes} />
              </View>
              {sims.map(([id, result]) => {
                const scenario = getScenario(id);
                const tint =
                  result.verdict === 'best' ? C.yes : result.verdict === 'ok' ? C.maybe : C.no;
                return (
                  <View
                    key={id}
                    className="flex-row items-center gap-3 rounded-xl p-3"
                    style={{
                      backgroundColor: alpha(tint, 0.05),
                      borderWidth: 1,
                      borderColor: alpha(tint, 0.2),
                    }}
                  >
                    <Eye size={14} color={tint} />
                    <Mono bold className="flex-1 text-[10px]" color={alpha(C.inkSoft, 0.9)}>
                      {scenario?.title ?? 'Scenario'}
                    </Mono>
                    <Chip label={verdictLabel(result.verdict).toUpperCase()} tint={tint} />
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* BADGES */}
        {badges.length > 0 ? (
          <View className="mt-10">
            <Eyebrow color={C.gold}>EARNED</Eyebrow>
            <Display className="mt-2 text-3xl">Badges on the record.</Display>
            <View className="mt-4 flex-row flex-wrap gap-2">
              {badges.map((id) => {
                const badge = getBadge(id);
                if (!badge) return null;
                return (
                  <View
                    key={id}
                    className="flex-row items-center gap-2 rounded-full px-3 py-1.5"
                    style={{
                      backgroundColor: alpha(badge.tint, 0.1),
                      borderWidth: 1,
                      borderColor: alpha(badge.tint, 0.28),
                    }}
                  >
                    <Mono className="text-[11px]">{badge.emoji}</Mono>
                    <Mono bold color={badge.tint} className="text-[9px]" tracking={1}>
                      {badge.name.toUpperCase()}
                    </Mono>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}

        {/* NEXT MOVES */}
        {nextMoves.length > 0 ? (
          <View className="mt-10">
            <Eyebrow color={C.flame}>THINNEST LAYER</Eyebrow>
            <Display className="mt-2 text-3xl">Next moves, smallest first.</Display>
            <View className="mt-4 gap-2.5">
              {nextMoves.map((move) => (
                <View
                  key={move.label}
                  className="rounded-2xl p-3.5"
                  style={{
                    backgroundColor: alpha(move.tint, 0.06),
                    borderWidth: 1,
                    borderColor: alpha(move.tint, 0.22),
                  }}
                >
                  <View className="flex-row items-start gap-3">
                    <Activity size={15} color={move.tint} />
                    <View className="flex-1">
                      <Mono bold color={move.tint} className="text-[10px]" tracking={1.2}>
                        {move.label}
                      </Mono>
                      <Mono className="mt-1 text-[10px]">{move.detail}</Mono>
                    </View>
                  </View>
                  <View className="mt-3">
                    <GhostButton
                      label="OPEN"
                      tint={move.tint}
                      onPress={() => router.push(move.href)}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Panel tint={C.teal} fill={0.06} stroke={0.22} className="mt-10">
            <View className="flex-row items-start gap-3">
              <ShieldCheck size={16} color={C.teal} />
              <View className="flex-1">
                <Mono bold color={C.teal} className="text-[10px]" tracking={1.5}>
                  EVERY LAYER IS UP
                </Mono>
                <Mono className="mt-1 text-[10px]">
                  All the layers on your track are complete. Re-run a drill whenever your situation
                  changes — the plan should move with you.
                </Mono>
              </View>
            </View>
          </Panel>
        )}

        {/* PRIVACY / SAFETY / DISCLAIMER */}
        <Panel tint={C.teal} fill={0.04} stroke={0.14} className="mt-8">
          <View className="flex-row items-start gap-3">
            <CircleAlert size={16} color={C.teal} />
            <View className="flex-1">
              <Eyebrow color={C.teal} className="mb-1.5">
                THIS REPORT NEVER LEAVES THE DEVICE
              </Eyebrow>
              <Mono className="text-[10px]">
                Nothing here is uploaded, synced, or shared. If you want a clinician or a trusted
                adult to see it, show them the screen — that choice stays yours.
              </Mono>
            </View>
          </View>
        </Panel>

        <Panel tint={C.gold} fill={0.05} stroke={0.2} className="mt-3">
          <View className="flex-row items-start gap-3">
            <ShieldAlert size={16} color={C.gold} />
            <View className="flex-1">
              <Eyebrow color={C.gold} className="mb-1.5">
                THE SAFETY EXCEPTION
              </Eyebrow>
              <Mono className="text-[10px]">{SAFETY_EXCEPTION}</Mono>
            </View>
          </View>
        </Panel>

        <Panel tint={C.lemon} fill={0.05} stroke={0.2} className="mt-3">
          <View className="flex-row items-start gap-3">
            <HeartPulse size={16} color={C.lemon} />
            <View className="flex-1">
              <Eyebrow color={C.lemon} className="mb-1.5">
                MEDICAL DISCLAIMER
              </Eyebrow>
              <Mono className="text-[10px]">{DISCLAIMER}</Mono>
            </View>
          </View>
        </Panel>

        <View className="mt-8 gap-3">
          <MetallicButton
            label="OPEN ADHERENCE DECK"
            onPress={() => router.push('/adherence-settings')}
          />
          <GhostButton
            label="BACK TO MY COMPASS"
            tint={C.teal}
            onPress={() => router.push('/(tabs)')}
          />
        </View>

        <BrandFooter className="mt-8" />
      </ScrollView>
    </View>
  );
}

function LayerRow({
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
