import type { Verdict } from '@/lib/data/scenarios';
import { C } from '@/lib/colors';

export function verdictColor(verdict: Verdict): string {
  if (verdict === 'best') return C.yes;
  if (verdict === 'ok') return C.maybe;
  return C.no;
}

export function verdictLabel(verdict: Verdict): string {
  if (verdict === 'best') return 'STRONGEST MOVE';
  if (verdict === 'ok') return 'WORKABLE — WITH A CATCH';
  return 'HIGH RISK';
}

export function verdictShort(verdict: Verdict): string {
  if (verdict === 'best') return 'STRONG';
  if (verdict === 'ok') return 'OK';
  return 'RISKY';
}
