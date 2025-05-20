import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Button,
  Text,
  Card,
  FAB,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
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

  useFocusEffect(
    React.useCallback(() => {
      loadCategorys();
    }, [])
  );

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
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.cardContent}>
        <Text style={styles.categoryTitle}>{item.description}</Text>

        {isAdmin && (
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              iconColor="#fff"
              size={20}
              style={[styles.iconButton, styles.editButton]}
              onPress={() =>
                navigation.navigate("CategoryForm", { category: item })
              }
            />
            <IconButton
              icon="delete"
              iconColor="#fff"
              size={20}
              style={[styles.iconButton, styles.deleteButton]}
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      </Card.Content>
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
    padding: 12,
    backgroundColor: "#f4f4f4",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginVertical: 8,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconButton: {
    margin: 0,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#6c63ff",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    marginLeft: 6,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6c63ff",
  },
});

export default CategoryScreen;
