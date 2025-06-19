import { Image, StyleSheet } from "react-native";
import { Record } from "../../models/Record";
import { useColors } from "@/src/constants/Colors";
import { Text } from "../text";
import { View } from "../view";

export default function RecordListItem(props: { record: Record }) {
  const { date, name, id, phone, total_amount, description, avatar } =
    props.record;

  const isPositive = total_amount >= 0;

  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Image
          source={
            avatar !== ""
              ? { uri: avatar }
              : require("../../../assets/images/Avatar.png")
          }
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>

      {/* Footer Row */}
      <View style={styles.footerRow}>
        <Text
          style={[
            styles.amountText,
            { color: isPositive ? "#16a34a" : "#dc2626" },
          ]}
        >
          {total_amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 80,
      paddingHorizontal: 20,
      position: "relative",
      paddingVertical: 8,
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flex: 1,
    },
    dateText: {
      color: "#a3a3a3",
      fontSize: 14,
      fontFamily: "System",
      flex: 1,
    },
    nameText: {
      color: colors.text,
      fontSize: 18,
      fontFamily: "System",
      flex: 2,
      textAlign: "center",
      marginRight: 70,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      position: "absolute",
      right: 0,
    },
    amountText: {
      fontSize: 16,
      fontFamily: "System",
      fontWeight: "500",
    },
    transactionIdText: {
      color: "#a3a3a3",
      fontSize: 14,
      fontFamily: "System",
    },
    divider: {
      position: "absolute",
      bottom: 0,
      height: 1,
      width: "100%",
      backgroundColor: "#303030",
      opacity: 0.5,
    },
  });
