import { useState, useEffect, useContext } from "react";
import { View, Alert, StyleSheet } from "react-native";
import {
  List,
  Avatar,
  Text,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { getUserProfile } from "../services/authService";
import { UserContext } from "../context/UserContext";

const SettingScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { logout } = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      const userData = await getUserProfile(); // Usando o serviço
      setUser(userData);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert("Erro", "Falha ao sair da conta");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Avatar.Text
          size={80}
          label={
            user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "U"
          }
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
        <Text style={styles.userEmail}>
          {user?.email || "email@exemplo.com"}
        </Text>
      </View>

      {/* Opções de configuração */}
      <List.Section>
        <List.Item
          title="Editar perfil"
          description="Alterar nome e informações pessoais"
          left={(props) => <List.Icon {...props} icon="account-edit" />}
          onPress={() => navigation.navigate("EditProfile")}
        />
        <List.Item
          title="Alterar senha"
          description="Atualizar senha de acesso"
          left={(props) => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => navigation.navigate("ChangePassword")}
        />
        <List.Item
          title="Configurações"
          description="Preferências do aplicativo"
          left={(props) => <List.Icon {...props} icon="cog" />}
          onPress={() => navigation.navigate("AppSettings")}
        />
      </List.Section>

      {/* Seção de logout */}
      <View style={styles.logoutSection}>
        <Button
          mode="outlined"
          icon="logout"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonText}
        >
          Sair da conta
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatar: {
    backgroundColor: "#6200ee",
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  logoutSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  logoutButton: {
    borderColor: "#ff4444",
  },
  logoutButtonText: {
    color: "#ff4444",
  },
});

export default SettingScreen;
