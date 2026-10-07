import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronLeft, ChevronRight, Eye, Search, Users } from 'lucide-react-native';

import { Body, Display, Eyebrow, Mono } from '@/components/cape/Type';
import { DETECTIVE_SCENES, PRACTICE_CARDS } from '@/lib/data/cafe';
import { C, alpha, wash } from '@/lib/colors';

type Drill = 'detective' | 'roleplay';

/** Station 04 — detective case files and two-person role-play scripts. */
export function PracticeSection() {
  const [drill, setDrill] = useState<Drill>('detective');

  return (
    <View>
      <Eyebrow color={C.violet}>STATION 04 · PRACTICE</Eyebrow>
      <Display className="mt-2 text-4xl">Run the drill.</Display>
      <Body className="mt-3">
        Muscle memory beats good intentions. Work the case files, then run the scripts out loud with
        a partner or in your head.
      </Body>

      <View className="mt-5 flex-row gap-2">
        <DrillTab
          label="CASE FILES"
          icon={<Search size={13} color={drill === 'detective' ? C.violet : C.inkFaint} />}
          active={drill === 'detective'}
          onPress={() => setDrill('detective')}
        />
        <DrillTab
          label="ROLE-PLAY"
          icon={<Users size={13} color={drill === 'roleplay' ? C.violet : C.inkFaint} />}
          active={drill === 'roleplay'}
          onPress={() => setDrill('roleplay')}
        />
      </View>

      {drill === 'detective' ? <DetectiveDeck /> : <RolePlayDeck />}
    </View>
  );
}

function DrillTab({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className="min-h-11 flex-1 flex-row items-center justify-center gap-2 rounded-full py-2.5 active:opacity-70"
      style={{
        backgroundColor: active ? wash(C.violet, 0.16) : C.card,
        borderWidth: 1,
        borderColor: alpha(active ? C.violet : C.ink, active ? 0.5 : 0.14),
      }}
    >
      {icon}
      <Mono bold tracking={1.5} color={active ? C.violet : C.inkFaint} className="text-[9px]">
        {label}
      </Mono>
    </Pressable>
  );
}

function DeckNav({
  index,
  total,
  onChange,
}: {
  index: number;
  total: number;
  onChange: (next: number) => void;
}) {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <NavButton
        label="PREVIOUS"
        disabled={index === 0}
        onPress={() => onChange(index - 1)}
        icon={<ChevronLeft size={14} color={C.inkSoft} />}
      />
      <Mono bold color={C.inkFaint} className="text-[10px]">
        {index + 1} / {total}
      </Mono>
      <NavButton
        label="NEXT"
        disabled={index === total - 1}
        onPress={() => onChange(index + 1)}
        icon={<ChevronRight size={14} color={C.inkSoft} />}
        trailing
      />
    </View>
  );
}

