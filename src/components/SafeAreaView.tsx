import {
  SafeAreaView as SafeArea,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { useColors } from "../constants/Colors";

export function SafeAreaView(props: SafeAreaViewProps) {
  const colors = useColors();
  return (
    <SafeArea
      style={[
        { backgroundColor: colors.background, flex: 1 },
        ...(Array.isArray(props.style) ? props.style : [props.style]),
      ]}
      {...props}
    />
  );
}
