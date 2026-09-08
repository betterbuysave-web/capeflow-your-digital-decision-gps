// oxlint-disable-next-line eslint-plugin-import/no-unassigned-import
import '../global.css';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import * as DevClient from 'expo-dev-client';
import { HeroUINativeProvider } from 'heroui-native';
import { Uniwind } from 'uniwind';
import {
  ErrorBoundary as ExpoErrorBoundary,
  type ErrorBoundaryProps,
  SplashScreen,
  Stack,
} from 'expo-router';

import { initPostHog } from '@/lib/posthog';
import { registerServiceWorker } from '@/lib/registerServiceWorker';
import { reportErrorToParent } from '@/lib/reportPreviewError';
import { InstallPrompt } from '@/components/InstallPrompt';
import { C } from '@/lib/colors';

/**
 * Custom ErrorBoundary that reports React render errors to the parent window (Bilt preview iframe)
 * and then renders the default Expo error UI.
 */
function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    if (Platform.OS === 'web' && error) {
      const message = [error.message, error.stack].filter(Boolean).join('\n');
      reportErrorToParent(message);
    }
  }, [error]);
  return <ExpoErrorBoundary error={error} retry={retry} />;
}

export { ErrorBoundary };

// CAPE FLOW Youth Edition is a daylight, paper-first experience.
Uniwind.setTheme('light');

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    BebasNeue_400Regular,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });

  // Report uncaught JS errors and unhandled promise rejections to parent (Bilt preview iframe)
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;

    const handleError = (event: ErrorEvent) => {
      const message = event.error?.stack ?? event.message ?? 'Unknown error';
      reportErrorToParent(message);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const err = event.reason;
      const message =
        err instanceof Error ? [err.message, err.stack].filter(Boolean).join('\n') : String(err);
      reportErrorToParent(message);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&display=swap';
      const existingLink = document.querySelector('link[data-cape-fonts="1"]');

      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.crossOrigin = 'anonymous';
        link.dataset.capeFonts = '1';
        document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
    if (__DEV__ && Platform.OS !== 'web' && !isExpoGo) {
      const timer = setTimeout(() => {
        DevClient.closeMenu();
        DevClient.hideMenu();
      }, 1000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') {
      initPostHog();
    }
  }, []);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: C.paper }}>
      <HeroUINativeProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: C.paper },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'CAPE Flow' }} />
          <Stack.Screen name="(tabs)" options={{ title: 'CAPE Flow' }} />
          <Stack.Screen name="onboarding" options={{ title: 'Get Started' }} />
          <Stack.Screen
            name="sample"
            options={{
              title: 'Sample Scenario',
              presentation: 'modal',
              contentStyle: { backgroundColor: C.paper },
            }}
          />
          <Stack.Screen name="parents" options={{ title: 'Parents & Schools' }} />
          <Stack.Screen name="module/[id]" options={{ title: 'Module' }} />
          <Stack.Screen name="sim/[id]" options={{ title: 'Midnight Sim' }} />
          <Stack.Screen name="tools/consent-cafe" options={{ title: 'Consent Café' }} />
          <Stack.Screen name="tools/ghost-vault" options={{ title: 'Digital Ghost Vault' }} />
          <Stack.Screen name="tools/safety-circle" options={{ title: 'Safety Circle' }} />
          <Stack.Screen name="tools/pep-clock" options={{ title: 'PEP Clock' }} />
          <Stack.Screen name="badges" options={{ title: 'Badges' }} />
          <Stack.Screen name="clinic-finder" options={{ title: 'Clinic Finder' }} />
          <Stack.Screen name="adherence-settings" options={{ title: 'Adherence Settings' }} />
          <Stack.Screen name="about-cape" options={{ title: 'About CAPE Flow' }} />
          <Stack.Screen name="protection-blueprint" options={{ title: 'Protection Blueprint' }} />
          <Stack.Screen name="educational-library" options={{ title: 'Educational Library' }} />
          <Stack.Screen name="emergency-directory" options={{ title: 'Emergency Directory' }} />
        </Stack>
        <InstallPrompt />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
