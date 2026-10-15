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
  /** Each track has its own scenarios; none are shared. */
  track: Track;
  sample?: boolean;
}

export const SCENARIOS: Scenario[] = [
  /* ── Green Track · grades 6–8 ─────────────────────────────── */
  {
    id: 'g-group-roast',
    track: 'green',
    time: '9:12 PM',
    title: 'The group chat roast',
    emoji: '😬',
    setup: 'Someone posts a photo of a classmate tripping in gym. Then they tag you:',
    message: 'lol add a caption 😂 you always have the best ones',
    bubbleTime: '9:12 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 30,
    sample: true,
    choices: [
      {
        id: 'caption',
        label: 'Add a caption — it is just a joke',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'The classmate never said yes to being posted. A caption from you makes the joke bigger and puts your name on it.',
      },
      {
        id: 'not-funny',
        label: 'Reply: "Not funny. Can we take it down?"',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'One short line, no lecture. It gives everyone else permission to stop too — that is leadership.',
      },
      {
        id: 'tell-adult',
        label: 'Screenshot it and show a trusted adult',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'Telling is not snitching when someone is being hurt. A teacher or parent can get it taken down.',
      },
      {
        id: 'mute',
        label: 'Mute the chat and say nothing',
        verdict: 'ok',
        matchTag: 'habits',
        feedback:
          'Protecting your peace is fine, but the photo is still up. Pair it with a private check-in with the classmate.',
      },
    ],
    debrief:
      'The F.R.I.E.S. check works on photos too: the person in it never gave a yes. Awareness spots it; Clear Communication ends it in one line.',
  },
  {
    id: 'g-gamer',
    track: 'green',
    time: '8:40 PM',
    title: 'The gamer who asks too much',
    emoji: '🎮',
    setup: 'A teammate you met in an online game messages you after a match:',
    message: 'ur cracked at this 🔥 what school u go to? add me on snap and ill send u free skins',
    bubbleTime: '8:40 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 30,
    choices: [
      {
        id: 'share',
        label: 'Tell them your school — free skins!',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'Your school tells a stranger where you are five days a week. "Free stuff" is a common hook to move you to a private app.',
      },
      {
        id: 'decline',
        label: 'Reply: "I don\'t share that. GG though."',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'Friendly and closed. You keep the game and keep your info. If they push again, that tells you everything.',
      },
      {
        id: 'report',
        label: 'Show a parent or trusted adult, then block and report',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'An adult can help you report it. Blocking and reporting protects the next kid they message too.',
      },
      {
        id: 'ignore',
        label: 'Just ignore the message',
        verdict: 'ok',
        matchTag: 'habits',
        feedback:
          'Not answering is okay. If they keep messaging or offer gifts again, tell an adult.',
      },
    ],
    debrief:
      'Awareness rule: people you only know online do not need your school, address, or other apps. Gifts plus "move to another app" is a red flag.',
  },
  {
    id: 'g-secret',
    track: 'green',
    time: '7:05 PM',
    title: 'The secret request',
    emoji: '🤫',
    setup: 'An older person you have been chatting with online sends:',
    message: "you're so mature for your age. don't tell your parents we talk, they wouldn't get it",
    bubbleTime: '7:05 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 40,
    choices: [
      {
        id: 'keep-secret',
        label: 'Keep it secret — they seem nice',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'Safe adults do not ask kids to keep secrets from their parents. Being asked to hide a chat is the warning sign.',
      },
      {
        id: 'tell-now',
        label: 'Tell a trusted adult today and show them the chat',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'This is exactly what trusted adults are for. You are not in trouble for telling.',
      },
      {
        id: 'reply-no',
        label: 'Reply: "I don\'t keep secrets from my family." Then stop replying',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'Clear and final. Still tell a trusted adult — they can help you block and report.',
      },
      {
        id: 'delete',
        label: 'Delete the chat and pretend it never happened',
        verdict: 'ok',
        matchTag: 'habits',
        feedback:
          'Stepping away is good. Deleting removes the proof an adult would need. Screenshot first, then tell someone.',
      },
    ],
    debrief:
      'The secrecy rule: if someone asks you to hide your friendship from your family, tell your family. Tools & Trusted Support exist for this moment.',
  },
  {
    id: 'g-dare',
    track: 'green',
    time: '3:30 PM',
    title: 'The dare',
    emoji: '🎥',
    setup: 'After school, your friend group is filming a viral challenge. One of them says:',
    message: 'ur turn. do it on camera or ur not really one of us',
    bubbleTime: '3:30 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 30,
    choices: [
      {
        id: 'do-it',
        label: 'Do it so you are not left out',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          '"Do it or you are out" is pressure, not friendship. Some challenges hurt people, and the video lasts.',
      },
      {
        id: 'pivot',
        label: 'Say: "Pass. I\'ll be camera person instead."',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'The Graceful Pivot: you stay in the group and stay out of the stunt. No speech needed.',
      },
      {
        id: 'leave',
        label: 'Head home and text a friend who is not there',
        verdict: 'ok',
        matchTag: 'tools',
        feedback:
          'Leaving is always allowed. Telling someone you trust keeps you from feeling alone about it.',
      },
      {
        id: 'fake',
        label: 'Pretend to do it so they stop asking',
        verdict: 'ok',
        matchTag: 'habits',
        feedback:
          'It gets you out today, but the pressure comes back. A clear "pass" works better next time.',
      },
    ],
    debrief:
      'Freely given applies to friendships: a yes squeezed out by "or you are out" is not a free choice. Real friends accept a pass.',
  },
  {
    id: 'g-friend-low',
    track: 'green',
    time: '10:30 PM',
    title: 'A friend sounds really down',
    emoji: '💬',
    setup: 'Your friend sends you a private message:',
    message: "everyone would be better off without me tbh. don't tell anyone",
    bubbleTime: '10:30 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 45,
    choices: [
      {
        id: 'joke',
        label: 'Send a funny meme to cheer them up',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback: 'A joke can feel like you did not hear them. Take the words seriously.',
      },
      {
        id: 'ask',
        label: 'Tell them you care and ask if they are safe right now',
        verdict: 'best',
        matchTag: 'comms',
        feedback: 'Asking directly is caring, not overreacting. It lets them be honest with you.',
      },
      {
        id: 'adult',
        label: 'Tell a trusted adult tonight, even though they said not to',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'Some secrets are too big to keep. Getting an adult involved is how you help. You can also call or text 988 together.',
      },
      {
        id: 'wait',
        label: 'Wait and talk to them at school tomorrow',
        verdict: 'risky',
        matchTag: 'habits',
        feedback: 'Tonight matters. Reach out to them and to an adult now.',
      },
    ],
    debrief:
      'When a friend talks about not being here, it is never a secret to keep. Tell a trusted adult. 988 answers calls and texts 24/7.',
  },
  {
    id: 'g-sleepover',
    track: 'green',
    time: '11:45 PM',
    title: 'The sleepover sneak-out',
    emoji: '🌙',
    setup: 'At a sleepover, your friend whispers:',
    message: "my cousin's friends are at the park rn. let's sneak out, nobody will know",
    bubbleTime: '11:45 PM',
    prompt: 'WHAT DO YOU DO?',
    xp: 30,
    choices: [
      {
        id: 'go',
        label: 'Go — it is only for a little while',
        verdict: 'risky',
        matchTag: 'awareness',
        feedback:
          'At night, with older kids nobody knows, and no adult aware of where you are — that is the risky part.',
      },
      {
        id: 'stay',
        label: 'Say: "Nah, I\'m staying. Let\'s do something here."',
        verdict: 'best',
        matchTag: 'comms',
        feedback:
          'You said no to the plan, not to your friend. Offering a new plan keeps the night fun.',
      },
      {
        id: 'tell-host',
        label: 'If they go anyway, wake the host parent',
        verdict: 'best',
        matchTag: 'tools',
        feedback:
          'You are looking out for your friend, not getting them in trouble. Adults can keep everyone safe.',
      },
      {
        id: 'share-location',
        label: 'Go, but keep your phone on',
        verdict: 'ok',
        matchTag: 'habits',
        feedback:
          'A charged phone helps, but no adult knows where you are. The safer move is staying in.',
      },
    ],
    debrief:
      'Choosing your pace means you can say no to a plan and still be a good friend. Trusted adults are part of the plan, not the enemy.',
  },

  /* ── Blue Track · grades 9–12 ─────────────────────────────── */
  {
    id: 'owe-me',
    track: 'blue',
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
      'Urgency plus guilt is the signature of coercion. The M.A.T.C.H. move is Awareness to name the tactic, then Clear Communication & Consent to answer in one line.',
  },
  {
    id: 'party-drink',
    track: 'blue',
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
    track: 'blue',
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
      'The "if you trusted me" line converts a boundary into a loyalty test. Clear Communication & Consent answers it without taking the test.',
  },
  {
    id: 'pep-window',
    track: 'blue',
    time: '6:30 AM',
    title: 'The morning after an exposure',
    emoji: '💊',
    setup: 'Something happened last night that you did not plan for. You wake up scared.',
    message: "i think i need to get checked but i don't even know where to start",
    bubbleTime: '6:30 AM',
    prompt: 'WHAT IS THE FIRST MOVE?',
    xp: 50,
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
        label: 'Go to an emergency department and ask for PEP evaluation',
        verdict: 'best',
        matchTag: 'medical',
        feedback:
          'Inside 72 hours, go to an emergency department with a trusted adult and ask to be evaluated for PEP. Do not wait for the app clock. This app does not provide medication.',
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
    track: 'blue',
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
    track: 'blue',
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
  return SCENARIOS.filter((scenario) => scenario.track === track);
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
  'g-group-roast':
    'CHAOS EVENT: Someone replies, "chill, it is just a joke," and the chat piles on.',
  'g-gamer': 'CHAOS EVENT: They send a link and say, "click to claim ur skins before it expires."',
  'g-secret': 'CHAOS EVENT: They say they will be upset with you if you tell anyone.',
  'g-dare': 'CHAOS EVENT: Someone starts filming you anyway.',
  'g-friend-low': 'CHAOS EVENT: Your friend stops replying.',
  'g-sleepover': 'CHAOS EVENT: Your friend climbs out the window and asks you to cover for them.',
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

export const SAMPLE_SCENARIO = SCENARIOS.find((s) => s.sample) ?? SCENARIOS[0];
