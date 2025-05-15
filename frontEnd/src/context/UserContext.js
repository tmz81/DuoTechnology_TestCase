import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const loadUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setUser({ isAdmin: false });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, authToken, setAuthToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};
