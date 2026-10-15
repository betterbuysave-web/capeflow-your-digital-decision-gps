/**
 * Two activities built from the CAPE decks:
 *  - Green Track: The Vibe Check Navigator (friendship "Heck yes!")
 *  - Blue Track: The Green Light Pivot (the Enthusiastic Yes, hitting the gas safely)
 * Facilitator-only body science (hormones, brain regions) stays out of the app.
 */

export interface SortItem {
  id: string;
  text: string;
  /** 'a' = first bin, 'b' = second bin. */
  answer: 'a' | 'b';
  why: string;
}

export interface FieldDrill {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: string[];
  answer: number;
  vibeCheck: string;
  powerMove: string;
}

export interface PivotSlot {
  id: string;
  label: string;
  hint: string;
  options: string[];
}

/* ── Green: the Vibe Check Navigator ──────────────────────────── */

export const VIBE_BINS = { a: 'Heck yes!', b: 'Polite maybe' } as const;

export const VIBE_SORT: SortItem[] = [
  {
    id: 'v1',
    text: '"YES! I\'ve been wanting to do that!"',
    answer: 'a',
    why: 'Excitement in their voice and no hesitation. That is a real yes.',
  },
  {
    id: 'v2',
    text: '"I guess… if you want to."',
    answer: 'b',
    why: '"I guess" is a shrug. Check in instead of going ahead.',
  },
  {
    id: 'v3',
    text: 'They lean in, smile, and ask what time.',
    answer: 'a',
    why: 'Leaning in and asking questions means they are into it.',
  },
  {
    id: 'v4',
    text: 'They look away, go quiet, and say "sure, whatever."',
    answer: 'b',
    why: 'Looking away plus "whatever" is a red flag. Pressure may be present.',
  },
  {
    id: 'v5',
    text: 'They volunteer to bring snacks before you even ask.',
    answer: 'a',
    why: 'Joining in without being asked twice is a true green light.',
  },
  {
    id: 'v6',
    text: 'They agree only after you ask three times.',
    answer: 'b',
    why: 'A yes you had to wear down is not a free yes.',
  },
];

export const VIBE_RULE = 'If it is not an enthusiastic "Heck yes!", treat it like a "No."';

export const VIBE_DRILLS: FieldDrill[] = [
  {
    id: 'lunch',
    title: 'The lunch table guilt trip',
    scenario:
      'Your friend says, "If you\'re really my best friend, you\'ll sit with us today instead of the new kid."',
    question: 'Which F.R.I.E.S. dial is off?',
    options: ['Freely given', 'Reversible', 'Specific'],
    answer: 0,
    vibeCheck:
      'Not freely given. Guilt-tripping and fear of missing out are pressure. That is a red flag.',
    powerMove:
      "Trust your internal radar. You get to share your social space how you choose, without earning anyone's friendship.",
  },
  {
    id: 'xbox',
    title: 'The game you want to quit',
    scenario:
      'You agreed to play a co-op game for two hours. After 30 minutes you\'re bored and frustrated. Your friend says, "You already started, so you have to finish."',
    question: 'Which dial says you can stop?',
    options: ['Informed', 'Reversible', 'Enthusiastic'],
    answer: 1,
    vibeCheck:
      'Reversible. Changing your mind mid-activity is always okay. It is self-knowledge, not a mixed signal.',
    powerMove: 'Like sending a dish back to the kitchen, you can change your "order" at any time.',
  },
  {
    id: 'sleepover-movie',
    title: 'The sleepover movie',
    scenario:
      'At a sleepover everyone wants to watch a horror movie you know will give you nightmares. They say, "Don\'t be a baby, just watch it."',
    question: 'Which dial is being pushed?',
    options: ['Freely given', 'Specific', 'Informed'],
    answer: 0,
    vibeCheck: 'Freely given. "Don\'t be a baby" is name-calling to get a yes.',
    powerMove:
      'You can say no and still stay — pick a different movie or hang out in another room.',
  },
];

export const VIBE_PIVOT: PivotSlot[] = [
  {
    id: 'ack',
    label: 'Step 1 · Acknowledge the vibe',
    hint: 'Shows you still care about the friendship.',
    options: [
      'I love hanging out with you, but…',
      "You're a good friend, and…",
      "I'm glad you asked, but…",
    ],
  },
  {
    id: 'limit',
    label: 'Step 2 · State the limit',
    hint: 'Clear and specific. No long explanation.',
    options: [
      "I'm not feeling that game right now.",
      "I'm not doing that one.",
      "I'm going to sit somewhere else today.",
    ],
  },
  {
    id: 'pivot',
    label: 'Step 3 · Offer the pivot',
    hint: 'Points the energy somewhere good.',
    options: [
      'Want to shoot hoops instead?',
      'Want to pick a different movie?',
      'Want to hang after school?',
    ],
  },
];

