import { useEffect, useRef, useState } from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import {
  CircleAlert,
  ExternalLink,
  Lock,
  MessageSquare,
  Phone,
  ShieldAlert,
  Users,
} from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { Chip, TintedRow } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Telemetry } from '@/components/cape/Telemetry';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  EMERGENCY_FIRST_MOVES,
  EMERGENCY_LOCK_NOTE,
  EMERGENCY_NOTE,
  type EmergencyContact,
  THREE_SECOND_RULE,
  groupsForTrack,
  lockedGroupCount,
} from '@/lib/data/emergency';
import { SAFETY_EXCEPTION } from '@/lib/data/ghosts';
import { useCapeStore } from '@/lib/store/useCapeStore';

const open = (url: string) => {
  void Linking.openURL(url);
};

export default function EmergencyDirectory() {
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const circle = useCapeStore((s) => s.circle);
  const track = trackFor(gradeBand);
  const groups = groupsForTrack(track);
  const lockedCount = lockedGroupCount(track);

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.flame} />
      <StackHeader title="Emergency Directory" tint={C.flame} fallback="/(tabs)/crisis" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.flame}>ONE-TAP HELP</Eyebrow>
        <Display className="mt-2 text-4xl">Every line, one screen.</Display>
        <Body className="mt-3">
          Nothing here needs a login, an explanation, or a reason good enough. If someone is in
          danger right now, call 911 first and read the rest later.
        </Body>

        <View className="mt-4 flex-row flex-wrap gap-2">
          <Chip label="24/7 LINES" tint={C.flame} />
          <Chip label="FREE & CONFIDENTIAL" tint={C.teal} />
          <Chip label="NO CALL LOG KEPT HERE" tint={C.gold} />
        </View>

        <View className="mt-8 gap-2.5">
          <TintedRow
            tint={C.no}
            fill={0.14}
            stroke={0.36}
            onPress={() => open('tel:911')}
            className="p-5"
          >
            <View className="flex-row items-center gap-3">
              <Phone size={22} color={C.no} />
              <View className="flex-1">
                <Mono bold color={C.no} className="text-[14px]" tracking={2}>
                  CALL 911
                </Mono>
                <Mono className="mt-1 text-[10px]">
                  Immediate danger, serious injury, overdose, assault in progress
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow
            tint={C.azure}
            fill={0.08}
            stroke={0.24}
            onPress={() => router.push('/tools/safety-circle')}
          >
            <View className="flex-row items-center gap-3">
              <Users size={18} color={C.azure} />
              <View className="flex-1">
                <Mono bold color={C.azure} className="text-[11px]" tracking={1}>
                  YOUR SAFETY CIRCLE
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
                  {circle.length === 0
                    ? 'No one saved yet — add them before you need them'
                    : `${circle.length} ${circle.length === 1 ? 'person' : 'people'} on this device`}
                </Mono>
              </View>
            </View>
          </TintedRow>
        </View>

        <CircuitBreaker />

        {groups.map((group) => (
          <View key={group.id} className="mt-8">
            <View className="flex-row items-center gap-2">
              <Mono className="text-base">{group.emoji}</Mono>
              <Eyebrow color={group.tint}>{group.label}</Eyebrow>
            </View>
            <Mono className="mt-2 text-[10px]" color={alpha(C.inkFaint, 0.75)}>
              {group.blurb}
            </Mono>
            <View className="mt-3 gap-2.5">
              {group.contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} tint={group.tint} />
              ))}
            </View>
          </View>
        ))}

        {lockedCount > 0 ? (
          <View
            className="mt-6 rounded-2xl p-4"
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
                  {lockedCount} {lockedCount === 1 ? 'GROUP' : 'GROUPS'} ON THE 9–12 TRACK
                </Mono>
                <Mono className="mt-1 text-[10px]">{EMERGENCY_LOCK_NOTE}</Mono>
              </View>
            </View>
          </View>
        ) : null}

        <View className="mt-8">
          <Eyebrow color={C.teal}>FIRST FOUR MOVES</Eyebrow>
          <View className="mt-3 gap-2">
            {EMERGENCY_FIRST_MOVES.map((move, index) => (
              <Panel key={move.title} tint={C.teal} fill={0.04} stroke={0.15} className="p-3.5">
                <View className="flex-row items-start gap-3">
                  <Mono bold color={alpha(C.teal, 0.7)} className="text-[10px]">
                    {`0${index + 1}`}
                  </Mono>
                  <View className="flex-1">
                    <Mono bold color={C.teal} className="text-[10px]" tracking={1.5}>
                      {move.title}
                    </Mono>
                    <Mono className="mt-1 text-[10px]">{move.detail}</Mono>
                  </View>
                </View>
              </Panel>
            ))}
          </View>
        </View>

        <Panel tint={C.gold} fill={0.05} stroke={0.18} className="mt-6">
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

        <Panel tint={C.lemon} fill={0.04} stroke={0.16} className="mt-3">
          <View className="flex-row items-start gap-3">
            <CircleAlert size={16} color={C.lemon} />
            <View className="flex-1">
              <Eyebrow color={C.lemon} className="mb-1.5">
                WHAT LEAVES THIS APP
              </Eyebrow>
              <Mono className="text-[10px]">{EMERGENCY_NOTE}</Mono>
            </View>
          </View>
        </Panel>

        <BrandFooter className="mt-8" />
      </ScrollView>
    </View>
  );
}

