import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {category ? "Editar Categoria" : "Adicionar Nova Categoria"}
      </Text>

      <TextInput
        label="Nome da Categoria"
        value={description}
        onChangeText={setDescription}
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
        {category ? "Atualizar Categoria" : "Cadastrar Categoria"}
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

export default CategoryForm;
