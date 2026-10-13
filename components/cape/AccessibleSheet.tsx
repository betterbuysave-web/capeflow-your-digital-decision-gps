import { useRef, type ReactNode } from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { X } from 'lucide-react-native';

import { Display, Eyebrow } from '@/components/cape/Type';
import { GradientAction } from '@/components/cape/Buttons';
import { C, alpha } from '@/lib/colors';

/** Notebook sheet with separate backdrop, a focused heading, and a fixed footer. */
export function AccessibleSheet({
  visible,
  onClose,
  title,
  eyebrow,
  tint = C.teal,
  children,
  footer,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  tint?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { height } = useWindowDimensions();
  const headingRef = useRef<View>(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      onShow={() => {
        if (Platform.OS !== 'web' && headingRef.current) {
          const handle = findNodeHandle(headingRef.current);
          if (handle !== null) AccessibilityInfo.setAccessibilityFocus(handle);
        }
      }}
    >
      <KeyboardAvoidingView
        className="flex-1 justify-end"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable
          accessible={false}
          focusable={false}
          importantForAccessibility="no"
          onPress={onClose}
          className="absolute inset-0"
          style={{ backgroundColor: alpha(C.ink, 0.45) }}
        />
        <View
          role="dialog"
          aria-modal
          accessibilityViewIsModal
          accessibilityLabel={title}
          className="bg-paper-2 pb-safe rounded-t-3xl"
          style={{ maxHeight: height * 0.9, borderTopWidth: 2, borderTopColor: alpha(tint, 0.6) }}
        >
          <View className="flex-row items-start gap-3 px-5 pt-5 pb-3">
            <View
              ref={headingRef}
              accessible
              accessibilityRole="header"
              accessibilityLabel={title}
              className="flex-1"
            >
              {eyebrow ? <Eyebrow color={tint}>{eyebrow}</Eyebrow> : null}
              <Display className="mt-1.5 text-3xl">{title}</Display>
            </View>
            <GradientAction
              accessibilityLabel={`Close ${title}`}
              onPress={onClose}
              className="h-11 w-11 shrink-0 items-center justify-center rounded-full"
            >
              <X size={15} color={C.paper2} />
            </GradientAction>
          </View>
          <ScrollView
            style={{ maxHeight: height * 0.58 }}
            contentContainerClassName="px-5 pb-5"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
          {footer ? <View className="px-5 pb-5">{footer}</View> : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
