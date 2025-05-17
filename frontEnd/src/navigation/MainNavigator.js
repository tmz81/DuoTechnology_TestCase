import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Dashboard/DashboardScreen";
import VehicleScreen from "../screens/Vehicles/VehicleScreen";
import VehicleFormScreen from "../screens/Vehicles/VehicleForm";
import BrandScreen from "../screens/Brands/BrandScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";
import SettingScreen from "../screens/Settings/SettingScreen";
import BrandForm from "../screens/Brands/BrandForm";
import CategoryForm from "../screens/Category/CategoryForm";

const Tab = createBottomTabNavigator();
const VehicleStack = createStackNavigator();
const BrandStack = createStackNavigator();
const CategoryStack = createStackNavigator();

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

function BrandStackScreen() {
  return (
    <BrandStack.Navigator>
      <BrandStack.Screen
        name="BrandList"
        component={BrandScreen}
        options={{ title: "Marcas" }}
      />
      <BrandStack.Screen
        name="BrandForm"
        component={BrandForm}
        options={{ title: "Formulário da Marca" }}
      />
    </BrandStack.Navigator>
  );
}

function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="CategortList"
        component={CategoryScreen}
        options={{ title: "Categoria" }}
      />
      <CategoryStack.Screen
        name="CategoryForm"
        component={CategoryForm}
        options={{ title: "Formulário de Categoria" }}
      />
    </CategoryStack.Navigator>
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
      <Tab.Screen
        name="Brands"
        component={BrandStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Categorys"
        component={CategoryStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
