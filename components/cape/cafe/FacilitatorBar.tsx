import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, TextInput, View } from 'react-native';
import { GraduationCap, NotebookPen, Pause, Play, RotateCcw, Timer, X } from 'lucide-react-native';

import { Display, Eyebrow, Mono } from '@/components/cape/Type';
import { TIMER_PRESETS } from '@/lib/data/cafe';
import { C, alpha } from '@/lib/colors';
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
      className="h-9 flex-row items-center gap-1.5 rounded-full px-3 active:opacity-70"
      style={{
        backgroundColor: alpha(C.gold, active ? 0.16 : 0.05),
        borderWidth: 1,
        borderColor: alpha(C.gold, active ? 0.5 : 0.14),
      }}
    >
      <GraduationCap size={14} color={active ? C.gold : alpha(C.slateFaint, 0.7)} />
      <Mono
        bold
        tracking={1.5}
        color={active ? C.gold : alpha(C.slateFaint, 0.7)}
        className="text-[8px]"
      >
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
      className="flex-row items-center gap-2 px-5 py-2.5"
      style={{
        backgroundColor: alpha(C.gold, 0.08),
        borderBottomWidth: 1,
        borderBottomColor: alpha(C.gold, 0.2),
      }}
    >
      <Eyebrow color={C.gold}>SESSION TOOLS</Eyebrow>
      <View className="flex-1 flex-row justify-end gap-2">
        <BarButton
          label="TIMER"
          icon={<Timer size={13} color={alpha(C.slateSoft, 0.85)} />}
          onPress={() => setTool('timer')}
        />
        <BarButton
          label="NOTES"
          icon={<NotebookPen size={13} color={alpha(C.slateSoft, 0.85)} />}
          onPress={() => setTool('notes')}
        />
        <BarButton
          label="EXIT"
          tint={C.no}
          icon={<X size={13} color={alpha(C.no, 0.9)} />}
          onPress={onExit}
        />
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
  tint = C.white,
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
      className="flex-row items-center gap-1.5 rounded-lg px-2.5 py-1.5 active:opacity-70"
      style={{
        backgroundColor: alpha(tint, 0.08),
        borderWidth: 1,
        borderColor: alpha(tint, 0.18),
      }}
    >
      {icon}
      <Mono bold color={alpha(tint === C.no ? C.no : C.slateSoft, 0.85)} className="text-[8px]">
        {label}
      </Mono>
    </Pressable>
  );
}

function Sheet({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={onClose}
        className="flex-1 justify-end"
        style={{ backgroundColor: alpha('#000000', 0.75) }}
      >
        <Pressable
          accessibilityRole="none"
          onPress={() => {}}
          className="rounded-t-3xl p-5"
          style={{
            backgroundColor: C.card,
            borderTopWidth: 1,
            borderTopColor: alpha(C.gold, 0.25),
          }}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
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
  const tint = seconds === 0 ? C.no : seconds <= 30 ? C.amber : running ? C.teal : C.slateSoft;

  return (
    <Sheet visible={visible} onClose={onClose}>
      <Eyebrow color={C.gold}>DISCUSSION TIMER</Eyebrow>
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
              accessibilityState={{ selected: active }}
              onPress={() => choose(minutes)}
              className="flex-1 items-center rounded-xl py-2.5 active:opacity-70"
              style={{
                backgroundColor: alpha(C.teal, active ? 0.18 : 0.04),
                borderWidth: 1,
                borderColor: alpha(C.teal, active ? 0.5 : 0.12),
              }}
            >
              <Mono bold color={active ? C.teal : alpha(C.slateSoft, 0.8)} className="text-[10px]">
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
            backgroundColor: alpha(C.teal, 0.16),
            borderWidth: 1,
            borderColor: alpha(C.teal, 0.4),
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
            backgroundColor: alpha(C.white, 0.05),
            borderWidth: 1,
            borderColor: alpha(C.white, 0.12),
          }}
        >
          <RotateCcw size={14} color={alpha(C.slateSoft, 0.85)} />
          <Mono bold color={alpha(C.slateSoft, 0.85)} tracking={2} className="text-[10px]">
            RESET
          </Mono>
        </Pressable>
      </View>
    </Sheet>
  );
}

function SessionNotes({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const notes = useCapeStore((s) => s.facilitatorNotes);
  const setFacilitatorNotes = useCapeStore((s) => s.setFacilitatorNotes);

  return (
    <Sheet visible={visible} onClose={onClose}>
      <Eyebrow color={C.gold}>SESSION NOTES</Eyebrow>
      <Mono className="mt-2 text-[10px]">
        Observations, participant comments, follow-ups. Saved on this device only.
      </Mono>
      <TextInput
        value={notes}
        onChangeText={setFacilitatorNotes}
        placeholder="Type session notes here…"
        placeholderTextColor={alpha(C.slateFaint, 0.4)}
        multiline
        className="mt-3 rounded-xl px-3 py-2.5"
        style={{
          color: C.white,
          fontFamily: INPUT_FONT,
          fontSize: 11,
          minHeight: 140,
          textAlignVertical: 'top',
          backgroundColor: alpha(C.white, 0.04),
          borderWidth: 1,
          borderColor: alpha(C.gold, 0.18),
        }}
      />
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        className="mt-4 items-center rounded-xl py-3 active:opacity-70"
        style={{
          backgroundColor: alpha(C.gold, 0.16),
          borderWidth: 1,
          borderColor: alpha(C.gold, 0.4),
        }}
      >
        <Mono bold color={C.gold} tracking={2} className="text-[10px]">
          DONE
        </Mono>
      </Pressable>
    </Sheet>
  );
}
