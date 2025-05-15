import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { List, FAB, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CategoryScreen = ({ navigation }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
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
      const token = await AsyncStorage.getItem("authToken");
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  sectionText: {
    fontSize: 20,
    marginVertical: 16,
    color: "#444",
  },
});

export default CategoryScreen;
