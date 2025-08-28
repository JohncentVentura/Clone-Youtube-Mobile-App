import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeDrawer from "./HomeDrawer";
import ShortsStack from "./ShortsStack";
import UploadStack from "./UploadStack";
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true, // We will hide it conditionally
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeDrawer") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "ShortsStack") {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (route.name === "UploadStack") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "SubscriptionsStack") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === "YouStack") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={26}
              color={focused ? "black" : "gray"}
            />
          );
        },
        //tabBarLabel: ({ focused }) => (focused ? route.name : ""), // Hide label if not active
      })}
    >
      <BottomTab.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={{ title: "Home" }}
      />
      <BottomTab.Screen
        name="ShortsStack"
        component={ShortsStack}
        options={{ title: "Shorts" }}
      />
      <BottomTab.Screen
        name="UploadStack"
        component={UploadStack}
        options={{ title: "Upload" }}
      />
      <BottomTab.Screen
        name="SubscriptionsStack"
        component={SubscriptionsStack}
        options={{ title: "Subscriptions" }}
      />
      <BottomTab.Screen
        name="YouStack"
        component={YouStack}
        options={{ title: "You" }}
      />
    </BottomTab.Navigator>
  );
}
