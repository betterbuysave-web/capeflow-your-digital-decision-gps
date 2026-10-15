import { useCallback } from 'react';
import { Platform } from 'react-native';
import { useFocusEffect, usePathname } from 'expo-router';

/** The search title for the app's front page; keep in sync with app.config.ts web.name. */
export const HOME_TITLE = 'CAPE Flow: Your Digital Decision GPS | Youth Empowerment';

/** Sets the browser tab / search title for the current screen on web. */
export function usePageTitle(title: string | undefined, app: string) {
  const pathname = usePathname();
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'web' || typeof document === 'undefined') return;
      document.title = pathname === '/' || !title ? HOME_TITLE : `${title} | ${app}`;
    }, [title, app, pathname]),
  );
}
