import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.authToken) {
      await AsyncStorage.setItem("authToken", response.data.authToken);
      return response.data.user;
    }
    throw new Error("Token não recebido na resposta");
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Falha no login");
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
