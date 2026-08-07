import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, CircleCheck } from 'lucide-react-native';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { TintedRow } from '@/components/cape/Buttons';
import { MatchCompass } from '@/components/cape/MatchCompass';
import { C, alpha } from '@/lib/colors';
import { MATCH_MODULES, lessonsForTrack } from '@/lib/data/match';
import { FRIES } from '@/lib/data/boundaries';
import { trackFor } from '@/lib/data/content';
import { moduleProgress, useCapeStore } from '@/lib/store/useCapeStore';

export default function Learn() {
  const completedLessons = useCapeStore((s) => s.completedLessons);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const track = trackFor(gradeBand);

  return (
    <View className="bg-ink flex-1">
      <SafeAreaView edges={['top']} className="bg-ink" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-4 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.teal}>THE FRAMEWORK</Eyebrow>
        <Display className="mt-2 text-4xl">What does M.A.T.C.H. stand for?</Display>
        <Body className="mt-3">
          Five modules. One compass. Each builds a layer of real-world readiness — from medical
          knowledge to communication skills to daily habits.
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
                      <View className="flex-row items-center gap-2">
                        <Mono className="text-sm">{mod.emoji}</Mono>
                        <Mono bold color={mod.color} className="text-[12px]">
                          {mod.name}
                        </Mono>
                      </View>
                      {progress === 100 ? <CircleCheck size={15} color={mod.color} /> : null}
                    </View>
                    <Mono className="text-[10px]">{mod.tagline}</Mono>
                    <View className="mt-2.5">
                      <Rail value={progress} color={mod.color} />
                    </View>
                    <View className="mt-1.5 flex-row items-center justify-between">
                      <Mono className="text-[9px]" color={alpha(C.slateFaint, 0.7)}>
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
                    <Mono bold color={C.modC} className="text-[11px]">
                      {letter.word}
                    </Mono>
                    <Mono className="mt-0.5 text-[10px]">{letter.detail}</Mono>
                  </View>
                </View>
              </Panel>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
