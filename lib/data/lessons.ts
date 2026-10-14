/**
 * The 18 CAPE Youth Edition lessons, one per book chapter, written for students.
 *
 * Facilitator material (answer keys, timing, room notes, biological framing)
 * stays in the facilitator curriculum and is never shown here. Blue-track
 * lessons (Parts 3 and 5) render as locked screens on the Green track.
 */
import type { Track } from '@/lib/data/content';

export interface BookLesson {
  number: number;
  /** Book part = curriculum module. */
  part: 1 | 2 | 3 | 4 | 5;
  title: string;
  track: 'both' | 'blue';
  /** What you'll be able to do, in student language. */
  learn: string[];
  /** Words to practise out loud. */
  sayIt?: string[];
  /** One private reflection prompt; the answer is saved on the device. */
  prompt: string;
  takeaway: string;
  tool?: { label: string; href: string };
}

export const BOOK_PARTS: Record<BookLesson['part'], { title: string; track: 'both' | 'blue' }> = {
  1: { title: 'Building Your CAPE Mindset', track: 'both' },
  2: { title: 'Healthy Connections & Boundaries', track: 'both' },
  3: { title: 'Protection Shields', track: 'blue' },
  4: { title: 'Your CAPE in Action', track: 'both' },
  5: { title: 'The Green Light Pivot', track: 'blue' },
};

