import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Check, Eye, Mic, Trash2 } from '@/lib/icons';

import { NotebookBackdrop } from '@/components/cape/NotebookBackdrop';
import { ActivityGuide, NextStepButton, StepTabs } from '@/components/cape/ActivityGuide';
import { BrandFooter } from '@/components/cape/BrandFooter';
import { StackHeader } from '@/components/cape/Screen';
import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import { FRIES_CARDS } from '@/lib/data/cafe';
import { trackFor, type Track } from '@/lib/data/content';
import {
  COMMITMENT_PROMPT,
  EXAMPLE_SCRIPT,
  GHOST_EXAMPLES,
  GHOST_PROMPT,
  LEGACY_PROMPT,
  MIRROR_PROMPTS,
  SCRIPT_PARTS,
  type ScriptPartId,
  VOICE_STEPS,
  VOICE_TAKEAWAY,
  rolePlayCards,
  voiceTopics,
} from '@/lib/data/voiceLab';
import { useCapeStore } from '@/lib/store/useCapeStore';

const TINT = C.modC;

function tap() {
  void Haptics.selectionAsync().catch(() => undefined);
}

function Field({
  value,
  onChange,
  placeholder,
  label,
  minHeight = 96,
}: {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  label: string;
  minHeight?: number;
}) {
  return (
    <TextInput
      accessibilityLabel={label}
      value={value}
      onChangeText={onChange}
      multiline
      textAlignVertical="top"
      placeholder={placeholder}
      placeholderTextColor={C.inkFaint}
      className="mt-3 rounded-2xl p-4 text-[15px]"
      style={{
        minHeight,
        color: C.ink,
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: C.hairline,
        fontFamily: 'DMSans_400Regular',
      }}
    />
  );
}

function Choice({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={() => {
        tap();
        onPress();
      }}
      className="min-h-11 justify-center rounded-2xl px-4 py-3 active:opacity-70"
      style={{
        backgroundColor: selected ? alpha(TINT, 0.14) : C.card,
        borderWidth: 1,
        borderColor: alpha(TINT, selected ? 0.6 : 0.2),
      }}
    >
      <Mono bold={selected} color={selected ? C.ink : C.inkSoft} className="text-[14px]">
        {label}
      </Mono>
    </Pressable>
  );
}

