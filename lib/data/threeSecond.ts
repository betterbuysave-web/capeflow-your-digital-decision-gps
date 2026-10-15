import type { Track } from '@/lib/data/content';

/**
 * The 3-Second Rule Challenge: the Digital Shield. Before you post, send, or
 * share anything, pause for three seconds and run one check.
 */

export const SHIELD_CHECKS = [
  'Do I trust this person with my safety?',
  'Would I be okay if a teacher, parent, or future boss saw this?',
  'Could this be taken out of context or shared without my permission?',
  'Am I doing this for me, or for someone else’s approval?',
  'Would I want this to still exist in 5 years?',
] as const;

export type ShieldMove = 'send' | 'pause' | 'dont';

export interface ShieldScenario {
  id: string;
  title: string;
  emoji: string;
  setup: string;
  /** Why it is hard. */
  friction: string;
  /** The one check that matters most here. */
  check: string;
  moves: { id: ShieldMove; label: string }[];
  best: ShieldMove;
  feedback: Record<ShieldMove, string>;
  powerMove: string;
}

const MOVES = (send = 'Send / Post', pause = 'Pause', dont = 'Don’t send') => [
  { id: 'send' as const, label: send },
  { id: 'pause' as const, label: pause },
  { id: 'dont' as const, label: dont },
];

const GREEN: ShieldScenario[] = [
  {
    id: 'g-screenshot',
    title: 'The screenshot request',
    emoji: '📸',
    setup:
      'A classmate sends you a funny photo of a mutual friend acting silly at a birthday party and asks you to share it in the group chat.',
    friction:
      'It seems harmless and everyone loves a laugh. But did your friend say yes to being shared?',
    check: 'Could this be taken out of context or shared without permission?',
    moves: MOVES(),
    best: 'pause',
    feedback: {
      send: 'Once you send it, you lose control of it forever. Your friend never said yes.',
      pause:
        'Pausing is the power move. Ask your friend first: "Cool if I share this?" Their yes, their photo.',
      dont: 'Not sending is safe. Even better, tell the classmate, "Let\'s ask them first."',
    },
    powerMove: 'Ask the person in the photo before it goes anywhere.',
  },
  {
    id: 'g-location',
    title: 'The location share',
    emoji: '📍',
    setup:
      'Someone you only know from a game asks you to share your location "so we can meet up sometime."',
    friction:
      'You want to seem chill, but you barely know them. Sharing a live location shows exactly where you are.',
    check: 'Do I trust this person with my safety?',
    moves: MOVES('Share it', 'Pause', 'Don’t share'),
    best: 'dont',
    feedback: {
      send: 'A stranger would know where you are. That is never worth seeming chill.',
      pause: 'Good instinct to stop. Now make it a no, and tell a trusted adult they asked.',
      dont: 'Right call. People you only know online do not get your location. Tell a trusted adult.',
    },
    powerMove: 'Keep location sharing to family and your Safety Circle only.',
  },
  {
    id: 'g-chain',
    title: 'The chain message',
    emoji: '⛓️',
    setup:
      'You get a message: "Forward this to 10 people or something bad will happen to you." It includes personal info about a kid at your school.',
    friction: 'It feels scary, and forwarding it "just in case" seems easier.',
    check: 'Is this mine to share?',
    moves: MOVES('Forward', 'Pause', 'Don’t forward'),
    best: 'dont',
    feedback: {
      send: "Forwarding spreads someone else's private info. Chain threats are not real.",
      pause:
        'Pausing breaks the panic. Now stop the chain and tell an adult about the personal info.',
      dont: 'Exactly. Nothing bad happens when you stop a chain. Show a trusted adult so the info gets taken down.',
    },
    powerMove: 'Break the chain and report it.',
  },
  {
    id: 'g-group-secret',
    title: 'The group secret',
    emoji: '🤐',
    setup:
      'You get added to a private group chat where people are talking about a classmate behind their back. Someone tags you: "your turn 😂".',
    friction:
      "You don't want to join in, but you don't want to be the next target. Silence feels like agreeing.",
    check: 'Does this match who I want to be — kind, a leader, respectful?',
    moves: [
      { id: 'send', label: 'Reply with something' },
      { id: 'pause', label: 'Pause' },
      { id: 'dont', label: 'Mute / leave' },
    ],
    best: 'dont',
    feedback: {
      send: 'Adding to it puts your name on it, and the screenshots last.',
      pause: 'Pausing kept you out of it. Next: leave the chat and check on the classmate.',
      dont: 'Mute, unfollow, block, leave — all valid superpowers. Telling a trusted adult helps the classmate.',
    },
    powerMove: 'Leave the chat. Check on the person being talked about.',
  },
];

