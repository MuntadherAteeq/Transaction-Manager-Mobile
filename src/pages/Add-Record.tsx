import * as Contacts from "expo-contacts";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Record, useRecords } from "../models/Record";
import { Colors, useColors } from "../constants/Colors";
import ContactPickerModal from "../components/ContactPickerModal";
import { Text } from "../components/text";
import { View } from "../components/view";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "../components/SafeAreaView";

export const AddRecord = () => {
  const [formData, setFormData] = useState(new Record());

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showContactModal, setShowContactModal] = useState(false);

  const colors = useColors();
  const styles = createStyles(colors);
  const validateForm = () => {
    const newErrors = {
      id: "",
      name: "",
      email: "",
      phone: "",
      total_amount: "",
      date: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = "Please enter a valid email address";
    // }

    // if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
    //   newErrors.phone = "Please enter a valid phone number";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const importFromContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Cannot access contacts.");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      setShowContactModal(true);
    } else {
      Alert.alert("No Contacts", "No contacts found in your address book.");
    }
  };

  const handleInputChange = (field: keyof Record, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImagePicker = () => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      if (!result.canceled) {
        formData.avatar = result.assets[0].uri;
        setFormData((prev) => ({
          ...prev,
          avatar: result.assets[0].uri,
        }));
      }
    };
    pickImage();
  };

  const { records, addRecord } = useRecords();

  const handleSubmit = () => {
    Alert.alert(
      "Confirm Save",
      "Are you sure you want to save this customer?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            addRecord(formData);
            setFormData(
              new Record("", "", "", "", new Date().toISOString(), "", "", 0)
            );
            setErrors({});
            Alert.alert("Success", "Customer saved successfully!");
          },
        },
      ]
    );
    if (validateForm()) {
      const customerRecord = {
        ...formData,
        total_amount: formData.total_amount || 0,
        date: new Date().toISOString(),
      };
    }
  };

  const handleReset = () => {
    setFormData(
      new Record("", "", "", "", new Date().toISOString(), "", "", 0)
    );
    setErrors({});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            <Pressable style={styles.importButton} onPress={importFromContacts}>
              <Text style={styles.importButtonText}>Import from Contacts</Text>
            </Pressable>

            {/* Avatar Section */}
            <View style={styles.CustomerCard}>
              <View>
                <TouchableOpacity
                  style={styles.avatarContainer}
                  onPress={handleImagePicker}
                >
                  {formData.avatar ? (
                    <Image
                      source={{ uri: formData.avatar }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <Ionicons
                        name="camera-outline"
                        size={24}
                        color={colors.icon}
                      />
                      <Text style={styles.avatarText}>Add Photo</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.avatarTextContainer}>
                <Text style={{ fontSize: 17 }}>{formData.name}</Text>
                <Text style={{ fontSize: 12, color: colors.subText }}>
                  {formData.phone}
                </Text>
              </View>
            </View>

            {/* Name Field - Required */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, styles.required]}>Full Name *</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.icon} />
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  placeholder="Enter full name"
                  placeholderTextColor="#999"
                />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Phone Field - Optional */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color={colors.icon} />
                <TextInput
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange("phone", value)}
                  placeholder="Enter phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Email Field - Optional */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={colors.icon} />
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Enter email address"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Date Field - Auto-filled */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date Created</Text>
              <View style={[styles.inputContainer, styles.disabledInput]}>
                <Ionicons name="calendar-outline" style={styles.inputIcon} />
                <Text style={styles.dateText}>
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Ionicons name="save-outline" size={18} color="#fff" />
                <Text style={styles.submitButtonText}>Save Customer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <ContactPickerModal
          visible={showContactModal}
          onClose={() => setShowContactModal(false)}
          onSelect={(contact) => {
            setFormData((prev) => ({
              ...prev,
              name: contact.name,
              phone: contact.phone ?? "",
              email: contact.email ?? "",
            }));
            setShowContactModal(false);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (colors: Colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.input,
    },
    header: {
      backgroundColor: colors.background,
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.subText,
    },
    form: {
      backgroundColor: colors.background,
      margin: 16,
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    CustomerCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderColor: colors.border,
      borderWidth: 1,
      marginBottom: 24,
      padding: 16,
      borderRadius: 12,
    },
    avatarTextContainer: {
      flex: 1,

      marginLeft: 16,
      justifyContent: "center",
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 50,

      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
    avatarPlaceholder: {
      width: "100%",
      height: "100%",
      backgroundColor: colors.input,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.border,
    },
    avatarText: {
      marginTop: 4,
      fontSize: 12,
      color: "#666",
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333",
      marginBottom: 8,
    },
    required: {
      color: "#e74c3c",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: colors.input,
    },
    disabledInput: {
      backgroundColor: colors.input,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
    },
    dateText: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: "#666",
    },
    errorText: {
      color: "#e74c3c",
      fontSize: 12,
      marginTop: 4,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    resetButton: {
      flex: 1,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    resetButtonText: {
      color: "#666",
      fontSize: 16,
      fontWeight: "600",
    },
    submitButton: {
      flex: 2,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
      backgroundColor: "#3498db",
      borderRadius: 8,
      gap: 8,
    },
    submitButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    importButton: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      borderRadius: 8,
      marginBottom: 20,
      alignItems: "center",
    },
    importButtonText: {
      fontSize: 16,
      fontWeight: "600",
    },
  });
};
