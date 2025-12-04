import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Corrected import path

type SearchResultsScreenRouteProp = RouteProp<RootStackParamList, 'SearchResults'>;

export default function SearchResultsScreen() {
    const route = useRoute<SearchResultsScreenRouteProp>();
    const { query } = route.params;

    // Placeholder Data
    const aiSummary = "There are currently 12 active requests for water assistance in your area, primarily due to the recent local water main break. Most requests are for bottled water and large containers.";
    const relatedPosts = [
        { id: "101", user: "Sam T (Request)", text: "Has anyone found large water containers? I need three for my family." },
        { id: "102", user: "Shelly L (Offering)", text: "Offering a case of bottled water for pickup near Elm Street." },
    ];

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <Text className="text-2xl font-bold mb-4">AI Insight for "{query}"</Text>

            {/* AI Summary Block (RAG Result) */}
            <View className="bg-purple-100 p-4 rounded-xl border border-purple-300 mb-6">
                <Text className="text-lg font-semibold text-purple-800 mb-2">Community AI Summary</Text>
                <Text className="text-purple-700 leading-relaxed">{aiSummary}</Text>
            </View>

            <Text className="text-xl font-bold mb-3">Related Posts</Text>
            
            {/* Related Posts List */}
            {relatedPosts.map((post, index) => (
                <View key={post.id} className="bg-white p-3 mb-3 rounded-lg border border-gray-200 shadow-sm">
                    <Text className="font-semibold text-gray-800">{post.user}</Text>
                    <Text className="text-gray-600 mt-1">{post.text}</Text>
                </View>
            ))}

            {relatedPosts.length === 0 && (
                <Text className="text-gray-500">No related posts found using the RAG search.</Text>
            )}
        </ScrollView>
    );
}