const BLUE: ShieldScenario[] = [
  {
    id: 'b-personal-post',
    title: 'The personal post',
    emoji: '📝',
    setup:
      "You're going through a hard time, feeling really frustrated, and you want to vent about it publicly on social media right now.",
    friction:
      "Your emotions are running high. The internet feels like fast validation, but it doesn't forget.",
    check: 'Would I want this to still exist in 5 years?',
    moves: MOVES('Post', 'Pause', 'Don’t post'),
    best: 'pause',
    feedback: {
      send: 'Posting at peak emotion is how regret gets permanent. You are the curator of your own museum.',
      pause:
        'Pause, then send it to one trusted person instead, or write it in your notes and decide tomorrow.',
      dont: 'Holding it is fine. Make sure the feeling still goes somewhere — a friend, a counselor, 988.',
    },
    powerMove: 'Vent to a person, not a feed.',
  },
  {
    id: 'b-late-night',
    title: 'The late-night text',
    emoji: '🌙',
    setup:
      "It's 11 PM. You're alone in your room. Someone you like texts: \"If you really liked me, you'd send me a picture.\" The typing bubbles keep pulsing.",
    friction:
      'The late hour makes you feel isolated and the pressure is on. Part of you wants to give in just to make the tension stop.',
    check: 'Am I doing this for me, or for someone else’s approval?',
    moves: MOVES(),
    best: 'dont',
    feedback: {
      send: 'A photo can be saved, shared, and used against you forever. Sharing sexual images of anyone under 18 is also illegal.',
      pause:
        'Pausing broke the pressure. Now make it a no — "I\'m not sending that" — and tell someone you trust.',
      dont: 'Right. "If you really liked me" is a loyalty test, not care. You never have to prove anything with a photo.',
    },
    powerMove: '"I\'m not sending pictures. That\'s not happening." Then put the phone down.',
  },
  {
    id: 'b-location',
    title: 'The location share',
    emoji: '📍',
    setup:
      'Someone you just started talking to asks you to share your live location "so we can meet up sometime."',
    friction:
      'You want to seem chill, but you barely know this person. A live location removes your physical boundaries.',
    check: 'Do I trust this person with my safety?',
    moves: MOVES('Share it', 'Pause', 'Don’t share'),
    best: 'pause',
    feedback: {
      send: 'A live location tells them where you are all day. That is a lot of trust for someone new.',
      pause:
        "Pause and pick a plan: meet in a public place, tell a friend where you'll be, and keep your location to your Safety Circle.",
      dont: 'Saying no is fine. You can still meet in public without sharing your location.',
    },
    powerMove:
      'Meet in public. Share your plans with your Safety Circle, not your location with them.',
  },
  {
    id: 'b-party-photo',
    title: 'The party photo',
    emoji: '🥤',
    setup:
      'At a party, a friend has had way too much to drink and is passed out on the couch. Someone takes a photo and says, "Post it, this is hilarious."',
    friction: "Everyone's laughing. Saying no feels like killing the vibe.",
    check: 'Would I be okay if this were me?',
    moves: MOVES('Post it', 'Pause', 'Don’t post'),
    best: 'dont',
    feedback: {
      send: 'Your friend cannot say yes right now. Posting them like this can follow them for years.',
      pause: 'Pause — then check on your friend. Someone this drunk may need help, not a photo.',
      dont: "Right call, and the real move is checking they are breathing and safe. If they can't be woken, call 911.",
    },
    powerMove: 'Delete the photo. Check on your friend.',
  },
];

export function shieldScenarios(track: Track): ShieldScenario[] {
  return track === 'blue' ? BLUE : GREEN;
}

export const SHIELD_PLEDGE = 'Before I post, I pause. My legacy is mine to protect.';
