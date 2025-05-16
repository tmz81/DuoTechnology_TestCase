import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

export default function AppNavigator({ isAuthenticated }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
