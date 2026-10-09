import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { CircleAlert, Lock, MapPin, Phone, Play, Square } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { C, alpha } from '@/lib/colors';
import { PEP_WINDOW_MS } from '@/lib/data/crisis';
import { PEP_LOCK_NOTE, pepUnlocked } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

const pad = (n: number) => n.toString().padStart(2, '0');

function format(msLeft: number): string {
  const clamped = Math.max(0, msLeft);
  const hours = Math.floor(clamped / 3_600_000);
  const minutes = Math.floor((clamped % 3_600_000) / 60_000);
  const seconds = Math.floor((clamped % 60_000) / 1000);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export default function PepClock() {
  const pepStartedAt = useCapeStore((s) => s.pepStartedAt);
  const startPep = useCapeStore((s) => s.startPep);
  const clearPep = useCapeStore((s) => s.clearPep);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!pepStartedAt) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [pepStartedAt]);

  const elapsed = pepStartedAt ? now - pepStartedAt : 0;
  const left = PEP_WINDOW_MS - elapsed;
  const pct = pepStartedAt ? Math.max(0, (left / PEP_WINDOW_MS) * 100) : 100;
  const expired = pepStartedAt !== null && left <= 0;

  if (!pepUnlocked(gradeBand)) {
    return (
      <View className="bg-paper flex-1">
        <StackHeader title="PEP Clock" tint={C.lemon} fallback="/(tabs)/tools" />
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          showsVerticalScrollIndicator={false}
        >
          <Eyebrow color={C.lemon}>LOCKED ON THIS TRACK</Eyebrow>
          <Display className="mt-2 text-4xl">This shield opens in grades 9–12.</Display>
          <Body className="mt-3">{PEP_LOCK_NOTE}</Body>

          <Panel tint={C.lemon} fill={0.05} stroke={0.2} className="mt-6">
            <View className="flex-row items-start gap-2.5">
              <Lock size={15} color={C.lemon} />
              <Mono className="flex-1 text-[10px]">
                If something just happened right now, that is still an emergency and you deserve
                help. Open the Crisis Protocol, call 911, or tell a trusted adult immediately.
              </Mono>
            </View>
          </Panel>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(tabs)/crisis')}
            className="mt-5 flex-row items-center justify-center gap-2 rounded-full py-3.5 active:opacity-70"
            style={{
              backgroundColor: alpha(C.teal, 0.1),
              borderWidth: 1,
              borderColor: alpha(C.teal, 0.3),
            }}
          >
            <Phone size={14} color={C.teal} />
            <Mono bold color={C.teal} tracking={2} className="text-[11px]">
              OPEN CRISIS PROTOCOL
            </Mono>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="PEP Clock" tint={C.flame} fallback="/(tabs)/crisis" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.flame}>THE 72-HOUR WINDOW</Eyebrow>
        <Display className="mt-2 text-4xl">PEP is time-limited.</Display>
        <Body className="mt-3">
          Post-exposure prophylaxis has to be started as soon as possible and within 72 hours of a
          possible exposure. This clock exists so you never have to guess.
        </Body>

        <Panel
          tint={expired ? C.no : C.flame}
          fill={0.1}
          stroke={0.3}
          className="mt-6 items-center py-8"
        >
          <Eyebrow color={expired ? C.no : C.flame}>
            {pepStartedAt ? (expired ? 'WINDOW CLOSED' : 'TIME REMAINING') : 'CLOCK NOT STARTED'}
          </Eyebrow>
          <Display color={expired ? C.no : C.flame} className="mt-3 text-6xl">
            {pepStartedAt ? format(left) : '72:00:00'}
          </Display>
          <Mono className="mt-2 text-[9px]" color={alpha(C.inkFaint, 0.8)} tracking={2}>
            HOURS : MINUTES : SECONDS
          </Mono>
          <View className="mt-5 w-full">
            <Rail value={pct} color={expired ? C.no : C.flame} height={6} />
          </View>
        </Panel>

        <View className="mt-5 gap-3">
          {pepStartedAt ? (
            <Pressable
              accessibilityRole="button"
              onPress={clearPep}
              className="flex-row items-center justify-center gap-2 rounded-full py-3.5 active:opacity-70"
              style={{
                backgroundColor: C.card,
                borderWidth: 1,
                borderColor: alpha(C.ink, 0.16),
              }}
            >
              <Square size={14} color={alpha(C.inkFaint, 0.8)} />
              <Mono bold color={alpha(C.inkFaint, 0.85)} tracking={2} className="text-[11px]">
                RESET CLOCK
              </Mono>
            </Pressable>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={startPep}
              className="flex-row items-center justify-center gap-2 rounded-full py-3.5 active:opacity-70"
              style={{
                backgroundColor: alpha(C.flame, 0.18),
                borderWidth: 1,
                borderColor: alpha(C.flame, 0.5),
              }}
            >
              <Play size={14} color={C.flame} />
              <Mono bold color={C.flame} tracking={2} className="text-[11px]">
                START THE CLOCK NOW
              </Mono>
            </Pressable>
          )}

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/(tabs)/crisis')}
            className="flex-row items-center justify-center gap-2 rounded-full py-3.5 active:opacity-70"
            style={{
              backgroundColor: alpha(C.teal, 0.1),
              borderWidth: 1,
              borderColor: alpha(C.teal, 0.3),
            }}
          >
            <Phone size={14} color={C.teal} />
            <Mono bold color={C.teal} tracking={2} className="text-[11px]">
              OPEN CRISIS PROTOCOL
            </Mono>
          </Pressable>
        </View>

        <View className="mt-8 gap-2.5">
          <Panel tint={C.flame} fill={0.05} stroke={0.16}>
            <View className="flex-row items-start gap-2.5">
              <MapPin size={15} color={C.flame} />
              <View className="flex-1">
                <Mono bold color={C.flame} className="text-[10px]" tracking={1.5}>
                  WHERE TO GO
                </Mono>
                <Mono className="mt-1 text-[10px]">
                  Inside 72 hours, go to an emergency department with a trusted adult and ask to be
                  evaluated for PEP. This app does not provide medication.
                </Mono>
              </View>
            </View>
          </Panel>

          <Panel tint={C.teal} fill={0.05} stroke={0.16}>
            <Mono bold color={C.teal} className="text-[10px]" tracking={1.5}>
              WHAT TO SAY
            </Mono>
            <Mono className="mt-1 text-[10px]">
              &quot;I think I had a possible exposure within the last 72 hours and I want to ask
              about PEP.&quot; That one sentence is enough to start the conversation.
            </Mono>
          </Panel>

          <Panel tint={C.lemon} fill={0.05} stroke={0.2}>
            <View className="flex-row items-start gap-2.5">
              <CircleAlert size={15} color={C.lemon} />
              <Mono className="flex-1 text-[10px]">
                This clock is a reminder, not medical advice or a prescription. Only a clinician can
                decide whether PEP is right for your situation. In an emergency, call 911.
              </Mono>
            </View>
          </Panel>
        </View>
      </ScrollView>
    </View>
  );
}
