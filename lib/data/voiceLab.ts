import type { Track } from '@/lib/data/content';

/**
 * The Strongest Voice Script Lab, student version of the facilitator playbook.
 * Knowing the rules is not enough; the lab turns one clear line into muscle
 * memory: write it, say it, practise it under pushback, then commit to it.
 */

export const VOICE_STEPS = [
  'F.R.I.E.S.',
  'Name the ghost',
  'Script parts',
  'Build',
  'Mirror',
  'Role-play',
  'Commit',
] as const;

/** The three parts of a script. */
export const SCRIPT_PARTS = [
  {
    id: 'anchor',
    name: 'The Anchor',
    role: 'Your value statement',
    detail: 'Start with what you care about. It sets a calm, confident tone.',
  },
  {
    id: 'shield',
    name: 'The Shield',
    role: 'Your boundary',
    detail: 'Say exactly what you will or will not do. No apology needed.',
  },
  {
    id: 'volley',
    name: 'The Return Volley',
    role: 'Your question back',
    detail: 'End with a question or a new plan. It hands the next move to them.',
  },
] as const;

export type ScriptPartId = (typeof SCRIPT_PARTS)[number]['id'];

export const EXAMPLE_SCRIPT: Record<Track, Record<ScriptPartId, string>> = {
  green: {
    anchor: 'I like hanging out with you',
    shield: "and I'm not sharing that photo",
    volley: 'want to play something instead?',
  },
  blue: {
    anchor: 'I care about staying safe and respected',
    shield: "and I'm not doing that without protection",
    volley: 'how do you feel about that too?',
  },
};

export interface BoundaryTopic {
  id: string;
  label: string;
  starters: Record<ScriptPartId, string[]>;
}

const GREEN_TOPICS: BoundaryTopic[] = [
  {
    id: 'group-chat',
    label: 'Setting a limit in a group chat',
    starters: {
      anchor: ['I like being in this chat', 'You guys are my friends'],
      shield: [
        "but I'm not posting about other people",
        "and I'm stepping away from this for a bit",
      ],
      volley: ['can we talk about something else?', 'who wants to plan Saturday?'],
    },
  },
  {
    id: 'hug',
    label: 'Saying no to a hug or touch',
    starters: {
      anchor: ["I'm really glad to see you", "You're a good friend"],
      shield: ["and I'm not a hugger right now", "and I'd rather not be touched"],
      volley: ['high-five instead?', 'fist bump?'],
    },
  },
  {
    id: 'homework',
    label: 'Saying no to sharing my work',
    starters: {
      anchor: ['I want to help you', 'I care about us both doing well'],
      shield: ["but I'm not sending my answers", "and I can't share my login"],
      volley: ['want to study together at lunch?', 'should we ask the teacher together?'],
    },
  },
  {
    id: 'phone',
    label: 'Keeping my phone and passwords private',
    starters: {
      anchor: ['I trust you', 'Our friendship matters to me'],
      shield: ['and my password stays mine', "and I don't hand my phone over"],
      volley: ['what did you want to look up? I can show you', 'cool?'],
    },
  },
];

const BLUE_TOPICS: BoundaryTopic[] = [
  {
    id: 'protection',
    label: 'Talking about protection',
    starters: {
      anchor: ['I care about staying safe and respected', 'I really like you'],
      shield: [
        "and we're using a condom every time",
        "and I'm not doing anything without protection",
      ],
      volley: ['how do you feel about that too?', 'does that work for you?'],
    },
  },
  {
    id: 'pace',
    label: 'Setting my pace',
    starters: {
      anchor: ["I'm having a great time with you", 'I like where this is going'],
      shield: ["and I'm not ready for that tonight", 'and I want to keep things where they are'],
      volley: ['is that cool with you?', 'can we keep it to this?'],
    },
  },
  {
    id: 'drink',
    label: 'Saying no to drinking at a party',
    starters: {
      anchor: ["I'm glad I came", 'I want to have fun tonight'],
      shield: ["and I'm not drinking", "and I'm sticking with a sealed soda"],
      volley: ['want to grab food instead?', "who's down to dance?"],
    },
  },
  {
    id: 'trusted-adult',
    label: 'Telling a trusted adult something hard',
    starters: {
      anchor: ['I trust you', 'I need some help'],
      shield: [
        'and something happened I need to talk about',
        'and I need you to just listen first',
      ],
      volley: ['can we talk tonight?', 'can you help me figure out the next step?'],
    },
  },
  {
    id: 'phone-check',
    label: 'When a partner wants to check my phone',
    starters: {
      anchor: ['I care about you', 'I want us to trust each other'],
      shield: ['and my phone stays private', "and I'm not sharing my location all the time"],
      volley: ["what's making you worried?", 'can we talk about it?'],
    },
  },
];

