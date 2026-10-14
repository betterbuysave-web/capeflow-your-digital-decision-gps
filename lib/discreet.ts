/**
 * Discreet mode keeps CAPE Flow private on a shared phone: a 4-digit PIN
 * on open, and no PEP countdown on Home or Crisis.
 *
 * The PIN is stored hashed, not encrypted. It is a privacy screen against a
 * sibling or parent picking up the phone, not protection against a
 * determined attacker with the device.
 */
const SALT = 'cape-flow-discreet-v1';

export function hashPin(pin: string): string {
  // FNV-1a, 32-bit.
  let hash = 0x811c9dc5;
  for (const ch of SALT + pin) {
    hash ^= ch.charCodeAt(0);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export const PIN_LENGTH = 4;
