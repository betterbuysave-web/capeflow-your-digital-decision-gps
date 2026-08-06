import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ChevronDown, Lock, Users } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { C, alpha } from '@/lib/colors';
import { CURRICULUM, PARENT_CARDS, PRIVACY_NOTE } from '@/lib/data/content';

export default function Parents() {
  const [openCard, setOpenCard] = useState<string | null>(PARENT_CARDS[0].title);
  const [openBand, setOpenBand] = useState<string | null>(CURRICULUM[0].band);

  return (
    <View className="bg-ink flex-1">
      <StackHeader title="Parents & Schools" tint={C.gold} fallback="/" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-3">
          <Users size={22} color={C.teal} />
          <View className="flex-1">
            <Eyebrow color={C.teal}>FOR PARENTS, GUARDIANS &amp; EDUCATORS</Eyebrow>
            <Mono className="mt-0.5 text-[9px]" color={alpha(C.slateFaint, 0.7)}>
              Full curriculum transparency — no surprises
            </Mono>
          </View>
        </View>

        <Display className="mt-6 text-4xl">Every topic. Every grade band.</Display>
        <Body className="mt-3">
          CAPE FLOW is built on trust. Parents and educators can read exactly what students see,
          including sources, opt-out rights, and the privacy architecture behind the app.
        </Body>

        <View className="mt-8">
          <Eyebrow color={C.teal}>CURRICULUM OVERVIEW</Eyebrow>
          <View className="mt-3 gap-2.5">
            {CURRICULUM.map((row) => {
              const isOpen = openBand === row.band;
              return (
                <View
                  key={row.band}
                  className="overflow-hidden rounded-2xl"
                  style={{
                    backgroundColor: alpha(C.teal, isOpen ? 0.06 : 0.035),
                    borderWidth: 1,
                    borderColor: alpha(C.teal, isOpen ? 0.28 : 0.14),
                  }}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpen }}
                    onPress={() => setOpenBand(isOpen ? null : row.band)}
                    className="flex-row items-center justify-between gap-3 p-4 active:opacity-70"
                  >
                    <Mono bold color={C.teal} className="flex-1 text-[10px]" tracking={1.5}>
                      {row.band}
                    </Mono>
                    <ChevronDown
                      size={15}
                      color={alpha(C.slateFaint, 0.7)}
                      style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                    />
                  </Pressable>
                  {isOpen ? (
                    <View className="gap-2 px-4 pb-4">
                      {row.topics.map((topic) => (
                        <View key={topic} className="flex-row gap-2.5">
                          <View
                            className="mt-1.5 h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: C.teal }}
                          />
                          <Mono className="flex-1 text-[10px]">{topic}</Mono>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <View className="mt-8">
          <Eyebrow color={C.gold}>WHAT YOU CONTROL</Eyebrow>
          <View className="mt-3 gap-2.5">
            {PARENT_CARDS.map((card) => {
              const isOpen = openCard === card.title;
              return (
                <View
                  key={card.title}
                  className="overflow-hidden rounded-2xl"
                  style={{
                    backgroundColor: alpha(card.tint, isOpen ? 0.07 : 0.035),
                    borderWidth: 1,
                    borderColor: alpha(card.tint, isOpen ? 0.3 : 0.14),
                  }}
                >
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpen }}
                    onPress={() => setOpenCard(isOpen ? null : card.title)}
                    className="flex-row items-center gap-3 p-4 active:opacity-70"
                  >
                    <Mono className="text-xl">{card.emoji}</Mono>
                    <View className="flex-1">
                      <Mono bold color={card.tint} className="text-[11px]">
                        {card.title}
                      </Mono>
                      <Mono className="mt-0.5 text-[9px]" color={alpha(C.slateFaint, 0.7)}>
                        {card.detail}
                      </Mono>
                    </View>
                    <ChevronDown
                      size={15}
                      color={alpha(C.slateFaint, 0.7)}
                      style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                    />
                  </Pressable>
                  {isOpen ? (
                    <View className="gap-2 px-4 pb-4">
                      {card.body.map((line) => (
                        <View key={line} className="flex-row gap-2.5">
                          <View
                            className="mt-1.5 h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: card.tint }}
                          />
                          <Mono className="flex-1 text-[10px]">{line}</Mono>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>

        <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-8">
          <View className="flex-row items-start gap-3">
            <Lock size={16} color={C.teal} />
            <View className="flex-1">
              <Eyebrow color={C.teal} className="mb-1.5">
                PRIVACY BY ARCHITECTURE
              </Eyebrow>
              <Mono className="text-[10px]">{PRIVACY_NOTE}</Mono>
            </View>
          </View>
        </Panel>
      </ScrollView>
    </View>
  );
}
