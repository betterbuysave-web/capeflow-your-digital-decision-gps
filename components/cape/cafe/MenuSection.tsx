import { useState } from 'react';
import { Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { Eye, Plus, RotateCcw, X } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { GhostButton } from '@/components/cape/Buttons';
import { C, alpha } from '@/lib/colors';
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

      <Panel tint={C.amber} fill={0.06} stroke={0.2} className="mt-5">
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
        <Eyebrow color={C.teal}>THE MENU BOARD</Eyebrow>
        <Mono className="mt-2 text-[10px]">
          Write your own items. Edit or delete any of them — nothing here leaves this device.
        </Mono>
      </View>

      {MENU_COURSES.map((course) => (
        <View
          key={course.id}
          className="mt-5 overflow-hidden rounded-2xl"
          style={{ borderWidth: 1, borderColor: alpha(course.tint, 0.2) }}
        >
          <View
            className="flex-row items-center gap-3 p-3.5"
            style={{ backgroundColor: alpha(course.tint, 0.1) }}
          >
            <Mono className="text-lg">{course.emoji}</Mono>
            <View className="flex-1">
              <Mono bold color={course.tint} className="text-[12px]">
                {course.title}
              </Mono>
              <Mono className="mt-0.5 text-[9px]">{course.desc}</Mono>
            </View>
          </View>

          <View className="gap-2 p-3.5" style={{ backgroundColor: alpha(course.tint, 0.03) }}>
            {cafeMenu[course.id].length === 0 ? (
              <Mono color={alpha(C.slateFaint, 0.45)} className="text-[10px]">
                Nothing on this course yet.
              </Mono>
            ) : null}
            {cafeMenu[course.id].map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-center gap-2 rounded-xl px-2.5 py-1"
                style={{ backgroundColor: alpha(C.white, 0.04) }}
              >
                <TextInput
                  value={item.text}
                  onChangeText={(text) => setCafeItem(course.id, index, text)}
                  placeholder={course.placeholder}
                  placeholderTextColor={alpha(C.slateFaint, 0.4)}
                  className="flex-1 py-2"
                  style={{ color: C.white, fontFamily: INPUT_FONT, fontSize: 11 }}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.text || 'item'}`}
                  onPress={() => removeCafeItem(course.id, index)}
                  className="h-7 w-7 items-center justify-center rounded-full active:opacity-60"
                >
                  <X size={13} color={alpha(C.slateFaint, 0.7)} />
                </Pressable>
              </View>
            ))}

            <Pressable
              accessibilityRole="button"
              onPress={() => addCafeItem(course.id, '')}
              className="mt-1 flex-row items-center justify-center gap-2 rounded-xl py-2.5 active:opacity-70"
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: alpha(course.tint, 0.35),
              }}
            >
              <Plus size={13} color={alpha(course.tint, 0.9)} />
              <Mono bold color={alpha(course.tint, 0.9)} tracking={1.5} className="text-[9px]">
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
          icon={<Eye size={15} color={alpha(C.slateSoft, 0.85)} />}
        />
        <GhostButton
          label="CLEAR ALL COURSES"
          tint={C.no}
          onPress={resetCafeMenu}
          icon={<RotateCcw size={14} color={alpha(C.slateSoft, 0.85)} />}
        />
      </View>

      <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-6">
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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close preview"
        onPress={onClose}
        className="flex-1 justify-end"
        style={{ backgroundColor: alpha('#000000', 0.75) }}
      >
        <Pressable
          accessibilityRole="none"
          onPress={() => {}}
          className="max-h-[80%] rounded-t-3xl p-5"
          style={{
            backgroundColor: C.card,
            borderTopWidth: 1,
            borderTopColor: alpha(C.teal, 0.25),
          }}
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Eyebrow color={C.amber}>PRIVATE PREVIEW</Eyebrow>
              <Display className="mt-1.5 text-3xl">My Consent Café menu</Display>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={onClose}
              className="h-8 w-8 items-center justify-center rounded-full active:opacity-60"
              style={{ backgroundColor: alpha(C.white, 0.06) }}
            >
              <X size={15} color={alpha(C.slateSoft, 0.9)} />
            </Pressable>
          </View>

          <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
            {MENU_COURSES.map((course) => {
              const items = menu[course.id].filter((i) => i.text.trim().length > 0);
              return (
                <View key={course.id} className="mb-5">
                  <Mono bold color={course.tint} className="text-[11px]">
                    {course.emoji} {course.title.toUpperCase()}
                  </Mono>
                  <View className="mt-2 gap-1.5">
                    {items.length === 0 ? (
                      <Mono color={alpha(C.slateFaint, 0.45)} className="text-[10px]">
                        Nothing added yet.
                      </Mono>
                    ) : (
                      items.map((item) => (
                        <View key={item.id} className="flex-row gap-2">
                          <Mono color={alpha(course.tint, 0.8)} className="text-[10px]">
                            —
                          </Mono>
                          <Mono color={alpha(C.slateSoft, 0.85)} className="flex-1 text-[10px]">
                            {item.text.trim()}
                          </Mono>
                        </View>
                      ))
                    )}
                  </View>
                </View>
              );
            })}
            <Mono color={alpha(C.slateFaint, 0.55)} className="pb-4 text-[9px]">
              Screenshot this if you want to share it with someone you trust. It is stored only on
              this device.
            </Mono>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
