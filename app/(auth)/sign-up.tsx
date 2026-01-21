import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity, StatusBar } from "react-native";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormInput from "../../components/FormInput";
import SubmitButton from "../../components/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const signUpSchema = z.object({
  emailAddress: z.email("Email inválido"),
  username: z.string().min(3, "Mínimo 3 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignUpPress = async (data: SignUpFormData) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: data.emailAddress,
        username: data.username,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.log({ err });
      Alert.alert("Error", err.errors?.[0]?.message || "Error al registrarse");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const attempt = await signUp.attemptEmailAddressVerification({
        code: verifyCode,
      });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.replace("/home");
      } else {
        Alert.alert("Error", "Código incorrecto o verificación incompleta.");
      }
    } catch (err: any) {
      console.log({ err });
      Alert.alert("Error", err.errors?.[0]?.message || "Error al verificar");
    }
  };

  // --- Vista de Verificación ---
  if (pendingVerification) {
    return (
      <View className="flex-1 bg-black justify-center px-6">
        <View className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
          <Text className="text-2xl font-bold text-white mb-2 text-center">
            Verificá tu email 📧
          </Text>
          <Text className="text-neutral-400 text-center mb-6">
            Ingresá el código que enviamos a tu correo.
          </Text>

          <FormInput
            label="Código"
            placeholder="000000"
            keyboardType="numeric"
            control={control}
            name="verifyCode" // Nota: Esto es solo visual, usamos state local para el codigo aqui
            value={verifyCode}
            onChangeText={setVerifyCode}
          />

          <View className="mt-4">
            <SubmitButton
              title="Verificar Cuenta"
              onPress={onVerifyPress}
              variant="primary"
            />
          </View>
        </View>
      </View>
    );
  }

  // --- Vista de Registro ---
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
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 justify-center">
        <View className="mb-8">
          <Text className="text-white text-4xl font-black tracking-tighter">
            Create <Text className="text-[#26b901ff]">Account</Text>
          </Text>
          <Text className="text-neutral-400 text-lg mt-2 font-medium">
            Sum now!
          </Text>
        </View>

        <View className="space-y-4">
          <FormInput
            label="Email"
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            name="emailAddress"
            error={errors.emailAddress?.message}
          />

          <FormInput
            label="Username"
            placeholder="@username"
            autoCapitalize="none"
            control={control}
            name="username"
            error={errors.username?.message}
          />

          <FormInput
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
            title="Start now"
            onPress={handleSubmit(onSignUpPress)}
            loading={isSubmitting}
            variant="primary"
          />
        </View>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-neutral-400">Do you have an account?</Text>
          <Link href="/sign-in" asChild>
            <TouchableOpacity>
              <Text className="text-[#26b901ff] font-bold ml-2">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
