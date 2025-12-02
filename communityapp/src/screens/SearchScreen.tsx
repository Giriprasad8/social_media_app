import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import type { SearchProps } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SearchScreen({ navigation }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const doSearch = async () => {
    if (!query) return;

    try {
        const token = await AsyncStorage.getItem("token");
      const res = await fetch(`http://10.148.228.78:3000/search?q=${query}`,{
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  }
);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Posts</Text>

      <TextInput
        placeholder="Type to search..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <TouchableOpacity onPress={doSearch} style={styles.button}>
        <Text style={{ color: "#fff" }}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetail", { postId: item.id })}
            style={styles.item}
          >
            <Text style={styles.postTitle}>{item.body}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>{item.author?.name || "Unknown"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10 },
  button: { backgroundColor: "#1976D2", padding: 10, alignItems: "center", borderRadius: 6 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  postTitle: { fontSize: 15, fontWeight: "600" }
});
