import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Compass, LifeBuoy, Moon, User, Wrench } from 'lucide-react-native';

import { C, alpha } from '@/lib/colors';

export default function TabLayout() {
  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object -- expo-status-bar's `style` prop is a string enum, not an RN style object */}
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: C.ink },
          tabBarStyle: {
            backgroundColor: C.ink2,
            borderTopColor: alpha('#ffffff', 0.07),
            borderTopWidth: 1,
            elevation: 0,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
          tabBarActiveTintColor: C.teal,
          tabBarInactiveTintColor: alpha(C.slateFaint, 0.6),
          tabBarLabelStyle: {
            fontFamily: 'JetBrainsMono_700Bold',
            fontSize: 9,
            letterSpacing: 1,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'COMPASS',
            tabBarIcon: ({ color, size }) => <Compass color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: 'M.A.T.C.H.',
            tabBarIcon: ({ color, size }) => <Moon color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: 'TOOLS',
            tabBarIcon: ({ color, size }) => <Wrench color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="crisis"
          options={{
            title: 'CRISIS',
            tabBarIcon: ({ color, size }) => <LifeBuoy color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: 'ME',
            tabBarIcon: ({ color, size }) => <User color={color} size={size ?? 24} />,
          }}
        />
      </Tabs>
    </>
  );
}
