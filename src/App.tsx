import { Assets, HeaderButton } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "./components/text";
import { HomePage } from "./pages/Home";
import { RecordsProvider } from "./models/Record";

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
          </Stack.Navigator>
        </RecordsProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
