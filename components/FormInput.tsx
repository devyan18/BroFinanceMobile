import React, { forwardRef } from "react";
import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

// La definición debe estar fuera de cualquier otro componente o condicional
const FormInput = forwardRef<
  TextInput,
  {
    label: string;
    error?: string;
    control: any;
    name: string;
  } & React.ComponentProps<typeof TextInput>
>(({ label, error, control, name, ...props }, ref) => {
  return (
    <View className="mb-4 space-y-2">
      <Text className="text-gray-300 font-semibold text-sm ml-1">{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            ref={ref} // Ahora el ref está correctamente vinculado
            className={`
              bg-neutral-900 
              text-white 
              p-4 
              rounded-2xl 
              border 
              ${error ? "border-red-500" : "border-neutral-800 focus:border-[#CCFF00]"}
              text-base
            `}
            placeholderTextColor="#666"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            {...props}
          />
        )}
      />

      {error && (
        <Text className="text-red-500 text-xs ml-1 font-medium">{error}</Text>
      )}
    </View>
  );
});

// Importante para debugging en React
FormInput.displayName = "FormInput";

export default FormInput;
