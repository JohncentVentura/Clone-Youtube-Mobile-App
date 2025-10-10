import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActiveHomeIcon,
  ActiveShortsIcon,
  ActiveSubscriptionIcon,
  ActiveUploadIcon,
  ActiveYouIcon,
  CourseIcon,
  FashionAndBeautyIcon,
  GamingIcon,
  InactiveHomeIcon,
  InactiveShortsIcon,
  InactiveSubscriptionIcon,
  InactiveUploadIcon,
  InactiveYouIcon,
  LiveIcon,
  MovieIcon,
  MusicIcon,
  NewsIcon,
  SportsIcon,
  YoutubeKidsIcon,
  YoutubeMainIcon,
  YoutubeMusicIcon,
  YoutubePremiumIcon,
} from "../components/IconComponents";
import { ThText } from "../components/ThemedComponents";
import { useTheme } from "../context/ThemeContext";
import { getMainBottomTabBarStyle } from "../utils/utils";
import ShortsStack from "./ShortsStack";
import SubscriptionsStack from "./SubscriptionsStack";
import UploadStack from "./UploadStack";
import YouStack from "./YouStack";
import YouTubeHomeStack from "./YouTubeHomeStack";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

//TODO: Change drawerItems components into the actual component based on the same route name
const drawerItems = [
  {
    route: "YouTubeHomeStack",
    component: YouTubeHomeStack,
    icon: YoutubeMainIcon,
    label: "Youtube",
  },
  {
    route: "MusicStack",
    component: ShortsStack,
    icon: MusicIcon,
    label: "Music",
  },
  {
    route: "MoviesStack",
    component: SubscriptionsStack,
    icon: MovieIcon,
    label: "Movies",
  },
  {
    route: "LiveStack",
    component: UploadStack,
    icon: LiveIcon,
    label: "Live",
  },
  {
    route: "GamingStack",
    component: YouStack,
    icon: GamingIcon,
    label: "Gaming",
  },
  {
    route: "NewsStack",
    component: YouTubeHomeStack,
    icon: NewsIcon,
    label: "News",
  },
  {
    route: "SportsStack",
    component: YouTubeHomeStack,
    icon: SportsIcon,
    label: "Sports",
  },
  {
    route: "CoursesStack",
    component: YouTubeHomeStack,
    icon: CourseIcon,
    label: "Courses",
  },
  {
    route: "FashionAndBeautyStack",
    component: YouTubeHomeStack,
    icon: FashionAndBeautyIcon,
    label: "Fashion & Beauty",
  },
  {
    route: "YoutubePremiumStack",
    component: YouTubeHomeStack,
    icon: YoutubePremiumIcon,
    label: "Youtube Premium",
  },
  {
    route: "YoutubeMusicStack",
    component: YouTubeHomeStack,
    icon: YoutubeMusicIcon,
    label: "Youtube Music",
  },
  {
    route: "YoutubeKidsStack",
    component: YouTubeHomeStack,
    icon: YoutubeKidsIcon,
    label: "Youtube Kids",
  },
];

//HomeComponent in the parameter will change into the component of the currently selected Drawer route
const bottomTabItems = (HomeComponent = YouTubeHomeStack) => [
  {
    route: "HomeStack",
    component: HomeComponent,
    activeIcon: ActiveHomeIcon,
    inactiveIcon: InactiveHomeIcon,
    activeLabel: "Welcome",
    inactiveLabel: "Home",
  },
  {
    route: "ShortsStack",
    component: ShortsStack,
    activeIcon: ActiveShortsIcon,
    inactiveIcon: InactiveShortsIcon,
    activeLabel: "or Trunks?",
    inactiveLabel: "Shorts",
  },
  {
    route: "UploadStack",
    component: UploadStack,
    activeIcon: ActiveUploadIcon,
    inactiveIcon: InactiveUploadIcon,
    activeLabel: "B-But I'm shy...",
    inactiveLabel: "Upload",
  },
  {
    route: "SubscriptionsStack",
    component: SubscriptionsStack,
    activeIcon: ActiveSubscriptionIcon,
    inactiveIcon: InactiveSubscriptionIcon,
    activeLabel: "Please like &",
    inactiveLabel: "Subscriptions",
  },
  {
    route: "YouStack",
    component: YouStack,
    activeIcon: ActiveYouIcon,
    inactiveIcon: InactiveYouIcon,
    activeLabel: "Who? M-Me?",
    inactiveLabel: "You",
  },
];

