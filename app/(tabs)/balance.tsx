import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import * as Localization from "expo-localization";

// Traducciones
const translations = {
  es: {
    movements: "Movimientos",
    all: "Todos",
    income: "Ingresos",
    expenses: "Gastos",
    pending: "Pendientes",
    export: "Exportar movimientos",
    today: "Hoy",
    yesterday: "Ayer",
    pendingBadge: "Pendiente",
    // Categorías
    onlineShopping: "Compras en línea",
    transport: "Transporte",
    foodDrink: "Comida y bebida",
    incomeFrom: "Ingreso",
    subscriptions: "Suscripciones",
    shopping: "Compras",
    health: "Salud",
    services: "Servicios",
    fuel: "Combustible",
    fastFood: "Comida rápida",
    salary: "Ingreso",
  },
  en: {
    movements: "Transactions",
    all: "All",
    income: "Income",
    expenses: "Expenses",
    pending: "Pending",
    export: "Export transactions",
    today: "Today",
    yesterday: "Yesterday",
    pendingBadge: "Pending",
    // Categories
    onlineShopping: "Online shopping",
    transport: "Transport",
    foodDrink: "Food & drink",
    incomeFrom: "Income",
    subscriptions: "Subscriptions",
    shopping: "Shopping",
    health: "Health",
    services: "Services",
    fuel: "Fuel",
    fastFood: "Fast food",
    salary: "Income",
  },
};

// Detectar idioma del dispositivo
const getDeviceLanguage = (): "es" | "en" => {
  const locale = Localization.getLocales();
  return locale[0].languageCode?.startsWith("es") ? "es" : "en";
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

// Componente de Header con título y búsqueda
function Header({ t }: { t: any }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{t.movements}</Text>
      <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
        <Feather name="search" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

// Componente de Resumen Rápido (ahora arriba)
function QuickSummary({ t }: { t: any }) {
  return (
    <View style={styles.quickSummary}>
      <View style={styles.summaryItem}>
        <View style={styles.summaryIconContainer}>
          <Feather name="arrow-down-left" size={18} color="#00ff7f" />
        </View>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryLabel}>{t.income}</Text>
          <Text style={styles.summaryAmount}>$45,200</Text>
        </View>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <View style={styles.summaryIconContainerRed}>
          <Feather name="arrow-up-right" size={18} color="#ff4757" />
        </View>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryLabel}>{t.expenses}</Text>
          <Text style={styles.summaryAmount}>$34,340</Text>
        </View>
      </View>
    </View>
  );
}