export const CAPE_LETTERS = [
  { letter: 'C', word: 'Confident', detail: 'I own my choices and set my own pace.' },
  { letter: 'A', word: 'Aware', detail: 'I read the vibe check in my friendships.' },
  { letter: 'P', word: 'Protected', detail: 'I use my Graceful Pivot when I feel pressured.' },
  { letter: 'E', word: 'Empowered', detail: 'I build friendships on the "Heck yes!"' },
] as const;

/* ── Blue: the Green Light Pivot ──────────────────────────────── */

export const PIVOT_BINS = { a: 'Fire drill', b: 'Fireplace' } as const;

export const PIVOT_SORT: SortItem[] = [
  {
    id: 'p1',
    text: "Racing heart because someone is blocking the door and won't let you leave.",
    answer: 'a',
    why: 'That is danger. Hit the brakes and get out.',
  },
  {
    id: 'p2',
    text: 'Sweaty palms right before telling someone you like them.',
    answer: 'b',
    why: 'That is positive friction: the nerves of being honest about what you want.',
  },
  {
    id: 'p3',
    text: 'A tight stomach because they keep pushing after you said no.',
    answer: 'a',
    why: 'Pressure after a no is a red flag. Brakes.',
  },
  {
    id: 'p4',
    text: 'Nervous excitement while asking, "Do you want to keep going?"',
    answer: 'b',
    why: 'Checking in feels vulnerable. That is the fireplace, not a fire.',
  },
  {
    id: 'p5',
    text: "Racing heart because you've had a drink and things are moving fast.",
    answer: 'a',
    why: 'Drinking plus speed removes a clear yes. Slow it down or stop.',
  },
  {
    id: 'p6',
    text: 'Awkward pause before bringing up protection.',
    answer: 'b',
    why: 'Awkward is not danger. Clear communication is never a mood killer.',
  },
];

export const PIVOT_RULE =
  'Not all friction is danger. A racing heart can mean "slam the brakes" — or "navigate the heat."';

export const CONNECTION_SCRIPTS = [
  {
    id: 'pacing',
    title: 'Script 1 · The Pacing Boundary',
    line: '"I am having such an amazing time with you. I\'d love to keep going, but I want to keep my shirt on for now — is that cool with you?"',
    why: 'You stay enthusiastic about the person while choosing the pace of the activity.',
  },
  {
    id: 'protection',
    title: 'Script 2 · The Protection Boundary',
    line: '"Heck yes, I definitely want to do that. Let\'s grab a condom first so we\'re totally safe and can keep going."',
    why: 'Saying yes to one thing does not mean skipping the safety layer. You lean in and stay protected.',
  },
  {
    id: 'hard-limit',
    title: 'Script 3 · The Hard Limit',
    line: '"I really like where this is going… I\'m so excited about it, but I\'m not ready for that tonight."',
    why: 'The Sandwich Method: validate the connection, take one thing off the table, keep the person.',
  },
] as const;

export const GREEN_LIGHT_PIVOT: PivotSlot[] = [
  {
    id: 'validate',
    label: '1 · Validate the vibe',
    hint: 'Say what you DO want.',
    options: [
      'I really like where this is going.',
      "I'm having such a good time with you.",
      'Heck yes, I want to.',
    ],
  },
  {
    id: 'boundary',
    label: '2 · State the boundary',
    hint: 'One clear, specific line.',
    options: [
      "I'm not ready for that tonight.",
      "Let's grab a condom first.",
      'I want to keep things where they are for now.',
    ],
  },
  {
    id: 'align',
    label: '3 · Ask for alignment',
    hint: 'Hand them the next move.',
    options: ['Does that work for you?', 'Is that cool with you?', 'How do you feel about that?'],
  },
];

export const PIVOT_DRILL_STEPS = [
  { title: 'Set the scene', detail: 'Picture a moment that feels good and wanted.' },
  {
    title: 'Name the friction',
    detail: "Notice your racing heart. It is vulnerability, not danger. Don't freeze.",
  },
  { title: 'The pivot', detail: 'Say what you DO want, while naming one boundary.' },
] as const;

export const EVERYDAY_YES = [
  'In friendships: a pumped-up high-five after winning a game together.',
  'With yourself: a massive "yes" to time alone that protects your peace.',
  'In a relationship: "I\'ve been waiting for someone to ask me — YES!"',
] as const;

export const PILOT_CLOSE =
  'Clear communication is never a mood killer. When you stop bracing for the fire drill and start practising the enthusiastic yes, you go from passenger to pilot. Know your worth. Protect your peace. Hit the gas safely.';
