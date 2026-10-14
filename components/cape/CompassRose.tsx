import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { alpha } from '@/lib/colors';
import type { CompassNode } from '@/lib/data/compass';

const ART = require('@/assets/images/match-compass-gps.jpg');
const ARTWORK_RATIO = 1180 / 542;
const HOTSPOT = 52;

/**
 * "5 Decision GPS Superpowers" compass artwork with a tap target on each
 * M.A.T.C.H. pillar. The selected pillar gets a ring in its module colour.
 */
export function CompassRose({
  nodes,
  onSelect,
  selectedId,
  briefingHint,
}: {
  nodes: CompassNode[];
  onSelect: (id: CompassNode['id']) => void;
  selectedId: string | null;
  briefingHint: string;
}) {
  const [width, setWidth] = useState(0);
  const height = width / ARTWORK_RATIO;

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ width: '100%', aspectRatio: ARTWORK_RATIO }}
    >
      <Image
        source={ART}
        accessible
        accessibilityRole="image"
        accessibilityLabel="M.A.T.C.H. compass: a gold compass on a red cape, surrounded by five glowing pillars. M is Health Armor, A is Built-In Radar, T is Safety Kit, C is Strongest Voice, and H is Daily Superpower."
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
      />
      {width > 0
        ? nodes.map((node) => {
            const selected = selectedId === node.id;
            return (
              <Pressable
                key={node.id}
                accessibilityRole="button"
                accessibilityLabel={`${node.letter}, ${node.callsign}. ${node.title}`}
                accessibilityHint={briefingHint}
                accessibilityState={{ selected }}
                onPress={() => onSelect(node.id)}
                className="absolute rounded-full active:opacity-60"
                style={{
                  left: node.spot.x * width - HOTSPOT / 2,
                  top: node.spot.y * height - HOTSPOT / 2,
                  width: HOTSPOT,
                  height: HOTSPOT,
                  borderWidth: selected ? 3 : 0,
                  borderColor: node.color,
                  backgroundColor: selected ? alpha(node.color, 0.12) : 'transparent',
                }}
              />
            );
          })
        : null}
    </View>
  );
}