export default function StrongestVoice() {
  const track = trackFor(useCapeStore((s) => s.gradeBand));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<number[]>([]);

  const go = (next: number) => {
    setDone((d) => (d.includes(step) ? d : [...d, step]));
    setStep(next);
  };

  return (
    <View className="bg-paper flex-1">
      <NotebookBackdrop />
      <StackHeader title="Strongest Voice" tint={TINT} fallback="/(tabs)/tools" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pt-6 pb-16"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Eyebrow color={TINT}>THE STRONGEST VOICE SCRIPT LAB</Eyebrow>
          <Display className="mt-2 text-4xl">Knowing it is not the same as saying it.</Display>

          <ActivityGuide
            className="mt-5"
            tint={TINT}
            minutes={15}
            what="Athletes practice plays. Musicians practice scales. Here you practice the words you need, so they are ready when pressure shows up."
            steps={[
              'Check the five F.R.I.E.S. dials.',
              'Name the fear that makes speaking up hard.',
              'Learn the three parts of a script, then build yours.',
              'Say it out loud three times.',
              'Practice it against pushback.',
              'Commit to one real situation this week.',
            ]}
            outcome="one script in your own words, saved on this phone."
          />

          <StepTabs
            steps={[...VOICE_STEPS]}
            active={step}
            done={done}
            tint={TINT}
            onSelect={setStep}
          />

          <View className="mt-5">
            {step === 0 ? <FriesDials track={track} onNext={() => go(1)} /> : null}
            {step === 1 ? <NameTheGhost onNext={() => go(2)} /> : null}
            {step === 2 ? <ScriptParts track={track} onNext={() => go(3)} /> : null}
            {step === 3 ? <ScriptBuilder track={track} onNext={() => go(4)} /> : null}
            {step === 4 ? <MirrorPractice onNext={() => go(5)} /> : null}
            {step === 5 ? <RolePlay track={track} onNext={() => go(6)} /> : null}
            {step === 6 ? <Commit track={track} /> : null}
          </View>

          <BrandFooter className="mt-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ── Step 1: the F.R.I.E.S. dials ─────────────────────────────── */

function FriesDials({ track, onNext }: { track: Track; onNext: () => void }) {
  const [on, setOn] = useState<string[]>([]);
  const all = on.length === FRIES_CARDS.length;
  return (
    <View>
      <Eyebrow color={TINT}>STEP 1 · THE F.R.I.E.S. CHECK</Eyebrow>
      <Display className="mt-2 text-3xl">Five dials. All green for a real yes.</Display>
      <Body className="mt-2">
        Your script protects these five things. Tap each dial to switch it on and read what it
        means.
      </Body>
      <View className="mt-4 gap-2.5">
        {FRIES_CARDS.map((card) => {
          const isOn = on.includes(card.letter);
          return (
            <Pressable
              key={card.letter}
              accessibilityRole="switch"
              accessibilityState={{ checked: isOn }}
              accessibilityLabel={card.word}
              onPress={() => {
                tap();
                setOn((list) =>
                  list.includes(card.letter)
                    ? list.filter((l) => l !== card.letter)
                    : [...list, card.letter],
                );
              }}
              className="rounded-2xl p-4 active:opacity-80"
              style={{
                backgroundColor: isOn ? alpha(C.yes, 0.1) : C.card,
                borderWidth: 1.5,
                borderColor: isOn ? C.yes : alpha(C.ink, 0.15),
              }}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: isOn ? C.yes : alpha(C.ink, 0.08) }}
                >
                  <Display color={isOn ? C.paper2 : C.inkFaint} className="text-2xl">
                    {card.letter}
                  </Display>
                </View>
                <View className="flex-1">
                  <Mono bold color={C.ink} className="text-[14px]">
                    {card.word}
                  </Mono>
                  <Mono className="text-[13px]">{isOn ? 'ON' : 'Tap to switch on'}</Mono>
                </View>
              </View>
              {isOn ? (
                <View className="mt-3">
                  <Body>{card.rule}</Body>
                  <Mono bold className="mt-2 text-[13px]" color={C.inkSoft}>
                    {`Real life: ${card.example[track]}`}
                  </Mono>
                </View>
              ) : null}
            </Pressable>
          );
        })}
      </View>
      {all ? (
        <Panel tint={C.yes} fill={0.1} stroke={0.4} className="mt-4">
          <Mono bold color={C.ink} className="text-[14px]">
            All five dials are green. That is what a real yes looks like — and what your script
            protects.
          </Mono>
        </Panel>
      ) : null}
      <NextStepButton label="NEXT: NAME THE GHOST" tint={TINT} onPress={onNext} />
    </View>
  );
}

/* ── Step 2: name the ghost ───────────────────────────────────── */

function NameTheGhost({ onNext }: { onNext: () => void }) {
  const ghost = useCapeStore((s) => s.voiceLab.ghost);
  const setVoiceLab = useCapeStore((s) => s.setVoiceLab);
  return (
    <View>
      <Eyebrow color={TINT}>STEP 2 · NAME THE GHOST</Eyebrow>
      <Display className="mt-2 text-3xl">Name the fear so it gets smaller.</Display>
      <Body className="mt-2">
        Everyone has a fear that makes speaking up hard. Write yours privately. Nobody sees it but
        you.
      </Body>
      <Mono bold color={C.ink} className="mt-4 text-[14px]">
        {GHOST_PROMPT}
      </Mono>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {GHOST_EXAMPLES.map((example) => (
          <Pressable
            key={example}
            accessibilityRole="button"
            onPress={() => setVoiceLab({ ghost: example })}
            className="min-h-9 justify-center rounded-full px-3 active:opacity-70"
            style={{ borderWidth: 1, borderColor: alpha(TINT, 0.3) }}
          >
            <Mono className="text-[12px]">{example}</Mono>
          </Pressable>
        ))}
      </View>
      <Field
        label={GHOST_PROMPT}
        value={ghost}
        onChange={(text) => setVoiceLab({ ghost: text })}
        placeholder="In your own words"
      />
      <Mono className="mt-2 text-[12px]">Saved on this device only.</Mono>
      {ghost.trim() ? (
        <Panel tint={TINT} fill={0.08} stroke={0.3} className="mt-4">
          <Body color={C.ink}>
            Thank you for naming that. Now let&apos;s build the words around it.
          </Body>
        </Panel>
      ) : null}
      <NextStepButton label="NEXT: THE THREE SCRIPT PARTS" tint={TINT} onPress={onNext} />
    </View>
  );
}

/* ── Step 3: the architecture of a script ─────────────────────── */

