import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Lock, RotateCcw } from 'lucide-react-native';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { GhostButton, MetallicButton } from '@/components/cape/Buttons';
import { CONFIDENCE_LEVELS, EXIT_QUESTIONS } from '@/lib/data/cafe';
import { C, alpha } from '@/lib/colors';
import { useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';

/** Station 05 — the exit card: four reflections plus a confidence read. */
export function ExitCardSection() {
  const exitCard = useCapeStore((s) => s.cafeExit);
  const setCafeExitAnswer = useCapeStore((s) => s.setCafeExitAnswer);
  const setCafeConfidence = useCapeStore((s) => s.setCafeConfidence);
  const completeCafeExit = useCapeStore((s) => s.completeCafeExit);
  const clearCafeExit = useCapeStore((s) => s.clearCafeExit);
  const [hint, setHint] = useState(false);

  if (exitCard.completedAt !== null) {
    return (
      <View>
        <Eyebrow color={C.teal}>STATION 05 · EXIT CARD</Eyebrow>
        <View className="mt-6 items-center">
          <Mono className="text-5xl">☕</Mono>
          <Display className="mt-3 text-center text-3xl">
            Thanks for visiting the Consent Café.
          </Display>
          <Body className="mt-3 text-center">
            Your reflections matter. You are always the customer here — the order is yours to set,
            change, or send back.
          </Body>
          <Mono bold color={C.teal} tracking={1.5} className="mt-4 text-center text-[10px]">
            FREELY GIVEN · REVERSIBLE · INFORMED · ENTHUSIASTIC · SPECIFIC
          </Mono>
        </View>

        <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-7">
          <View className="flex-row items-start gap-2.5">
            <Lock size={15} color={C.teal} />
            <Mono className="flex-1 text-[10px]">
              Your card is saved on this device only. Nobody else can read it, and deleting the app
              erases it for good.
            </Mono>
          </View>
        </Panel>

        <View className="mt-6">
          <GhostButton
            label="FILL IT OUT AGAIN"
            tint={C.white}
            onPress={clearCafeExit}
            icon={<RotateCcw size={14} color={alpha(C.slateSoft, 0.85)} />}
          />
        </View>
      </View>
    );
  }

  const filled = exitCard.answers.filter((a) => a.trim().length > 0).length;

  const submit = () => {
    if (filled < 2 && exitCard.confidence === null) {
      setHint(true);
      return;
    }
    setHint(false);
    completeCafeExit();
  };

  return (
    <View>
      <Eyebrow color={C.teal}>STATION 05 · EXIT CARD</Eyebrow>
      <Display className="mt-2 text-4xl">Before you leave.</Display>
      <Body className="mt-3">
        No wrong answers here — this one is only for you. It never leaves the device.
      </Body>

      <View className="mt-6 gap-5">
        {EXIT_QUESTIONS.map((question, index) => (
          <View key={question}>
            <View className="flex-row items-start gap-2.5">
              <View
                className="rounded-md px-1.5 py-0.5"
                style={{ backgroundColor: alpha(C.teal, 0.16) }}
              >
                <Mono bold color={C.teal} className="text-[9px]">
                  {String(index + 1).padStart(2, '0')}
                </Mono>
              </View>
              <Mono bold color={alpha(C.slateSoft, 0.95)} className="flex-1 text-[11px]">
                {question}
              </Mono>
            </View>
            <TextInput
              value={exitCard.answers[index] ?? ''}
              onChangeText={(text) => setCafeExitAnswer(index, text)}
              placeholder="Write here…"
              placeholderTextColor={alpha(C.slateFaint, 0.4)}
              multiline
              className="mt-2 rounded-xl px-3 py-2.5"
              style={{
                color: C.white,
                fontFamily: INPUT_FONT,
                fontSize: 11,
                minHeight: 68,
                textAlignVertical: 'top',
                backgroundColor: alpha(C.white, 0.04),
                borderWidth: 1,
                borderColor: alpha(C.teal, 0.16),
              }}
            />
          </View>
        ))}

        <View>
          <View className="flex-row items-start gap-2.5">
            <View
              className="rounded-md px-1.5 py-0.5"
              style={{ backgroundColor: alpha(C.teal, 0.16) }}
            >
              <Mono bold color={C.teal} className="text-[9px]">
                05
              </Mono>
            </View>
            <Mono bold color={alpha(C.slateSoft, 0.95)} className="flex-1 text-[11px]">
              How confident do I feel right now about understanding consent?
            </Mono>
          </View>
          <View className="mt-3 flex-row gap-1.5">
            {CONFIDENCE_LEVELS.map((level) => {
              const active = exitCard.confidence === level.value;
              return (
                <Pressable
                  key={level.value}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  onPress={() => setCafeConfidence(level.value)}
                  className="flex-1 items-center rounded-xl py-2.5 active:opacity-70"
                  style={{
                    backgroundColor: alpha(C.teal, active ? 0.2 : 0.04),
                    borderWidth: 1,
                    borderColor: alpha(C.teal, active ? 0.55 : 0.12),
                  }}
                >
                  <Mono bold color={active ? C.teal : alpha(C.slateSoft, 0.8)} className="text-sm">
                    {level.value}
                  </Mono>
                  <Mono
                    color={active ? alpha(C.teal, 0.8) : alpha(C.slateFaint, 0.6)}
                    className="mt-0.5 text-[8px]"
                  >
                    {level.label}
                  </Mono>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {hint ? (
        <Mono color={C.maybe} className="mt-4 text-[10px]">
          Answer a couple of prompts or set your confidence, then complete the card.
        </Mono>
      ) : null}

      <View className="mt-6 gap-2.5">
        <MetallicButton label="COMPLETE MY EXIT CARD" onPress={submit} showArrow={false} />
        <GhostButton
          label="CLEAR THE CARD"
          tint={C.white}
          onPress={clearCafeExit}
          icon={<RotateCcw size={14} color={alpha(C.slateSoft, 0.85)} />}
        />
      </View>
    </View>
  );
}
