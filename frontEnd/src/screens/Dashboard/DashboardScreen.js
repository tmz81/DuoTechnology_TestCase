import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Card,
  Text,
  ActivityIndicator,
  Button,
  useTheme,
} from "react-native-paper";
import { getTotal, getVehicleRecent } from "../../services/homeService";
import VehicleImage from "../../../assets/Onix.jpeg";
import { getAllBrands } from "../../services/brandsService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DashboardScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [brands, setGetBrands] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totals, setTotals] = useState({
    vehicles: 0,
    brands: 0,
    categories: 0,
  });
  const [recentVehicles, setRecentVehicles] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const fetchData = async () => {
    try {
      const totalsResponse = await getTotal();
      const recentResponse = await getVehicleRecent();
      const brands = await getAllBrands();
      setTotals(totalsResponse);
      setRecentVehicles(recentResponse);
      setGetBrands(brands);
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar dados");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* Cards de Resumo - Improved Layout */}
      <View style={styles.cardsContainer}>
        <Card style={[styles.card, { backgroundColor: "#4e79a7" }]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="car" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Veículos</Text>
              <Text style={styles.cardCount}>{totals?.vehicles ?? 0}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: "#f28e2b" }]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="tag" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Marcas</Text>
              <Text style={styles.cardCount}>{totals?.brands ?? 0}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: "#e15759" }]}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="shape" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Categorias</Text>
              <Text style={styles.cardCount}>{totals?.categories ?? 0}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Filtros de Marca */}
      <View style={styles.brandSection}>
        <Text style={styles.sectionTitle}>Marcas Disponíveis</Text>
        <View style={styles.brandRow}>
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand.id}
              style={[
                styles.brandButton,
                selectedBrand === brand && styles.selectedBrand,
              ]}
              onPress={() => setSelectedBrand(brand)}
            >
              <Text style={styles.brandText}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
          <Button
            mode="text"
            onPress={() =>
              navigation.navigate("Brands", { screen: "BrandList" })
            }
          >
            View all
          </Button>
        </View>
      </View>

      {/* Seção de Recomendações */}
      <View style={styles.recommendationSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recomendações</Text>
          <Button
            mode="text"
            onPress={() =>
              navigation.navigate("Vehicles", { screen: "VehicleList" })
            }
          >
            Ver todos
          </Button>
        </View>

        {recentVehicles.map((car) => (
          <Card key={car.id} style={styles.carCard}>
            <Card.Cover source={VehicleImage} style={styles.carImage} />
            <Card.Content style={styles.carContent}>
              <View style={styles.cardHeader}>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color="#FFD700"
                  />
                  <Text style={styles.ratingText}>4.9/5.0</Text>
                </View>
                <Text style={styles.availableText}>Disponível agora</Text>
              </View>

              <View style={styles.carInfo}>
                <Text style={styles.carBrand}>{car.brand.name}</Text>
                <Text style={styles.carModel}>
                  {car.model} {car.year}
                </Text>
              </View>

              <Text style={styles.priceText}>
                R${parseFloat(car.daily_price).toFixed(2)}/dia
              </Text>

              <View style={styles.specsContainer}>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons name="fuel" size={16} color="#6c63ff" />
                  <Text style={styles.specText}>Petrol</Text>
                </View>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons
                    name="car-shift-pattern"
                    size={16}
                    color="#6c63ff"
                  />
                  <Text style={styles.specText}>Manual</Text>
                </View>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons
                    name="car-door"
                    size={16}
                    color="#6c63ff"
                  />
                  <Text style={styles.specText}>Hatchback</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

 const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardLabel: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  cardCount: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 2,
  },
  carCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  carImage: {
    height: 180,
  },
  carContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
  },
  availableText: {
    color: "#00CC00",
    fontWeight: "bold",
    fontSize: 14,
  },
  carInfo: {
    marginBottom: 12,
  },
  carBrand: {
    fontSize: 16,
    color: "#666",
  },
  carModel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  specsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  specText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  locationSection: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  brandSection: {
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  brandRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  brandButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedBrand: {
    backgroundColor: "#e0e0ff",
  },
  brandText: {
    color: "#6c63ff",
  },
  recommendationSection: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  carCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 10,
  },
  ratingText: {
    color: "#ffa500",
    fontWeight: "bold",
  },
  availableText: {
    color: "#00cc00",
    fontWeight: "bold",
  },
  carImage: {
    height: 215,
    resizeMode: "contain",
    marginBottom: 10,
  },
  carName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  priceText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
    fontWeight: "bold",
  },
  carSpecs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  specText: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: "#666",
    fontSize: 12,
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default DashboardScreen;