function ScriptParts({ track, onNext }: { track: Track; onNext: () => void }) {
  const example = EXAMPLE_SCRIPT[track];
  return (
    <View>
      <Eyebrow color={TINT}>STEP 3 · THE ARCHITECTURE OF A SCRIPT</Eyebrow>
      <Display className="mt-2 text-3xl">Three parts. One clear line.</Display>
      <Panel tint={TINT} fill={0.08} stroke={0.3} className="mt-4">
        <Display className="text-2xl">
          {`“${example.anchor} — ${example.shield} — ${example.volley}”`}
        </Display>
      </Panel>
      <View className="mt-4 gap-2.5">
        {SCRIPT_PARTS.map((part, i) => (
          <Panel key={part.id} tint={TINT} fill={0.04} stroke={0.18}>
            <Mono bold color={TINT} className="text-[13px]" tracking={1}>
              {`${i + 1}. ${part.name.toUpperCase()} · ${part.role.toUpperCase()}`}
            </Mono>
            <Body className="mt-1">{part.detail}</Body>
            <Mono bold className="mt-2 text-[13px]" color={C.ink}>
              {`“${example[part.id]}”`}
            </Mono>
          </Panel>
        ))}
      </View>
      <NextStepButton label="NEXT: BUILD YOUR SCRIPT" tint={TINT} onPress={onNext} />
    </View>
  );
}

/* ── Step 4: the script builder ───────────────────────────────── */

