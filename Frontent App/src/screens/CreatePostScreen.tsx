import React, { useState } from "react";
import { View, TextInput, Button, Image, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
// import { RootStackParamList } from "../../App"; // Only needed if using navigation here

export default function CreatePostScreen() {
    const [text, setText] = useState("");
    const [media, setMedia] = useState<string[]>([]);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const pickMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result.canceled) {
             const newUris = result.assets.map(asset => asset.uri).filter(uri => !media.includes(uri));
             setMedia([...media, ...newUris]);
        }
    };

    const addLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Location access is required to share your post location.");
            return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        Alert.alert("Location Added", "Your current location has been attached to the post.");
    };

    const submitPost = () => {
        if (!text.trim() && media.length === 0) {
            Alert.alert("Cannot Post", "Please write something or add media before posting.");
            return;
        }
        // Send { text, media, location } to backend
        console.log("Submitting Post:", { text, media, location });
        Alert.alert("Post Submitted", "Your post has been shared!");
        // Reset state after submission
        setText("");
        setMedia([]);
        setLocation(null);
    };

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <TextInput
                placeholder="What are you offering/requesting? (e.g., Offering help, Requesting water)"
                multiline
                value={text}
                onChangeText={setText}
                className="border border-gray-300 p-4 rounded-xl h-32 mb-4 text-lg"
                textAlignVertical="top"
            />
            
            {/* Media Preview */}
            <ScrollView horizontal className="mb-4 space-x-3">
                {media.map((uri, i) => (
                    <Image key={i} source={{ uri }} className="w-24 h-24 rounded-lg border border-gray-200" />
                ))}
            </ScrollView>

            <View className="flex-row justify-between p-2 items-center border-t border-b border-gray-100 py-3">
                <Button 
                    title="Add Media" 
                    onPress={pickMedia} 
                    color="#3B82F6" 
                />
                <Button
                    title="Share Location"
                    onPress={addLocation}
                    color="#10B981" 
                />
            </View>
            
            {location && (
                <View className="flex-row items-center mt-3 p-3 bg-green-50 rounded-lg">
                    <Ionicons name="location-sharp" size={18} color="#10B981" />
                    <Text className="ml-2 text-green-700">Precise Location Added</Text>
                    <TouchableOpacity onPress={() => setLocation(null)} className="ml-auto p-1">
                        <Ionicons name="close-circle-outline" size={20} color="#10B981" />
                    </TouchableOpacity>
                </View>
            )}

            <View className="mt-8">
                <Button
                    title="Post"
                    onPress={submitPost}
                    color="#8B5CF6" 
                />
            </View>
        </ScrollView>
    );
}