import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Home from "../screens/Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Youtube" }}
      />
      <Drawer.Screen name="Music" component={Home} />
      <Drawer.Screen name="Movies" component={Home} />
      <Drawer.Screen name="Live" component={Home} />
      <Drawer.Screen name="Gaming" component={Home} />
      <Drawer.Screen name="News" component={Home} />
      <Drawer.Screen name="Sports" component={Home} />
      <Drawer.Screen name="Learning" component={Home} />
      <Drawer.Screen name="Fashion & Beauty" component={Home} />
    </Drawer.Navigator>
  );
}
