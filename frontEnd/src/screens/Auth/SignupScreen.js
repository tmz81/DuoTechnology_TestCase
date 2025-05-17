import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, TextInput, Text, Switch } from "react-native-paper";
import { register } from "../../services/authService";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Erro", "Email inválido");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        isAdmin: isAdmin,
      });

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        error.message || "Falha no cadastro. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Conta</Text>
      <TextInput
        label="Nome"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />
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
      <TextInput
        label="Confirmar Senha"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.switchContainer}>
        <Text>Administrador:</Text>
        <Switch value={isAdmin} onValueChange={setIsAdmin} color="#6200ee" />
      </View>
      <Button
        mode="contained"
        onPress={handleSignup}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Cadastrar
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate("Login")}
        style={styles.link}
      >
        Já tem conta? Faça login
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  title: {
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

export default SignupScreen;
