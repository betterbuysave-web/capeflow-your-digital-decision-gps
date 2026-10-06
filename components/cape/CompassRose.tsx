import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { Display } from '@/components/cape/Type';
import { C, alpha, wash } from '@/lib/colors';
import type { CompassNode } from '@/lib/data/compass';

const MARKER = 44;
const ARTWORK_RATIO = 1275 / 1169;

function polar(cx: number, cy: number, radius: number, bearing: number) {
  const angle = ((bearing - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

/** Supplied compass artwork with the five interactive M.A.T.C.H. markers. */
export function CompassRose({
  nodes,
  onSelect,
}: {
  nodes: CompassNode[];
  onSelect: (id: CompassNode['id']) => void;
}) {
  const [width, setWidth] = useState(0);
  const height = width / ARTWORK_RATIO;
  const radius = Math.max(0, Math.min(width * 0.36, height / 2 - MARKER / 2));

  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ width: '100%', aspectRatio: ARTWORK_RATIO }}
    >
      <Image
        source={require('@/assets/images/match-compass.png')}
        accessibilityLabel="Gold compass with a red and silver needle"
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
      />
      {width > 0
        ? nodes.map((node) => {
            const position = polar(width / 2, height / 2, radius, node.bearing);
            return (
              <Pressable
                key={node.id}
                accessibilityRole="button"
                accessibilityLabel={`${node.letter} — ${node.callsign}`}
                onPress={() => onSelect(node.id)}
                className="absolute items-center justify-center rounded-full active:opacity-70"
                style={{
                  left: position.x - MARKER / 2,
                  top: position.y - MARKER / 2,
                  width: MARKER,
                  height: MARKER,
                  backgroundColor: wash(node.color, 0.16, C.card),
                  borderWidth: 1.5,
                  borderColor: alpha(node.color, 0.85),
                }}
              >
                <Display color={node.color} className="text-xl">
                  {node.letter}
                </Display>
              </Pressable>
            );
          })
        : null}
    </View>
  );
}
