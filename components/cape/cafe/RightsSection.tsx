import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Check, ShieldAlert } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { CAFE_MYTHS, CAFE_RIGHTS, CAFE_SAFETY_NOTE } from '@/lib/data/cafe';
import { C, alpha, wash } from '@/lib/colors';

/** Station 03 — the customer satisfaction guarantee and the myth busters. */
export function RightsSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <View>
      <Eyebrow color={C.gold}>STATION 03 · YOUR RIGHTS</Eyebrow>
      <Display className="mt-2 text-4xl">The customer guarantee.</Display>
      <Body className="mt-3">
        In this café the customer is in charge. These are not house rules — they are your rights.
      </Body>

      {/* The guarantee, drawn as a certificate on card stock. */}
      <View
        className="mt-5 rounded-2xl p-5"
        style={{
          backgroundColor: wash(C.goldBright, 0.07),
          borderWidth: 1,
          borderColor: alpha(C.goldBright, 0.5),
        }}
      >
        <Display color={C.gold} className="text-2xl">
          Your rights as a customer
        </Display>
        <Mono className="mt-2 text-[13px]">
          Changing your mind is not a mixed signal. Leaving is not manipulation. Saying no — or not
          anymore — is self-knowledge.
        </Mono>
        <View className="mt-4 gap-2.5">
          {CAFE_RIGHTS.map((right) => (
            <View key={right} className="flex-row items-start gap-2.5">
              <View
                className="mt-0.5 h-5 w-5 items-center justify-center rounded-full"
                style={{
                  backgroundColor: wash(C.tealBright, 0.18),
                  borderWidth: 1,
                  borderColor: alpha(C.tealBright, 0.4),
                }}
              >
                <Check size={11} color={C.teal} />
              </View>
              <Mono color={C.inkSoft} className="flex-1 text-[13px]">
                {right}
              </Mono>
            </View>
          ))}
        </View>
      </View>

      <Eyebrow color={C.no} className="mt-8">
        MYTH BUSTER · TAP TO REVEAL
      </Eyebrow>
      <View className="mt-3 gap-2.5">
        {CAFE_MYTHS.map((card) => {
          const expanded = open === card.id;
          return (
            <Pressable
              key={card.id}
              accessibilityRole="button"
              accessibilityState={{ expanded }}
              onPress={() => setOpen(expanded ? null : card.id)}
              className="rounded-2xl p-4 active:opacity-80"
              style={{
                backgroundColor: C.card,
                borderWidth: 1,
                borderColor: alpha(C.ink, 0.12),
                borderLeftWidth: 3,
                borderLeftColor: expanded ? C.tealBright : C.no,
              }}
            >
              <Eyebrow color={C.no}>COMMON MYTH</Eyebrow>
              <Mono bold color={C.ink} className="mt-1.5 text-[13px]">
                &ldquo;{card.myth}&rdquo;
              </Mono>
              {expanded ? (
                <View
                  className="mt-3 rounded-xl p-3"
                  style={{
                    backgroundColor: wash(C.tealBright, 0.1),
                    borderLeftWidth: 2,
                    borderLeftColor: C.tealBright,
                  }}
                >
                  <Eyebrow color={C.teal}>THE TRUTH</Eyebrow>
                  <Mono color={C.inkSoft} className="mt-1.5 text-[13px]">
                    {card.truth}
                  </Mono>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <Panel tint={C.flame} fill={0.09} stroke={0.4} className="mt-8">
        <View className="flex-row items-start gap-2.5">
          <ShieldAlert size={16} color={C.flame} />
          <View className="flex-1">
            <Eyebrow color={C.flame}>THE SAFETY EXCEPTION</Eyebrow>
            <Mono className="mt-1.5 text-[13px]">{CAFE_SAFETY_NOTE}</Mono>
          </View>
        </View>
      </Panel>
    </View>
  );
}
