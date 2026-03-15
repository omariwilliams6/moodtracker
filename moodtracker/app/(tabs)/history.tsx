import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Entry = {
  date: string;
  mood: string;
  reason: string;
};

export default function History() {
  const [history, setHistory] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await AsyncStorage.getItem("moodHistory");
      setHistory(JSON.parse(saved || "[]"));
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          const [emoji] = item.mood.split(" ");
          return (
            <Pressable
              style={styles.card}
              onPress={() => setSelectedEntry(item)}
            >
              <View style={styles.headerRow}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </Pressable>
          );
        }}
      />

      {/* Modal for viewing full journal entry */}
      <Modal
        visible={!!selectedEntry}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedEntry(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Journal Entry</Text>
            <Text style={styles.modalMood}>{selectedEntry?.mood}</Text>
            <Text style={styles.modalDate}>{selectedEntry?.date}</Text>
            <Text style={styles.modalText}>{selectedEntry?.reason}</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setSelectedEntry(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  emoji: {
    fontSize: 24,
  },
  date: {
    fontSize: 16,
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalMood: {
    fontSize: 18,
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontWeight: "600",
  },
});
