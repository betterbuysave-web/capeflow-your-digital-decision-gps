import { C } from '@/lib/colors';
import { COMPASS_NODES } from '@/lib/data/compass';
import type { ModuleId } from '@/lib/data/match';
import type { Track } from '@/lib/data/content';

/**
 * The Anxiety Audit ("Naming the Ghosts").
 * Each ghost is a named fear that maps to one M.A.T.C.H. node. Naming it turns
 * an unprocessed glitch into a shield component with concrete disarm steps.
 */
export type GhostCategory = 'relational' | 'logistical' | 'clinical';

export interface GhostDef {
  id: string;
  name: string;
  glyph: string;
  category: GhostCategory;
  /** What the fear says in its own voice. */
  whisper: string;
  /** The M.A.T.C.H. node that answers it. */
  node: ModuleId;
  /** The shield component it becomes once disarmed. */
  shield: string;
  /** Evidence + real-talk steps that take the fear apart. */
  disarm: string[];
  /** Blue-track only (grades 9–12) when set. */
  track?: Track;
}

export interface GhostCategoryInfo {
  id: GhostCategory;
  label: string;
  tint: string;
  blurb: string;
}

export const GHOST_CATEGORIES: GhostCategoryInfo[] = [
  {
    id: 'relational',
    label: 'RELATIONAL & EMOTIONAL',
    tint: C.violet,
    blurb: 'Fears about how another person will react to you asking for safety.',
  },
  {
    id: 'logistical',
    label: 'LOGISTICAL & BUREAUCRATIC',
    tint: C.gold,
    blurb: 'Fears about money, paperwork, phones, and front desks.',
  },
  {
    id: 'clinical',
    label: 'TECHNICAL & CLINICAL',
    tint: C.teal,
    blurb: 'Fears about bodies, results, and what happens if a plan fails.',
  },
];

