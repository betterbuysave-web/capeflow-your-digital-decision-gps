import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  CompassIcon,
  FieldKitIcon,
  GpsIcon,
  MyGearIcon,
  SosIcon,
} from '@/components/cape/TabIcons';
import { C, alpha } from '@/lib/colors';

export default function TabLayout() {
  return (
    <>
      {/* eslint-disable-next-line react/style-prop-object -- expo-status-bar's `style` prop is a string enum, not an RN style object */}
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: C.paper },
          tabBarStyle: {
            backgroundColor: C.paper2,
            borderTopColor: alpha(C.tealBright, 0.35),
            borderTopWidth: 1,
            elevation: 0,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
          },
          tabBarActiveTintColor: C.teal,
          tabBarInactiveTintColor: alpha(C.inkFaint, 0.8),
          tabBarLabelStyle: {
            fontFamily: 'SpaceMono_700Bold',
            fontSize: 9,
            letterSpacing: 1,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'GPS',
            tabBarLabel: 'GPS',
            tabBarIcon: ({ color, focused }) => <GpsIcon color={color} focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: 'COMPASS',
            tabBarLabel: 'COMPASS',
            tabBarIcon: ({ color, focused }) => <CompassIcon color={color} focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="tools"
          options={{
            title: 'FIELD KIT',
            tabBarLabel: 'FIELD KIT',
            tabBarIcon: ({ color, focused }) => <FieldKitIcon color={color} focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="crisis"
          options={{
            title: 'SOS',
            tabBarActiveTintColor: C.flame,
            tabBarLabel: 'SOS',
            tabBarIcon: ({ color, focused }) => <SosIcon color={color} focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: 'MY GEAR',
            tabBarLabel: 'MY GEAR',
            tabBarIcon: ({ color, focused }) => <MyGearIcon color={color} focused={focused} />,
          }}
        />
      </Tabs>
    </>
  );
}
