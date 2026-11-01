import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ServicesScreen } from '../screens/ServicesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

// Иконки табов из Icons8
const TAB_ICONS = {
  home: 'https://img.icons8.com/fluency/48/news.png',
  services: 'https://img.icons8.com/fluency/48/grid-view.png',
  profile: 'https://img.icons8.com/fluency/48/user-male-circle.png',
};

export const MainTabs = () => {
  const { colors, fontScale } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.tabBar,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12 * fontScale,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Басты бет',
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: TAB_ICONS.home }}
              style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarLabel: 'Сервистер',
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: TAB_ICONS.services }}
              style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ focused }) => (
            <Image
              source={{ uri: TAB_ICONS.profile }}
              style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});