export const GHOSTS: GhostDef[] = [
  // ── Relational & emotional ──────────────────────────────────────────────
  {
    id: 'rejection',
    name: 'The Rejection Ghost',
    glyph: '💔',
    category: 'relational',
    whisper: 'If I bring up protection, they will lose interest in me.',
    node: 'comms',
    shield: 'Boundary Script Plate',
    disarm: [
      'Anyone who walks because you asked for safety told you something useful about them — early, and cheap.',
      'Lead with a want, not a warning: "I want this, and I want us covered."',
      'Rehearse one sentence until it sounds flat and easy. Flat delivery reads as confidence.',
    ],
  },
  {
    id: 'judgment',
    name: 'The Judgment Ghost',
    glyph: '👁️',
    category: 'relational',
    whisper: 'They will do the math on my history, my status, my body.',
    node: 'medical',
    shield: 'Status-Neutral Shield',
    disarm: [
      'Clinicians see thousands of people. Your visit is a Tuesday for them, not a verdict on you.',
      'Status-neutral language runs both ways: "When were you last tested?" is a normal question, not an accusation.',
      'You choose what you share and when. Getting care is not a confession.',
    ],
  },
  {
    id: 'vibe-killer',
    name: 'The Vibe-Killer Ghost',
    glyph: '🎧',
    category: 'relational',
    whisper: 'Stopping to grab protection kills the whole moment.',
    node: 'tools',
    shield: 'Ready-Kit Plate',
    track: 'blue',
    disarm: [
      'The pause costs about twenty seconds. Waiting two weeks on a result costs more.',
      'Pre-placed gear removes the search — the search is what breaks a moment, not the protection.',
      'Try the reframe out loud: "I\'ve got us." It reads as wanting, not hesitating.',
    ],
  },
  {
    id: 'trust',
    name: 'The Trust Ghost',
    glyph: '🌀',
    category: 'relational',
    whisper: 'I do not actually know if they are telling me the truth.',
    node: 'awareness',
    shield: 'Radar Lock',
    disarm: [
      'Trust is a pattern built over time, not one answer given in one night.',
      'You never have to prove someone is lying in order to act on your own limit.',
      "A protection layer does not depend on anyone else's honesty. That is the point of it.",
    ],
  },
  {
    id: 'silence',
    name: 'The Silence Ghost',
    glyph: '🤐',
    category: 'relational',
    whisper: 'Saying nothing is safer than starting the conversation.',
    node: 'comms',
    shield: 'First-Sentence Plate',
    disarm: [
      'Silence does not cancel risk. It just hands the decision to whoever speaks first.',
      'One sentence is the entire cost of entry. You do not owe a speech.',
      'Text counts. Picking the channel you can actually use is strategy, not weakness.',
    ],
  },
  {
    id: 'past-future',
    name: 'The Past & Future Ghosts',
    glyph: '🕰️',
    category: 'relational',
    whisper: 'What already happened decides what I get from here.',
    node: 'habits',
    shield: 'Reset Rig',
    disarm: [
      'A past experience is history, not a forecast. The next choice is still yours to make.',
      'Naming what you would do differently is how a memory turns into a plan.',
      "Daily habits are the only lever that touches the past's weight and the future's odds at once.",
    ],
  },
  {
    id: 'shame',
    name: 'The Shame Ghost',
    glyph: '🫥',
    category: 'relational',
    whisper: 'Wanting protection means something is wrong with me.',
    node: 'medical',
    shield: 'Self-Worth Armor',
    disarm: [
      'A seatbelt is not an insult to the driver. Protection is the same shape of care.',
      'Shame runs on vagueness. Say the specific fear out loud and it shrinks to task size.',
      'You are allowed to want a body that gets looked after. That is what armor is for.',
    ],
  },
  {
    id: 'values',
    name: 'The Values Conflict Ghost',
    glyph: '🧭',
    category: 'relational',
    whisper: 'My family, faith, or culture says one thing and my health says another.',
    node: 'habits',
    shield: 'Values Compass',
    disarm: [
      'Both can be true at once: your values matter and your health matters. This is not a betrayal.',
      'Find one adult inside your own community who holds both. They almost always exist.',
      'You decide what stays private. Privacy is not the same thing as dishonesty.',
    ],
  },
  {
    id: 'regret',
    name: 'The Regret Ghost',
    glyph: '🌒',
    category: 'relational',
    whisper: 'What if I feel terrible about this afterwards?',
    node: 'habits',
    shield: 'Pacing Governor',
    track: 'blue',
    disarm: [
      'Slowing down is free and always available — including after you already said yes.',
      'Sleep debt, substances, and speed are the three biggest judgment taxes. Name which one is in the room.',
      'The three-second pause exists for exactly this. Exhale longer than you inhale, then decide.',
    ],
  },

  // ── Logistical & bureaucratic ───────────────────────────────────────────
  {
    id: 'cost',
    name: 'The Cost Ghost',
    glyph: '💸',
    category: 'logistical',
    whisper: 'I will get turned away — or shamed — because I cannot pay.',
    node: 'tools',
    shield: 'Access Kit',
    disarm: [
      'Sliding-scale, Title X, and school-based clinics exist specifically for people without money.',
      'Ask one question by phone or on the site: "Do you have a sliding scale or free testing?"',
      'Price is a logistics problem with known answers. It is not a judgment about your worth.',
    ],
  },
  {
    id: 'paper-trail',
    name: 'The Paper Trail Ghost',
    glyph: '📄',
    category: 'logistical',
    whisper: "Testing will show up on my parent's insurance statement.",
    node: 'medical',
    shield: 'Confidentiality Seal',
    track: 'blue',
    disarm: [
      'Ask this before anything else: "Is this confidential, and does anything get mailed home?"',
      'Many clinics provide confidential minor services and can avoid an explanation-of-benefits letter.',
      'Public health and Title X clinics are often the safest route when a paper trail is genuinely unsafe.',
    ],
  },
  {
    id: 'phone',
    name: 'The Phone Ghost',
    glyph: '📵',
    category: 'logistical',
    whisper: 'I cannot make myself make the call.',
    node: 'tools',
    shield: 'Call Script Plate',
    disarm: [
      'Write the first line before you dial: "Hi, I\'d like to book an appointment. Do you see people my age?"',
      'Most clinics have online booking or a text line. The call is optional.',
      'You are allowed to hang up. Nothing bad happens if you hang up.',
    ],
  },
  {
    id: 'bureaucracy',
    name: 'The Bureaucracy Ghost',
    glyph: '🗂️',
    category: 'logistical',
    whisper: 'The paperwork and the front desk will out me.',
    node: 'tools',
    shield: 'Intake Drill',
    disarm: [
      'Intake forms ask the same handful of things every time: name, birthdate, reason, insurance or self-pay.',
      '"I\'d rather not answer that" is an acceptable response on almost every line.',
      'Run the intake out loud once and the real one stops being a surprise.',
    ],
  },
  {
    id: 'language',
    name: 'The Language Ghost',
    glyph: '🔤',
    category: 'logistical',
    whisper: 'I will not understand a word they say.',
    node: 'comms',
    shield: 'Plain-Words Decoder',
    disarm: [
      '"Say that again in plain words" is a normal, respected sentence in every clinic.',
      'Ask what you were tested for and when results come back. Specific beats polite.',
      'Write down two words you did not understand and look them up after. That is how vocabulary gets built.',
    ],
  },
  {
    id: 'access',
    name: 'The Access Ghost',
    glyph: '🗺️',
    category: 'logistical',
    whisper: 'I do not even know where to go or who to ask.',
    node: 'tools',
    shield: 'Resource Map',
    disarm: [
      'Map it now, not in a panic: nearest emergency department, nearest urgent care, one youth-friendly clinic.',
      'Save 988 and one text line to your favorites. Two taps, no searching.',
      'Add one adult to your Safety Circle who can drive or call on your behalf.',
    ],
  },

  // ── Technical & clinical ────────────────────────────────────────────────
  {
    id: 'failure',
    name: 'The Failure Ghost',
    glyph: '⚠️',
    category: 'clinical',
    whisper: 'What if the barrier fails and I have no idea what to do?',
    node: 'tools',
    shield: 'Redundancy Layer',
    track: 'blue',
    disarm: [
      'Stop, check, switch to the backup layer. A failure is a pivot, not an ending.',
      'Emergency contraception works better the sooner it is taken, and PEP has to start inside 72 hours.',
      'Redundant layers exist because single layers fail. That is engineering, not pessimism.',
    ],
  },
  {
    id: 'positive-result',
    name: 'The Result Ghost',
    glyph: '🧪',
    category: 'clinical',
    whisper: 'If I test, I might find out something I cannot unknow.',
    node: 'medical',
    shield: 'Treatment Path',
    track: 'blue',
    disarm: [
      'Most STIs are curable, and the ones that are not are manageable with treatment that also protects partners.',
      'Not knowing does not pause an infection. It only removes your options.',
      'A result is data with a next step attached. Untested is the only version with no next step.',
    ],
  },
  {
    id: 'needle',
    name: 'The Needle Ghost',
    glyph: '💉',
    category: 'clinical',
    whisper: 'Blood draws, clinics, that smell — I cannot do it.',
    node: 'medical',
    shield: 'Grounding Rig',
    disarm: [
      'Say it at the desk: "Needles are hard for me." Staff have an entire toolkit for this.',
      'Plenty of tests are urine or swab only. Ask what is actually required before you brace for a draw.',
      'Look away, exhale long, tense your legs. Fainting is preventable, not shameful.',
    ],
  },
  {
    id: 'timing',
    name: 'The Timing Ghost',
    glyph: '⏳',
    category: 'clinical',
    whisper: 'There is never a right moment to bring this up.',
    node: 'awareness',
    shield: 'Early-Window Radar',
    disarm: [
      'The right moment is boring on purpose: daylight, clothes on, nothing happening.',
      'Raise it before the situation, not inside it. Early is easier every single time.',
      '"Can I ask you something before this goes further?" is a complete opener.',
    ],
  },
  {
    id: 'disclosure',
    name: 'The Disclosure Ghost',
    glyph: '🗣️',
    category: 'clinical',
    whisper: 'I would have to tell them my status — or ask for theirs.',
    node: 'comms',
    shield: 'Disclosure Script',
    track: 'blue',
    disarm: [
      'Lead with routine, not apology: "I test regularly. When were you last tested?"',
      'You control the timing and the setting. Private, sober, unhurried is the format.',
      'Undetectable means untransmittable, and PrEP gives a partner their own independent layer.',
    ],
  },
  {
    id: 'pain',
    name: 'The Pain Ghost',
    glyph: '🩹',
    category: 'clinical',
    whisper: 'What if it hurts — the barrier, the exam, any of it?',
    node: 'medical',
    shield: 'Comfort Kit',
    track: 'blue',
    disarm: [
      'Pain is information, not something to power through. "Stop" means it stops.',
      'Lubricant, size, and material all change the experience — water or silicone based with condoms.',
      'Say "that hurts" mid-exam. A clinician will adjust; that is literally the job.',
    ],
  },
  {
    id: 'body',
    name: 'The Body Ghost',
    glyph: '🪞',
    category: 'clinical',
    whisper: 'I do not really understand or trust my own body.',
    node: 'habits',
    shield: 'Body Literacy Plate',
    disarm: [
      'Learn the real names of your parts. Vocabulary is the first layer of control.',
      'Track what is normal for you, so "different" becomes obvious and reportable.',
      'Every body runs a different timeline. Comparison is not a diagnostic tool.',
    ],
  },
];

