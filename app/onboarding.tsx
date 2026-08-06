import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { Check, Lock } from 'lucide-react-native';
import { Input, TextField } from 'heroui-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { MetallicButton } from '@/components/cape/Buttons';
import { StackHeader } from '@/components/cape/Screen';
import { Wordmark } from '@/components/cape/Wordmark';
import { C, alpha } from '@/lib/colors';
import { GRADE_BANDS, PRIVACY_NOTE, type GradeBand } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function Onboarding() {
  const startJourney = useCapeStore((s) => s.startJourney);
  const [band, setBand] = useState<GradeBand | null>(null);
  const [codename, setCodename] = useState('');

  const begin = () => {
    if (!band) return;
    startJourney(band, codename.length > 0 ? codename : 'Anonymous');
    router.replace('/(tabs)');
  };

  return (
    <View className="bg-ink flex-1">
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
            Content is tiered by grade band. Nothing from a higher track ever shows up in a lower
            one.
          </Body>

          <View className="mt-6 gap-3">
            {GRADE_BANDS.map((option) => {
              const selected = band === option.id;
              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => setBand(option.id)}
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
                  <Mono bold className="mt-2 text-[12px]" color={C.white}>
                    {option.tier}
                  </Mono>
                  <Mono className="mt-1 text-[10px]">{option.detail}</Mono>
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
                <Mono className="text-[10px]">{PRIVACY_NOTE}</Mono>
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
                  backgroundColor: alpha('#ffffff', 0.04),
                  borderWidth: 1,
                  borderColor: alpha('#ffffff', 0.1),
                }}
              >
                <Mono bold color={alpha(C.slateFaint, 0.6)} tracking={2} className="text-[12px]">
                  SELECT A TRACK TO CONTINUE
                </Mono>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
