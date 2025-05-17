import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Text, Card, FAB, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import {
  getAllCategorys,
  deleteCategory,
} from "../../services/categorysService";

const CategoryScreen = () => {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const isAdmin = user?.isAdmin || false;

  const loadCategorys = async () => {
    try {
      const data = await getAllCategorys();
      setCategorys(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as categorias");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCategorys();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta categoria?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteCategory(id);
              loadCategorys();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir categoria");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Text>{item.description}</Text>
      {isAdmin && (
        <Card.Actions>
          <Button
            onPress={() =>
              navigation.navigate("CategoryForm", { category: item })
            }
          >
            Editar
          </Button>
          <Button onPress={() => handleDelete(item.id)} textColor="#ff0000">
            Excluir
          </Button>
        </Card.Actions>
      )}
    </Card>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} animating={true} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categorys}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadCategorys();
        }}
      />

      {isAdmin && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("CategoryForm")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CategoryScreen;
