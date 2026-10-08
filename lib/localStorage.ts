import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

export const CAPE_STORAGE_KEY = 'cape-flow-v1';
export const IOS_HINT_DISMISSED_KEY = 'pwa-ios-install-hint-dismissed';

// Order writes and erasure so an earlier queued save cannot restore deleted entries.
let pendingMutation: Promise<void> = Promise.resolve();
function enqueueMutation(mutation: () => Promise<void>): Promise<void> {
  const result = pendingMutation.then(mutation);
  pendingMutation = result.catch(() => undefined);
  return result;
}

export const capeStorage: StateStorage = {
  getItem: async (key) => {
    await pendingMutation;
    return AsyncStorage.getItem(key);
  },
  setItem: (key, value) => enqueueMutation(() => AsyncStorage.setItem(key, value)),
  removeItem: (key) => enqueueMutation(() => AsyncStorage.removeItem(key)),
};
