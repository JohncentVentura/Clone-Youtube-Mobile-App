import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeDrawer from "./HomeDrawer";
import ShortsStack from './ShortsStack';
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeDrawer} />
      <Tab.Screen name="Shorts" component={ShortsStack} />
      <Tab.Screen name="+" component={HomeDrawer} />
      <Tab.Screen name="Subscription" component={SubscriptionsStack} />
      <Tab.Screen name="You" component={YouStack} />
    </Tab.Navigator>
  );
}
