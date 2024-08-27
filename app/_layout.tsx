import React, { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from "expo-router";
import { GoalContextProvider } from "./hooks/goals";
import { TaskContextProvider } from "./hooks/tasksHook";
import { StopContextProvider } from "./hooks/stopHook";
import { IdeaContextProvider } from "./hooks/ideaHook";

// Mantenha a splash screen visível enquanto as fontes carregam
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Roboto-Mono': require('./assets/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Oculta a splash screen quando as fontes forem carregadas
    }
  }, [fontsLoaded]);

  return (
    <GoalContextProvider>
      <TaskContextProvider>
        <StopContextProvider>
          <IdeaContextProvider>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#030303',
                },
                headerTintColor: '#fefefe',
                headerTitleStyle: { 
                  fontSize: 20,
                },
              }}>
              <Stack.Screen name="(tabs)" options={{ title: " VOI " }} />
              <Stack.Screen name="index" options={{ title: "  " }} />
            </Stack>
          </IdeaContextProvider>
        </StopContextProvider>
      </TaskContextProvider>
    </GoalContextProvider>
  );
}
