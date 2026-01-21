import React, { useRef } from "react";
import { useRouter } from "expo-router";
import { useSignIn, useSSO } from "@clerk/clerk-expo";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";

// Esquema Zod (Sin cambios en lógica)
const signInSchema = z.object({
  emailAddress: z.email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const { signIn, setActive, isLoaded } = useSignIn();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  /* Lógica de Google (Sin cambios) */
  const handleGoogleSignIn = async () => {
    try {
      const result = await startSSOFlow({ strategy: "oauth_google" });
      if (result.signUp?.status === "missing_requirements") {
        router.push({ pathname: "/complete-signup" });
        return;
      }
      if (result.createdSessionId && result.setActive) {
        await result.setActive({ session: result.createdSessionId });
        router.replace("/home");
      }
    } catch (error) {
      Alert.alert("Error", "Fallo al iniciar con Google.");
    }
  };

  /* Lógica de Email (Sin cambios) */
  const onSignInPress = async (data: SignInFormData) => {
    if (!isLoaded) return;
    try {
      const attempt = await signIn.create({
        identifier: data.emailAddress,
        password: data.password,
      });
      if (attempt.status === "complete" && attempt.createdSessionId) {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/home");
      } else {
        console.warn("Verificación requerida", attempt);
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Error al iniciar sesión.",
      );
      console.log({ err });
    }
  };

  const passwordRef = useRef<any>(null);

  if (!isLoaded)
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#26b901ff" />
      </View>
    );

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#000" }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
      }}
      enableOnAndroid={true}
      extraScrollHeight={20} // Espacio extra sobre el teclado
    >
      <View className="flex-1 px-6 justify-center">
        {/* Header estilo 'Lemon' */}
        <View className="mb-10">
          <Text className="text-white text-4xl font-black tracking-tighter">
            Bro <Text className="text-[#26b901ff]">Finance</Text>
          </Text>
          <Text className="text-neutral-400 text-lg mt-2 font-medium">
            Welcome back!
          </Text>
        </View>

        {/* Formulario */}
        <View className="space-y-4">
          <FormInput
            onSubmitEditing={() => passwordRef.current?.focus()}
            returnKeyType="next"
            label="Email"
            placeholder="email@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            control={control}
            name="emailAddress"
            error={errors.emailAddress?.message}
          />

          <FormInput
            ref={passwordRef}
            returnKeyType="done"
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            control={control}
            name="password"
            error={errors.password?.message}
          />
        </View>

        <View className="mt-8">
          <SubmitButton
            title="Login"
            onPress={handleSubmit(onSignInPress)}
            loading={isSubmitting}
            variant="primary" // Botón verde neón degradado
          />
        </View>

        {/* Separador */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-neutral-800" />
          <Text className="mx-4 text-neutral-500 font-medium">
            Or continue with
          </Text>
          <View className="flex-1 h-[1px] bg-neutral-800" />
        </View>

        <SubmitButton
          title="Google"
          icon={<FontAwesome name="google" size={20} color="#fff" />}
          onPress={handleGoogleSignIn}
          variant="google" // Botón gris oscuro
        />

        {/* Footer Link */}
        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="text-neutral-400">
            Do you not have an account?{"  "}
            <Text className="text-[#26b901ff] font-bold">Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
