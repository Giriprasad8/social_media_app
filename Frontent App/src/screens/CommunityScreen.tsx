import { View, TextInput, FlatList, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Keep this for useNavigation hook
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // ⬅️ FIX: Import from the correct package
import { Feather, Ionicons } from "@expo/vector-icons";
import PostItem from "../components/PostItem"; // Corrected import path
import FilterBottomSheet from "../components/FilterBottomSheet"; // New component import
import { RootStackParamList } from "../../App"; // Corrected import path

type CommunityScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Community'>;

export default function CommunityScreen() {
  const navigation = useNavigation<CommunityScreenNavigationProp>();
  const { height } = useWindowDimensions();
  
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"Offerings" | "Request" | null>(null);
  const [radius, setRadius] = useState(10);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Placeholder Data
  const posts = [
    { id: "1", user: "Alex M (Offering)", text: "Looking for volunteer help with a beach cleanup this weekend! Bags and gloves provided", media: ["uri1"], replies: [{ user: "Chels", text: "I can bring 3 people to help!" }] },
    { id: "2", user: "Mike D (Request)", text: "Urgently need bottled water for my elderly neighbors. Please help if you can", replies: [] },
  ]; 

  const applyFilters = () => {
    console.log("Applying filters:", { search, filterType, radius });
    setIsFilterVisible(false);

    // If a complex search query is used, navigate to the RAG screen
    if (search.toLowerCase().includes("water") || search.toLowerCase().includes("help")) { 
      navigation.navigate('SearchResults', { query: search });
    }
  };

  // Add 'Create Post' and 'Filter' buttons to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row space-x-4">
          <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
            <Ionicons name="funnel-outline" size={24} color="#8B5CF6" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <Feather name="plus-circle" size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <TextInput
          placeholder="Search posts or ask the community AI..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={applyFilters} 
          className="border border-gray-300 p-3 rounded-xl"
        />
      </View>
      
      {/* Current Filter Indicator */}
      {(filterType || radius !== 10) && (
        <View className="px-4 pb-2 flex-row space-x-2">
            {filterType && <Text className="text-sm bg-gray-200 px-3 py-1 rounded-full">{filterType}</Text>}
            <Text className="text-sm bg-gray-200 px-3 py-1 rounded-full">Radius: {radius} mi</Text>
        </View>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} navigation={navigation} />}
        contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 10 }}
      />

      {/* Renders the bottom sheet overlay */}
      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        currentFilterType={filterType}
        onSetFilterType={setFilterType}
        currentRadius={radius}
        onSetRadius={setRadius}
        onApply={applyFilters}
      />
    </View>
  );
}