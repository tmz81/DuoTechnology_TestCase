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
  getAllCategorys,
  createCategory,
  updateCategory,
} from "../../services/categorysService";

const CategoryForm = ({ route, navigation }) => {
  const { category } = route.params || {};

  const [description, setDescription] = useState(category?.description || "");
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [categorys, setCategories] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categorysData = await getAllCategorys();
        setCategories(categorysData);
      } catch (error) {
        console.error("Erro ao carregar opções:", error);
        Alert.alert("Erro", "Falha ao carregar categorias");
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { description };

      if (category) {
        await updateCategory(category.id, payload);
        Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
      } else {
        await createCategory(payload);
        Alert.alert("Sucesso", "Categoria criada com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha ao salvar categoria"
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
            {category ? "Editar Categoria" : "Nova Categoria"}
          </Text>

          <TextInput
            label="Nome da Categoria"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            mode="outlined"
            placeholder="Digite o nome da Categoria"
            autoCapitalize="words"
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading || description.trim() === ""}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {category ? "Atualizar" : "Cadastrar"}
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

export default CategoryForm;
