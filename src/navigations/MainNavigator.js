import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedIcon } from "../components/ThemedComponents";
import HomeDrawer from "./HomeDrawer";
import ShortsStack from "./ShortsStack";
import UploadStack from "./UploadStack";
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";

const BottomTab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: useThemeColor("background") },
        tabBarActiveTintColor: useThemeColor("foreground"),
        tabBarInactiveTintColor: useThemeColor("gray"),
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
            <ThemedIcon
              IconComponent={Ionicons}
              name={iconName}
              size={24}
              color={
                focused ? useThemeColor("foreground") : useThemeColor("gray")
              }
            />
          );
        },
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
        options={{ title: "Upload", tabBarLabel: () => null }}
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
