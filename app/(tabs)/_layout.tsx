import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="createAccount"
        options={{
          title: 'Create Account',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="homePage"
        options={{ tabBarButton: () => null }}
        // options={{
        //   title: 'HomePage',
        //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        // }}
      />
      <Tabs.Screen
        name="createPost"
        options={{ tabBarButton: () => null }}
        // options={{
        //   title: 'HomePage',
        //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        // }}
      />
      <Tabs.Screen
        name="posts"
        options={{ tabBarButton: () => null }}
        // options={{
        //   title: 'HomePage',
        //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        // }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
