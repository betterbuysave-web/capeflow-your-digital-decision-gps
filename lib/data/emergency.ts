import { C } from '@/lib/colors';
import type { Track } from '@/lib/data/content';

/**
 * Emergency Directory: grouped one-tap help lines.
 * Every number here is a national line that answers directly.
 */

export interface EmergencyContact {
  id: string;
  name: string;
  detail: string;
  hours: string;
  /** Digits only — passed to tel: */
  dial?: string;
  sms?: { number: string; body: string };
  url?: string;
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export interface EmergencyGroup {
  id: string;
  label: string;
  emoji: string;
  tint: string;
  blurb: string;
  contacts: EmergencyContact[];
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export const EMERGENCY_GROUPS: EmergencyGroup[] = [
  {
    id: 'immediate',
    label: 'IMMEDIATE DANGER',
    emoji: '🚨',
    tint: C.no,
    blurb: 'Someone is hurt, unconscious, or in danger right now. Call first, explain later.',
    contacts: [
      {
        id: '911',
        name: '911 — EMERGENCY SERVICES',
        detail: 'Serious injury, overdose, assault in progress, immediate threat.',
        hours: '24/7',
        dial: '911',
      },
      {
        id: 'poison',
        name: 'POISON CONTROL',
        detail: 'Swallowed something, took too much, mixed the wrong things. Free expert advice.',
        hours: '24/7 · 800-222-1222',
        dial: '8002221222',
      },
    ],
  },
  {
    id: 'crisis',
    label: 'CRISIS & MENTAL HEALTH',
    emoji: '🆘',
    tint: C.flame,
    blurb: 'You do not have to be at the edge to use these. Overwhelmed qualifies.',
    contacts: [
      {
        id: '988',
        name: '988 SUICIDE & CRISIS LIFELINE',
        detail: 'Trained counselor by call or text. Free, confidential, and not the police.',
        hours: '24/7',
        dial: '988',
        sms: { number: '988', body: 'HELLO' },
      },
      {
        id: 'crisis-text',
        name: 'CRISIS TEXT LINE',
        detail: 'Text HOME to 741741 if your voice will not work tonight.',
        hours: '24/7',
        sms: { number: '741741', body: 'HOME' },
      },
      {
        id: 'teen-line',
        name: 'TEEN LINE',
        detail: 'Trained teen listeners for the things that feel too small to call about.',
        hours: 'Nightly · 800-852-8336 · text TEEN to 839863',
        dial: '8008528336',
        sms: { number: '839863', body: 'TEEN' },
      },
      {
        id: 'nami',
        name: 'NAMI HELPLINE',
        detail: 'Information, referrals, and how to actually get seen. Not a crisis line.',
        hours: 'Weekdays · 800-950-6264',
        dial: '8009506264',
        sms: { number: '62640', body: 'HELPLINE' },
      },
      {
        id: 'samhsa',
        name: 'SAMHSA NATIONAL HELPLINE',
        detail: 'Free, confidential treatment referral for mental health and substance use.',
        hours: '24/7 · 800-662-4357',
        dial: '8006624357',
        url: 'https://findtreatment.gov/',
      },
    ],
  },
  {
    id: 'abuse',
    label: 'ABUSE, ASSAULT & CONTROL',
    emoji: '🛡️',
    tint: C.violet,
    blurb: 'None of this was your fault, and none of these lines will pressure you into a report.',
    contacts: [
      {
        id: 'rainn',
        name: 'RAINN NATIONAL SEXUAL ASSAULT HOTLINE',
        detail:
          'Support, local resources, and what your options are — including doing nothing yet.',
        hours: '24/7 · 800-656-4673',
        dial: '8006564673',
        url: 'https://hotline.rainn.org/',
      },
      {
        id: 'childhelp',
        name: 'CHILDHELP NATIONAL CHILD ABUSE HOTLINE',
        detail: 'For abuse or neglect happening to you or someone you know.',
        hours: '24/7 · 800-422-4453',
        dial: '8004224453',
      },
      {
        id: 'texas-abuse',
        name: 'TEXAS ABUSE HOTLINE',
        detail:
          'Report abuse or neglect of a child in Texas. Adults in your life are required to report, and you can call too.',
        hours: '24/7 · 800-252-5400',
        dial: '8002525400',
      },
      {
        id: 'dv',
        name: 'NATIONAL DOMESTIC VIOLENCE HOTLINE',
        detail: 'Violence or control at home or in a relationship. Safety planning included.',
        hours: '24/7 · 800-799-7233 · text START to 88788',
        dial: '8007997233',
        sms: { number: '88788', body: 'START' },
      },
      {
        id: 'loveisrespect',
        name: 'LOVEISRESPECT',
        detail: 'Dating abuse and unhealthy relationships, built for teens and young adults.',
        hours: '24/7 · 866-331-9474 · text LOVEIS to 22522',
        dial: '8663319474',
        sms: { number: '22522', body: 'LOVEIS' },
      },
      {
        id: 'runaway',
        name: 'NATIONAL RUNAWAY SAFELINE',
        detail: 'Nowhere safe to sleep, thinking about leaving, or already gone.',
        hours: '24/7 · 800-786-2929',
        dial: '8007862929',
      },
    ],
  },
  {
    id: 'identity',
    label: 'IDENTITY & BELONGING',
    emoji: '🏳️‍🌈',
    tint: C.amber,
    blurb: 'Counselors who will not make you explain the basics first.',
    contacts: [
      {
        id: 'trevor',
        name: 'THE TREVOR PROJECT',
        detail: 'LGBTQ+ young people. Call, text, or chat with counselors who get it.',
        hours: '24/7 · 866-488-7386 · text START to 678678',
        dial: '8664887386',
        sms: { number: '678678', body: 'START' },
      },
      {
        id: 'trans-lifeline',
        name: 'TRANS LIFELINE',
        detail: 'Peer support run by trans people, with a no-non-consensual-active-rescue policy.',
        hours: '877-565-8860',
        dial: '8775658860',
      },
    ],
  },
  {
    id: 'digital',
    label: 'DIGITAL HARM & EXPLOITATION',
    emoji: '📱',
    tint: C.azure,
    blurb: 'Images, threats, and people online who are not who they said they were.',
    contacts: [
      {
        id: 'cybertipline',
        name: 'NCMEC CYBERTIPLINE',
        detail: 'Report sextortion, grooming, or a threat to share images of a minor.',
        hours: '24/7 · 800-843-5678',
        dial: '8008435678',
        url: 'https://report.cybertip.org/',
      },
      {
        id: 'take-it-down',
        name: 'TAKE IT DOWN',
        detail:
          'Free NCMEC service that helps remove nude or explicit images of someone under 18 from participating platforms.',
        hours: 'Online · anonymous',
        url: 'https://takeitdown.ncmec.org/',
      },
      {
        id: 'trafficking',
        name: 'HUMAN TRAFFICKING HOTLINE',
        detail: 'Someone controlling your movement, work, money, or documents.',
        hours: '24/7 · 888-373-7888 · text 233733',
        dial: '8883737888',
        sms: { number: '233733', body: 'HELP' },
      },
    ],
  },
  {
    id: 'sexual-health',
    label: 'SEXUAL HEALTH INFO LINES',
    emoji: '🧪',
    tint: C.gold,
    blurb: 'For the questions you want answered before you walk into a clinic.',
    track: 'blue',
    contacts: [
      {
        id: 'cdc-info',
        name: 'CDC-INFO',
        detail: 'CDC health information specialists: testing, PEP, PrEP, STIs, vaccines.',
        hours: 'Weekdays · 800-232-4636',
        dial: '8002324636',
        url: 'https://www.cdc.gov/cdc-info/',
        track: 'blue',
      },
      {
        id: 'pp-chat',
        name: 'PLANNED PARENTHOOD CHAT/TEXT',
        detail: 'Text PPNOW to 774636 for confidential answers from a health educator.',
        hours: 'Daily',
        sms: { number: '774636', body: 'PPNOW' },
        url: 'https://www.plannedparenthood.org/online-tools/chat',
        track: 'blue',
      },
      {
        id: 'pep-emergency-department',
        name: 'EMERGENCY DEPARTMENT · PEP EVALUATION',
        detail:
          'Inside 72 hours of a possible HIV exposure, go to an emergency department with a trusted adult and ask to be evaluated for PEP. This app does not provide medication.',
        hours: 'Go now · Do not wait for a hotline',
        track: 'blue',
      },
    ],
  },
];

export function groupsForTrack(track: Track): EmergencyGroup[] {
  return EMERGENCY_GROUPS.filter((g) => track === 'blue' || g.track !== 'blue').map((g) => ({
    ...g,
    contacts: g.contacts.filter((c) => track === 'blue' || c.track !== 'blue'),
  }));
}

export function lockedGroupCount(track: Track): number {
  return track === 'blue' ? 0 : EMERGENCY_GROUPS.filter((g) => g.track === 'blue').length;
}

export const EMERGENCY_LOCK_NOTE =
  'Sexual health information lines are part of the Grades 9–12 track. Every crisis, abuse, identity, and digital-harm line above is available on every track.';

/** A brief grounding pause, not a guaranteed physiological reset. */
export const THREE_SECOND_RULE = {
  title: 'THE 3-SECOND RULE',
  lead: 'If it is safe to pause, three counted seconds can make room for your next choice. You do not have to feel calm to ask for help.',
  steps: [
    '3 — Feet on the floor. Notice where you actually are.',
    '2 — One slow breath out, longer than the breath in.',
    '1 — Name the next single action. Only the next one.',
  ],
  done: 'Pause complete. What is your next single move?',
  close: 'Never delay urgent help or moving away from danger to finish a pause.',
} as const;

export const EMERGENCY_FIRST_MOVES = [
  {
    title: 'GET SOMEWHERE SAFER',
    detail: 'Lit space, other people nearby, a door you can leave through.',
  },
  {
    title: 'TELL ONE HUMAN',
    detail: 'Safety Circle contact, any adult, or a line above. Do not carry it alone.',
  },
  {
    title: 'WRITE IT DOWN',
    detail: 'Time, place, names, screenshots. Memory degrades fast under stress.',
  },
  {
    title: 'GET SEEN',
    detail: 'Urgent care or an emergency department can start care today.',
  },
] as const;

export const EMERGENCY_NOTE =
  'Calls and texts leave this app and go through your phone, so they appear in your normal call and message history. CAPE Flow does not record which line you opened.';
