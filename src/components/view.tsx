import { View as NativeView, ViewProps } from "react-native";
import { useColors } from "../constants/Colors";
export function View({ style, ...props }: ViewProps) {
  const colors = useColors();
  return (
    <NativeView
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    />
  );
}
