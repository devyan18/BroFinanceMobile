import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useSignUp, useAuth } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function CompleteSignUp() {
  const router = useRouter();

  const { signUp, setActive, isLoaded } = useSignUp();
  const { isSignedIn } = useAuth(); // PARA CHEQUEAR SESIÓN ACTIVA

  const missing = signUp?.missingFields ?? [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Ya está logueado, lo mandamos a Home
      router.replace("/home");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || isSignedIn) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleFinish = async () => {
    setLoading(true);

    try {
      const updates: any = {};

      if (missing.includes("first_name")) updates.firstName = firstName;
      if (missing.includes("last_name")) updates.lastName = lastName;
      if (missing.includes("email_address"))
        updates.emailAddress = emailAddress;
      if (missing.includes("username")) updates.username = username;
      if (missing.includes("password")) updates.password = password;

      await signUp.update(updates);

      // Si la sesión ya está activa, Clerk no va a devolver createdSessionId
      const result = await signUp.reload({});

      if (result?.status === "complete") {
        if (result.createdSessionId) {
          try {
            await setActive({ session: result.createdSessionId });
          } catch (err: any) {
            console.warn("La sesión ya estaba activa:", err.message);
          }
        }
        router.replace("/home");
      } else {
        Alert.alert("Error", "No se pudo completar el registro.");
      }
    } catch (err: any) {
      console.error("CompleteSignUp error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Registro</Text>

      {missing.includes("first_name") && (
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={firstName}
          onChangeText={setFirstName}
        />
      )}

      {missing.includes("last_name") && (
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={lastName}
          onChangeText={setLastName}
        />
      )}

      {missing.includes("email_address") && (
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
      )}

      {missing.includes("username") && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}

      {missing.includes("password") && (
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleFinish}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Terminar Registro</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

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
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
