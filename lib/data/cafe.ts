import { C } from '@/lib/colors';

/**
 * The Consent Café — full interactive tool content.
 * Five stations: F.R.I.E.S. menu + detective quiz, personal menu,
 * customer guarantee + myth busters, practice drills, exit card.
 */

export type CafeStation = 'fries' | 'menu' | 'rights' | 'practice' | 'exit';

export const CAFE_STATIONS: { id: CafeStation; label: string; emoji: string; tint: string }[] = [
  { id: 'fries', label: 'F.R.I.E.S.', emoji: '🍟', tint: C.modC },
  { id: 'menu', label: 'MY MENU', emoji: '📋', tint: C.amber },
  { id: 'rights', label: 'YOUR RIGHTS', emoji: '⭐', tint: C.gold },
  { id: 'practice', label: 'PRACTICE', emoji: '🎭', tint: C.violet },
  { id: 'exit', label: 'EXIT CARD', emoji: '✍️', tint: C.teal },
];

/* ── Station 1: the F.R.I.E.S. menu ───────────────────────────── */

export interface FriesCard {
  letter: string;
  word: string;
  nickname: string;
  rule: string;
  cafeRule: string;
  tint: string;
}

export const FRIES_CARDS: FriesCard[] = [
  {
    letter: 'F',
    word: 'Freely given',
    nickname: 'The "no pressure" policy',
    rule: 'Consent comes from a genuine, unconstrained choice — not guilt-tripping, manipulation, threats, or begging. If someone feels forced or in debt, what they give is not consent.',
    cafeRule:
      'A customer who orders because the server is staring and sighing is not really choosing. A free order comes from a pressure-free moment.',
    tint: C.teal,
  },
  {
    letter: 'R',
    word: 'Reversible',
    nickname: 'The "send it back" rule',
    rule: 'Consent can be withdrawn at any moment — even after a yes, even mid-way. The other person stops immediately. No questions, no guilt trip.',
    cafeRule:
      'If a customer ordered pasta and changes their mind before it arrives, the kitchen stops. Past orders never lock in future ones.',
    tint: C.modT,
  },
  {
    letter: 'I',
    word: 'Informed',
    nickname: 'The ingredient list',
    rule: 'Consent requires full, honest information. No hidden ingredients, no misleading descriptions. A yes built on a lie or an omission is not a yes.',
    cafeRule:
      'A dish labelled vegetarian that secretly contains meat is a betrayal of trust. The choice only works with accurate information.',
    tint: C.modC,
  },
  {
    letter: 'E',
    word: 'Enthusiastic',
    nickname: 'The "I\'m starving" factor',
    rule: 'A real yes is active and willing — not a shrug, a "maybe", a silence, or a reluctant "fine". Absence of a no is not a yes.',
    cafeRule:
      'A customer staring blankly at the menu saying "whatever" is not ordering. Only a clear "yes, I\'ll have that" counts.',
    tint: C.modH,
  },
  {
    letter: 'S',
    word: 'Specific',
    nickname: 'The à la carte rule',
    rule: 'Yes to one thing is not yes to everything. Each act needs its own consent. Agreeing to one level of closeness does not unlock the rest.',
    cafeRule:
      'Ordering an appetizer is not agreeing to three courses and dessert. Each dish is its own decision.',
    tint: C.violet,
  },
];

/* ── Station 1b: F.R.I.E.S. Detective quiz ────────────────────── */

export interface CafeQuizQuestion {
  id: string;
  scenario: string;
  options: string[];
  answer: number;
  correct: string;
  wrong: string;
}

