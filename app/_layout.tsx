
import { Stack } from "expo-router";
import { GoalContextProvider } from "./hooks/goals";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";


export default function RootLayout() {

  return (
    <GoalContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#030303',
          },
          headerTintColor: '#fefefe'
        }}>
        <Stack.Screen name="(tabs)" options={{ title: " VOI " }} />
        <Stack.Screen name="index" options={{ title: "  " }} />
      </Stack>
    </GoalContextProvider>
  
  );
}
