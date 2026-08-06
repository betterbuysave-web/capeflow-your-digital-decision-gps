import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ALL_LESSONS, MATCH_MODULES, type ModuleId } from '@/lib/data/match';
import { BOUNDARY_MENU, type BoundaryAnswer } from '@/lib/data/boundaries';
import { SCENARIOS, type Verdict } from '@/lib/data/scenarios';
import type { GradeBand } from '@/lib/data/content';

export interface CircleContact {
  id: string;
  name: string;
  role: string;
  phone: string;
}

export interface ScenarioResult {
  choiceId: string;
  verdict: Verdict;
  at: number;
}

interface CapeState {
  onboarded: boolean;
  gradeBand: GradeBand | null;
  codename: string;
  xp: number;
  completedLessons: string[];
  scenarioResults: Record<string, ScenarioResult>;
  boundaries: Record<string, BoundaryAnswer>;
  circle: CircleContact[];
  badges: string[];
  pepStartedAt: number | null;
  streak: number;
  lastVisitDay: string | null;
  privacyAcknowledged: boolean;

  startJourney: (band: GradeBand, codename: string) => void;
  completeLesson: (lessonId: string, xp: number) => void;
  recordScenario: (scenarioId: string, choiceId: string, verdict: Verdict, xp: number) => void;
  setBoundary: (itemId: string, answer: BoundaryAnswer) => void;
  addContact: (contact: Omit<CircleContact, 'id'>) => void;
  removeContact: (id: string) => void;
  startPep: () => void;
  clearPep: () => void;
  registerVisit: () => void;
  acknowledgePrivacy: () => void;
  resetAll: () => void;
}

const TOTAL_LESSONS = ALL_LESSONS.length;
const TOTAL_SCENARIOS = SCENARIOS.length;
const TOTAL_BOUNDARIES = BOUNDARY_MENU.length;

function dayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function isYesterday(key: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dayKey(yesterday) === key;
}

/** SafER Score: 0–100 readiness across knowledge, boundaries, team, and practice. */
export function saferScore(state: {
  completedLessons: string[];
  boundaries: Record<string, BoundaryAnswer>;
  circle: CircleContact[];
  scenarioResults: Record<string, ScenarioResult>;
}): number {
  const lessons = (state.completedLessons.length / TOTAL_LESSONS) * 45;
  const answered = Object.keys(state.boundaries).length;
  const menu = (Math.min(answered, TOTAL_BOUNDARIES) / TOTAL_BOUNDARIES) * 15;
  const team = (Math.min(state.circle.length, 3) / 3) * 15;
  const played = Object.keys(state.scenarioResults).length;
  const sims = (Math.min(played, TOTAL_SCENARIOS) / TOTAL_SCENARIOS) * 25;
  return Math.round(lessons + menu + team + sims);
}

export function moduleProgress(moduleId: ModuleId, completedLessons: string[]): number {
  const mod = MATCH_MODULES.find((m) => m.id === moduleId);
  if (!mod) return 0;
  const done = mod.lessons.filter((l) => completedLessons.includes(l.id)).length;
  return Math.round((done / mod.lessons.length) * 100);
}

const MODULE_BADGE: Record<ModuleId, string> = {
  medical: 'medic',
  awareness: 'radar',
  tools: 'toolkit',
  comms: 'orator',
  habits: 'daily',
};

function earnedBadges(state: CapeState): string[] {
  const earned = new Set(state.badges);

  if (state.completedLessons.length > 0) earned.add('first-step');
  for (const mod of MATCH_MODULES) {
    if (moduleProgress(mod.id, state.completedLessons) === 100) earned.add(MODULE_BADGE[mod.id]);
  }
  if (state.circle.length >= 3) earned.add('circle-built');
  if (Object.keys(state.boundaries).length >= 8) earned.add('menu-set');

  const results = Object.values(state.scenarioResults);
  if (results.length >= 3) earned.add('night-shift');
  if (results.filter((r) => r.verdict === 'best').length >= 3) earned.add('clean-run');
  if (state.streak >= 3) earned.add('streak-3');
  if (saferScore(state) >= 100) earned.add('compass-complete');

  return [...earned];
}

const initial = {
  onboarded: false,
  gradeBand: null,
  codename: '',
  xp: 0,
  completedLessons: [] as string[],
  scenarioResults: {} as Record<string, ScenarioResult>,
  boundaries: {} as Record<string, BoundaryAnswer>,
  circle: [] as CircleContact[],
  badges: [] as string[],
  pepStartedAt: null,
  streak: 0,
  lastVisitDay: null,
  privacyAcknowledged: false,
};

export const useCapeStore = create<CapeState>()(
  persist(
    (set, get) => ({
      ...initial,

      startJourney: (band, codename) => {
        set({ onboarded: true, gradeBand: band, codename: codename.trim() });
        get().registerVisit();
      },

      completeLesson: (lessonId, xp) => {
        if (get().completedLessons.includes(lessonId)) return;
        set((s) => ({ completedLessons: [...s.completedLessons, lessonId], xp: s.xp + xp }));
        set({ badges: earnedBadges(get()) });
      },

      recordScenario: (scenarioId, choiceId, verdict, xp) => {
        const already = get().scenarioResults[scenarioId];
        set((s) => ({
          scenarioResults: {
            ...s.scenarioResults,
            [scenarioId]: { choiceId, verdict, at: Date.now() },
          },
          xp: already ? s.xp : s.xp + xp,
        }));
        set({ badges: earnedBadges(get()) });
      },

      setBoundary: (itemId, answer) => {
        set((s) => ({ boundaries: { ...s.boundaries, [itemId]: answer } }));
        set({ badges: earnedBadges(get()) });
      },

      addContact: (contact) => {
        set((s) => ({
          circle: [...s.circle, { ...contact, id: `${Date.now()}-${s.circle.length}` }],
        }));
        set({ badges: earnedBadges(get()) });
      },

      removeContact: (id) => {
        set((s) => ({ circle: s.circle.filter((c) => c.id !== id) }));
      },

      startPep: () => set({ pepStartedAt: Date.now() }),
      clearPep: () => set({ pepStartedAt: null }),

      registerVisit: () => {
        const today = dayKey();
        const last = get().lastVisitDay;
        if (last === today) return;
        const nextStreak = last && isYesterday(last) ? get().streak + 1 : 1;
        set({ lastVisitDay: today, streak: nextStreak });
        set({ badges: earnedBadges(get()) });
      },

      acknowledgePrivacy: () => set({ privacyAcknowledged: true }),

      resetAll: () => set({ ...initial }),
    }),
    {
      name: 'cape-flow-v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const TOTALS = {
  lessons: TOTAL_LESSONS,
  scenarios: TOTAL_SCENARIOS,
  boundaries: TOTAL_BOUNDARIES,
};
