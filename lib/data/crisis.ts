import { C } from '@/lib/colors';

export interface CrisisLine {
  id: string;
  emoji: string;
  name: string;
  detail: string;
  dial?: string;
  sms?: { number: string; body: string };
  tint: string;
}

export const CRISIS_LINES: CrisisLine[] = [
  {
    id: '988',
    emoji: '🆘',
    name: '988 — SUICIDE & CRISIS LIFELINE',
    detail: 'Call or text · 24/7 · Free · Confidential',
    dial: '988',
    sms: { number: '988', body: 'HELLO' },
    tint: C.flame,
  },
  {
    id: 'crisis-text',
    emoji: '💬',
    name: 'CRISIS TEXT LINE',
    detail: 'Text HOME to 741741 · 24/7 · Trained counselor',
    sms: { number: '741741', body: 'HOME' },
    tint: C.magenta,
  },
  {
    id: 'emergency',
    emoji: '🚑',
    name: '911 — EMERGENCY',
    detail: 'Immediate danger, overdose, serious injury',
    dial: '911',
    tint: C.no,
  },
  {
    id: 'rainn',
    emoji: '🛡️',
    name: 'RAINN NATIONAL HOTLINE',
    detail: '800-656-4673 · Sexual assault support · 24/7',
    dial: '8006564673',
    tint: C.purple,
  },
  {
    id: 'trevor',
    emoji: '🏳️‍🌈',
    name: 'THE TREVOR PROJECT',
    detail: '866-488-7386 · LGBTQ+ youth · 24/7',
    dial: '8664887386',
    tint: C.gold,
  },
  {
    id: 'poison',
    emoji: '☣️',
    name: 'POISON CONTROL',
    detail: '800-222-1222 · Ingestion, overdose questions',
    dial: '8002221222',
    tint: C.modM,
  },
  {
    id: 'trafficking',
    emoji: '🧭',
    name: 'HUMAN TRAFFICKING HOTLINE',
    detail: '888-373-7888 · Text 233733 · 24/7',
    dial: '8883737888',
    sms: { number: '233733', body: 'HELP' },
    tint: C.modA,
  },
];

export interface CrisisStep {
  title: string;
  detail: string;
}

export const CRISIS_STEPS: CrisisStep[] = [
  {
    title: '1 · GET SOMEWHERE SAFER',
    detail: 'Lit space, other people nearby, door you can leave through.',
  },
  {
    title: '2 · TELL ONE HUMAN',
    detail: 'Safety Circle contact, any adult, or a 24/7 line. Do not carry it alone.',
  },
  {
    title: '3 · DO NOT WAIT FOR CARE',
    detail:
      'If something happened and you may need medical care, ask a trusted adult to help you reach an emergency department now.',
  },
  {
    title: '4 · WRITE IT DOWN',
    detail: 'Time, place, names, screenshots. Memory degrades fast under stress.',
  },
  {
    title: '5 · GET SEEN',
    detail: 'Urgent care or an emergency department can start care today.',
  },
];

export const PEP_WINDOW_MS = 72 * 60 * 60 * 1000;
