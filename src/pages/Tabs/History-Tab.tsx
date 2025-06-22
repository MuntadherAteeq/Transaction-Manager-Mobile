import { View } from "@/src/components/view";
import { Text } from "@/src/components/text";
import { Image } from "react-native";
import { Record } from "@/src/models/Record";
import { useColors } from "@/src/constants/Colors";

export function HistoryTab({ record }: { record?: Record }) {
  record = new Record(
    0,
    "John Doe",
    "1234567890",
    "email@gmail.com",
    "2023-10-01",
    "",
    "Sample description",
    100.0
  );

  const colors = useColors();
  return (
    <View style={{ height: 100, backgroundColor: "red", flexDirection: "row" }}>
      {/* Left */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/Avatar.png")}
          style={{ width: 62, height: 62, borderRadius: 62 / 2, margin: 10 }}
        />
      </View>
      {/* right */}
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 25,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "red",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{record.name}</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "green",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{record.date}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "blue",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>3</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "orange",
                margin: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>4</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            bottom: 0,
            height: 1,
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            backgroundColor: "red",
          }}
        />
      </View>
    </View>
  );
}
