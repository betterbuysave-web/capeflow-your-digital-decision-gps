import { C } from '@/lib/colors';
import type { Track } from '@/lib/data/content';

/**
 * Adherence Settings data: reminder templates, alert tones, and day/time helpers.
 * Reminders are scheduled locally on the device — nothing is sent to a server.
 */

export type ReminderTone = 'pulse' | 'double' | 'silent' | 'critical';

export interface ToneInfo {
  id: ReminderTone;
  label: string;
  detail: string;
  tint: string;
  /** Whether the notification plays the device alert sound. */
  sound: boolean;
  /** Android vibration pattern in ms — the part that actually distinguishes tones. */
  vibration: number[];
  /** Android channel importance. */
  high: boolean;
}

export const REMINDER_TONES: ToneInfo[] = [
  {
    id: 'pulse',
    label: 'TELEMETRY PULSE',
    detail: 'Standard alert sound, one short buzz. The default for daily doses.',
    tint: C.teal,
    sound: true,
    vibration: [0, 220],
    high: false,
  },
  {
    id: 'double',
    label: 'DOUBLE TAP',
    detail: 'Alert sound with two buzzes — easier to feel in a pocket.',
    tint: C.gold,
    sound: true,
    vibration: [0, 160, 120, 160],
    high: false,
  },
  {
    id: 'silent',
    label: 'GHOST MODE',
    detail: 'No sound, no vibration. Shows up on the lock screen only.',
    tint: C.violet,
    sound: false,
    vibration: [],
    high: false,
  },
  {
    id: 'critical',
    label: 'CIRCUIT BREAKER',
    detail: 'Sound plus a long triple buzz, delivered at high priority.',
    tint: C.flame,
    sound: true,
    vibration: [0, 400, 180, 400, 180, 400],
    high: true,
  },
];

export function toneInfo(id: ReminderTone): ToneInfo {
  return REMINDER_TONES.find((t) => t.id === id) ?? REMINDER_TONES[0];
}

export type ReminderCadence = 'daily' | 'weekly' | 'window';

export interface ReminderTemplate {
  id: string;
  label: string;
  emoji: string;
  detail: string;
  /** Notification body text. */
  body: string;
  tint: string;
  defaultTime: string;
  defaultDays: number[];
  defaultTone: ReminderTone;
  cadence: ReminderCadence;
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];
export const SCHOOL_DAYS = [1, 2, 3, 4, 5];

