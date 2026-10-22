import type { ConfigContext, ExpoConfig } from '@expo/config';

type ExpoPlugins = NonNullable<ExpoConfig['plugins']>;

export default ({ config }: ConfigContext): ExpoConfig => {
  const nativePlugins: ExpoPlugins =
    process.env.EXPO_PLATFORM === 'native'
      ? [['expo-dev-client', { launchMode: 'most-recent' }], 'react-native-maps']
      : [];

  return {
    ...config,
    name: 'CAPE Flow',
    slug: 'capeflow',
    version: process.env.BILT_APP_VERSION ?? '1.0.0',
    orientation: 'portrait',
    icon: './assets/app-icon/app-icon.png',
    userInterfaceStyle: 'automatic',
    scheme: 'capeflow',
    runtimeVersion: {
      policy: 'appVersion',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      supportsTablet: true,
      bundleIdentifier: process.env.BILT_IOS_BUNDLE_ID ?? 'com.yourcompany.yourapp',
    },
    android: {
      allowBackup: false,
      package: process.env.BILT_ANDROID_PACKAGE ?? 'com.yourcompany.yourapp',
      adaptiveIcon: {
        foregroundImage: './assets/app-icon/adaptive-foreground.png',
        backgroundColor: '#F6F1E3',
      },
    },
    web: {
      bundler: 'metro',
      // 'single' = SPA export: one index.html + client routing, so edge serving
      // needs only a single 404→index.html fallback rule.
      output: 'single',
      favicon: './public/icons/favicon.png',
      // Browser tab / search title (substituted into public/index.html).
      name: 'CAPE Flow: Your Digital Decision GPS | Youth Empowerment',
      shortName: 'CAPE Flow',
      description:
        'Free youth decision app: Consent Café, Strongest Voice Script Lab, 3-Second Rule practice and a SafER Score. No sign-ups. Everything stays on your phone.',
      themeColor: '#F6F1E3',
      backgroundColor: '#F6F1E3',
    },
    extra: {
      appStoreAppId: process.env.BILT_APP_STORE_APP_ID,
    },
    plugins: [
      'expo-router',
      'expo-font',
      [
        'expo-location',
        {
          locationWhenInUsePermission:
            'CAPE Flow uses your location only when you tap Use my location, to find your ZIP code on this device. It is never saved or sent.',
        },
      ],
      ...nativePlugins,
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  };
};
