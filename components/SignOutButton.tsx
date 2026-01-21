import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/sign-in");
    } catch (err) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="bg-gray-700 h-12 rounded-full flex items-center justify-center"
    >
      <Text className="text-white">Sign out</Text>
    </TouchableOpacity>
  );
};
