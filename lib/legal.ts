/**
 * CAPE Flow — Legal & Compliance content.
 *
 * Written to match how this app actually behaves: no accounts,
 * everything saved on the device, no analytics, no server sync. The same text is
 * published at theharnessproject.org/legal/cape-flow/. Edit the constants below
 * once and every document picks up the change. Attorney review is in progress (Oct 2026);
 * when the reviewed text lands, bump LEGAL_VERSION and remove the pending-review note in
 * app/legal/index.tsx.
 *
 * Track rule: every document is readable on Green Track, so none of them names
 * Blue-only medications or links to Blue-only screens.
 */

import { C } from '@/lib/colors';

export type LegalDocId = 'terms' | 'privacy' | 'health' | 'parents' | 'accessibility';

export type LegalIconKey = 'document' | 'lock' | 'stethoscope' | 'users' | 'eye';

export interface LegalSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface LegalDocument {
  id: LegalDocId;
  title: string;
  /** One-line summary shown on the index row. */
  summary: string;
  icon: LegalIconKey;
  accent: string;
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_ENTITY = 'CAPE Flow';
/** The company that publishes the App and is party to these documents. */
export const LEGAL_OPERATOR = 'The Harness Project LLC';
export const LEGAL_CONTACT_EMAIL = 'email@theharnessproject.org';
export const LEGAL_GOVERNING_LAW = 'the State of Texas, United States';
export const LEGAL_LAST_UPDATED = 'October 22, 2026';
export const LEGAL_VERSION = '1.1';
export const LEGAL_WEB_URL = 'https://theharnessproject.org/legal/cape-flow';

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'terms',
    title: 'Terms of Use',
    summary: 'Who CAPE Flow is for, the rules, and our promises',
    icon: 'document',
    accent: C.teal,
    intro: `These Terms of Use ("Terms") are an agreement between you and ${LEGAL_OPERATOR} ("we", "us"), the publisher of ${LEGAL_ENTITY} (the "App"). They cover the App on phones, tablets and the web. If you are under 18, read these Terms with a parent, guardian, or the teacher who shared the App with you. By using the App you accept these Terms. If you do not accept them, stop using the App and delete it.`,
    sections: [
      {
        heading: '1. Who the App is for',
        body: 'The App is a health and decision-making companion for students in grades 6–12 and for the parents, guardians and educators who support them. Green Track is written for grades 6–8 and Blue Track for grades 9–12. You choose your track by grade when you start. Please pick the track for your real grade: Blue Track covers topics that are not written for younger students.',
      },
      {
        heading: '2. Using the App at school',
        body: 'Schools and youth programs may use the App alongside the CAPE Youth Edition curriculum. CAPE Youth Edition is supplemental and TEKS-aligned. It is not a district-adopted human sexuality curriculum. A school using it is responsible for following its own board policy and for getting any parent or guardian consent the law requires before instruction. See the Parent & School Notice.',
      },
      {
        heading: '3. Free to use',
        body: 'The App is free. It has no purchases, subscriptions, ads, or paywalls, and it never asks for payment details.',
      },
      {
        heading: '4. Your license',
        body: 'We give you a personal, limited, revocable, non-exclusive, non-transferable license to use the App on devices you own or are allowed to use, for your own learning or for teaching. All rights not expressly granted are reserved.',
      },
      {
        heading: '5. Things you agree not to do',
        bullets: [
          'Use the App to bully, pressure, threaten, embarrass, or harm anyone.',
          'Enter another person’s private information, such as their health details, without their permission.',
          'Copy, sell, or redistribute the App or its lessons, or present them as your own.',
          'Reverse engineer the App or try to get around a track gate or another protection, except where the law allows it.',
          'Use App content to train an AI model or build a competing product.',
        ],
      },
      {
        heading: '6. What the App is, and is not',
        body: 'The App is an educational tool. It helps you practice decisions, set boundaries, and find trusted help. It is not a doctor, a counselor, a crisis service, or a way to contact anyone automatically. It cannot watch for danger or make a report. See the Health & Safety Disclaimer.',
      },
      {
        heading: '7. What you save',
        body: 'Everything you enter — your codename, notes, boundary menu, Safety Circle, scenario answers, reminders and progress — is saved only on your device. We cannot see it, back it up, or restore it. Use Delete all my data in Me to erase it. Device backups and browser storage have their own settings.',
      },
      {
        heading: '8. Ownership',
        body: 'The App, its lessons, artwork (including the CAPE and MATCH Compass designs), names and logos belong to us or our licensors and are protected by copyright and trademark law. Outside resources linked from the App belong to their own publishers.',
      },
      {
        heading: '9. Links to other services',
        body: 'The App links to outside websites and phone numbers, such as crisis lines and clinic finders. Those services are run by other organizations under their own terms and privacy policies. We do not control them and are not responsible for them.',
      },
      {
        heading: '10. Changes',
        body: 'We may add, change, or remove features. If we change these Terms we will update the "last updated" date and show important changes in the App before they take effect.',
      },
      {
        heading: '11. No warranty',
        body: 'The App is provided "as is" and "as available". To the fullest extent the law allows, we make no promise that it will always work, be error-free, or be complete or current. Some places do not allow these exclusions, so parts of this section may not apply to you.',
      },
      {
        heading: '12. Limits on our liability',
        body: 'To the fullest extent the law allows, we are not responsible for indirect or consequential losses, or for lost data, arising from use of the App. Our total liability for any claim about the App is limited to twenty-five US dollars (USD 25). Nothing here limits liability that the law does not allow us to limit.',
      },
      {
        heading: '13. App stores',
        body: 'These Terms are between you and us, not Apple or Google. Those platforms are not responsible for the App or its support, but they may enforce these Terms as third-party beneficiaries.',
      },
      {
        heading: '14. Governing law',
        body: `These Terms are governed by the laws of ${LEGAL_GOVERNING_LAW}, except where the law where you live gives you other rights. Before bringing any claim, please email ${LEGAL_CONTACT_EMAIL} and give us 30 days to fix the problem.`,
      },
      {
        heading: '15. Contact',
        body: `Questions about these Terms: ${LEGAL_CONTACT_EMAIL}.`,
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    summary: 'On-device only, no accounts, COPPA and FERPA',
    icon: 'lock',
    accent: C.magenta,
    intro: `${LEGAL_ENTITY} is built so we never receive your information. There is no account, no login, and no analytics. What you enter stays on your device. This policy explains exactly what that means, written for students and for parents, guardians and schools.`,
    sections: [
      {
        heading: 'The short version',
        bullets: [
          'No account, email, phone number, or password is ever requested.',
          'Everything you save stays in the App on your device. Nothing is uploaded to us.',
          'No analytics, tracking, advertising, or data brokers.',
          'We do not sell or share personal information, because we never receive it.',
          'You can erase everything with Delete all my data in Me.',
        ],
      },
      {
        heading: 'What the App saves on your device',
        body: 'These records are kept in the App’s local storage (or your browser’s storage on the web) so the App can remember your progress:',
        bullets: [
          'your grade band and track, and an optional codename (we ask for a nickname, not your real name);',
          'lessons completed, XP, badges, streak, and scenario answers;',
          'your notes, boundary menu, Consent Café choices, and Ghost Vault entries;',
          'your Safety Circle — the names and phone numbers you choose to add;',
          'reminders and check-off logs, and on Blue Track, care timers;',
          'Discreet Mode settings, with the PIN stored as a scrambled (hashed) code rather than the digits.',
        ],
      },
      {
        heading: 'What we never collect',
        body: 'We do not receive or store your name, email address, home address, location, contacts list, photos, school, or any record of what you do in the App. The App reads your location only when you tap Use my location, and only on your device. There is no chat, posting, messaging, or public profile, so other users cannot see you or contact you through the App.',
      },
      {
        heading: 'When information leaves the App',
        body: 'Information leaves the App only when you choose an action that sends it somewhere else:',
        bullets: [
          'Opening a link sends a normal web request to that website, which can see your IP address.',
          'In Clinic Finder, a ZIP code you type is added to the link for finders that accept one. It is never saved.',
          'If you tap Use my location in Clinic Finder, your device asks your permission, then the App turns your position into the nearest ZIP code on the device. Your exact location is never sent anywhere or saved; only the ZIP is used.',
          'Open map search sends the ZIP and the kind of care you picked to Google Maps, under Google’s own privacy policy.',
          'Tapping a phone number opens your phone app to call it.',
          'Reminders are scheduled by your device’s own notification system. No message goes through us.',
          'On the web, the site that hosts the App, and Google Fonts (which supplies the lettering), receive standard connection information such as IP address and browser type to deliver the page. They do not receive what you enter.',
        ],
      },
      {
        heading: 'Children under 13 (COPPA)',
        body: 'Some Green Track students are under 13. The App is designed so that we do not collect personal information from anyone, including children under 13: there is no sign-up, nothing you enter is sent to us, and we use no third-party analytics or advertising tools. Because we collect nothing, there is no child’s information for us to review or delete. A parent or guardian can see and erase everything saved on the child’s device in Me. If you believe information about a child has reached us, email us and we will delete it.',
      },
      {
        heading: 'Schools and student records (FERPA)',
        body: 'The App does not send student progress, answers, or usage to a school, a teacher, or us, so it does not create records that a school holds. A school or teacher only sees what a student chooses to show them on screen. Schools remain responsible for their own recordkeeping and privacy obligations when they use the App.',
      },
      {
        heading: 'Sharing a device',
        body: 'Anyone who can unlock the device can open the App. Discreet Mode adds a 4-digit PIN as a privacy screen. It is not encryption and it is not a substitute for a device passcode.',
      },
      {
        heading: 'Backups and deleting your data',
        body: 'We keep no copy and no cloud backup. Delete all my data in Me erases what the App saved. Your device’s own backups, and your browser’s saved site data on the web, are controlled by their own settings, so check those too. Uninstalling the App may not clear browser storage or existing backups.',
      },
      {
        heading: 'Your privacy rights',
        body: 'Privacy laws (including in Texas, California, and the EU/UK) give rights to access, correct, delete, and stop the sale of personal information. Because we hold none of your information, you can exercise those rights directly in the App: review it in each tool and erase it with Delete all my data. We never sell personal information or use it for targeted advertising.',
      },
      {
        heading: 'Security',
        body: 'Your information is protected by your device: its lock screen, its encryption, and the operating system’s app sandbox. Keep a passcode on your device and keep its software up to date.',
      },
      {
        heading: 'Changes and contact',
        body: `If this policy changes we will update the "last updated" date and show important changes in the App. Questions or requests from students, parents, guardians or schools: ${LEGAL_CONTACT_EMAIL}.`,
      },
    ],
  },
  {
    id: 'health',
    title: 'Health & Safety Disclaimer',
    summary: 'Educational only, not a crisis or medical service',
    icon: 'stethoscope',
    accent: C.flame,
    intro: `${LEGAL_ENTITY} teaches skills and points you to trusted help. It does not give medical advice, diagnose, or treat anything, and it is not a crisis service.`,
    sections: [
      {
        heading: 'In an emergency',
        body: 'If you or someone else is in danger or hurt, call 911 (or your local emergency number) or tell a trusted adult right now. If you are thinking about hurting yourself, call or text 988 to reach the Suicide & Crisis Lifeline. The App cannot call anyone for you or send an alert.',
      },
      {
        heading: 'The App cannot watch or report',
        body: 'No one monitors what you enter. The App cannot notice danger, contact your Safety Circle, or make a report. If you tell a teacher, counselor, clinician, or facilitator about danger or abuse, they may be required by law to share it so you can be kept safe. You can ask them what they must share before you talk.',
      },
      {
        heading: 'Education, not medical advice',
        body: 'Lessons and tools give general information written for students. They are simplified, may be incomplete, and may not match the newest guidance. Only a doctor, nurse, or other qualified professional who knows your situation can give you medical advice. If anything in the App differs from what your clinician tells you, follow your clinician.',
      },
      {
        heading: 'Scores and badges',
        body: 'XP, badges, SafER Score, and scenario results are practice feedback. They are not health measurements and do not mean you are safe or unsafe.',
      },
      {
        heading: 'Outside resources',
        body: 'Hotlines, clinic finders, and websites listed in the App are run by other organizations. Their hours, services, and details can change. Check with them directly.',
      },
      {
        heading: 'Talk to trusted adults',
        body: 'The App works best alongside the people in your Safety Circle — a parent or guardian, a school counselor or nurse, a teacher, or a clinician. Bring your questions to them.',
      },
      {
        heading: 'Report a mistake',
        body: `If something in the App is wrong or out of date, tell us at ${LEGAL_CONTACT_EMAIL} so we can fix it.`,
      },
    ],
  },
  {
    id: 'parents',
    title: 'Parent & School Notice',
    summary: 'Preview rights, written consent, how schools use CAPE',
    icon: 'users',
    accent: C.purple,
    intro: `For parents, guardians, educators and administrators. ${LEGAL_ENTITY} is the student companion to CAPE Youth Edition. This notice explains what students see, your rights, and what a school is responsible for.`,
    sections: [
      {
        heading: 'What students see',
        body: 'CAPE Youth Edition has 18 lessons in five modules, with content written separately for each grade band. Green Track (grades 6–8) covers mindset, communication, consent, boundaries, decision-making, recovery, and leadership. Blue Track (grades 9–12) adds protection, vaccines, testing, clinical care, and self-advocacy, behind a full-page gate. Green Track never shows Blue Track topics.',
      },
      {
        heading: 'Your right to preview',
        body: 'You may preview all content before it is used with your student. The Parent & School Dashboard in the App, the free curriculum previews at theharnessproject.org, and the CAPE Youth Edition book show the same material students use.',
      },
      {
        heading: 'Written consent in Texas schools',
        bullets: [
          'Texas Senate Bill 12 (2025), in effect since September 1, 2025, requires schools to send parents or guardians a written consent request at least 14 days before human sexuality instruction begins, and to have written consent before a student takes part.',
          'Texas Education Code §28.004(q-6) requires written consent before instruction on child abuse, family violence, dating violence, and sex trafficking.',
          'CAPE follows the same standard everywhere: no student takes part in facilitated instruction without written consent. Schools should use their district’s current form.',
        ],
      },
      {
        heading: 'What a school is responsible for',
        body: 'A school or program using CAPE is responsible for following local board policy, collecting consent, reviewing materials through its own process (such as a School Health Advisory Council), and meeting its own reporting and recordkeeping duties. CAPE is supplemental and TEKS-aligned; it is not a district-adopted human sexuality curriculum.',
      },
      {
        heading: 'No data goes to the school or to us',
        body: 'The App sends no usage, answers, or progress anywhere, so no notification or report is generated by a student using it. Teachers do not get a dashboard of student activity. See the Privacy Policy.',
      },
      {
        heading: 'Helping at home',
        body: 'The Parent & School Dashboard includes home activities and conversation starters. You can look at the App with your student and use Delete all my data in Me to clear it at any time.',
      },
      {
        heading: 'Questions and concerns',
        body: `Email ${LEGAL_CONTACT_EMAIL}. Schools can also contact us about the 90-day pilot and facilitator support.`,
      },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility Statement',
    summary: 'WCAG 2.1 AA goal and how to report a barrier',
    icon: 'eye',
    accent: C.gold,
    intro: `We want ${LEGAL_ENTITY} to work for every student, including those who use screen readers, magnification, switch or voice control, or larger text. Our goal is WCAG 2.1 Level AA.`,
    sections: [
      {
        heading: 'What we have built in',
        bullets: [
          'A light, high-contrast design; we aim to keep all text above AA contrast on its background.',
          'Large touch targets for buttons, chips, and track choices.',
          'Meaning is never shown by color alone; YES, MAYBE, and NO are always written out.',
          'Screen-reader labels and roles on buttons and choices. MATCH letter dials are marked decorative where a text label already names the letter.',
          'Layouts that reflow at larger system text sizes.',
          'Short, purposeful motion and haptics, with no flashing content.',
        ],
      },
      {
        heading: 'Known limitations',
        bullets: [
          'Some decorative artwork contains words that are also given as text nearby.',
          'The web version has had less assistive-technology testing than the phone apps.',
          'A few small labels are below our preferred text size and are being enlarged as screens are updated.',
        ],
      },
      {
        heading: 'Device settings that help',
        body: 'The App works with VoiceOver and Dynamic Type on iOS, TalkBack and font scaling on Android, and system settings for bold text, contrast, and reduced motion.',
      },
      {
        heading: 'Tell us about a barrier',
        body: `Email ${LEGAL_CONTACT_EMAIL} with the screen, what you were trying to do, your device, and any assistive technology you use. We aim to reply within 5 business days. Schools can ask for any lesson content in another format.`,
      },
      {
        heading: 'Status',
        body: `This statement reflects an internal review of version ${LEGAL_VERSION} of the App. It has not been verified by an outside audit.`,
      },
    ],
  },
];

export function getLegalDocument(id: string | undefined): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.id === id);
}
