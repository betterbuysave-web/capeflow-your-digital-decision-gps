import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import {
  BellOff,
  BellRing,
  Check,
  ChevronDown,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
} from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { Chip, GradientAction } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Telemetry } from '@/components/cape/Telemetry';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  ADHERENCE_LOCK_NOTE,
  ADHERENCE_NOTE,
  ADHERENCE_PERMISSION_NOTE,
  ADHERENCE_WEB_NOTE,
  REMINDER_TONES,
  WEEKDAYS,
  describeDays,
  formatTime,
  logDayKey,
  lockedTemplateCount,
  recentDayKeys,
  shiftTime,
  templatesForTrack,
  toneInfo,
} from '@/lib/data/adherence';
import type { ReminderTone } from '@/lib/data/adherence';
import { notificationsSupported, permissionGranted, requestPermission } from '@/lib/notifications';
import { type Reminder, useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';
const HISTORY_DAYS = 14;

export default function AdherenceSettings() {
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const reminders = useCapeStore((s) => s.reminders);
  const adherenceLog = useCapeStore((s) => s.adherenceLog);
  const addReminder = useCapeStore((s) => s.addReminder);
  const track = trackFor(gradeBand);

  const [granted, setGranted] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [customLabel, setCustomLabel] = useState('');

  const refreshPermission = useCallback(() => {
    if (!notificationsSupported) return;
    void permissionGranted().then(setGranted);
  }, []);

  useEffect(refreshPermission, [refreshPermission]);

  const templates = templatesForTrack(track);
  const lockedCount = lockedTemplateCount(track);
  const usedTemplates = useMemo(() => new Set(reminders.map((r) => r.templateId)), [reminders]);

  const today = logDayKey();
  const armed = reminders.filter((r) => r.enabled).length;
  const loggedToday = reminders.filter((r) => (adherenceLog[r.id] ?? []).includes(today)).length;

  const addFromTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template) return;
    void addReminder({
      label: template.label,
      body: template.body,
      templateId: template.id,
      tint: template.tint,
      time: template.defaultTime,
      days: [...template.defaultDays],
      tone: template.defaultTone,
    }).then(refreshPermission);
  };

  const addCustom = () => {
    const label = customLabel.trim();
    if (label.length === 0) return;
    setCustomLabel('');
    void addReminder({
      label: label.toUpperCase(),
      body: `${label} — time to take it and log it.`,
      templateId: 'custom',
      tint: C.gold,
      time: '20:00',
      days: [0, 1, 2, 3, 4, 5, 6],
      tone: 'pulse',
    }).then(refreshPermission);
  };

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.modM} />
      <StackHeader title="Adherence Settings" tint={C.modM} fallback="/(tabs)/tools" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Eyebrow color={C.modM}>REMINDER CONTROL DECK</Eyebrow>
          <Display className="mt-2 text-4xl">A plan you don&apos;t have to remember.</Display>
          <Body className="mt-3">
            Adherence is not willpower — it is scheduling. Arm the reminders you actually need, name
            them however you like, and log each one as you go.
          </Body>

          <View className="mt-4 flex-row flex-wrap gap-2">
            <Chip label={`${armed} ARMED`} tint={C.teal} />
            <Chip label={`${loggedToday}/${reminders.length || 0} LOGGED TODAY`} tint={C.gold} />
            <Chip label="DEVICE ONLY" tint={C.violet} />
          </View>

          <View className="mt-5">
            <Telemetry tint={C.modM} height={30} active={armed > 0} />
          </View>

          {!notificationsSupported ? (
            <Panel tint={C.lemon} fill={0.05} stroke={0.2} className="mt-5">
              <View className="flex-row items-start gap-3">
                <BellOff size={16} color={C.lemon} />
                <Mono className="flex-1 text-[10px]">{ADHERENCE_WEB_NOTE}</Mono>
              </View>
            </Panel>
          ) : null}

          {notificationsSupported && !granted ? (
            <GradientAction
              onPress={() => void requestPermission().then(setGranted)}
              className="mt-5 rounded-2xl p-4"
            >
              <View className="flex-row items-start gap-3">
                <BellRing size={16} color={C.paper2} />
                <View className="flex-1">
                  <Mono bold color={C.paper2} className="text-[11px]" tracking={1}>
                    NOTIFICATIONS ARE OFF — TAP TO ALLOW
                  </Mono>
                  <Mono color={C.paper2} className="mt-1 text-[11px]">
                    {ADHERENCE_PERMISSION_NOTE}
                  </Mono>
                </View>
              </View>
            </GradientAction>
          ) : null}

          {/* ARMED REMINDERS */}
          {reminders.length > 0 ? (
            <View className="mt-9">
              <Eyebrow color={C.teal}>YOUR SCHEDULE</Eyebrow>
              <View className="mt-3 gap-2.5">
                {reminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    reminder={reminder}
                    logged={adherenceLog[reminder.id] ?? []}
                    open={openId === reminder.id}
                    onToggleOpen={() => setOpenId(openId === reminder.id ? null : reminder.id)}
                  />
                ))}
              </View>
            </View>
          ) : (
            <Panel tint={C.inkFaint} fill={0.03} stroke={0.1} className="mt-9">
              <Mono className="text-[10px]">
                Nothing scheduled yet. Pick one from the bank below — start with the dose you miss
                most, not the easiest one.
              </Mono>
            </Panel>
          )}

          {/* TEMPLATE BANK */}
          <View className="mt-10">
            <Eyebrow color={C.gold}>REMINDER BANK</Eyebrow>
            <Display className="mt-2 text-3xl">Add what you actually take.</Display>
            <Mono className="mt-2 text-[10px]">
              Each one arrives with a sensible default time and cadence. Tap to add, then adjust.
            </Mono>
            <View className="mt-4 gap-2">
              {templates.map((template) => {
                const added = usedTemplates.has(template.id);
                return (
                  <GradientAction
                    key={template.id}
                    accessibilityLabel={`Add ${template.label}`}
                    onPress={() => addFromTemplate(template.id)}
                    disabled={added}
                    className="flex-row items-center gap-3 rounded-2xl p-3.5"
                  >
                    <Mono className="text-base">{template.emoji}</Mono>
                    <View className="flex-1">
                      <Mono bold color={C.paper2} className="text-[11px]" tracking={1}>
                        {template.label}
                      </Mono>
                      <Mono color={C.paper2} className="mt-0.5 text-[11px]">
                        {template.detail}
                      </Mono>
                      <Mono className="mt-1 text-[11px]" color={C.paper2}>
                        {formatTime(template.defaultTime)} · {describeDays(template.defaultDays)} ·{' '}
                        {toneInfo(template.defaultTone).label}
                      </Mono>
                    </View>
                    {added ? (
                      <Check size={15} color={C.paper2} />
                    ) : (
                      <Plus size={15} color={C.paper2} />
                    )}
                  </GradientAction>
                );
              })}
            </View>

            {lockedCount > 0 ? (
              <View
                className="mt-3 rounded-2xl p-4"
                style={{
                  backgroundColor: alpha(C.lemon, 0.04),
                  borderWidth: 1,
                  borderColor: alpha(C.lemon, 0.16),
                }}
              >
                <View className="flex-row items-start gap-3">
                  <Lock size={16} color={C.lemon} />
                  <View className="flex-1">
                    <Mono bold color={C.lemon} className="text-[10px]" tracking={1.5}>
                      {lockedCount} REMINDERS ON THE 9–12 TRACK
                    </Mono>
                    <Mono className="mt-1 text-[10px]">{ADHERENCE_LOCK_NOTE}</Mono>
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          {/* CUSTOM */}
          <View className="mt-10">
            <Eyebrow color={C.violet}>YOUR OWN LABEL</Eyebrow>
            <Mono className="mt-2 text-[10px]">
              Name it whatever makes sense to you. Vague is fine — the point is that only you know
              what it means.
            </Mono>
            <View className="mt-3 flex-row items-center gap-2">
              <TextInput
                accessibilityLabel="Custom reminder label"
                value={customLabel}
                onChangeText={setCustomLabel}
                placeholder="e.g. evening routine"
                placeholderTextColor={C.inkFaint}
                onSubmitEditing={addCustom}
                returnKeyType="done"
                className="flex-1 rounded-xl px-3 py-3 text-[11px]"
                style={{
                  color: C.inkSoft,
                  fontFamily: INPUT_FONT,
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.14),
                }}
              />
              <GradientAction
                accessibilityLabel="Add custom reminder"
                onPress={addCustom}
                className="items-center justify-center rounded-xl p-3"
              >
                <Plus size={16} color={C.paper2} />
              </GradientAction>
            </View>
          </View>

          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-8">
            <View className="flex-row items-start gap-3">
              <ShieldCheck size={16} color={C.teal} />
              <View className="flex-1">
                <Eyebrow color={C.teal} className="mb-1.5">
                  PRIVACY
                </Eyebrow>
                <Mono className="text-[10px]">{ADHERENCE_NOTE}</Mono>
              </View>
            </View>
          </Panel>

          <BrandFooter className="mt-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function ReminderCard({
  reminder,
  logged,
  open,
  onToggleOpen,
}: {
  reminder: Reminder;
  logged: string[];
  open: boolean;
  onToggleOpen: () => void;
}) {
  const updateReminder = useCapeStore((s) => s.updateReminder);
  const toggleReminder = useCapeStore((s) => s.toggleReminder);
  const removeReminder = useCapeStore((s) => s.removeReminder);
  const logDose = useCapeStore((s) => s.logDose);

  const tint = reminder.tint;
  const today = logDayKey();
  const doneToday = logged.includes(today);
  const history = recentDayKeys(HISTORY_DAYS);
  const hits = history.filter((day) => logged.includes(day)).length;
  const rate = Math.round((hits / HISTORY_DAYS) * 100);

  const setDay = (index: number) => {
    const days = reminder.days.includes(index)
      ? reminder.days.filter((d) => d !== index)
      : [...reminder.days, index].sort((a, b) => a - b);
    void updateReminder(reminder.id, { days });
  };

  const setTone = (tone: ReminderTone) => void updateReminder(reminder.id, { tone });
  const nudgeTime = (minutes: number) =>
    void updateReminder(reminder.id, { time: shiftTime(reminder.time, minutes) });

  return (
    <View
      className="rounded-2xl p-4"
      style={{
        backgroundColor: alpha(tint, reminder.enabled ? 0.07 : 0.03),
        borderWidth: 1,
        borderColor: alpha(tint, reminder.enabled ? 0.24 : 0.1),
      }}
    >
      <View className="flex-row items-start gap-3">
        <Pressable
          accessibilityRole="switch"
          accessibilityState={{ checked: reminder.enabled }}
          accessibilityLabel={`${reminder.enabled ? 'Disarm' : 'Arm'} ${reminder.label}`}
          onPress={() => void toggleReminder(reminder.id)}
          className="h-9 w-9 items-center justify-center rounded-xl active:opacity-70"
          style={{
            backgroundColor: alpha(reminder.enabled ? tint : C.inkFaint, 0.14),
            borderWidth: 1,
            borderColor: alpha(reminder.enabled ? tint : C.inkFaint, 0.35),
          }}
        >
          {reminder.enabled ? (
            <BellRing size={15} color={tint} />
          ) : (
            <BellOff size={15} color={alpha(C.inkFaint, 0.8)} />
          )}
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={onToggleOpen}
          className="flex-1 active:opacity-70"
        >
          <Mono
            bold
            color={reminder.enabled ? tint : alpha(C.inkFaint, 0.8)}
            className="text-[11px]"
            tracking={1.2}
          >
            {reminder.label}
          </Mono>
          <Mono className="mt-0.5 text-[10px]">
            {formatTime(reminder.time)} · {describeDays(reminder.days)}
          </Mono>
          <Mono className="mt-0.5 text-[9px]" color={alpha(C.inkFaint, 0.6)}>
            {toneInfo(reminder.tone).label} · {reminder.enabled ? 'ARMED' : 'PAUSED'}
          </Mono>
        </Pressable>

        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <ChevronDown size={15} color={alpha(tint, 0.8)} />
        </View>
      </View>

      {/* HISTORY STRIP */}
      <View className="mt-3">
        <View className="flex-row items-center justify-between">
          <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.6)}>
            LAST {HISTORY_DAYS} DAYS
          </Mono>
          <Mono bold className="text-[9px]" color={alpha(tint, 0.85)}>
            {hits}/{HISTORY_DAYS} · {rate}%
          </Mono>
        </View>
        <View className="mt-2 flex-row gap-1">
          {history.map((day) => {
            const hit = logged.includes(day);
            return (
              <View
                key={day}
                className="h-4 flex-1 rounded-sm"
                style={{
                  backgroundColor: hit ? alpha(tint, 0.75) : alpha(C.ink, 0.07),
                  borderWidth: 1,
                  borderColor: hit ? alpha(tint, 0.9) : alpha(C.ink, 0.12),
                }}
              />
            );
          })}
        </View>
        <View className="mt-2">
          <Rail value={rate} color={tint} />
        </View>
      </View>

      <GradientAction
        onPress={() => logDose(reminder.id)}
        className="mt-3 flex-row items-center justify-center gap-2 rounded-xl py-3"
      >
        {doneToday ? <Check size={14} color={C.paper2} /> : null}
        <Mono bold color={C.paper2} className="text-[11px]" tracking={1}>
          {doneToday ? 'LOGGED TODAY · TAP TO UNDO' : 'LOG TODAY'}
        </Mono>
      </GradientAction>

      {open ? (
        <View className="mt-4 gap-4">
          {/* TIME */}
          <View>
            <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.6)}>
              ALERT TIME
            </Mono>
            <View className="mt-2 flex-row items-center gap-2">
              <StepButton
                label="−15 minutes"
                tint={tint}
                onPress={() => nudgeTime(-15)}
                icon={<Minus size={14} color={C.paper2} />}
              />
              <View
                className="flex-1 items-center rounded-xl py-2.5"
                style={{
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.14),
                }}
              >
                <Mono bold color={alpha(C.inkSoft, 0.95)} className="text-[13px]" tracking={1}>
                  {formatTime(reminder.time)}
                </Mono>
              </View>
              <StepButton
                label="+15 minutes"
                tint={tint}
                onPress={() => nudgeTime(15)}
                icon={<Plus size={14} color={C.paper2} />}
              />
            </View>
            <View className="mt-2 flex-row gap-2">
              <StepChip label="−1 HR" tint={tint} onPress={() => nudgeTime(-60)} />
              <StepChip label="−5 MIN" tint={tint} onPress={() => nudgeTime(-5)} />
              <StepChip label="+5 MIN" tint={tint} onPress={() => nudgeTime(5)} />
              <StepChip label="+1 HR" tint={tint} onPress={() => nudgeTime(60)} />
            </View>
          </View>

          {/* DAYS */}
          <View>
            <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.6)}>
              DAYS
            </Mono>
            <View className="mt-2 flex-row gap-1.5">
              {WEEKDAYS.map((day) => {
                const active = reminder.days.includes(day.index);
                return (
                  <Pressable
                    key={day.index}
                    accessibilityRole="button"
                    accessibilityLabel={day.label}
                    accessibilityState={{ selected: active }}
                    onPress={() => setDay(day.index)}
                    className="flex-1 items-center rounded-xl py-2.5 active:opacity-70"
                    style={{
                      backgroundColor: active ? alpha(tint, 0.2) : C.card,
                      borderWidth: 1,
                      borderColor: alpha(active ? tint : C.ink, active ? 0.5 : 0.14),
                    }}
                  >
                    <Mono
                      bold={active}
                      color={active ? tint : alpha(C.inkFaint, 0.7)}
                      className="text-[10px]"
                    >
                      {day.letter}
                    </Mono>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* TONE */}
          <View>
            <Mono className="text-[9px]" color={alpha(C.inkFaint, 0.6)}>
              ALERT TONE
            </Mono>
            <View className="mt-2 gap-2">
              {REMINDER_TONES.map((tone) => {
                const active = reminder.tone === tone.id;
                return (
                  <Pressable
                    key={tone.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    onPress={() => setTone(tone.id)}
                    className="flex-row items-center gap-3 rounded-xl p-3 active:opacity-70"
                    style={{
                      backgroundColor: alpha(tone.tint, active ? 0.16 : 0.04),
                      borderWidth: 1,
                      borderColor: alpha(tone.tint, active ? 0.4 : 0.12),
                    }}
                  >
                    <View
                      className="h-4 w-4 items-center justify-center rounded-full"
                      style={{
                        borderWidth: 1.5,
                        borderColor: alpha(tone.tint, active ? 0.9 : 0.35),
                        backgroundColor: active ? tone.tint : 'transparent',
                      }}
                    />
                    <View className="flex-1">
                      <Mono
                        bold={active}
                        color={active ? tone.tint : alpha(C.inkSoft, 0.8)}
                        className="text-[10px]"
                        tracking={1.2}
                      >
                        {tone.label}
                      </Mono>
                      <Mono className="mt-0.5 text-[9px]">{tone.detail}</Mono>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <GradientAction
            onPress={() => void removeReminder(reminder.id)}
            className="flex-row items-center justify-center gap-2 rounded-xl py-3"
          >
            <Trash2 size={13} color={C.paper2} />
            <Mono bold color={C.paper2} className="text-[11px]" tracking={1}>
              DELETE REMINDER
            </Mono>
          </GradientAction>
        </View>
      ) : null}
    </View>
  );
}

function StepButton({
  label,
  tint,
  onPress,
  icon,
}: {
  label: string;
  tint: string;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <GradientAction
      accessibilityLabel={label}
      onPress={onPress}
      className="items-center justify-center rounded-xl p-3"
      style={{ backgroundColor: tint }}
    >
      {icon}
    </GradientAction>
  );
}

function StepChip({ label, tint, onPress }: { label: string; tint: string; onPress: () => void }) {
  return (
    <GradientAction
      onPress={onPress}
      className="flex-1 items-center justify-center rounded-lg py-2"
      style={{ backgroundColor: tint }}
    >
      <Mono color={C.paper2} className="text-center text-[11px]">
        {label}
      </Mono>
    </GradientAction>
  );
}
