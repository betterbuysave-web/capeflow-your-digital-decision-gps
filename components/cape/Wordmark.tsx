import { useState } from 'react';
import { Image, View } from 'react-native';

const BRAND_IMAGE = require('@/assets/images/cape-flow-brand.webp');

/** Shared CAPE Flow logo, preserving the complete supplied brand artwork. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  const [width, setWidth] = useState(0);

  return (
    <View
      style={{ width: '100%', maxWidth: compact ? 240 : 760, alignSelf: 'center' }}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      <Image
        source={BRAND_IMAGE}
        accessibilityLabel="CAPE Flow. The Digital Decision GPS. Moving from Anxiety to Agency. System Active. Wear Your CAPE."
        accessible
        resizeMode="contain"
        style={{ width: '100%', height: (width * 9) / 16 }}
      />
    </View>
  );
}