export const CAFE_QUIZ: CafeQuizQuestion[] = [
  {
    id: 'q-silence',
    scenario:
      '"I know you said you\'re tired but I really need your help right now. Please? You always help me." Morgan stays silent. Sam takes the silence as agreement and goes ahead.',
    options: ['Freely given', 'Enthusiastic', 'Reversible', 'Specific'],
    answer: 1,
    correct:
      'Correct. Silence is not a yes. A shrug, a freeze, or saying nothing is not agreement — Sam needed a clear, willing yes.',
    wrong:
      'Not quite. Look at what Morgan actually communicated: nothing. Absence of a no is never a yes.',
  },
  {
    id: 'q-party',
    scenario:
      "\"You said you'd come to my party — you can't back out now. Everyone is counting on you and I already told them you're coming.\" Riley agrees despite really not wanting to go.",
    options: ['Freely given', 'Reversible', 'Informed', 'Enthusiastic'],
    answer: 0,
    correct:
      'Correct. Guilt and social pressure break Freely given. Riley agreed out of obligation, not choice.',
    wrong:
      'Think about why Riley said yes. It was not a free choice — it was pressure and fear of letting people down.',
  },
  {
    id: 'q-story',
    scenario:
      'Jamie agreed to share one personal story with a friend for a school project. Without telling Jamie, the friend put the story in a public presentation the whole class watched.',
    options: ['Enthusiastic', 'Freely given', 'Reversible', 'Specific'],
    answer: 3,
    correct:
      'Exactly. Jamie said yes to one specific thing — a private project. That yes did not stretch to a public room.',
    wrong:
      'Close. Compare what Jamie agreed to with what happened. Which letter covers the scope of a yes?',
  },
  {
    id: 'q-surprise',
    scenario:
      'Taylor agreed to meet up, then found out on arrival that the "hangout" was a surprise gathering with ten near-strangers. Taylor felt uncomfortable the whole time.',
    options: ['Enthusiastic', 'Reversible', 'Informed', 'Specific'],
    answer: 2,
    correct:
      'Right. Taylor consented to a hangout, not a crowd. Hiding what a situation actually is removes the information consent depends on.',
    wrong:
      'Compare what Taylor knew with what happened. The decision was made on incomplete information.',
  },
  {
    id: 'q-lastweek',
    scenario:
      '"We agreed to this last week — you can\'t change your mind now." Devon said yes last week and is saying no today. The other person insists Devon has to follow through.',
    options: ['Freely given', 'Reversible', 'Informed', 'Specific'],
    answer: 1,
    correct:
      'Correct. Consent is always reversible. A past yes covers that moment only — even a late, inconvenient no still counts.',
    wrong: 'Devon said yes once and now wants to say no. Which letter guarantees that right?',
  },
  {
    id: 'q-hug',
    scenario:
      'A friend leans in for a hug and Jordan instinctively steps back. The friend says, "What, you\'re too cool for hugs now? You always hug me." Jordan gives in and hugs them.',
    options: ['Freely given', 'Enthusiastic', 'Specific', 'Informed'],
    answer: 0,
    correct:
      'Yes. Stepping back was a no. Shame plus past behaviour was used to override it — that is pressure, not a free choice.',
    wrong:
      'Jordan hugged them to escape an uncomfortable moment built out of guilt. Which letter covers pressure and coercion?',
  },
  {
    id: 'q-groupchat',
    scenario:
      'Two friends agreed to keep a group chat private. One screenshots a funny message and posts it to their story without asking: "I assumed everyone was fine with it."',
    options: ['Reversible', 'Informed', 'Freely given', 'Specific'],
    answer: 3,
    correct:
      'Spot on. The agreement covered a private space. A public story is a different action and needs its own green light.',
    wrong:
      'The group consented to privacy. Posting publicly is a whole different act. Which letter says yes to one thing is not yes to everything?',
  },
  {
    id: 'q-tickets',
    scenario:
      'Reese eagerly says yes to a concert, not knowing tickets cost $80. Told later, Reese feels trapped and pays anyway rather than seem difficult.',
    options: ['Freely given', 'Informed', 'Enthusiastic', 'Reversible'],
    answer: 1,
    correct:
      'Correct. The yes was enthusiastic but built on missing facts. Cost, logistics, and expectations are part of the information.',
    wrong:
      'Reese was happy to say yes, so enthusiasm is not the gap. Were all the facts on the table first?',
  },
];

