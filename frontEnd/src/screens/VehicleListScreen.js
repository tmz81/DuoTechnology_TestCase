import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { List, FAB, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VehicleListScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get("SUA_API_URL/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os veículos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await axios.delete(`SUA_API_URL/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVehicles();
    } catch (error) {
      Alert.alert("Erro", "Falha ao excluir veículo");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <List.Section>
        {vehicles.map((vehicle) => (
          <List.Item
            key={vehicle.id}
            title={vehicle.model}
            description={`Marca: ${vehicle.brand} • Ano: ${vehicle.year}`}
            left={() => <List.Icon icon="car" />}
            right={() => (
              <View style={styles.actions}>
                <List.Icon
                  icon="pencil"
                  onPress={() =>
                    navigation.navigate("VehicleForm", { vehicle })
                  }
                />
                <List.Icon
                  icon="delete"
                  onPress={() => handleDelete(vehicle.id)}
                />
              </View>
            )}
          />
        ))}
      </List.Section>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("VehicleForm")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default VehicleListScreen;
