import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ChevronDown, ChevronUp, Clock, Compass } from '@/lib/icons';

import { Body, Eyebrow, Mono, Panel } from '@/components/cape/Type';
import { C, alpha } from '@/lib/colors';

/**
 * "How this works" card at the top of every activity: what it is, the steps,
 * and what the student leaves with. Open by default so nobody has to guess.
 */
export function ActivityGuide({
  tint,
  what,
  steps,
  outcome,
  minutes,
  className,
}: {
  tint: string;
  what: string;
  steps: string[];
  outcome: string;
  minutes?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  return (
    <Panel tint={tint} fill={0.06} stroke={0.24} className={className}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={open ? 'Hide how this works' : 'Show how this works'}
        onPress={() => setOpen((v) => !v)}
        className="min-h-11 flex-row items-center gap-2 active:opacity-70"
      >
        <Compass size={16} color={tint} />
        <Eyebrow color={tint} className="flex-1">
          HOW THIS WORKS
        </Eyebrow>
        {minutes ? (
          <View className="flex-row items-center gap-1">
            <Clock size={12} color={C.inkFaint} />
            <Mono className="text-[12px]">{`${minutes} min`}</Mono>
          </View>
        ) : null}
        {open ? <ChevronUp size={16} color={tint} /> : <ChevronDown size={16} color={tint} />}
      </Pressable>
      {open ? (
        <View className="mt-2">
          <Body>{what}</Body>
          <View className="mt-3 gap-2">
            {steps.map((step, i) => (
              <View key={step} className="flex-row items-start gap-3">
                <View
                  className="mt-0.5 h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: tint }}
                >
                  <Mono bold color={C.paper2} className="text-[12px]">
                    {String(i + 1)}
                  </Mono>
                </View>
                <Body className="flex-1">{step}</Body>
              </View>
            ))}
          </View>
          <View
            className="mt-3 rounded-xl px-3 py-2.5"
            style={{ backgroundColor: alpha(tint, 0.1) }}
          >
            <Mono bold color={C.ink} className="text-[13px]">
              {`You leave with: ${outcome}`}
            </Mono>
          </View>
        </View>
      ) : null}
    </Panel>
  );
}

/** Numbered step pills for multi-step activities. */
export function StepTabs({
  steps,
  active,
  done,
  tint,
  onSelect,
}: {
  steps: string[];
  active: number;
  done: number[];
  tint: string;
  onSelect: (index: number) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 py-1"
      className="mt-5"
    >
      {steps.map((label, i) => {
        const isActive = i === active;
        const isDone = done.includes(i);
        return (
          <Pressable
            key={label}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Step ${i + 1}: ${label}${isDone ? ', done' : ''}`}
            onPress={() => onSelect(i)}
            className="min-h-11 flex-row items-center gap-2 rounded-full px-3.5 active:opacity-70"
            style={{
              backgroundColor: isActive ? tint : isDone ? alpha(tint, 0.14) : C.card,
              borderWidth: 1,
              borderColor: alpha(tint, isActive ? 1 : 0.3),
            }}
          >
            <Mono bold color={isActive ? C.paper2 : tint} className="text-[12px]">
              {isDone && !isActive ? '✓' : String(i + 1)}
            </Mono>
            <Mono bold color={isActive ? C.paper2 : C.inkSoft} className="text-[12px]">
              {label}
            </Mono>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

/** "Next step" button at the bottom of a step. */
export function NextStepButton({
  label,
  tint,
  onPress,
}: {
  label: string;
  tint: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="mt-6 min-h-12 items-center justify-center rounded-full px-5 active:opacity-80"
      style={{ backgroundColor: tint }}
    >
      <Mono bold color={C.paper2} tracking={1} className="text-[13px]">
        {label}
      </Mono>
    </Pressable>
  );
}