/* ── Station 2: the personal menu ─────────────────────────────── */

export type CafeCourse = 'appetizers' | 'mains' | 'notserved';

export interface CafeMenuItem {
  id: string;
  text: string;
}

export interface CafeMenu {
  appetizers: CafeMenuItem[];
  mains: CafeMenuItem[];
  notserved: CafeMenuItem[];
}

export interface CourseDef {
  id: CafeCourse;
  emoji: string;
  title: string;
  desc: string;
  tint: string;
  placeholder: string;
  addLabel: string;
}

export const MENU_COURSES: CourseDef[] = [
  {
    id: 'appetizers',
    emoji: '🥗',
    title: 'Appetizers',
    desc: 'Things I am generally comfortable with — no big conversation needed.',
    tint: C.yes,
    placeholder: 'A comfort of yours…',
    addLabel: 'ADD APPETIZER',
  },
  {
    id: 'mains',
    emoji: '🍽️',
    title: 'Main Courses',
    desc: 'Things that need a clear, specific conversation first.',
    tint: C.amber,
    placeholder: 'Something that needs a talk first…',
    addLabel: 'ADD MAIN COURSE',
  },
  {
    id: 'notserved',
    emoji: '🚫',
    title: 'Not On The Menu',
    desc: 'Hard limits — firm, always off the table, no exceptions.',
    tint: C.no,
    placeholder: 'A hard limit…',
    addLabel: 'ADD HARD LIMIT',
  },
];

function seedItems(course: CafeCourse, texts: string[]): CafeMenuItem[] {
  return texts.map((text, i) => ({ id: `${course}-seed-${i}`, text }));
}

export const DEFAULT_CAFE_MENU: CafeMenu = {
  appetizers: seedItems('appetizers', [
    'Holding hands',
    'Text conversations',
    'Hanging out in groups',
  ]),
  mains: seedItems('mains', [
    'Meeting family or close friends',
    'Sharing personal photos',
    'Physical closeness',
  ]),
  notserved: seedItems('notserved', [
    'Sharing my location with someone I do not trust',
    'Being touched without asking',
  ]),
};

/* ── Station 3: the customer satisfaction guarantee ───────────── */

export const CAFE_RIGHTS: string[] = [
  'You can leave the restaurant at any time, for any reason.',
  'You can change your order — even after the food has been started.',
  'You can refuse a dish without explaining why.',
  'You can order something today and not want it tomorrow.',
  'You never owe anyone your business just because they cooked for you.',
  'A past visit to this restaurant does not commit you to another.',
];

export interface MythCard {
  id: string;
  myth: string;
  truth: string;
}

export const CAFE_MYTHS: MythCard[] = [
  {
    id: 'myth-before',
    myth: 'If you said yes before, you have to keep saying yes.',
    truth:
      'Consent is reversible — always. A previous yes applies to that moment only. Every new interaction needs its own fresh agreement.',
  },
  {
    id: 'myth-silence',
    myth: 'Silence, or not saying no, means yes.',
    truth:
      'Consent must be enthusiastic and active. Silence, freezing, looking away, or a vague "I guess" are not a yes. Only a clear, willing yes counts.',
  },
  {
    id: 'myth-cruel',
    myth: 'Changing your mind is cruel or unfair.',
    truth:
      'Changing your mind is your right at any moment. Nobody is owed your agreement. Honouring your own boundary mid-situation is healthy, not harmful.',
  },
  {
    id: 'myth-liked',
    myth: 'If they really liked you, they would say yes.',
    truth:
      'Consent has nothing to do with how much someone cares about you. Using affection as leverage is manipulation — the opposite of freely given.',
  },
  {
    id: 'myth-everything',
    myth: 'Agreeing to one thing means agreeing to everything.',
    truth:
      'Consent is specific and à la carte. Yes to holding hands is not yes to anything else. Each act, each moment, needs its own clear agreement.',
  },
];

