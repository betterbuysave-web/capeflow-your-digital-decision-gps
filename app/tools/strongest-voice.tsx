import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Input, Label, TextField } from 'heroui-native';
import { Check, MessageSquareText, Trash2 } from 'lucide-react-native';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { GradientAction, MetallicButton } from '@/components/cape/Buttons';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

const STARTERS = [
  'No. Asking again does not change my answer.',
  'I need a pause. I will answer when I feel ready.',
  'That does not work for me. I am leaving now.',
  'I need help. Can you stay with me while I make the next call?',
] as const;

const BLUE_STARTERS = [
  'I want to talk through protection before we decide anything.',
  'I may need PEP. Please help me understand my options today.',
] as const;

export default function StrongestVoice() {
  const gradeBand = useCapeStore((state) => state.gradeBand);
  const saved = useCapeStore((state) => state.strongestVoiceScripts);
  const saveScript = useCapeStore((state) => state.saveStrongestVoiceScript);
  const removeScript = useCapeStore((state) => state.removeStrongestVoiceScript);
  const starters = trackFor(gradeBand) === 'blue' ? [...STARTERS, ...BLUE_STARTERS] : STARTERS;
  const [script, setScript] = useState<string>(starters[0]);
  const [rehearsals, setRehearsals] = useState(0);

  const save = () => {
    saveScript(script);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="Strongest Voice" tint={C.modC} fallback="/(tabs)/tools" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Eyebrow color={C.modC}>F.R.I.E.S. SCRIPT LAB</Eyebrow>
          <Display className="mt-2 text-4xl">Lower the cost of speaking.</Display>
          <Body className="mt-3">
            Build one clear line before pressure arrives. Your scripts stay on this device only.
          </Body>

          <View className="mt-6 gap-2">
            {starters.map((starter) => (
              <Pressable
                key={starter}
                accessibilityRole="button"
                accessibilityLabel={starter}
                accessibilityState={{ selected: starter === script }}
                onPress={() => {
                  setScript(starter);
                  void Haptics.selectionAsync();
                  setRehearsals(0);
                }}
                className="rounded-2xl p-4 active:opacity-70"
                style={{
                  backgroundColor: starter === script ? alpha(C.modC, 0.12) : C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.modC, starter === script ? 0.45 : 0.18),
                }}
              >
                <Mono className="text-[13px]">{starter}</Mono>
              </Pressable>
            ))}
          </View>

          <TextField className="mt-6">
            <Label className="font-mono text-[13px]">MAKE IT YOURS</Label>
            <Input
              value={script}
              onChangeText={(value) => {
                setScript(value);
                setRehearsals(0);
              }}
              maxLength={180}
              placeholder="Write the line you want ready."
              placeholderColorClassName="accent-slate-faint"
              className="text-foreground font-mono"
            />
          </TextField>

          <Panel tint={C.modC} fill={0.06} stroke={0.2} className="mt-5">
            <View className="flex-row items-start gap-3">
              <MessageSquareText size={18} color={C.modC} />
              <View className="flex-1">
                <Eyebrow color={C.modC}>REHEARSE OUT LOUD</Eyebrow>
                <Mono className="mt-2 text-[13px]">
                  “{script.trim() || 'Your line goes here.'}”
                </Mono>
                <GradientAction
                  onPress={() => {
                    setRehearsals((count) => Math.min(3, count + 1));
                    void Haptics.selectionAsync();
                  }}
                  className="mt-4 flex-row items-center justify-center gap-2 rounded-full py-3"
                >
                  <Check size={14} color={C.paper2} />
                  <Mono bold color={C.paper2} className="text-[13px]" tracking={1}>
                    SAID IT {rehearsals}/3
                  </Mono>
                </GradientAction>
              </View>
            </View>
          </Panel>

          <MetallicButton className="mt-5" label="SAVE ON THIS DEVICE" onPress={save} />

          {saved.length > 0 ? (
            <View className="mt-8 gap-2">
              <Eyebrow color={C.teal}>YOUR READY LINES</Eyebrow>
              {saved.map((item) => (
                <View
                  key={item}
                  className="flex-row items-center gap-3 rounded-2xl p-4"
                  style={{
                    backgroundColor: C.card,
                    borderWidth: 1,
                    borderColor: alpha(C.teal, 0.2),
                  }}
                >
                  <Mono className="flex-1 text-[13px]">{item}</Mono>
                  <GradientAction
                    accessibilityLabel={`Delete script: ${item}`}
                    className="h-11 w-11 items-center justify-center rounded-full"
                    onPress={() => removeScript(item)}
                  >
                    <Trash2 size={15} color={C.paper2} />
                  </GradientAction>
                </View>
              ))}
            </View>
          ) : null}

          <BrandFooter className="mt-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
