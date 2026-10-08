import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { type ReminderTone, parseTime, toneInfo } from '@/lib/data/adherence';

/**
 * Local notification scheduling for the Adherence Settings screen.
 *
 * Everything here runs on the device: a reminder is one weekly trigger per
 * selected weekday, scheduled by the OS. Nothing leaves the phone, and web
 * calls are no-ops so the schedule can still be edited in a browser tab.
 */

export const notificationsSupported = Platform.OS !== 'web';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function channelId(tone: ReminderTone): string {
  return `cape-${tone}`;
}

/** Android needs one channel per tone; iOS ignores this entirely. */
async function ensureChannel(tone: ReminderTone): Promise<void> {
  if (Platform.OS !== 'android') return;
  const info = toneInfo(tone);
  await Notifications.setNotificationChannelAsync(channelId(tone), {
    name: `CAPE Flow · ${info.label}`,
    importance: info.high
      ? Notifications.AndroidImportance.MAX
      : Notifications.AndroidImportance.DEFAULT,
    sound: info.sound ? 'default' : null,
    vibrationPattern: info.vibration.length > 0 ? info.vibration : undefined,
    enableVibrate: info.vibration.length > 0,
  });
}

/** True when the device will actually deliver reminders. */
export async function permissionGranted(): Promise<boolean> {
  if (!notificationsSupported) return false;
  const { granted } = await Notifications.getPermissionsAsync();
  return granted;
}

/** Asks once, then reports the standing answer. */
export async function requestPermission(): Promise<boolean> {
  if (!notificationsSupported) return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  const next = await Notifications.requestPermissionsAsync();
  return next.granted;
}

export interface ScheduleInput {
  label: string;
  body: string;
  time: string;
  days: number[];
  tone: ReminderTone;
}

/** Schedules one weekly trigger per selected day. Returns the ids to cancel later. */
export async function scheduleReminder(input: ScheduleInput): Promise<string[]> {
  if (!notificationsSupported) return [];
  if (input.days.length === 0) return [];
  const allowed = await requestPermission();
  if (!allowed) return [];

  await ensureChannel(input.tone);
  const { hour, minute } = parseTime(input.time);
  const info = toneInfo(input.tone);

  const ids: string[] = [];
  for (const day of input.days) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: input.label,
        body: input.body,
        sound: info.sound,
        vibrate: info.vibration.length > 0 ? info.vibration : undefined,
        interruptionLevel: info.high ? 'timeSensitive' : 'active',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        // expo-notifications weekdays run 1 (Sunday) to 7 (Saturday).
        weekday: day + 1,
        hour,
        minute,
        channelId: Platform.OS === 'android' ? channelId(input.tone) : undefined,
      },
    });
    ids.push(id);
  }
  return ids;
}

export async function cancelReminder(ids: string[]): Promise<void> {
  if (!notificationsSupported) return;
  await Promise.all(
    ids.map((id) =>
      Notifications.cancelScheduledNotificationAsync(id).catch(() => {
        // Already fired or cleared by the OS — nothing left to cancel.
      }),
    ),
  );
}

export async function cancelAllReminders(): Promise<void> {
  if (!notificationsSupported) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.dismissAllNotificationsAsync();
}
