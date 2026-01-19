import { Text, View, TextInput, Button, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const schema = zod.object({
  email: zod.email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: zod.infer<typeof schema>) => {
    setIsLoading(true);

    try {
      const request = await fetch(
        "http://192.168.50.115:4000/api/auth/local/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const response = await request.json();

      if (request.ok) {
        signIn(response.user);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="emailAddress"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      {isLoading && <ActivityIndicator />}
    </View>
  );
}