/** The 3-Second Rule: a counted pause before choosing a next step. */
function CircuitBreaker() {
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const run = () => {
    if (timer.current) return;
    const startedAt = Date.now();
    setCount(1);
    timer.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (elapsed >= 3000) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setCount(4);
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => undefined,
        );
        return;
      }
      setCount(Math.min(3, Math.floor(elapsed / 1000) + 1));
    }, 100);
  };

  const running = count > 0 && count < 4;
  const done = count === 4;

  return (
    <Panel tint={C.flame} fill={running ? 0.1 : 0.05} stroke={0.24} className="mt-6">
      <View className="flex-row flex-wrap items-center justify-between gap-2">
        <Eyebrow color={C.flame}>{THREE_SECOND_RULE.title}</Eyebrow>
        {done ? <Chip label="PAUSE COMPLETE" tint={C.teal} /> : null}
      </View>
      <Mono className="mt-2 text-[10px]">{THREE_SECOND_RULE.lead}</Mono>

      <View className="mt-4">
        <Telemetry tint={running ? C.flame : C.teal} active={running} height={34} />
      </View>

      <View className="mt-4 gap-2">
        {THREE_SECOND_RULE.steps.map((step, index) => {
          const reached = count > index;
          return (
            <View
              key={step}
              className="rounded-xl px-3 py-2.5"
              style={{
                backgroundColor: reached ? alpha(C.flame, 0.14) : C.card,
                borderWidth: 1,
                borderColor: alpha(reached ? C.flame : C.ink, reached ? 0.45 : 0.12),
              }}
            >
              <Mono bold={reached} className="text-[10px]" color={reached ? C.flame : C.inkSoft}>
                {step}
              </Mono>
            </View>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          running ? `Pause in progress, step ${count} of 3` : 'Take a three-second pause'
        }
        accessibilityState={{ disabled: running, busy: running }}
        disabled={running}
        onPress={run}
        className="mt-4 min-h-11 items-center justify-center rounded-full px-4 py-3.5 active:opacity-70"
        style={{ backgroundColor: C.flame }}
      >
        <Mono accessibilityLiveRegion="polite" bold color={C.paper2} className="text-[12px]">
          {running ? `Hold — ${count}` : done ? 'Pause again' : 'Pause for 3 seconds'}
        </Mono>
      </Pressable>

      <Mono className="mt-3 text-[10px]" color={C.inkSoft}>
        {THREE_SECOND_RULE.close}
      </Mono>
    </Panel>
  );
}

function ContactCard({ contact, tint }: { contact: EmergencyContact; tint: string }) {
  return (
    <View
      className="rounded-2xl p-4"
      style={{
        backgroundColor: alpha(tint, 0.08),
        borderWidth: 1,
        borderColor: alpha(tint, 0.26),
      }}
    >
      <Mono bold color={tint} className="text-[11px]" tracking={1}>
        {contact.name}
      </Mono>
      <Mono className="mt-1 text-[10px]">{contact.detail}</Mono>
      <Mono className="mt-1.5 text-[9px]" color={alpha(C.inkFaint, 0.65)}>
        {contact.hours}
      </Mono>
      <View className="mt-3 flex-row gap-2">
        {contact.dial ? (
          <ActionPill
            tint={tint}
            icon={<Phone size={13} color={tint} />}
            label="CALL"
            onPress={() => open(`tel:${contact.dial}`)}
          />
        ) : null}
        {contact.sms ? (
          <ActionPill
            tint={tint}
            icon={<MessageSquare size={13} color={tint} />}
            label="TEXT"
            onPress={() => open(`sms:${contact.sms?.number}?body=${contact.sms?.body ?? ''}`)}
          />
        ) : null}
        {contact.url ? (
          <ActionPill
            tint={tint}
            icon={<ExternalLink size={13} color={tint} />}
            label="SITE"
            onPress={() => open(contact.url ?? '')}
          />
        ) : null}
      </View>
    </View>
  );
}

function ActionPill({
  tint,
  icon,
  label,
  onPress,
}: {
  tint: string;
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5 active:opacity-70"
      style={{
        backgroundColor: alpha(tint, 0.14),
        borderWidth: 1,
        borderColor: alpha(tint, 0.35),
      }}
    >
      {icon}
      <Mono bold color={tint} className="text-[10px]" tracking={1.5}>
        {label}
      </Mono>
    </Pressable>
  );
}
