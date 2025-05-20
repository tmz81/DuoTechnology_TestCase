import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "./src/context/UserContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { authToken, loadUser } = useContext(UserContext);

  useEffect(() => {
    const initializeAuth = async () => {
      await loadUser();
      setIsLoading(false);
    };

    initializeAuth();
  }, [loadUser]);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
          <PaperProvider>
            <AppNavigator isAuthenticated={!!authToken} />
          </PaperProvider>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
