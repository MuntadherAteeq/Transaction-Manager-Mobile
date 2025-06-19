import RecordListItem from "@/src/components/Record/Record-Item";
import { useColors } from "@/src/constants/Colors";
import { useRecords } from "@/src/models/Record";
import { Button } from "@react-navigation/elements";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";

// Home Screen Component
// Define your stack param list to type navigation correctly
type RootStackParamList = {
  MainTab: undefined;
  AddRecord: undefined;
};

export function MainTab() {
  const { records } = useRecords();
  const colors = useColors();
  const nav = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <FlatList
        data={records}
        renderItem={({ item }) => (
          <RecordListItem key={item.id} record={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        style={{ flex: 1, backgroundColor: colors.background }}
      />
      <Button
        onPressIn={() => {
          nav.navigate("AddRecord");
        }}
      >
        Go to Add Record
      </Button>
    </>
  );
}
