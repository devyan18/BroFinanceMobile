import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "google";
}

export default function SubmitButton({
  title,
  onPress,
  loading,
  icon,
  variant = "primary",
}: SubmitButtonProps) {
  if (variant === "google") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        className="flex-row items-center justify-center bg-[#1A1A1A] p-4 rounded-2xl border border-[#333] active:bg-[#222] mb-2"
      >
        {loading ? (
          <ActivityIndicator color="#26b901ff" />
        ) : (
          <>
            {icon && <View className="mr-3">{icon}</View>}
            <Text className="text-white font-bold text-base">{title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      className="w-full my-2 overflow-hidden rounded-2xl"
    >
      <LinearGradient
        // Colores Lemon Cash: Verde Neón a Cian
        colors={["#26b901", "#00669e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center justify-center py-4 px-6"
      >
        {loading ? (
          <View className="flex-row items-center justify-center h-12">
            <ActivityIndicator color="#000" />
          </View>
        ) : (
          <View className="flex-row items-center justify-center h-12">
            {icon && <View className="mr-2">{icon}</View>}
            <Text className="text-black text-lg font-black uppercase tracking-tight">
              {title}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
