import { View, TextInput, FlatList, Text, Button } from "react-native";
import React from "react";
import PostItem from "./PostItem";

export default function CommunityScreen() {
  const [search, setSearch] = React.useState("");
  const [filterType, setFilterType] = React.useState<"Offerings" | "Request" | null>(null);
  const [radius, setRadius] = React.useState(10);

  const posts: ArrayLike<any> | null | undefined = []; // Fetch from backend

  return (
    <View className="flex-1 p-2 bg-white">
      <TextInput
        placeholder="Search posts..."
        value={search}
        onChangeText={setSearch}
        className="border p-2 rounded mb-2"
      />
      <View className="flex-row space-x-2 mb-2">
        <Button title="Offerings" onPress={() => setFilterType("Offerings")} />
        <Button title="Request" onPress={() => setFilterType("Request")} />
      </View>
      <Text>Radius: {radius} miles</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
}
