import { Pressable, ScrollView, View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { CAFE_STATIONS, type CafeStation } from '@/lib/data/cafe';
import { C, alpha, wash } from '@/lib/colors';

/**
 * Station switcher plus the "your journey" progress rail: a tappable chip per
 * station, with dots marking every station already visited this session.
 */
export function JourneyBar({
  active,
  visited,
  onSelect,
}: {
  active: CafeStation;
  visited: string[];
  onSelect: (station: CafeStation) => void;
}) {
  const activeIndex = CAFE_STATIONS.findIndex((s) => s.id === active);

  return (
    <View
      className="bg-paper-2"
      style={{ borderBottomWidth: 1, borderBottomColor: alpha(C.ink, 0.1) }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-5 py-3"
      >
        {CAFE_STATIONS.map((station) => {
          const isActive = station.id === active;
          return (
            <Pressable
              key={station.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelect(station.id)}
              className="min-h-11 flex-row items-center gap-1.5 rounded-full px-3 py-2 active:opacity-70"
              style={{
                backgroundColor: wash(station.tint, isActive ? 0.16 : 0.05, C.paper2),
                borderWidth: 1,
                borderColor: alpha(station.tint, isActive ? 0.6 : 0.22),
              }}
            >
              <Mono className="text-[13px]">{station.emoji}</Mono>
              <Mono
                bold
                tracking={1.5}
                color={isActive ? station.tint : C.inkFaint}
                className="text-[12px]"
              >
                {station.label}
              </Mono>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 pb-3">
        <Mono bold tracking={2} color={C.inkFaint} className="text-[11px]">
          JOURNEY
        </Mono>
        <View className="flex-1 flex-row items-center">
          {CAFE_STATIONS.map((station, index) => {
            const done = visited.includes(station.id);
            const isActive = index === activeIndex;
            const tint = isActive || done ? station.tint : C.inkFaint;
            return (
              <View key={station.id} className="flex-1 flex-row items-center">
                <View
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: isActive ? tint : done ? wash(tint, 0.5, C.paper2) : C.paper2,
                    borderWidth: 1,
                    borderColor: alpha(tint, isActive ? 1 : 0.4),
                  }}
                />
                {index < CAFE_STATIONS.length - 1 ? (
                  <View
                    className="h-px flex-1"
                    style={{
                      backgroundColor:
                        index < activeIndex ? alpha(C.tealBright, 0.55) : alpha(C.ink, 0.14),
                    }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
