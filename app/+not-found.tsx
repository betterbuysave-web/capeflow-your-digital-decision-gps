import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Off the map' }} />
      <StackHeader title="Off the map" fallback="/" />
      <View className="bg-paper flex-1 items-center justify-center gap-3 px-8">
        <NotebookBackdrop />
        <Eyebrow color={C.teal}>OFF THE MAP</Eyebrow>
        <Display className="text-center text-4xl">This screen doesn&apos;t exist.</Display>
        <Body className="text-center">
          The compass lost this route. Head back and pick a module.
        </Body>
        <Link href="/" asChild>
          <View
            className="mt-4 rounded-full px-6 py-3"
            style={{
              backgroundColor: alpha(C.teal, 0.12),
              borderWidth: 1,
              borderColor: alpha(C.teal, 0.35),
            }}
          >
            <Mono bold color={C.teal} tracking={2} className="text-[13px]">
              BACK TO CAPE FLOW
            </Mono>
          </View>
        </Link>
      </View>
    </>
  );
}