/** Ghosts the reader's track can open. */
export function ghostsForTrack(track: Track): GhostDef[] {
  return GHOSTS.filter((ghost) => !ghost.track || ghost.track === track);
}

/** Ghosts held back from a track — Green keeps the clinical set locked. */
export function lockedGhostsForTrack(track: Track): GhostDef[] {
  return GHOSTS.filter((ghost) => ghost.track !== undefined && ghost.track !== track);
}

export function getGhost(id: string): GhostDef | undefined {
  return GHOSTS.find((g) => g.id === id);
}

export const GHOST_LOCK_NOTE =
  'Some clinical ghosts — barrier failure, test results, disclosure, and clinical discomfort — belong to the Grades 9–12 track. On the Grades 4–8 track they stay locked and the vault focuses on mindset, consent, and access.';

/** The Emotional Transition Spectrum: fearful → cautious → prepared → fearless. */
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
    detail:
      'Paralyzed. The what-ifs are louder than the facts right now, and that is a normal place to start.',
  },
  {
    id: 'cautious',
    label: 'CAUTIOUS',
    tint: C.amber,
    detail:
      'Gathering data. Still circling it, but you are looking straight at it instead of away.',
  },
  {
    id: 'prepared',
    label: 'PREPARED',
    tint: C.teal,
    detail: 'Plan in hand. You know your next move and roughly what you would say out loud.',
  },
  {
    id: 'fearless',
    label: 'FEARLESS',
    tint: C.gold,
    detail:
      'Full agency. You decide, you act, and a hard night does not knock the plan out of your hands.',
  },
];

