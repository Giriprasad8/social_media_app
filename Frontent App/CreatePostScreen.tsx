import React, { useState } from "react";
import { View, TextInput, Button, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";


export default function CreatePostScreen() {
    const [text, setText] = useState("");
    const [media, setMedia] = useState<string[]>([]);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const pickMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
        });
        if (!result.canceled) setMedia([...media, result.assets[0].uri]);
    };

    const addLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
            const loc = await Location.getCurrentPositionAsync({});
            setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        }
    };

    const submitPost = () => {
        // Send { text, media, location } to backend
        console.log({ text, media, location });
    };

    return (
        <ScrollView className="flex-1 p-4 bg-white">
            <TextInput
                placeholder="Write something..."
                multiline
                value={text}
                onChangeText={setText}
                className="border p-3 rounded mb-4"
            />
            <Button title="Add Media" onPress={pickMedia} />
            <ScrollView horizontal className="mt-2 space-x-2">
                {media.map((uri, i) => (
                    <Image key={i} source={{ uri }} className="w-20 h-20 rounded" />
                ))}
            </ScrollView>
            <View className="p-4">
                <TextInput
                    placeholder="Write something..."
                    multiline
                    className="border p-3 rounded mb-4"
                />

                <Button
                    title="Add Media"
                    onPress={pickMedia}
                    color="#3B82F6" // blue-500
                />

                <View className="mt-2">
                    <Button
                        title="Add Location"
                        onPress={addLocation}
                        color="#10B981" // green-500
                    />
                </View>

                <View className="mt-4">
                    <Button
                        title="Post"
                        onPress={submitPost}
                        color="#8B5CF6" // purple-500
                    />
                </View>
            </View>
        </ScrollView>
    );
}
