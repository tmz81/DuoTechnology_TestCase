import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { List, FAB, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BrandListScreen = ({ navigation }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get("SUA_API_URL/brands", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as marcas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await axios.delete(`SUA_API_URL/brands/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBrands();
    } catch (error) {
      Alert.alert("Erro", "Falha ao excluir marca");
    }
  };

  useEffect(() => {
    fetchBrands();
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
        {brands.map((brand) => (
          <List.Item
            key={brand.id}
            title={brand.name}
            left={() => <List.Icon icon="factory" />}
            right={() => (
              <View style={styles.actions}>
                <List.Icon
                  icon="pencil"
                  onPress={() => navigation.navigate("BrandForm", { brand })}
                />
                <List.Icon
                  icon="delete"
                  onPress={() => handleDelete(brand.id)}
                />
              </View>
            )}
          />
        ))}
      </List.Section>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("BrandForm")}
      />
    </View>
  );
};

// Estilos similares ao VehicleListScreen
export default BrandListScreen;
