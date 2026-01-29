import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="arc"
        options={{
          title: 'Arc',
        }}
      />
      <Tabs.Screen
        name="bezier"
        options={{
          title: 'Bezier',
        }}
      />

      <Tabs.Screen
        name="arcdash"
        options={{
          title: 'ArcDash',
        }}
      />
      <Tabs.Screen
        name="line"
        options={{
          title: 'Interpolate',
        }}
      />
    </Tabs>
  );
}
