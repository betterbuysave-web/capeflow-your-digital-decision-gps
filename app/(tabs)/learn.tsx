import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, CircleCheck, Lock, PencilLine } from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';

import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { TintedRow } from '@/components/cape/Buttons';
import { MatchCompass } from '@/components/cape/MatchCompass';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { C, alpha } from '@/lib/colors';
import { MATCH_MODULES, lessonsForTrack, moduleTagline } from '@/lib/data/match';
import { FRIES } from '@/lib/data/boundaries';
import { trackFor } from '@/lib/data/content';
import { BOOK_LESSONS, BOOK_PARTS, lessonUnlocked } from '@/lib/data/lessons';
import { moduleProgress, useCapeStore } from '@/lib/store/useCapeStore';

export default function Learn() {
  const completedLessons = useCapeStore((s) => s.completedLessons);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const lessonNotes = useCapeStore((s) => s.lessonNotes);
  const track = trackFor(gradeBand);

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="M.A.T.C.H." tint={C.teal} fallback="/(tabs)" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.teal}>THE FRAMEWORK</Eyebrow>
        <Display className="mt-2 text-4xl">What does M.A.T.C.H. stand for?</Display>
        <Body className="mt-3">
          Five MATCH letters. One compass. Health choices, awareness, trusted support, consent, and
          choosing your pace.
        </Body>

        <View className="mt-5">
          <MatchCompass />
        </View>

        <View className="mt-8 gap-3">
          {MATCH_MODULES.map((mod) => {
            const progress = moduleProgress(mod.id, completedLessons, track);
            const available = lessonsForTrack(mod, track);
            const done = available.filter((l) => completedLessons.includes(l.id)).length;
            return (
              <TintedRow
                key={mod.id}
                tint={mod.color}
                fill={0.05}
                stroke={0.16}
                onPress={() => router.push({ pathname: '/module/[id]', params: { id: mod.id } })}
              >
                <View className="flex-row items-start gap-4">
                  <View
                    className="h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: alpha(mod.color, 0.1),
                      borderWidth: 1,
                      borderColor: alpha(mod.color, 0.25),
                    }}
                  >
                    <Display color={mod.color} className="text-2xl">
                      {mod.letter}
                    </Display>
                  </View>
                  <View className="flex-1">
                    <View className="mb-1 flex-row items-center justify-between">
                      <View className="flex-1 flex-row items-start gap-2">
                        <Mono className="text-sm">{mod.emoji}</Mono>
                        <Mono bold color={mod.color} className="flex-1 text-[14px]">
                          {mod.name}
                        </Mono>
                      </View>
                      {progress === 100 ? <CircleCheck size={15} color={mod.color} /> : null}
                    </View>
                    <Mono className="text-[13px]">{moduleTagline(mod, track)}</Mono>
                    <View className="mt-2.5">
                      <Rail value={progress} color={mod.color} />
                    </View>
                    <View className="mt-1.5 flex-row items-center justify-between">
                      <Mono className="text-[12px]" color={alpha(C.inkFaint, 0.7)}>
                        {done}/{available.length} lessons
                      </Mono>
                      <ArrowRight size={13} color={alpha(mod.color, 0.8)} />
                    </View>
                  </View>
                </View>
              </TintedRow>
            );
          })}
        </View>

        <View className="mt-10">
          <Eyebrow color={C.teal}>
            {`CAPE YOUTH EDITION · ${BOOK_LESSONS.filter((l) => lessonUnlocked(l, track)).length} LESSONS`}
          </Eyebrow>
          <Display className="mt-2 text-3xl">One lesson per chapter.</Display>
          <Body className="mt-2">
            Follow along with your class. Your notes stay on this device.
          </Body>
          {([1, 2, 3, 4, 5] as const)
            .filter((part) => BOOK_PARTS[part].track === 'both' || track === 'blue')
            .map((part) => {
              const partTint = BOOK_PARTS[part].track === 'blue' ? C.azure : C.teal;
              return (
                <View key={part} className="mt-5 gap-2">
                  <Mono bold color={partTint} tracking={1} className="text-[13px]">
                    {`PART ${part} · ${BOOK_PARTS[part].title.toUpperCase()}`}
                  </Mono>
                  {BOOK_LESSONS.filter((l) => l.part === part && lessonUnlocked(l, track)).map(
                    (lesson) => {
                      const open = lessonUnlocked(lesson, track);
                      const hasNote = !!lessonNotes[String(lesson.number)]?.trim();
                      return (
                        <TintedRow
                          key={lesson.number}
                          tint={open ? partTint : C.inkFaint}
                          fill={open ? 0.05 : 0.03}
                          className="p-3"
                          accessibilityLabel={`Lesson ${lesson.number}, ${lesson.title}`}
                          onPress={() =>
                            router.push({
                              pathname: '/lesson/[n]',
                              params: { n: String(lesson.number) },
                            })
                          }
                        >
                          <View className="flex-row items-center gap-3">
                            <Display color={open ? partTint : C.inkFaint} className="w-7 text-2xl">
                              {lesson.number}
                            </Display>
                            <Mono
                              className="flex-1 text-[13px]"
                              color={open ? C.inkSoft : C.inkFaint}
                            >
                              {lesson.title}
                            </Mono>
                            {!open ? (
                              <Lock size={13} color={C.inkFaint} />
                            ) : hasNote ? (
                              <PencilLine size={13} color={partTint} />
                            ) : (
                              <ArrowRight size={13} color={alpha(partTint, 0.8)} />
                            )}
                          </View>
                        </TintedRow>
                      );
                    },
                  )}
                </View>
              );
            })}
        </View>

        {track === 'blue' ? (
          <View className="mt-8 gap-3">
            <Eyebrow color={C.azure}>BLUE TRACK · PARTS 3 AND 5</Eyebrow>
            {(['3', '5'] as const).map((part) => (
              <TintedRow
                key={part}
                tint={C.azure}
                accessibilityLabel={`Part ${part}, Blue Track companion topics`}
                onPress={() => router.push({ pathname: '/book-part/[part]', params: { part } })}
              >
                <Mono bold className="text-[14px]" color={C.azure}>
                  Part {part} · Companion topics
                </Mono>
              </TintedRow>
            ))}
          </View>
        ) : null}

        <View className="mt-10">
          <Eyebrow color={C.modC}>THE F.R.I.E.S. CHECK</Eyebrow>
          <Display className="mt-2 text-3xl">Consent, five letters.</Display>
          <View className="mt-4 gap-2">
            {FRIES.map((letter) => (
              <Panel key={letter.letter} tint={C.modC} fill={0.04} stroke={0.15} className="p-3">
                <View className="flex-row items-center gap-3">
                  <Display color={C.modC} className="w-6 text-2xl">
                    {letter.letter}
                  </Display>
                  <View className="flex-1">
                    <Mono bold color={C.modC} className="text-[13px]">
                      {letter.word}
                    </Mono>
                    <Mono className="mt-0.5 text-[13px]">{letter.detail}</Mono>
                  </View>
                </View>
              </Panel>
            ))}
          </View>
        </View>
        <BrandFooter className="mt-8" />
      </ScrollView>
    </View>
  );
}
