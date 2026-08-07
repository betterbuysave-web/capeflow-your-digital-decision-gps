import { useState } from 'react';
import { Image, View } from 'react-native';

import { C, alpha } from '@/lib/colors';
import { cn } from '@/lib/utils';

const BANNER = require('@/assets/images/cape-flow-banner.png');
const BANNER_ASPECT = 1832 / 1035;

/** CAPE FLOW brand banner — wordmark, telemetry trail, and the Decision GPS line. */
export function BrandBanner({ className }: { className?: string }) {
  const [width, setWidth] = useState(0);
  const height = width > 0 ? Math.round(width / BANNER_ASPECT) : 0;

  return (
    <View
      className={cn('overflow-hidden rounded-2xl', className)}
      style={{
        borderWidth: 1,
        borderColor: alpha(C.teal, 0.2),
        backgroundColor: alpha(C.teal, 0.03),
        shadowColor: C.teal,
        shadowOpacity: 0.3,
        shadowRadius: 22,
      }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {height > 0 ? (
        <Image
          source={BANNER}
          resizeMode="contain"
          accessibilityLabel="CAPE FLOW — Your Digital Decision GPS"
          style={{ width, height }}
        />
      ) : null}
    </View>
  );
}
