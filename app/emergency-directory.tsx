import { ScrollView, View } from 'react-native';
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
import { Chip, GradientAction, TintedRow } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { PauseButton } from '@/components/cape/PauseButton';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  EMERGENCY_FIRST_MOVES,
  EMERGENCY_LOCK_NOTE,
  EMERGENCY_NOTE,
  type EmergencyContact,
  groupsForTrack,
  lockedGroupCount,
} from '@/lib/data/emergency';
import { SAFETY_EXCEPTION } from '@/lib/data/ghosts';
import { useCapeStore } from '@/lib/store/useCapeStore';

import { openUrgentLink as open, smsURL } from '@/lib/urgentLinks';

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
          <GradientAction
            tint={C.no}
            accessibilityLabel="Call 911, emergency services in the United States"
            accessibilityHint="Opens your phone dialer. No pause is required."
            onPress={() => open('tel:911')}
            className="rounded-2xl p-5"
          >
            <View className="flex-row items-center gap-3">
              <Phone size={22} color={C.paper2} />
              <View className="flex-1">
                <Mono bold color={C.paper2} className="text-[14px]" tracking={2}>
                  CALL 911
                </Mono>
                <Mono color={C.paper2} className="mt-1 text-[11px]">
                  Immediate danger, serious injury, overdose, assault in progress
                </Mono>
              </View>
            </View>
          </GradientAction>

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

        <PauseButton className="mt-6" />

        {groups.map((group) => (
          <View key={group.id} className="mt-8">
            <View className="flex-row items-center gap-2">
              <Mono className="text-base">{group.emoji}</Mono>
              <Eyebrow accessibilityRole="header" color={group.tint}>
                {group.label}
              </Eyebrow>
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
            icon={<Phone size={13} color={C.paper2} />}
            accessibilityLabel={`Call ${contact.name}, ${contact.dial}`}
            label="CALL"
            onPress={() => open(`tel:${contact.dial}`)}
          />
        ) : null}
        {contact.sms ? (
          <ActionPill
            tint={tint}
            icon={<MessageSquare size={13} color={C.paper2} />}
            accessibilityLabel={`Text ${contact.name}, ${contact.sms.number}, message ${contact.sms.body}`}
            label="TEXT"
            onPress={() => open(smsURL(contact.sms!.number, contact.sms!.body))}
          />
        ) : null}
        {contact.url ? (
          <ActionPill
            tint={tint}
            icon={<ExternalLink size={13} color={C.paper2} />}
            accessibilityLabel={`Open ${contact.name} website`}
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
  accessibilityLabel,
  onPress,
}: {
  tint: string;
  icon: React.ReactNode;
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
}) {
  return (
    <GradientAction
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5"
      style={{ minHeight: 48, backgroundColor: tint }}
    >
      {icon}
      <Mono bold color={C.paper2} className="text-[11px]" tracking={1.5}>
        {label}
      </Mono>
    </GradientAction>
  );
}
