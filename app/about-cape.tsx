import { ScrollView, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { Ban, Compass, HeartPulse, Lock, ShieldAlert, Sparkles, Trash2 } from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { Chip, MetallicButton } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { TacticalBackdrop } from '@/components/cape/TacticalBackdrop';
import { Telemetry } from '@/components/cape/Telemetry';
import { Wordmark } from '@/components/cape/Wordmark';
import { C, alpha } from '@/lib/colors';
import { DISCLAIMER, PRIVACY_NOTE, SOURCES, TRACKS, trackFor } from '@/lib/data/content';
import { SAFETY_EXCEPTION } from '@/lib/data/ghosts';
import { useCapeStore } from '@/lib/store/useCapeStore';

const MISSION = [
  {
    title: 'ANXIETY TO AGENCY',
    detail:
      'Fear is a biological alarm, not a character flaw. Every tool here exists to turn a shapeless worry into a named task with a plan attached.',
  },
  {
    title: 'THE 1 A.M. REALITY',
    detail:
      'Advice that only works in a classroom is not protection. Features are built for the moment biology overrides logic and the plan has to survive real friction.',
  },
  {
    title: 'LEADERSHIP, NOT RULES',
    detail:
      'Health is treated as a leadership identity — the person who thinks two moves ahead and looks after the people around them.',
  },
];

const PRIVACY_POINTS = [
  {
    icon: Ban,
    title: 'NO ACCOUNTS, NO SIGNUP',
    detail:
      'There is no login screen because there is nothing to log in to. No email, no password.',
  },
  {
    icon: Lock,
    title: 'LOCAL STORAGE ONLY',
    detail:
      'Your Ghost Vault, boundary menu, Safety Circle, reminders, and progress live in this app on this device.',
  },
  {
    icon: Trash2,
    title: 'ABSOLUTE ERASURE',
    detail:
      'Delete all data in the Me tab, or delete the app, and it is gone permanently. There is no backup copy anywhere.',
  },
];

export default function AboutCape() {
  const { width, height } = useWindowDimensions();
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const track = trackFor(gradeBand);

  return (
    <View className="bg-ink flex-1">
      <TacticalBackdrop width={width} height={height} tint={C.teal} />
      <StackHeader title="About CAPE Flow" tint={C.teal} fallback="/(tabs)/me" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center pt-2">
          <Wordmark />
        </View>

        <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-8">
          <Eyebrow color={C.teal}>THE MISSION</Eyebrow>
          <Display className="mt-2 text-3xl">A Decision GPS, not a lecture.</Display>
          <Body className="mt-3">
            CAPE Flow is the interactive half of the CAPE curriculum by The Harness Project. It
            turns classroom theory into muscle memory: short modules, real scripts, and drills you
            can run before the night that needs them.
          </Body>
          <View className="mt-4">
            <Telemetry tint={C.teal} height={30} />
          </View>
          <Mono bold className="mt-4 text-center text-[11px]" color={alpha(C.gold, 0.9)}>
            &quot;Your CAPE is yours to wear — every single day.&quot;
          </Mono>
        </Panel>

        <View className="mt-8 gap-2.5">
          {MISSION.map((item) => (
            <Panel key={item.title} tint={C.violet} fill={0.05} stroke={0.16} className="p-3.5">
              <Mono bold color={C.violet} className="text-[10px]" tracking={1.5}>
                {item.title}
              </Mono>
              <Mono className="mt-1.5 text-[10px]">{item.detail}</Mono>
            </Panel>
          ))}
        </View>

        {/* WHAT M.A.T.C.H. IS */}
        <View className="mt-10">
          <Eyebrow color={C.gold}>THE FRAMEWORK</Eyebrow>
          <Display className="mt-2 text-3xl">Five nodes. One compass.</Display>
          <Body className="mt-2">
            Every lesson, tool, and shield in the app hangs off one of the five M.A.T.C.H. nodes, so
            a fear always has an address to be sent to.
          </Body>
          <View className="mt-4 gap-2">
            {[
              {
                letter: 'M',
                name: 'HEALTH ARMOR',
                detail: 'Self-worth, check-ups, vaccines, medical choices.',
                color: C.modM,
              },
              {
                letter: 'A',
                name: 'BUILT-IN RADAR',
                detail: 'Reading the room and trusting your gut early.',
                color: C.modA,
              },
              {
                letter: 'T',
                name: 'SAFETY KIT',
                detail: 'Practical tools, access, and trusted support.',
                color: C.modT,
              },
              {
                letter: 'C',
                name: 'STRONGEST VOICE',
                detail: 'F.R.I.E.S. consent and the words that hold a line.',
                color: C.modC,
              },
              {
                letter: 'H',
                name: 'DAILY SUPERPOWER',
                detail: 'Sleep, movement, habits, digital legacy.',
                color: C.modH,
              },
            ].map((node) => (
              <View
                key={node.letter}
                className="flex-row items-center gap-3 rounded-2xl p-3.5"
                style={{
                  backgroundColor: alpha(node.color, 0.06),
                  borderWidth: 1,
                  borderColor: alpha(node.color, 0.2),
                }}
              >
                <View
                  className="h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: alpha(node.color, 0.16),
                    borderWidth: 1,
                    borderColor: alpha(node.color, 0.4),
                  }}
                >
                  <Mono bold color={node.color} className="text-[13px]">
                    {node.letter}
                  </Mono>
                </View>
                <View className="flex-1">
                  <Mono bold color={node.color} className="text-[10px]" tracking={1.5}>
                    {node.name}
                  </Mono>
                  <Mono className="mt-0.5 text-[10px]">{node.detail}</Mono>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* TRACKS */}
        <View className="mt-10">
          <Eyebrow color={C.azure}>TIERED TRACKS</Eyebrow>
          <Display className="mt-2 text-3xl">Age-appropriate by architecture.</Display>
          <Body className="mt-2">
            Content is gated, not softened. Nothing from the older track can appear on the younger
            one — the app filters lessons, tools, finders, and library entries by track before they
            ever render.
          </Body>
          <View className="mt-4 gap-2.5">
            {(['green', 'blue'] as const).map((id) => {
              const info = TRACKS[id];
              const active = track === id;
              return (
                <View
                  key={id}
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: alpha(info.tint, active ? 0.12 : 0.05),
                    borderWidth: 1,
                    borderColor: alpha(info.tint, active ? 0.4 : 0.16),
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <Mono bold color={info.tint} className="text-[11px]" tracking={1.5}>
                      {info.label}
                    </Mono>
                    {active ? <Chip label="YOUR TRACK" tint={info.tint} /> : null}
                  </View>
                  <Mono bold className="mt-1.5 text-[10px]" color={alpha(C.slateSoft, 0.9)}>
                    {info.name} · {id === 'green' ? 'Grades 4–8' : 'Grades 9–12'}
                  </Mono>
                  <Mono className="mt-1 text-[10px]">{info.scope}</Mono>
                </View>
              );
            })}
          </View>
        </View>

        {/* PRIVACY */}
        <View className="mt-10">
          <Eyebrow color={C.teal}>ZERO STIGMA TAX</Eyebrow>
          <Display className="mt-2 text-3xl">Privacy is clinical necessity.</Display>
          <Body className="mt-2">
            Youth avoid care when they think it will be seen. So CAPE Flow was built with nowhere
            for your data to go.
          </Body>
          <View className="mt-4 gap-2.5">
            {PRIVACY_POINTS.map((point) => (
              <Panel key={point.title} tint={C.teal} fill={0.05} stroke={0.16} className="p-3.5">
                <View className="flex-row items-start gap-3">
                  <point.icon size={16} color={C.teal} />
                  <View className="flex-1">
                    <Mono bold color={C.teal} className="text-[10px]" tracking={1.5}>
                      {point.title}
                    </Mono>
                    <Mono className="mt-1 text-[10px]">{point.detail}</Mono>
                  </View>
                </View>
              </Panel>
            ))}
          </View>
          <Panel tint={C.teal} fill={0.04} stroke={0.14} className="mt-3">
            <Mono className="text-[10px]">{PRIVACY_NOTE}</Mono>
          </Panel>
        </View>

        {/* SAFETY EXCEPTION */}
        <Panel tint={C.gold} fill={0.05} stroke={0.2} className="mt-8">
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

        {/* DISCLAIMER */}
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

        {/* SOURCES */}
        <View className="mt-8">
          <View className="flex-row items-center gap-2">
            <Sparkles size={15} color={alpha(C.slateFaint, 0.7)} />
            <Eyebrow color={alpha(C.slateFaint, 0.7)}>WHERE THE FACTS COME FROM</Eyebrow>
          </View>
          <View className="mt-3 gap-2">
            {SOURCES.map((src) => (
              <View
                key={src.name}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: alpha('#ffffff', 0.02),
                  borderWidth: 1,
                  borderColor: alpha('#ffffff', 0.06),
                }}
              >
                <Mono bold className="text-[10px]" color={alpha(C.slateSoft, 0.85)}>
                  {src.name}
                </Mono>
                <Mono className="mt-0.5 text-[9px]" color={alpha(C.slateFaint, 0.6)}>
                  {src.detail}
                </Mono>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-8 items-center">
          <MetallicButton
            label="OPEN MY COMPASS"
            onPress={() => router.push('/(tabs)')}
            className="w-full"
          />
          <View className="mt-4 flex-row items-center gap-2">
            <Compass size={13} color={alpha(C.slateFaint, 0.7)} />
            <Mono className="text-[9px]" color={alpha(C.slateFaint, 0.7)}>
              Built by The Harness Project · CAPE Youth Edition
            </Mono>
          </View>
        </View>

        <BrandFooter className="mt-8" />
      </ScrollView>
    </View>
  );
}
