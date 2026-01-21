import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import * as Localization from "expo-localization";
import { Image } from "react-native";

// Traducciones
const translations = {
  es: {
    settings: "Configuración",
    profile: "Perfil",
    editProfile: "Editar perfil",
    preferences: "Preferencias",
    language: "Idioma",
    spanish: "Español",
    english: "English",
    currency: "Moneda",
    argentinePeso: "Peso Argentino (ARS)",
    usDollar: "Dólar Estadounidense (USD)",
    exchangeRate: "Cotización",
    official: "Oficial",
    notifications: "Notificaciones",
    pushNotifications: "Notificaciones push",
    emailNotifications: "Notificaciones por email",
    transactionAlerts: "Alertas de transacciones",
    security: "Seguridad",
    changePassword: "Cambiar contraseña",
    biometrics: "Autenticación biométrica",
    twoFactor: "Autenticación de dos factores",
    about: "Acerca de",
    version: "Versión",
    termsConditions: "Términos y condiciones",
    privacyPolicy: "Política de privacidad",
    help: "Ayuda y soporte",
    logout: "Cerrar sesión",
    logoutConfirm: "¿Estás seguro que deseas cerrar sesión?",
    cancel: "Cancelar",
    confirm: "Confirmar",
    loading: "Cargando cotización...",
    updated: "Actualizado",
  },
  en: {
    settings: "Settings",
    profile: "Profile",
    editProfile: "Edit profile",
    preferences: "Preferences",
    language: "Language",
    spanish: "Español",
    english: "English",
    currency: "Currency",
    argentinePeso: "Argentine Peso (ARS)",
    usDollar: "US Dollar (USD)",
    exchangeRate: "Exchange Rate",
    official: "Official",
    notifications: "Notifications",
    pushNotifications: "Push notifications",
    emailNotifications: "Email notifications",
    transactionAlerts: "Transaction alerts",
    security: "Security",
    changePassword: "Change password",
    biometrics: "Biometric authentication",
    twoFactor: "Two-factor authentication",
    about: "About",
    version: "Version",
    termsConditions: "Terms and conditions",
    privacyPolicy: "Privacy policy",
    help: "Help and support",
    logout: "Log out",
    logoutConfirm: "Are you sure you want to log out?",
    cancel: "Cancel",
    confirm: "Confirm",
    loading: "Loading exchange rate...",
    updated: "Updated",
  },
};

// Detectar idioma del dispositivo
const getDeviceLanguage = (): "es" | "en" => {
  const locale = Localization.getLocales();
  return locale[0].currencyCode?.startsWith("es") ? "es" : "en";
};

