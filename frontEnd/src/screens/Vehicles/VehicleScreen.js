import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Button,
  Card,
  Text,
  TextInput,
  FAB,
  ActivityIndicator,
  Divider,
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
      Alert.alert("Erro", "Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

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

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este veículo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteVehicle(id);
              loadVehicles();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir veículo.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="outlined">
      <Card.Cover
        source={{ uri: `https://picsum.photos/seed/${item.id}/400/200` }}
      />
      <Card.Title
        title={item.model}
        subtitle={`Marca: ${item.brand.name} • Ano: ${item.year}`}
      />
      <Card.Content>
        <Text variant="bodyMedium">Categoria: {item.category.description}</Text>
        <Text variant="bodyMedium">
          Preço: R$ {Number(item.daily_price).toFixed(2)}
        </Text>
      </Card.Content>

      {isAdmin && (
        <Card.Actions style={styles.actions}>
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
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            Excluir
          </Button>
        </Card.Actions>
      )}
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
          ItemSeparatorComponent={() => (
            <Divider style={{ marginVertical: 5 }} />
          )}
        />
      )}

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
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 10,
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#2a9d8f",
  },
  deleteButton: {
    backgroundColor: "#e63946",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  input: {
    marginBottom: 10,
  },
  emptyText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});

export default VehicleScreen;
