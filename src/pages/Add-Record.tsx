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
import { useNavigation } from "@react-navigation/native";

export const AddRecord = () => {
  const [formData, setFormData] = useState(new Record());

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showContactModal, setShowContactModal] = useState(false);
  const navigator = useNavigation();

  const colors = useColors();
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
              new Record(0, "", "", "", new Date().toISOString(), "", "", 0)
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
    setFormData(new Record(0, "", "", "", new Date().toISOString(), "", "", 0));
    setErrors({});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: colors.card,
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
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                marginBottom: 20,
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={colors.icon}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                onPress={() => {
                  navigator.goBack();
                }}
              />
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  flexGrow: 1,
                }}
                onPress={importFromContacts}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Import from Contacts
                </Text>
              </Pressable>
            </View>

            {/* Avatar Section */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderColor: colors.border,
                borderWidth: 1,
                marginBottom: 24,
                padding: 16,
                borderRadius: 12,
              }}
            >
              <View>
                <TouchableOpacity
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#ddd",
                  }}
                  onPress={handleImagePicker}
                >
                  {formData.avatar ? (
                    <Image
                      source={{ uri: formData.avatar }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: colors.input,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 2,
                        borderColor: colors.border,
                      }}
                    >
                      <Ionicons
                        name="camera-outline"
                        size={24}
                        color={colors.icon}
                      />
                      <Text
                        style={{
                          marginTop: 4,
                          fontSize: 12,
                          color: "#666",
                        }}
                      >
                        Add Photo
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: 16,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 17 }}>{formData.name}</Text>
                <Text style={{ fontSize: 12, color: colors.subText }}>
                  {formData.phone}
                </Text>
              </View>
            </View>

            {/* Name Field - Required */}
            <View
              style={{
                marginBottom: 20,
                backgroundColor: colors.card,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: 8,
                }}
              >
                Full Name{" "}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  backgroundColor: colors.background,
                }}
              >
                <Ionicons name="person-outline" size={20} color={colors.icon} />
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: colors.text,
                  }}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  placeholder="Enter full name"
                  placeholderTextColor="#999"
                />
              </View>
              {errors.name && (
                <Text
                  style={{
                    color: "#e74c3c",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {errors.name}
                </Text>
              )}
            </View>

            {/* Phone Field - Optional */}
            <View
              style={{
                marginBottom: 20,
                backgroundColor: colors.card,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: 8,
                }}
              >
                Phone Number
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  backgroundColor: colors.background,
                }}
              >
                <Ionicons name="call-outline" size={20} color={colors.icon} />
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: colors.text,
                  }}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange("phone", value)}
                  placeholder="Enter phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && (
                <Text
                  style={{
                    color: "#e74c3c",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {errors.phone}
                </Text>
              )}
            </View>

            {/* Email Field - Optional */}
            <View
              style={{
                marginBottom: 20,
                backgroundColor: colors.card,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: 8,
                }}
              >
                Email Address
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  backgroundColor: colors.background,
                }}
              >
                <Ionicons name="mail-outline" size={20} color={colors.icon} />
                <TextInput
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: colors.text,
                  }}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Enter email address"
                  placeholderTextColor={colors.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && (
                <Text
                  style={{
                    color: "#e74c3c",
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Date Field - Auto-filled */}
            <View
              style={{
                marginBottom: 20,
                backgroundColor: colors.card,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: 8,
                }}
              >
                Date Created
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  backgroundColor: colors.background,
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  style={{
                    marginRight: 10,
                  }}
                />
                <Text
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    fontSize: 16,
                    color: colors.text,
                  }}
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 8,
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
                onPress={handleReset}
              >
                <Text
                  style={{
                    color: "#666",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: "#3498db",
                  borderRadius: 8,
                  gap: 8,
                }}
                onPress={handleSubmit}
              >
                <Ionicons name="save-outline" size={18} color="#fff" />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Save Customer
                </Text>
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
