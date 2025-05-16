import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/MainScreen";
import VehicleScreen from "../screens/VehicleScreen";
import BrandScreen from "../screens/BrandScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SettingScreen from "../screens/SettingScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vehicle" component={VehicleScreen} />
      <Tab.Screen name="Brand" component={BrandScreen} />
      <Tab.Screen name="Categorie" component={CategoryScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}
