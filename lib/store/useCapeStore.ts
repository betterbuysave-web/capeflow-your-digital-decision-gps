import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  ALL_LESSONS,
  MATCH_MODULES,
  type ModuleId,
  allLessonsForTrack,
  lessonsForTrack,
} from '@/lib/data/match';
import { BOUNDARY_MENU, type BoundaryAnswer } from '@/lib/data/boundaries';
import { SCENARIOS, type Verdict } from '@/lib/data/scenarios';
import { type GradeBand, type Track, trackFor } from '@/lib/data/content';
import { type FearState, ghostsForTrack } from '@/lib/data/ghosts';
import {
  CAFE_QUIZ,
  DEFAULT_CAFE_MENU,
  EXIT_QUESTIONS,
  type CafeCourse,
  type CafeMenu,
} from '@/lib/data/cafe';

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

/** A ghost that has been pulled into the light — named, then disarmed with a plan. */
export type GhostStatus = 'named' | 'disarmed';

export interface GhostRecord {
  status: GhostStatus;
  plan: string;
  at: number;
}

/** A fear the user typed themselves, mapped to a M.A.T.C.H. node by hand. */
export interface CustomGhost {
  id: string;
  name: string;
  node: ModuleId;
}

/** The Consent Café exit card — four written reflections plus a confidence read. */
export interface CafeExitCard {
  answers: string[];
  confidence: number | null;
  completedAt: number | null;
}

function freshCafeMenu(): CafeMenu {
  return {
    appetizers: [...DEFAULT_CAFE_MENU.appetizers],
    mains: [...DEFAULT_CAFE_MENU.mains],
    notserved: [...DEFAULT_CAFE_MENU.notserved],
  };
}

function freshExitCard(): CafeExitCard {
  return { answers: EXIT_QUESTIONS.map(() => ''), confidence: null, completedAt: null };
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
  ghosts: Record<string, GhostRecord>;
  customGhosts: CustomGhost[];
  fearState: FearState | null;
  cafeMenu: CafeMenu;
  cafeQuiz: Record<string, boolean>;
  cafeExit: CafeExitCard;
  facilitatorNotes: string;

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
  nameGhost: (ghostId: string) => void;
  disarmGhost: (ghostId: string, plan: string) => void;
  setGhostPlan: (ghostId: string, plan: string) => void;
  releaseGhost: (ghostId: string) => void;
  addCustomGhost: (name: string, node: ModuleId) => void;
  removeCustomGhost: (ghostId: string) => void;
  setFearState: (state: FearState) => void;
  addCafeItem: (course: CafeCourse, text: string) => void;
  setCafeItem: (course: CafeCourse, index: number, text: string) => void;
  removeCafeItem: (course: CafeCourse, index: number) => void;
  resetCafeMenu: () => void;
  answerCafeQuiz: (questionId: string, correct: boolean) => void;
  setCafeExitAnswer: (index: number, text: string) => void;
  setCafeConfidence: (value: number) => void;
  completeCafeExit: () => void;
  clearCafeExit: () => void;
  setFacilitatorNotes: (notes: string) => void;
  resetAll: () => void;
}

const TOTAL_LESSONS = ALL_LESSONS.length;
const TOTAL_SCENARIOS = SCENARIOS.length;
const TOTAL_BOUNDARIES = BOUNDARY_MENU.length;

/** Disarmed ghosts needed for full vault credit on the SafER Score. */
export const VAULT_TARGET = 6;

function dayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function isYesterday(key: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dayKey(yesterday) === key;
}

/** Lessons available on the reader's track — Green keeps blue-only lessons locked. */
export function lessonTotal(band: GradeBand | null): number {
  return allLessonsForTrack(trackFor(band)).length;
}

/** Ghosts available on the reader's track. */
export function ghostTotal(band: GradeBand | null): number {
  return ghostsForTrack(trackFor(band)).length;
}

/** Ghosts pulled into the light and turned into a shield with a plan. */
export function disarmedCount(ghosts: Record<string, GhostRecord>): number {
  return Object.values(ghosts).filter((g) => g.status === 'disarmed').length;
}

/** SafER Score: 0–100 readiness across knowledge, boundaries, team, practice, and the vault. */
export function saferScore(state: {
  completedLessons: string[];
  boundaries: Record<string, BoundaryAnswer>;
  circle: CircleContact[];
  scenarioResults: Record<string, ScenarioResult>;
  ghosts?: Record<string, GhostRecord>;
  gradeBand?: GradeBand | null;
}): number {
  const total = lessonTotal(state.gradeBand ?? null);
  const lessons = (Math.min(state.completedLessons.length, total) / total) * 40;
  const answered = Object.keys(state.boundaries).length;
  const menu = (Math.min(answered, TOTAL_BOUNDARIES) / TOTAL_BOUNDARIES) * 14;
  const team = (Math.min(state.circle.length, 3) / 3) * 14;
  const played = Object.keys(state.scenarioResults).length;
  const sims = (Math.min(played, TOTAL_SCENARIOS) / TOTAL_SCENARIOS) * 22;
  const disarmed = disarmedCount(state.ghosts ?? {});
  const vault = (Math.min(disarmed, VAULT_TARGET) / VAULT_TARGET) * 10;
  return Math.round(lessons + menu + team + sims + vault);
}

