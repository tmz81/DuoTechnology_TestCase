// import React, { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LoginScreen from './src/screens/LoginScreen';
// import HomeScreen from './src/screens/HomeScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [userToken, setUserToken] = useState(null);

//   const checkLogin = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       setUserToken(token);
//     } catch (error) {
//       console.log('Error checking login:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkLogin();
//   }, []);

//   if (isLoading) {
//     return null; // Ou um componente de loading
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {userToken ? (
//           <Stack.Screen name="Home" component={HomeScreen} />
//         ) : (
//           <Stack.Screen
//             name="Login"
//             component={HomeScreen}
//             options={{ headerShown: false }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import VehicleStack from './src/navigation/VehicleStack';
// import BrandStack from './src/navigation/BrandStack';
// import CategoryStack from './src/navigation/CategoryStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Veículos" component={VehicleStack} />
      {/* <Tab.Screen name="Marcas" component={BrandStack} /> */}
      {/* <Tab.Screen name="Categorias" component={CategoryStack} /> */}
    </Tab.Navigator>
  );
}

// No NavigationContainer do App.js
<Stack.Navigator>
  {userToken ? (
    <Stack.Screen 
      name="Main" 
      component={MainTabs} 
      options={{ headerShown: false }}
    />
  ) : (
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
  )}
</Stack.Navigator>