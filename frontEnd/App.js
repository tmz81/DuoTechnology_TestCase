import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "./src/context/UserContext";
import AppNavigator from "./src/navigation/AppNavigator";

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
    <NavigationContainer>
      <AppNavigator isAuthenticated={!!authToken} />
    </NavigationContainer>
  );
}
