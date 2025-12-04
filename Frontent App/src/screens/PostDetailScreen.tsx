import React from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App'; // Corrected import path
import PostItem from '../components/PostItem'; // Corrected import path

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

export default function PostDetailScreen() {
    const route = useRoute<PostDetailScreenRouteProp>();
    const navigation = useNavigation();
    const { postId } = route.params;
    const [replyText, setReplyText] = React.useState('');

    // Placeholder Data
    const postData = { 
        id: postId, 
        user: "Mike D", 
        text: "Urgently need bottled water for my elderly neighbors. Please help if you can.", 
        media: ["https://picsum.photos/400/200?random=1"],
        replies: [
            { user: "Chels", text: "I can bring 3 people to help! We have a truck." },
            { user: "VolunteerOrg", text: "We're coordinating a drop-off in your area tomorrow morning." },
        ] 
    };
    
    const submitReply = () => {
        if (replyText.trim()) {
            console.log(`Submitting reply to post ${postId}: ${replyText}`);
            setReplyText('');
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView className="p-4">
                {/* NOTE: We pass {} as navigation to PostItem since we don't need further navigation from here */}
                <PostItem post={postData} navigation={navigation as any} /> 
                
                <Text className="text-xl font-bold mt-4 mb-2">Discussion ({postData.replies.length})</Text>

                {postData.replies.map((reply, index) => (
                    <View key={index} className="bg-white p-3 mb-2 rounded-lg border border-gray-100">
                        <Text className="font-bold text-gray-800">{reply.user}</Text>
                        <Text className="text-gray-600 mt-0.5">{reply.text}</Text>
                    </View>
                ))}
            </ScrollView>

            <View className="border-t border-gray-200 p-4 bg-white flex-row items-center">
                <TextInput
                    placeholder="Write a reply..."
                    value={replyText}
                    onChangeText={setReplyText}
                    className="flex-1 border border-gray-300 p-3 rounded-full mr-2"
                />
                <Button 
                    title="Send" 
                    onPress={submitReply} 
                    disabled={!replyText.trim()} 
                    color="#8B5CF6" 
                />
            </View>
        </View>
    );
}