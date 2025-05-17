import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Button, Text, Card, FAB, ActivityIndicator } from "react-native-paper";
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
    <Card style={styles.card}>
      <Text>{item.name}</Text>
      {isAdmin && (
        <Card.Actions>
          <Button
            onPress={() => navigation.navigate("BrandForm", { brand: item })}
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

export default BrandScreen;
