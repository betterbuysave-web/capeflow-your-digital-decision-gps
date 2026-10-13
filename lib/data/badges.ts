import type { Track } from '@/lib/data/content';
import { C } from '@/lib/colors';

export interface BadgeDef {
  id: string;
  emoji: string;
  name: string;
  requirement: string;
  tint: string;
}

export const BADGES: BadgeDef[] = [
  {
    id: 'first-step',
    emoji: '🧭',
    name: 'Compass Calibrated',
    requirement: 'Finish your first lesson',
    tint: C.teal,
  },
  {
    id: 'medic',
    emoji: '🛡️',
    name: 'Body Literate',
    requirement: 'Complete every My Medical / Health Choices lesson',
    tint: C.modM,
  },
  {
    id: 'radar',
    emoji: '📡',
    name: 'Radar Online',
    requirement: 'Complete every Awareness lesson',
    tint: C.modA,
  },
  {
    id: 'toolkit',
    emoji: '🧰',
    name: 'Kit Packed',
    requirement: 'Complete every Tools & Trusted Support lesson',
    tint: C.modT,
  },
  {
    id: 'orator',
    emoji: '📣',
    name: 'Clear Signal',
    requirement: 'Complete every Clear Communication & Consent lesson',
    tint: C.modC,
  },
  {
    id: 'daily',
    emoji: '❤️‍🔥',
    name: 'Daily Driver',
    requirement: 'Complete every Healthy Habits / Choosing Your Pace lesson',
    tint: C.modH,
  },
  {
    id: 'circle-built',
    emoji: '👥',
    name: 'Circle Built',
    requirement: 'Add 3 people to your Safety Circle',
    tint: C.azure,
  },
  {
    id: 'menu-set',
    emoji: '☕',
    name: 'Order Placed',
    requirement: 'Answer 8 items in the Consent Café',
    tint: C.amber,
  },
  {
    id: 'fries-detective',
    emoji: '🔍',
    name: 'F.R.I.E.S. Detective',
    requirement: 'Call every Café quiz scenario correctly',
    tint: C.modC,
  },
  {
    id: 'cafe-regular',
    emoji: '✍️',
    name: 'Café Regular',
    requirement: 'Finish a Consent Café exit card',
    tint: C.amber,
  },
  {
    id: 'night-shift',
    emoji: '🌙',
    name: 'Night Shift',
    requirement: 'Play 3 Midnight Sim scenarios',
    tint: C.violet,
  },
  {
    id: 'clean-run',
    emoji: '⭐',
    name: 'Clean Run',
    requirement: 'Pick the strongest option in 3 scenarios',
    tint: C.gold,
  },
  {
    id: 'streak-3',
    emoji: '🔥',
    name: 'Three-Day Cape',
    requirement: 'Open CAPE Flow 3 days in a row',
    tint: C.flame,
  },
  {
    id: 'ghost-named',
    emoji: '👻',
    name: 'Healthcare Ghost Named',
    requirement: 'Name one of the six healthcare ghosts',
    tint: C.violet,
  },
  {
    id: 'vault-armed',
    emoji: '🛡',
    name: 'Care Plan Ready',
    requirement: 'Disarm all six healthcare ghosts with a plan',
    tint: C.teal,
  },
  {
    id: 'compass-complete',
    emoji: '🏅',
    name: 'Full Compass',
    requirement: 'Reach a SafER Score of 100',
    tint: C.goldLight,
  },
];

export function badgesForTrack(track: Track): BadgeDef[] {
  return BADGES.filter(
    (badge) => track === 'blue' || (badge.id !== 'ghost-named' && badge.id !== 'vault-armed'),
  );
}

export function getBadge(id: string): BadgeDef | undefined {
  return BADGES.find((b) => b.id === id);
}
