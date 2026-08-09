import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { ExitCardSection } from '@/components/cape/cafe/ExitCardSection';
import { FacilitatorBar, FacilitatorToggle } from '@/components/cape/cafe/FacilitatorBar';
import { FriesSection } from '@/components/cape/cafe/FriesSection';
import { JourneyBar } from '@/components/cape/cafe/JourneyBar';
import { MenuSection } from '@/components/cape/cafe/MenuSection';
import { PracticeSection } from '@/components/cape/cafe/PracticeSection';
import { RightsSection } from '@/components/cape/cafe/RightsSection';
import { StackHeader } from '@/components/cape/Screen';
import { TacticalBackdrop } from '@/components/cape/TacticalBackdrop';
import { C } from '@/lib/colors';
import type { CafeStation } from '@/lib/data/cafe';

export default function ConsentCafe() {
  const { width, height } = useWindowDimensions();
  const [station, setStation] = useState<CafeStation>('fries');
  const [visited, setVisited] = useState<string[]>(['fries']);
  const [facilitator, setFacilitator] = useState(false);

  const go = (next: CafeStation) => {
    setStation(next);
    setVisited((prev) => (prev.includes(next) ? prev : [...prev, next]));
  };

  return (
    <View className="bg-ink flex-1">
      <TacticalBackdrop width={width} height={height} tint={C.amber} />
      <StackHeader
        title="The Consent Café"
        tint={C.amber}
        fallback="/(tabs)/tools"
        right={
          <FacilitatorToggle active={facilitator} onPress={() => setFacilitator((on) => !on)} />
        }
      />
      {facilitator ? <FacilitatorBar onExit={() => setFacilitator(false)} /> : null}
      <JourneyBar active={station} visited={visited} onSelect={go} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {station === 'fries' ? <FriesSection /> : null}
          {station === 'menu' ? <MenuSection /> : null}
          {station === 'rights' ? <RightsSection /> : null}
          {station === 'practice' ? <PracticeSection /> : null}
          {station === 'exit' ? <ExitCardSection /> : null}

          <BrandFooter className="mt-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
