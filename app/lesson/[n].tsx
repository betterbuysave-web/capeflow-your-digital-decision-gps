import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight, Lock, Phone } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { GradientAction, TintedRow } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  BOOK_LESSONS,
  BOOK_PARTS,
  LESSON_LOCK_NOTE,
  getBookLesson,
  lessonUnlocked,
} from '@/lib/data/lessons';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function LessonScreen() {
  const { n } = useLocalSearchParams<{ n?: string }>();
  const lesson = getBookLesson(Number(n));
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const note = useCapeStore((s) => (lesson ? (s.lessonNotes[String(lesson.number)] ?? '') : ''));
  const setLessonNote = useCapeStore((s) => s.setLessonNote);
  const track = trackFor(gradeBand);

  if (!lesson) {
    return (
      <View className="bg-paper flex-1">
        <StackHeader title="Lesson" fallback="/(tabs)/learn" />
        <View className="px-5 pt-6">
          <Body>That lesson is not available.</Body>
        </View>
      </View>
    );
  }

  const tint = lesson.track === 'blue' ? C.azure : C.teal;
  const header = `Lesson ${lesson.number}`;

  if (!lessonUnlocked(lesson, track)) {
    return (
      <View className="bg-paper flex-1">
        <StackHeader title={header} tint={C.lemon} fallback="/(tabs)/learn" />
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          showsVerticalScrollIndicator={false}
        >
          <Eyebrow color={C.lemon}>LOCKED ON THIS TRACK</Eyebrow>
          <Display className="mt-2 text-4xl">This lesson opens in grades 9–12.</Display>
          <Body className="mt-3">{LESSON_LOCK_NOTE}</Body>
          <Panel tint={C.lemon} fill={0.05} stroke={0.2} className="mt-6">
            <View className="flex-row items-start gap-2.5">
              <Lock size={15} color={C.lemon} />
              <Mono className="flex-1 text-[10px]">
                Choosing your pace is the base layer. If you have questions, a trusted adult is the
                right next step.
              </Mono>
            </View>
          </Panel>
          <GradientAction
            onPress={() => router.push('/(tabs)/crisis')}
            className="mt-5 flex-row items-center justify-center gap-2 rounded-full py-3.5"
          >
            <Phone size={14} color={C.paper2} />
            <Mono bold color={C.paper2} tracking={1} className="text-[11px]">
              OPEN CRISIS PROTOCOL
            </Mono>
          </GradientAction>
        </ScrollView>
      </View>
    );
  }

  const next = BOOK_LESSONS.find(
    (item) => item.number > lesson.number && lessonUnlocked(item, track),
  );

  return (
    <KeyboardAvoidingView
      className="bg-paper flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StackHeader title={header} tint={tint} fallback="/(tabs)/learn" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={tint}>
          {`PART ${lesson.part} · ${BOOK_PARTS[lesson.part].title.toUpperCase()}`}
        </Eyebrow>
        <Display className="mt-2 text-4xl">{lesson.title}</Display>
        {lesson.number === 12 && track === 'green' ? (
          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-4">
            <Mono className="text-[10px]">
              Welcome back. Parts 3 and 5 belong to the Blue Track, so the Green Track goes straight
              from Lesson 7 to here. You haven’t missed anything you need.
            </Mono>
          </Panel>
        ) : null}

        <Panel tint={tint} className="mt-6">
          <Eyebrow color={tint}>YOU’LL BE ABLE TO</Eyebrow>
          <View className="mt-3 gap-2.5">
            {lesson.learn.map((line) => (
              <View key={line} className="flex-row items-start gap-2.5">
                <View
                  className="mt-1.5 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: tint }}
                />
                <Body className="flex-1">{line}</Body>
              </View>
            ))}
          </View>
        </Panel>

        {lesson.sayIt ? (
          <Panel tint={C.modC} className="mt-4">
            <Eyebrow color={C.modC}>SAY IT OUT LOUD</Eyebrow>
            <View className="mt-3 gap-2">
              {lesson.sayIt.map((line) => (
                <Body key={line} color={C.ink}>{`“${line}”`}</Body>
              ))}
            </View>
          </Panel>
        ) : null}

        <View className="mt-6">
          <Eyebrow color={C.inkFaint}>MY NOTES · SAVED ON THIS DEVICE ONLY</Eyebrow>
          <Body className="mt-2">{lesson.prompt}</Body>
          <TextInput
            accessibilityLabel={lesson.prompt}
            value={note}
            onChangeText={(text) => setLessonNote(lesson.number, text)}
            multiline
            textAlignVertical="top"
            placeholder="In your own words"
            placeholderTextColor={C.inkFaint}
            className="mt-3 rounded-2xl p-4 text-[13px]"
            style={{
              minHeight: 120,
              color: C.inkSoft,
              backgroundColor: C.card,
              borderWidth: 1,
              borderColor: C.hairline,
              fontFamily: 'Inter_400Regular',
            }}
          />
        </View>

        <Panel tint={tint} fill={0.1} stroke={0.3} className="mt-6">
          <Eyebrow color={tint}>KEY TAKEAWAY</Eyebrow>
          <Display className="mt-2 text-2xl">{`“${lesson.takeaway}”`}</Display>
        </Panel>

        {lesson.tool ? (
          <TintedRow tint={tint} className="mt-4" onPress={() => router.push(lesson.tool!.href)}>
            <View className="flex-row items-center justify-between gap-3">
              <Mono bold color={tint} className="flex-1 text-[11px]" tracking={1}>
                {lesson.tool.label.toUpperCase()}
              </Mono>
              <ArrowRight size={14} color={alpha(tint, 0.85)} />
            </View>
          </TintedRow>
        ) : null}

        {next ? (
          <TintedRow
            tint={C.inkFaint}
            fill={0.03}
            className="mt-3"
            onPress={() =>
              router.replace({ pathname: '/lesson/[n]', params: { n: String(next.number) } })
            }
          >
            <View className="flex-row items-center justify-between gap-3">
              <Mono className="flex-1 text-[11px]">{`Next · Lesson ${next.number}: ${next.title}`}</Mono>
              <ArrowRight size={14} color={C.inkFaint} />
            </View>
          </TintedRow>
        ) : null}
        <BrandFooter className="mt-8" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
