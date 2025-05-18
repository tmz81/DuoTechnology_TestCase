import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>
            {brand ? "Editar Marca" : "Nova Marca"}
          </Text>

          <TextInput
            label="Nome da Marca"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            placeholder="Digite o nome da marca"
            autoCapitalize="words"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || name.trim() === ""}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {brand ? "Atualizar" : "Cadastrar"}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
    marginTop: 10,
    borderRadius: 8,
  },
  buttonContent: {
    height: 50,
  },
});

export default BrandForm;
