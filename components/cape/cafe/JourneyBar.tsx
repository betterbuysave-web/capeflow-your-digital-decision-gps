import { Pressable, ScrollView, View } from 'react-native';

import { Mono } from '@/components/cape/Type';
import { CAFE_STATIONS, type CafeStation } from '@/lib/data/cafe';
import { C, alpha } from '@/lib/colors';

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
    <View style={{ borderBottomWidth: 1, borderBottomColor: alpha(C.white, 0.06) }}>
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
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelect(station.id)}
              className="flex-row items-center gap-1.5 rounded-full px-3 py-2 active:opacity-70"
              style={{
                backgroundColor: alpha(station.tint, isActive ? 0.16 : 0.04),
                borderWidth: 1,
                borderColor: alpha(station.tint, isActive ? 0.5 : 0.12),
              }}
            >
              <Mono className="text-[11px]">{station.emoji}</Mono>
              <Mono
                bold
                tracking={1.5}
                color={isActive ? station.tint : alpha(C.slateFaint, 0.65)}
                className="text-[9px]"
              >
                {station.label}
              </Mono>
            </Pressable>
          );
        })}
      </ScrollView>

      <View className="flex-row items-center gap-2 px-5 pb-3">
        <Mono bold tracking={2} color={alpha(C.slateFaint, 0.5)} className="text-[8px]">
          JOURNEY
        </Mono>
        <View className="flex-1 flex-row items-center">
          {CAFE_STATIONS.map((station, index) => {
            const done = visited.includes(station.id);
            const isActive = index === activeIndex;
            const tint = isActive || done ? station.tint : C.slateFaint;
            return (
              <View key={station.id} className="flex-1 flex-row items-center">
                <View
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: alpha(tint, isActive ? 1 : done ? 0.45 : 0.12),
                    borderWidth: 1,
                    borderColor: alpha(tint, isActive ? 1 : 0.3),
                  }}
                />
                {index < CAFE_STATIONS.length - 1 ? (
                  <View
                    className="h-px flex-1"
                    style={{ backgroundColor: alpha(index < activeIndex ? C.teal : C.white, 0.14) }}
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