export default function MainNavigator() {
  const insets = useSafeAreaInsets();
  const { colors, fontSizes } = useTheme();

  return (
    <Drawer.Navigator
      id="MainNavigator"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => {
        return (
          <View style={{ backgroundColor: colors.bg, flex: 1 }}>
            <DrawerContentScrollView>
              {drawerItems.map((item, index) => {
                const isHomeRoute = drawerItems[0].route === item.route;
                const isActiveRoute =
                  drawerItems[props.state.index].route === item.route;

                return (
                  <React.Fragment key={item.route}>
                    {/*Drawer divider*/}
                    {index === drawerItems.length - 3 && (
                      <View
                        style={{
                          marginVertical: 12,
                          width: "100%",
                          height: 1,
                          backgroundColor: colors.borderSecondary,
                        }}
                      />
                    )}

                    <DrawerItem
                      style={{
                        paddingVertical: 2,
                        backgroundColor:
                          !isHomeRoute && isActiveRoute
                            ? colors.primary
                            : colors.bg,
                      }}
                      onPress={() => props.navigation.navigate(item.route)}
                      icon={() => (
                        <item.icon
                          color={
                            isHomeRoute ||
                            drawerItems[drawerItems.length - 3].route ===
                              item.route ||
                            drawerItems[drawerItems.length - 2].route ===
                              item.route ||
                            drawerItems[drawerItems.length - 1].route ===
                              item.route
                              ? !isHomeRoute && isActiveRoute
                                ? colors.iconContrast
                                : colors.primary
                              : isActiveRoute
                              ? colors.iconContrast
                              : colors.iconPrimary
                          }
                        />
                      )}
                      label={() => (
                        <ThText
                          style={{
                            marginLeft: isHomeRoute ? -10 : 10,
                            fontSize: isHomeRoute
                              ? fontSizes.xl
                              : fontSizes.base,
                            fontWeight: isHomeRoute
                              ? "bold"
                              : isActiveRoute
                              ? "bold"
                              : "medium",
                            color:
                              !isHomeRoute && isActiveRoute
                                ? colors.textContrast
                                : colors.textPrimary,
                          }}
                        >
                          {item.label}
                        </ThText>
                      )}
                    />
                  </React.Fragment>
                );
              })}
            </DrawerContentScrollView>
            <View
              style={{
                marginBottom: insets.bottom + 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <DrawerFooterText
                onPress={() => console.log("Privacy Policy Press")}
              >
                Privacy Policy
              </DrawerFooterText>
              <DrawerFooterText style={{ marginHorizontal: 8 }}>
                •
              </DrawerFooterText>
              <DrawerFooterText
                onPress={() => console.log("Terms of Service Press")}
              >
                Terms of Service
              </DrawerFooterText>
            </View>
          </View>
        );
      }}
    >
      {drawerItems.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          component={MainBottomTabBar}
        />
      ))}
    </Drawer.Navigator>
  );
}

function MainBottomTabBar({ navigation }) {
  const { colors, fontSizes } = useTheme();
  const mainNavigator = navigation.getParent("MainNavigator");
  //Assign updated bottomTabItems so the HomeStack route of this tab uses the component of the currently selected Drawer route
  const updatedTabItems = bottomTabItems(
    drawerItems[mainNavigator.getState().index].component
  );

  return (
    <BottomTab.Navigator
      id="MainBottomTabBar"
      key={colors.bg} //Force remount on theme change
      screenOptions={({ route }) => {
        const activeTabItem = bottomTabItems().find(
          (bottomTabItem) => bottomTabItem.route === route.name
        );

        return {
          headerShown: false,
          tabBarStyle: getMainBottomTabBarStyle(colors),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <activeTabItem.activeIcon color={colors.primary} />
            ) : (
              <activeTabItem.inactiveIcon color={colors.iconSecondary} />
            ),
          tabBarLabel: ({ focused }) => (
            <ThText
              style={{
                fontSize: fontSizes.xs2,
                fontWeight: "medium",
                color: focused ? colors.textPrimary : colors.textSecondary,
              }}
            >
              {focused
                ? activeTabItem.activeLabel
                : activeTabItem.inactiveLabel}
            </ThText>
          ),
        };
      }}
    >
      {updatedTabItems.map((item) => (
        <BottomTab.Screen
          key={item.route}
          name={item.route}
          component={item.component}
        />
      ))}
    </BottomTab.Navigator>
  );
}

function DrawerFooterText({ style, children, ...rest }) {
  const { colors, fontSizes } = useTheme();

  return (
    <ThText
      style={[{ fontSize: fontSizes.xs, color: colors.textSecondary }, style]}
      {...rest}
    >
      {children}
    </ThText>
  );
}
