import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Journal() {
  const [entries, setEntries] = useState([
    { id: "1", date: "2025-08-21", entry: "Felt overwhelmed but proud I finished my tasks." },
    { id: "2", date: "2025-08-20", entry: "Had a great walk today. Sunshine helped a lot." },
    { id: "3", date: "2025-08-19", entry: "Low energy all day, but still managed a workout." },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setEntries((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, entry: editText } : item
      )
    );
    setEditingId(null);
    setEditText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.date}>{item.date}</Text>

            {editingId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editText}
                  onChangeText={setEditText}
                  multiline
                />
                <Pressable style={styles.saveBtn} onPress={saveEdit}>
                  <Text style={styles.saveText}>Save</Text>
                </Pressable>
              </>
            ) : (
              <Pressable onPress={() => startEditing(item.id, item.entry)}>
                <Text style={styles.entry}>{item.entry}</Text>
              </Pressable>
            )}
          </View>
        )}
      />
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
  entryCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
  },
  entry: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 60,
    marginBottom: 8,
  },
  saveBtn: {
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
