import { C } from '@/lib/colors';

export interface GradeBandInfo {
  id: GradeBand;
  label: string;
  tier: string;
  detail: string;
  tint: string;
}

export type GradeBand = '6-8' | '9-12';

export const GRADE_BANDS: GradeBandInfo[] = [
  {
    id: '6-8',
    label: 'GRADES 6–8',
    tier: 'GREEN TRACK',
    detail:
      'Mindset, communication, consent, boundaries, decision-making, recovery, and leadership.',
    tint: C.teal,
  },
  {
    id: '9-12',
    label: 'GRADES 9–12',
    tier: 'BLUE TRACK',
    detail: 'The full CAPE scope: protection, vaccines, testing, clinical care, and self-advocacy.',
    tint: C.gold,
  },
];

/** Tiered track architecture: Green = grades 6–8, Blue = grades 9–12. */
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
    scope:
      'Mindset, communication, consent, boundaries, the 3-Second Rule, decision-making, recovery, and leadership.',
  },
  blue: {
    id: 'blue',
    label: 'BLUE TRACK',
    name: 'Full CAPE Scope',
    tint: C.azure,
    scope: 'The full book scope: protection, vaccines, testing, clinical care, and self-advocacy.',
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

export interface CurriculumRow {
  band: string;
  topics: string[];
}

export const CURRICULUM: CurriculumRow[] = [
  {
    band: 'GREEN TRACK · GRADES 6–8',
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
    band: 'BLUE TRACK · GRADES 9–12',
    topics: [
      'STI screening and confidential care',
      'Clinical prevention and urgent-care timing',
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
      'CAPE Youth Edition Curriculum v3.0: 18 lessons, with content written for each grade band.',
      'CAPE Youth Edition is supplemental and TEKS-aligned. It is not a district-adopted human sexuality curriculum. Follow local board policy.',
      'Parts 3 and 5 are full-page gates for Green Track, not footnotes.',
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
    detail: 'Preview rights, district policy, and written consent',
    tint: C.violet,
    body: [
      'You may preview all content before it is used with your student.',
      'Texas Senate Bill 12 (2025), in effect since September 1, 2025, requires schools to get written parent or guardian consent at least 14 days before human sexuality instruction begins.',
      'CAPE follows the same standard everywhere: no student takes part without written consent. Confirm the current district form before the first session.',
      'TEC §28.004(q-6) still requires written consent before instruction on child abuse, family violence, dating violence, and sex trafficking.',
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
      'CAPE Flow does not send student progress to a school. Schools must assess their own recordkeeping and privacy obligations.',
      'Use Delete all my data in Me to clear saved CAPE data. Device backups and browser storage have separate settings.',
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
      'Green: practice asking a trusted adult for help. Blue: practice asking an emergency department to evaluate you for PEP inside 72 hours.',
    ],
  },
];

export interface SourceRef {
  name: string;
  detail: string;
}

export const SOURCES: SourceRef[] = [
  { name: 'CDC STI Surveillance', detail: 'Sexually Transmitted Disease Surveillance 2023' },
  { name: 'CDC Prevention Guidelines', detail: 'Clinical prevention and urgent-care guidance' },
  { name: 'Guttmacher Institute', detail: 'Adolescent reproductive health pressure data' },
  { name: 'JAMA Pediatrics', detail: 'Youth healthcare avoidance & anxiety studies' },
  { name: 'F.R.I.E.S. Framework', detail: 'Planned Parenthood consent education model' },
  { name: 'Texas TEKS Standards', detail: 'Health education curriculum compliance' },
];

export const DISCLAIMER =
  'CAPE FLOW is an educational tool, not a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of a qualified health provider with any questions about a medical condition. In an emergency, call 911 or your local emergency number immediately. Crisis resources listed within the app connect you to trained professionals — this app does not provide counseling directly.';

/** Short privacy line for the first screen. The full PRIVACY_NOTE shows during Get Started. */
export const PRIVACY_SHORT =
  'Everything you save stays on this device. No accounts, no tracking, no ads. Clear it anytime with Delete all my data in Me.';

export const COMPLIANCE_LINE =
  'Supplemental and TEKS-aligned. Not a district-adopted human sexuality curriculum. Follow local board policy.';

export const PRIVACY_NOTE =
  'CAPE Flow saves your progress and private entries on this device. No accounts, app analytics, ads, or CAPE cloud backup. Use Delete all my data in Me to clear saved CAPE data. Uninstalling may not clear browser storage or existing device backups; those have separate settings. Copying, sharing, calling, or opening a website sends information outside CAPE Flow.';
