import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { createVehicle, updateVehicle } from "../../services/vehiclesService";
import { getAllBrands } from "../../services/brandsService";
import { getAllCategorys } from "../../services/categorysService";
import { UserContext } from "../../context/UserContext";

const VehicleForm = ({ route, navigation }) => {
  const { vehicle } = route.params || {};
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    model: vehicle?.model || "",
    brand_id: vehicle?.brand?.id || "",
    category_id: vehicle?.category?.id || "",
    year: vehicle?.year?.toString() || "",
    daily_price: vehicle?.daily_price?.toString() || "",
    user_id: user.id,
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

  const formatarPreco = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = parseFloat(apenasNumeros) / 100;
    if (isNaN(numero)) return "R$ 0,00";
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const extrairValorNumerico = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    return parseFloat(apenasNumeros) / 100;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        model: form.model,
        id_brand: form.brand_id,
        id_category: form.category_id,
        year: parseInt(form.year),
        daily_price: extrairValorNumerico(form.daily_price),
        id_user: user.id,
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
        onChangeText={(text) => {
          const somenteNumeros = text.replace(/\D/g, "");
          if (somenteNumeros.length <= 4) {
            setForm({ ...form, year: somenteNumeros });
          }
        }}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Preço Diário"
        value={form.daily_price}
        onChangeText={(text) => {
          const formatado = formatarPreco(text);
          setForm({ ...form, daily_price: formatado });
        }}
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

export default VehicleForm;