// Componente de Filtros (ahora debajo del resumen)
function FilterTabs({ t }: { t: any }) {
  const [activeFilter, setActiveFilter] = useState(t.all);
  const filters = [t.all, t.income, t.expenses, t.pending];

  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(filter)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
        <Feather name="sliders" size={18} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

// Componente de Transacción Individual
function TransactionItem({ transaction, t }: any) {
  const isPositive = transaction.amount > 0;
  const isPending = transaction.status === "pending";

  return (
    <TouchableOpacity style={styles.transactionItem} activeOpacity={0.7}>
      <View
        style={[
          styles.transactionIcon,
          isPositive && styles.transactionIconPositive,
          isPending && styles.transactionIconPending,
        ]}
      >
        <Feather
          name={transaction.icon}
          size={20}
          color={isPending ? "#ffa502" : isPositive ? "#00ff7f" : "#ffffff"}
        />
      </View>

      <View style={styles.transactionDetails}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>{transaction.title}</Text>
          {isPending && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>{t.pendingBadge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>

      <View style={styles.transactionRight}>
        <Text
          style={[
            styles.transactionAmount,
            isPositive && styles.transactionAmountPositive,
          ]}
        >
          {isPositive ? "+" : ""}$
          {Math.abs(transaction.amount).toLocaleString("es-AR")}
        </Text>
        <Feather name="chevron-right" size={16} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
}

// Componente de Grupo de Transacciones por Fecha
function TransactionGroup({ date, transactions, t }: any) {
  const totalDay = transactions.reduce(
    (sum: number, t: any) => sum + t.amount,
    0,
  );

  return (
    <View style={styles.transactionGroup}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupDate}>{date}</Text>
        <Text
          style={[styles.groupTotal, totalDay > 0 && styles.groupTotalPositive]}
        >
          {totalDay > 0 ? "+" : ""}${Math.abs(totalDay).toLocaleString("es-AR")}
        </Text>
      </View>
      <View style={styles.groupTransactions}>
        {transactions.map((transaction: any) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            t={t}
          />
        ))}
      </View>
    </View>
  );
}

// Botón de Exportar
function ExportButton({ t }: { t: any }) {
  return (
    <TouchableOpacity style={styles.exportButton} activeOpacity={0.7}>
      <Feather name="download" size={18} color="#ffffff" />
      <Text style={styles.exportText}>{t.export}</Text>
    </TouchableOpacity>
  );
}

export default function Balance() {
  const lang = getDeviceLanguage();
  const t = translations[lang];

  // Datos de ejemplo - en producción vendrían de una API
  const transactionsByDate = [
    {
      date: `${t.today}, 21 Ene`,
      transactions: [
        {
          id: 1,
          title: "Mercado Libre",
          category: t.onlineShopping,
          date: "14:30",
          amount: -2450,
          icon: "shopping-bag",
          status: "completed",
        },
        {
          id: 2,
          title: "Uber",
          category: t.transport,
          date: "12:15",
          amount: -850,
          icon: "navigation",
          status: "completed",
        },
        {
          id: 3,
          title: "Starbucks",
          category: t.foodDrink,
          date: "09:30",
          amount: -1200,
          icon: "coffee",
          status: "completed",
        },
      ],
    },
    {
      date: `${t.yesterday}, 20 Ene`,
      transactions: [
        {
          id: 4,
          title: lang === "es" ? "Transferencia recibida" : "Transfer received",
          category: `${t.incomeFrom} • Juan Pérez`,
          date: "18:45",
          amount: 15000,
          icon: "arrow-down-left",
          status: "completed",
        },
        {
          id: 5,
          title: "Netflix",
          category: t.subscriptions,
          date: "16:20",
          amount: -2499,
          icon: "tv",
          status: "completed",
        },
        {
          id: 6,
          title: "Spotify",
          category: t.subscriptions,
          date: "16:20",
          amount: -1099,
          icon: "music",
          status: "completed",
        },
        {
          id: 7,
          title: lang === "es" ? "Supermercado Día" : "Día Supermarket",
          category: t.shopping,
          date: "11:00",
          amount: -8450,
          icon: "shopping-cart",
          status: "completed",
        },
      ],
    },
    {
      date: "19 Ene",
      transactions: [
        {
          id: 8,
          title: lang === "es" ? "Pago de salario" : "Salary payment",
          category: `${t.salary} • ${lang === "es" ? "Empresa SA" : "Company Inc"}`,
          date: "08:00",
          amount: 120000,
          icon: "briefcase",
          status: "completed",
        },
        {
          id: 9,
          title: "Farmacity",
          category: t.health,
          date: "19:30",
          amount: -3200,
          icon: "heart",
          status: "completed",
        },
      ],
    },
    {
      date: "18 Ene",
      transactions: [
        {
          id: 10,
          title: lang === "es" ? "Pago pendiente" : "Pending payment",
          category: t.services,
          date: "10:00",
          amount: -5600,
          icon: "clock",
          status: "pending",
        },
        {
          id: 11,
          title: "YPF",
          category: t.fuel,
          date: "14:20",
          amount: -12000,
          icon: "droplet",
          status: "completed",
        },
        {
          id: 12,
          title: "McDonald's",
          category: t.fastFood,
          date: "13:45",
          amount: -2890,
          icon: "coffee",
          status: "completed",
        },
      ],
    },
  ];

  return (
    <AppBackground>
      <View style={styles.page}>
        <Header t={t} />
        <QuickSummary t={t} />
        <FilterTabs t={t} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {transactionsByDate.map((group, index) => (
            <TransactionGroup
              key={index}
              date={group.date}
              transactions={group.transactions}
              t={t}
            />
          ))}

          <ExportButton t={t} />

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
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  // Quick Summary (ahora arriba)
  quickSummary: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    gap: 20,
  },
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  summaryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: "rgba(0, 255, 127, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryIconContainerRed: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: "rgba(255, 71, 87, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryInfo: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 19,
    fontWeight: "700",
    color: "#ffffff",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  // Filters (ahora debajo del resumen)
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    marginBottom: 20,
    gap: 12,
  },
  filterScroll: {
    paddingRight: 20,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterTabActive: {
    backgroundColor: "rgba(0, 255, 127, 0.15)",
    borderColor: "rgba(0, 255, 127, 0.3)",
  },
  filterText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#00ff7f",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  // Transaction Group
  transactionGroup: {
    marginBottom: 24,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  groupDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },
  groupTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  groupTotalPositive: {
    color: "#00ff7f",
  },
  groupTransactions: {
    gap: 8,
  },
  // Transaction Item
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
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  transactionIconPositive: {
    backgroundColor: "rgba(0, 255, 127, 0.1)",
  },
  transactionIconPending: {
    backgroundColor: "rgba(255, 165, 2, 0.1)",
  },
  transactionDetails: {
    flex: 1,
    gap: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  transactionTitle: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "600",
  },
  pendingBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "rgba(255, 165, 2, 0.15)",
    borderRadius: 4,
  },
  pendingText: {
    fontSize: 10,
    color: "#ffa502",
    fontWeight: "600",
  },
  transactionCategory: {
    fontSize: 13,
    color: "#9ca3af",
  },
  transactionDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  transactionRight: {
    alignItems: "flex-end",
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionAmount: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "700",
  },
  transactionAmountPositive: {
    color: "#00ff7f",
  },
  // Export Button
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  exportText: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "500",
  },
});
