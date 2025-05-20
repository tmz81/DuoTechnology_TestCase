import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Button,
  Card,
  Text,
  TextInput,
  FAB,
  ActivityIndicator,
} from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import { getAllVehicles, deleteVehicle } from "../../services/vehiclesService";
import { getTotal } from "../../services/homeService";
import { useConfirmDelete } from "../../hooks/useConfirmDelete";
import VehicleImage from "../../../assets/Onix.jpeg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const VehicleScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const isAdmin = user?.isAdmin || false;

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { confirmDelete, ModalAndSnackbar } = useConfirmDelete("Veículo");

  const loadVehicles = async () => {
    try {
      const data = await getAllVehicles();
      await getTotal();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadVehicles();
    }, [])
  );

  useEffect(() => {
    const lower = searchText.toLowerCase();
    const filtered = vehicles.filter(
      (v) =>
        v.model.toLowerCase().includes(lower) ||
        v.brand.name.toLowerCase().includes(lower) ||
        v.category.description.toLowerCase().includes(lower) ||
        String(v.year).includes(lower) ||
        String(v.price).includes(lower)
    );
    setFilteredVehicles(filtered);
  }, [searchText, vehicles]);

  const renderItem = ({ item }) => (
    <Card style={styles.carCard}>
      <Card.Cover source={VehicleImage} style={styles.carImage} />
      <Card.Content style={styles.carContent}>
        <View style={styles.cardHeader}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.9/5.0</Text>
          </View>
          <Text style={styles.availableText}>Disponível agora</Text>
        </View>

        <View style={styles.carInfo}>
          <Text style={styles.carBrand}>{item.brand.name}</Text>
          <Text style={styles.carModel}>
            {item.model} {item.year}
          </Text>
        </View>

        <Text style={styles.priceText}>
          R${parseFloat(item.daily_price).toFixed(2)}/dia
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
            <MaterialCommunityIcons name="car-door" size={16} color="#6c63ff" />
            <Text style={styles.specText}>Hatchback</Text>
          </View>
        </View>

        {isAdmin && (
          <View style={styles.adminActions}>
            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("VehicleForm", { vehicle: item })
              }
              style={styles.editButton}
            >
              Editar
            </Button>
            <Button
              mode="contained"
              onPress={() =>
                confirmDelete(item.id, deleteVehicle, loadVehicles)
              }
              style={styles.deleteButton}
            >
              Excluir
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator animating size="large" />
        <Text style={{ marginTop: 10 }}>Carregando veículos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Buscar veículo..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
        mode="outlined"
        placeholder="Digite modelo, marca, ano ou preço"
        returnKeyType="search"
      />

      {filteredVehicles.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum veículo encontrado.</Text>
      ) : (
        <FlatList
          data={filteredVehicles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadVehicles();
          }}
          contentContainerStyle={styles.listContent}
        />
      )}

      <ModalAndSnackbar />

      {isAdmin && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate("VehicleForm")}
          label="Novo"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  carCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  carImage: {
    height: 220,
    resizeMode: "contain",
    marginBottom: 10,
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
  adminActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#6c63ff",
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#ff3b30",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  emptyText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});

export default VehicleScreen;
