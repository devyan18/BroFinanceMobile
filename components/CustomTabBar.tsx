import { View, TouchableOpacity, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";

// Configura el color de la barra de navegación de Android
if (Platform.OS === "android") {
  const { setBackgroundColorAsync } = require("expo-navigation-bar");
  setBackgroundColorAsync("#000000");
}

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 2 : 8,
          paddingBottom: Platform.OS === "ios" ? 0 : 6,
          paddingHorizontal: 16,
          backgroundColor: "#000000",
        }}
      >
        {/* Gradiente sutil para darle profundidad */}
        <LinearGradient
          colors={["rgba(0, 255, 127, 0.05)", "transparent"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 100,
          }}
          pointerEvents="none"
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: Platform.OS === "ios" ? 48 : 64,
          }}
        >
          <TabItem
            route="home"
            IconLib={Feather}
            iconName="grid"
            label="Home"
            state={state}
            navigation={navigation}
          />
          <TabItem
            route="balance"
            IconLib={Feather}
            iconName="list"
            label="Balance"
            state={state}
            navigation={navigation}
          />

          {/* Espacio vacío para el botón central */}
          <View style={{ flex: 1, minWidth: 64 }} />

          <TabItem
            route="graphs"
            IconLib={Feather}
            iconName="trending-up"
            label="Graphs"
            state={state}
            navigation={navigation}
          />
          <TabItem
            route="config"
            IconLib={Feather}
            iconName="settings"
            label="Config"
            state={state}
            navigation={navigation}
          />
        </View>
      </View>

      {/* Botón central elevado */}
      <View
        style={{
          position: "absolute",
          left: "50%",
          marginLeft: -31,
          top: Platform.OS === "ios" ? -20 : -15,
          alignItems: "center",
          justifyContent: "center",
        }}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // Aquí puedes navegar o abrir un modal
            console.log("Botón central presionado");
            // navigation.navigate("AddTransaction");
          }}
          style={{
            width: 62,
            height: 62,
            borderRadius: 31,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#00ff7f",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 8,
          }}
        >
          <Ionicons name="add-circle-sharp" size={62} color="#00ff7f" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabItem({ route, IconLib, iconName, state, navigation }: any) {
  const focused = state.routes[state.index].name === route;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route)}
      activeOpacity={0.7}
      style={{
        flex: 1,
        minWidth: 64,
        height: Platform.OS === "ios" ? 48 : 64,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconLib
        name={iconName}
        size={22}
        color={focused ? "#ffffff" : "#9ca3af"}
        strokeWidth={focused ? 2.5 : 2}
      />
    </TouchableOpacity>
  );
}
