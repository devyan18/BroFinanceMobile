import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

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

// Componente de Header con foto de perfil y saludo
function Header({ user }: any) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.userName}>
          {user?.externalAccounts[0]?.firstName ||
            user?.firstName ||
            user?.username}
        </Text>
      </View>
      <Image
        source={{
          uri: user?.externalAccounts[0]?.imageUrl || user?.imageUrl,
        }}
        style={styles.profileImage}
      />
    </View>
  );
}

// Componente de Balance Principal (saldo a favor)
function BalanceCard({ balance }: { balance: number }) {
  return (
    <View style={styles.balanceCard}>
      <LinearGradient
        colors={["rgba(0, 255, 127, 0.1)", "rgba(0, 255, 127, 0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.balanceGradient}
      >
        <Text style={styles.balanceLabel}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>
          ${balance.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
        </Text>
        <View style={styles.balanceFooter}>
          <Feather name="trending-up" size={16} color="#00ff7f" />
          <Text style={styles.balanceChange}>+2.5% este mes</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

// Componente de Acciones Rápidas
function QuickActions() {
  const actions = [
    { icon: "arrow-up-right", label: "Enviar", color: "#ffffff" },
    { icon: "arrow-down-left", label: "Recibir", color: "#00ff7f" },
    { icon: "credit-card", label: "Tarjetas", color: "#ffffff" },
    { icon: "repeat", label: "Convertir", color: "#ffffff" },
  ];

  return (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>Acciones rápidas</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.actionButton,
              action.label === "Recibir" && styles.actionButtonHighlight,
            ]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.actionIconContainer,
                action.label === "Recibir" && styles.actionIconHighlight,
              ]}
            >
              <Feather
                name={action.icon as any}
                size={20}
                color={action.color}
              />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Componente de Resumen de Gastos
function SpendingSummary() {
  const categories = [
    { name: "Compras", amount: 15420, percentage: 45, color: "#00ff7f" },
    { name: "Comida", amount: 8930, percentage: 26, color: "#ffffff" },
    { name: "Transporte", amount: 6210, percentage: 18, color: "#6b7280" },
    { name: "Otros", amount: 3780, percentage: 11, color: "#4b5563" },
  ];

  return (
    <View style={styles.spendingSummary}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Gastos del mes</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Ver todo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spendingTotal}>
        <Text style={styles.spendingTotalLabel}>Total gastado</Text>
        <Text style={styles.spendingTotalAmount}>$34,340.00</Text>
      </View>

      <View style={styles.categoriesList}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: category.color },
                ]}
              />
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <View style={styles.categoryAmountContainer}>
              <Text style={styles.categoryAmount}>
                ${category.amount.toLocaleString("es-AR")}
              </Text>
              <Text style={styles.categoryPercentage}>
                {category.percentage}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// Componente de Transacciones Recientes
function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      title: "Mercado Libre",
      category: "Compras",
      date: "Hoy, 14:30",
      amount: -2450,
      icon: "shopping-bag",
    },
    {
      id: 2,
      title: "Transferencia recibida",
      category: "Ingreso",
      date: "Ayer, 09:15",
      amount: 15000,
      icon: "arrow-down-left",
    },
    {
      id: 3,
      title: "Starbucks",
      category: "Comida",
      date: "Ayer, 18:45",
      amount: -890,
      icon: "coffee",
    },
  ];

  return (
    <View style={styles.recentTransactions}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Actividad reciente</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionItem}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.transactionIcon,
                transaction.amount > 0 && styles.transactionIconPositive,
              ]}
            >
              <Feather
                name={transaction.icon as any}
                size={18}
                color={transaction.amount > 0 ? "#00ff7f" : "#ffffff"}
              />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>{transaction.title}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                transaction.amount > 0 && styles.transactionAmountPositive,
              ]}
            >
              {transaction.amount > 0 ? "+" : ""}$
              {Math.abs(transaction.amount).toLocaleString("es-AR")}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <AppBackground>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff7f" />
        </View>
      </AppBackground>
    );

  return (
    <AppBackground>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header user={user} />
        <BalanceCard balance={125340.5} />
        <QuickActions />
        <SpendingSummary />
        <RecentTransactions />

        {/* Espacio para el tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  greeting: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#00ff7f",
  },
  // Balance Card
  balanceCard: {
    marginBottom: 28,
    borderRadius: 20,
    overflow: "hidden",
  },
  balanceGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 127, 0.2)",
    borderRadius: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
  },
  balanceFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  balanceChange: {
    fontSize: 13,
    color: "#00ff7f",
    fontWeight: "500",
  },
  // Quick Actions
  quickActions: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  actionButtonHighlight: {
    // Espacio para destacar visualmente
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconHighlight: {
    backgroundColor: "rgba(0, 255, 127, 0.1)",
    borderColor: "rgba(0, 255, 127, 0.3)",
  },
  actionLabel: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  // Spending Summary
  spendingSummary: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#00ff7f",
    fontWeight: "500",
  },
  spendingTotal: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  spendingTotalLabel: {
    fontSize: 13,
    color: "#9ca3af",
    marginBottom: 6,
  },
  spendingTotalAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  categoriesList: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryName: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "500",
  },
  categoryAmountContainer: {
    alignItems: "flex-end",
    gap: 2,
  },
  categoryAmount: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "600",
  },
  categoryPercentage: {
    fontSize: 12,
    color: "#6b7280",
  },
  // Recent Transactions
  recentTransactions: {
    marginBottom: 32,
  },
  transactionsList: {
    gap: 8,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  transactionIconPositive: {
    backgroundColor: "rgba(0, 255, 127, 0.1)",
  },
  transactionInfo: {
    flex: 1,
    gap: 2,
  },
  transactionTitle: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  transactionAmount: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "600",
  },
  transactionAmountPositive: {
    color: "#00ff7f",
  },
});