/* ── Station 4a: F.R.I.E.S. Detective scenarios ───────────────── */

export interface DetectiveClue {
  letter: string;
  label: string;
  text: string;
}

export interface DetectiveScene {
  id: string;
  title: string;
  setup: string;
  prompt: string;
  clues: DetectiveClue[];
  verdict: string;
}

export const DETECTIVE_SCENES: DetectiveScene[] = [
  {
    id: 'scene-pressure-text',
    title: 'The Pressure Text',
    setup:
      'Jordan texted Alex to hang out. Alex replied, "I don\'t know… I\'m kind of tired." Jordan kept going: "Come on, you always do this," "You said you\'d come," and finally, "Fine, if you don\'t come I\'ll be really upset." Alex replied, "Okay fine, I\'ll come."',
    prompt: 'Which principles are violated? Tap every one you spot.',
    clues: [
      {
        letter: 'F',
        label: 'Freely given',
        text: 'Alex felt pressured and guilted into saying yes.',
      },
      { letter: 'E', label: 'Enthusiastic', text: '"Okay fine" is not an enthusiastic yes.' },
      { letter: 'R', label: 'Reversible', text: 'Alex tried to say no and was not allowed to.' },
      {
        letter: 'I',
        label: 'Informed',
        text: 'Alex was never told why it mattered so much to Jordan.',
      },
    ],
    verdict:
      'F, E, and R are all violated. "Okay fine" came from guilt and emotional pressure, not a free, enthusiastic choice. The R violation is subtle: Alex did decline ("I\'m tired") and Jordan refused to accept it. A good detective always listens for the first no that got overridden.',
  },
  {
    id: 'scene-group-photo',
    title: 'The Group Decision',
    setup:
      'The friend group decided to take a group photo and post it. Everyone seemed excited. Sam stayed quiet the whole conversation. After the post went up, Sam told a friend they were really uncomfortable being online but did not want to make it awkward.',
    prompt: 'Which principles are violated? Tap every one you spot.',
    clues: [
      { letter: 'E', label: 'Enthusiastic', text: "Sam's silence was never a yes." },
      { letter: 'F', label: 'Freely given', text: 'Group pressure made a no expensive.' },
      {
        letter: 'S',
        label: 'Specific',
        text: 'Agreeing to hang out is not agreeing to be posted.',
      },
      {
        letter: 'I',
        label: 'Informed',
        text: 'Sam may not have known it was going up publicly.',
      },
    ],
    verdict:
      'E, F, S, and possibly I are all in play. Silence is never consent. Group dynamics created invisible pressure. Hanging out does not equal consenting to a public post — and if Sam did not know it was going public, I applies too. This is how consent gets broken without anyone intending harm.',
  },
  {
    id: 'scene-changed-mind',
    title: 'The Changed Mind',
    setup:
      'Mia and Theo planned a road trip. Mia agreed two weeks ago. The day before, Mia texts that she is not up for it anymore. Theo says, "You can\'t just change your mind now — I already booked everything. You owe me this."',
    prompt: "Which principles does Theo's response violate?",
    clues: [
      {
        letter: 'R',
        label: 'Reversible',
        text: 'Theo refuses to accept that Mia changed her mind.',
      },
      {
        letter: 'F',
        label: 'Freely given',
        text: 'Guilt over bookings is used as leverage.',
      },
      {
        letter: 'E',
        label: 'Enthusiastic',
        text: 'A yes squeezed out by guilt is not enthusiastic.',
      },
    ],
    verdict:
      "R and F are the clear violations. Mia has every right to change her mind. Theo weaponises logistics to turn a past yes into a coerced one. Bookings and plans never override someone's say over their own participation.",
  },
];

/* ── Station 4b: role-play practice cards ─────────────────────── */

export interface ScriptLine {
  speaker: string;
  text: string;
  side: 'a' | 'b';
  flag?: boolean;
}

