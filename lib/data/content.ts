import { C } from '@/lib/colors';

export interface GradeBandInfo {
  id: GradeBand;
  label: string;
  tier: string;
  detail: string;
  tint: string;
}

export type GradeBand = '4-5' | '6-8' | '9-12';

export const GRADE_BANDS: GradeBandInfo[] = [
  {
    id: '4-5',
    label: 'GRADES 4–5',
    tier: 'FOUNDATION TRACK',
    detail: 'Body basics, personal space, trusted adults, asking before touching.',
    tint: C.modM,
  },
  {
    id: '6-8',
    label: 'GRADES 6–8',
    tier: 'READINESS TRACK',
    detail: 'Puberty, boundaries, digital footprint, pressure math, refusal scripts.',
    tint: C.teal,
  },
  {
    id: '9-12',
    label: 'GRADES 9–12',
    tier: 'AGENCY TRACK',
    detail: 'Screening, PrEP/PEP, crisis protocol, consent under pressure, exit plans.',
    tint: C.gold,
  },
];

/** Tiered track architecture: Green = grades 4–8, Blue = grades 9–12. */
export type Track = 'green' | 'blue';

export interface TrackInfo {
  id: Track;
  label: string;
  name: string;
  tint: string;
  scope: string;
}

export const TRACKS: Record<Track, TrackInfo> = {
  green: {
    id: 'green',
    label: 'GREEN TRACK',
    name: 'Internal CAPE',
    tint: C.modM,
    scope: 'Mindset, consent, digital safety. Protection shields stay locked.',
  },
  blue: {
    id: 'blue',
    label: 'BLUE TRACK',
    name: 'Full CAPE Scope',
    tint: C.azure,
    scope: 'Frontline gear, medical shields (PrEP/PEP/vaccines), clinical intake drills.',
  },
};

/** Grades 9–12 run the Blue track; everything below is Green. */
export function trackFor(band: GradeBand | null): Track {
  return band === '9-12' ? 'blue' : 'green';
}

/** The PEP clock is a Blue-track (grades 9–12) medical shield only. */
export function pepUnlocked(band: GradeBand | null): boolean {
  return trackFor(band) === 'blue';
}

export const PEP_LOCK_NOTE =
  'The PEP Clock is part of the Grades 9–12 medical shields. On the Grades 4–8 track it stays locked — the tools here focus on mindset, consent, and digital safety.';

export interface CurriculumRow {
  band: string;
  topics: string[];
}

export const CURRICULUM: CurriculumRow[] = [
  {
    band: 'GRADES 4–5 · FOUNDATION',
    topics: [
      'Bodies change and that is normal',
      'Personal space and asking first',
      'Naming trusted adults',
      'Hygiene, sleep, and movement basics',
      'What an emergency is and who to call',
    ],
  },
  {
    band: 'GRADES 6–8 · READINESS',
    topics: [
      'Puberty and routine check-ups',
      'Consent language and the F.R.I.E.S. check',
      'Red flags, coercion, and peer pressure',
      'Digital footprint and image pressure',
      'Building a Safety Circle',
      'Stress tools and sleep hygiene',
    ],
  },
  {
    band: 'GRADES 9–12 · AGENCY',
    topics: [
      'STI screening and confidential care',
      'PrEP, PEP, and the 72-hour window',
      'Vaccines including HPV and meningococcal',
      'Crisis protocol and 24/7 lines',
      'Exit strategies and bystander intervention',
      'Boundary hygiene and relationship review',
    ],
  },
];

export interface ParentCard {
  emoji: string;
  title: string;
  detail: string;
  tint: string;
  body: string[];
}

