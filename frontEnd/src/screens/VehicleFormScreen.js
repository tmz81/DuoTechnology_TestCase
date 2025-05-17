import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { createVehicle, updateVehicle } from "../services/vehiclesService";
import { getAllBrands } from "../services/brandsService";
import { getAllCategorys } from "../services/categorysService";

const VehicleFormScreen = ({ route, navigation }) => {
  const { vehicle } = route.params || {};

  const [form, setForm] = useState({
    model: vehicle?.model || "",
    brand_id: vehicle?.brand?.id || "",
    category_id: vehicle?.category?.id || "",
    year: vehicle?.year?.toString() || "",
    daily_price: vehicle?.daily_price?.toString() || "",
    available: vehicle?.available ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [brandsData, categoriesData] = await Promise.all([
          getAllBrands(),
          getAllCategorys(),
        ]);
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao carregar opções:", error);
        Alert.alert("Erro", "Falha ao carregar marcas e categorias");
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        model: form.model,
        brand_id: form.brand_id,
        category_id: form.category_id,
        year: parseInt(form.year),
        daily_price: parseFloat(form.daily_price),
        available: form.available,
      };

      if (vehicle) {
        await updateVehicle(vehicle.id, payload);
        Alert.alert("Sucesso", "Veículo atualizado com sucesso!");
      } else {
        await createVehicle(payload);
        Alert.alert("Sucesso", "Veículo criado com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha ao salvar veículo"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingOptions) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {vehicle ? "Editar Veículo" : "Adicionar Novo Veículo"}
      </Text>

      <TextInput
        label="Modelo"
        value={form.model}
        onChangeText={(text) => setForm({ ...form, model: text })}
        style={styles.input}
        mode="outlined"
      />

      <Text style={styles.label}>Marca</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.brand_id}
          onValueChange={(value) => setForm({ ...form, brand_id: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma marca" value="" />
          {brands.map((brand) => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.category_id}
          onValueChange={(value) => setForm({ ...form, category_id: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {categories.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.description}
              value={category.id}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        label="Ano"
        value={form.year}
        onChangeText={(text) => setForm({ ...form, year: text })}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Preço Diário"
        value={form.daily_price}
        onChangeText={(text) => setForm({ ...form, daily_price: text })}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        {vehicle ? "Atualizar Veículo" : "Cadastrar Veículo"}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "500",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonContent: {
    height: 46,
  },
});

export default VehicleFormScreen;
