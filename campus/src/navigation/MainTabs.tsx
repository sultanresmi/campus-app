import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types/navigation';
import NewsScreen from '../screens/NewsScreen'; // Импортируем экран новостей вместо Home
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1E62DC', // Активный синий цвет по макету
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { 
          height: 65, 
          paddingBottom: 10, 
          paddingTop: 10, 
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0'
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          // Настраиваем иконки под макет Лабораторной №8
          if (route.name === 'Home') {
            iconName = 'newspaper-outline'; // Иконка газеты для списка новостей (Басты бет)
          } else if (route.name === 'Services') {
            iconName = 'grid-outline';      // Иконка сетки для Сервисов (Кесте)
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';    // Иконка профиля (Профиль)
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      {/* Привязываем компонент NewsScreen к первой вкладке */}
      <Tab.Screen 
        name="Home" 
        component={NewsScreen} 
        options={{ tabBarLabel: 'Басты бет' }} 
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen} 
        options={{ tabBarLabel: 'Сервистер' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarLabel: 'Профиль' }} 
      />
    </Tab.Navigator>
  );
}