export const PARENT_CARDS: ParentCard[] = [
  {
    emoji: '📚',
    title: 'Curriculum Overview',
    detail: 'Every topic, by grade band — no fine print',
    tint: C.teal,
    body: [
      'Content is organized in three tracks and nothing from a higher track appears in a lower one.',
      'Every lesson lists its takeaways up front, so you can read what a student reads in under a minute.',
      'Sources are published in-app: CDC, Guttmacher Institute, JAMA Pediatrics, and Planned Parenthood consent education.',
    ],
  },
  {
    emoji: '🧑‍🏫',
    title: 'Facilitation Approach',
    detail: 'How a session actually runs',
    tint: C.azure,
    body: [
      'Short module, one interactive tool, one debrief question — designed for a 20 minute block.',
      'Judgment-free framing: scenarios explain why an option is risky rather than scoring students.',
      'No student accounts, no leaderboards, and no comparisons between classmates.',
    ],
  },
  {
    emoji: '⚖️',
    title: 'Parent Rights',
    detail: 'Opt-out, preview rights, Texas law compliance',
    tint: C.violet,
    body: [
      'You may preview all content before it is used with your student.',
      'Opt-out is available for any module and does not require a reason.',
      'Human sexuality instruction follows state notice-and-consent requirements, including Texas Education Code opt-in rules.',
      'No parental notification is triggered by app usage because no usage data is transmitted.',
    ],
  },
  {
    emoji: '🔐',
    title: 'COPPA / FERPA',
    detail: 'Privacy by architecture, not by promise',
    tint: C.modM,
    body: [
      'Progress is stored only on the device using local storage. Nothing is uploaded.',
      'No accounts, no email collection, no advertising identifiers, no tracking pixels.',
      'Because no education records are created or shared, there is nothing to disclose under FERPA.',
      'Deleting the app deletes the data permanently.',
    ],
  },
  {
    emoji: '🎲',
    title: 'Home Activities',
    detail: 'FRIES dinner game & MATCH role-play cards',
    tint: C.amber,
    body: [
      'FRIES dinner game: name a everyday situation and check it against all five letters together.',
      'MATCH role-play cards: one person reads a scenario, the other answers out loud in one sentence.',
      'Safety Circle night: everyone in the house names their three people and swaps code words.',
      'Clock drill: practice saying "72 hours" and where the nearest urgent care is.',
    ],
  },
];

export interface SourceRef {
  name: string;
  detail: string;
}

export const SOURCES: SourceRef[] = [
  { name: 'CDC STI Surveillance', detail: 'Sexually Transmitted Disease Surveillance 2023' },
  { name: 'CDC PEP Guidelines', detail: 'Post-Exposure Prophylaxis within 72 hours (nPEP)' },
  { name: 'Guttmacher Institute', detail: 'Adolescent reproductive health pressure data' },
  { name: 'JAMA Pediatrics', detail: 'Youth healthcare avoidance & anxiety studies' },
  { name: 'F.R.I.E.S. Framework', detail: 'Planned Parenthood consent education model' },
  { name: 'Texas TEKS Standards', detail: 'Health education curriculum compliance' },
];

export interface ProblemStat {
  value: string;
  detail: string;
  source: string;
}

export const PROBLEM_STATS: ProblemStat[] = [
  {
    value: '1 in 4',
    detail: 'sexually active youth contract an STI annually',
    source: 'CDC, 2023',
  },
  {
    value: '60%',
    detail: "of teens report feeling pressure to do things they aren't ready for",
    source: 'Guttmacher Institute',
  },
  {
    value: '72 hrs',
    detail: "the PEP window — most youth don't know it exists",
    source: 'CDC PEP Guidelines',
  },
  {
    value: '43%',
    detail: 'of high schoolers avoid seeking care due to anxiety',
    source: 'JAMA Pediatrics',
  },
];

export const DISCLAIMER =
  'CAPE FLOW is an educational tool, not a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of a qualified health provider with any questions about a medical condition. In an emergency, call 911 or your local emergency number immediately. Crisis resources listed within the app connect you to trained professionals — this app does not provide counseling directly.';

export const PRIVACY_NOTE =
  'We use local storage only to remember your progress. No cookies, no tracking pixels, no ads. Your data never leaves this device. Delete the app and your data is gone forever.';
