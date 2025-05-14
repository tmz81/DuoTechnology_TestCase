import { createStackNavigator } from "@react-navigation/stack";
import VehicleListScreen from "../screens/VehicleListScreen";
import VehicleFormScreen from "../screens/VehicleFormScreen";
import { useUser } from "../context/UserContext";

const Stack = createStackNavigator();

export default function VehicleStack() {
  const { user } = useUser();
  return (
    <Stack.Navigator>
      <Stack.Screen name="VehicleList" component={VehicleListScreen} />
      {user?.isAdmin && (
        <>
          <Stack.Screen name="VehicleForm" component={VehicleFormScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
