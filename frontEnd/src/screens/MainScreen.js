import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Card, List, Text, ActivityIndicator } from "react-native-paper";

const MainScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totals, setTotals] = useState({
    vehicles: 0,
    brands: 0,
    categories: 0,
  });
  const [recentVehicles, setRecentVehicles] = useState([]);

  const fetchData = async () => {
    try {
      const totalsResponse = await getAllVehicles();

      setTotals(totalsResponse.data);
      setRecentVehicles(recentResponse.data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar dados");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.Text}>Dashboard</Text>

      {/* Cards de Resumo */}
      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardText}>Veículos</Text>
            <Text style={styles.cardValue}>{totals.vehicles}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardText}>Marcas</Text>
            <Text style={styles.cardValue}>{totals.brands}</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.row}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardText}>Categorias</Text>
            <Text style={styles.cardValue}>{totals.categories}</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Lista de Veículos Recentes */}
      <Text style={styles.sectionText}>Veículos Recentes</Text>
      <List.Section>
        {recentVehicles.map((vehicle) => (
          <List.Item
            key={vehicle.id}
            Text={vehicle.model}
            description={`Marca: ${vehicle.brand} • ${new Date(
              vehicle.createdAt
            ).toLocaleDateString()}`}
            left={() => <List.Icon icon="car" />}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  sectionText: {
    fontSize: 20,
    marginVertical: 16,
    color: "#444",
  },
});

export default MainScreen;
