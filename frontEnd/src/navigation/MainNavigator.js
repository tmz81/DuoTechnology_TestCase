import 'react-native-url-polyfill/auto';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Dashboard/DashboardScreen";
import VehicleScreen from "../screens/Vehicles/VehicleScreen";
import VehicleForm from "../screens/Vehicles/VehicleForm";
import BrandScreen from "../screens/Brands/BrandScreen";
import CategoryScreen from "../screens/Category/CategoryScreen";
import SettingScreen from "../screens/Settings/SettingScreen";
import BrandForm from "../screens/Brands/BrandForm";
import CategoryForm from "../screens/Category/CategoryForm";
import { MaterialIcons } from "@expo/vector-icons";

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
        options={{ title: "" }}
      />
      <VehicleStack.Screen
        name="VehicleForm"
        component={VehicleForm}
        options={{ title: "" }}
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
        options={{ title: "" }}
      />
      <BrandStack.Screen
        name="BrandForm"
        component={BrandForm}
        options={{ title: "" }}
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
        options={{ title: "" }}
      />
      <CategoryStack.Screen
        name="CategoryForm"
        component={CategoryForm}
        options={{ title: "" }}
      />
    </CategoryStack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehicleStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="directions-car" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Brands"
        component={BrandStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="branding-watermark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categorys"
        component={CategoryStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