export function AppBackground({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {/* GRADIENTE BASE NEGRO */}
      <LinearGradient
        colors={["#000000", "#0a0a0a", "#000000"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* MANCHAS VERDES ULTRA DIFUMINADAS */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(0, 255, 127, 0.08)",
          "rgba(0, 255, 127, 0.12)",
          "rgba(0, 255, 127, 0.15)",
          "rgba(0, 255, 127, 0.1)",
          "transparent",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.blob1}
      />
      <LinearGradient
        colors={[
          "transparent",
          "rgba(0, 255, 127, 0.06)",
          "rgba(0, 255, 127, 0.1)",
          "rgba(0, 255, 127, 0.12)",
          "rgba(0, 255, 127, 0.08)",
          "transparent",
        ]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.blob2}
      />
      <LinearGradient
        colors={[
          "transparent",
          "rgba(0, 255, 127, 0.05)",
          "rgba(0, 255, 127, 0.09)",
          "rgba(0, 255, 127, 0.07)",
          "transparent",
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.blob3}
      />
      {/* CONTENIDO */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

// Componente de Header
function Header({ t }: { t: any }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{t.settings}</Text>
    </View>
  );
}

// Componente de Perfil de Usuario
function ProfileSection({ user, t }: any) {
  return (
    <TouchableOpacity style={styles.profileSection} activeOpacity={0.7}>
      <Image
        source={{
          uri: user?.externalAccounts[0]?.imageUrl || user?.imageUrl,
        }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {user?.externalAccounts[0]?.firstName ||
            user?.firstName ||
            user?.username}
        </Text>
        <Text style={styles.profileEmail}>
          {user?.emailAddresses[0]?.emailAddress}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color="#6b7280" />
    </TouchableOpacity>
  );
}

// Componente de Sección
function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

// Componente de Item de Configuración
function SettingItem({ icon, label, value, onPress, showChevron = true }: any) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Feather name={icon} size={18} color="#ffffff" />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {showChevron && (
          <Feather name="chevron-right" size={18} color="#6b7280" />
        )}
      </View>
    </TouchableOpacity>
  );
}

// Componente de Item con Switch
function SettingSwitch({ icon, label, value, onValueChange }: any) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Feather name={icon} size={18} color="#ffffff" />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#3e3e3e", true: "#00ff7f" }}
        thumbColor="#ffffff"
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
}

// Componente de Selector de Idioma
function LanguageSelector({ t, selectedLanguage, onSelect }: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SettingItem
        icon="globe"
        label={t.language}
        value={selectedLanguage === "es" ? t.spanish : t.english}
        onPress={() => setShowModal(true)}
      />
      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t.language}</Text>
            <TouchableOpacity
              style={[
                styles.modalOption,
                selectedLanguage === "es" && styles.modalOptionActive,
              ]}
              onPress={() => {
                onSelect("es");
                setShowModal(false);
              }}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  selectedLanguage === "es" && styles.modalOptionTextActive,
                ]}
              >
                {t.spanish}
              </Text>
              {selectedLanguage === "es" && (
                <Feather name="check" size={18} color="#00ff7f" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                selectedLanguage === "en" && styles.modalOptionActive,
              ]}
              onPress={() => {
                onSelect("en");
                setShowModal(false);
              }}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  selectedLanguage === "en" && styles.modalOptionTextActive,
                ]}
              >
                {t.english}
              </Text>
              {selectedLanguage === "en" && (
                <Feather name="check" size={18} color="#00ff7f" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCancelText}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

// Componente de Selector de Moneda
function CurrencySelector({
  t,
  selectedCurrency,
  onSelect,
  exchangeRate,
  loading,
}: any) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setShowModal(true)}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View style={styles.settingIcon}>
            <Feather name="dollar-sign" size={18} color="#ffffff" />
          </View>
          <View>
            <Text style={styles.settingLabel}>{t.currency}</Text>
            {selectedCurrency === "USD" && exchangeRate && (
              <Text style={styles.exchangeRateText}>
                1 USD = ${exchangeRate.venta} ARS
              </Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          <Text style={styles.settingValue}>
            {selectedCurrency === "ARS" ? "ARS" : "USD"}
          </Text>
          <Feather name="chevron-right" size={18} color="#6b7280" />
        </View>
      </TouchableOpacity>

      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{t.currency}</Text>

            <TouchableOpacity
              style={[
                styles.modalOption,
                selectedCurrency === "ARS" && styles.modalOptionActive,
              ]}
              onPress={() => {
                onSelect("ARS");
                setShowModal(false);
              }}
            >
              <View>
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedCurrency === "ARS" && styles.modalOptionTextActive,
                  ]}
                >
                  {t.argentinePeso}
                </Text>
              </View>
              {selectedCurrency === "ARS" && (
                <Feather name="check" size={18} color="#00ff7f" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalOption,
                selectedCurrency === "USD" && styles.modalOptionActive,
              ]}
              onPress={() => {
                onSelect("USD");
                setShowModal(false);
              }}
            >
              <View>
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedCurrency === "USD" && styles.modalOptionTextActive,
                  ]}
                >
                  {t.usDollar}
                </Text>
                {exchangeRate && !loading && (
                  <Text style={styles.modalOptionSubtext}>
                    {t.exchangeRate}: ${exchangeRate.venta}{" "}
                    {t.official.toLowerCase()}
                  </Text>
                )}
                {loading && (
                  <Text style={styles.modalOptionSubtext}>{t.loading}</Text>
                )}
              </View>
              {selectedCurrency === "USD" && (
                <Feather name="check" size={18} color="#00ff7f" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCancelText}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

export default function Config() {
  const { user, isLoaded } = useUser();
  const [lang, setLang] = useState<"es" | "en">(getDeviceLanguage());
  const [currency, setCurrency] = useState<"ARS" | "USD">("ARS");
  const [exchangeRate, setExchangeRate] = useState<any>(null);
  const [loadingRate, setLoadingRate] = useState(false);

  // Estados para notificaciones
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  // Estados para seguridad
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const t = translations[lang];

  // Cargar cotización del dólar
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoadingRate(true);
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
        const data = await response.json();
        setExchangeRate(data);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      } finally {
        setLoadingRate(false);
      }
    };

    fetchExchangeRate();

    // Actualizar cada 5 minutos
    const interval = setInterval(fetchExchangeRate, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Alert.alert(t.logout, t.logoutConfirm, [
      {
        text: t.cancel,
        style: "cancel",
      },
      {
        text: t.confirm,
        onPress: () => {
          // Aquí implementarías el logout con Clerk
          console.log("Logout");
        },
        style: "destructive",
      },
    ]);
  };

  if (!isLoaded) {
    return (
      <AppBackground>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t.loading}</Text>
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <View style={styles.page}>
        <Header t={t} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Perfil */}
          <ProfileSection user={user} t={t} />

          {/* Preferencias */}
          <Section title={t.preferences}>
            <LanguageSelector
              t={t}
              selectedLanguage={lang}
              onSelect={setLang}
            />
            <CurrencySelector
              t={t}
              selectedCurrency={currency}
              onSelect={setCurrency}
              exchangeRate={exchangeRate}
              loading={loadingRate}
            />
          </Section>

          {/* Notificaciones */}
          <Section title={t.notifications}>
            <SettingSwitch
              icon="bell"
              label={t.pushNotifications}
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />
            <SettingSwitch
              icon="mail"
              label={t.emailNotifications}
              value={emailEnabled}
              onValueChange={setEmailEnabled}
            />
            <SettingSwitch
              icon="alert-circle"
              label={t.transactionAlerts}
              value={transactionAlerts}
              onValueChange={setTransactionAlerts}
            />
          </Section>

          {/* Seguridad */}
          <Section title={t.security}>
            <SettingItem
              icon="lock"
              label={t.changePassword}
              onPress={() => console.log("Change password")}
            />
            <SettingSwitch
              icon="fingerprint"
              label={t.biometrics}
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
            />
            <SettingSwitch
              icon="shield"
              label={t.twoFactor}
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
            />
          </Section>

          {/* Acerca de */}
          <Section title={t.about}>
            <SettingItem
              icon="info"
              label={t.version}
              value="1.0.0"
              showChevron={false}
            />
            <SettingItem
              icon="file-text"
              label={t.termsConditions}
              onPress={() => console.log("Terms")}
            />
            <SettingItem
              icon="shield"
              label={t.privacyPolicy}
              onPress={() => console.log("Privacy")}
            />
            <SettingItem
              icon="help-circle"
              label={t.help}
              onPress={() => console.log("Help")}
            />
          </Section>

          {/* Cerrar sesión */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Feather name="log-out" size={18} color="#ff4757" />
            <Text style={styles.logoutText}>{t.logout}</Text>
          </TouchableOpacity>

          {/* Espacio para el tab bar */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
  },
  blob1: {
    position: "absolute",
    width: 350,
    height: 420,
    borderRadius: 175,
    top: -180,
    left: -150,
    opacity: 0.7,
    transform: [{ scaleX: 1.3 }, { rotate: "25deg" }],
  },
  blob2: {
    position: "absolute",
    width: 320,
    height: 380,
    borderRadius: 160,
    bottom: -150,
    right: -120,
    opacity: 0.6,
    transform: [{ scaleY: 1.4 }, { rotate: "-35deg" }],
  },
  blob3: {
    position: "absolute",
    width: 280,
    height: 350,
    borderRadius: 140,
    top: 200,
    left: -80,
    opacity: 0.5,
    transform: [{ scaleX: 1.5 }, { rotate: "15deg" }],
  },
  page: {
    flex: 1,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  // Header
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  // Profile Section
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#00ff7f",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#9ca3af",
  },
  // Section
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    overflow: "hidden",
  },
  // Setting Item
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "500",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
    color: "#9ca3af",
  },
  exchangeRateText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  // Modal
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "85%",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    marginBottom: 8,
  },
  modalOptionActive: {
    backgroundColor: "rgba(0, 255, 127, 0.1)",
    borderColor: "rgba(0, 255, 127, 0.3)",
  },
  modalOptionText: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "500",
  },
  modalOptionTextActive: {
    color: "#00ff7f",
  },
  modalOptionSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  modalCancel: {
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 15,
    color: "#9ca3af",
    fontWeight: "500",
  },
  // Logout Button
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
    backgroundColor: "rgba(255, 71, 87, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 71, 87, 0.2)",
    borderRadius: 12,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    color: "#ff4757",
    fontWeight: "600",
  },
});
