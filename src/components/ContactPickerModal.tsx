import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useColors } from "../constants/Colors";
import { Text } from "./text";
import { View } from "./view";

interface ContactPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (contact: { name: string; phone?: string; email?: string }) => void;
}

const ContactPickerModal: React.FC<ContactPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const colors = useColors();

  useEffect(() => {
    if (visible) {
      loadContacts();
    }
  }, [visible]);

  const loadContacts = async () => {
    setLoading(true);
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
      setFilteredContacts(data);
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const query = text.toLowerCase();
    const filtered = contacts.filter((c) => {
      const nameMatch = c.name?.toLowerCase().includes(query);
      const phoneMatch = c.phoneNumbers?.some((p) =>
        p.number?.toLowerCase().includes(query)
      );
      return nameMatch || phoneMatch;
    });
    setFilteredContacts(filtered);
  };

  const renderItem = ({ item }: { item: Contacts.Contact }) => {
    const phone = item.phoneNumbers?.[0]?.number ?? "";
    const email = item.emails?.[0]?.email ?? "";

    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() =>
          onSelect({
            name: item.name ?? "",
            phone,
            email,
          })
        }
      >
        <Text style={styles.contactName}>{item.name}</Text>
        {phone ? <Text style={styles.contactDetails}>{phone}</Text> : null}
        {email ? <Text style={styles.contactDetails}>{email}</Text> : null}
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <Text style={styles.title}>Pick a Contact</Text>
          <TouchableOpacity onPress={onClose} style={styles.exitButton}>
            {/*<X size={24} color="#333" />*/}
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search by name or phone"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Contact List */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#3498db"
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={filteredContacts}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No contacts found.</Text>
            }
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  exitButton: {
    padding: 4,
  },
  searchBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contactItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  contactDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#aaa",
    fontSize: 16,
  },
});

export default ContactPickerModal;
