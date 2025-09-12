import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemedIcon, ThemedText } from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import HomeDrawer from "./HomeDrawer";
import ShortsStack from "./ShortsStack";
import UploadStack from "./UploadStack";
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";
import { colors, textSizes } from "../styles/styles";

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
        tabBarStyle: { backgroundColor: useThemeColor(colors.background) },
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
              color={focused ? colors.primary : colors.gray}
              IconComponent={Ionicons}
              name={iconName}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let labelName;

          if (route.name === bottomTabNames[0]) {
            labelName = focused ? "Welcome" : "Home";
          } else if (route.name === bottomTabNames[1]) {
            labelName = focused ? "Long" : "Shorts";
          } else if (route.name === bottomTabNames[2]) {
            labelName = focused ? "Up" : "Upload";
          } else if (route.name === bottomTabNames[3]) {
            labelName = focused ? "Sub" : "Subscriptions";
          } else if (route.name === bottomTabNames[4]) {
            labelName = focused ? "Me" : "You";
          }

          return (
            <ThemedText
              color={focused ? colors.foreground : colors.gray}
              size={textSizes.xs2}
            >
              {labelName}
            </ThemedText>
          );
        },
      })}
    >
      <BottomTab.Screen name={bottomTabNames[0]} component={HomeDrawer} />
      <BottomTab.Screen name={bottomTabNames[1]} component={ShortsStack} />
      <BottomTab.Screen
        name={bottomTabNames[2]}
        component={UploadStack}
        //options={{tabBarLabel: () => null}}
      />
      <BottomTab.Screen
        name={bottomTabNames[3]}
        component={SubscriptionsStack}
      />
      <BottomTab.Screen name={bottomTabNames[4]} component={YouStack} />
    </BottomTab.Navigator>
  );
}
