import React, { createContext, useState, useEffect, useContext } from "react";
import {
  login as authLogin,
  logout as authLogout,
} from "../services/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      // Fazer requisição para obter dados do usuário
      // setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const userData = await authLogin(credentials);
    setUser(userData);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
