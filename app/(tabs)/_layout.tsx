import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { CustomTabBar } from "../../components/CustomTabBar";

export default function RootLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn === undefined)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="balance" />
      <Tabs.Screen name="graphs" />
      <Tabs.Screen name="config" />
    </Tabs>
  );
}
