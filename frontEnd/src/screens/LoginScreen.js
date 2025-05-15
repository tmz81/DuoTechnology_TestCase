import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { login } from "../services/authService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Erro", "Email inválido");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login({ email, password });
      navigation.replace("Main");
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Falha no login. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Bem-vindo</Text>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Senha"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Entrar
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Signup")}
        style={styles.link}
      >
        Ainda não possui conta? Cadastra-se agora
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  Text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 15,
  },
});

export default LoginScreen;
