import { C } from '@/lib/colors';

export type ModuleId = 'medical' | 'awareness' | 'tools' | 'comms' | 'habits';

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  xp: number;
  intro: string;
  points: string[];
  tryIt: string;
}

export interface MatchModule {
  id: ModuleId;
  letter: string;
  name: string;
  emoji: string;
  color: string;
  tagline: string;
  lessons: Lesson[];
}

export const MATCH_MODULES: MatchModule[] = [
  {
    id: 'medical',
    letter: 'M',
    name: 'My Medical',
    emoji: '🛡️',
    color: C.modM,
    tagline:
      'Check-ups, vaccines, STI screening, PrEP/PEP, mental health — your body is your most important asset.',
    lessons: [
      {
        id: 'medical-baseline',
        title: 'Know your baseline',
        minutes: 4,
        xp: 25,
        intro:
          'A baseline is the short list of facts a clinician asks for before anything else. Having it ready removes most of the anxiety of walking into a clinic.',
        points: [
          'Keep your date of birth, allergies, and current medications somewhere you can read from your phone.',
          'Track the last time you had a physical, a dental visit, and a vision check.',
          'Write down family history you already know: heart, diabetes, cancer, mental health.',
          'Knowing your baseline means a stranger can help you faster in an emergency.',
        ],
        tryIt: 'Say your allergies and medications out loud in one sentence, without looking.',
      },
      {
        id: 'medical-vaccines',
        title: 'Vaccines and boosters',
        minutes: 3,
        xp: 20,
        intro:
          'Vaccines are the cheapest protection you will ever get. Most youth are missing at least one series.',
        points: [
          'HPV series protects against cancers caused by the virus — most effective before exposure.',
          'Tdap boosters are usually due every 10 years.',
          'Meningococcal vaccines are often required before dorm living.',
          'Ask a clinic for a printed immunization record and store a photo of it.',
        ],
        tryIt: 'Write one question you would ask a nurse about a vaccine you are unsure about.',
      },
      {
        id: 'medical-screening',
        title: 'Screening without shame',
        minutes: 5,
        xp: 30,
        intro:
          'Testing is maintenance, not punishment. Most STIs have no symptoms at all, which is exactly why screening exists.',
        points: [
          'Routine screening is recommended for anyone who is sexually active — annually at minimum.',
          'Many clinics offer confidential and low-cost or free testing for minors.',
          'A test result is data, not a verdict about who you are.',
          'Ask what you were tested for. "Full panel" means different things at different clinics.',
        ],
        tryIt: 'Look up one clinic near you that lists confidential testing and save the address.',
      },
      {
        id: 'medical-prep-pep',
        title: 'PrEP, PEP, and the 72-hour window',
        minutes: 5,
        xp: 35,
        intro:
          'PrEP is taken before a possible exposure. PEP is taken after one, and it is time-limited.',
        points: [
          'PEP must be started as soon as possible and within 72 hours of exposure.',
          'Emergency departments and urgent care can start PEP; you do not need a regular doctor.',
          'PrEP is a daily or scheduled medication that dramatically lowers HIV risk.',
          'Both are prescription medications — a clinician decides what fits your situation.',
        ],
        tryIt: 'Open the PEP Clock tool once so you know where it lives before you ever need it.',
      },
      {
        id: 'medical-mental',
        title: 'Mental health is medical',
        minutes: 4,
        xp: 25,
        intro:
          'Your brain is an organ. Sleep loss, panic, and low mood are symptoms worth reporting, not personality flaws.',
        points: [
          'Describe changes in sleep, appetite, focus, and interest — those are the words clinicians use.',
          'Panic feels like danger but is survivable; slow exhales are the fastest lever you have.',
          '988 connects you to trained crisis counselors by call or text, any hour.',
          'Asking for help early is cheaper than asking for help late.',
        ],
        tryIt: 'Rate your sleep, mood, and stress out of 10 right now and note what moved them.',
      },
    ],
  },
  {
    id: 'awareness',
    letter: 'A',
    name: 'Awareness',
    emoji: '📡',
    color: C.modA,
    tagline:
      'Built-in radar for red flags, coercion, digital footprints, and peer pressure before you need it.',
    lessons: [
      {
        id: 'awareness-redflags',
        title: 'Red flag radar',
        minutes: 4,
        xp: 25,
        intro:
          'Coercion rarely looks like a threat. It usually looks like urgency, flattery, or guilt.',
        points: [
          'Rushing you is a flag. Real care can wait until tomorrow.',
          '"You owe me" is a debt frame — relationships are not ledgers.',
          'Isolation is a flag: keeping you away from friends and family is a tactic.',
          'Testing your limits in small ways predicts bigger pushes later.',
        ],
        tryIt: 'Name one line someone has used on you that felt like urgency, not care.',
      },
      {
        id: 'awareness-pressure',
        title: 'Pressure math',
        minutes: 3,
        xp: 20,
        intro:
          'Most people overestimate what their peers are actually doing. That gap is where pressure lives.',
        points: [
          'Perceived norms are usually higher than real behavior.',
          'A crowd is not consent, and neither is a group chat.',
          'You are allowed to change your mind after you already said yes.',
          'The word "no" is a complete sentence and needs no evidence.',
        ],
        tryIt: 'Write a one-line exit you would actually say out loud at a party.',
      },
      {
        id: 'awareness-digital',
        title: 'Digital footprint',
        minutes: 5,
        xp: 30,
        intro: 'Anything sent can be screenshotted. Awareness here is about control, not shame.',
        points: [
          'Disappearing messages do not stop screen recording.',
          'Location sharing should be time-limited and reversible.',
          'Pressure to send images is coercion, even from a partner.',
          'If images are shared without consent, it is not your fault and there are takedown options.',
        ],
        tryIt: 'Audit who currently has access to your location and remove one entry.',
      },
      {
        id: 'awareness-gut',
        title: 'Reading your own signals',
        minutes: 3,
        xp: 20,
        intro: 'Your body reacts to risk before your words do. Learning your tells is a skill.',
        points: [
          'Tight chest, dry mouth, and a stalling stomach are data.',
          'Name the feeling in one word — naming shrinks it.',
          'A "maybe" that feels heavy is usually a no waiting for permission.',
          'You do not need a reason to leave a place that feels wrong.',
        ],
        tryIt: 'Recall a time your gut was right. Note the physical signal you felt first.',
      },
    ],
  },
  {
    id: 'tools',
    letter: 'T',
    name: 'Tools',
    emoji: '🧰',
    color: C.modT,
    tagline:
      'Your Safety Circle, exit strategies, resource mapping, and bystander power — build your team early.',
    lessons: [
      {
        id: 'tools-circle',
        title: 'Build your Safety Circle',
        minutes: 4,
        xp: 30,
        intro: 'A Safety Circle is three to five people who will answer at 2 AM without a lecture.',
        points: [
          'Pick a mix: one peer, one adult, one backup.',
          'Tell them in advance that they are on your list.',
          'Agree on a code word that means "call me and get me out".',
          'Store them in your phone so you never have to search under stress.',
        ],
        tryIt: 'Add two people to your Safety Circle in the Tools tab.',
      },
      {
        id: 'tools-exit',
        title: 'Exit strategies',
        minutes: 3,
        xp: 25,
        intro: 'An exit plan is boring on purpose. Boring plans work when adrenaline hits.',
        points: [
          'Know how you are getting home before you arrive.',
          'Keep enough charge or cash for one ride you did not plan for.',
          'Pre-write a text you can send with one tap.',
          'A fake excuse is allowed. Getting out beats being polite.',
        ],
        tryIt: 'Draft your one-tap text now and save it in your notes app.',
      },
      {
        id: 'tools-resources',
        title: 'Map your resources',
        minutes: 4,
        xp: 25,
        intro:
          'Resource mapping means knowing the nearest help before you need it, not googling in a panic.',
        points: [
          'Locate the closest emergency department and urgent care.',
          'Find one confidential clinic that serves youth.',
          'Save 988 and one text line to your favorites.',
          'Know which adult at school is required to help, and which conversations are confidential.',
        ],
        tryIt: 'Save one local clinic and one 24/7 line to your phone favorites.',
      },
      {
        id: 'tools-bystander',
        title: 'Bystander power',
        minutes: 4,
        xp: 25,
        intro: 'You do not have to be a hero. You have to interrupt the moment.',
        points: [
          'Distract: ask an unrelated question and break the flow.',
          'Delegate: get one more person involved instead of going alone.',
          'Direct: name what you see plainly, if it is safe to do so.',
          'Delay: check in afterwards. Later still counts.',
        ],
        tryIt: 'Pick your default move of the four and say why it fits you.',
      },
    ],
  },
  {
    id: 'comms',
    letter: 'C',
    name: 'Clear Comms',
    emoji: '📣',
    color: C.modC,
    tagline:
      'The Consent Café and F.R.I.E.S. framework — you are always the customer in charge of the order.',
    lessons: [
      {
        id: 'comms-fries',
        title: 'The F.R.I.E.S. check',
        minutes: 4,
        xp: 30,
        intro:
          'Consent is Freely given, Reversible, Informed, Enthusiastic, and Specific. Miss one and it is not consent.',
        points: [
          'Freely given: no pressure, no debt, no fear of the answer.',
          'Reversible: yes can become no at any point, including mid-way.',
          'Informed: nobody agreed to something they were misled about.',
          'Enthusiastic and Specific: agreeing to one thing is not agreeing to everything.',
        ],
        tryIt: 'Run one recent situation through all five letters.',
      },
      {
        id: 'comms-cafe',
        title: 'Order from the Consent Café',
        minutes: 4,
        xp: 25,
        intro:
          'The Café turns boundaries into a menu. You are the customer; the order is yours to change.',
        points: [
          'Every item gets a YES, MAYBE, or NO — including hugs and location sharing.',
          'A MAYBE is a real answer, not a soft yes.',
          "Menus change. Yesterday's order does not bind today.",
          'Saying your order out loud is practice for saying it under pressure.',
        ],
        tryIt: 'Set your own boundary menu in the Consent Café tool.',
      },
      {
        id: 'comms-scripts',
        title: 'Scripts that hold',
        minutes: 3,
        xp: 20,
        intro: 'Short, calm, repeatable. A script beats improvising when your heart is pounding.',
        points: [
          '"Not tonight. Talk tomorrow?" ends a push without a fight.',
          'Repeat the same sentence instead of adding new reasons.',
          'You do not owe an explanation, and explanations invite negotiation.',
          'Text is fine. Choosing the safer channel is a strategy, not weakness.',
        ],
        tryIt: 'Say one refusal script out loud three times until it feels flat and easy.',
      },
      {
        id: 'comms-clinic',
        title: 'Talking to clinicians',
        minutes: 4,
        xp: 25,
        intro: 'Clinicians work with plain descriptions. Precise beats polite.',
        points: [
          'Lead with what changed and when it started.',
          'Ask directly: "Is this confidential?" before you share.',
          'Ask what you are being tested for and when results arrive.',
          'It is fine to say "I do not understand — say that again simply".',
        ],
        tryIt: 'Write the first two sentences you would say at a front desk.',
      },
    ],
  },
  {
    id: 'habits',
    letter: 'H',
    name: 'Healthy Habits',
    emoji: '❤️‍🔥',
    color: C.modH,
    tagline:
      'Sleep, movement, screen balance, stress management, and boundary hygiene — small daily choices build power.',
    lessons: [
      {
        id: 'habits-sleep',
        title: 'Sleep is the base layer',
        minutes: 3,
        xp: 20,
        intro:
          'Decision quality drops fast without sleep. Most bad 1 AM choices are sleep problems first.',
        points: [
          'Teens generally need 8–10 hours; most run a chronic deficit.',
          'A consistent wake time stabilizes everything else.',
          'Screens in bed delay sleep onset more than people expect.',
          'Naps repay debt but do not replace a schedule.',
        ],
        tryIt: 'Set one alarm for going to bed, not just waking up.',
      },
      {
        id: 'habits-move',
        title: 'Movement as regulation',
        minutes: 3,
        xp: 20,
        intro: 'Movement is the fastest legal way to lower stress hormones.',
        points: [
          'Ten minutes counts. Perfection is not the requirement.',
          'Anything rhythmic — walking, cycling, dancing — calms the nervous system.',
          'Strength work supports mood as much as it does muscle.',
          'Pair movement with something you already do daily to make it stick.',
        ],
        tryIt: 'Take a ten-minute walk without your headphones.',
      },
      {
        id: 'habits-screens',
        title: 'Screen balance',
        minutes: 3,
        xp: 20,
        intro: 'The goal is not less phone. The goal is fewer moments the phone chooses for you.',
        points: [
          "Notifications are somebody else's priorities on your schedule.",
          'Do Not Disturb after a set hour is a boundary, not rudeness.',
          'Doomscroll loops raise baseline anxiety without new information.',
          'Keep one charger outside your bedroom.',
        ],
        tryIt: 'Turn off notifications for one app that regularly wrecks your mood.',
      },
      {
        id: 'habits-stress',
        title: 'Stress tools that work fast',
        minutes: 4,
        xp: 25,
        intro: 'Under stress you cannot think your way calm. You have to change your body first.',
        points: [
          'Long exhales beat deep inhales for calming down.',
          'Cold water on your face or wrists interrupts a spiral.',
          'Naming three things you can see pulls you out of a panic loop.',
          'Move, breathe, then decide — in that order.',
        ],
        tryIt: 'Do four slow exhales, twice as long as your inhale.',
      },
      {
        id: 'habits-boundary-hygiene',
        title: 'Boundary hygiene',
        minutes: 3,
        xp: 25,
        intro: 'Boundaries decay if you never revisit them. Hygiene means a quick, regular check.',
        points: [
          'Review your Consent Café menu monthly.',
          'Update your Safety Circle when friendships change.',
          'Notice which boundaries you keep apologizing for — those need reinforcing.',
          'One clear no protects a dozen future yeses.',
        ],
        tryIt: 'Change one item on your boundary menu to what is true today.',
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = MATCH_MODULES.flatMap((m) => m.lessons);

export function getModule(id: string): MatchModule | undefined {
  return MATCH_MODULES.find((m) => m.id === id);
}
