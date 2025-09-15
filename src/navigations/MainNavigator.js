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
const bottomTabItems = [
  {
    route: "HomeDrawer",
    activeIconName: "home-sharp",
    inactiveIconName: "home-outline",
    activeLabel: "Welcome",
    inactiveLabel: "Home",
    component: HomeDrawer,
  },
  {
    route: "ShortsStack",
    activeIconName: "videocam",
    inactiveIconName: "videocam-outline",
    activeLabel: "Shorter",
    inactiveLabel: "Shorts",
    component: ShortsStack,
  },
  {
    route: "UploadStack",
    activeIconName: "add-circle",
    inactiveIconName: "add-circle-outline",
    activeLabel: "But I'm shy",
    inactiveLabel: "Upload",
    component: UploadStack,
  },
  {
    route: "SubscriptionsStack",
    activeIconName: "albums",
    inactiveIconName: "albums-outline",
    activeLabel: "Please like &",
    inactiveLabel: "Subscriptions",
    component: SubscriptionsStack,
  },
  {
    route: "YouStack",
    activeIconName: "person-circle",
    inactiveIconName: "person-circle-outline",
    activeLabel: "Who? Me?",
    inactiveLabel: "You",
    component: YouStack,
  },
];

export default function MainNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: useThemeColor(colors.background) },
        tabBarIcon: ({ focused }) => {
          let activeIconName, inactiveIconName;

          bottomTabItems.map((item) => {
            if (route.name === item.route) {
              activeIconName = item.activeIconName;
              inactiveIconName = item.inactiveIconName;
            }
          });

          return (
            <ThemedIcon
              color={focused ? colors.primary : colors.gray}
              IconComponent={Ionicons}
              name={focused ? activeIconName : inactiveIconName}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          let label;

          bottomTabItems.map((item) => {
            if (route.name === item.route) {
              label = focused ? item.activeLabel : item.inactiveLabel;
            }
          });

          return (
            <ThemedText
              color={focused ? colors.foreground : colors.gray}
              size={textSizes.xs2}
            >
              {label}
            </ThemedText>
          );
        },
      })}
    >
      <BottomTab.Screen
        name={bottomTabItems[0].route}
        component={bottomTabItems[0].component}
      />
      <BottomTab.Screen
        name={bottomTabItems[1].route}
        component={bottomTabItems[1].component}
      />
      <BottomTab.Screen
        name={bottomTabItems[2].route}
        component={bottomTabItems[2].component}
        //options={{tabBarLabel: () => null}} //To hide the label
      />
      <BottomTab.Screen
        name={bottomTabItems[3].route}
        component={bottomTabItems[3].component}
      />
      <BottomTab.Screen
        name={bottomTabItems[4].route}
        component={bottomTabItems[4].component}
      />
    </BottomTab.Navigator>
  );
}
