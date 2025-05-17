import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, TextInput, Text, ActivityIndicator } from "react-native-paper";
import {
  getAllBrands,
  createBrand,
  updateBrand,
} from "../../services/brandsService";

const BrandForm = ({ route, navigation }) => {
  const { brand } = route.params || {};

  const [name, setName] = useState(brand?.name || "");
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const brandsData = await getAllBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Erro ao carregar marcas:", error);
        Alert.alert("Erro", "Falha ao carregar marcas");
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { name };

      if (brand) {
        await updateBrand(brand.id, payload);
        Alert.alert("Sucesso", "Marca atualizada com sucesso!");
      } else {
        await createBrand(payload);
        Alert.alert("Sucesso", "Marca criada com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar marca:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha ao salvar marca"
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
        {brand ? "Editar Marca" : "Adicionar Nova Marca"}
      </Text>

      <TextInput
        label="Nome da Marca"
        value={name}
        onChangeText={setName}
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
        {brand ? "Atualizar Marca" : "Cadastrar Marca"}
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
  button: {
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonContent: {
    height: 46,
  },
});

export default BrandForm;
