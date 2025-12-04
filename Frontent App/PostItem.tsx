import { View, Text, Image, ScrollView } from "react-native";

type Reply = { user: string; text: string };
type Post = { id: string; user: string; text: string; media?: string[]; replies?: Reply[] };

export default function PostItem({ post }: { post: Post }) {
  return (
    <View className="bg-white p-4 mb-4 rounded shadow">
      <Text className="font-bold">{post.user}</Text>
      <Text>{post.text}</Text>
      {post.media && (
        <ScrollView horizontal className="mt-2 space-x-2">
          {post.media.map((uri, i) => (
            <Image key={i} source={{ uri }} className="w-32 h-32 rounded" />
          ))}
        </ScrollView>
      )}
      {post.replies && (
        <View className="mt-2 pl-4 border-l border-gray-300">
          {post.replies.map((reply, i) => (
            <Text key={i} className="text-gray-600">
              <Text className="font-bold">{reply.user}: </Text>
              {reply.text}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
