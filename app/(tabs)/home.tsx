import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function Home() {
  const { user, isLoaded } = useUser();

  console.log(JSON.stringify(user, null, 2));

  if (!isLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View>
      <Image
        source={{ uri: user?.externalAccounts[0]?.imageUrl || user?.imageUrl }}
        style={{ width: 60, height: 60, borderRadius: 50 }}
      />
      <Text>{user?.username}</Text>
    </View>
  );
}
