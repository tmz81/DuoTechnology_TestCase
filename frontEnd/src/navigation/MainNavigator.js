import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/MainScreen";
import VehicleScreen from "../screens/VehicleScreen";
import VehicleFormScreen from "../screens/VehicleFormScreen";
import BrandScreen from "../screens/BrandScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SettingScreen from "../screens/SettingScreen";

const Tab = createBottomTabNavigator();
const VehicleStack = createStackNavigator();

function VehicleStackScreen() {
  return (
    <VehicleStack.Navigator>
      <VehicleStack.Screen
        name="VehicleList"
        component={VehicleScreen}
        options={{ title: "Veículos" }}
      />
      <VehicleStack.Screen
        name="VehicleFormScreen"
        component={VehicleFormScreen}
        options={{ title: "Formulário do Veículo" }}
      />
    </VehicleStack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Vehicles"
        component={VehicleStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Brands" component={BrandScreen} />
      <Tab.Screen name="Categorys" component={CategoryScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}
