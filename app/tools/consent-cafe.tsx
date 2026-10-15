import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { BrandFooter } from '@/components/cape/BrandFooter';
import { ExitCardSection } from '@/components/cape/cafe/ExitCardSection';
import { FriesSection } from '@/components/cape/cafe/FriesSection';
import { JourneyBar } from '@/components/cape/cafe/JourneyBar';
import { MenuSection } from '@/components/cape/cafe/MenuSection';
import { PracticeSection } from '@/components/cape/cafe/PracticeSection';
import { RightsSection } from '@/components/cape/cafe/RightsSection';
import { StackHeader } from '@/components/cape/Screen';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { C } from '@/lib/colors';
import { CAFE_STATIONS, type CafeStation } from '@/lib/data/cafe';
import { ActivityGuide, NextStepButton } from '@/components/cape/ActivityGuide';

/** What to do at each Café station. */
const STATION_GUIDE: Record<
  CafeStation,
  { what: string; steps: string[]; outcome: string; minutes: number }
> = {
  fries: {
    what: 'Consent works like ordering at a café: you choose, you can change your order, and yes to one dish is not yes to the whole menu. F.R.I.E.S. is the five-part check.',
    steps: [
      'Tap each letter to read what it means and see a real-life example.',
      'Play F.R.I.E.S. Detective: read each case and pick the letter that is missing.',
      'Then tap the next station at the top: My Menu.',
    ],
    outcome: 'the five letters, and practice spotting when one is missing.',
    minutes: 8,
  },
  menu: {
    what: 'Your personal menu lists what you are comfortable with, what needs a conversation first, and what is never on the table.',
    steps: [
      'Read the starter items in each course.',
      'Move, delete, or add items so it fits you.',
      'Remember: you can change your menu any time.',
    ],
    outcome: 'your own menu of boundaries, saved on this phone.',
    minutes: 5,
  },
  rights: {
    what: 'Every customer has rights. So do you, in every friendship and relationship.',
    steps: ['Read the six rights.', 'Flip each myth card to see the truth.'],
    outcome: 'the myths that trip people up, and the truth behind each one.',
    minutes: 4,
  },
  practice: {
    what: 'Practice makes the words come easier when it counts.',
    steps: [
      'Detective cases: tap every principle you see broken, then read the verdict.',
      'Role-play cards: read both responses with a friend, then talk about the reflection question.',
    ],
    outcome: 'practice hearing a strong response and a problem one.',
    minutes: 10,
  },
  exit: {
    what: 'The exit card is where you lock in what you learned.',
    steps: ['Answer the four questions in your own words.', 'Rate how confident you feel.'],
    outcome: 'a finished exit card, saved on this phone.',
    minutes: 4,
  },
};

export default function ConsentCafe() {
  const [station, setStation] = useState<CafeStation>('fries');
  const [visited, setVisited] = useState<string[]>(['fries']);

  const go = (next: CafeStation) => {
    setStation(next);
    setVisited((prev) => (prev.includes(next) ? prev : [...prev, next]));
  };

  const nextStation = CAFE_STATIONS[CAFE_STATIONS.findIndex((st) => st.id === station) + 1];

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.amber} />
      <StackHeader title="The Consent Café" tint={C.amber} fallback="/(tabs)/tools" />
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
          <ActivityGuide
            className="mb-6"
            tint={C.amber}
            minutes={STATION_GUIDE[station].minutes}
            what={STATION_GUIDE[station].what}
            steps={STATION_GUIDE[station].steps}
            outcome={STATION_GUIDE[station].outcome}
          />
          {station === 'fries' ? <FriesSection /> : null}
          {station === 'menu' ? <MenuSection /> : null}
          {station === 'rights' ? <RightsSection /> : null}
          {station === 'practice' ? <PracticeSection /> : null}
          {station === 'exit' ? <ExitCardSection /> : null}

          {nextStation ? (
            <NextStepButton
              label={`NEXT STATION: ${nextStation.label}`}
              tint={C.amber}
              onPress={() => go(nextStation.id)}
            />
          ) : null}

          <BrandFooter className="mt-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
