import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommunityScreen from "./src/screens/CommunityScreen"; // Corrected path
import CreatePostScreen from "./src/screens/CreatePostScreen"; // Corrected path
import PostDetailScreen from "./src/screens/PostDetailScreen"; // Corrected path
import SearchResultsScreen from "./src/screens/SearchResultsScreen"; // Corrected path

// Define all routes and their parameters
export type RootStackParamList = {
  Community: undefined;
  CreatePost: undefined;
  PostDetail: { postId: string }; // Assuming posts have an ID
  SearchResults: { query: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Community">
        <Stack.Screen
          name="Community"
          component={CommunityScreen}
          options={{ title: "Community Feed" }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: "Create New Post" }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: "Discussion Thread" }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={{ title: "AI Search Results" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
