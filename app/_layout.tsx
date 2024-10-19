import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from "expo-router";
import { GoalContextProvider } from "./hooks/goals";
import { TaskContextProvider } from "./hooks/tasksHook";
import { StopContextProvider } from "./hooks/stopHook";
import { IdeaContextProvider } from "./hooks/ideaHook";
import { ThemeProvider } from './hooks/themeContext'; 

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Roboto-Mono': require('./assets/fonts/Roboto_Mono/RobotoMono-VariableFont_wght.ttf'),
    'Barlow-Condensed': require('@expo-google-fonts/barlow-condensed/BarlowCondensed_400Regular.ttf'),
  });

  useEffect(() => {
    let hideSplashTimeout: string | number | NodeJS.Timeout | undefined;

    if (fontsLoaded) {
      hideSplashTimeout = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 7000); // 7000 milissegundos = 7 segundos
    }

    return () => {
      if (hideSplashTimeout) {
        clearTimeout(hideSplashTimeout); // Limpa o timeout se o componente desmontar
      }
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Retorna null enquanto as fontes não carregam
  }

  return (
    <ThemeProvider>
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
                    fontFamily: 'Barlow-Condensed',
                  },
                }}>
                <Stack.Screen 
                  name="(tabs)" 
                  options={{ 
                    title: "Voi", // Removido espaço extra
                    headerTitleStyle: { 
                      fontFamily: 'Barlow-Condensed',
                      fontSize: 24,
                    },
                  }} 
                />
                <Stack.Screen name="index" options={{ title: " " }} />
              </Stack>
            </IdeaContextProvider>
          </StopContextProvider>
        </TaskContextProvider>
      </GoalContextProvider>
    </ThemeProvider>
  );
}
