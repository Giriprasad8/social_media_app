// src/screens/PostDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import type { PostDetailProps } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostDetailScreen({ route, navigation }: PostDetailProps) {

  const postId = route.params?.postId;
  const [post, setPost] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  const fetchPost = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch("http://10.148.228.78:3000/posts", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const posts = await res.json();
    const p = posts.find((x: any) => String(x.id) === String(postId));
    setPost(p);

  } catch (err) {
    console.error(err);
  }
};


  const postReply = async () => {
    try {
      // call replies API (adjust path + body as your backend expects)
      const resp = await fetch(`http://10.148.228.78:3000/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText, userId: "USER_UUID", postId })
      });
      if (!resp.ok) throw new Error("Reply failed");
      Alert.alert("Reply posted");
      setReplyText("");
    } catch (err) {
      Alert.alert("Error posting reply");
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontWeight: "700", marginBottom: 8 }}>Post</Text>
      <Text style={{ marginBottom: 12 }}>{post?.body ?? "Loading..."}</Text>

      <Text style={{ fontWeight: "700" }}>Add Reply</Text>
      <TextInput value={replyText} onChangeText={setReplyText} placeholder="Write a reply..." style={styles.input} />
      <TouchableOpacity onPress={postReply} style={styles.button}>
        <Text style={{ color: "#fff" }}>Send Reply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginTop: 8, marginBottom: 12 },
  button: { backgroundColor: "#1976D2", padding: 10, alignItems: "center", borderRadius: 6 }
});


