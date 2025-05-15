import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Card, Text, FAB, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import { getVehicles, deleteVehicle } from "../services/vehiclesService";

const VehicleScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const isAdmin = user?.isAdmin || false;

  const loadVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os veículos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

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
        subtitle={`Marca: ${item.brand} • Ano: ${item.year}`}
      />
      <Card.Content>
        <Text variant="bodyMedium">Placa: {item.licensePlate}</Text>
        <Text variant="bodyMedium">Categoria: {item.category}</Text>
      </Card.Content>
      {isAdmin && (
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("VehicleForm", { vehicle: item })
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
      <FlatList
        data={vehicles}
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
          onPress={() => navigation.navigate("VehicleForm")}
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
});

export default VehicleScreen;
