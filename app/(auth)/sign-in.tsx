import React from "react";
import { useRouter } from "expo-router";
import { useAuth, useSignIn, useSSO, useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from "react-native";

export default function Page() {
  const router = useRouter();

  /* --- SSO (Google) --- */
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = async () => {
    try {
      const result = await startSSOFlow({ strategy: "oauth_google" });

      if (result.signUp?.status === "missing_requirements") {
        router.push({
          pathname: "/complete-signup",
        });
        return;
      }

      const { createdSessionId, setActive } = result;

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/home");
      } else {
        console.error("SSO did not create session:", result);
      }
    } catch (error: any) {
      console.error("Google SSO failed:", error);
      Alert.alert("Error", "Failed to sign in with Google.");
    }
  };

  /* --- Email/Password Sign In --- */
  const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleEmailSignIn = async () => {
    if (!isSignInLoaded) return;

    setLoading(true);

    try {
      const attempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (attempt.status === "complete" && attempt.createdSessionId) {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/home");
      } else {
        console.warn("Additional verification required:", attempt);
        // Aquí podrías manejar MFA o email_code si corresponde
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      Alert.alert("Error", "Email sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  /* --- Loading States --- */
  if (!isSignInLoaded)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* 👇 Google Sign In */}
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />

      {/* --- Divider --- */}
      <View style={styles.divider}>
        <Text style={{ color: "#888" }}>OR</Text>
      </View>

      {/* 👇 Email / Password */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmailAddress}
        value={emailAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity onPress={handleEmailSignIn} style={styles.btn}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Continue</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

/* --- Estilos simples --- */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 15,
    color: "#3b82f6",
    textAlign: "center",
  },
  divider: {
    alignItems: "center",
    marginVertical: 15,
  },
});
