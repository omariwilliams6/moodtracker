import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Profile() {
  const [entryCount, setEntryCount] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      const saved = await AsyncStorage.getItem("moodHistory");
      const history = JSON.parse(saved || "[]");
      setEntryCount(history.length);
    };
    loadStats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
      {/* Profile Picture */}
      <Image
        source={{
          uri: "https://via.placeholder.com/100", // Replace with real profile image URI if you add upload later
        }}
        style={styles.avatar}
      />

      {/* Username */}
      <Text style={styles.username}>@yourusername</Text>

      {/* Stats */}
      <View style={styles.statsBox}>
        <Text style={styles.statsNumber}>{entryCount}</Text>
        <Text style={styles.statsLabel}>Mood Entries</Text>
      </View>

      {/* Placeholder button */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: "#ccc",
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 24,
  },
  statsBox: {
    alignItems: "center",
    marginBottom: 24,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4f46e5",
  },
  statsLabel: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
