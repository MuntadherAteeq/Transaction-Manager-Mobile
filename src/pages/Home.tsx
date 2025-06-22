import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useColors } from "../constants/Colors";
import { MainTab } from "./Tabs/Main-Tab";
import { HistoryTab } from "./Tabs/History-Tab";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export function HomePage() {
  const colors = useColors();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarScrollEnabled: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.subText,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: colors.card,
            borderBottomWidth: 0,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 }, // increased height
            shadowOpacity: 1, // increased opacity
            shadowRadius: 6, // increased radius for more blur
            elevation: 8, // for Android shadow
          },
        })}
      >
        <Tab.Screen name="Home" component={MainTab} />
        <Tab.Screen name="Settings" component={HistoryTab} />
        {/* {/* <Tab.Screen name="Profile" component={} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
