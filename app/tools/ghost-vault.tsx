import { useState, useSyncExternalStore as useHydrationSnapshot } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { Redirect } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Lock, Shield, ShieldCheck, X } from '@/lib/icons';
import { ActivityGuide } from '@/components/cape/ActivityGuide';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { Chip, GradientAction } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Telemetry } from '@/components/cape/Telemetry';
import { VaultCore } from '@/components/cape/VaultCore';
import { C, alpha } from '@/lib/colors';
import { GHOSTS, type GhostDef, SAFETY_EXCEPTION, nodeMeta } from '@/lib/data/ghosts';
import {
  type GhostRecord,
  disarmedCount,
  namedGhostCount,
  useCapeStore,
} from '@/lib/store/useCapeStore';

const subscribeHydration = (notify: () => void) => useCapeStore.persist.onFinishHydration(notify);
const hydrationSnapshot = () => useCapeStore.persist.hasHydrated();

export default function HealthcareAnxietyAudit() {
  const gradeBand = useCapeStore((state) => state.gradeBand);
  const hydrated = useHydrationSnapshot(subscribeHydration, hydrationSnapshot, () => false);
  if (!hydrated)
    return (
      <View className="bg-paper flex-1">
        <StackHeader title="Healthcare Anxiety Audit" tint={C.violet} fallback="/(tabs)/tools" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={C.violet} accessibilityLabel="Opening healthcare audit" />
        </View>
      </View>
    );
  // No healthcare audit content or controls are mounted for Green Track.
  if (gradeBand !== '9-12') return <Redirect href="/(tabs)/tools" />;
  return <HealthcareAuditContent />;
}