export const REMINDER_TEMPLATES: ReminderTemplate[] = [
  {
    id: 'morning-meds',
    label: 'MORNING MEDICATION',
    emoji: '💊',
    detail: 'Any daily prescription taken with breakfast.',
    body: 'Morning dose. Take it, then log it.',
    tint: C.modM,
    defaultTime: '07:30',
    defaultDays: EVERY_DAY,
    defaultTone: 'pulse',
    cadence: 'daily',
  },
  {
    id: 'evening-meds',
    label: 'EVENING MEDICATION',
    emoji: '🌙',
    detail: 'The dose that gets missed most — the one after practice.',
    body: 'Evening dose. Thirty seconds and it is done.',
    tint: C.azure,
    defaultTime: '20:30',
    defaultDays: EVERY_DAY,
    defaultTone: 'double',
    cadence: 'daily',
  },
  {
    id: 'inhaler',
    label: 'INHALER / CONTROLLER',
    emoji: '🫁',
    detail: 'Daily controller inhaler, plus a check that the rescue inhaler is in the bag.',
    body: 'Controller inhaler. Rescue inhaler in the bag?',
    tint: C.teal,
    defaultTime: '07:00',
    defaultDays: EVERY_DAY,
    defaultTone: 'pulse',
    cadence: 'daily',
  },
  {
    id: 'glucose',
    label: 'BLOOD SUGAR CHECK',
    emoji: '🩸',
    detail: 'Glucose check and log, for diabetes management.',
    body: 'Blood sugar check. Write the number down.',
    tint: C.modT,
    defaultTime: '12:30',
    defaultDays: EVERY_DAY,
    defaultTone: 'double',
    cadence: 'daily',
  },
  {
    id: 'bp',
    label: 'BLOOD PRESSURE LOG',
    emoji: '📈',
    detail: 'Cuff reading at the same time of day, sitting, arm at heart level.',
    body: 'Blood pressure reading. Sit for five minutes first.',
    tint: C.modA,
    defaultTime: '18:00',
    defaultDays: [1, 3, 5],
    defaultTone: 'pulse',
    cadence: 'weekly',
  },
  {
    id: 'vitamin',
    label: 'VITAMIN / IRON',
    emoji: '🍊',
    detail: 'Supplements a provider actually asked you to take.',
    body: 'Vitamin with food.',
    tint: C.modC,
    defaultTime: '08:00',
    defaultDays: EVERY_DAY,
    defaultTone: 'silent',
    cadence: 'daily',
  },
  {
    id: 'water',
    label: 'HYDRATION CHECK',
    emoji: '💧',
    detail: 'Refill the bottle. Headaches and cramps are usually this.',
    body: 'Refill your bottle.',
    tint: C.teal,
    defaultTime: '14:00',
    defaultDays: SCHOOL_DAYS,
    defaultTone: 'silent',
    cadence: 'daily',
  },
  {
    id: 'movement',
    label: 'MOVE 60',
    emoji: '🏃',
    detail: 'Teens need about 60 minutes of movement a day. Walking counts.',
    body: 'Move for a bit. Walk, ride, lift, dance — it all counts.',
    tint: C.modH,
    defaultTime: '17:00',
    defaultDays: EVERY_DAY,
    defaultTone: 'silent',
    cadence: 'daily',
  },
  {
    id: 'winddown',
    label: 'SLEEP WIND-DOWN',
    emoji: '😴',
    detail: 'Screens down 30 minutes before lights out. Teens need 8–10 hours.',
    body: 'Wind down. Screens down, charger across the room.',
    tint: C.violet,
    defaultTime: '21:45',
    defaultDays: EVERY_DAY,
    defaultTone: 'silent',
    cadence: 'daily',
  },
  {
    id: 'mood',
    label: 'MOOD CHECK-IN',
    emoji: '🧠',
    detail: 'One honest word about how today went. Patterns show up fast.',
    body: 'One word for today. Say it out loud if you can.',
    tint: C.azure,
    defaultTime: '21:00',
    defaultDays: EVERY_DAY,
    defaultTone: 'silent',
    cadence: 'daily',
  },
  {
    id: 'refill',
    label: 'PHARMACY REFILL',
    emoji: '🏪',
    detail: 'Call in the refill before you are down to the last three days.',
    body: 'Refill check. Fewer than seven days left? Call it in.',
    tint: C.gold,
    defaultTime: '16:00',
    defaultDays: [0],
    defaultTone: 'double',
    cadence: 'weekly',
  },
  {
    id: 'appointment-prep',
    label: 'APPOINTMENT READY',
    emoji: '📋',
    detail: 'Write the two questions you want answered before you walk in.',
    body: 'Appointment prep: write your two questions down now.',
    tint: C.modM,
    defaultTime: '19:00',
    defaultDays: [0],
    defaultTone: 'pulse',
    cadence: 'weekly',
  },
  {
    id: 'prep-daily',
    label: 'PrEP · DAILY DOSE',
    emoji: '🛡️',
    detail: 'Daily oral PrEP works when it is taken daily. Same time, every day.',
    body: 'PrEP dose. Same time, every day — that is the whole trick.',
    tint: C.flame,
    defaultTime: '21:00',
    defaultDays: EVERY_DAY,
    defaultTone: 'critical',
    cadence: 'daily',
    track: 'blue',
  },
  {
    id: 'pep-course',
    label: 'PEP · 28-DAY COURSE',
    emoji: '⏱️',
    detail: 'PEP is a 28-day course. Missing doses is what makes it fail.',
    body: 'PEP dose. Finish the full 28 days.',
    tint: C.flame,
    defaultTime: '20:00',
    defaultDays: EVERY_DAY,
    defaultTone: 'critical',
    cadence: 'daily',
    track: 'blue',
  },
  {
    id: 'contraception',
    label: 'BIRTH CONTROL DOSE',
    emoji: '📅',
    detail: 'Daily pill, or the weekly nudge for a patch or ring change.',
    body: 'Birth control dose.',
    tint: C.modT,
    defaultTime: '21:15',
    defaultDays: EVERY_DAY,
    defaultTone: 'pulse',
    cadence: 'daily',
    track: 'blue',
  },
  {
    id: 'testing-cycle',
    label: 'TESTING CYCLE NUDGE',
    emoji: '🧪',
    detail:
      'Routine screening runs on a schedule, not on a scare. This nudges you until you book it.',
    body: 'Testing check: booked yet? It is a 20-minute visit.',
    tint: C.gold,
    defaultTime: '17:30',
    defaultDays: [6],
    defaultTone: 'pulse',
    cadence: 'weekly',
    track: 'blue',
  },
  {
    id: 'followup-labs',
    label: 'FOLLOW-UP LABS',
    emoji: '🔬',
    detail: 'PrEP and post-exposure care both need follow-up bloodwork on a clock.',
    body: 'Follow-up labs. Call the clinic and get on the schedule.',
    tint: C.azure,
    defaultTime: '15:00',
    defaultDays: [2],
    defaultTone: 'double',
    cadence: 'weekly',
    track: 'blue',
  },
  {
    id: 'kit-check',
    label: 'KIT CHECK',
    emoji: '🎒',
    detail: 'Barriers in date, nothing crushed in a wallet, kit where you can reach it.',
    body: 'Kit check: in date, not in your back pocket, where you can reach it.',
    tint: C.modT,
    defaultTime: '19:30',
    defaultDays: [5],
    defaultTone: 'pulse',
    cadence: 'weekly',
    track: 'blue',
  },
];