function NavButton({
  label,
  disabled,
  onPress,
  icon,
  trailing = false,
}: {
  label: string;
  disabled: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  trailing?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className="flex-row items-center gap-1.5 rounded-full px-3.5 py-2 active:opacity-70"
      style={{
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: alpha(C.ink, 0.16),
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {trailing ? null : icon}
      <Mono bold color={C.inkSoft} tracking={1.5} className="text-[9px]">
        {label}
      </Mono>
      {trailing ? icon : null}
    </Pressable>
  );
}

/** Three case files: tick the broken principles, then reveal the verdict. */
function DetectiveDeck() {
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const scene = DETECTIVE_SCENES[index];
  const isRevealed = revealed.includes(scene.id);

  const toggleClue = (letter: string) => {
    const key = `${scene.id}-${letter}`;
    setChecked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  return (
    <View>
      <View
        className="mt-5 rounded-2xl p-4"
        style={{
          backgroundColor: C.card,
          borderWidth: 1,
          borderColor: alpha(C.violet, 0.3),
          borderTopWidth: 3,
          borderTopColor: C.violet,
          shadowColor: C.ink,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Eyebrow color={C.violet}>CASE FILE {String(index + 1).padStart(2, '0')}</Eyebrow>
        <Display className="mt-1.5 text-2xl">{scene.title}</Display>

        <View
          className="mt-3 rounded-xl p-3"
          style={{
            backgroundColor: wash(C.violet, 0.07),
            borderLeftWidth: 2,
            borderLeftColor: C.violet,
          }}
        >
          <Mono color={C.inkSoft} className="text-[11px]">
            {scene.setup}
          </Mono>
        </View>

        <Mono bold color={C.inkFaint} className="mt-4 text-[10px]">
          {scene.prompt}
        </Mono>

        <View className="mt-3 gap-2">
          {scene.clues.map((clue) => {
            const on = checked.includes(`${scene.id}-${clue.letter}`);
            return (
              <Pressable
                key={clue.letter}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
                onPress={() => toggleClue(clue.letter)}
                className="flex-row items-center gap-3 rounded-xl p-3 active:opacity-70"
                style={{
                  backgroundColor: on ? wash(C.tealBright, 0.13) : C.paper2,
                  borderWidth: 1,
                  borderColor: alpha(on ? C.tealBright : C.ink, on ? 0.5 : 0.12),
                }}
              >
                <View
                  className="h-6 w-6 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: on ? wash(C.tealBright, 0.24) : C.card,
                    borderWidth: 1,
                    borderColor: alpha(on ? C.tealBright : C.ink, on ? 0.65 : 0.18),
                  }}
                >
                  <Mono bold color={on ? C.teal : C.inkFaint} className="text-[11px]">
                    {clue.letter}
                  </Mono>
                </View>
                <View className="flex-1">
                  <Mono bold color={C.ink} className="text-[10px]">
                    {clue.label}
                  </Mono>
                  <Mono className="mt-0.5 text-[10px]">{clue.text}</Mono>
                </View>
              </Pressable>
            );
          })}
        </View>

        {isRevealed ? (
          <View
            className="mt-4 rounded-xl p-3.5"
            style={{
              backgroundColor: wash(C.goldBright, 0.12),
              borderLeftWidth: 2,
              borderLeftColor: C.goldBright,
            }}
          >
            <Eyebrow color={C.gold}>DETECTIVE&apos;S VERDICT</Eyebrow>
            <Mono color={C.inkSoft} className="mt-1.5 text-[10px]">
              {scene.verdict}
            </Mono>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={() => setRevealed((prev) => [...prev, scene.id])}
            className="mt-4 flex-row items-center justify-center gap-2 rounded-xl py-3 active:opacity-70"
            style={{
              backgroundColor: wash(C.goldBright, 0.16),
              borderWidth: 1,
              borderColor: alpha(C.goldBright, 0.55),
            }}
          >
            <Eye size={14} color={C.gold} />
            <Mono bold color={C.gold} tracking={2} className="text-[10px]">
              REVEAL VERDICT
            </Mono>
          </Pressable>
        )}
      </View>

      <DeckNav index={index} total={DETECTIVE_SCENES.length} onChange={setIndex} />
    </View>
  );
}

/** Two-person scripts with the strong line and the pressure line side by side. */
function RolePlayDeck() {
  const [index, setIndex] = useState(0);
  const card = PRACTICE_CARDS[index];

  return (
    <View>
      <View
        className="mt-5 rounded-2xl p-4"
        style={{
          backgroundColor: C.card,
          borderWidth: 1,
          borderColor: alpha(C.modT, 0.3),
          borderTopWidth: 3,
          borderTopColor: C.modT,
          shadowColor: C.ink,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Eyebrow color={C.modT}>SCRIPT {String(index + 1).padStart(2, '0')}</Eyebrow>
        <Display className="mt-1.5 text-2xl">{card.title}</Display>

        <View className="mt-3 flex-row flex-wrap gap-2">
          <RoleChip label={card.roleA} tint={C.teal} />
          <RoleChip label={card.roleB} tint={C.modT} />
        </View>

        <View className="mt-4 gap-2">
          {card.lines.map((line) => {
            const tint = line.flag ? C.no : line.side === 'a' ? C.teal : C.modT;
            return (
              <View
                key={`${card.id}-${line.speaker}`}
                className="rounded-xl p-3"
                style={{
                  backgroundColor: wash(tint, line.flag ? 0.1 : 0.06),
                  borderLeftWidth: 2,
                  borderLeftColor: tint,
                }}
              >
                <Mono bold color={tint} tracking={1.2} className="text-[9px]">
                  {line.speaker.toUpperCase()}
                  {line.flag ? ' · PRESSURE' : ''}
                </Mono>
                <Mono color={C.inkSoft} className="mt-1 text-[11px]">
                  {line.text}
                </Mono>
              </View>
            );
          })}
        </View>

        <View
          className="mt-4 rounded-xl p-3.5"
          style={{
            backgroundColor: C.paper2,
            borderWidth: 1,
            borderColor: alpha(C.ink, 0.1),
          }}
        >
          <Eyebrow color={C.inkFaint}>REFLECT</Eyebrow>
          <Mono className="mt-1.5 text-[10px]">{card.reflection}</Mono>
        </View>
      </View>

      <DeckNav index={index} total={PRACTICE_CARDS.length} onChange={setIndex} />
    </View>
  );
}

function RoleChip({ label, tint }: { label: string; tint: string }) {
  return (
    <View
      className="rounded-full px-3 py-1"
      style={{
        backgroundColor: wash(tint, 0.13),
        borderWidth: 1,
        borderColor: alpha(tint, 0.4),
      }}
    >
      <Mono bold color={tint} className="text-[9px]">
        {label}
      </Mono>
    </View>
  );
}