export interface PracticeCard {
  id: string;
  title: string;
  roleA: string;
  roleB: string;
  lines: ScriptLine[];
  reflection: string;
}

export const PRACTICE_CARDS: PracticeCard[] = [
  {
    id: 'practice-secret',
    title: 'The Secret Share',
    roleA: 'A — has a secret',
    roleB: 'B — wants to know',
    lines: [
      {
        speaker: 'Person B',
        side: 'b',
        text: '"Hey, I heard something happened with you last week. Can you tell me what\'s going on?"',
      },
      {
        speaker: 'Person A',
        side: 'a',
        text: "\"It's kind of personal — I'm not sure I'm ready to talk about it yet.\"",
      },
      {
        speaker: 'Person B — strong',
        side: 'b',
        text: '"Totally okay. Whenever you\'re ready — or never, if that\'s what you need."',
      },
      {
        speaker: 'Person B — problem',
        side: 'b',
        flag: true,
        text: '"Come on, we\'re best friends. You can tell me. I won\'t stop asking until you do."',
      },
    ],
    reflection:
      'Which response respects F.R.I.E.S.? Which letters does the problem line break? How would you feel as Person A hearing each one?',
  },
  {
    id: 'practice-photo',
    title: 'The Photo Request',
    roleA: 'A — took the photo',
    roleB: 'B — is in the photo',
    lines: [
      {
        speaker: 'Person A',
        side: 'a',
        text: '"I got a great photo of us earlier — can I post it on my story?"',
      },
      {
        speaker: 'Person B',
        side: 'b',
        text: '"Actually, can you not? I\'m not posting much online right now."',
      },
      {
        speaker: 'Person A — strong',
        side: 'a',
        text: '"Of course, no worries. I\'ll keep it just for me."',
      },
      {
        speaker: 'Person A — problem',
        side: 'a',
        flag: true,
        text: '"Ugh, it\'s such a good photo though. Can\'t I just crop you out? Or post it privately?"',
      },
    ],
    reflection:
      'Which letter does the problem line push against? Does cropping or "posting privately" change whether consent was given? How does Person A honour Specific here?',
  },
  {
    id: 'practice-cancel',
    title: 'Cancelling the Plans',
    roleA: 'A — cancels',
    roleB: 'B — made the plans',
    lines: [
      {
        speaker: 'Person A',
        side: 'a',
        text: '"I\'m really sorry — I need to cancel tonight. I\'m not feeling well."',
      },
      {
        speaker: 'Person B — strong',
        side: 'b',
        text: '"That\'s okay. Feel better. We can reschedule whenever you\'re up for it."',
      },
      {
        speaker: 'Person B — problem',
        side: 'b',
        flag: true,
        text: '"You always do this. I planned everything around tonight. You owe me an explanation."',
      },
    ],
    reflection:
      'Is cancelling plans a form of withdrawing consent? Does Person A owe an explanation? How does the problem line collide with your right to leave at any time?',
  },
];

/* ── Station 5: exit card ─────────────────────────────────────── */

export const EXIT_QUESTIONS: string[] = [
  'One thing I learned today that I did not know before:',
  'One F.R.I.E.S. principle I want to remember most — and why:',
  'A real situation in my life where I could use what I learned today:',
  'One question I still have, or something I want to learn more about:',
];

export const CONFIDENCE_LEVELS: { value: number; label: string }[] = [
  { value: 1, label: 'Not at all' },
  { value: 2, label: 'A little' },
  { value: 3, label: 'Somewhat' },
  { value: 4, label: 'Mostly' },
  { value: 5, label: 'Very' },
];

export const CAFE_TAGLINE = 'You set the menu. You change the order. You leave when you want.';

export const CAFE_SAFETY_NOTE =
  'Everything you type here stays on this device — no account, no upload. The one exception in a live session: if a facilitator hears that someone may be in danger, they have to get help.';

/** Facilitator discussion-timer presets, in minutes. */
export const TIMER_PRESETS = [2, 5, 10, 15];
