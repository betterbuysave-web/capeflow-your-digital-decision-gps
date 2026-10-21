import { useEffect, useState } from 'react';
import { AccessibilityInfo, Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Delete } from '@/lib/icons';

import { Display, Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { PIN_LENGTH } from '@/lib/discreet';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'] as const;

/**
 * Four-dot PIN entry with a large keypad. Calls `onComplete` once all
 * digits are in; `resetKey` changes clear the entry (after a wrong PIN).
 */
export function PinPad({
  onComplete,
  resetKey = 0,
  error,
}: {
  onComplete: (pin: string) => void;
  resetKey?: number;
  error?: string | null;
}) {
  const [pin, setPin] = useState('');

  useEffect(() => setPin(''), [resetKey]);

  useEffect(() => {
    if (error) AccessibilityInfo.announceForAccessibility(error);
  }, [error, resetKey]);

  const press = (key: (typeof KEYS)[number]) => {
    if (key === '') return;
    void Haptics.selectionAsync().catch(() => undefined);
    if (key === 'del') {
      setPin((p) => p.slice(0, -1));
      return;
    }
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + key;
    setPin(next);
    if (next.length === PIN_LENGTH) onComplete(next);
  };

  return (
    <View className="items-center">
      <View
        accessible
        accessibilityLabel={`${pin.length} of ${PIN_LENGTH} digits entered`}
        className="flex-row gap-4"
      >
        {Array.from({ length: PIN_LENGTH }, (_, i) => (
          <View
            key={i}
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: i < pin.length ? (error ? C.no : C.ink) : 'transparent',
              borderWidth: 2,
              borderColor: error ? C.no : C.ink,
            }}
          />
        ))}
      </View>
      <Mono color={C.no} className="mt-3 min-h-5 text-center text-[13px]">
        {error ?? ''}
      </Mono>

      <View className="mt-4 w-full max-w-[300px] flex-row flex-wrap justify-between gap-y-3">
        {KEYS.map((key) =>
          key === '' ? (
            <View key="blank" className="h-[72px] w-[72px]" />
          ) : (
            <Pressable
              key={key}
              accessibilityRole="button"
              accessibilityLabel={key === 'del' ? 'Delete' : key}
              onPress={() => press(key)}
              className="h-[72px] w-[72px] items-center justify-center rounded-full active:opacity-60"
              style={{
                backgroundColor: key === 'del' ? 'transparent' : C.card,
                borderWidth: key === 'del' ? 0 : 1,
                borderColor: alpha(C.ink, 0.15),
              }}
            >
              {key === 'del' ? (
                <Delete size={24} color={C.inkSoft} />
              ) : (
                <Display className="text-4xl">{key}</Display>
              )}
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
}
