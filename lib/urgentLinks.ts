import { Alert, Linking, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function smsURL(number: string, body: string) {
  return `sms:${number}${Platform.OS === 'ios' ? '&' : '?'}body=${encodeURIComponent(body)}`;
}

export async function openUrgentLink(url: string) {
  try {
    await Linking.openURL(url);
  } catch {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
    const number = url.match(/^(?:tel|sms):([^?&]+)/)?.[1];
    Alert.alert(
      'Could not open this action',
      number
        ? `Use your phone to call or text ${number}. In immediate danger in the U.S., call 911. You do not need to finish the pause.`
        : 'Try opening the website in your browser. In immediate danger in the U.S., call 911.',
      [
        { text: 'Close', style: 'cancel' },
        { text: 'Try again', onPress: () => void openUrgentLink(url) },
      ],
    );
  }
}
