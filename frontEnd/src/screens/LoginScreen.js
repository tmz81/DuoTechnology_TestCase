import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      const response = await axios.post("SUA_API_URL/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("userToken", response.data.token);
      navigation.replace("Home");
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
});

export default LoginScreen;
