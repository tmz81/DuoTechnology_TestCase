import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VehicleFormScreen = ({ route, navigation }) => {
  const { vehicle } = route.params || {};
  const [form, setForm] = useState({
    model: "",
    brand: "",
    year: "",
    category: "",
    ...vehicle,
  });
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const [brandsRes, categoriesRes] = await Promise.all([
          axios.get("SUA_API_URL/brands", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("SUA_API_URL/categories", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setBrands(brandsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar opções");
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const payload = {
        model: form.model,
        brand_id: form.brand,
        category_id: form.category,
        year: form.year,
      };

      if (vehicle) {
        await axios.put(`SUA_API_URL/vehicles/${vehicle.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("SUA_API_URL/vehicles", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar veículo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.Text}>{vehicle ? "Editar" : "Novo"} Veículo</Text>

      <TextInput
        label="Modelo"
        value={form.model}
        onChangeText={(text) => setForm({ ...form, model: text })}
        style={styles.input}
      />

      <TextInput
        label="Ano"
        value={form.year}
        onChangeText={(text) => setForm({ ...form, year: text })}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Salvar
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  Text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default VehicleFormScreen;