export const BOOK_LESSONS: BookLesson[] = [
  {
    number: 1,
    part: 1,
    title: 'Own Your Health: Respect Starts With You',
    track: 'both',
    learn: [
      'See protecting your health as self-respect and freedom, not a list of rules.',
      'Know that choosing your own pace (waiting) is the only 100% effective way to prevent pregnancy and STIs.',
      'Connect self-respect to everyday habits: sleep, food, movement and your yearly check-up.',
      'Treat questions about puberty and your mood as normal, not embarrassing.',
    ],
    prompt:
      'One thing that helped my body or mind today, and how choosing my pace gives me freedom right now.',
    takeaway: 'Protecting your health is the most powerful thing you can do for yourself.',
    tool: { label: 'Open Daily Superpower lessons', href: '/module/habits' },
  },
  {
    number: 2,
    part: 1,
    title: 'The Art of Courageous Communication',
    track: 'both',
    learn: [
      'Tell the difference between assertive (clear, kind, firm) and aggressive.',
      'Use four kinds of scripts: setting a boundary, asking for clarity, holding the line, and buying time.',
      'Read how someone responds to your boundary as information about them.',
    ],
    sayIt: [
      'I already answered.',
      'Asking again won’t change my answer.',
      'I’m going to head out now.',
      'I don’t decide big things at midnight.',
    ],
    prompt: 'A boundary I want to set, my exact words, and where I’ll practise them this week.',
    takeaway: 'Your voice is your first line of protection — use it early and use it clearly.',
    tool: { label: 'Build your scripts in Strongest Voice', href: '/tools/strongest-voice' },
  },
  {
    number: 3,
    part: 2,
    title: 'Healthy vs. Unhealthy Relationships & Red Flags',
    track: 'both',
    learn: [
      'Spot the six Green Light signs: respected, safe, supported, free, equal and honest.',
      'Notice red flags like control, jealousy, guilt, isolation and checking your phone or location. One flag decides nothing; several is a pattern.',
      'Use the CAPE Response Plan: trust your gut, use your voice, reach out, remember your standard.',
      'Help a friend as a powerful bystander.',
    ],
    sayIt: [
      'Hey, I’ve been worried about you. You deserve to feel safe.',
      'I’m here. We can tell a trusted adult together.',
      'Can you just listen for a few minutes before you react?',
    ],
    prompt: 'Three to five trusted adults, and the best way to reach each one.',
    takeaway: 'Healthy relationships feel like freedom — not pressure.',
    tool: { label: 'Build your Safety Circle', href: '/tools/safety-circle' },
  },
  {
    number: 4,
    part: 2,
    title: 'The Heart of Respect: Consent & Boundaries',
    track: 'both',
    learn: [
      'Use F.R.I.E.S.: Freely given, Reversible, Informed, Enthusiastic, Specific. If one is missing, it is not consent.',
      'Build your four-tier Boundary Menu: Appetizers, Main Courses, Specials and Do Not Serve.',
      'Change your mind anytime. That is self-knowledge, not a mixed signal.',
      'Stop right away when someone else changes their mind.',
    ],
    sayIt: [
      'Actually, I changed my mind.',
      'I want to stop.',
      'This isn’t working for me anymore.',
    ],
    prompt: 'One item for each tier of my Boundary Menu.',
    takeaway: 'Consent is always yours to give — and always yours to take back.',
    tool: { label: 'Open the Consent Café', href: '/tools/consent-cafe' },
  },
  {
    number: 5,
    part: 2,
    title: 'The Boundary Shield: Physical, Emotional & Digital',
    track: 'both',
    learn: [
      'Map your boundaries in three zones: physical, emotional and digital.',
      'See boundaries as instructions for how to be around you, not walls.',
      'Remember Screenshot Reality: anything sent can be saved and shared again.',
      'If an intimate image arrives: STOP, DELETE, REPORT, and tell a trusted adult.',
    ],
    prompt: 'What I protect and what I avoid in each zone: physical, emotional, digital.',
    takeaway:
      'Your digital legacy is yours to protect — and boundaries are instructions, not walls.',
    tool: { label: 'Open the Educational Library', href: '/educational-library' },
  },
  {
    number: 6,
    part: 2,
    title: 'The Midnight Text: The 3-Second Rule',
    track: 'both',
    learn: [
      'Run the Three Gates before you send or post: the Legacy Check, the Billboard Check and the FRIES Consent Check.',
      'If any gate says “not sure,” do not send.',
      'Know why late-night messages hit differently: you are tired, feelings are louder and it is harder to walk away.',
      'Know what to do if something was already sent: don’t forward, don’t pay, don’t send more, keep threatening messages, and tell a trusted adult tonight.',
    ],
    sayIt: ['I’m not sending that. And I’m not going to change my mind if you ask again.'],
    prompt: 'A message I’d run through the Three Gates, and which gate would stop it.',
    takeaway: 'Three gates. One “not sure” stops the whole thing.',
    tool: { label: 'Try the photo-push sim', href: '/sim/photo-push' },
  },
  {
    number: 7,
    part: 2,
    title: 'Protection Principles: Science and Choosing Your Pace',
    track: 'both',
    learn: [
      'Choosing your pace is the base layer. Everything else is backup.',
      'Name the four kinds of science shields: barriers, vaccines, medications and testing.',
      'Know that choosing your pace is available every day, to everyone.',
      'Practise your boundary sentence before pressure arrives.',
    ],
    prompt: 'One sentence I would actually say to hold my pace.',
    takeaway: 'Choosing your pace is the base layer. Everything else is backup.',
    tool: { label: 'Part 3 checkpoint', href: '/book-part/3' },
  },
  {
    number: 8,
    part: 3,
    title: 'Barriers & Protection: Your Frontline Gear',
    track: 'blue',
    learn: [
      'Choosing your pace is the only 100% effective option. Start there.',
      'Know the difference between external and internal condoms and their materials.',
      'Condoms prevent pregnancy about 98% of the time with perfect use and about 87% with typical use. The gap is human error, which you can change.',
      'Use one condom at a time, never two, with water- or silicone-based lube. Never oil with latex.',
      'Pills, patches, rings, implants and IUDs prevent pregnancy only, not STIs.',
    ],
    prompt: 'What being prepared means for me, in one sentence.',
    takeaway: 'Being prepared is not planning to have sex — it is planning to be safe.',
    tool: { label: 'Open the Educational Library', href: '/educational-library' },
  },
  {
    number: 9,
    part: 3,
    title: 'Medical Shields: Science as Your Backup',
    track: 'blue',
    learn: [
      'Vaccines: HPV (routine at 11–12, catch-up later) and hepatitis B (usually given as a baby).',
      'Testing: many STIs have no symptoms, and a test taken too soon can miss an infection.',
      'PrEP prevents HIV only. It comes as a daily pill, a shot every two months or a shot twice a year.',
      'PEP must start within 72 hours of a possible HIV exposure and lasts 28 days. Go to an emergency room with a trusted adult.',
      'U=U: someone with HIV who stays undetectable does not pass it on through sex.',
    ],
    sayIt: ['I may have been exposed to HIV and need to be evaluated for PEP.'],
    prompt: 'Questions I want to ask a doctor or nurse about vaccines and testing.',
    takeaway:
      'Knowing about vaccines, testing, PrEP and PEP replaces a vague worry with a specific plan.',
    tool: { label: 'Open the PEP Clock', href: '/tools/pep-clock' },
  },
  {
    number: 10,
    part: 3,
    title: 'Naming the Ghosts: Your Healthcare Anxiety Audit',
    track: 'blue',
    learn: [
      'An unnamed fear works like an invisible wall. A named one is a problem with next steps.',
      'Know the six Ghosts that keep teens from care: Phone, Bureaucracy, Confidentiality, Needle, Language and Cost.',
      'Turn one named fear into one action this week.',
    ],
    prompt: 'The Ghost I feel most, and one action I’ll take this week.',
    takeaway: 'A named fear is a specific problem — and specific problems have next steps.',
    tool: { label: 'Open the Healthcare Anxiety Audit', href: '/tools/ghost-vault' },
  },
  {
    number: 11,
    part: 3,
    title: 'The Clinical Bridge: Walking In and Speaking Up',
    track: 'blue',
    learn: [
      'Know four words that open doors: sliding scale, charity care, walk-in and Ryan White.',
      'Load six sentences into memory so you don’t have to invent them under stress.',
      'The fix for nerves is not confidence. It is practised words.',
      'These are ways to ask, not guarantees. Rules for teens differ by state and clinic.',
    ],
    sayIt: [
      'Hi, I’d like to get tested today. Do you take walk-ins?',
      'How do you keep this visit confidential? Who else would see my information?',
      'Before we start — do you offer a sliding scale or charity care?',
      'I get lightheaded with needles. Can I lie down for this?',
      'I had a possible exposure. I want to know my options today.',
      'Can I have a few minutes alone with the nurse?',
    ],
    prompt: 'The sentence that would be hardest for me to say, in my own words.',
    takeaway: 'Practised words beat nerves every time.',
    tool: { label: 'Open the Clinic Finder', href: '/clinic-finder' },
  },
  {
    number: 12,
    part: 4,
    title: 'The MATCH Compass: Your Everyday Decision Guide',
    track: 'both',
    learn: [
      'Run the Compass in about four seconds, which is about how long you get.',
      'M Health Armor · A Built-In Radar · T Safety Kit · C Strongest Voice · H Daily Superpower.',
      'Use it at a party or group hang, and with someone new online.',
    ],
    prompt: 'My Personal MATCH Plan: one line for each letter.',
    takeaway: 'Your MATCH Compass works in any situation — it goes wherever you go.',
    tool: { label: 'Open the MATCH Compass', href: '/(tabs)/learn' },
  },
  {
    number: 13,
    part: 4,
    title: 'The Broken MATCH: When Your Plan Fails',
    track: 'both',
    learn: [
      'Plans break: phones die, rides don’t show, adults are busy, clinics close. That is data, not failure.',
      'Name what broke, then ask: which letter of MATCH can I still use right now?',
      'A and C almost never break.',
      'One adult’s bad reaction says something about them, not about whether you deserve help.',
    ],
    prompt: 'A time a plan broke, and the letter I could have switched to.',
    takeaway: 'Safety isn’t perfection — it’s how fast and how smartly you adjust.',
    tool: { label: 'Try the unattended-cup sim', href: '/sim/party-drink' },
  },
  {
    number: 14,
    part: 4,
    title: 'The Saturday Crisis: Finding Real Care',
    track: 'both',
    learn: [
      'Know what counts as a Saturday Crisis: worrying symptoms, a crossed boundary, or feeling unsafe right now.',
      'Build a Saturday Crisis Card with five entries.',
      'Have a first option and a second option. One phone number is not a plan.',
      'Anywhere in the US, dial 211 for local help, 24/7.',
    ],
    prompt:
      'My Saturday Crisis Card: a 24-hour place, a locator, two crisis lines, a trusted adult and a local health centre.',
    takeaway: 'A generic list becomes a survival kit the moment you make it local.',
    tool: { label: 'Open the Clinic Finder', href: '/clinic-finder' },
  },
  {
    number: 15,
    part: 4,
    title: 'The Digital Handoff: Closing the Graduation Gap',
    track: 'both',
    learn: [
      'When a class ends, tools quietly stop being used. That is the Graduation Gap.',
      'Do the five handoff steps now, not later: save a 24-hour contact, bookmark a locator, screenshot your MATCH plan, save two crisis lines starting with 988, and name one person.',
      'What survives a program is what you carry on your phone.',
    ],
    prompt: 'The one person I’m naming as part of my plan.',
    takeaway:
      'Carry your skills, your plan and your people — they’re the tools you’ll still have in ten years.',
    tool: { label: 'Save contacts in your Safety Circle', href: '/tools/safety-circle' },
  },
  {
    number: 16,
    part: 4,
    title: 'If a Boundary Was Crossed',
    track: 'both',
    learn: [
      'Four True Things, starting with: it was not your fault.',
      'If you are unsafe now, call 911. RAINN (1-800-656-4673) is free, confidential and 24/7. An emergency room can help with injuries and care.',
      'If someone uses an image against you: report it, don’t pay, don’t send more, and keep the threatening messages.',
      'If a friend tells you: believe them, don’t take over, and help them reach a real adult.',
    ],
    sayIt: [
      'Something happened and I’d like to talk to someone privately.',
      'I care about you too much to be the only one who knows about this.',
    ],
    prompt: 'Who I would go to first, and what I would say.',
    takeaway:
      'Getting help is not the opposite of being strong. It is what strong people actually do.',
    tool: { label: 'Open the Emergency Directory', href: '/emergency-directory' },
  },
  {
    number: 17,
    part: 4,
    title: 'Becoming the Leader Your World Needs',
    track: 'both',
    learn: [
      'CAPE is a leadership identity you already have, not someday.',
      'Every time you choose your own strength, you give someone else permission. That is the Ripple Effect.',
      'Strength is choosing yourself when that is the harder option.',
    ],
    sayIt: ['I am Confident. I am Aware. I am Protected. I am Empowered. I am CAPE.'],
    prompt:
      'My CAPE Legacy Letter: what I want future me to remember about how strong I already am.',
    takeaway: 'Living with your CAPE on is not a moment — it is a choice you make every day.',
    tool: { label: 'See your badges', href: '/badges' },
  },
  {
    number: 18,
    part: 5,
    title: 'The Green Light Pivot: Saying Yes Well',
    track: 'blue',
    learn: [
      'Deciding to keep waiting is a strong outcome of this lesson. Choosing your pace is still the only 100% effective option.',
      'Ask · Hear · Respond: ask clearly, hear accurately, and stop without making anyone pay for it.',
      'An unclear answer is a no. Silence, “I guess” and going quiet all mean stop.',
      'Have the protection conversation before anything happens, while everyone can think clearly.',
    ],
    sayIt: [
      'I want to make sure you actually want this. Do you?',
      'I want to, and I also want to slow down. Is that okay?',
      'I’ve changed my mind. I want to stop.',
      'Okay — let’s stop.',
    ],
    prompt:
      'What an enthusiastic yes from someone I respect would sound like, and what I’d do if I didn’t hear it.',
    takeaway: 'Say what you mean, believe what you hear, and stop the second anything is unclear.',
    tool: { label: 'Practise in Strongest Voice', href: '/tools/strongest-voice' },
  },
];

export function lessonUnlocked(lesson: BookLesson, track: Track): boolean {
  return lesson.track === 'both' || track === 'blue';
}

export function getBookLesson(number: number): BookLesson | undefined {
  return BOOK_LESSONS.find((lesson) => lesson.number === number);
}

export const LESSON_LOCK_NOTE =
  'This lesson is part of the Blue Track, grades 9–12. It stays locked on the Green Track, grades 6–8. If something happened and you need help, talk to a trusted adult or open the Crisis Protocol.';
