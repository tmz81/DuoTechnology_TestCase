import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Text, Card, FAB, ActivityIndicator, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import { getAllBrands, deleteBrand } from "../../services/brandsService";

const BrandScreen = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const isAdmin = user?.isAdmin || false;

  const loadBrands = async () => {
    try {
      const data = await getAllBrands();
      setBrands(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as marcas");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta marca?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteBrand(id);
              loadBrands();
            } catch (error) {
              Alert.alert("Erro", "Falha ao excluir marca");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.cardContent}>
        <Text style={styles.brandTitle}>{item.name}</Text>

        {isAdmin && (
          <View style={styles.actions}>
            <IconButton
              icon="pencil"
              iconColor="#fff"
              size={20}
              style={[styles.iconButton, styles.editButton]}
              onPress={() => navigation.navigate("BrandForm", { brand: item })}
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
        data={brands}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadBrands();
        }}
      />

      {isAdmin && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("BrandForm")}
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
  brandTitle: {
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

export default BrandScreen;
