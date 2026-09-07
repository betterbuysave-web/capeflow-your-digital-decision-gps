import { C } from '@/lib/colors';
import type { Track } from '@/lib/data/content';

/**
 * Clinic Finder data.
 *
 * Everything here points at an official national finder run by a government
 * agency or a national nonprofit. CAPE Flow deliberately ships no invented
 * clinic list: a wrong address at 1 a.m. is worse than no address, so the app
 * routes to the authoritative locator and helps the user walk in prepared.
 */

export type CareCategory =
  | 'primary'
  | 'coverage'
  | 'mental'
  | 'vaccines'
  | 'testing'
  | 'prevention'
  | 'sexual';

export interface CareCategoryInfo {
  id: CareCategory;
  label: string;
  emoji: string;
  tint: string;
  blurb: string;
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export const CARE_CATEGORIES: CareCategoryInfo[] = [
  {
    id: 'primary',
    label: 'CHECK-UPS & PRIMARY CARE',
    emoji: '🩺',
    tint: C.modM,
    blurb: 'Sports physicals, sick visits, asthma, skin, a doctor who knows your name.',
  },
  {
    id: 'coverage',
    label: 'COST & COVERAGE',
    emoji: '💳',
    tint: C.teal,
    blurb: 'Free and sliding-scale clinics, and coverage you may already qualify for.',
  },
  {
    id: 'mental',
    label: 'MENTAL HEALTH SUPPORT',
    emoji: '🧠',
    tint: C.azure,
    blurb: 'Counselors, therapy, and treatment referral lines that answer every day.',
  },
  {
    id: 'vaccines',
    label: 'VACCINES',
    emoji: '💉',
    tint: C.modA,
    blurb: 'Flu, HPV cancer prevention, meningococcal, catch-up shots.',
  },
  {
    id: 'testing',
    label: 'STI & HIV TESTING',
    emoji: '🧪',
    tint: C.gold,
    blurb: 'Confidential testing sites, many free, most same-day.',
    track: 'blue',
  },
  {
    id: 'prevention',
    label: 'PrEP / PEP PROVIDERS',
    emoji: '🛡️',
    tint: C.flame,
    blurb: 'Clinics that prescribe PrEP, and where to get PEP inside the 72-hour window.',
    track: 'blue',
  },
  {
    id: 'sexual',
    label: 'SEXUAL HEALTH CLINICS',
    emoji: '🏥',
    tint: C.modT,
    blurb: 'Title X and youth-friendly clinics: contraception, exams, counseling.',
    track: 'blue',
  },
];

export interface CareNetwork {
  id: string;
  name: string;
  operator: string;
  detail: string;
  cost: string;
  categories: CareCategory[];
  url: string;
  /** Template with {zip} — used when the locator accepts a ZIP in the URL. */
  zipUrl?: string;
  phone?: string;
  keywords: string[];
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export const CARE_NETWORKS: CareNetwork[] = [
  {
    id: 'hrsa',
    name: 'FIND A HEALTH CENTER',
    operator: 'HRSA · U.S. Health Resources & Services Administration',
    detail:
      'Federally funded community health centers. They see you with or without insurance and bill on a sliding scale based on income.',
    cost: 'Sliding scale · no one turned away for inability to pay',
    categories: ['primary', 'coverage', 'mental', 'vaccines'],
    url: 'https://findahealthcenter.hrsa.gov/',
    zipUrl: 'https://findahealthcenter.hrsa.gov/?zip={zip}',
    keywords: ['community health center', 'sliding scale', 'no insurance', 'doctor', 'checkup'],
  },
  {
    id: 'nafc',
    name: 'FREE & CHARITABLE CLINIC FINDER',
    operator: 'National Association of Free & Charitable Clinics',
    detail:
      'Volunteer-staffed clinics that charge nothing or close to it. Good option when there is no insurance card in the house.',
    cost: 'Free or nominal fee',
    categories: ['primary', 'coverage'],
    url: 'https://nafcclinics.org/find-clinic/',
    keywords: ['free clinic', 'charity', 'uninsured', 'no cost'],
  },
  {
    id: 'insurekidsnow',
    name: 'INSURE KIDS NOW',
    operator: 'U.S. Dept. of Health & Human Services',
    detail:
      'Checks whether you qualify for free or low-cost coverage through Medicaid or CHIP, and connects you to your state program.',
    cost: 'Coverage is free or low-cost when you qualify',
    categories: ['coverage'],
    url: 'https://www.insurekidsnow.gov/',
    phone: '8775437669',
    keywords: ['insurance', 'medicaid', 'chip', 'coverage', 'cost'],
  },
  {
    id: 'vaccines',
    name: 'VACCINE FINDER',
    operator: 'Vaccines.gov · U.S. Dept. of Health & Human Services',
    detail:
      'Pharmacies and clinics carrying flu and routine vaccines near you. Many pharmacies vaccinate teens without an appointment.',
    cost: 'Usually covered; free through the Vaccines for Children program if uninsured',
    categories: ['vaccines'],
    url: 'https://www.vaccines.gov/find-vaccines/',
    keywords: ['vaccine', 'shot', 'flu', 'hpv', 'immunization', 'pharmacy'],
  },
  {
    id: 'findtreatment',
    name: 'FINDTREATMENT.GOV',
    operator: 'SAMHSA · Substance Abuse & Mental Health Services Administration',
    detail:
      'Searchable directory of licensed mental health and substance use treatment programs, filterable by age group and payment options.',
    cost: 'Filters for free, sliding-scale, and Medicaid-accepting programs',
    categories: ['mental'],
    url: 'https://findtreatment.gov/',
    phone: '8006624357',
    keywords: ['therapy', 'counselor', 'mental health', 'substance', 'treatment', 'samhsa'],
  },
  {
    id: 'gettested',
    name: 'GET TESTED',
    operator: 'CDC · Centers for Disease Control and Prevention',
    detail:
      'The CDC testing-site locator. Filter by HIV, chlamydia, gonorrhea, syphilis, and hepatitis. Many sites are free and do not require a parent.',
    cost: 'Many sites free · confidential',
    categories: ['testing', 'sexual'],
    url: 'https://gettested.cdc.gov/',
    keywords: ['sti', 'std', 'hiv test', 'testing', 'confidential', 'cdc'],
    track: 'blue',
  },
  {
    id: 'preplocator',
    name: 'PrEP LOCATOR',
    operator: 'Emory University / national PrEP provider directory',
    detail:
      'Directory of clinics and providers that prescribe PrEP, searchable by address. Call ahead and ask about minor consent in your state.',
    cost: 'PrEP is covered by most insurance with no copay; assistance programs cover the rest',
    categories: ['prevention'],
    url: 'https://preplocator.org/',
    keywords: ['prep', 'prevention', 'truvada', 'descovy', 'apretude'],
    track: 'blue',
  },
  {
    id: 'hivgov',
    name: 'HIV.GOV SERVICES LOCATOR',
    operator: 'HIV.gov · U.S. Dept. of Health & Human Services',
    detail:
      'Testing, PrEP, PEP, treatment, and housing services on one map. The fastest way to find a clinic that can start PEP today.',
    cost: 'Varies by site; many Ryan White funded services are free',
    categories: ['testing', 'prevention'],
    url: 'https://locator.hiv.gov/',
    keywords: ['pep', 'prep', 'hiv', 'testing', 'ryan white', '72 hours'],
    track: 'blue',
  },
  {
    id: 'titlex',
    name: 'TITLE X FAMILY PLANNING CLINICS',
    operator: 'HHS Office of Population Affairs',
    detail:
      'Federally funded clinics required to serve adolescents confidentially and to charge on a sliding scale, including $0 for many teens.',
    cost: 'Sliding scale · often free for youth with no income',
    categories: ['sexual', 'testing'],
    url: 'https://opa-fpclinicdb.hhs.gov/',
    keywords: ['title x', 'family planning', 'contraception', 'birth control', 'confidential'],
    track: 'blue',
  },
  {
    id: 'plannedparenthood',
    name: 'PLANNED PARENTHOOD HEALTH CENTERS',
    operator: 'Planned Parenthood Federation of America',
    detail:
      'Health center finder with online booking, plus a chat and text line for questions before you go.',
    cost: 'Sliding scale at most centers · insurance optional',
    categories: ['sexual', 'testing', 'prevention'],
    url: 'https://www.plannedparenthood.org/health-center',
    keywords: ['planned parenthood', 'clinic', 'exam', 'birth control', 'testing'],
    track: 'blue',
  },
];

/** Networks the reader's track is allowed to see. */
export function networksForTrack(track: Track): CareNetwork[] {
  return CARE_NETWORKS.filter((n) => track === 'blue' || n.track !== 'blue');
}

export function categoriesForTrack(track: Track): CareCategoryInfo[] {
  return CARE_CATEGORIES.filter((c) => track === 'blue' || c.track !== 'blue');
}

export function lockedNetworkCount(track: Track): number {
  return track === 'blue' ? 0 : CARE_NETWORKS.filter((n) => n.track === 'blue').length;
}

/** Free-text + category filter over the track's networks. */
export function searchNetworks(
  track: Track,
  query: string,
  category: CareCategory | null,
): CareNetwork[] {
  const q = query.trim().toLowerCase();
  return networksForTrack(track).filter((n) => {
    if (category && !n.categories.includes(category)) return false;
    if (q.length === 0) return true;
    return (
      n.name.toLowerCase().includes(q) ||
      n.operator.toLowerCase().includes(q) ||
      n.detail.toLowerCase().includes(q) ||
      n.keywords.some((k) => k.includes(q))
    );
  });
}

/** Adds the typed ZIP to the locator URL when that locator accepts one. */
export function locatorUrl(network: CareNetwork, zip: string): string {
  const clean = zip.replace(/\D/g, '').slice(0, 5);
  if (network.zipUrl && clean.length === 5) return network.zipUrl.replace('{zip}', clean);
  return network.url;
}

export interface IntakeScript {
  id: string;
  label: string;
  line: string;
  when: string;
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

/** Front-desk lines that kill the Phone Ghost. Say them flat; nobody is grading you. */
export const INTAKE_SCRIPTS: IntakeScript[] = [
  {
    id: 'book',
    label: 'BOOKING THE VISIT',
    line: "\"Hi — I'd like to make an appointment. I'm a new patient and I'm 15.\"",
    when: 'Opening line on any call. You do not owe them a reason up front.',
  },
  {
    id: 'cost',
    label: 'ASKING ABOUT COST',
    line: '"I don\'t have insurance. Do you have a sliding scale, and what will today cost me?"',
    when: 'Ask before the visit. Health centers are used to this question.',
  },
  {
    id: 'ride',
    label: 'GETTING THERE',
    line: '"What are your walk-in hours, and is there a bus stop near the entrance?"',
    when: 'Logistics kill more appointments than fear does. Solve it on the call.',
  },
  {
    id: 'adult',
    label: 'BRINGING AN ADULT',
    line: '"Can a trusted adult come with me and stay in the room if I want?"',
    when: 'You can bring backup. You can also ask them to step out.',
  },
  {
    id: 'confidential',
    label: 'CONFIDENTIALITY CHECK',
    line: '"What parts of this visit are confidential, and what shows up on a statement?"',
    when: 'Ask at check-in, not after. Get the answer before the exam.',
    track: 'blue',
  },
  {
    id: 'testing',
    label: 'ASKING FOR TESTING',
    line: '"I\'d like full STI testing, including HIV. What do you test for today?"',
    when: 'Say it plainly. Full panels are routine care, not a confession.',
    track: 'blue',
  },
  {
    id: 'pep',
    label: 'THE 72-HOUR ASK',
    line: '"I may have been exposed to HIV in the last three days. I need to be evaluated for PEP now."',
    when: 'Emergency department, urgent care, or any clinic. This sentence gets you triaged.',
    track: 'blue',
  },
  {
    id: 'prep',
    label: 'STARTING PrEP',
    line: '"I want to talk about starting PrEP. Do you prescribe it here or refer out?"',
    when: 'If they refer out, ask for the name and number before you hang up.',
    track: 'blue',
  },
];

export function intakeScriptsForTrack(track: Track): IntakeScript[] {
  return INTAKE_SCRIPTS.filter((s) => track === 'blue' || s.track !== 'blue');
}

export const CLINIC_COST_NOTE =
  'Cost is a gate, not a wall. Community health centers and Title X clinics are required to charge on a sliding scale, which is often $0 for a student with no income. You can ask what a visit costs before you agree to anything.';

export const CLINIC_CONFIDENTIALITY_NOTE =
  'Confidentiality rules for minors vary by state and by service. Ask two questions at the front desk: what stays between you and the clinician, and what appears on an insurance statement. Staff answer this every day — it is a normal question, not a red flag.';

export const CLINIC_GREEN_LOCK_NOTE =
  'Testing, PrEP, PEP, and sexual health clinic directories are part of the Grades 9–12 track. On this track the finder covers check-ups, coverage, mental health support, and vaccines.';

export const CLINIC_SAFETY_NOTE =
  'CAPE Flow does not store your ZIP code, your searches, or which clinic you opened. Each finder is run by the agency named on the card and opens in your browser.';
