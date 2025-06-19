import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButton, Text } from "@react-navigation/elements";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { Updates } from "./screens/Updates";
import { NotFound } from "./screens/NotFound";
import { useColors } from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Updates} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// Wrapper for Profile to inject route props
function ProfileWrapper(props: any) {
  // React Navigation v6+ passes route/props automatically
  // If needed, you can add logic here
  return <Profile {...props} />;
}
export function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileWrapper} options={{}} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ navigation }) => ({
          presentation: "modal",
          headerRight: () => (
            <HeaderButton onPress={navigation.goBack}>
              <Text>Close</Text>
            </HeaderButton>
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "404" }}
      />
    </Stack.Navigator>
  );
}
