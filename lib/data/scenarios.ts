import type { Track } from '@/lib/data/content';
import type { ModuleId } from '@/lib/data/match';

export type Verdict = 'best' | 'ok' | 'risky';

export interface Choice {
  id: string;
  label: string;
  verdict: Verdict;
  matchTag: ModuleId;
  feedback: string;
}

export interface Scenario {
  id: string;
  time: string;
  title: string;
  emoji: string;
  setup: string;
  message: string;
  bubbleTime: string;
  prompt: string;
  choices: Choice[];
  debrief: string;
  xp: number;
  track?: 'blue';
  sample?: boolean;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'owe-me',
    time: '1:47 AM',
    title: 'The debt frame',
    emoji: '🌙',
    setup: "It's 1:47 AM. Your phone buzzes. A person you've been talking to sends:",
    message: "come over rn. everyone's asleep. you owe me after last time 🙄",
    bubbleTime: '1:47 AM',
    prompt: 'WHAT DO YOU DO?',
    xp: 40,
    choices: [
      {
        id: 'sneak',
        label: 'Sneak out — they said you owe them',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          '"You owe me" is a debt frame. Nothing you did before creates an obligation now, and moving at 1:47 AM with nobody knowing where you are removes every safety net you have.',
      },
      {
        id: 'reply',
        label: 'Reply: "Not tonight. Talk tomorrow?"',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'Short, calm, no new reasons to argue with. You keep the door open for a daylight conversation and you keep the decision yours.',
      },
      {
        id: 'dnd',
        label: 'Ignore it and put your phone on Do Not Disturb',
        verdict: 'ok',
        matchTag: 'habits',
        feedback:
          'Protecting your sleep is real. Silence can read as an invitation to escalate, so pair it with a clear line in the morning.',
      },
      {
        id: 'screenshot',
        label: 'Send a screenshot to your Safety Circle contact',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'One more person now knows what was said. That is documentation plus backup, and it costs you nothing.',
      },
    ],
    debrief:
      'Urgency plus guilt is the signature of coercion. The M.A.T.C.H. move is Awareness to name the tactic, then Clear Comms to answer in one line.',
    sample: true,
  },
  {
    id: 'party-drink',
    time: '11:20 PM',
    title: 'The unattended cup',
    emoji: '🥤',
    setup: 'You put your drink down to dance. Someone hands it back and says:',
    message: 'here, i grabbed yours. topped it off for you 😉',
    bubbleTime: '11:20 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 35,
    choices: [
      {
        id: 'drink',
        label: 'Drink it — they were being nice',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'A drink that left your hand is an unknown drink. Refusing it costs you one awkward second.',
      },
      {
        id: 'new',
        label: 'Set it down and get a sealed drink yourself',
        verdict: 'best',
        matchTag: 'awareness',
        feedback:
          'Clean reset, no accusation, no argument. This is the lowest-drama version of a hard boundary.',
      },
      {
        id: 'buddy',
        label: 'Tell a friend and stay near them for the night',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'Buddy systems work because they remove isolation, which is what most bad nights depend on.',
      },
      {
        id: 'leave-quiet',
        label: 'Say nothing and leave alone right now',
        verdict: 'ok',
        matchTag: 'tools',
        feedback:
          'Leaving is valid. Leaving alone and unannounced is the risky part — tell one person where you are going.',
      },
    ],
    debrief:
      'Awareness sees the setup. Tools give you a partner and a ride. Neither requires accusing anybody of anything.',
  },
  {
    id: 'photo-push',
    time: '10:05 PM',
    title: 'The photo push',
    emoji: '📸',
    setup: 'Third time this week, same ask:',
    message: "everyone does it. if you trusted me you'd send one",
    bubbleTime: '10:05 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 35,
    choices: [
      {
        id: 'send',
        label: 'Send one so they stop asking',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'Compliance rarely ends the asking — it usually resets it. Trust is not proven by handing over leverage.',
      },
      {
        id: 'refuse',
        label: 'Repeat: "No. Asking again does not change it."',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'Same sentence, no new reasons. Repetition signals that the answer is not a negotiation.',
      },
      {
        id: 'tell-adult',
        label: 'Show the thread to an adult you trust',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'Repeated pressure is a pattern worth witnessing. An adult in your circle turns your word into a record.',
      },
      {
        id: 'block',
        label: 'Block and move on',
        verdict: 'ok',
        matchTag: 'tools',
        feedback:
          'Blocking is a legitimate tool. Screenshot the thread before you do, in case it matters later.',
      },
    ],
    debrief:
      'The "if you trusted me" line converts a boundary into a loyalty test. Clear Comms answers it without taking the test.',
  },
  {
    id: 'pep-window',
    time: '6:30 AM',
    title: 'The morning after an exposure',
    emoji: '💊',
    setup: 'Something happened last night that you did not plan for. You wake up scared.',
    message: "i think i need to get checked but i don't even know where to start",
    bubbleTime: '6:30 AM',
    prompt: 'WHAT IS THE FIRST MOVE?',
    xp: 50,
    track: 'blue',
    choices: [
      {
        id: 'wait',
        label: 'Wait a week and see if symptoms show up',
        verdict: 'risky',
        matchTag: 'medical',
        feedback:
          'Waiting closes doors. PEP has to be started within 72 hours of exposure, and most STIs never produce symptoms at all.',
      },
      {
        id: 'clock',
        label: 'Start the PEP clock and go to urgent care or an ED today',
        verdict: 'best',
        matchTag: 'medical',
        feedback:
          'This is the time-critical path. Emergency departments and urgent care can start PEP — you do not need an existing doctor.',
      },
      {
        id: 'call-circle',
        label: 'Call one Safety Circle person to go with you',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'Bringing someone raises the odds you actually walk in the door and remember what you were told.',
      },
      {
        id: 'search',
        label: 'Search symptoms online for an hour first',
        verdict: 'ok',
        matchTag: 'awareness',
        feedback:
          'Information helps, but not at the cost of the clock. Look up the nearest clinic instead of a symptom list.',
      },
    ],
    debrief:
      'My Medical owns the clock: within 72 hours, in person, today. Tools bring a human with you.',
  },
  {
    id: 'friend-crisis',
    time: '2:12 AM',
    title: 'A friend says something scary',
    emoji: '🆘',
    setup: 'A group chat goes quiet after one message from your friend:',
    message: "honestly i don't think anyone would notice if i wasn't here",
    bubbleTime: '2:12 AM',
    prompt: 'WHAT DO YOU DO?',
    xp: 45,
    choices: [
      {
        id: 'joke',
        label: 'Send a joke to lighten the mood',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'Deflection tells them the topic is unwelcome. You can be gentle and still be direct.',
      },
      {
        id: 'ask',
        label: 'Message them privately and ask directly if they are safe',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'Asking directly does not plant the idea. It gives them permission to be honest with someone.',
      },
      {
        id: '988',
        label: 'Share 988 and offer to stay on the line with them',
        verdict: 'best',
        matchTag: 'medical',
        feedback:
          '988 is staffed 24/7 by trained counselors, by call or text. Staying present while they reach out matters.',
      },
      {
        id: 'wait-morning',
        label: 'Wait until morning so you do not overreact',
        verdict: 'risky',
        matchTag: 'tools',
        feedback:
          'Overreacting to this costs you an awkward conversation. Underreacting costs much more.',
      },
    ],
    debrief:
      'Bystander power is Distract, Delegate, Direct, Delay. At 2 AM, Direct plus Delegate is the pairing that works.',
  },
  {
    id: 'location-share',
    time: '4:45 PM',
    title: 'Permanent location sharing',
    emoji: '📍',
    setup: 'A new partner sends a request and adds:',
    message: 'just leave it on always. i like knowing where you are',
    bubbleTime: '4:45 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 30,
    choices: [
      {
        id: 'always',
        label: 'Turn it on permanently to avoid a fight',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'Monitoring dressed as affection is still monitoring. Avoiding a fight now usually means a bigger one later.',
      },
      {
        id: 'timed',
        label: 'Offer time-limited sharing for specific plans',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'Specific and reversible — two of the five letters in F.R.I.E.S. This is a real yes with real edges.',
      },
      {
        id: 'no',
        label: 'Say no and keep sharing with your Safety Circle only',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'Your circle exists for exactly this. Location is a safety tool, not a loyalty payment.',
      },
      {
        id: 'lie',
        label: 'Say yes and secretly turn it off',
        verdict: 'ok',
        matchTag: 'awareness',
        feedback:
          'Sometimes concealment is the safe option. If you cannot be honest about a boundary, that is information about the relationship.',
      },
    ],
    debrief:
      'Consent is reversible and specific. "Always on" fails both tests, even when it is framed as caring.',
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function scenariosForTrack(track: Track): Scenario[] {
  return SCENARIOS.filter((scenario) => scenario.track !== 'blue' || track === 'blue');
}

export interface PivotChallenge {
  trigger: string;
  choices: readonly [
    { id: string; label: string; verdict: Verdict },
    { id: string; label: string; verdict: Verdict },
    { id: string; label: string; verdict: Verdict },
  ];
}

const PIVOT_CHOICES: PivotChallenge['choices'] = [
  {
    id: 'backup-person',
    label: 'Contact a backup person and share the changed plan',
    verdict: 'best',
  },
  {
    id: 'safer-place',
    label: 'Move to a staffed or public place while you reset',
    verdict: 'best',
  },
  {
    id: 'push-through',
    label: 'Keep the original plan and hope the problem clears',
    verdict: 'risky',
  },
];

const PIVOT_TRIGGERS: Record<string, string> = {
  'owe-me': 'CHAOS EVENT: They call twice and say they are already outside.',
  'party-drink': 'CHAOS EVENT: Your ride cancels and your phone battery drops to 2%.',
  'photo-push': 'CHAOS EVENT: They threaten to post the conversation in a group chat.',
  'pep-window': 'CHAOS EVENT: The first clinic says it cannot see you today.',
  'friend-crisis': 'CHAOS EVENT: Your friend stops replying after the last message.',
  'location-share': 'CHAOS EVENT: They get angry when you choose time-limited sharing.',
};

export function getPivotChallenge(scenarioId: string): PivotChallenge {
  return {
    trigger: PIVOT_TRIGGERS[scenarioId] ?? 'CHAOS EVENT: The first plan is no longer available.',
    choices: PIVOT_CHOICES,
  };
}

export const SAMPLE_SCENARIO = SCENARIOS[0];
