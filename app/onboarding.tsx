import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { CanonGate } from '@/components/cape/CanonGate';
import { BLUE_GATE_COPY } from '@/lib/data/canon';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { Check, Lock } from '@/lib/icons';
import { Input } from 'heroui-native/input';
import { TextField } from 'heroui-native/text-field';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { MetallicButton } from '@/components/cape/Buttons';
import { StackHeader } from '@/components/cape/Screen';
import { Wordmark } from '@/components/cape/Wordmark';
import { C, alpha } from '@/lib/colors';
import { SAFETY_EXCEPTION } from '@/lib/data/ghosts';
import { GRADE_BANDS, PRIVACY_NOTE, type GradeBand } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function Onboarding() {
  const startJourney = useCapeStore((s) => s.startJourney);
  const [band, setBand] = useState<GradeBand | null>(null);
  const [codename, setCodename] = useState('');
  const [showBlueGate, setShowBlueGate] = useState(false);

  const enter = () => {
    if (!band) return;
    startJourney(band, codename.length > 0 ? codename : 'Anonymous');
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace('/(tabs)');
  };
  const begin = () => {
    if (band === '9-12') setShowBlueGate(true);
    else enter();
  };

  if (showBlueGate) {
    return (
      <CanonGate
        title="Blue Track · Grades 9–12"
        copy={BLUE_GATE_COPY}
        actionLabel="Enter Blue Track"
        onContinue={enter}
        onReturn={() => setShowBlueGate(false)}
      />
    );
  }

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="Get Started" fallback="/" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-8 pb-16"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center">
            <Wordmark compact />
          </View>

          <Display className="mt-8 text-3xl">Pick your track.</Display>
          <Body className="mt-2">
            Green Track is grades 6–8. Blue Track is grades 9–12. Pick the one for your grade.
          </Body>

          <View className="mt-6 gap-3">
            {GRADE_BANDS.map((option) => {
              const selected = band === option.id;
              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    if (band !== option.id) void Haptics.selectionAsync();
                    setBand(option.id);
                  }}
                  className="rounded-2xl p-4 active:opacity-70"
                  style={{
                    backgroundColor: alpha(option.tint, selected ? 0.12 : 0.04),
                    borderWidth: selected ? 1.5 : 1,
                    borderColor: alpha(option.tint, selected ? 0.55 : 0.15),
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <Eyebrow color={option.tint}>{option.label}</Eyebrow>
                    {selected ? <Check size={16} color={option.tint} /> : null}
                  </View>
                  <Mono bold className="mt-2 text-[14px]" color={C.ink}>
                    {option.tier}
                  </Mono>
                  <Mono className="mt-1 text-[13px]">{option.detail}</Mono>
                </Pressable>
              );
            })}
          </View>

          <Display className="mt-10 text-3xl">Pick a codename.</Display>
          <Body className="mt-2">
            Optional, and it never leaves this device. Use a nickname — not your legal name.
          </Body>

          <View className="mt-4">
            <TextField>
              <Input
                accessibilityLabel="Codename (optional)"
                placeholder="e.g. Nightwatch"
                value={codename}
                onChangeText={setCodename}
                autoCapitalize="words"
                maxLength={20}
                placeholderColorClassName="accent-slate-faint"
                className="text-foreground font-mono"
              />
            </TextField>
          </View>

          <Panel tint={C.teal} fill={0.05} stroke={0.2} className="mt-8">
            <View className="flex-row items-start gap-3">
              <Lock size={16} color={C.teal} />
              <View className="flex-1">
                <Eyebrow color={C.teal} className="mb-1.5">
                  ZERO STIGMA TAX — NO TRACKING
                </Eyebrow>
                <Mono className="text-[13px]">{PRIVACY_NOTE}</Mono>
                <Mono className="mt-2 text-[12px]" color={C.inkFaint}>
                  {SAFETY_EXCEPTION}
                </Mono>
              </View>
            </View>
          </Panel>

          <View className="mt-8">
            {band ? (
              <MetallicButton label="ENTER THE COMPASS" onPress={begin} />
            ) : (
              <View
                className="items-center rounded-full px-6 py-3.5"
                style={{
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.14),
                }}
              >
                <Mono bold color={alpha(C.inkFaint, 0.6)} tracking={2} className="text-[14px]">
                  SELECT A TRACK TO CONTINUE
                </Mono>
              </View>
            )}
          </View>

          <BrandFooter className="mt-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
