import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { AccessibleSheet } from '@/components/cape/AccessibleSheet';
import { GraduationCap, NotebookPen, Pause, Play, RotateCcw, Timer, X } from 'lucide-react-native';

import { Display, Eyebrow, Mono } from '@/components/cape/Type';
import { TIMER_PRESETS } from '@/lib/data/cafe';
import { C, alpha, wash } from '@/lib/colors';
import { useCapeStore } from '@/lib/store/useCapeStore';

const INPUT_FONT = 'JetBrainsMono_400Regular';

/** Header toggle that turns facilitator mode on and off. */
export function FacilitatorToggle({ active, onPress }: { active: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: active }}
      accessibilityLabel="Facilitator mode"
      onPress={onPress}
      className="min-h-11 flex-row items-center gap-1.5 rounded-full px-3 active:opacity-70"
      style={{
        backgroundColor: active ? wash(C.goldBright, 0.2, C.paper2) : C.card,
        borderWidth: 1,
        borderColor: alpha(active ? C.goldBright : C.ink, active ? 0.6 : 0.16),
      }}
    >
      <GraduationCap size={14} color={active ? C.gold : C.inkFaint} />
      <Mono bold tracking={1.5} color={active ? C.gold : C.inkFaint} className="text-[8px]">
        FACILITATOR
      </Mono>
    </Pressable>
  );
}

/** Session tools strip: discussion timer and private session notes. */
export function FacilitatorBar({ onExit }: { onExit: () => void }) {
  const [tool, setTool] = useState<'timer' | 'notes' | null>(null);

  return (
    <View
      className="flex-wrap items-center gap-2 px-5 py-2.5"
      style={{
        backgroundColor: wash(C.goldBright, 0.14, C.paper2),
        borderBottomWidth: 1,
        borderBottomColor: alpha(C.goldBright, 0.45),
      }}
    >
      <Eyebrow color={C.gold}>SESSION TOOLS</Eyebrow>
      <View className="flex-row flex-wrap justify-center gap-2">
        <BarButton
          label="TIMER"
          icon={<Timer size={13} color={C.inkSoft} />}
          onPress={() => setTool('timer')}
        />
        <BarButton
          label="NOTES"
          icon={<NotebookPen size={13} color={C.inkSoft} />}
          onPress={() => setTool('notes')}
        />
        <BarButton label="EXIT" tint={C.no} icon={<X size={13} color={C.no} />} onPress={onExit} />
      </View>

      <DiscussionTimer visible={tool === 'timer'} onClose={() => setTool(null)} />
      <SessionNotes visible={tool === 'notes'} onClose={() => setTool(null)} />
    </View>
  );
}

function BarButton({
  label,
  icon,
  onPress,
  tint = C.ink,
}: {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  tint?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="min-h-11 min-w-11 flex-row items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 active:opacity-70"
      style={{
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: alpha(tint, tint === C.no ? 0.4 : 0.16),
      }}
    >
      {icon}
      <Mono bold color={tint === C.no ? C.no : C.inkSoft} className="text-[8px]">
        {label}
      </Mono>
    </Pressable>
  );
}

function DiscussionTimer({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [preset, setPreset] = useState(5);
  const [seconds, setSeconds] = useState(300);
  const [running, setRunning] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return () => {};
    tick.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running]);

  const choose = (minutes: number) => {
    setRunning(false);
    setPreset(minutes);
    setSeconds(minutes * 60);
  };

  const label = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  const tint = seconds === 0 ? C.no : seconds <= 30 ? C.amber : running ? C.teal : C.ink;

  return (
    <AccessibleSheet visible={visible} onClose={onClose} title="Discussion timer" tint={C.gold}>
      <Mono className="mt-2 text-[10px]">
        Set a countdown for group discussion or silent journaling time.
      </Mono>

      <Display color={tint} className="mt-4 text-center text-6xl">
        {seconds === 0 ? 'TIME' : label}
      </Display>

      <View className="mt-4 flex-row gap-2">
        {TIMER_PRESETS.map((minutes) => {
          const active = preset === minutes;
          return (
            <Pressable
              key={minutes}
              accessibilityRole="radio"
              accessibilityLabel={`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`}
              accessibilityState={{ checked: active, selected: active }}
              onPress={() => choose(minutes)}
              className="min-h-11 flex-1 items-center justify-center rounded-xl py-2.5 active:opacity-70"
              style={{
                backgroundColor: active ? wash(C.tealBright, 0.18) : C.card,
                borderWidth: 1,
                borderColor: alpha(active ? C.tealBright : C.ink, active ? 0.55 : 0.14),
              }}
            >
              <Mono bold color={active ? C.teal : C.inkSoft} className="text-[10px]">
                {minutes} MIN
              </Mono>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 flex-row gap-2.5">
        <Pressable
          accessibilityRole="button"
          onPress={() => (seconds === 0 ? choose(preset) : setRunning((r) => !r))}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-xl py-3 active:opacity-70"
          style={{
            backgroundColor: wash(C.tealBright, 0.16),
            borderWidth: 1,
            borderColor: alpha(C.tealBright, 0.5),
          }}
        >
          {running ? <Pause size={14} color={C.teal} /> : <Play size={14} color={C.teal} />}
          <Mono bold color={C.teal} tracking={2} className="text-[10px]">
            {seconds === 0 ? 'RESET' : running ? 'PAUSE' : 'START'}
          </Mono>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => choose(preset)}
          className="flex-row items-center justify-center gap-2 rounded-xl px-4 py-3 active:opacity-70"
          style={{
            backgroundColor: C.card,
            borderWidth: 1,
            borderColor: alpha(C.ink, 0.16),
          }}
        >
          <RotateCcw size={14} color={C.inkSoft} />
          <Mono bold color={C.inkSoft} tracking={2} className="text-[10px]">
            RESET
          </Mono>
        </Pressable>
      </View>
    </AccessibleSheet>
  );
}

function SessionNotes({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const notes = useCapeStore((s) => s.facilitatorNotes);
  const setFacilitatorNotes = useCapeStore((s) => s.setFacilitatorNotes);

  return (
    <AccessibleSheet
      visible={visible}
      onClose={onClose}
      title="Session notes"
      tint={C.gold}
      footer={
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          className="min-h-11 items-center justify-center rounded-xl py-3 active:opacity-70"
          style={{
            backgroundColor: wash(C.goldBright, 0.16),
            borderWidth: 1,
            borderColor: alpha(C.goldBright, 0.55),
          }}
        >
          <Mono bold color={C.gold} tracking={2} className="text-[10px]">
            DONE
          </Mono>
        </Pressable>
      }
    >
      <Mono className="mt-2 text-[10px]">
        Observations, participant comments, follow-ups. Saved on this device only.
      </Mono>
      <TextInput
        accessibilityLabel="Session notes"
        value={notes}
        onChangeText={setFacilitatorNotes}
        placeholder="Type session notes here…"
        placeholderTextColor={C.inkFaint}
        multiline
        className="mt-3 rounded-xl px-3 py-2.5"
        style={{
          color: C.ink,
          fontFamily: INPUT_FONT,
          fontSize: 11,
          minHeight: 140,
          textAlignVertical: 'top',
          backgroundColor: C.card,
          borderWidth: 1,
          borderColor: alpha(C.goldBright, 0.4),
        }}
      />
    </AccessibleSheet>
  );
}
