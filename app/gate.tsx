import { Landing } from '@/components/cape/Landing';

/** Consent gate opened from Home's back button. Always shown, even after onboarding. */
export default function Gate() {
  return <Landing gateMode />;
}
