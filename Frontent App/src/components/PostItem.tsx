import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; // Corrected import path

type Reply = { user: string; text: string };
type Post = { id: string; user: string; text: string; media?: string[]; replies?: Reply[] };

// Prop type definition updated for navigation
type PostItemProps = {
    post: Post;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Community'>;
};

export default function PostItem({ post, navigation }: PostItemProps) {
  const handlePress = () => {
      // Navigate to the post detail screen when the item is pressed
      navigation.navigate('PostDetail', { postId: post.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
        <View className="bg-white p-4 mb-4 rounded-xl shadow-md border border-gray-200">
            <Text className="font-bold text-lg text-gray-800">{post.user}</Text>
            <Text className="text-gray-700 mt-1">{post.text}</Text>
            {post.media && (
                <ScrollView horizontal className="mt-3 space-x-2">
                    {post.media.map((uri, i) => (
                        <Image key={i} source={{ uri }} className="w-32 h-32 rounded-lg" />
                    ))}
                </ScrollView>
            )}
            <View className="mt-3">
                <Text className="text-blue-600 font-semibold">Discussion ({post.replies?.length || 0})</Text>
                {post.replies && post.replies.length > 0 && (
                    <View className="mt-2 pl-4 border-l-2 border-gray-200">
                        {post.replies.slice(0, 1).map((reply, i) => ( // Show only the first reply snippet
                            <Text key={i} className="text-gray-600 text-sm">
                                <Text className="font-bold">{reply.user}: </Text>
                                {reply.text}
                            </Text>
                        ))}
                    </View>
                )}
            </View>
        </View>
    </TouchableOpacity>
  );
}