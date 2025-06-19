import { Assets, HeaderButton } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage } from "./pages/Home";
import { RecordsProvider } from "./models/Record";
import { AddRecord } from "./pages/Add-Record";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load assets
        await Asset.loadAsync([...Assets]);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Optionally render a loading indicator
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RecordsProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddRecord"
              component={AddRecord} // Placeholder for AddRecord component
              options={{
                title: "Add Record",
                headerBackTitle: "Back",
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            />
          </Stack.Navigator>
        </RecordsProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
