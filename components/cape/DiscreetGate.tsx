import { useEffect, useRef, useState } from 'react';
import { AppState, Pressable, ScrollView, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { MessageSquare, Phone } from 'lucide-react-native';

import { SafeAreaView } from '@/components/ui/primitives/SafeAreaView';
import { PinPad } from '@/components/cape/PinPad';
import { Body, Display, Mono } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { hashPin } from '@/lib/discreet';
import { openUrgentLink, smsURL } from '@/lib/urgentLinks';
import { useCapeStore } from '@/lib/store/useCapeStore';

function useHydrated() {
  const [hydrated, setHydrated] = useState(() => useCapeStore.persist.hasHydrated());
  useEffect(() => {
    const off = useCapeStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useCapeStore.persist.hasHydrated());
    return off;
  }, []);
  return hydrated;
}

/**
 * Discreet mode lock. When a PIN is set, the app opens locked and locks
 * again whenever it goes to the background. Emergency calls never need it.
 */
export function DiscreetGate() {
  const hydrated = useHydrated();
  const pinHash = useCapeStore((s) => s.discreetPin);
  const [unlocked, setUnlocked] = useState(false);
  const wasActive = useRef(true);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background') wasActive.current = false;
      if (state === 'active' && !wasActive.current) {
        wasActive.current = true;
        setUnlocked(false);
      }
    });
    return () => sub.remove();
  }, []);

  if (!hydrated || !pinHash || unlocked) return null;
  return <LockScreen pinHash={pinHash} onUnlock={() => setUnlocked(true)} />;
}

function LockScreen({ pinHash, onUnlock }: { pinHash: string; onUnlock: () => void }) {
  const resetAll = useCapeStore((s) => s.resetAll);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [forgot, setForgot] = useState(false);

  const check = (pin: string) => {
    if (hashPin(pin) === pinHash) {
      setError(null);
      onUnlock();
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
    setError('That PIN didn’t match. Try again.');
    setAttempt((n) => n + 1);
  };

  const erase = async () => {
    await resetAll();
    onUnlock();
    router.replace('/');
  };

  return (
    <View
      className="bg-paper absolute inset-0"
      style={{ zIndex: 1000, elevation: 1000 }}
      accessibilityViewIsModal
    >
      <SafeAreaView edges={['top']} className="bg-paper" />
      <ScrollView contentContainerClassName="items-center px-6 pt-10 pb-12">
        <Display className="text-4xl">Enter your PIN</Display>
        <Body className="mt-2 text-center">This app is locked.</Body>

        <View className="mt-8 w-full items-center">
          <PinPad onComplete={check} resetKey={attempt} error={error} />
        </View>

        <View className="mt-10 w-full max-w-[340px] gap-3">
          <Mono bold color={C.no} tracking={2} className="text-center text-[12px]">
            EMERGENCY · NO PIN NEEDED
          </Mono>
          <View className="flex-row gap-3">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Call 911"
              onPress={() => void openUrgentLink('tel:911')}
              className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
              style={{ backgroundColor: C.no }}
            >
              <Phone size={16} color={C.paper2} />
              <Mono bold color={C.paper2} className="text-[13px]">
                Call 911
              </Mono>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Call 988, the Suicide and Crisis Lifeline"
              onPress={() => void openUrgentLink('tel:988')}
              className="min-h-12 flex-1 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
              style={{ backgroundColor: C.flame }}
            >
              <Phone size={16} color={C.paper2} />
              <Mono bold color={C.paper2} className="text-[13px]">
                Call 988
              </Mono>
            </Pressable>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Text 988, the Suicide and Crisis Lifeline"
            onPress={() => void openUrgentLink(smsURL('988', ''))}
            className="min-h-12 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
            style={{ borderWidth: 1, borderColor: alpha(C.flame, 0.5) }}
          >
            <MessageSquare size={16} color={C.flame} />
            <Mono bold color={C.flame} className="text-[13px]">
              Text 988
            </Mono>
          </Pressable>
        </View>

        <View className="mt-10 w-full max-w-[340px] items-center">
          {forgot ? (
            <View
              className="w-full rounded-2xl p-4"
              style={{
                backgroundColor: alpha(C.no, 0.06),
                borderWidth: 1,
                borderColor: alpha(C.no, 0.3),
              }}
            >
              <Body className="text-center">
                Without the PIN, the only way in is to erase everything CAPE Flow saved on this
                phone: notes, progress, Safety Circle and settings.
              </Body>
              <View className="mt-4 flex-row gap-3">
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setForgot(false)}
                  className="min-h-11 flex-1 items-center justify-center rounded-full active:opacity-70"
                  style={{ borderWidth: 1, borderColor: alpha(C.ink, 0.2) }}
                >
                  <Mono bold color={C.inkSoft} className="text-[13px]">
                    Cancel
                  </Mono>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Erase everything and remove the PIN"
                  onPress={() => void erase()}
                  className="min-h-11 flex-1 items-center justify-center rounded-full active:opacity-80"
                  style={{ backgroundColor: C.no }}
                >
                  <Mono bold color={C.paper2} className="text-[13px]">
                    Erase & start over
                  </Mono>
                </Pressable>
              </View>
            </View>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => setForgot(true)}
              className="min-h-11 justify-center px-4 active:opacity-60"
            >
              <Mono color={C.inkSoft} className="text-[13px] underline">
                Forgot PIN?
              </Mono>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
