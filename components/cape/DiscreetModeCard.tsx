import { useState } from 'react';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { EyeOff, ShieldCheck } from '@/lib/icons';

import { PinPad } from '@/components/cape/PinPad';
import { Body, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { hashPin } from '@/lib/discreet';
import { useCapeStore } from '@/lib/store/useCapeStore';

type Step = 'idle' | 'create' | 'confirm' | 'disable';

/** My Gear tab: turn discreet mode (PIN lock; Blue also hides the PEP countdown) on or off. */
export function DiscreetModeCard({ className }: { className?: string }) {
  const pinHash = useCapeStore((s) => s.discreetPin);
  const blue = useCapeStore((s) => s.gradeBand === '9-12');
  const setDiscreetPin = useCapeStore((s) => s.setDiscreetPin);
  const [step, setStep] = useState<Step>('idle');
  const [first, setFirst] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const on = pinHash !== null;

  const fail = (message: string) => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
    setError(message);
    setAttempt((n) => n + 1);
  };

  const done = () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    setStep('idle');
    setFirst('');
    setError(null);
  };

  const onPin = (pin: string) => {
    if (step === 'create') {
      setFirst(pin);
      setError(null);
      setStep('confirm');
      setAttempt((n) => n + 1);
    } else if (step === 'confirm') {
      if (pin !== first) {
        setStep('create');
        setFirst('');
        fail('Those didn’t match. Pick your PIN again.');
        return;
      }
      setDiscreetPin(hashPin(pin));
      done();
    } else if (step === 'disable') {
      if (hashPin(pin) !== pinHash) {
        fail('That PIN didn’t match.');
        return;
      }
      setDiscreetPin(null);
      done();
    }
  };

  const prompt =
    step === 'create'
      ? 'Pick a 4-digit PIN'
      : step === 'confirm'
        ? 'Enter it once more'
        : 'Enter your PIN to turn it off';

  return (
    <Panel tint={C.violet} fill={0.05} stroke={0.2} className={className}>
      <View className="flex-row items-center gap-2">
        {on ? <ShieldCheck size={16} color={C.violet} /> : <EyeOff size={16} color={C.violet} />}
        <Eyebrow color={C.violet}>{on ? 'DISCREET MODE · ON' : 'DISCREET MODE'}</Eyebrow>
      </View>
      <Body className="mt-2">
        {blue
          ? 'Share a phone? Discreet mode locks CAPE Flow with a 4-digit PIN every time it opens and hides the PEP countdown from Home and Crisis. Calling 911 or 988 never needs the PIN.'
          : 'Share a phone? Discreet mode locks CAPE Flow with a 4-digit PIN every time it opens, so your notes stay yours. Calling 911 or 988 never needs the PIN.'}
      </Body>

      {step === 'idle' ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setError(null);
            setStep(on ? 'disable' : 'create');
          }}
          className="mt-4 min-h-12 items-center justify-center rounded-full active:opacity-80"
          style={
            on
              ? { borderWidth: 1, borderColor: alpha(C.violet, 0.5) }
              : { backgroundColor: C.violet }
          }
        >
          <Mono bold color={on ? C.violet : C.paper2} tracking={1} className="text-[13px]">
            {on ? 'TURN OFF DISCREET MODE' : 'TURN ON DISCREET MODE'}
          </Mono>
        </Pressable>
      ) : (
        <View className="mt-5 items-center">
          <Mono bold color={C.ink} className="mb-4 text-center text-[14px]">
            {prompt}
          </Mono>
          <PinPad onComplete={onPin} resetKey={attempt} error={error} />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setStep('idle');
              setFirst('');
              setError(null);
            }}
            className="mt-3 min-h-11 justify-center px-4 active:opacity-60"
          >
            <Mono color={C.inkSoft} className="text-[13px] underline">
              Cancel
            </Mono>
          </Pressable>
        </View>
      )}
      <Mono className="mt-3 text-[12px]">
        Forget the PIN and the only way back in is erasing this phone’s CAPE Flow data.
      </Mono>
    </Panel>
  );
}