export function fearStateInfo(state: FearState | null): FearStateInfo | null {
  return FEAR_STATES.find((s) => s.id === state) ?? null;
}

/** Read on the way in — fear is biology, not a character flaw. */
export const NORMALIZATION: string[] = [
  'Fear is a biological alarm, not a personality defect. Your body is trying to keep you alive with old software.',
  'Vague fear is heavy because it has no edges. A named fear has edges, and edges can be engineered around.',
  'CAPE Flow saves your words on this device, not to a CAPE account or cloud backup. Use Delete all my data in Me to clear them.',
];

export const SAFETY_EXCEPTION =
  'CAPE Flow cannot monitor danger, alert anyone, or make a report. If you tell a teacher, clinician, or facilitator about immediate danger or abuse, they may be required to act under local reporting rules. Ask what they must share before you talk. In immediate danger, contact emergency services or a trusted adult now.';

/** Letter, callsign, and color for the M.A.T.C.H. node a ghost maps to. */
export function nodeMeta(id: ModuleId): { letter: string; callsign: string; color: string } {
  const node = COMPASS_NODES.find((n) => n.id === id);
  return {
    letter: node?.letter ?? '?',
    callsign: node?.callsign ?? 'M.A.T.C.H.',
    color: node?.color ?? C.teal,
  };
}
