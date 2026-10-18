import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Check, ChevronDown, Clock, Sparkles } from 'lucide-react-native';

import { MatchDial } from '@/components/cape/MatchDial';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { C, alpha } from '@/lib/colors';
import { GradientAction } from '@/components/cape/Buttons';
import { getModule, lessonsForTrack, moduleTagline } from '@/lib/data/match';
import { trackFor } from '@/lib/data/content';
import { moduleProgress, useCapeStore } from '@/lib/store/useCapeStore';

export default function ModuleDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mod = getModule(id ?? '');
  const completedLessons = useCapeStore((s) => s.completedLessons);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const completeLesson = useCapeStore((s) => s.completeLesson);
  const [openId, setOpenId] = useState<string | null>(null);
  const track = trackFor(gradeBand);

  if (!mod) {
    return (
      <View className="bg-paper flex-1">
        <StackHeader title="Module" fallback="/(tabs)/learn" />
        <View className="flex-1 items-center justify-center px-6">
          <Display className="text-3xl">Module not found</Display>
          <Body className="mt-2 text-center">
            Head back to the compass and pick another module.
          </Body>
        </View>
      </View>
    );
  }

  const progress = moduleProgress(mod.id, completedLessons, track);
  const lessons = lessonsForTrack(mod, track);
  const done = lessons.filter((l) => completedLessons.includes(l.id)).length;

  return (
    <View className="bg-paper flex-1">
      <StackHeader title={mod.name} tint={mod.color} fallback="/(tabs)/learn" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center gap-4">
          <MatchDial letter={mod.letter} size={72} />
          <View className="flex-1">
            <Mono className="text-xl">{mod.emoji}</Mono>
            <Display className="mt-1 text-3xl">{mod.name}</Display>
          </View>
        </View>

        <Body className="mt-4">{moduleTagline(mod, track)}</Body>

        <Panel tint={mod.color} fill={0.05} stroke={0.18} className="mt-5">
          <View className="flex-row items-center justify-between">
            <Eyebrow color={mod.color}>MODULE PROGRESS</Eyebrow>
            <Mono bold color={mod.color} className="text-[13px]">
              {progress}%
            </Mono>
          </View>
          <View className="mt-2.5">
            <Rail value={progress} color={mod.color} height={5} />
          </View>
          <Mono className="mt-2 text-[12px]" color={alpha(C.inkFaint, 0.7)}>
            {done} of {lessons.length} lessons complete
          </Mono>
        </Panel>

        <View className="mt-6 gap-3">
          {lessons.map((lesson, index) => {
            const isDone = completedLessons.includes(lesson.id);
            const isOpen = openId === lesson.id;
            return (
              <View
                key={lesson.id}
                className="overflow-hidden rounded-2xl"
                style={{
                  backgroundColor: alpha(mod.color, isOpen ? 0.06 : 0.035),
                  borderWidth: 1,
                  borderColor: alpha(mod.color, isOpen ? 0.3 : 0.14),
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isOpen }}
                  onPress={() => setOpenId(isOpen ? null : lesson.id)}
                  className="flex-row items-center gap-3 p-4 active:opacity-70"
                >
                  <View
                    className="h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: alpha(mod.color, isDone ? 0.25 : 0.1),
                      borderWidth: 1,
                      borderColor: alpha(mod.color, 0.28),
                    }}
                  >
                    {isDone ? (
                      <Check size={14} color={mod.color} />
                    ) : (
                      <Mono bold color={mod.color} className="text-[13px]">
                        {index + 1}
                      </Mono>
                    )}
                  </View>
                  <View className="flex-1">
                    <Mono bold className="text-[14px]" color={alpha(C.inkSoft, 0.95)}>
                      {lesson.title}
                    </Mono>
                    <View className="mt-1 flex-row items-center gap-3">
                      <View className="flex-row items-center gap-1">
                        <Clock size={10} color={alpha(C.inkFaint, 0.7)} />
                        <Mono className="text-[12px]" color={alpha(C.inkFaint, 0.7)}>
                          {lesson.minutes} min
                        </Mono>
                      </View>
                      <Mono className="text-[12px]" color={alpha(mod.color, 0.9)}>
                        +{lesson.xp} XP
                      </Mono>
                    </View>
                  </View>
                  <ChevronDown
                    size={16}
                    color={alpha(C.inkFaint, 0.7)}
                    style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
                  />
                </Pressable>

                {isOpen ? (
                  <View className="px-4 pb-4">
                    <Mono className="text-[13px]">{lesson.intro}</Mono>
                    <View className="mt-3 gap-2">
                      {lesson.points.map((point) => (
                        <View key={point} className="flex-row gap-2.5">
                          <View
                            className="mt-1.5 h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: mod.color }}
                          />
                          <Mono className="flex-1 text-[13px]">{point}</Mono>
                        </View>
                      ))}
                    </View>

                    <Panel tint={mod.color} fill={0.07} stroke={0.2} className="mt-4 p-3">
                      <View className="flex-row items-start gap-2">
                        <Sparkles size={13} color={mod.color} />
                        <View className="flex-1">
                          <Mono bold color={mod.color} className="text-[12px]" tracking={1.5}>
                            TRY IT
                          </Mono>
                          <Mono className="mt-1 text-[13px]">{lesson.tryIt}</Mono>
                        </View>
                      </View>
                    </Panel>

                    <GradientAction
                      disabled={isDone}
                      onPress={() => completeLesson(lesson.id, lesson.xp)}
                      className="mt-4 flex-row items-center justify-center gap-2 rounded-full py-3"
                    >
                      {isDone ? <Check size={14} color={C.paper2} /> : null}
                      <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
                        {isDone ? 'COMPLETE' : `MARK COMPLETE · +${lesson.xp} XP`}
                      </Mono>
                    </GradientAction>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        <BrandFooter className="mt-8" />
      </ScrollView>
    </View>
  );
}
