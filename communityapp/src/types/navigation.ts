// src/types/navigation.ts
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Feed: undefined;
  PostDetail: { postId: number | string } | undefined;
  Search: undefined; 
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type FeedProps = NativeStackScreenProps<RootStackParamList, "Feed">;
export type PostDetailProps = NativeStackScreenProps<RootStackParamList,"PostDetail">;
export type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;



