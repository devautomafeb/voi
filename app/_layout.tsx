import React, { useEffect } from 'react';
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
    'Barlow-Condensed': require('@expo-google-fonts/barlow-condensed/BarlowCondensed_400Regular.ttf'),
  });

  useEffect(() => {
    let hideSplashTimeout: string | number | NodeJS.Timeout | undefined;

    if (fontsLoaded) {
      // Aguarde 4 segundos antes de ocultar a splash screen
      hideSplashTimeout = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 4000); // 4000 milissegundos = 4 segundos
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
                  fontFamily: 'Roboto-Mono', // Fonte padrão para os títulos
                },
              }}>
              <Stack.Screen 
                name="(tabs)" 
                options={{ 
                  title: " VOI ", 
                  headerTitleStyle: { 
                    fontFamily: 'Barlow-Condensed', // Aplicando a fonte Barlow Condensed
                    fontSize: 24, // Ajuste o tamanho do título se necessário
                  },
                }} 
              />
              <Stack.Screen name="index" options={{ title: "  " }} />
            </Stack>
          </IdeaContextProvider>
        </StopContextProvider>
      </TaskContextProvider>
    </GoalContextProvider>
  );
}
