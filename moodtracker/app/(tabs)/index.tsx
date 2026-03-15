import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
  const [mood, setMood] = useState("");
  const [reason, setReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);
  const router = useRouter();

  const handleSetMood = (newMood: string) => {
    setMood(newMood);
    setShowReasonInput(true);
  };

  const saveMoodEntry = async () => {
  const today = new Date().toISOString().split("T")[0];
  const history = JSON.parse(await AsyncStorage.getItem("moodHistory") || "[]");
  const updatedHistory = [...history, { date: today, mood, reason }];
  await AsyncStorage.setItem("moodHistory", JSON.stringify(updatedHistory));

  setReason('');
  setMood('');
  setShowReasonInput(false);
};

  const moods = [
    { emoji: "😊", label: "Extremely Good" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😐", label: "Alright" },
    { emoji: "😞", label: "Bad" },
    { emoji: "😡", label: "Horrible" },
  ];

  return (
    <KeyboardAvoidingView
    style={{ flex:1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView contentContainerStyle={[styles.container, {paddingBottom: 120}]}>
      <Text style={styles.title}>How are you feeling today?</Text>
      {moods.map((item, index) => (
        <Pressable
          key={index}
          style={styles.moodButton}
          onPress={() => handleSetMood(`${item.emoji} ${item.label}`)}
        >
          <Text style={styles.moodText}>{item.emoji} {item.label}</Text>
        </Pressable>
      ))}
      {mood && <Text style={styles.selectedMood}>Today's Mood: {mood}</Text>}
      {showReasonInput && (
        <View style={styles.reasonContainer}>
    <Text style={styles.prompt}>Why do you feel this way?</Text>
    <TextInput
      style={styles.textInput}
      multiline
      placeholder="Type your reason..."
      value={reason}
      onChangeText={setReason}
    />
    <Pressable style={styles.saveButton} onPress={saveMoodEntry}>
      <Text style={styles.saveButtonText}>Save Entry</Text>
    </Pressable>
  </View>
)}

      <Pressable style={styles.historyButton} onPress={() => router.push("/history")}>
        <Text style={styles.historyText}>📊 View Mood History</Text>
      </Pressable>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  selectedMood: {
  fontSize: 16,
  fontWeight: "bold",
  marginTop: 16,
  color: "#333",
},
// ⬇️ Add these new styles here
reasonContainer: {
  marginTop: 20,
  width: "100%",
  alignItems: "center",
},
prompt: {
  fontSize: 16,
  marginBottom: 8,
},
textInput: {
  width: "100%",
  minHeight: 80,
  backgroundColor: "#fff",
  padding: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#ccc",
  textAlignVertical: "top",
},
saveButton: {
  marginTop: 12,
  backgroundColor: "#4f46e5",
  padding: 12,
  borderRadius: 10,
},
saveButtonText: {
  color: "white",
  fontWeight: "600",
},

  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  moodButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
    alignItems: "center",
  },
  moodText: {
    fontSize: 18,
  },
  historyButton: {
    marginTop: 30,
    padding: 14,
    backgroundColor: "#4f46e5",
    borderRadius: 10,
  },
  historyText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
