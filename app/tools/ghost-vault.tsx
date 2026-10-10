import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
  Activity,
  Lock,
  Plus,
  Radio,
  Shield,
  ShieldCheck,
  Trash2,
  X,
  Zap,
} from 'lucide-react-native';

import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel, Rail } from '@/components/cape/Type';
import { Chip, GradientAction } from '@/components/cape/Buttons';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { GlitchLabel, useGlitchClock } from '@/components/cape/Glitch';
import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { Telemetry } from '@/components/cape/Telemetry';
import { VaultCore } from '@/components/cape/VaultCore';
import { C, alpha } from '@/lib/colors';
import { trackFor } from '@/lib/data/content';
import {
  FEAR_STATES,
  GHOST_CATEGORIES,
  GHOST_LOCK_NOTE,
  type GhostDef,
  NORMALIZATION,
  SAFETY_EXCEPTION,
  fearStateInfo,
  ghostsForTrack,
  lockedGhostsForTrack,
  nodeMeta,
} from '@/lib/data/ghosts';
import type { ModuleId } from '@/lib/data/match';
import { COMPASS_NODES } from '@/lib/data/compass';
import { type GhostRecord, VAULT_TARGET, useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';

export default function GhostVault() {
  const clock = useGlitchClock();

  const gradeBand = useCapeStore((s) => s.gradeBand);
  const ghosts = useCapeStore((s) => s.ghosts);
  const customGhosts = useCapeStore((s) => s.customGhosts);
  const fearState = useCapeStore((s) => s.fearState);
  const nameGhost = useCapeStore((s) => s.nameGhost);
  const disarmGhost = useCapeStore((s) => s.disarmGhost);
  const setGhostPlan = useCapeStore((s) => s.setGhostPlan);
  const releaseGhost = useCapeStore((s) => s.releaseGhost);
  const addCustomGhost = useCapeStore((s) => s.addCustomGhost);
  const removeCustomGhost = useCapeStore((s) => s.removeCustomGhost);
  const setFearState = useCapeStore((s) => s.setFearState);

  const track = trackFor(gradeBand);
  const available = ghostsForTrack(track);
  const lockedCount = lockedGhostsForTrack(track).length;
  const total = available.length + customGhosts.length;

  const entries = Object.values(ghosts);
  const namedCount = entries.length;
  const disarmedCount = entries.filter((g) => g.status === 'disarmed').length;
  const state = fearStateInfo(fearState);

  const [draftName, setDraftName] = useState('');
  const [draftNode, setDraftNode] = useState<ModuleId>('comms');

  const submitCustom = () => {
    if (draftName.trim().length === 0) return;
    addCustomGhost(draftName, draftNode);
    setDraftName('');
  };

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop tint={C.magenta} />
      <StackHeader title="Digital Ghost Vault" tint={C.violet} fallback="/(tabs)/tools" />
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
          <Eyebrow color={C.violet}>ANXIETY AUDIT · NAME THE GHOSTS</Eyebrow>
          <Display className="mt-2 text-4xl">Fear is data, not a flaw.</Display>
          <Body className="mt-3">
            A shapeless fear is heavy because it has no edges. Pull each one into the light, give it
            a name, and it turns into a task with a shield attached.
          </Body>

          <View className="mt-4 flex-row flex-wrap items-center gap-2">
            <Chip label="100% ON THIS DEVICE" tint={C.teal} />
            <Chip label="NO ACCOUNT · NO UPLOAD" tint={C.gold} />
          </View>

          {/* VAULT CORE */}
          <Panel tint={C.teal} fill={0.05} stroke={0.18} className="mt-6">
            <VaultCore named={namedCount} disarmed={disarmedCount} total={total} />
            <View className="mt-4">
              <Telemetry active={namedCount > 0} />
            </View>
            <View className="mt-4 flex-row items-center justify-between">
              <Eyebrow color={C.teal}>GHOSTS NAMED &amp; DISARMED</Eyebrow>
              <Mono bold color={C.teal} className="text-[11px]">
                {disarmedCount}/{total}
              </Mono>
            </View>
            <View className="mt-2.5">
              <Rail
                value={total > 0 ? (disarmedCount / total) * 100 : 0}
                color={C.teal}
                height={6}
              />
            </View>
            <View className="mt-3.5 flex-row flex-wrap gap-2">
              <Chip label={`${namedCount} NAMED`} tint={C.violet} />
              <Chip label={`${disarmedCount} SHIELDS ONLINE`} tint={C.teal} />
              <Chip
                label={`${Math.min(disarmedCount, VAULT_TARGET)}/${VAULT_TARGET} SafER`}
                tint={C.gold}
              />
            </View>
          </Panel>

          {/* NORMALIZATION */}
          <Panel tint={C.modA} fill={0.05} stroke={0.16} className="mt-6">
            <View className="flex-row items-center gap-2">
              <Radio size={14} color={C.modA} />
              <Eyebrow color={C.modA}>BEFORE YOU START</Eyebrow>
            </View>
            <View className="mt-3 gap-2.5">
              {NORMALIZATION.map((line) => (
                <View key={line} className="flex-row items-start gap-2.5">
                  <View
                    className="mt-1.5 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: C.modA }}
                  />
                  <Mono className="flex-1 text-[10px]">{line}</Mono>
                </View>
              ))}
            </View>
          </Panel>

          {/* EMOTIONAL TRANSITION SPECTRUM */}
          <View className="mt-8">
            <View className="flex-row items-center gap-2">
              <Activity size={14} color={C.gold} />
              <Eyebrow color={C.gold}>EMOTIONAL TRANSITION SPECTRUM</Eyebrow>
            </View>
            <Body className="mt-2">
              Mark where you actually are right now. It is not a ladder — people move both ways, on
              the same day.
            </Body>
            <View className="mt-3.5 flex-row gap-2">
              {FEAR_STATES.map((option) => {
                const active = fearState === option.id;
                return (
                  <Pressable
                    key={option.id}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={option.label}
                    onPress={() => setFearState(option.id)}
                    className="flex-1 items-center rounded-xl py-2.5 active:opacity-70"
                    style={{
                      backgroundColor: alpha(option.tint, active ? 0.18 : 0.05),
                      borderWidth: 1,
                      borderColor: alpha(option.tint, active ? 0.55 : 0.14),
                    }}
                  >
                    <Mono
                      bold
                      color={active ? option.tint : alpha(option.tint, 0.65)}
                      className="text-[9px]"
                      tracking={0.5}
                    >
                      {option.label}
                    </Mono>
                  </Pressable>
                );
              })}
            </View>
            {state ? (
              <View className="mt-3">
                <Rail
                  value={
                    ((FEAR_STATES.findIndex((s) => s.id === state.id) + 1) / FEAR_STATES.length) *
                    100
                  }
                  color={state.tint}
                />
                <Mono className="mt-2.5 text-[10px]" color={alpha(C.inkSoft, 0.8)}>
                  {state.detail}
                </Mono>
              </View>
            ) : (
              <Mono className="mt-3 text-[10px]" color={alpha(C.inkFaint, 0.6)}>
                Nothing selected yet. Pick the honest one, not the impressive one.
              </Mono>
            )}
          </View>

          {/* THE CHECKLIST */}
          {GHOST_CATEGORIES.map((category) => {
            const list = available.filter((g) => g.category === category.id);
            if (list.length === 0) return null;
            return (
              <View key={category.id} className="mt-9">
                <Eyebrow color={category.tint}>{category.label}</Eyebrow>
                <Mono className="mt-2 text-[10px]" color={alpha(C.inkFaint, 0.7)}>
                  {category.blurb}
                </Mono>
                <View className="mt-4 gap-3">
                  {list.map((ghost, index) => (
                    <GhostCard
                      key={ghost.id}
                      ghost={ghost}
                      record={ghosts[ghost.id]}
                      clock={clock}
                      phase={(index * 0.17) % 1}
                      onName={() => nameGhost(ghost.id)}
                      onDisarm={(plan) => disarmGhost(ghost.id, plan)}
                      onSavePlan={(plan) => setGhostPlan(ghost.id, plan)}
                      onRelease={() => releaseGhost(ghost.id)}
                    />
                  ))}
                </View>
              </View>
            );
          })}

          {lockedCount > 0 ? (
            <View
              className="mt-6 flex-row items-start gap-3 rounded-2xl p-4"
              style={{
                backgroundColor: alpha(C.lemon, 0.04),
                borderWidth: 1,
                borderColor: alpha(C.lemon, 0.16),
              }}
            >
              <Lock size={16} color={C.lemon} />
              <View className="flex-1">
                <Mono bold color={C.lemon} className="text-[11px]" tracking={1}>
                  {lockedCount} GHOSTS LOCKED ON THIS TRACK
                </Mono>
                <Mono className="mt-1 text-[10px]">{GHOST_LOCK_NOTE}</Mono>
              </View>
            </View>
          ) : null}

          {/* YOUR OWN GHOSTS */}
          <View className="mt-9">
            <Eyebrow color={C.modT}>YOUR OWN GHOSTS</Eyebrow>
            <Display className="mt-2 text-3xl">Not on the list? Name it yourself.</Display>
            <Body className="mt-2">
              Type the fear in your own words and pick the node that answers it. This text stays on
              this device.
            </Body>

            <View
              className="mt-4 rounded-2xl p-4"
              style={{
                backgroundColor: alpha(C.modT, 0.06),
                borderWidth: 1,
                borderColor: alpha(C.modT, 0.2),
              }}
            >
              <Eyebrow color={C.modT}>THE GHOST</Eyebrow>
              <TextInput
                accessibilityLabel="Name your worry"
                value={draftName}
                onChangeText={setDraftName}
                placeholder="e.g. Nobody in my house can know I went"
                placeholderTextColor={C.inkFaint}
                className="mt-2.5 rounded-xl px-3 py-2.5"
                style={{
                  color: C.ink,
                  fontFamily: INPUT_FONT,
                  fontSize: 11,
                  backgroundColor: C.card,
                  borderWidth: 1,
                  borderColor: alpha(C.ink, 0.14),
                }}
              />

              <Eyebrow color={C.modT} className="mt-4">
                WHICH NODE ANSWERS IT
              </Eyebrow>
              <View className="mt-2.5 flex-row gap-2">
                {COMPASS_NODES.map((node) => {
                  const active = draftNode === node.id;
                  return (
                    <Pressable
                      key={node.id}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: active }}
                      accessibilityLabel={`${node.letter} — ${node.callsign}`}
                      onPress={() => setDraftNode(node.id)}
                      className="flex-1 items-center rounded-xl py-2 active:opacity-70"
                      style={{
                        backgroundColor: alpha(node.color, active ? 0.2 : 0.05),
                        borderWidth: 1,
                        borderColor: alpha(node.color, active ? 0.55 : 0.15),
                      }}
                    >
                      <Display
                        color={active ? node.color : alpha(node.color, 0.7)}
                        className="text-lg"
                      >
                        {node.letter}
                      </Display>
                    </Pressable>
                  );
                })}
              </View>
              <Mono className="mt-2 text-[9px]" color={alpha(C.inkFaint, 0.65)}>
                {nodeMeta(draftNode).letter} · {nodeMeta(draftNode).callsign}
              </Mono>

              <GradientAction
                disabled={draftName.trim().length === 0}
                onPress={submitCustom}
                className="mt-4 flex-row items-center justify-center gap-2 rounded-full px-3 py-3"
              >
                <Plus size={14} color={C.paper2} />
                <Mono bold color={C.paper2} tracking={1} className="shrink text-center text-[11px]">
                  DRAG IT INTO THE LIGHT
                </Mono>
              </GradientAction>
            </View>

            {customGhosts.length > 0 ? (
              <View className="mt-4 gap-3">
                {customGhosts.map((ghost) => (
                  <GhostCard
                    key={ghost.id}
                    ghost={{
                      id: ghost.id,
                      name: ghost.name,
                      glyph: '🌫️',
                      category: 'relational',
                      whisper: 'Your own words. Nobody else will ever read this.',
                      node: ghost.node,
                      shield: `${nodeMeta(ghost.node).callsign} Plate`,
                      disarm: [
                        `Mapped to ${nodeMeta(ghost.node).letter} — ${nodeMeta(ghost.node).callsign}.`,
                        'Write the single smallest move that makes this fear smaller than it is now.',
                        'One move only. A plan you would actually do beats a plan that sounds good.',
                      ],
                    }}
                    record={ghosts[ghost.id]}
                    clock={clock}
                    phase={0.4}
                    onName={() => undefined}
                    onDisarm={(plan) => disarmGhost(ghost.id, plan)}
                    onSavePlan={(plan) => setGhostPlan(ghost.id, plan)}
                    onRemove={() => removeCustomGhost(ghost.id)}
                  />
                ))}
              </View>
            ) : null}
          </View>

          {/* SAFETY EXCEPTION */}
          <Panel tint={C.flame} fill={0.05} stroke={0.2} className="mt-9">
            <Eyebrow color={C.flame}>SAFETY EXCEPTION</Eyebrow>
            <Mono className="mt-2 text-[10px]">{SAFETY_EXCEPTION}</Mono>
          </Panel>

          <View className="mt-5 flex-row items-start gap-2.5">
            <Lock size={13} color={alpha(C.teal, 0.8)} />
            <Mono className="flex-1 text-[9px]" color={alpha(C.inkFaint, 0.6)}>
              Your ghosts and plans are saved on this device, not in a CAPE cloud account. Use
              Delete all my data in Me to clear them. Device backups and browser storage have
              separate settings.
            </Mono>
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
  clock,
  phase,
  onName,
  onDisarm,
  onSavePlan,
  onRelease,
  onRemove,
}: {
  ghost: GhostDef;
  record: GhostRecord | undefined;
  clock: SharedValue<number>;
  phase: number;
  onName: () => void;
  onDisarm: (plan: string) => void;
  onSavePlan: (plan: string) => void;
  onRelease?: () => void;
  onRemove?: () => void;
}) {
  const [plan, setPlan] = useState(record?.plan ?? '');
  const node = nodeMeta(ghost.node);
  const disarmed = record?.status === 'disarmed';

  if (!record) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Name ${ghost.name}`}
        onPress={onName}
        className="rounded-2xl p-4 active:opacity-80"
        style={{
          backgroundColor: C.card,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: alpha(C.violet, 0.22),
        }}
      >
        <View className="flex-row items-start gap-3">
          <Mono className="text-base" color={alpha(C.inkFaint, 0.4)}>
            {ghost.glyph}
          </Mono>
          <View className="flex-1">
            <GlitchLabel text={ghost.name.toUpperCase()} clock={clock} phase={phase} />
            <Mono className="mt-2 text-[10px]" color={alpha(C.inkFaint, 0.55)}>
              &ldquo;{ghost.whisper}&rdquo;
            </Mono>
          </View>
        </View>
        <View className="mt-3 flex-row items-center gap-2">
          <Zap size={12} color={C.violet} />
          <Mono bold color={C.violet} className="text-[9px]" tracking={1.5}>
            PULL IT INTO THE LIGHT
          </Mono>
        </View>
      </Pressable>
    );
  }

  return (
    <View
      className="rounded-2xl p-4"
      style={{
        backgroundColor: alpha(node.color, disarmed ? 0.09 : 0.05),
        borderWidth: 1,
        borderColor: alpha(node.color, disarmed ? 0.45 : 0.22),
      }}
    >
      <View className="flex-row items-start gap-3">
        <View
          className="h-9 w-9 items-center justify-center rounded-lg"
          style={{
            backgroundColor: alpha(node.color, 0.14),
            borderWidth: 1,
            borderColor: alpha(node.color, 0.38),
          }}
        >
          <Display color={node.color} className="text-lg">
            {node.letter}
          </Display>
        </View>
        <View className="flex-1">
          <Mono bold color={node.color} className="text-[11px]" tracking={1}>
            {ghost.name.toUpperCase()}
          </Mono>
          <Mono className="mt-1 text-[9px]" color={alpha(C.inkFaint, 0.7)}>
            {node.callsign} · {ghost.shield}
          </Mono>
        </View>
        <GradientAction
          accessibilityLabel={
            onRemove ? `Delete ${ghost.name}` : `Return ${ghost.name} to the dark`
          }
          onPress={onRemove ?? onRelease}
          className="h-11 w-11 items-center justify-center rounded-full"
        >
          {onRemove ? <Trash2 size={14} color={C.paper2} /> : <X size={14} color={C.paper2} />}
        </GradientAction>
      </View>

      <View className="mt-3.5 gap-2">
        {ghost.disarm.map((step) => (
          <View key={step} className="flex-row items-start gap-2.5">
            <View className="mt-0.5">
              <Shield size={11} color={alpha(node.color, 0.85)} />
            </View>
            <Body className="flex-1 text-[12px]">{step}</Body>
          </View>
        ))}
      </View>

      <Eyebrow color={alpha(C.inkFaint, 0.75)} className="mt-4">
        YOUR ONE-LINE PLAN
      </Eyebrow>
      <TextInput
        accessibilityLabel={`One-line plan for ${ghost.name}`}
        value={plan}
        onChangeText={setPlan}
        onBlur={() => onSavePlan(plan)}
        placeholder="The one move you will actually make…"
        placeholderTextColor={C.inkFaint}
        multiline
        className="mt-2 rounded-xl px-3 py-2.5"
        style={{
          color: C.ink,
          fontFamily: INPUT_FONT,
          fontSize: 11,
          minHeight: 46,
          backgroundColor: C.card,
          borderWidth: 1,
          borderColor: alpha(C.ink, 0.14),
        }}
      />

      <GradientAction
        onPress={() => onDisarm(plan)}
        className="mt-3 flex-row items-center justify-center gap-2 rounded-full px-3 py-3"
      >
        <ShieldCheck size={14} color={C.paper2} />
        <Mono bold color={C.paper2} tracking={1} className="shrink text-center text-[11px]">
          {disarmed ? 'SHIELD ONLINE · SAVE CHANGES' : 'DEPLOY SHIELD'}
        </Mono>
      </GradientAction>
    </View>
  );
}
