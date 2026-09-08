import { Linking, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import {
  ArrowRight,
  CircleAlert,
  MapPin,
  MessageSquare,
  Phone,
  ShieldAlert,
  Timer,
  Users,
} from 'lucide-react-native';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { TintedRow } from '@/components/cape/Buttons';
import { C, alpha } from '@/lib/colors';
import { CRISIS_LINES, CRISIS_STEPS } from '@/lib/data/crisis';
import { DISCLAIMER, pepUnlocked } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

const open = (url: string) => {
  void Linking.openURL(url);
};

export default function Crisis() {
  const circle = useCapeStore((s) => s.circle);
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const pepAvailable = pepUnlocked(gradeBand);

  return (
    <View className="bg-paper flex-1">
      <SafeAreaView edges={['top']} className="bg-paper" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.flame}>CRISIS PROTOCOL</Eyebrow>
        <Display className="mt-2 text-4xl">For the moments that can&apos;t wait.</Display>
        <Body className="mt-3">
          Direct-dial and text lines, staffed 24/7. If you are in immediate danger, call 911 first.
        </Body>

        <View className="mt-5 gap-3">
          <TintedRow
            tint={C.flame}
            fill={0.14}
            stroke={0.34}
            onPress={() => router.push('/emergency-directory')}
          >
            <View className="flex-row items-center gap-3">
              <ShieldAlert size={20} color={C.flame} />
              <View className="flex-1">
                <Mono bold color={C.flame} className="text-[12px]" tracking={1}>
                  EMERGENCY DIRECTORY
                </Mono>
                <Mono className="mt-1 text-[10px]">
                  3-Second Rule circuit breaker + one-tap lines, grouped by what is happening
                </Mono>
              </View>
              <ArrowRight size={14} color={C.flame} />
            </View>
          </TintedRow>
        </View>

        <View className="mt-6 gap-2.5">
          {CRISIS_LINES.map((line) => (
            <View
              key={line.id}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: alpha(line.tint, 0.1),
                borderWidth: 1,
                borderColor: alpha(line.tint, 0.3),
              }}
            >
              <View className="flex-row items-start gap-3">
                <Mono className="text-lg">{line.emoji}</Mono>
                <View className="flex-1">
                  <Mono bold color={line.tint} className="text-[11px]" tracking={1}>
                    {line.name}
                  </Mono>
                  <Mono className="mt-1 text-[9px]" color={alpha(C.inkSoft, 0.7)}>
                    {line.detail}
                  </Mono>
                </View>
              </View>
              <View className="mt-3 flex-row gap-2">
                {line.dial ? (
                  <ActionPill
                    tint={line.tint}
                    icon={<Phone size={13} color={line.tint} />}
                    label="CALL"
                    onPress={() => open(`tel:${line.dial}`)}
                  />
                ) : null}
                {line.sms ? (
                  <ActionPill
                    tint={line.tint}
                    icon={<MessageSquare size={13} color={line.tint} />}
                    label="TEXT"
                    onPress={() => open(`sms:${line.sms?.number}?body=${line.sms?.body ?? ''}`)}
                  />
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <View className="mt-8">
          <Eyebrow color={C.teal}>IF SOMETHING JUST HAPPENED</Eyebrow>
          <View className="mt-4 gap-2">
            {CRISIS_STEPS.map((step) => (
              <Panel key={step.title} tint={C.teal} fill={0.04} stroke={0.15} className="p-3.5">
                <Mono bold color={C.teal} className="text-[10px]" tracking={1.5}>
                  {step.title}
                </Mono>
                <Mono className="mt-1 text-[10px]">{step.detail}</Mono>
              </Panel>
            ))}
          </View>
        </View>

        <View className="mt-6 gap-3">
          {pepAvailable ? (
            <TintedRow
              tint={C.flame}
              fill={pepStartedAt ? 0.12 : 0.07}
              stroke={0.28}
              onPress={() => router.push('/tools/pep-clock')}
            >
              <View className="flex-row items-center gap-3">
                <Timer size={18} color={C.flame} />
                <View className="flex-1">
                  <Mono bold color={C.flame} className="text-[11px]" tracking={1}>
                    {pepStartedAt ? 'PEP CLOCK IS RUNNING' : 'START THE PEP CLOCK'}
                  </Mono>
                  <Mono className="mt-0.5 text-[9px]">
                    PEP must begin within 72 hours of a possible exposure
                  </Mono>
                </View>
              </View>
            </TintedRow>
          ) : null}

          <TintedRow
            tint={C.azure}
            fill={0.07}
            stroke={0.22}
            onPress={() => router.push('/tools/safety-circle')}
          >
            <View className="flex-row items-center gap-3">
              <Users size={18} color={C.azure} />
              <View className="flex-1">
                <Mono bold color={C.azure} className="text-[11px]" tracking={1}>
                  CALL YOUR SAFETY CIRCLE
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
                  {circle.length === 0
                    ? 'No contacts yet — add them before you need them'
                    : `${circle.length} people saved on this device`}
                </Mono>
              </View>
            </View>
          </TintedRow>

          <TintedRow
            tint={C.modM}
            fill={0.07}
            stroke={0.22}
            onPress={() => router.push('/clinic-finder')}
          >
            <View className="flex-row items-center gap-3">
              <MapPin size={18} color={C.modM} />
              <View className="flex-1">
                <Mono bold color={C.modM} className="text-[11px]" tracking={1}>
                  FIND CARE NEAR YOU
                </Mono>
                <Mono className="mt-0.5 text-[9px]">
                  Free and confidential locators, plus what to say at the front desk
                </Mono>
              </View>
            </View>
          </TintedRow>
        </View>

        <Panel tint={C.lemon} fill={0.05} stroke={0.2} className="mt-8">
          <View className="flex-row items-start gap-3">
            <CircleAlert size={18} color={C.lemon} />
            <View className="flex-1">
              <Eyebrow color={C.lemon} className="mb-2">
                IMPORTANT DISCLAIMER
              </Eyebrow>
              <Mono className="text-[10px]">{DISCLAIMER}</Mono>
            </View>
          </View>
        </Panel>
      </ScrollView>
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
