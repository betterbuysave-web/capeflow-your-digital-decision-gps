export type BoundaryAnswer = 'yes' | 'maybe' | 'no';

export interface BoundaryItem {
  id: string;
  emoji: string;
  label: string;
  section: string;
}

export const BOUNDARY_MENU: BoundaryItem[] = [
  { id: 'high-fives', emoji: '🙌', label: 'High-fives', section: 'PHYSICAL' },
  { id: 'hugs', emoji: '🤗', label: 'Hugs', section: 'PHYSICAL' },
  { id: 'hand-holding', emoji: '🤝', label: 'Hand-holding', section: 'PHYSICAL' },
  { id: 'shoulder-lean', emoji: '🫂', label: 'Leaning on me', section: 'PHYSICAL' },
  { id: 'share-location', emoji: '📍', label: 'Share my location', section: 'DIGITAL' },
  { id: 'tag-photos', emoji: '🏷️', label: 'Tag me in photos', section: 'DIGITAL' },
  { id: 'read-dms', emoji: '📱', label: 'Read my messages', section: 'DIGITAL' },
  { id: 'post-about-me', emoji: '📢', label: 'Post about us', section: 'DIGITAL' },
  { id: 'late-calls', emoji: '🌙', label: 'Calls after midnight', section: 'TIME' },
  { id: 'unannounced', emoji: '🚪', label: 'Showing up unannounced', section: 'TIME' },
  { id: 'borrow-stuff', emoji: '🎒', label: 'Borrowing my stuff', section: 'TIME' },
  { id: 'meet-family', emoji: '🏠', label: 'Meeting my family', section: 'TIME' },
];

export const BOUNDARY_SECTIONS = ['PHYSICAL', 'DIGITAL', 'TIME'] as const;

export interface FriesLetter {
  letter: string;
  word: string;
  detail: string;
}

export const FRIES: FriesLetter[] = [
  { letter: 'F', word: 'Freely given', detail: 'No pressure, no guilt, no debt.' },
  { letter: 'R', word: 'Reversible', detail: 'Yes can become no at any moment.' },
  { letter: 'I', word: 'Informed', detail: 'Nobody agreed to something hidden from them.' },
  { letter: 'E', word: 'Enthusiastic', detail: 'Wanting it, not tolerating it.' },
  { letter: 'S', word: 'Specific', detail: 'One yes is not a yes to everything.' },
];
