import { Tabs } from 'expo-router';
import React from 'react';
import { useFonts } from 'expo-font'; // Import useFonts to load custom fonts
import { Ionicons } from '@expo/vector-icons';
import { ButtonAdd } from '../components/ButtonAdd';
import * as SplashScreen from 'expo-splash-screen';

// Ensure splash screen is managed correctly
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#121212',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Roboto-Mono',
          fontSize: 12, // Adjust the font size as needed
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'diamond' : 'diamond-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="stop"
        options={{
          title: 'Não',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'alert' : 'alert-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Idéias',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'cafe' : 'cafe-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
