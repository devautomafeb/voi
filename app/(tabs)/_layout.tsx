import { Tabs } from 'expo-router';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { ButtonAdd } from '../components/ButtonAdd';

export default function TabLayout() {
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#121212',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{

          title: 'Projetos',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'diamond' : 'diamond-outline'} color={color} size = {size}/>
          )
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size = {size} />
          ),
        
        }}
      />
       <Tabs.Screen
        name="forbiden"
        options={{
          title: 'Proibido',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'alert' : 'alert-outline'} color={color} size = {size} />
          ),
         
        }}
      />
       <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size = {size} />
          ),
        }}
      />
    </Tabs>
  );
}
