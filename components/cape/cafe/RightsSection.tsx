import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Check, ShieldAlert } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { CAFE_MYTHS, CAFE_RIGHTS, CAFE_SAFETY_NOTE } from '@/lib/data/cafe';
import { C, alpha } from '@/lib/colors';

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

      <View
        className="mt-5 rounded-2xl p-5"
        style={{
          backgroundColor: alpha(C.ink2, 0.95),
          borderWidth: 1,
          borderColor: alpha(C.gold, 0.28),
        }}
      >
        <Display color={C.gold} className="text-2xl">
          Your rights as a customer
        </Display>
        <Mono className="mt-2 text-[10px]">
          Changing your mind is not a mixed signal. Leaving is not manipulation. Saying no — or not
          anymore — is self-knowledge.
        </Mono>
        <View className="mt-4 gap-2.5">
          {CAFE_RIGHTS.map((right) => (
            <View key={right} className="flex-row items-start gap-2.5">
              <View
                className="mt-0.5 h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: alpha(C.teal, 0.16) }}
              >
                <Check size={11} color={C.teal} />
              </View>
              <Mono color={alpha(C.slateSoft, 0.88)} className="flex-1 text-[11px]">
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
                backgroundColor: alpha(C.white, 0.03),
                borderWidth: 1,
                borderColor: alpha(C.white, 0.07),
                borderLeftWidth: 3,
                borderLeftColor: expanded ? C.teal : C.no,
              }}
            >
              <Eyebrow color={alpha(C.no, 0.9)}>COMMON MYTH</Eyebrow>
              <Mono bold color={alpha(C.slateSoft, 0.95)} className="mt-1.5 text-[11px]">
                &ldquo;{card.myth}&rdquo;
              </Mono>
              {expanded ? (
                <View
                  className="mt-3 rounded-xl p-3"
                  style={{
                    backgroundColor: alpha(C.teal, 0.08),
                    borderLeftWidth: 2,
                    borderLeftColor: C.teal,
                  }}
                >
                  <Eyebrow color={C.teal}>THE TRUTH</Eyebrow>
                  <Mono color={alpha(C.slateSoft, 0.9)} className="mt-1.5 text-[10px]">
                    {card.truth}
                  </Mono>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <Panel tint={C.flame} fill={0.06} stroke={0.2} className="mt-8">
        <View className="flex-row items-start gap-2.5">
          <ShieldAlert size={16} color={C.flame} />
          <View className="flex-1">
            <Eyebrow color={C.flame}>THE SAFETY EXCEPTION</Eyebrow>
            <Mono className="mt-1.5 text-[10px]">{CAFE_SAFETY_NOTE}</Mono>
          </View>
        </View>
      </Panel>
    </View>
  );
}
