import React,{useState, useContext} from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from "../../pages/Login";
import AddLibroScreen from "../../pages/AddLibro";
import HomeScreen from "../../pages/Home";
import ListaScreen from "../../pages/Lista"

import { GlobalContext } from '../../context/global/global.context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainNavigator({ signOut }){
    const {state, login, logout} = useContext(GlobalContext);

    console.log({state});
  return (
   <NavigationContainer>
     {!state.user ? (
       <Stack.Navigator>
         <Stack.Screen
         options={{ headerShown: false }}
         children={(props) => (
           <LoginScreen {... props} onPress={() => login()} />
         )}
          name="Login"
        />
        </Stack.Navigator>

     ) : (
     <Tab.Navigator 
     screenOptions={({route})=>({
       tabBarIcon:({focused, color, size})=>{
         let iconName;

         if(route.name === "Home"){
           iconName = focused
           ? "ios-home"
           : "ios-home-outline";
         } else if(route.name === "AddLibro") {
           iconName = "ios-add-circle-outline";
          } else if(route.name === "Lista") {
            iconName = "ios-list";
         }

         return <Ionicons name={iconName} size={size} color={color}></Ionicons>

       },

       tabBarActiveTintColor: "#F58B1B",
       tabBarInactiveTintColor: "gray",
     })}
     >
       <Tab.Screen name="Home"
       children={(props) => (
         <HomeScreen {...props} onPress={() => signOut()} />
       )}
       />
       <Tab.Screen name="AddLibro" component={AddLibroScreen} />

       <Tab.Screen name="Lista" component={ListaScreen} />
     </Tab.Navigator>
     )}
   </NavigationContainer>
  );
}