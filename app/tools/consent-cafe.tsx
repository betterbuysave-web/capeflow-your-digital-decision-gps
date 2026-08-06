import { ScrollView, View } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { C, alpha } from '@/lib/colors';
import {
  BOUNDARY_MENU,
  BOUNDARY_SECTIONS,
  FRIES,
  type BoundaryAnswer,
} from '@/lib/data/boundaries';
import { useCapeStore } from '@/lib/store/useCapeStore';

const ANSWERS: { id: BoundaryAnswer; label: string; tint: string }[] = [
  { id: 'yes', label: 'YES', tint: C.yes },
  { id: 'maybe', label: 'MAYBE', tint: C.maybe },
  { id: 'no', label: 'NO', tint: C.no },
];

export default function ConsentCafe() {
  const boundaries = useCapeStore((s) => s.boundaries);
  const setBoundary = useCapeStore((s) => s.setBoundary);
  const answered = Object.keys(boundaries).length;

  return (
    <View className="bg-ink flex-1">
      <StackHeader title="The Consent Café" tint={C.amber} fallback="/(tabs)/tools" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.amber}>THE CONSENT CAFÉ</Eyebrow>
        <Display className="mt-2 text-4xl">You are always the customer.</Display>
        <Body className="mt-3">
          Order from a menu of boundaries. YES, MAYBE, or NO — your choice, always reversible.
          Nothing here is shared with anyone.
        </Body>

        <Panel tint={C.amber} fill={0.06} stroke={0.2} className="mt-5">
          <View className="flex-row items-center justify-between">
            <Eyebrow color={C.amber}>YOUR ORDER</Eyebrow>
            <Mono bold color={C.amber} className="text-[11px]">
              {answered}/{BOUNDARY_MENU.length}
            </Mono>
          </View>
          <View className="mt-2.5">
            <Rail value={(answered / BOUNDARY_MENU.length) * 100} color={C.amber} />
          </View>
        </Panel>

        {BOUNDARY_SECTIONS.map((section) => (
          <View key={section} className="mt-8">
            <Eyebrow color={alpha(C.slateFaint, 0.8)}>{section}</Eyebrow>
            <View className="mt-3 gap-2.5">
              {BOUNDARY_MENU.filter((item) => item.section === section).map((item) => {
                const current = boundaries[item.id];
                return (
                  <View
                    key={item.id}
                    className="rounded-2xl p-3.5"
                    style={{
                      backgroundColor: alpha(C.amber, 0.05),
                      borderWidth: 1,
                      borderColor: alpha(C.amber, 0.16),
                    }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Mono className="text-base">{item.emoji}</Mono>
                      <Mono bold color={alpha(C.slateSoft, 0.95)} className="flex-1 text-[11px]">
                        {item.label}
                      </Mono>
                    </View>
                    <View className="mt-3 flex-row gap-2">
                      {ANSWERS.map((answer) => {
                        const active = current === answer.id;
                        return (
                          <Pressable
                            key={answer.id}
                            accessibilityRole="radio"
                            accessibilityState={{ selected: active }}
                            onPress={() => setBoundary(item.id, answer.id)}
                            className="flex-1 items-center rounded-xl py-2 active:opacity-70"
                            style={{
                              backgroundColor: alpha(answer.tint, active ? 0.2 : 0.05),
                              borderWidth: 1,
                              borderColor: alpha(answer.tint, active ? 0.55 : 0.15),
                            }}
                          >
                            <Mono
                              bold
                              color={active ? answer.tint : alpha(answer.tint, 0.7)}
                              className="text-[10px]"
                              tracking={1.5}
                            >
                              {answer.label}
                            </Mono>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <View className="mt-10">
          <Eyebrow color={C.modC}>THE F.R.I.E.S. CHECK</Eyebrow>
          <View className="mt-3 gap-2">
            {FRIES.map((letter) => (
              <Panel key={letter.letter} tint={C.modC} fill={0.04} stroke={0.14} className="p-3">
                <View className="flex-row items-center gap-3">
                  <Display color={C.modC} className="w-5 text-xl">
                    {letter.letter}
                  </Display>
                  <View className="flex-1">
                    <Mono bold color={C.modC} className="text-[10px]">
                      {letter.word}
                    </Mono>
                    <Mono className="mt-0.5 text-[10px]">{letter.detail}</Mono>
                  </View>
                </View>
              </Panel>
            ))}
          </View>
        </View>

        <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-8">
          <View className="flex-row items-start gap-2.5">
            <RotateCcw size={15} color={C.teal} />
            <Mono className="flex-1 text-[10px]">
              Menus change. Revisit your order any time — yesterday&apos;s answer does not bind
              today.
            </Mono>
          </View>
        </Panel>
      </ScrollView>
    </View>
  );
}
