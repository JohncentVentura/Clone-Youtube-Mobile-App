import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigator from "./MainNavigator";
import TabNavigator from "./TabNavigator";
import Home from "../screens/Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Tab"
          component={TabNavigator}
          options={{ headerShown: true }}
        />
        <Drawer.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