function HealthcareAuditContent() {
  const ghosts = useCapeStore((state) => state.ghosts);
  const nameGhost = useCapeStore((state) => state.nameGhost);
  const disarmGhost = useCapeStore((state) => state.disarmGhost);
  const setGhostPlan = useCapeStore((state) => state.setGhostPlan);
  const releaseGhost = useCapeStore((state) => state.releaseGhost);
  const named = namedGhostCount(ghosts);
  const disarmed = disarmedCount(ghosts);

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.magenta} />
      <StackHeader title="Healthcare Anxiety Audit" tint={C.violet} fallback="/(tabs)/tools" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Display className="text-4xl">Healthcare Anxiety Audit</Display>
          <Body className="mt-3">
            Name the healthcare ghost. Practice the question. Make a plan for care.
          </Body>
          <ActivityGuide
            className="mt-5"
            tint={C.violet}
            minutes={10}
            what={
              'A "healthcare ghost" is a fear that stops you from getting care, like being scared to call or worried about cost. Naming it makes it smaller.'
            }
            steps={[
              'Read each ghost and tap the ones that feel true for you.',
              'Read the counter-move and the question you could ask.',
              'Mark a ghost "disarmed" once you have a plan for it.',
            ]}
            outcome={'a plan for the fear most likely to keep you from care.'}
          />
          <View className="mt-4 flex-row flex-wrap gap-2">
            <Chip label="ON THIS DEVICE" tint={C.teal} />
            <Chip label="NO ACCOUNT · NO UPLOAD" tint={C.gold} />
          </View>
          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-6">
            <VaultCore named={named} disarmed={disarmed} total={GHOSTS.length} />
            <View className="mt-4">
              <Telemetry active={named > 0} />
            </View>
          </Panel>
          <View className="mt-8 gap-4">
            {GHOSTS.map((ghost) => (
              <GhostCard
                key={ghost.id}
                ghost={ghost}
                record={ghosts[ghost.id]}
                onName={() => nameGhost(ghost.id)}
                onDisarm={(plan) => disarmGhost(ghost.id, plan)}
                onSavePlan={(plan) => setGhostPlan(ghost.id, plan)}
                onRelease={() => releaseGhost(ghost.id)}
              />
            ))}
          </View>
          <Panel tint={C.flame} fill={0.05} stroke={0.2} className="mt-9">
            <Eyebrow color={C.flame}>SAFETY EXCEPTION</Eyebrow>
            <Body className="mt-2 text-[14px]">{SAFETY_EXCEPTION}</Body>
          </Panel>
          <View className="mt-5 flex-row items-start gap-2.5">
            <Lock size={14} color={C.teal} />
            <Body className="flex-1 text-[14px]">
              Your healthcare audit and plans stay on this device. Use Delete all my data in Me to
              clear them. Device backups and browser storage have separate settings.
            </Body>
          </View>
          <BrandFooter className="mt-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function GhostCard({
  ghost,
  record,
  onName,
  onDisarm,
  onSavePlan,
  onRelease,
}: {
  ghost: GhostDef;
  record: GhostRecord | undefined;
  onName: () => void;
  onDisarm: (plan: string) => void;
  onSavePlan: (plan: string) => void;
  onRelease: () => void;
}) {
  const [plan, setPlan] = useState(record?.plan ?? '');
  const node = nodeMeta(ghost.node);
  const disarmed = record?.status === 'disarmed';
  return (
    <Panel tint={node.color} fill={disarmed ? 0.09 : 0.05} stroke={disarmed ? 0.45 : 0.22}>
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <Mono bold color={node.color} className="text-[14px]">
            {ghost.name}
          </Mono>
          <Body className="mt-2 text-[14px]">What it feels like: “{ghost.whisper}”</Body>
        </View>
        {record ? (
          <GradientAction
            accessibilityLabel={`Reset ${ghost.name}`}
            onPress={() => {
              onRelease();
              setPlan('');
              void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }}
            className="h-11 w-11 items-center justify-center rounded-full"
          >
            <X size={14} color={C.paper2} />
          </GradientAction>
        ) : null}
      </View>
      <Mono bold color={node.color} className="mt-4 text-[14px]">
        Counter: {ghost.counter}
      </Mono>
      <View className="mt-3 gap-2">
        {ghost.disarm.map((step) => (
          <View key={step} className="flex-row items-start gap-2.5">
            <View className="mt-1">
              <Shield size={13} color={node.color} />
            </View>
            <Body className="flex-1 text-[14px]">{step}</Body>
          </View>
        ))}
      </View>
      {!record ? (
        <GradientAction
          onPress={() => {
            onName();
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
          className="mt-4 items-center rounded-full px-3 py-3"
        >
          <Mono bold color={C.paper2} className="text-center text-[14px]">
            Name this healthcare ghost
          </Mono>
        </GradientAction>
      ) : (
        <>
          <Eyebrow color={C.inkSoft} className="mt-4">
            YOUR ONE-LINE CARE PLAN
          </Eyebrow>
          <TextInput
            accessibilityLabel={`Care plan for ${ghost.name}`}
            value={plan}
            onChangeText={setPlan}
            onBlur={() => onSavePlan(plan)}
            placeholder="The question or step you’ll use…"
            placeholderTextColor={C.inkFaint}
            multiline
            className="mt-2 rounded-xl px-3 py-2.5"
            style={{
              color: C.ink,
              fontFamily: 'Inter_400Regular',
              fontSize: 13,
              minHeight: 48,
              backgroundColor: C.card,
              borderWidth: 1,
              borderColor: alpha(C.ink, 0.14),
            }}
          />
          <GradientAction
            onPress={() => {
              onDisarm(plan);
              void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }}
            className="mt-3 flex-row items-center justify-center gap-2 rounded-full px-3 py-3"
          >
            <ShieldCheck size={14} color={C.paper2} />
            <Mono bold color={C.paper2} className="shrink text-center text-[14px]">
              {disarmed ? 'Save care plan' : 'Deploy shield'}
            </Mono>
          </GradientAction>
        </>
      )}
    </Panel>
  );
}
