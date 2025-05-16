import { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userData = await AsyncStorage.getItem("userData");

      if (token && userData) {
        setAuthToken(token);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setAuthToken(null);
      setUser(null);
    }
  }, []);

  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      setAuthToken(token);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["authToken", "userData"]);
    setAuthToken(null);
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        authToken,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