export function voiceTopics(track: Track): BoundaryTopic[] {
  return track === 'blue' ? BLUE_TOPICS : GREEN_TOPICS;
}

export interface RolePlayCard {
  id: string;
  title: string;
  setup: string;
  pushback: string;
  strong: string;
  watchFor: string[];
}

const GREEN_ROLEPLAY: RolePlayCard[] = [
  {
    id: 'g-rp-chat',
    title: 'The group chat',
    setup: 'Your group chat is roasting a classmate. Someone says:',
    pushback: '"Come on, it\'s just a joke. Why are you being so serious?"',
    strong: '"I like you guys. I\'m just not into roasting people. Can we talk about Saturday?"',
    watchFor: ['Calm voice', 'Repeated the boundary, not a new excuse', 'Offered something else'],
  },
  {
    id: 'g-rp-hug',
    title: 'The hug',
    setup: 'A friend goes in for a hug and you step back. They say:',
    pushback: '"What, you\'re too cool for hugs now?"',
    strong: '"You\'re my friend. I\'m just not a hugger today. Fist bump?"',
    watchFor: ['Kept it friendly', 'No apology', 'Offered a different way to connect'],
  },
  {
    id: 'g-rp-answers',
    title: 'The homework',
    setup: 'A classmate texts the night before a test:',
    pushback: '"Just send me a picture of your answers. Nobody will know."',
    strong: '"I want you to do well. I\'m not sending answers. Want to study at lunch?"',
    watchFor: [
      'Said no once, clearly',
      'Did not argue about "nobody will know"',
      'Gave a better plan',
    ],
  },
  {
    id: 'g-rp-trusted-adult',
    title: 'Telling an adult',
    setup: 'You need to tell a parent or teacher something hard. They say:',
    pushback: '"I\'m busy right now. Can it wait?"',
    strong: '"I know you\'re busy. This is important to me. Can we talk for five minutes today?"',
    watchFor: ['Said it out loud once', 'Asked for a specific time', 'Did not give up'],
  },
];

const BLUE_ROLEPLAY: RolePlayCard[] = [
  {
    id: 'b-rp-protection',
    title: 'Barrier negotiation',
    setup: 'You bring up protection with a partner. They say:',
    pushback: '"It feels better without. Don\'t you trust me?"',
    strong:
      '"This isn\'t about trust. I care about us both. Protection every time — does that work for you?"',
    watchFor: ['Did not take the trust test', 'Repeated the boundary', 'Asked for alignment'],
  },
  {
    id: 'b-rp-prep',
    title: 'The PrEP conversation',
    setup: 'You ask a clinician about PrEP. The front desk says:',
    pushback: '"Are you sure you need that? You\'re pretty young."',
    strong: '"Yes. I\'d like to talk to a provider about PrEP today. Can you help me book that?"',
    watchFor: ['Named exactly what you need', 'Stayed polite and firm', 'Asked for the next step'],
  },
  {
    id: 'b-rp-party',
    title: 'The party drink',
    setup: 'At a party, a friend hands you a cup and says:',
    pushback: '"One drink won\'t kill you. Don\'t be lame."',
    strong: "\"I'm good, I'm having fun. I'm sticking with water — let's go dance.\"",
    watchFor: ['Stayed light', 'No long explanation', 'Moved the energy somewhere else'],
  },
  {
    id: 'b-rp-adult',
    title: 'Telling a trusted adult',
    setup: 'You start telling a trusted adult something that happened. They say:',
    pushback: '"Why didn\'t you tell me sooner?"',
    strong: '"I\'m telling you now because I trust you. I need help with what to do next."',
    watchFor: ['Did not apologise for telling', 'Asked for help directly', 'Kept going'],
  },
];

export function rolePlayCards(track: Track): RolePlayCard[] {
  return track === 'blue' ? BLUE_ROLEPLAY : GREEN_ROLEPLAY;
}

export const MIRROR_PROMPTS = [
  'Say it once, slowly. Notice your voice.',
  'Say it again. Stand or sit up tall. Notice your posture.',
  'Say it a third time, like you mean it. Notice your confidence.',
] as const;

export const GHOST_PROMPT = 'My biggest communication fear is…';

export const GHOST_EXAMPLES = [
  'forgetting what to say and looking foolish',
  'that they will be mad at me',
  'that I will lose a friend',
  'that nobody will take me seriously',
] as const;

export const COMMITMENT_PROMPT = 'One situation I will handle differently this week:';

export const LEGACY_PROMPT =
  'A letter to you, one year from now: what you are learning and the promises you are making.';

export const VOICE_TAKEAWAY =
  'Protecting your health is the most powerful thing you can do for yourself. When you combine your voice with self-respect, you become unstoppable.';
