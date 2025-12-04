import React from "react";
import { View, Text, TouchableOpacity, Button, Platform, StyleSheet } from "react-native";
// Note: We use Slider from react-native for a standard component, but in a real app,
// consider using @react-native-community/slider for better cross-platform control.
import Slider from "@react-native-community/slider"; 
import { Ionicons } from "@expo/vector-icons";

interface FilterBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    currentFilterType: "Offerings" | "Request" | null;
    onSetFilterType: (type: "Offerings" | "Request" | null) => void;
    currentRadius: number;
    onSetRadius: (radius: number) => void;
    onApply: () => void;
}

export default function FilterBottomSheet({
    isVisible,
    onClose,
    currentFilterType,
    onSetFilterType,
    currentRadius,
    onSetRadius,
    onApply,
}: FilterBottomSheetProps) {

    if (!isVisible) return null;

    const toggleFilter = (type: "Offerings" | "Request") => {
        onSetFilterType(currentFilterType === type ? null : type);
    };

    return (
        <View style={styles.overlay} className="absolute inset-0 bg-black/50 z-10">
            <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-6 shadow-2xl">
                <View className="flex-row justify-between items-center pb-3 border-b border-gray-100">
                    <Text className="text-2xl font-bold">Filter Posts</Text>
                    <TouchableOpacity onPress={onClose} className="p-2">
                        <Ionicons name="close-circle-outline" size={30} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                {/* Post Type Filters */}
                <View className="mt-4">
                    <Text className="text-lg font-semibold mb-2">Post Type</Text>
                    <View className="flex-row space-x-3">
                        <TouchableOpacity
                            onPress={() => toggleFilter("Offerings")}
                            className={`px-4 py-2 rounded-full border-2 ${
                                currentFilterType === "Offerings"
                                    ? "bg-purple-500 border-purple-500"
                                    : "bg-gray-100 border-gray-300"
                            }`}
                        >
                            <Text className={`font-semibold ${
                                currentFilterType === "Offerings" ? "text-white" : "text-gray-700"
                            }`}>Offerings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => toggleFilter("Request")}
                            className={`px-4 py-2 rounded-full border-2 ${
                                currentFilterType === "Request"
                                    ? "bg-purple-500 border-purple-500"
                                    : "bg-gray-100 border-gray-300"
                            }`}
                        >
                            <Text className={`font-semibold ${
                                currentFilterType === "Request" ? "text-white" : "text-gray-700"
                            }`}>Requests</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Location Radius Slider */}
                <View className="mt-6">
                    <View className="flex-row justify-between items-center mb-1">
                        <Text className="text-lg font-semibold">Location Radius</Text>
                        <Text className="text-lg font-bold text-purple-600">{currentRadius} miles</Text>
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={1}
                        maximumValue={50}
                        step={1}
                        value={currentRadius}
                        onSlidingComplete={onSetRadius}
                        minimumTrackTintColor="#8B5CF6" // purple-500
                        maximumTrackTintColor="#D1D5DB" // gray-300
                        thumbTintColor={Platform.OS === 'ios' ? '#8B5CF6' : undefined}
                    />
                    <View className="flex-row justify-between text-gray-500 text-sm mt-1">
                        <Text className="text-sm text-gray-500">1 mi</Text>
                        <Text className="text-sm text-gray-500">50 mi</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-3 mt-8">
                    <View className="flex-1">
                        <Button title="Cancel" onPress={onClose} color="#6B7280" />
                    </View>
                    <View className="flex-1">
                        <Button title="Apply Filters" onPress={onApply} color="#8B5CF6" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        // Essential for covering the entire screen
        flex: 1, 
    },
});