import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import { ShieldAlert } from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow } from '@/components/cape/Type';
import { GhostButton, MetallicButton } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { C } from '@/lib/colors';

export function CanonGate({
  title,
  copy,
  actionLabel,
  onContinue,
  onReturn,
}: {
  title: string;
  copy: string;
  actionLabel: string;
  onContinue: () => void;
  onReturn?: () => void;
}) {
  return (
    <View className="bg-paper flex-1">
      <StackHeader title={title} tint={C.azure} fallback="/(tabs)/learn" />
      <ScrollView className="flex-1" contentContainerClassName="px-5 py-8">
        <ShieldAlert size={48} color={C.azure} />
        <Eyebrow className="mt-6" color={C.azure}>
          CAPE Youth Edition · Track gate
        </Eyebrow>
        <Display className="mt-3 text-4xl">{title}</Display>
        <Body className="mt-5">{copy}</Body>
        <GhostButton
          className="mt-6"
          label="Urgent help"
          onPress={() => router.push('/emergency-directory')}
        />
        <BrandFooter className="mt-8" />
      </ScrollView>
      <View className="bg-paper-2 pb-safe-offset-4 gap-3 px-5 pt-4">
        <MetallicButton label={actionLabel} onPress={onContinue} />
        {onReturn ? <GhostButton label="Choose another track" onPress={onReturn} /> : null}
      </View>
    </View>
  );
}
