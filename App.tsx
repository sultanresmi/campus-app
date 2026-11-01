import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './src/navigation/MainTabs';
import { NewsDetailsScreen } from './src/screens/NewsDetailsScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? 'light' : 'light'} />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}