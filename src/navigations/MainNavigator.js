import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemedIcon } from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeDrawer from "./HomeDrawer";
import ShortsStack from "./ShortsStack";
import UploadStack from "./UploadStack";
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";

const BottomTab = createBottomTabNavigator();
const bottomTabNames = [
  "HomeDrawer",
  "ShortsStack",
  "UploadStack",
  "SubscriptionsStack",
  "YouStack",
];

export default function MainNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: useThemeColor("background") },
        tabBarActiveTintColor: useThemeColor("foreground"),
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === bottomTabNames[0]) {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === bottomTabNames[1]) {
            iconName = focused ? "videocam" : "videocam-outline";
          } else if (route.name === bottomTabNames[2]) {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === bottomTabNames[3]) {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === bottomTabNames[4]) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return (
            <ThemedIcon
              IconComponent={Ionicons}
              name={iconName}
              color={focused ? useThemeColor("primary") : useThemeColor("gray")}
            />
          );
        },
      })}
    >
      <BottomTab.Screen
        name={bottomTabNames[0]}
        component={HomeDrawer}
        options={{ title: "Home" }}
      />
      <BottomTab.Screen
        name={bottomTabNames[1]}
        component={ShortsStack}
        options={{ title: "Shorts" }}
      />
      <BottomTab.Screen
        name={bottomTabNames[2]}
        component={UploadStack}
        options={{ title: "Upload" }} //use {tabBarLabel: () => null} in options to hide label
      />
      <BottomTab.Screen
        name={bottomTabNames[3]}
        component={SubscriptionsStack}
        options={{ title: "Subscriptions" }}
      />
      <BottomTab.Screen
        name={bottomTabNames[4]}
        component={YouStack}
        options={{ title: "You" }}
      />
    </BottomTab.Navigator>
  );
}
