// src/screens/FeedScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import type { FeedProps } from "../types/navigation";
import FilterBar from "../components/FilterBar";
import AsyncStorage from "@react-native-async-storage/async-storage";


type Post = {
  id: number | string;
  body: string;
  type: "offering" | "request";
  author?: { id: number | string; name?: string };
};

export default function FeedScreen({ navigation }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterType, setFilterType] = useState<"offering" | "request" | null>(null);
  const [radiusMiles, setRadiusMiles] = useState<number>(10);

  useEffect(() => {
    // initial fetch
    fetchPosts();
  }, [filterType, radiusMiles]);

  const fetchPosts = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const url = "http://10.148.228.78:3000/posts";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);

  } catch (err) {
    console.error(err);
  }
};

  <TouchableOpacity
  onPress={() => navigator.navigate("Search")}
  style={{ padding: 10, backgroundColor: "#1976D2", marginBottom: 10 }}
>
  <Text style={{ color: "white", textAlign: "center" }}>Search Posts</Text>
</TouchableOpacity>

  return (
    <View style={{ flex: 1 }}>
      <FilterBar filterType={filterType} setFilterType={setFilterType} radiusMiles={radiusMiles} setRadiusMiles={setRadiusMiles} />
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PostDetail", { postId: item.id })}>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.author}>{item.author?.name ?? "Unknown"}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No posts</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderBottomWidth: 1, borderColor: "#eee" },
  body: { fontSize: 16 },
  type: { fontSize: 12, color: "#666" },
  author: { fontSize: 12, color: "#999", marginTop: 6 }
});
