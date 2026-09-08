import { C } from '@/lib/colors';
import type { ModuleId } from '@/lib/data/match';
import type { Track } from '@/lib/data/content';

/**
 * The five M.A.T.C.H. nodes as drafted on the compass rose.
 * `bearing` is degrees clockwise from north, so each node marker lands on the
 * rose ring at any size.
 */
export interface CompassNode {
  id: ModuleId;
  letter: string;
  title: string;
  callsign: string;
  hint: string;
  color: string;
  /** Degrees clockwise from north. */
  bearing: number;
  green: string[];
  blue: string[];
  lockNote?: string;
}

export const COMPASS_NODES: CompassNode[] = [
  {
    id: 'medical',
    letter: 'M',
    title: 'My Medical Choices & Check-ups',
    callsign: 'Health Armor',
    hint: 'Baseline knowledge, vaccines',
    color: C.modM,
    bearing: 36,
    green: [
      'Your body is the asset. Check-ups, sleep, and dental visits are armor maintenance, not punishment.',
      'Know your baseline: allergies, medications, and the last time you saw a clinician.',
      'Vaccines are the cheapest protection you will ever get — HPV, Tdap, meningococcal.',
      'Saying "something feels off with my body" to a trusted adult is a strength move, not a confession.',
    ],
    blue: [
      'Routine STI screening is maintenance. Most infections carry no symptoms at all.',
      'Many clinics screen minors confidentially, low-cost or free — ask what the full panel covers.',
      'PrEP is taken before a possible exposure. PEP is taken after, and it must start within 72 hours.',
      'An emergency department or urgent care can start PEP today. You do not need an existing doctor.',
    ],
    lockNote:
      'Protection shields — barriers, PrEP, PEP, and clinical intake drills — unlock on the Grades 9–12 track.',
  },
  {
    id: 'awareness',
    letter: 'A',
    title: 'Awareness of Self & Surroundings',
    callsign: 'Built-In Radar',
    hint: 'Trusting your gut, early warning signs',
    color: C.modA,
    bearing: 324,
    green: [
      'Your body reads risk before your words do — tight chest, dry mouth, stalling stomach.',
      'Rushing you is a flag. Real care can wait until tomorrow.',
      'A crowd is not consent, and neither is a group chat.',
      'You never need a reason to leave a room that feels wrong.',
    ],
    blue: [
      'Coercion rarely looks like a threat. It looks like urgency, flattery, or guilt.',
      '"You owe me" is a debt frame. Relationships are not ledgers.',
      'Substances plus pressure plus no ride home is a stacked-risk night. Name it before it stacks.',
      'Perceived norms run higher than real behavior. Most people are doing less than they claim.',
    ],
  },
  {
    id: 'tools',
    letter: 'T',
    title: 'Tools & Trusted Support',
    callsign: 'Safety Kit',
    hint: 'Charged phone, ride plan, safety buddy',
    color: C.modT,
    bearing: 108,
    green: [
      'Three to five people who answer without a lecture. Tell them in advance they are on your list.',
      'Agree on a code word that means "call me and get me out" with no follow-up questions.',
      'Charged phone, a way home, and one adult who knows where you are.',
      'Bystander moves: distract, delegate, direct, delay. Later still counts.',
    ],
    blue: [
      'Know how you are getting home before you arrive, not after the plan breaks.',
      'Keep enough charge or cash for one ride you did not plan for.',
      'Run the pivot: when the primary layer fails, deploy the backup layer instead of improvising.',
      'Map the nearest emergency department, urgent care, and one confidential youth clinic now.',
    ],
  },
  {
    id: 'comms',
    letter: 'C',
    title: 'Clear Communication & Consent',
    callsign: 'Strongest Voice',
    hint: 'FRIES model, boundary scripts',
    color: C.modC,
    bearing: 252,
    green: [
      'Consent is Freely given, Reversible, Informed, Enthusiastic, and Specific.',
      'Ask before touching — hugs included. "Is this okay?" is the entire script.',
      '"No" is a complete sentence and it needs no evidence.',
      'You can change your mind after you already said yes. That is what reversible means.',
    ],
    blue: [
      'Miss one letter of F.R.I.E.S. and it is not consent, no matter what was said earlier.',
      'Repeat the same sentence instead of adding new reasons — explanations invite negotiation.',
      '"Not tonight. Talk tomorrow?" ends a push without starting a fight.',
      'Set your order in the Consent Café so the words are already built when pressure lands.',
    ],
  },
  {
    id: 'habits',
    letter: 'H',
    title: 'Healthy Habits & Choices',
    callsign: 'Daily Superpower',
    hint: 'Pacing, sleep, digital legacy',
    color: C.modH,
    bearing: 180,
    green: [
      'Sleep, water, movement. The boring reps are the actual superpower.',
      'Your digital legacy is everything a screenshot could keep.',
      'Slow exhales are the fastest lever you have on panic.',
      'Small daily choices beat one big decision made at 1 a.m.',
    ],
    blue: [
      'Pacing is protection. Sleep debt and alcohol are the two biggest judgment taxes there are.',
      'The three-second pause interrupts the cortisol surge so your thinking brain can re-engage.',
      'Audit who has your location and what a screenshot could keep. Trim one entry today.',
      'Review relationships the way you review habits: on a schedule, honestly, out loud.',
    ],
  },
];

export function nodeBullets(node: CompassNode, track: Track): string[] {
  return track === 'blue' ? node.blue : node.green;
}
