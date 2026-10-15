import { useState } from 'react';
import { Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Check } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';
import type { FieldDrill, PivotSlot, SortItem } from '@/lib/data/vibe';

function tap() {
  void Haptics.selectionAsync().catch(() => undefined);
}

function Pill({
  label,
  tint,
  selected,
  onPress,
  disabled,
}: {
  label: string;
  tint: string;
  selected?: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={() => {
        tap();
        onPress();
      }}
      className="min-h-11 flex-1 items-center justify-center rounded-2xl px-3 py-2 active:opacity-70"
      style={{
        backgroundColor: selected ? tint : C.card,
        borderWidth: 1.5,
        borderColor: selected ? tint : alpha(tint, 0.4),
      }}
    >
      <Mono bold color={selected ? C.paper2 : C.ink} className="text-center text-[13px]">
        {label}
      </Mono>
    </Pressable>
  );
}

/** Sort each card into one of two bins, with feedback. */
export function SortGame({
  items,
  bins,
  tint,
  rule,
}: {
  items: SortItem[];
  bins: { a: string; b: string };
  tint: string;
  rule: string;
}) {
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b'>>({});
  const right = items.filter((i) => answers[i.id] === i.answer).length;
  const all = Object.keys(answers).length === items.length;
  return (
    <View className="gap-3">
      {items.map((item) => {
        const picked = answers[item.id];
        const correct = picked === item.answer;
        return (
          <Panel key={item.id} tint={tint} fill={0.03} stroke={0.16}>
            <Body color={C.ink}>{item.text}</Body>
            <View className="mt-3 flex-row gap-2">
              {(['a', 'b'] as const).map((bin) => (
                <Pill
                  key={bin}
                  label={bins[bin]}
                  tint={picked === bin ? (correct ? C.yes : C.no) : tint}
                  selected={picked === bin}
                  onPress={() => setAnswers((a) => ({ ...a, [item.id]: bin }))}
                />
              ))}
            </View>
            {picked ? (
              <Mono bold color={correct ? C.yes : C.no} className="mt-2 text-[13px]">
                {`${correct ? 'Yes — ' : `Look again: it is "${bins[item.answer]}". `}${item.why}`}
              </Mono>
            ) : null}
          </Panel>
        );
      })}
      {all ? (
        <Panel tint={tint} fill={0.1} stroke={0.4}>
          <Mono bold color={C.ink} className="text-[14px]">
            {`${right} of ${items.length} right. ${rule}`}
          </Mono>
        </Panel>
      ) : null}
    </View>
  );
}

/** One field drill: scenario, pick the letter, reveal the vibe check and power move. */
export function FieldDrillCard({ drill, tint }: { drill: FieldDrill; tint: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === drill.answer;
  return (
    <Panel tint={tint} fill={0.04} stroke={0.2}>
      <Eyebrow color={tint}>{drill.title.toUpperCase()}</Eyebrow>
      <Body className="mt-2" color={C.ink}>
        {drill.scenario}
      </Body>
      <Mono bold color={C.ink} className="mt-3 text-[14px]">
        {drill.question}
      </Mono>
      <View className="mt-2 gap-2">
        {drill.options.map((option, i) => (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected: picked === i }}
            onPress={() => {
              tap();
              setPicked(i);
            }}
            className="min-h-11 justify-center rounded-2xl px-4 active:opacity-70"
            style={{
              backgroundColor:
                picked === i ? alpha(i === drill.answer ? C.yes : C.no, 0.12) : C.card,
              borderWidth: 1.5,
              borderColor: picked === i ? (i === drill.answer ? C.yes : C.no) : alpha(C.ink, 0.15),
            }}
          >
            <Mono bold color={C.ink} className="text-[14px]">
              {option}
            </Mono>
          </Pressable>
        ))}
      </View>
      {picked !== null ? (
        <View className="mt-3">
          <Mono bold color={correct ? C.yes : C.no} className="text-[13px]">
            {correct ? 'Vibe check: correct.' : 'Not quite — try another.'}
          </Mono>
          {correct ? (
            <View className="mt-2 gap-2">
              <Body>{drill.vibeCheck}</Body>
              <Mono bold color={C.ink} className="text-[13px]">
                {`Power move: ${drill.powerMove}`}
              </Mono>
            </View>
          ) : null}
        </View>
      ) : null}
    </Panel>
  );
}

/** Build a three-part line from options; the result can be saved. */
export function PivotBuilder({
  slots,
  tint,
  onSave,
  saveLabel = 'SAVE TO MY SCRIPTS',
}: {
  slots: PivotSlot[];
  tint: string;
  onSave?: (line: string) => void;
  saveLabel?: string;
}) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const complete = slots.every((s) => picks[s.id]);
  const line = slots
    .map((s) => picks[s.id])
    .filter(Boolean)
    .join(' ');
  return (
    <View className="gap-4">
      {slots.map((slot) => (
        <View key={slot.id}>
          <Mono bold color={tint} className="text-[13px]" tracking={1}>
            {slot.label.toUpperCase()}
          </Mono>
          <Mono className="text-[13px]">{slot.hint}</Mono>
          <View className="mt-2 gap-2">
            {slot.options.map((option) => {
              const selected = picks[slot.id] === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => {
                    tap();
                    setSaved(false);
                    setPicks((p) => ({ ...p, [slot.id]: option }));
                  }}
                  className="min-h-11 justify-center rounded-2xl px-4 active:opacity-70"
                  style={{
                    backgroundColor: selected ? alpha(tint, 0.14) : C.card,
                    borderWidth: 1.5,
                    borderColor: selected ? tint : alpha(C.ink, 0.15),
                  }}
                >
                  <Mono bold={selected} color={C.ink} className="text-[14px]">
                    {option}
                  </Mono>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <Panel tint={tint} fill={0.1} stroke={0.35}>
        <Eyebrow color={tint}>YOUR LINE</Eyebrow>
        <Display className="mt-2 text-2xl">
          {line ? `“${line}”` : 'Pick one option in each step.'}
        </Display>
      </Panel>
      {onSave && complete ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            onSave(line);
            setSaved(true);
            void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
              () => undefined,
            );
          }}
          className="min-h-12 flex-row items-center justify-center gap-2 rounded-full active:opacity-80"
          style={{ backgroundColor: tint }}
        >
          {saved ? <Check size={15} color={C.paper2} /> : null}
          <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
            {saved ? 'SAVED TO STRONGEST VOICE' : saveLabel}
          </Mono>
        </Pressable>
      ) : null}
    </View>
  );
}
