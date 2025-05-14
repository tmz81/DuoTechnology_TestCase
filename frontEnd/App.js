import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import VehicleStack from "./src/navigation/VehicleStack";
// import BrandStack from './src/navigation/BrandStack';
// import CategoryStack from './src/navigation/CategoryStack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação por abas após login
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Veículos" component={HomeScreen} />
      {/* <Tab.Screen name="Marcas" component={BrandStack} /> */}
      {/* <Tab.Screen name="Categorias" component={CategoryStack} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.log("Erro ao verificar login:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