export function templatesForTrack(track: Track): ReminderTemplate[] {
  return REMINDER_TEMPLATES.filter((t) => track === 'blue' || t.track !== 'blue');
}

export function getTemplate(id: string): ReminderTemplate | undefined {
  return REMINDER_TEMPLATES.find((t) => t.id === id);
}

export interface WeekdayInfo {
  index: number;
  short: string;
  letter: string;
  label: string;
}

/** Index 0 = Sunday, matching JavaScript's Date.getDay(). */
export const WEEKDAYS: WeekdayInfo[] = [
  { index: 0, short: 'SUN', letter: 'S', label: 'Sunday' },
  { index: 1, short: 'MON', letter: 'M', label: 'Monday' },
  { index: 2, short: 'TUE', letter: 'T', label: 'Tuesday' },
  { index: 3, short: 'WED', letter: 'W', label: 'Wednesday' },
  { index: 4, short: 'THU', letter: 'T', label: 'Thursday' },
  { index: 5, short: 'FRI', letter: 'F', label: 'Friday' },
  { index: 6, short: 'SAT', letter: 'S', label: 'Saturday' },
];

/** 'HH:MM' → { hour, minute }, clamped into range. */
export function parseTime(time: string): { hour: number; minute: number } {
  const [rawHour, rawMinute] = time.split(':');
  const hour = Math.min(23, Math.max(0, Number.parseInt(rawHour ?? '0', 10) || 0));
  const minute = Math.min(59, Math.max(0, Number.parseInt(rawMinute ?? '0', 10) || 0));
  return { hour, minute };
}

export function formatTime(time: string): string {
  const { hour, minute } = parseTime(time);
  const suffix = hour < 12 ? 'AM' : 'PM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${minute.toString().padStart(2, '0')} ${suffix}`;
}

/** Steps a 'HH:MM' string by whole minutes, wrapping across midnight. */
export function shiftTime(time: string, minutes: number): string {
  const { hour, minute } = parseTime(time);
  const total = (hour * 60 + minute + minutes + 1440) % 1440;
  const nextHour = Math.floor(total / 60);
  const nextMinute = total % 60;
  return `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;
}

export function describeDays(days: number[]): string {
  if (days.length === 0) return 'No days selected';
  if (days.length === 7) return 'Every day';
  const sorted = [...days].sort((a, b) => a - b);
  if (sorted.join(',') === '1,2,3,4,5') return 'School days';
  if (sorted.join(',') === '0,6') return 'Weekends';
  return sorted.map((d) => WEEKDAYS[d].short).join(' · ');
}

/** Local day key, used for the adherence log. */
export function logDayKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** The last n day keys, oldest first — the adherence history strip. */
export function recentDayKeys(count: number, from = new Date()): string[] {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(from);
    date.setDate(date.getDate() - (count - 1 - i));
    return logDayKey(date);
  });
}

export const ADHERENCE_NOTE =
  'Reminders are scheduled by your device, not by a server. Labels are the ones you choose — pick something only you would decode if a notification lands on a shared lock screen.';

export const ADHERENCE_WEB_NOTE =
  'Scheduled reminders need the installed app. In a browser tab the schedule is saved but the alert will not fire — open CAPE Flow on your phone to arm it.';

export const ADHERENCE_PERMISSION_NOTE =
  'Your device has notifications turned off for CAPE Flow. Reminders stay saved here, but nothing will alert until you allow notifications in system settings.';
