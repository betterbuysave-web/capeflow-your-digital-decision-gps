import { C } from '@/lib/colors';
import type { Track } from '@/lib/data/content';

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
  /** Real-life example for each track. */
  example: Record<Track, string>;
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
    example: {
      green:
        'Your friend says, "If you were really my friend you\'d sit with us, not the new kid." Guilt is not a free choice.',
      blue: 'Your partner says, "After everything I did for you, you owe me." A yes paid as a debt is not freely given.',
    },
    tint: C.teal,
  },
  {
    letter: 'R',
    word: 'Reversible',
    nickname: 'The "send it back" rule',
    rule: 'Consent can be withdrawn at any moment — even after a yes, even mid-way. The other person stops immediately. No questions, no guilt trip.',
    cafeRule:
      'If a customer ordered pasta and changes their mind before it arrives, the kitchen stops. Past orders never lock in future ones.',
    example: {
      green: 'You agreed to play a two-hour game, and after 30 minutes you want to stop. You can.',
      blue: 'You said yes to making out, then want to slow down. Stopping is always allowed, even mid-way.',
    },
    tint: C.modT,
  },
  {
    letter: 'I',
    word: 'Informed',
    nickname: 'The ingredient list',
    rule: 'Consent requires full, honest information. No hidden ingredients, no misleading descriptions. A yes built on a lie or an omission is not a yes.',
    cafeRule:
      'A dish labeled vegetarian that secretly contains meat is a betrayal of trust. The choice only works with accurate information.',
    example: {
      green:
        "A friend says it's just you two at the movies, but it's really a big group you don't know.",
      blue: 'Someone agrees to be intimate only with protection, and their partner secretly skips it. That yes was never informed.',
    },
    tint: C.modC,
  },
  {
    letter: 'E',
    word: 'Enthusiastic',
    nickname: 'The "I\'m starving" factor',
    rule: 'A real yes is active and willing — not a shrug, a "maybe", a silence, or a reluctant "fine". Absence of a no is not a yes.',
    cafeRule:
      'A customer staring blankly at the menu saying "whatever" is not ordering. Only a clear "yes, I\'ll have that" counts.',
    example: {
      green:
        'Your friend shrugs and says "I guess" when you ask to borrow their phone. That\'s not a yes.',
      blue: '"Whatever you want" while looking away is not a yes. Look for a real "Heck yes."',
    },
    tint: C.modH,
  },
  {
    letter: 'S',
    word: 'Specific',
    nickname: 'The à la carte rule',
    rule: 'Yes to one thing is not yes to everything. Each act needs its own consent. Agreeing to one level of closeness does not unlock the rest.',
    cafeRule:
      'Ordering an appetizer is not agreeing to three courses and dessert. Each dish is its own decision.',
    example: {
      green: "Saying yes to one photo doesn't mean yes to posting it.",
      blue: 'Yes to kissing is not yes to anything else. Each step gets its own yes.',
    },
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

const GREEN_QUIZ: CafeQuizQuestion[] = [
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
      'Yes. Stepping back was a no. Shame plus past behavior was used to override it — that is pressure, not a free choice.',
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

const GREEN_MENU: CafeMenu = {
  appetizers: seedItems('appetizers', [
    'Sitting together at lunch',
    'Group hangouts',
    'High-fives and fist bumps',
  ]),
  mains: seedItems('mains', ['Hugs', 'Someone posting a photo of me', 'Borrowing my phone']),
  notserved: seedItems('notserved', [
    'Sharing my location with people I only know online',
    'Being touched without asking',
    'Keeping secrets from my family',
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

const BLUE_MYTHS: MythCard[] = [
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

const GREEN_DETECTIVE: DetectiveScene[] = [
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
      'Mia said yes to Theo\'s sleepover two weeks ago. The day before, Mia texts that she is not up for it anymore. Theo says, "You can\'t just change your mind now — my mom already bought pizza. You owe me this."',
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
        text: 'Guilt over the plans is used as leverage.',
      },
      {
        letter: 'E',
        label: 'Enthusiastic',
        text: 'A yes squeezed out by guilt is not enthusiastic.',
      },
    ],
    verdict:
      "R and F are the clear violations. Mia has every right to change her mind. Theo uses the plans to turn a past yes into a pressured one. Plans never override someone's say over their own participation.",
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

const GREEN_PRACTICE: PracticeCard[] = [
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
      'Which letter does the problem line push against? Does cropping or "posting privately" change whether consent was given? How does Person A honor Specific here?',
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

/* ── Blue Track · grades 9–12 ─────────────────────────────────── */

const BLUE_QUIZ: CafeQuizQuestion[] = [
  {
    id: 'b-party',
    scenario:
      'At a party, Alex has had a lot to drink and is slurring. Sam wants to go somewhere private with Alex and says, "They said yes earlier, before they were drinking."',
    options: ['Freely given', 'Informed', 'Reversible', 'Specific'],
    answer: 0,
    correct:
      'Right. Someone who is drunk or high cannot give a free, clear yes. An earlier yes does not carry over.',
    wrong:
      'Think about whether Alex is able to choose right now. Which letter needs a clear, unpressured choice?',
  },
  {
    id: 'b-kiss',
    scenario:
      'Jordan and Casey agree to kiss. A few minutes later Casey starts going further and says, "You said yes, so I figured you were into it."',
    options: ['Reversible', 'Specific', 'Informed', 'Enthusiastic'],
    answer: 1,
    correct: 'Exactly. Yes to kissing is yes to kissing. Each step needs its own yes.',
    wrong:
      'Jordan agreed to one thing. Which letter says yes to one thing is not yes to everything?',
  },
  {
    id: 'b-protection',
    scenario:
      'Riley agreed to be intimate only if they used a condom. Their partner took it off without saying anything.',
    options: ['Enthusiastic', 'Informed', 'Reversible', 'Freely given'],
    answer: 1,
    correct:
      "Correct. Riley's yes depended on protection. Hiding that it was skipped means Riley never had the facts — that yes was not informed.",
    wrong:
      'Riley agreed under one condition that was secretly broken. Which letter needs honest information?',
  },
  {
    id: 'b-anniversary',
    scenario:
      '"It\'s our six-month anniversary. You owe me this," Devon says. Morgan goes along with it so Devon will stop being upset.',
    options: ['Freely given', 'Specific', 'Informed', 'Reversible'],
    answer: 0,
    correct:
      'Yes. "You owe me" turns a choice into a debt. Going along to stop someone being upset is not free.',
    wrong: 'Why did Morgan agree? Which letter covers guilt and pressure?',
  },
  {
    id: 'b-stop',
    scenario:
      'Taylor says yes to making out, then says, "Actually, can we stop?" Their partner says, "We already started, it would be weird to stop now."',
    options: ['Enthusiastic', 'Informed', 'Reversible', 'Specific'],
    answer: 2,
    correct:
      'Correct. Consent can be taken back at any moment, even mid-way. "Can we stop" means stop.',
    wrong: 'Taylor changed their mind partway through. Which letter guarantees that right?',
  },
  {
    id: 'b-whatever',
    scenario:
      'Sam asks, "Do you want to come over tonight?" Jamie looks at their phone and says, "I guess… whatever you want." Sam takes it as a yes.',
    options: ['Freely given', 'Enthusiastic', 'Specific', 'Reversible'],
    answer: 1,
    correct: 'Right. "I guess" and "whatever" are not a yes. Look for a real "Heck yes."',
    wrong: 'Listen to how Jamie answered. Which letter asks for a clear, willing yes?',
  },
  {
    id: 'b-screenshots',
    scenario:
      'Reese sends their partner a private, personal message meant only for them. After a fight, the partner screenshots it and shows friends.',
    options: ['Reversible', 'Specific', 'Enthusiastic', 'Informed'],
    answer: 1,
    correct:
      'Spot on. Reese shared it with one person. Showing it to others is a different act that needed its own yes.',
    wrong:
      'Compare who Reese shared it with and who saw it. Which letter covers the scope of a yes?',
  },
  {
    id: 'b-ride',
    scenario:
      'After a game, a friend of a friend offers Morgan a ride home. On the way they say, "Quick stop at my place first," and drive somewhere Morgan did not agree to.',
    options: ['Informed', 'Enthusiastic', 'Freely given', 'Reversible'],
    answer: 0,
    correct:
      "Correct. Morgan agreed to a ride home, not a stop at someone's place. Changing the plan without asking removes the information.",
    wrong: 'What did Morgan actually agree to? Which letter needs the real plan up front?',
  },
];

const BLUE_MENU: CafeMenu = {
  appetizers: seedItems('appetizers', [
    'Holding hands',
    'Hanging out in public',
    'Texting during the day',
  ]),
  mains: seedItems('mains', ['Kissing', 'Meeting their friends or family', 'Being alone together']),
  notserved: seedItems('notserved', [
    'Anything without protection',
    'Sharing private photos',
    'Anything after I have been drinking',
  ]),
};

const GREEN_MYTHS: MythCard[] = [
  {
    id: 'g-myth-friend',
    myth: 'A real friend always says yes.',
    truth:
      'Real friends accept your no. If someone only stays friends when you do what they want, that is pressure, not friendship.',
  },
  {
    id: 'g-myth-before',
    myth: 'If you did it before, you have to do it again.',
    truth:
      'A past yes is for that moment only. You can say no today even if you said yes last week.',
  },
  {
    id: 'g-myth-hug',
    myth: 'Saying no to a hug is rude.',
    truth:
      'Your body, your call. A high-five or a wave is a fine choice, and nobody is owed a hug.',
  },
  {
    id: 'g-myth-joke',
    myth: 'It is just a joke, so the person in the photo does not get a say.',
    truth: 'Posting someone needs their yes. If they would not laugh, it is not a joke.',
  },
  {
    id: 'g-myth-secret',
    myth: 'Keeping a secret for a friend is always loyal.',
    truth:
      'Some secrets are too big to keep — like someone getting hurt or an adult asking you to hide things. Telling a trusted adult is the loyal move.',
  },
];

const BLUE_DETECTIVE: DetectiveScene[] = [
  {
    id: 'b-scene-upstairs',
    title: 'The Party Upstairs',
    setup:
      "At a party, Jordan has had several drinks and keeps saying \"I'm fine, I'm fine.\" Alex keeps refilling Jordan's cup, then says, \"Let's go upstairs, it's quieter.\" Jordan laughs and follows.",
    prompt: 'Which principles are in trouble? Tap every one you spot.',
    clues: [
      { letter: 'F', label: 'Freely given', text: 'Jordan is too drunk to make a free choice.' },
      { letter: 'E', label: 'Enthusiastic', text: 'Laughing and following is not a clear yes.' },
      { letter: 'I', label: 'Informed', text: 'Jordan was never told what "upstairs" meant.' },
      { letter: 'R', label: 'Reversible', text: 'Jordan tried to leave and was stopped.' },
    ],
    verdict:
      'F, E, and I. Someone this drunk cannot give a free, clear yes, laughing along is not enthusiasm, and "it\'s quieter" hid the real plan. R is not shown yet — but the right move is a friend stepping in now.',
  },
  {
    id: 'b-scene-protection',
    title: 'The Protection Promise',
    setup:
      "Sam and Riley agreed together: only with a condom. In the moment, Sam says, \"We don't have one. It's fine, I'm clean.\" Riley goes quiet and does not answer.",
    prompt: "Which principles does Sam's move break?",
    clues: [
      { letter: 'S', label: 'Specific', text: 'The yes was only for protected sex.' },
      { letter: 'E', label: 'Enthusiastic', text: "Riley's silence is not a yes." },
      {
        letter: 'F',
        label: 'Freely given',
        text: 'Pressure in the moment replaced a free choice.',
      },
      { letter: 'R', label: 'Reversible', text: 'Riley asked to stop and was ignored.' },
    ],
    verdict:
      'S, E, and F. Riley\'s yes had a condition, silence is not agreement, and pushing in the moment is pressure. The pivot: "Let\'s wait until we have one."',
  },
  {
    id: 'b-scene-anniversary',
    title: 'The Anniversary Ask',
    setup:
      'Devon planned a big six-month anniversary night. When Morgan says they are not ready to go further, Devon says, "I spent all this money. Everyone else\'s partner would." Morgan says, "Fine."',
    prompt: 'Which principles are violated? Tap every one you spot.',
    clues: [
      { letter: 'F', label: 'Freely given', text: 'Money and comparison are used as pressure.' },
      { letter: 'E', label: 'Enthusiastic', text: '"Fine" is not an enthusiastic yes.' },
      { letter: 'R', label: 'Reversible', text: "Morgan's no was overridden." },
      { letter: 'I', label: 'Informed', text: 'Morgan did not know the plans in advance.' },
    ],
    verdict:
      'F, E, and R. Spending money never buys a yes. Morgan said no first, and "fine" came from pressure. A partner who cares hears the first no.',
  },
];

const BLUE_PRACTICE: PracticeCard[] = [
  {
    id: 'b-practice-pace',
    title: 'The Pacing Boundary',
    roleA: 'A — wants to slow down',
    roleB: 'B — is having a great time',
    lines: [
      {
        speaker: 'Person A',
        side: 'a',
        text: '"I\'m having such a good time with you. I\'d love to keep hanging out, but I want to keep things where they are for now. Is that cool?"',
      },
      {
        speaker: 'Person B — strong',
        side: 'b',
        text: '"Totally cool. I\'m just happy to be here with you."',
      },
      {
        speaker: 'Person B — problem',
        side: 'b',
        flag: true,
        text: '"Seriously? You\'re killing the mood. Just relax."',
      },
    ],
    reflection:
      'How does Person A keep the vibe and still set a clear limit? Which F.R.I.E.S. letters does the problem line ignore?',
  },
  {
    id: 'b-practice-protection',
    title: 'The Protection Conversation',
    roleA: 'A — brings up protection',
    roleB: 'B — the partner',
    lines: [
      {
        speaker: 'Person A',
        side: 'a',
        text: '"Heck yes, I want to — let\'s grab a condom first so we\'re both safe. Does that work for you?"',
      },
      {
        speaker: 'Person B — strong',
        side: 'b',
        text: '"Yes, definitely. Thanks for saying it."',
      },
      {
        speaker: 'Person B — problem',
        side: 'b',
        flag: true,
        text: '"Ugh, it feels better without. Don\'t you trust me?"',
      },
    ],
    reflection:
      'How does Person A stay excited and still set a safety limit? What does "don\'t you trust me" try to do?',
  },
  {
    id: 'b-practice-hardlimit',
    title: 'The Hard Limit',
    roleA: 'A — not ready',
    roleB: 'B — wants more',
    lines: [
      {
        speaker: 'Person A',
        side: 'a',
        text: '"I really like where this is going. I\'m not ready for that tonight. Can we keep it to this?"',
      },
      {
        speaker: 'Person B — strong',
        side: 'b',
        text: '"Of course. No rush at all."',
      },
      {
        speaker: 'Person B — problem',
        side: 'b',
        flag: true,
        text: '"You said that last time. When will you be ready?"',
      },
    ],
    reflection:
      'The Sandwich Method: validate, state the limit, ask for alignment. Why does the problem line turn a no into a negotiation?',
  },
];

/* ── Track pickers ─────────────────────────────────────────────── */

export function cafeQuiz(track: Track): CafeQuizQuestion[] {
  return track === 'blue' ? BLUE_QUIZ : GREEN_QUIZ;
}

export function cafeMyths(track: Track): MythCard[] {
  return track === 'blue' ? BLUE_MYTHS : GREEN_MYTHS;
}

export function detectiveScenes(track: Track): DetectiveScene[] {
  return track === 'blue' ? BLUE_DETECTIVE : GREEN_DETECTIVE;
}

export function practiceCards(track: Track): PracticeCard[] {
  return track === 'blue' ? BLUE_PRACTICE : GREEN_PRACTICE;
}

export function defaultCafeMenu(track: Track): CafeMenu {
  return track === 'blue' ? BLUE_MENU : GREEN_MENU;
}

/** Both tracks have the same number of quiz questions (for the badge). */
export const CAFE_QUIZ_LENGTH = GREEN_QUIZ.length;

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
