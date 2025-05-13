import { createStackNavigator } from "@react-navigation/stack";
import VehicleListScreen from "../screens/VehicleListScreen";
import VehicleFormScreen from "../screens/VehicleFormScreen";

const Stack = createStackNavigator();

export default function VehicleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VehicleList"
        component={VehicleListScreen}
        options={{ title: "Veículos" }}
      />
      <Stack.Screen
        name="VehicleForm"
        component={VehicleFormScreen}
        options={{ title: "Formulário de Veículo" }}
      />
    </Stack.Navigator>
  );
}
