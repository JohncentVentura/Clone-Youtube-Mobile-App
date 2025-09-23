import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThIcon, ThText } from "../components/ThemedComponents";
import { useTheme } from "../styles/ThemeContext";
import HomeDrawer from "./HomeDrawer";
import ShortsStack from "./ShortsStack";
import UploadStack from "./UploadStack";
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";

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
  const { colors, fontSizes } = useTheme();

  return (
    <BottomTab.Navigator
      id="MainNavigator"
      screenOptions={({ route }) => {
        const currentItem = bottomTabItems.find(
          (tabItem) => tabItem.route === route.name
        );

        return {
          headerShown: false,
          tabBarStyle: {
            borderTopColor: colors.bgGray,
            borderTopWidth: 1,
            backgroundColor: colors.bg,
            elevation: 0, //Android: removes drop shadow
            shadowOpacity: 0, //iOS: removes drop shadow
          },
          tabBarIcon: ({ focused }) => (
            <ThIcon
              IconComponent={Ionicons}
              name={
                focused
                  ? currentItem.activeIconName
                  : currentItem.inactiveIconName
              }
              color={focused ? colors.primary : colors.iconGray}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThText
              style={{
                color: focused ? colors.text : colors.textGray,
                fontWeight: "medium",
                fontSize: fontSizes.xs2,
              }}
            >
              {focused ? currentItem.activeLabel : currentItem.inactiveLabel}
            </ThText>
          ),
        };
      }}
    >
      {bottomTabItems.map((item) => (
        <BottomTab.Screen
          key={item.route}
          name={item.route}
          component={item.component}
        />
      ))}
    </BottomTab.Navigator>
  );
}
