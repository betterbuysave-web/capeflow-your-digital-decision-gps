import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { AccessibleSheet } from '@/components/cape/AccessibleSheet';
import { Eye, Plus, RotateCcw, X } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { GhostButton } from '@/components/cape/Buttons';
import { C, alpha, wash } from '@/lib/colors';
import { BOUNDARY_MENU, BOUNDARY_SECTIONS, type BoundaryAnswer } from '@/lib/data/boundaries';
import { MENU_COURSES, type CafeCourse, type CafeMenuItem } from '@/lib/data/cafe';
import { useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';

const ANSWERS: { id: BoundaryAnswer; label: string; tint: string }[] = [
  { id: 'yes', label: 'YES', tint: C.yes },
  { id: 'maybe', label: 'MAYBE', tint: C.maybe },
  { id: 'no', label: 'NO', tint: C.no },
];

/** Station 02 — the scored standing order, then your own three-course menu. */
export function MenuSection() {
  const boundaries = useCapeStore((s) => s.boundaries);
  const setBoundary = useCapeStore((s) => s.setBoundary);
  const cafeMenu = useCapeStore((s) => s.cafeMenu);
  const addCafeItem = useCapeStore((s) => s.addCafeItem);
  const setCafeItem = useCapeStore((s) => s.setCafeItem);
  const removeCafeItem = useCapeStore((s) => s.removeCafeItem);
  const resetCafeMenu = useCapeStore((s) => s.resetCafeMenu);
  const [preview, setPreview] = useState(false);

  const answered = Object.keys(boundaries).length;

  return (
    <View>
      <Eyebrow color={C.amber}>STATION 02 · MY MENU</Eyebrow>
      <Display className="mt-2 text-4xl">You are always the customer.</Display>
      <Body className="mt-3">
        Every person&apos;s menu is different — that is the point. Set your standing order, then
        build the three courses in your own words.
      </Body>

      <Panel tint={C.amber} fill={0.09} stroke={0.4} className="mt-5">
        <View className="flex-row items-center justify-between">
          <Eyebrow color={C.amber}>YOUR STANDING ORDER</Eyebrow>
          <Mono bold color={C.amber} className="text-[11px]">
            {answered}/{BOUNDARY_MENU.length}
          </Mono>
        </View>
        <View className="mt-2.5">
          <Rail value={(answered / BOUNDARY_MENU.length) * 100} color={C.amber} />
        </View>
      </Panel>

      {BOUNDARY_SECTIONS.map((section) => (
        <View key={section} className="mt-7">
          <Eyebrow color={C.inkFaint}>{section}</Eyebrow>
          <View className="mt-3 gap-2.5">
            {BOUNDARY_MENU.filter((item) => item.section === section).map((item) => {
              const current = boundaries[item.id];
              return (
                <View
                  key={item.id}
                  className="rounded-2xl p-3.5"
                  style={{
                    backgroundColor: wash(C.amber, 0.06),
                    borderWidth: 1,
                    borderColor: alpha(C.amber, 0.26),
                  }}
                >
                  <View className="flex-row items-center gap-2">
                    <Mono className="text-base">{item.emoji}</Mono>
                    <Mono bold color={C.ink} className="flex-1 text-[11px]">
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
                          accessibilityLabel={`${item.label}: ${answer.label}`}
                          accessibilityState={{ checked: active, selected: active }}
                          onPress={() => setBoundary(item.id, answer.id)}
                          className="min-h-11 flex-1 items-center justify-center rounded-xl py-2 active:opacity-70"
                          style={{
                            backgroundColor: active ? wash(answer.tint, 0.18) : C.card,
                            borderWidth: 1,
                            borderColor: alpha(answer.tint, active ? 0.6 : 0.2),
                          }}
                        >
                          <Mono
                            bold
                            color={active ? answer.tint : C.inkFaint}
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
        <Eyebrow color={C.teal}>THE MENU BOARD</Eyebrow>
        <Mono className="mt-2 text-[10px]">
          Write your own items. Edit or delete any of them — nothing here leaves this device.
        </Mono>
      </View>

      {MENU_COURSES.map((course) => (
        <View
          key={course.id}
          className="mt-5 overflow-hidden rounded-2xl"
          style={{ borderWidth: 1, borderColor: alpha(course.tint, 0.35) }}
        >
          <View
            className="flex-row items-center gap-3 p-3.5"
            style={{ backgroundColor: wash(course.tint, 0.14) }}
          >
            <Mono className="text-lg">{course.emoji}</Mono>
            <View className="flex-1">
              <Mono bold color={course.tint} className="text-[12px]">
                {course.title}
              </Mono>
              <Mono className="mt-0.5 text-[9px]">{course.desc}</Mono>
            </View>
          </View>

          <View className="gap-2 p-3.5" style={{ backgroundColor: C.card }}>
            {cafeMenu[course.id].length === 0 ? (
              <Mono color={C.inkFaint} className="text-[10px]">
                Nothing on this course yet.
              </Mono>
            ) : null}
            {cafeMenu[course.id].map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-center gap-2 rounded-xl px-2.5 py-1"
                style={{
                  backgroundColor: C.paper2,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.1),
                }}
              >
                <TextInput
                  accessibilityLabel={`${course.title}, item ${index + 1}`}
                  value={item.text}
                  onChangeText={(text) => setCafeItem(course.id, index, text)}
                  placeholder={course.placeholder}
                  placeholderTextColor={C.inkFaint}
                  className="flex-1 py-2"
                  style={{ color: C.ink, fontFamily: INPUT_FONT, fontSize: 11 }}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.text || 'item'}`}
                  onPress={() => removeCafeItem(course.id, index)}
                  className="h-11 w-11 items-center justify-center rounded-full active:opacity-60"
                >
                  <X size={13} color={C.inkFaint} />
                </Pressable>
              </View>
            ))}

            <Pressable
              accessibilityRole="button"
              onPress={() => addCafeItem(course.id, '')}
              className="mt-1 min-h-11 flex-row items-center justify-center gap-2 rounded-xl py-2.5 active:opacity-70"
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: alpha(course.tint, 0.5),
              }}
            >
              <Plus size={13} color={course.tint} />
              <Mono bold color={course.tint} tracking={1.5} className="text-[9px]">
                {course.addLabel}
              </Mono>
            </Pressable>
          </View>
        </View>
      ))}

      <View className="mt-6 gap-2.5">
        <GhostButton
          label="PREVIEW MY MENU"
          tint={C.teal}
          onPress={() => setPreview(true)}
          icon={<Eye size={15} color={C.inkSoft} />}
        />
        <GhostButton
          label="CLEAR ALL COURSES"
          tint={C.no}
          onPress={resetCafeMenu}
          icon={<RotateCcw size={14} color={C.inkSoft} />}
        />
      </View>

      <Panel tint={C.tealBright} fill={0.08} stroke={0.35} className="mt-6">
        <View className="flex-row items-start gap-2.5">
          <RotateCcw size={15} color={C.teal} />
          <Mono className="flex-1 text-[10px]">
            Menus change. Revisit your order any time — yesterday&apos;s answer does not bind today.
          </Mono>
        </View>
      </Panel>

      <MenuPreview menu={cafeMenu} visible={preview} onClose={() => setPreview(false)} />
    </View>
  );
}

function MenuPreview({
  menu,
  visible,
  onClose,
}: {
  menu: Record<CafeCourse, CafeMenuItem[]>;
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <AccessibleSheet
      visible={visible}
      onClose={onClose}
      title="My Consent Café menu"
      eyebrow="PRIVATE PREVIEW"
      tint={C.amber}
    >
      <View className="mt-4">
        {MENU_COURSES.map((course) => {
          const items = menu[course.id].filter((i) => i.text.trim().length > 0);
          return (
            <View key={course.id} className="mb-5">
              <Mono bold color={course.tint} className="text-[11px]">
                {course.emoji} {course.title.toUpperCase()}
              </Mono>
              <View className="mt-2 gap-1.5">
                {items.length === 0 ? (
                  <Mono color={C.inkFaint} className="text-[10px]">
                    Nothing added yet.
                  </Mono>
                ) : (
                  items.map((item) => (
                    <View key={item.id} className="flex-row gap-2">
                      <Mono color={course.tint} className="text-[10px]">
                        —
                      </Mono>
                      <Mono color={C.inkSoft} className="flex-1 text-[10px]">
                        {item.text.trim()}
                      </Mono>
                    </View>
                  ))
                )}
              </View>
            </View>
          );
        })}
        <Mono color={C.inkFaint} className="pb-4 text-[9px]">
          Screenshot this if you want to share it with someone you trust. It is stored only on this
          device.
        </Mono>
      </View>
    </AccessibleSheet>
  );
}
