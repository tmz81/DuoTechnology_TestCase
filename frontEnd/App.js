import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserProvider } from "./src/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import VehicleScreen from "./src/screens/VehicleScreen";
import BrandScreen from "./src/screens/BrandScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import SettingScreen from "./src/screens/SettingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={HomeScreen} />
      <Tab.Screen name="Vehicles" component={VehicleScreen} />
      <Tab.Screen name="Brands" component={BrandScreen} />
      <Tab.Screen name="Categorys" component={CategoryScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setauthToken] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setauthToken(token);
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
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {authToken ? (
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
