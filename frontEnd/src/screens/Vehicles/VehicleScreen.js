import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Button,
  Card,
  Text,
  TextInput,
  FAB,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import { getAllVehicles, deleteVehicle } from "../../services/vehiclesService";

const VehicleScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const isAdmin = user?.isAdmin || false;

  const loadVehicles = async () => {
    try {
      const data = await getAllVehicles();
      setVehicles(data);
      setFilteredVehicles(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os veículos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const applyGeneralFilter = () => {
    const lower = searchText.toLowerCase();

    const filtered = vehicles.filter((v) => {
      return (
        v.model.toLowerCase().includes(lower) ||
        v.brand.name.toLowerCase().includes(lower) ||
        v.category.description.toLowerCase().includes(lower) ||
        String(v.year).includes(lower) ||
        String(v.price).includes(lower)
      );
    });

    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  useEffect(() => {
    applyGeneralFilter();
  }, [searchText, vehicles]);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este veículo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteVehicle(id);
              loadVehicles();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir veículo");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.model}
        subtitle={`Marca: ${item.brand.name} • Ano: ${item.year}`}
      />
      <Card.Content>
        <Text variant="bodyMedium">Categoria: {item.category.description}</Text>
      </Card.Content>
      {isAdmin && (
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("VehicleFormScreen", { vehicle: item })
            }
          >
            Editar
          </Button>
          <Button onPress={() => handleDelete(item.id)} textColor="#ff0000">
            Excluir
          </Button>
        </Card.Actions>
      )}
    </Card>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} animating={true} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Filtrar veículo..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
        mode="outlined"
        placeholder="Modelos, Marcas, Categorias, Anos ou Preços"
      />

      <FlatList
        data={filteredVehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadVehicles();
        }}
      />

      {isAdmin && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("VehicleFormScreen")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  input: {
    marginBottom: 10,
  },
});

export default VehicleScreen;
