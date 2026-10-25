import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { ArrowRight } from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { TintedRow } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  BOOK_LESSONS,
  BOOK_PARTS,
  getBookLesson,
  lessonTool,
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
        <NotebookBackdrop />
        <StackHeader title="Lesson" fallback="/(tabs)/learn" />
        <View className="px-5 pt-6">
          <Body>That lesson is not available.</Body>
        </View>
      </View>
    );
  }

  const tint = lesson.track === 'blue' ? C.azure : C.teal;
  const header = `Lesson ${lesson.number}`;

  if (!lessonUnlocked(lesson, track)) return <Redirect href="/(tabs)/learn" />;

  const tool = lessonTool(lesson, track);
  const next = BOOK_LESSONS.find(
    (item) => item.number > lesson.number && lessonUnlocked(item, track),
  );

  return (
    <KeyboardAvoidingView
      className="bg-paper flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <NotebookBackdrop />
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
            className="mt-3 rounded-2xl p-4 text-[14px]"
            style={{
              minHeight: 120,
              color: C.inkSoft,
              backgroundColor: C.card,
              borderWidth: 1,
              borderColor: C.hairline,
              fontFamily: 'DMSans_400Regular',
            }}
          />
        </View>

        <Panel tint={tint} fill={0.1} stroke={0.3} className="mt-6">
          <Eyebrow color={tint}>KEY TAKEAWAY</Eyebrow>
          <Display className="mt-2 text-2xl">{`“${lesson.takeaway}”`}</Display>
        </Panel>

        {tool ? (
          <TintedRow tint={tint} className="mt-4" onPress={() => router.push(tool.href)}>
            <View className="flex-row items-center justify-between gap-3">
              <Mono bold color={tint} className="flex-1 text-[13px]" tracking={1}>
                {tool.label.toUpperCase()}
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
              <Mono className="flex-1 text-[13px]">{`Next · Lesson ${next.number}: ${next.title}`}</Mono>
              <ArrowRight size={14} color={C.inkFaint} />
            </View>
          </TintedRow>
        ) : null}
        <BrandFooter className="mt-8" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
