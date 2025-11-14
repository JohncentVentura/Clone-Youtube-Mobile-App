import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerDivider } from "../components/ContainerComponents";
import {
  ActiveHomeIcon,
  ActiveShortsIcon,
  ActiveSubscriptionIcon,
  ActiveYouIcon,
  LearningIcon,
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
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import FashionAndBeautyStack from "./drawer/FashionAndBeautyStack";
import GamingStack from "./drawer/GamingStack";
import LearningStack from "./drawer/LearningStack";
import LiveStack from "./drawer/LiveStack";
import MoviesStack from "./drawer/MoviesStack";
import MusicStack from "./drawer/MusicStack";
import NewsStack from "./drawer/NewsStack";
import SportsStack from "./drawer/SportsStack";
import YoutubePremiumStack from "./drawer/YoutubePremiumStack";
import ShortsStack from "./ShortsStack";
import SubscriptionsStack from "./SubscriptionsStack";
import UploadStack from "./UploadStack";
import YouStack from "./YouStack";
import YoutubeHomeStack from "./YoutubeHomeStack";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export const drawerItems = [
  {
    route: "YouTubeHomeStack",
    component: YoutubeHomeStack,
  },
  {
    route: "MusicStack",
    component: MusicStack,
    Icon: MusicIcon,
    label: "Music",
  },
  {
    route: "MoviesStack",
    component: MoviesStack,
    Icon: MovieIcon,
    label: "Movies",
  },
  {
    route: "LiveStack",
    component: LiveStack,
    Icon: LiveIcon,
    label: "Live",
  },
  {
    route: "GamingStack",
    component: GamingStack,
    Icon: GamingIcon,
    label: "Gaming",
  },
  {
    route: "NewsStack",
    component: NewsStack,
    Icon: NewsIcon,
    label: "News",
  },
  {
    route: "SportsStack",
    component: SportsStack,
    Icon: SportsIcon,
    label: "Sports",
  },
  {
    route: "CoursesStack",
    component: LearningStack,
    Icon: LearningIcon,
    label: "Learning",
  },
  {
    route: "FashionAndBeautyStack",
    component: FashionAndBeautyStack,
    Icon: FashionAndBeautyIcon,
    label: "Fashion & Beauty",
  },
  {
    route: "YoutubePremiumStack",
    component: YoutubePremiumStack,
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
    activeLabel: "Welcoming...",
    inactiveLabel: "Home",
  },
  {
    route: "ShortsStack",
    component: ShortsStack,
    activeIcon: ActiveShortsIcon,
    inactiveIcon: InactiveShortsIcon,
    activeLabel: "Scrolling...",
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
    activeLabel: "Subscribing...",
    inactiveLabel: "Subscriptions",
  },
  {
    route: "YouStack",
    component: YouStack,
    activeIcon: ActiveYouIcon,
    inactiveIcon: InactiveYouIcon,
    activeLabel: "Profiling...",
    inactiveLabel: "You",
  },
];

export default function MainNavigator() {
  const insets = useSafeAreaInsets();
  const { ctxColors } = useThemeContext();

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
            backgroundColor: ctxColors.bg,
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
                      iconColor={isYoutubeSpecialRoute && ctxColors.primary}
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
          children={() => <MainBottomTabBar homeComponent={item.component} />}
        />
      ))}
    </Drawer.Navigator>
  );
}

function MainBottomTabBar({ homeComponent }) {
  const insets = useSafeAreaInsets();
  const { ctxColors } = useThemeContext();
  const { ctxMainBottomTabBar } = useUIContext();

  //Assign updated bottomTabItems so the HomeStack route of this tab uses the component of the currently selected Drawer route
  const updatedTabItems = useMemo(() => bottomTabItems(homeComponent), [homeComponent]);

  return (
    <BottomTab.Navigator
      key={homeComponent.name + ctxColors.bg} //Key changes force remount when drawer or theme changes
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <View
          style={{
            display: ctxMainBottomTabBar ? "flex" : "none",
            paddingBottom: insets.bottom,
            height: insets.bottom + 49,
            backgroundColor: ctxColors.bg,
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
      )}
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
