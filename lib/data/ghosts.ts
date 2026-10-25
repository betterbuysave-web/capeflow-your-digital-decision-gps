import { C } from '@/lib/colors';
import { COMPASS_NODES } from '@/lib/data/compass';
import type { ModuleId } from '@/lib/data/match';
import type { Track } from '@/lib/data/content';

/** The six healthcare fears in the youth Blue Track audit. */
export interface GhostDef {
  id: string;
  name: string;
  whisper: string;
  node: ModuleId;
  counter: string;
  shield: string;
  disarm: string[];
}

export const GHOSTS: GhostDef[] = [
  {
    id: 'phone',
    name: 'Phone Ghost',
    whisper: "They'll call my parent.",
    node: 'comms',
    counter: 'C — Clear Communication',
    shield: 'Contact plan',
    disarm: [
      'Ask how they’ll use your number.',
      '“Can you call this number and not leave a message?” or “Can you text instead of calling?”',
    ],
  },
  {
    id: 'bureaucracy',
    name: 'Bureaucracy Ghost',
    whisper: "I won't know what to say at the desk.",
    node: 'tools',
    counter: 'T — Tools & Trusted Support',
    shield: 'Intake line',
    disarm: ['Practice the intake line: “Hi, I’d like to get tested today. Do you take walk-ins?”'],
  },
  {
    // Preserve the saved plan ID when renaming the former Paper Trail Ghost.
    id: 'paper-trail',
    name: 'Confidentiality Ghost',
    whisper: "They'll tell my parents or my school.",
    node: 'comms',
    counter: 'C — Clear Communication',
    shield: 'Privacy questions',
    disarm: [
      '“How do you keep visits confidential? Who else sees my information?”',
      'Rules vary by clinic and by state — which is why you ask rather than assume.',
    ],
  },
  {
    id: 'needle',
    name: 'Needle Ghost',
    whisper: "I can't handle blood draws or shots.",
    node: 'awareness',
    counter: 'A — Awareness',
    shield: 'Needle comfort plan',
    disarm: [
      'Tell the person holding the needle: “I get lightheaded with needles. Can I lie down for this?”',
      'Clinics deal with this every single day.',
    ],
  },
  {
    id: 'language',
    name: 'Language Ghost',
    whisper: "I don't know the right words to use.",
    node: 'tools',
    counter: 'T — Tools & Trusted Support',
    shield: 'Care vocabulary',
    disarm: [
      'Learn four: sliding scale, charity care, walk-in, Ryan White.',
      'You don’t need the whole vocabulary — you need four words and one sentence.',
    ],
  },
  {
    id: 'cost',
    name: 'Cost Ghost',
    whisper: "I'm worried about a bill I can't pay.",
    node: 'medical',
    counter: 'M + T — Medical & Tools',
    shield: 'Cost question',
    disarm: [
      'Ask before services start: “Do you offer a sliding scale or a reduced-fee program?”',
      'The question is routine and nobody will find it strange.',
    ],
  },
];

export function ghostsForTrack(track: Track): GhostDef[] {
  return track === 'blue' ? GHOSTS : [];
}

export function getGhost(id: string): GhostDef | undefined {
  return GHOSTS.find((ghost) => ghost.id === id);
}

export type FearState = 'fearful' | 'cautious' | 'prepared' | 'fearless';
export interface FearStateInfo {
  id: FearState;
  label: string;
  tint: string;
  detail: string;
}
export const FEAR_STATES: FearStateInfo[] = [
  {
    id: 'fearful',
    label: 'FEARFUL',
    tint: C.no,
    detail: 'The healthcare what-ifs feel loud right now. Start with one question.',
  },
  {
    id: 'cautious',
    label: 'CAUTIOUS',
    tint: C.amber,
    detail: 'Gathering information about the visit, privacy, or cost.',
  },
  {
    id: 'prepared',
    label: 'PREPARED',
    tint: C.teal,
    detail: 'You have a question or intake line ready to use.',
  },
  {
    id: 'fearless',
    label: 'FEARLESS',
    tint: C.gold,
    detail: 'Ready to ask for care. You can still feel nervous and take the next step.',
  },
];
export function fearStateInfo(state: FearState | null): FearStateInfo | null {
  return FEAR_STATES.find((option) => option.id === state) ?? null;
}

export const SAFETY_EXCEPTION =
  'CAPE Flow cannot monitor danger, alert anyone, or make a report. If you tell a teacher, clinician, or facilitator about immediate danger or abuse, they may be required to act under local reporting rules. Ask what they must share before you talk. In immediate danger, contact emergency services or a trusted adult now.';

export function nodeMeta(id: ModuleId): { letter: string; callsign: string; color: string } {
  const node = COMPASS_NODES.find((item) => item.id === id);
  return {
    letter: node?.letter ?? '?',
    callsign: node?.callsign ?? 'M.A.T.C.H.',
    color: node?.color ?? C.teal,
  };
}
