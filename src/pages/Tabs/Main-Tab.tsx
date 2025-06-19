import RecordListItem from "@/src/components/Record/Record-Item";
import { useColors } from "@/src/constants/Colors";
import { useRecords } from "@/src/models/Record";
import React from "react";
import { FlatList } from "react-native";

// Home Screen Component
export function MainTab() {
  const colors = useColors();
  const { records } = useRecords();
  return (
    <FlatList
      data={records}
      renderItem={({ item }) => <RecordListItem record={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}
