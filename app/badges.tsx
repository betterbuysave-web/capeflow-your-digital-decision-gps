import { ScrollView, View } from 'react-native';
import { Lock } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Rail } from '@/components/cape/Type';
import { StackHeader } from '@/components/cape/Screen';
import { C, alpha, wash } from '@/lib/colors';
import { badgesForTrack } from '@/lib/data/badges';
import { trackFor } from '@/lib/data/content';
import { useCapeStore } from '@/lib/store/useCapeStore';

export default function BadgeCabinet() {
  const storedBadges = useCapeStore((s) => s.badges);
  const gradeBand = useCapeStore((s) => s.gradeBand);
  const BADGES = badgesForTrack(trackFor(gradeBand));
  const badges = storedBadges.filter((id) => BADGES.some((badge) => badge.id === id));
  const earned = badges.length;

  return (
    <View className="bg-paper flex-1">
      <StackHeader title="Badge Cabinet" tint={C.gold} fallback="/(tabs)/me" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-6 pb-16"
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={C.gold}>BADGES</Eyebrow>
        <Display className="mt-2 text-4xl">One module, one badge, one decision.</Display>
        <Body className="mt-3">
          Badges track what you have actually practiced. Nothing is public and nothing is compared
          to anyone else.
        </Body>

        <View className="mt-5">
          <View className="mb-2 flex-row items-center justify-between">
            <Mono bold color={C.gold} className="text-[10px]" tracking={1.5}>
              {earned} OF {BADGES.length} EARNED
            </Mono>
            <Mono className="text-[10px]" color={alpha(C.inkFaint, 0.7)}>
              {Math.round((earned / BADGES.length) * 100)}%
            </Mono>
          </View>
          <Rail value={(earned / BADGES.length) * 100} color={C.gold} height={5} />
        </View>

        <View className="mt-6 flex-row flex-wrap gap-3">
          {BADGES.map((badge) => {
            const has = badges.includes(badge.id);
            return (
              <View
                key={badge.id}
                className="flex-1 basis-[45%] rounded-2xl p-4"
                style={{
                  backgroundColor: has ? wash(badge.tint, 0.12) : C.card,
                  borderWidth: 1,
                  borderColor: alpha(has ? badge.tint : C.ink, has ? 0.45 : 0.12),
                }}
              >
                <View className="flex-row items-center justify-between">
                  <Mono className="text-2xl" color={C.ink}>
                    {has ? badge.emoji : '🔒'}
                  </Mono>
                  {has ? null : <Lock size={12} color={alpha(C.inkFaint, 0.5)} />}
                </View>
                <Mono
                  bold
                  color={has ? badge.tint : alpha(C.inkFaint, 0.7)}
                  className="mt-2.5 text-[11px]"
                >
                  {badge.name}
                </Mono>
                <Mono className="mt-1 text-[9px]" color={alpha(C.inkFaint, has ? 0.75 : 0.55)}>
                  {badge.requirement}
                </Mono>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
