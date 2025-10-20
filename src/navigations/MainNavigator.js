import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useMemo } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActiveHomeIcon,
  ActiveShortsIcon,
  ActiveSubscriptionIcon,
  ActiveYouIcon,
  CourseIcon,
  FashionAndBeautyIcon,
  GamingIcon,
  InactiveHomeIcon,
  InactiveShortsIcon,
  InactiveSubscriptionIcon,
  InactiveYouIcon,
  LiveIcon,
  MovieIcon,
  MusicIcon,
  NewsIcon,
  SportsIcon,
  UploadIcon,
  YoutubeKidsIcon,
  YoutubeMusicIcon,
  YoutubePremiumIcon,
} from "../components/IconComponents";
import { HeaderYoutubeLogoImage } from "../components/ImageComponents";
import {
  BottomTabBarIconTab,
  BottomTabBarIconTextTab,
  DrawerPressable,
} from "../components/PressableComponents";
import { DrawerFooterText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { styles } from "../styles/styles";
import ShortsStack from "./ShortsStack";
import SubscriptionsStack from "./SubscriptionsStack";
import UploadStack from "./UploadStack";
import YouStack from "./YouStack";
import YoutubeHomeStack from "./YoutubeHomeStack";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

//TODO: Change drawerItems components into the actual component based on the same route name
export const drawerItems = [
  {
    route: "YouTubeHomeStack",
    component: YoutubeHomeStack,
  },
  {
    route: "MusicStack",
    component: YoutubeHomeStack,
    Icon: MusicIcon,
    label: "Music",
  },
  {
    route: "MoviesStack",
    component: ShortsStack,
    Icon: MovieIcon,
    label: "Movies",
  },
  {
    route: "LiveStack",
    component: YoutubeHomeStack,
    Icon: LiveIcon,
    label: "Live",
  },
  {
    route: "GamingStack",
    component: YoutubeHomeStack,
    Icon: GamingIcon,
    label: "Gaming",
  },
  {
    route: "NewsStack",
    component: YoutubeHomeStack,
    Icon: NewsIcon,
    label: "News",
  },
  {
    route: "SportsStack",
    component: YoutubeHomeStack,
    Icon: SportsIcon,
    label: "Sports",
  },
  {
    route: "CoursesStack",
    component: YoutubeHomeStack,
    Icon: CourseIcon,
    label: "Courses",
  },
  {
    route: "FashionAndBeautyStack",
    component: YoutubeHomeStack,
    Icon: FashionAndBeautyIcon,
    label: "Fashion & Beauty",
  },
  {
    route: "YoutubePremiumStack",
    component: YoutubeHomeStack,
    Icon: YoutubePremiumIcon,
    label: "Youtube Premium",
  },
  {
    route: "YoutubeMusicStack",
    component: YoutubeHomeStack,
    Icon: YoutubeMusicIcon,
    label: "Youtube Music",
  },
  {
    route: "YoutubeKidsStack",
    component: YoutubeHomeStack,
    Icon: YoutubeKidsIcon,
    label: "Youtube Kids",
  },
];

//HomeComponent in the parameter will change into the component of the currently selected Drawer route
export const bottomTabItems = (HomeComponent = YoutubeHomeStack) => [
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
    Icon: UploadIcon,
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
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      id="MainNavigator"
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 280 },
      }}
      drawerContent={(props) => (
        <View
          style={{
            paddingTop: insets.top,
            backgroundColor: colors.bg,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            {drawerItems.map((item, index) => {
              const isHomeRoute = index === 0;
              const isYoutubeSpecialRoute = index >= drawerItems.length - 3;

              return (
                <React.Fragment key={index + item.route}>
                  {index === drawerItems.length - 3 && <DrawerDivider />}
                  {isHomeRoute ? (
                    <Pressable
                      style={[
                        styles.screenPadLeft,
                        { marginBottom: 8, paddingVertical: 16, width: "100%" },
                      ]}
                      onPress={() => props.navigation.navigate(item.route)}
                    >
                      <HeaderYoutubeLogoImage />
                    </Pressable>
                  ) : (
                    <DrawerPressable
                      style={[
                        styles.screenPadLeft,
                        {
                          paddingVertical: 16,
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                        },
                      ]}
                      Icon={item.Icon}
                      iconColor={isYoutubeSpecialRoute && colors.primary}
                      label={item.label}
                      onPress={() => props.navigation.navigate(item.route)}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>
          <View
            style={{
              paddingBottom: insets.bottom + 8,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <DrawerFooterText
              onPress={() => console.log("Privacy Policy Press")}
            >
              Privacy Policy
            </DrawerFooterText>
            <DrawerFooterText style={{ marginHorizontal: 4 }}>
              •
            </DrawerFooterText>
            <DrawerFooterText
              onPress={() => console.log("Terms of Service Press")}
            >
              Terms of Service
            </DrawerFooterText>
          </View>
        </View>
      )}
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
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { showMainTabBarModal } = useUI();
  const mainNavigator = navigation.getParent("MainNavigator");

  //Assign updated bottomTabItems so the HomeStack route of this tab uses the component of the currently selected Drawer route
  const updatedTabItems = useMemo(
    () => bottomTabItems(drawerItems[mainNavigator.getState().index].component),
    [mainNavigator.getState().index]
  );

  return (
    <BottomTab.Navigator
      id="MainBottomTabBar"
      key={colors.bg} //Force remount on theme change
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        return (
          <View
            style={{
              display: showMainTabBarModal ? "flex" : "none",
              paddingBottom: insets.bottom,
              height: insets.bottom + 49,
              backgroundColor: colors.bg,
              flexDirection: "row",
            }}
          >
            {updatedTabItems.map((item, index) => {
              const isUploadRoute = updatedTabItems[2].route === item.route;
              const isActiveRoute =
                updatedTabItems[props.state.index].route === item.route;

              return isUploadRoute ? (
                <BottomTabBarIconTab
                  key={index + item.route}
                  isActiveRoute={isActiveRoute}
                  Icon={item.Icon}
                  onPress={() => props.navigation.navigate(item.route)}
                />
              ) : (
                <BottomTabBarIconTextTab
                  key={index + item.route}
                  isActiveRoute={isActiveRoute}
                  Icon={isActiveRoute ? item.activeIcon : item.inactiveIcon}
                  label={isActiveRoute ? item.activeLabel : item.inactiveLabel}
                  onPress={() => props.navigation.navigate(item.route)}
                />
              );
            })}
          </View>
        );
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

function DrawerDivider() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginVertical: 8,
        width: "100%",
        height: 1,
        backgroundColor: colors.borderSecondary,
      }}
    />
  );
}
