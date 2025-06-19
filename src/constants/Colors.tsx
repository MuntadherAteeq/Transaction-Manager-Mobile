/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useColorScheme } from "react-native";

export type Colors = typeof root;

export const root = {
  text: "#11181C",
  subText: "#687076",
  background: "#f2f2f2",
  foreground: "#fff",
  icon: "#687076",
  primary: "#3498db",
  card: "#fff",
  border: "#E0E0E0",
  input: "#F2F2F2",
  positive: "#008E4A",
  negative: "#D32F2F",
};

export const Colors: { [key: string]: Colors } = {
  light: {
    ...root,
  },
  dark: {
    ...root,
    text: "#ECEDEE",
    background: "#1C1C1C",
    icon: "#9BA1A6",
    card: "#2B2B2B",
    border: "#2B2B2B",
    subText: "#A0A3A7",
    input: "#2C2F33",
    positive: "#02A356",
    negative: "#F44336",
  },
};

export function useColors(): Colors {
  const colorScheme = useColorScheme();
  return Colors[colorScheme === "dark" ? "dark" : "light"];
}