function ScriptBuilder({ track, onNext }: { track: Track; onNext: () => void }) {
  const topics = voiceTopics(track);
  const saved = useCapeStore((s) => s.strongestVoiceScripts);
  const saveScript = useCapeStore((s) => s.saveStrongestVoiceScript);
  const removeScript = useCapeStore((s) => s.removeStrongestVoiceScript);
  const [topicId, setTopicId] = useState(topics[0].id);
  const topic = topics.find((t) => t.id === topicId) ?? topics[0];
  const [parts, setParts] = useState<Record<ScriptPartId, string>>({
    anchor: topic.starters.anchor[0],
    shield: topic.starters.shield[0],
    volley: topic.starters.volley[0],
  });
  const script = `${parts.anchor.trim()} — ${parts.shield.trim()} — ${parts.volley.trim()}`;

  const pickTopic = (id: string) => {
    const next = topics.find((t) => t.id === id) ?? topics[0];
    setTopicId(id);
    setParts({
      anchor: next.starters.anchor[0],
      shield: next.starters.shield[0],
      volley: next.starters.volley[0],
    });
  };

  return (
    <View>
      <Eyebrow color={TINT}>STEP 4 · THE SCRIPT BUILDER</Eyebrow>
      <Display className="mt-2 text-3xl">Writing it down makes it real.</Display>
      <Body className="mt-2">
        Pick a situation, then tap a starter or type your own words for each part. It does not need
        to sound perfect. It needs to get you started.
      </Body>

      <Mono bold color={C.ink} className="mt-4 text-[14px]">
        The boundary I want to set:
      </Mono>
      <View className="mt-2 gap-2">
        {topics.map((t) => (
          <Choice
            key={t.id}
            label={t.label}
            selected={t.id === topicId}
            onPress={() => pickTopic(t.id)}
          />
        ))}
      </View>

      {SCRIPT_PARTS.map((part) => (
        <View key={part.id} className="mt-5">
          <Mono bold color={TINT} className="text-[13px]" tracking={1}>
            {`${part.name.toUpperCase()} · ${part.role}`}
          </Mono>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {topic.starters[part.id].map((starter) => (
              <Pressable
                key={starter}
                accessibilityRole="button"
                onPress={() => {
                  tap();
                  setParts((p) => ({ ...p, [part.id]: starter }));
                }}
                className="min-h-9 justify-center rounded-full px-3 active:opacity-70"
                style={{
                  backgroundColor: parts[part.id] === starter ? alpha(TINT, 0.14) : 'transparent',
                  borderWidth: 1,
                  borderColor: alpha(TINT, 0.35),
                }}
              >
                <Mono className="text-[12px]">{starter}</Mono>
              </Pressable>
            ))}
          </View>
          <Field
            label={part.name}
            value={parts[part.id]}
            onChange={(text) => setParts((p) => ({ ...p, [part.id]: text }))}
            placeholder="Your words"
            minHeight={52}
          />
        </View>
      ))}

      <Panel tint={TINT} fill={0.1} stroke={0.35} className="mt-5">
        <Eyebrow color={TINT}>MY SCRIPT</Eyebrow>
        <Display className="mt-2 text-2xl">{`“${script}”`}</Display>
      </Panel>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          saveScript(script);
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
            () => undefined,
          );
        }}
        className="mt-3 min-h-12 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
        style={{ borderWidth: 1.5, borderColor: TINT }}
      >
        <Check size={15} color={TINT} />
        <Mono bold color={TINT} tracking={1} className="text-[13px]">
          SAVE THIS SCRIPT
        </Mono>
      </Pressable>

      {saved.length > 0 ? (
        <View className="mt-6 gap-2">
          <Eyebrow color={C.teal}>MY SAVED SCRIPTS</Eyebrow>
          {saved.map((item) => (
            <View
              key={item}
              className="flex-row items-center gap-3 rounded-2xl p-4"
              style={{ backgroundColor: C.card, borderWidth: 1, borderColor: alpha(C.teal, 0.2) }}
            >
              <Mono className="flex-1 text-[13px]">{item}</Mono>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Delete script: ${item}`}
                onPress={() => removeScript(item)}
                className="h-11 w-11 items-center justify-center rounded-full active:opacity-70"
              >
                <Trash2 size={16} color={C.inkSoft} />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
      <NextStepButton label="NEXT: MIRROR PRACTICE" tint={TINT} onPress={onNext} />
    </View>
  );
}

/* ── Step 5: mirror practice ──────────────────────────────────── */

function MirrorPractice({ onNext }: { onNext: () => void }) {
  const saved = useCapeStore((s) => s.strongestVoiceScripts);
  const [count, setCount] = useState(0);
  const line = saved[0];
  return (
    <View>
      <Eyebrow color={TINT}>STEP 5 · MIRROR PRACTICE</Eyebrow>
      <Display className="mt-2 text-3xl">Say it out loud three times.</Display>
      <Body className="mt-2">
        Look in a mirror or your front camera. Each time, notice what changes: your voice, your
        posture, your confidence. Feeling awkward is your confidence growing.
      </Body>
      <Panel tint={TINT} fill={0.08} stroke={0.3} className="mt-4">
        <Display className="text-2xl">
          {line
            ? `“${line}”`
            : 'Build and save a script in Step 4 first, or use any line you want.'}
        </Display>
      </Panel>
      <View className="mt-4 gap-2">
        {MIRROR_PROMPTS.map((prompt, i) => {
          const reached = count > i;
          return (
            <View
              key={prompt}
              className="flex-row items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                backgroundColor: reached ? alpha(C.yes, 0.1) : C.card,
                borderWidth: 1,
                borderColor: reached ? alpha(C.yes, 0.5) : alpha(C.ink, 0.12),
              }}
            >
              {reached ? <Check size={16} color={C.yes} /> : <Mic size={16} color={C.inkFaint} />}
              <Body className="flex-1">{prompt}</Body>
            </View>
          );
        })}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`I said it out loud. ${count} of 3`}
        disabled={count >= 3}
        onPress={() => {
          tap();
          setCount((c) => Math.min(3, c + 1));
        }}
        className="mt-4 min-h-12 items-center justify-center rounded-full active:opacity-80"
        style={{ backgroundColor: count >= 3 ? C.yes : TINT }}
      >
        <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
          {count >= 3 ? 'DONE · 3 OF 3' : `I SAID IT OUT LOUD · ${count} OF 3`}
        </Mono>
      </Pressable>
      <NextStepButton label="NEXT: ROLE-PLAY" tint={TINT} onPress={onNext} />
    </View>
  );
}

/* ── Step 6: role-play ────────────────────────────────────────── */

function RolePlay({ track, onNext }: { track: Track; onNext: () => void }) {
  const cards = rolePlayCards(track);
  const [index, setIndex] = useState(0);
  const [reply, setReply] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState<string[]>([]);
  const card = cards[index];

  const move = (next: number) => {
    setIndex((next + cards.length) % cards.length);
    setReply('');
    setRevealed(false);
    setChecks([]);
  };

  return (
    <View>
      <Eyebrow color={TINT}>STEP 6 · ROLE-PLAY</Eyebrow>
      <Display className="mt-2 text-3xl">Practice against pushback.</Display>
      <Body className="mt-2">
        Read the pushback, then type or say your answer using your script. With friends, take turns
        as Speaker, Listener, and Observer.
      </Body>
      <Mono className="mt-3 text-[13px]">{`CARD ${index + 1} OF ${cards.length}`}</Mono>
      <Panel tint={C.purple} fill={0.06} stroke={0.24} className="mt-2">
        <Mono bold color={C.purple} className="text-[13px]" tracking={1}>
          {card.title.toUpperCase()}
        </Mono>
        <Body className="mt-1">{card.setup}</Body>
        <Display className="mt-3 text-2xl">{card.pushback}</Display>
      </Panel>
      <Field
        label="Your answer"
        value={reply}
        onChange={setReply}
        placeholder="Your answer, in your own words"
        minHeight={72}
      />
      {!revealed ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            tap();
            setRevealed(true);
          }}
          className="mt-3 min-h-12 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
          style={{ backgroundColor: C.purple }}
        >
          <Eye size={15} color={C.paper2} />
          <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
            SEE A STRONG ANSWER
          </Mono>
        </Pressable>
      ) : (
        <View>
          <Panel tint={C.yes} fill={0.08} stroke={0.35} className="mt-3">
            <Eyebrow color={C.yes}>ONE STRONG ANSWER</Eyebrow>
            <Body className="mt-1" color={C.ink}>
              {card.strong}
            </Body>
          </Panel>
          <Mono bold color={C.ink} className="mt-4 text-[14px]">
            Observer check — what did you do?
          </Mono>
          <View className="mt-2 gap-2">
            {card.watchFor.map((item) => (
              <Choice
                key={item}
                label={`${checks.includes(item) ? '✓ ' : ''}${item}`}
                selected={checks.includes(item)}
                onPress={() =>
                  setChecks((c) => (c.includes(item) ? c.filter((x) => x !== item) : [...c, item]))
                }
              />
            ))}
          </View>
        </View>
      )}
      <View className="mt-4 flex-row gap-3">
        <Pressable
          accessibilityRole="button"
          onPress={() => move(index - 1)}
          className="min-h-11 flex-1 items-center justify-center rounded-full active:opacity-70"
          style={{ borderWidth: 1, borderColor: alpha(C.ink, 0.2) }}
        >
          <Mono bold color={C.inkSoft} className="text-[13px]">
            PREVIOUS CARD
          </Mono>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => move(index + 1)}
          className="min-h-11 flex-1 items-center justify-center rounded-full active:opacity-70"
          style={{ borderWidth: 1, borderColor: alpha(C.ink, 0.2) }}
        >
          <Mono bold color={C.inkSoft} className="text-[13px]">
            NEXT CARD
          </Mono>
        </Pressable>
      </View>
      <NextStepButton label="NEXT: YOUR COMMITMENT" tint={TINT} onPress={onNext} />
    </View>
  );
}

/* ── Step 7: commitment (+ legacy letter on Blue) ─────────────── */

function Commit({ track }: { track: Track }) {
  const voiceLab = useCapeStore((s) => s.voiceLab);
  const setVoiceLab = useCapeStore((s) => s.setVoiceLab);
  return (
    <View>
      <Eyebrow color={TINT}>STEP 7 · CLOSE THE LOOP</Eyebrow>
      <Display className="mt-2 text-3xl">Pick one moment this week.</Display>
      <Mono bold color={C.ink} className="mt-4 text-[14px]">
        {COMMITMENT_PROMPT}
      </Mono>
      <Field
        label={COMMITMENT_PROMPT}
        value={voiceLab.commitment}
        onChange={(text) => setVoiceLab({ commitment: text })}
        placeholder="For example: when my group chat starts roasting someone"
      />
      {track === 'blue' ? (
        <View className="mt-6">
          <Eyebrow color={C.magenta}>THE LEGACY LETTER</Eyebrow>
          <Body className="mt-1">{LEGACY_PROMPT}</Body>
          <Field
            label="Legacy letter"
            value={voiceLab.legacy}
            onChange={(text) => setVoiceLab({ legacy: text })}
            placeholder="Dear future me…"
            minHeight={160}
          />
        </View>
      ) : null}
      <Mono className="mt-2 text-[12px]">Saved on this device only.</Mono>
      <Panel tint={TINT} fill={0.1} stroke={0.35} className="mt-6">
        <Eyebrow color={TINT}>VOICE + SELF-RESPECT = UNSTOPPABLE</Eyebrow>
        <Display className="mt-2 text-2xl">{`“${VOICE_TAKEAWAY}”`}</Display>
      </Panel>
    </View>
  );
}