export function moduleProgress(
  moduleId: ModuleId,
  completedLessons: string[],
  track: Track = 'blue',
): number {
  const mod = MATCH_MODULES.find((m) => m.id === moduleId);
  if (!mod) return 0;
  const available = lessonsForTrack(mod, track);
  if (available.length === 0) return 0;
  const done = available.filter((l) => completedLessons.includes(l.id)).length;
  return Math.round((done / available.length) * 100);
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
  const track = trackFor(state.gradeBand);

  if (state.completedLessons.length > 0) earned.add('first-step');
  for (const mod of MATCH_MODULES) {
    if (moduleProgress(mod.id, state.completedLessons, track) === 100)
      earned.add(MODULE_BADGE[mod.id]);
  }
  if (state.circle.length >= 3) earned.add('circle-built');
  if (Object.keys(state.boundaries).length >= 8) earned.add('menu-set');

  const results = Object.values(state.scenarioResults);
  if (results.length >= 3) earned.add('night-shift');
  if (results.filter((r) => r.verdict === 'best').length >= 3) earned.add('clean-run');
  if (state.streak >= 3) earned.add('streak-3');
  const quizCorrect = Object.values(state.cafeQuiz).filter(Boolean).length;
  if (quizCorrect >= CAFE_QUIZ.length) earned.add('fries-detective');
  if (state.cafeExit.completedAt !== null) earned.add('cafe-regular');
  if (Object.keys(state.ghosts).length > 0) earned.add('ghost-named');
  if (disarmedCount(state.ghosts) >= VAULT_TARGET) earned.add('vault-armed');
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
  ghosts: {} as Record<string, GhostRecord>,
  customGhosts: [] as CustomGhost[],
  fearState: null,
  cafeMenu: freshCafeMenu(),
  cafeQuiz: {} as Record<string, boolean>,
  cafeExit: freshExitCard(),
  facilitatorNotes: '',
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

      nameGhost: (ghostId) => {
        if (get().ghosts[ghostId]) return;
        set((s) => ({
          ghosts: { ...s.ghosts, [ghostId]: { status: 'named', plan: '', at: Date.now() } },
          xp: s.xp + 5,
        }));
        set({ badges: earnedBadges(get()) });
      },

      disarmGhost: (ghostId, plan) => {
        const current = get().ghosts[ghostId];
        const alreadyDisarmed = current?.status === 'disarmed';
        set((s) => ({
          ghosts: {
            ...s.ghosts,
            [ghostId]: { status: 'disarmed', plan: plan.trim(), at: Date.now() },
          },
          xp: alreadyDisarmed ? s.xp : s.xp + 15,
        }));
        set({ badges: earnedBadges(get()) });
      },

      setGhostPlan: (ghostId, plan) => {
        const current = get().ghosts[ghostId];
        if (!current) return;
        set((s) => ({ ghosts: { ...s.ghosts, [ghostId]: { ...current, plan } } }));
      },

      releaseGhost: (ghostId) => {
        set((s) => {
          const next = { ...s.ghosts };
          delete next[ghostId];
          return { ghosts: next };
        });
      },

      addCustomGhost: (name, node) => {
        const label = name.trim();
        if (label.length === 0) return;
        const id = `custom-${Date.now()}`;
        set((s) => ({
          customGhosts: [...s.customGhosts, { id, name: label, node }],
          ghosts: { ...s.ghosts, [id]: { status: 'named', plan: '', at: Date.now() } },
          xp: s.xp + 5,
        }));
        set({ badges: earnedBadges(get()) });
      },

      removeCustomGhost: (ghostId) => {
        set((s) => {
          const nextGhosts = { ...s.ghosts };
          delete nextGhosts[ghostId];
          return {
            customGhosts: s.customGhosts.filter((g) => g.id !== ghostId),
            ghosts: nextGhosts,
          };
        });
      },

      setFearState: (state) => set({ fearState: state }),

      addCafeItem: (course, text) => {
        const id = `${course}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        set((s) => ({
          cafeMenu: { ...s.cafeMenu, [course]: [...s.cafeMenu[course], { id, text }] },
        }));
      },

      setCafeItem: (course, index, text) => {
        set((s) => ({
          cafeMenu: {
            ...s.cafeMenu,
            [course]: s.cafeMenu[course].map((item, i) => (i === index ? { ...item, text } : item)),
          },
        }));
      },

      removeCafeItem: (course, index) => {
        set((s) => ({
          cafeMenu: { ...s.cafeMenu, [course]: s.cafeMenu[course].filter((_, i) => i !== index) },
        }));
      },

      resetCafeMenu: () => set({ cafeMenu: { appetizers: [], mains: [], notserved: [] } }),

      answerCafeQuiz: (questionId, correct) => {
        if (get().cafeQuiz[questionId]) return;
        set((s) => ({
          cafeQuiz: { ...s.cafeQuiz, [questionId]: correct },
          xp: correct ? s.xp + 3 : s.xp,
        }));
        set({ badges: earnedBadges(get()) });
      },

      setCafeExitAnswer: (index, text) => {
        set((s) => ({
          cafeExit: {
            ...s.cafeExit,
            answers: s.cafeExit.answers.map((a, i) => (i === index ? text : a)),
          },
        }));
      },

      setCafeConfidence: (value) => {
        set((s) => ({ cafeExit: { ...s.cafeExit, confidence: value } }));
      },

      completeCafeExit: () => {
        const already = get().cafeExit.completedAt !== null;
        set((s) => ({
          cafeExit: { ...s.cafeExit, completedAt: Date.now() },
          xp: already ? s.xp : s.xp + 10,
        }));
        set({ badges: earnedBadges(get()) });
      },

      clearCafeExit: () => set({ cafeExit: freshExitCard() }),

      setFacilitatorNotes: (notes) => set({ facilitatorNotes: notes }),

      resetAll: () => set({ ...initial, cafeMenu: freshCafeMenu(), cafeExit: freshExitCard() }),
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
