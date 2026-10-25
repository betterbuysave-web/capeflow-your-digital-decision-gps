import { C } from '@/lib/colors';
import type { Track } from '@/lib/data/content';

/**
 * Educational Library: the glossary and clinical topics in one searchable shelf.
 * Track gating is strict — Blue-only entries never render on the Green track.
 */

export type LibraryCategory =
  | 'body'
  | 'consent'
  | 'digital'
  | 'wellness'
  | 'safety'
  | 'prevention'
  | 'testing'
  | 'meds';

export interface LibraryCategoryInfo {
  id: LibraryCategory;
  label: string;
  emoji: string;
  tint: string;
  blurb: string;
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export const LIBRARY_CATEGORIES: LibraryCategoryInfo[] = [
  {
    id: 'body',
    label: 'BODY BASICS',
    emoji: '🧬',
    tint: C.modM,
    blurb: 'What changes, what is normal, and what a check-up is actually for.',
  },
  {
    id: 'consent',
    label: 'CONSENT & VOICE',
    emoji: '🗣️',
    tint: C.modC,
    blurb: 'F.R.I.E.S., boundaries, pressure tactics, and the words that hold a line.',
  },
  {
    id: 'digital',
    label: 'DIGITAL SAFETY',
    emoji: '📱',
    tint: C.azure,
    blurb: 'Footprint, image pressure, the 3-Second Rule, and account hygiene.',
  },
  {
    id: 'wellness',
    label: 'DAILY WELLNESS',
    emoji: '❤️‍🔥',
    tint: C.modH,
    blurb: 'Sleep, movement, food, hydration, and taking a medication on time.',
  },
  {
    id: 'safety',
    label: 'SAFETY & CRISIS',
    emoji: '🆘',
    tint: C.flame,
    blurb: 'Safety Circle, 988, grounding, and what mandated reporting means.',
  },
  {
    id: 'testing',
    label: 'TESTING & SCREENING',
    emoji: '🧪',
    tint: C.gold,
    blurb: 'What a panel covers, window periods, and confidential care.',
    track: 'blue',
  },
  {
    id: 'prevention',
    label: 'PREVENTION LAYERS',
    emoji: '🛡️',
    tint: C.modT,
    blurb: 'Barriers, vaccines, contraception, U=U, and redundancy.',
    track: 'blue',
  },
  {
    id: 'meds',
    label: 'MEDICAL SHIELDS',
    emoji: '💊',
    tint: C.flame,
    blurb: 'PrEP, PEP, treatment as prevention, and the clocks each one runs on.',
    track: 'blue',
  },
];

export interface LibraryEntry {
  id: string;
  term: string;
  short: string;
  body: string[];
  /** Evidence + empathy: the real-talk line that makes the fact usable. */
  realTalk: string;
  category: LibraryCategory;
  source: string;
  keywords: string[];
  /** Blue-track (grades 9–12) only. */
  track?: 'blue';
}

export const LIBRARY_ENTRIES: LibraryEntry[] = [
  // ── BODY BASICS ───────────────────────────────────────────────────────────
  {
    id: 'puberty',
    term: 'Puberty',
    short: 'The multi-year rewiring of a growing body — on nobody else’s schedule.',
    body: [
      'Puberty usually starts somewhere between ages 8 and 14 and takes several years to finish.',
      'Height, skin, smell, mood, sleep timing, and hair all change, and they do not change in the same order for any two people.',
      'Being early or late is not a defect. A provider can tell you where you are if you want to know.',
    ],
    realTalk:
      'Everyone in the locker room thinks they are the only one off-schedule. Almost all of them are wrong.',
    category: 'body',
    source: 'CDC · Child and adolescent development',
    keywords: ['puberty', 'growth', 'development', 'body'],
  },
  {
    id: 'annual-visit',
    term: 'Annual Check-Up',
    short: 'One visit a year that catches things while they are still small.',
    body: [
      'A yearly visit covers growth, blood pressure, vision and hearing, vaccines, mood, sleep, and any question you bring.',
      'You can write your questions down beforehand and hand the paper over if saying them out loud is hard.',
      'You can ask for part of the visit without a parent in the room. Ask at check-in.',
    ],
    realTalk:
      'The visit is 20 minutes. The thing you are avoiding is usually a two-sentence conversation.',
    category: 'body',
    source: 'AAP · Bright Futures periodicity schedule',
    keywords: ['checkup', 'physical', 'doctor', 'annual', 'visit'],
  },
  {
    id: 'bodily-autonomy',
    term: 'Bodily Autonomy',
    short: 'Your body is yours to decide about — including small things.',
    body: [
      'Autonomy means you get to decide who touches you, how, and when — hugs and hair included.',
      'It also means you get a say in your own health care as you get older.',
      'Practicing on small things makes the big ones survivable.',
    ],
    realTalk: 'You do not owe anyone a hug. "I\'m good, high five?" is a complete sentence.',
    category: 'body',
    source: 'CAPE curriculum · Part 2',
    keywords: ['autonomy', 'body', 'touch', 'space'],
  },
  {
    id: 'hpv-vaccine',
    term: 'HPV Vaccine',
    short: 'A cancer-prevention shot, given routinely at ages 11–12.',
    body: [
      'The HPV vaccine prevents infections that cause several kinds of cancer later in life.',
      'It is routinely recommended at ages 11–12 and can be started as early as age 9.',
      'Started before the 15th birthday, it is a two-dose series; started later, it is three doses.',
      'It works best when it is given years before any exposure — which is exactly why the schedule is early.',
    ],
    realTalk:
      'It is a cancer vaccine on the same visit as the tetanus booster. Ask whether yours is done.',
    category: 'body',
    source: 'CDC · ACIP immunization schedule',
    keywords: ['hpv', 'vaccine', 'cancer', 'shot', 'immunization'],
  },
  {
    id: 'flu-vaccine',
    term: 'Flu Vaccine',
    short: 'One shot a year, for everyone 6 months and older.',
    body: [
      'Influenza changes every year, so the vaccine is updated and repeated annually.',
      'Best time is early fall, but later is still worth it while flu is circulating.',
      'Most pharmacies vaccinate teens without an appointment; it is free through Vaccines for Children if you are uninsured.',
    ],
    realTalk: 'Five minutes at a pharmacy counter beats a week flat on your back in February.',
    category: 'body',
    source: 'CDC · Seasonal influenza vaccination recommendations',
    keywords: ['flu', 'influenza', 'vaccine', 'shot'],
  },

  // ── CONSENT & VOICE ───────────────────────────────────────────────────────
  {
    id: 'fries',
    term: 'F.R.I.E.S.',
    short: 'Five conditions that have to all be true for a yes to be real.',
    body: [
      'Freely given — no pressure, guilt, threats, or wearing someone down.',
      'Reversible — anyone can change their mind at any point, including mid-way.',
      'Informed — no hidden details, no lies of omission.',
      'Enthusiastic — a real yes, not a shrug, a silence, or a "fine".',
      'Specific — yes to one thing is not yes to everything else.',
    ],
    realTalk: 'If you have to talk someone into it, you already have your answer.',
    category: 'consent',
    source: 'Planned Parenthood · F.R.I.E.S. consent model',
    keywords: ['fries', 'consent', 'yes', 'boundaries'],
  },
  {
    id: 'coercion',
    term: 'Coercion',
    short: 'Pressure dressed up as persuasion.',
    body: [
      'Coercion is guilt-tripping, threats, sulking, repeat asking, using status or affection as leverage, or waiting until someone is too tired to argue.',
      'A yes produced by coercion is not consent, even when the words sound like agreement.',
      'The tell is how you feel afterward: relieved it is over, not glad you said it.',
    ],
    realTalk:
      'A person who cares about you takes "no" the first time and does not punish you for it.',
    category: 'consent',
    source: 'CAPE curriculum · Strongest Voice',
    keywords: ['coercion', 'pressure', 'guilt', 'manipulation'],
  },
  {
    id: 'boundary',
    term: 'Boundary',
    short: 'A line you name in advance so you do not have to invent it under pressure.',
    body: [
      'Boundaries are easiest to hold when they were decided before the moment, not during it.',
      'Name it, say it once, and repeat the same words instead of arguing new ones.',
      'Boundaries can change on purpose. They should not change because someone pushed.',
    ],
    realTalk: 'Broken-record beats debate. Same sentence, same tone, third time. Then leave.',
    category: 'consent',
    source: 'CAPE curriculum · Consent Café',
    keywords: ['boundary', 'limits', 'no', 'menu'],
  },
  {
    id: 'bystander',
    term: 'Bystander Move',
    short: 'The smallest action that changes a room.',
    body: [
      'Distract: interrupt with something ordinary — a question, a drink, a ride that just arrived.',
      'Delegate: hand it to someone with more power — an adult, a coach, staff.',
      'Direct: name it plainly if it is safe to do so.',
      'Delay: check in afterward. "That looked rough. You good?" counts.',
    ],
    realTalk: 'You are not required to be a hero. You are allowed to be an interruption.',
    category: 'consent',
    source: 'CDC · Violence prevention, bystander approaches',
    keywords: ['bystander', 'intervene', 'help', 'friend'],
  },
  {
    id: 'incapacity',
    term: 'Capacity to Consent',
    short: 'Someone who is drunk, high, asleep, or out of it cannot consent.',
    body: [
      'Consent requires being awake, aware, and able to understand and change the answer.',
      'Substances remove that. So does sleep. So does a serious power gap, including age gaps and authority.',
      'If you are unsure whether someone has capacity, the answer for tonight is no.',
    ],
    realTalk: '"They didn\'t say no" is not a defense you ever want to be building.',
    category: 'consent',
    source: 'CDC · Sexual violence prevention resources',
    keywords: ['capacity', 'drunk', 'incapacitated', 'consent', 'alcohol'],
    track: 'blue',
  },

  // ── DIGITAL SAFETY ────────────────────────────────────────────────────────
  {
    id: 'three-second-rule',
    term: 'The 3-Second Rule',
    short: 'A circuit breaker between the impulse and the send button.',
    body: [
      'Late at night, or when you are upset, it is harder to think clearly before you act.',
      'Three slow seconds — count them, breathe once — gives your better judgment a chance to catch up.',
      'Use it before sending, before agreeing, before getting in the car.',
    ],
    realTalk: 'Nothing that truly matters gets worse because you took three seconds.',
    category: 'digital',
    source: 'CAPE curriculum · Circuit Breaker drill',
    keywords: ['3 second', 'pause', 'circuit breaker', 'impulse', 'breathe'],
  },
  {
    id: 'digital-footprint',
    term: 'Digital Footprint',
    short: 'Everything you post keeps existing somewhere you do not control.',
    body: [
      'Screenshots outlive deletions, and "disappearing" messages can be captured.',
      'Assume anything sent can be seen by someone you did not choose.',
      'Audit your own tags and location settings twice a year.',
    ],
    realTalk:
      'The question is not "do I trust them now". It is "do I trust whoever gets their phone".',
    category: 'digital',
    source: 'CAPE curriculum · Digital legacy',
    keywords: ['footprint', 'posts', 'screenshot', 'privacy', 'online'],
  },
  {
    id: 'image-pressure',
    term: 'Image Pressure',
    short: 'Someone pushing for private photos is running a pressure play.',
    body: [
      'Requests that come with flattery, then guilt, then threats are a known pattern — and it escalates.',
      'You never have to send anything, and you never have to explain why not.',
      'If an image of you is already out there, NCMEC’s Take It Down service can help get it removed, and a trusted adult can help you file.',
    ],
    realTalk:
      'If someone threatens you over an image, they are the one breaking the law. Tell an adult tonight, not tomorrow.',
    category: 'digital',
    source: 'NCMEC · Take It Down (takeitdown.ncmec.org)',
    keywords: ['photos', 'images', 'sextortion', 'pressure', 'take it down', 'nudes'],
  },
  {
    id: 'location-sharing',
    term: 'Location Sharing',
    short: 'A safety tool with one person, a leash with the wrong one.',
    body: [
      'Sharing live location with a Safety Circle contact for a night out is a good use.',
      'Permanent sharing demanded by a partner, with anger when you turn it off, is control.',
      'Check which apps have background location and turn off what you did not choose.',
    ],
    realTalk:
      'A person who needs to see your dot at all times does not trust you — they manage you.',
    category: 'digital',
    source: 'CAPE curriculum · Built-In Radar',
    keywords: ['location', 'tracking', 'share', 'control', 'gps'],
  },
  {
    id: 'account-hygiene',
    term: 'Account Hygiene',
    short: 'Locks on the doors you actually live behind.',
    body: [
      'Different passwords for email and socials; your email is the master key to everything else.',
      'Turn on two-factor authentication where it is offered.',
      'Never share a password to prove loyalty. That request is the red flag, not your answer.',
    ],
    realTalk: 'Sharing a password is not romance. It is a spare key to your whole life.',
    category: 'digital',
    source: 'CISA · Account security basics',
    keywords: ['password', 'two factor', 'security', 'account', 'hacked'],
  },

  // ── DAILY WELLNESS ────────────────────────────────────────────────────────
  {
    id: 'sleep',
    term: 'Sleep Debt',
    short: 'Teens need 8–10 hours. Most run a deficit all week.',
    body: [
      'Ages 13–18 need 8 to 10 hours a night; ages 6–12 need 9 to 12.',
      'Screens in the last half hour and a phone within arm’s reach are the two biggest thieves.',
      'You cannot fully repay the debt on Saturday, but a consistent wake time helps more than a long lie-in.',
    ],
    realTalk:
      'Half of what feels like anxiety on a Wednesday is four nights of six hours stacked on top of each other.',
    category: 'wellness',
    source: 'CDC / AAP · Recommended sleep for adolescents',
    keywords: ['sleep', 'tired', 'insomnia', 'rest', 'screens'],
  },
  {
    id: 'movement',
    term: 'Move 60',
    short: 'About an hour of movement a day, and walking counts.',
    body: [
      'Guidelines call for 60 minutes of mostly moderate activity daily for ages 6–17, including muscle- and bone-strengthening a few days a week.',
      'It does not have to be a sport. Walking, biking, dancing, and carrying things all count.',
      'Movement is one of the few things that improves sleep, mood, and blood sugar at the same time.',
    ],
    realTalk: 'Ten minutes counts. Zero is the only number that does not.',
    category: 'wellness',
    source: 'HHS · Physical Activity Guidelines for Americans, 2nd edition',
    keywords: ['exercise', 'movement', 'activity', 'walk', '60 minutes'],
  },
  {
    id: 'hydration',
    term: 'Hydration',
    short: 'Headaches, cramps, and 3 p.m. fog are often just water.',
    body: [
      'Thirst lags behind need, especially during sport and in heat.',
      'Water is the default; energy drinks stack caffeine and sugar and are a bad substitute.',
      'Pale yellow urine is the cheap self-check.',
    ],
    realTalk: 'Refill the bottle before the class you always crash in.',
    category: 'wellness',
    source: 'CDC · Water and healthier drinks',
    keywords: ['water', 'hydration', 'headache', 'cramps', 'energy drink'],
  },
  {
    id: 'adherence',
    term: 'Medication Adherence',
    short: 'Taking the medicine as prescribed — the part that makes it work.',
    body: [
      'Attach the dose to something you already do daily: brushing teeth, charging your phone, breakfast.',
      'Use a reminder with a label only you would understand if it lands on a shared screen.',
      'Missed a dose? Follow the instructions on the label or ask the pharmacist — do not double up on your own.',
      'Refill at seven days left, not on the last pill.',
    ],
    realTalk:
      'Nobody is perfect at this. The goal is a system that catches you, not a memory that never slips.',
    category: 'wellness',
    source: 'CDC · Medication adherence resources',
    keywords: ['adherence', 'medication', 'dose', 'reminder', 'pills', 'refill'],
  },
  {
    id: 'asthma-plan',
    term: 'Asthma Action Plan',
    short: 'A written plan for green, yellow, and red days.',
    body: [
      'Controller medicine is daily even when you feel fine; the rescue inhaler is for symptoms.',
      'The plan names your triggers and the exact point where you call for help.',
      'The school nurse and your coach should each have a copy.',
    ],
    realTalk: 'Carrying the rescue inhaler is not weakness. It is a redundant layer.',
    category: 'wellness',
    source: 'NIH / NHLBI · Asthma management guidelines',
    keywords: ['asthma', 'inhaler', 'breathing', 'action plan'],
  },
  {
    id: 'glucose',
    term: 'Blood Sugar Monitoring',
    short: 'Checking, logging, and knowing your own patterns.',
    body: [
      'Your care team sets your target range and how often to check — write the numbers down or let the app do it.',
      'Sport, illness, stress, and skipped meals all move the number.',
      'Know your own low-blood-sugar signs and keep fast carbs in your bag.',
    ],
    realTalk: 'A log is not homework for your doctor. It is the only way patterns become visible.',
    category: 'wellness',
    source: 'CDC · Diabetes self-management',
    keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin', 'log'],
  },
  {
    id: 'blood-pressure',
    term: 'Blood Pressure Basics',
    short: 'Checked at every visit, movable by ordinary habits.',
    body: [
      'Sit for five minutes, feet flat, arm supported at heart level, then read.',
      'Sleep, movement, less added salt, and less caffeine all move the number.',
      'One high reading is not a diagnosis; a pattern is worth a conversation.',
    ],
    realTalk: 'This is the most boring number that ever saved someone. Get it checked yearly.',
    category: 'wellness',
    source: 'CDC · High blood pressure prevention',
    keywords: ['blood pressure', 'hypertension', 'salt', 'cuff'],
  },
  {
    id: 'nicotine',
    term: 'Vaping & Nicotine',
    short: 'Nicotine rewires a teenage brain faster than an adult one.',
    body: [
      'Adolescent brains form dependence quickly, and most vapes deliver a high nicotine dose.',
      'Nicotine affects attention, mood, and sleep — the exact three things people vape to fix.',
      'Quitting is easier with support: free text programs exist, and a clinician can help.',
    ],
    realTalk: 'Nobody starts planning to need it. That is the whole design.',
    category: 'wellness',
    source: 'CDC · Youth tobacco and e-cigarette use',
    keywords: ['vape', 'nicotine', 'smoking', 'quit', 'juul'],
  },
  {
    id: 'sun-safety',
    term: 'Sun Safety',
    short: 'SPF 30 or higher, reapplied — skin keeps the receipts.',
    body: [
      'Sunburns in childhood and adolescence raise skin cancer risk decades later.',
      'Broad-spectrum SPF 30+, reapplied every two hours and after swimming.',
      'Tanning beds are not a safe alternative.',
    ],
    realTalk:
      'Future you does not care how you looked at practice. Present you can spare 30 seconds.',
    category: 'wellness',
    source: 'CDC · Sun safety',
    keywords: ['sun', 'sunscreen', 'spf', 'skin', 'tanning'],
  },
  {
    id: 'grounding',
    term: 'Grounding',
    short: 'Getting the body out of alarm so the brain can think again.',
    body: [
      'Box breathing: in for four, hold four, out for four, hold four. Three rounds.',
      '5-4-3-2-1: name five things you see, four you feel, three you hear, two you smell, one you taste.',
      'Cold water on the wrists or face shortens a spike faster than talking yourself down.',
    ],
    realTalk: 'You are not calming down to be polite. You are getting your own brain back online.',
    category: 'wellness',
    source: 'NIMH · Coping with stress',
    keywords: ['grounding', 'anxiety', 'breathing', 'panic', 'calm'],
  },

  // ── SAFETY & CRISIS ───────────────────────────────────────────────────────
  {
    id: 'safety-circle',
    term: 'Safety Circle',
    short: 'Three named people who pick up at 2 a.m.',
    body: [
      'One peer, one adult, one backup. Names and numbers saved before you need them.',
      'Tell them they are on the list, and agree a code word that means "come get me, do not ask now".',
      'A circle you never use is still doing its job.',
    ],
    realTalk: 'The plan is not "someone would help". The plan is a name and a number.',
    category: 'safety',
    source: 'CAPE Youth Edition · Tools & Trusted Support',
    keywords: ['safety circle', 'contacts', 'help', 'ride', 'code word'],
  },
  {
    id: '988',
    term: '988 Lifeline',
    short: 'Call or text 988, any hour, free and confidential.',
    body: [
      '988 is the national Suicide & Crisis Lifeline: call, text, or chat with a trained counselor.',
      'You do not have to be suicidal to use it. Overwhelmed counts.',
      'It is not the police. They work with you on what happens next.',
    ],
    realTalk: 'Texting counts. If your voice will not work tonight, your thumbs will.',
    category: 'safety',
    source: 'SAMHSA · 988 Suicide & Crisis Lifeline',
    keywords: ['988', 'crisis', 'suicide', 'hotline', 'text'],
  },
  {
    id: 'safety-exception',
    term: 'The Safety Exception',
    short: 'What a trusted adult has to pass on, and why.',
    body: [
      'Teachers, counselors, coaches, and clinicians are mandated reporters.',
      'The only thing they must report is information that someone may be in danger — abuse, or serious risk of harm to you or someone else.',
      'They should tell you what they are doing and why. You can ask exactly that up front.',
    ],
    realTalk:
      'The exception exists to get you help, not to get you in trouble. Ask "what would you have to report?" before you decide what to share.',
    category: 'safety',
    source: 'CAPE curriculum · Safety Exception protocol',
    keywords: ['mandated reporting', 'safety exception', 'confidential', 'report'],
  },
  {
    id: 'pivot',
    term: 'The Pivot',
    short: 'What you do when the primary plan fails.',
    body: [
      'Every plan needs a second layer: a ride that is not the ride, a charged phone, cash, a friend who knows the address.',
      'Rehearse the pivot out loud. Under stress you will run whatever you practiced.',
      'Leaving early is a successful outcome, not a failed night.',
    ],
    realTalk: 'The plan surviving contact with reality is rare. Having a second one is normal.',
    category: 'safety',
    source: 'CAPE curriculum · Stress Test Simulator',
    keywords: ['pivot', 'plan b', 'ride', 'exit', 'backup'],
  },

  // ── TESTING & SCREENING (BLUE) ────────────────────────────────────────────
  {
    id: 'full-panel',
    term: 'Full Panel',
    short: '"Get tested" is not one test — ask what is included.',
    body: [
      'A thorough visit usually covers HIV, chlamydia, gonorrhea, and syphilis; hepatitis and trichomonas depending on history.',
      'Chlamydia and gonorrhea should be sampled from the sites you have had contact with — throat and rectum included, not just urine.',
      'Ask for the list, and ask how results are delivered before you leave.',
    ],
    realTalk:
      'Saying "I want the full panel, including throat and rectal swabs if that applies to me" takes eight seconds and doubles what gets caught.',
    category: 'testing',
    source: 'CDC · STI Treatment Guidelines, 2021',
    keywords: ['panel', 'testing', 'swab', 'sti', 'std', 'screening'],
    track: 'blue',
  },
  {
    id: 'window-period',
    term: 'Window Period',
    short: 'The gap between exposure and a test that can detect it.',
    body: [
      'Every test has a window. Testing the morning after tells you about last month, not last night.',
      'For HIV, antigen/antibody blood tests generally detect infection weeks after exposure; a nucleic acid test detects it sooner.',
      'Ask the clinic when to re-test, and put that date in a reminder before you walk out.',
    ],
    realTalk: 'A negative test too early is not reassurance. It is a scheduling problem.',
    category: 'testing',
    source: 'CDC · HIV testing guidance',
    keywords: ['window period', 'test timing', 'retest', 'negative'],
    track: 'blue',
  },
  {
    id: 'silent-sti',
    term: 'Asymptomatic Infection',
    short: 'Most STIs feel like nothing at all.',
    body: [
      'Chlamydia and gonorrhea frequently cause no symptoms, especially in the throat and rectum.',
      'Untreated infections can cause lasting damage even while feeling fine.',
      'Screening on a schedule is the only way to catch what does not announce itself.',
    ],
    realTalk: '"I feel fine" is data about how you feel, not about what you have.',
    category: 'testing',
    source: 'CDC · STI Treatment Guidelines, 2021',
    keywords: ['asymptomatic', 'no symptoms', 'chlamydia', 'gonorrhea', 'silent'],
    track: 'blue',
  },
  {
    id: 'routine-hiv',
    term: 'Routine HIV Testing',
    short: 'Recommended at least once for everyone 13–64.',
    body: [
      'CDC recommends HIV screening at least once as routine care for ages 13 to 64.',
      'People with ongoing risk should test more often — at least yearly, and every three months in some cases.',
      'Rapid tests give results in about 20 minutes; self-test kits are also available.',
    ],
    realTalk:
      'Testing is maintenance, not a verdict. It is the same category as a dental cleaning.',
    category: 'testing',
    source: 'CDC · HIV screening recommendations',
    keywords: ['hiv test', 'routine', 'rapid test', 'self test'],
    track: 'blue',
  },
  {
    id: 'minor-consent',
    term: 'Minor Consent & Confidentiality',
    short: 'Many states let minors consent to STI care on their own.',
    body: [
      'Most states allow minors to consent to STI testing and treatment without a parent, but the details vary by state and service.',
      'In Texas, Family Code §32.003 lets minors consent to care for certain reportable infections, including many STIs. Rules for other services, such as PrEP or birth control, are narrower. Use this as how to ask, not a guarantee.',
      'A separate issue is the paper trail: a service can be confidential and still generate an insurance statement mailed home.',
      'Title X clinics and health centers deal with this daily — ask them both questions directly.',
    ],
    realTalk:
      'The Paper Trail Ghost dies when you ask two questions at the desk: "what stays private?" and "what shows up on a statement?"',
    category: 'testing',
    source: 'HHS Office of Population Affairs · Title X confidentiality requirements',
    keywords: ['confidential', 'minor consent', 'insurance', 'parents', 'paper trail'],
    track: 'blue',
  },

  // ── PREVENTION LAYERS (BLUE) ──────────────────────────────────────────────
  {
    id: 'barriers',
    term: 'Barrier Methods',
    short: 'External and internal condoms, and dams — the layer you control.',
    body: [
      'Check the expiry date, open with hands not teeth, and use one at a time — doubling up increases friction and failure.',
      'Water- or silicone-based lube reduces breakage; oil-based products degrade latex.',
      'Store them somewhere that is not a back pocket or a hot car.',
    ],
    realTalk:
      'Fumbling is normal and survivable. Practicing once, alone, removes most of the fumble.',
    category: 'prevention',
    source: 'CDC · Condom effectiveness',
    keywords: ['condom', 'barrier', 'dam', 'lube', 'latex'],
    track: 'blue',
  },
  {
    id: 'redundancy',
    term: 'Redundancy',
    short: 'Two layers, because one layer sometimes fails.',
    body: [
      'Barriers, vaccines, PrEP, testing, and communication are separate layers — they cover each other’s gaps.',
      'Redundancy is why a broken condom is a plan-B moment instead of a catastrophe.',
      'Decide your layers in advance, when nobody is waiting on you.',
    ],
    realTalk:
      'Pilots do not carry two systems because they expect to crash. They carry two anyway.',
    category: 'prevention',
    source: 'CAPE curriculum · Protection Shields',
    keywords: ['redundancy', 'layers', 'backup', 'failure'],
    track: 'blue',
  },
  {
    id: 'contraception',
    term: 'Contraception Options',
    short: 'Pills, patch, ring, shot, implant, IUD — different upkeep, different failure modes.',
    body: [
      'Long-acting reversible options (implant, IUD) have the lowest failure rates because they do not depend on daily memory.',
      'Daily and weekly methods work well when the routine holds — pair them with a reminder.',
      'None of them protect against STIs, which is why barriers stay in the plan.',
    ],
    realTalk:
      'Pick the method that fits the life you actually have, not the one you wish you were organized enough for.',
    category: 'prevention',
    source: 'CDC · US Selected Practice Recommendations for Contraceptive Use',
    keywords: ['birth control', 'contraception', 'iud', 'implant', 'pill'],
    track: 'blue',
  },
  {
    id: 'emergency-contraception',
    term: 'Emergency Contraception',
    short: 'A clock-based backup after unprotected sex or a barrier failure.',
    body: [
      'Levonorgestrel EC is available over the counter with no age restriction and works best the sooner it is taken, within 72 hours.',
      'Ulipristal acetate is prescription-only and stays effective up to 120 hours.',
      'A copper IUD is the most effective option and can be placed within five days.',
      'EC does not end a pregnancy and does not protect against STIs.',
    ],
    realTalk:
      'Pharmacy shelf, no ID needed for levonorgestrel. If a clerk tells you otherwise, ask the pharmacist.',
    category: 'prevention',
    source: 'FDA labeling · levonorgestrel and ulipristal emergency contraception',
    keywords: ['emergency contraception', 'plan b', 'morning after', '72 hours', 'ella'],
    track: 'blue',
  },
  {
    id: 'uu',
    term: 'U=U (Undetectable = Untransmittable)',
    short: 'Effective treatment stops sexual transmission of HIV.',
    body: [
      'A person living with HIV who takes treatment as prescribed and maintains a durably undetectable viral load does not transmit HIV sexually.',
      'That is a scientific consensus position, not a hopeful slogan.',
      'It is also why treatment access is prevention, and why stigma is a public health problem.',
    ],
    realTalk:
      'Language matters: "people living with HIV". Status is a health fact, not a character description.',
    category: 'prevention',
    source: 'NIH / CDC · Undetectable = Untransmittable consensus statement (2019)',
    keywords: ['u=u', 'undetectable', 'untransmittable', 'viral load', 'stigma'],
    track: 'blue',
  },
  {
    id: 'vaccines-blue',
    term: 'Prevention Vaccines',
    short: 'HPV and hepatitis B — ask whether your series is complete.',
    body: [
      'HPV vaccination prevents several cancers and is recommended routinely at 11–12, with catch-up available later.',
      'Hepatitis B vaccination is routine from birth. Ask your doctor or nurse whether your series is complete.',
    ],
    realTalk: 'Vaccines are the only shield that keeps working while you are asleep.',
    category: 'prevention',
    source: 'CDC · ACIP immunization schedules',
    keywords: ['vaccine', 'hepatitis', 'hpv', 'immunization'],
    track: 'blue',
  },
  {
    id: 'harm-reduction',
    term: 'Harm Reduction',
    short: 'Lowering the risk of the choice actually being made.',
    body: [
      'Never use alone; if you are with someone, one person stays clear-headed.',
      'Fentanyl contaminates counterfeit pills and powders. Test strips exist and are legal in most states.',
      'Naloxone reverses an opioid overdose, is available without a prescription, and is safe to give if you are unsure.',
      'Good Samaritan laws in most states protect the person who calls 911 for an overdose.',
    ],
    realTalk: 'Nobody has ever been talked out of an overdose. Naloxone in a bag does the talking.',
    category: 'prevention',
    source: 'SAMHSA / CDC · Overdose prevention and naloxone guidance',
    keywords: ['harm reduction', 'naloxone', 'narcan', 'fentanyl', 'overdose'],
    track: 'blue',
  },

  // ── MEDICAL SHIELDS (BLUE) ────────────────────────────────────────────────
  {
    id: 'prep',
    term: 'PrEP (Pre-Exposure Prophylaxis)',
    short: 'Medicine taken before exposure that prevents HIV.',
    body: [
      'There are three forms: a daily pill, an injection every two months (cabotegravir), and an injection twice a year (lenacapavir).',
      'Taken as prescribed, the daily pill reduces the risk of getting HIV from sex by about 99%. The injections have their own evidence; ask your provider about each one.',
      'PrEP requires an HIV test before starting and follow-up visits with labs, usually every three months.',
      'Most insurance covers PrEP with no copay, and assistance programs cover people without insurance.',
      'PrEP does not prevent other STIs — barriers and screening stay in the plan.',
    ],
    realTalk:
      'If a daily pill is not realistic for your life, say that out loud at the clinic. The injection exists for exactly that reason.',
    category: 'meds',
    source: 'CDC · PrEP clinical guidance',
    keywords: [
      'prep',
      'prevention',
      'daily pill',
      'injection',
      'apretude',
      'lenacapavir',
      'yeztugo',
      'hiv',
    ],
    track: 'blue',
  },
  {
    id: 'pep',
    term: 'PEP (Post-Exposure Prophylaxis)',
    short: 'Emergency medicine after a possible HIV exposure. 72-hour clock.',
    body: [
      'PEP must start as soon as possible and no later than 72 hours after the exposure. Sooner is better. After 72 hours, still get tested and talk to a clinician.',
      'It is a 28-day course of medication, and finishing the course is what makes it work.',
      'Inside 72 hours, go to an emergency department with a trusted adult. Say: "I may have been exposed to HIV and need to be evaluated for PEP." This app does not provide medication.',
      'Cost help exists. Do not let a bill question burn hours off the clock.',
    ],
    realTalk:
      'You are not overreacting by asking. The clock is the only thing here that does not care about embarrassment.',
    category: 'meds',
    source: 'CDC · nPEP clinical guidance',
    keywords: ['pep', '72 hours', 'emergency', 'exposure', 'npep', '28 days'],
    track: 'blue',
  },
  {
    id: 'art',
    term: 'Treatment as Prevention',
    short: 'Starting HIV treatment fast protects health and stops transmission.',
    body: [
      'Modern HIV treatment is usually one pill a day, or a long-acting injection for some people.',
      'Starting treatment quickly after diagnosis protects the immune system and leads to an undetectable viral load, often within months.',
      'A positive result today is a manageable chronic condition, not the diagnosis it was decades ago.',
    ],
    realTalk:
      'The Fear-of-a-Positive-Result Ghost is running on 1990s information. Update the file and it loses most of its power.',
    category: 'meds',
    source: 'CDC / HIV.gov · HIV treatment basics',
    keywords: ['art', 'treatment', 'positive', 'viral load', 'hiv'],
    track: 'blue',
  },
];

export function entriesForTrack(track: Track): LibraryEntry[] {
  return LIBRARY_ENTRIES.filter((e) => track === 'blue' || e.track !== 'blue');
}

export function categoriesForLibraryTrack(track: Track): LibraryCategoryInfo[] {
  return LIBRARY_CATEGORIES.filter((c) => track === 'blue' || c.track !== 'blue');
}

export function searchLibrary(
  track: Track,
  query: string,
  category: LibraryCategory | null,
): LibraryEntry[] {
  const q = query.trim().toLowerCase();
  return entriesForTrack(track).filter((e) => {
    if (category && e.category !== category) return false;
    if (q.length === 0) return true;
    return (
      e.term.toLowerCase().includes(q) ||
      e.short.toLowerCase().includes(q) ||
      e.keywords.some((k) => k.includes(q)) ||
      e.body.some((line) => line.toLowerCase().includes(q))
    );
  });
}

export function libraryCategoryInfo(id: LibraryCategory): LibraryCategoryInfo {
  return LIBRARY_CATEGORIES.find((c) => c.id === id) ?? LIBRARY_CATEGORIES[0];
}

export const LIBRARY_INTRO =
  'Read at your own pace. Nothing here is a quiz, nothing is logged, and every entry pairs the medical fact with the real-talk version.';
