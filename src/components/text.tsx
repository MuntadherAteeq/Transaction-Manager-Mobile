import { Text as NativeText, TextProps } from "react-native";
import { useColors } from "../constants/Colors";

export function Text({ style, ...props }: TextProps) {
  const colors = useColors();
  return <NativeText style={[{ color: colors.text }, style]} {...props} />;
}
