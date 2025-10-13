import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderYouTubeLogoImage } from "components/HeaderComponents";
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
  YoutubeMainIcon,
  YoutubeMusicIcon,
  YoutubePremiumIcon,
} from "../components/IconComponents";
import { ThText } from "../components/ThemedComponents";
import { ColumnScrollView } from "components/UtilComponents";
import { useTheme } from "../context/ThemeContext";
import { useUIState } from "../context/UIStateContext";
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
    Icon: YoutubeMainIcon,
    label: "Youtube",
  },
  {
    route: "MusicStack",
    component: ShortsStack,
    Icon: MusicIcon,
    label: "Music",
  },
  {
    route: "MoviesStack",
    component: SubscriptionsStack,
    Icon: MovieIcon,
    label: "Movies",
  },
  {
    route: "LiveStack",
    component: UploadStack,
    Icon: LiveIcon,
    label: "Live",
  },
  {
    route: "GamingStack",
    component: YouStack,
    Icon: GamingIcon,
    label: "Gaming",
  },
  {
    route: "NewsStack",
    component: YouTubeHomeStack,
    Icon: NewsIcon,
    label: "News",
  },
  {
    route: "SportsStack",
    component: YouTubeHomeStack,
    Icon: SportsIcon,
    label: "Sports",
  },
  {
    route: "CoursesStack",
    component: YouTubeHomeStack,
    Icon: CourseIcon,
    label: "Courses",
  },
  {
    route: "FashionAndBeautyStack",
    component: YouTubeHomeStack,
    Icon: FashionAndBeautyIcon,
    label: "Fashion & Beauty",
  },
  {
    route: "YoutubePremiumStack",
    component: YouTubeHomeStack,
    Icon: YoutubePremiumIcon,
    label: "Youtube Premium",
  },
  {
    route: "YoutubeMusicStack",
    component: YouTubeHomeStack,
    Icon: YoutubeMusicIcon,
    label: "Youtube Music",
  },
  {
    route: "YoutubeKidsStack",
    component: YouTubeHomeStack,
    Icon: YoutubeKidsIcon,
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
  const { colors, iconSizes } = useTheme();

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
          }}
        >
          <ColumnScrollView>
            {drawerItems.map((item, index) => {
              const isHomeRoute = drawerItems[0].route === item.route;
              const isActiveRoute =
                drawerItems[props.state.index].route === item.route;

              return (
                <React.Fragment key={index + item.route}>
                  {index === drawerItems.length - 3 && (
                    <View
                      style={{
                        marginVertical: 8,
                        width: "100%",
                        height: 1,
                        backgroundColor: colors.borderSecondary,
                      }}
                    />
                  )}

                  <Pressable
                    onPress={() => props.navigation.navigate(item.route)}
                    style={[
                      {
                        marginHorizontal: 8,
                        borderRadius: 99,
                        paddingHorizontal: 8,
                        paddingVertical: 16,
                        width: "94%",
                        backgroundColor:
                          !isHomeRoute && isActiveRoute
                            ? colors.primary
                            : "transparent",
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    {isHomeRoute ? (
                      <HeaderYouTubeLogoImage />
                    ) : (
                      <item.Icon
                        size={iconSizes.lg}
                        color={
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
                    {!isHomeRoute && (
                      <ThText
                        style={{
                          marginLeft: 18,
                          fontWeight: isActiveRoute ? "bold" : "medium",
                          color: isActiveRoute
                            ? colors.textContrast
                            : colors.textPrimary,
                        }}
                      >
                        {item.label}
                      </ThText>
                    )}
                  </Pressable>
                </React.Fragment>
              );
            })}
          </ColumnScrollView>
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
  const { colors, fontSizes } = useTheme();
  const { isTabBarVisible } = useUIState();
  const mainNavigator = navigation.getParent("MainNavigator");

  //Assign updated bottomTabItems so the HomeStack route of this tab uses the component of the currently selected Drawer route
  const updatedTabItems = bottomTabItems(
    drawerItems[mainNavigator.getState().index].component
  );

  return (
    <BottomTab.Navigator
      id="MainBottomTabBar"
      key={colors.bg} //Force remount on theme change
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        return (
          <View
            style={[
              {
                borderTopColor: colors.borderSecondary,
                borderTopWidth: 1.5,
                paddingBottom: insets.bottom,
                height: insets.bottom + 49,
                backgroundColor: colors.bg,
                flexDirection: "row",
              },
              !isTabBarVisible && { display: "none" },
            ]}
          >
            {updatedTabItems.map((item, index) => {
              const isUploadRoute = updatedTabItems[2].route === item.route;
              const isActiveRoute =
                updatedTabItems[props.state.index].route === item.route;

              return (
                <Pressable
                  key={index + item.route}
                  onPress={() => props.navigation.navigate(item.route)}
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <>
                    {isUploadRoute ? (
                      <View
                        style={{
                          borderRadius: 99,
                          padding: 6,
                          backgroundColor: isActiveRoute
                            ? colors.primary
                            : colors.bgSecondary,
                        }}
                      >
                        <UploadIcon
                          color={
                            isActiveRoute
                              ? colors.iconContrast
                              : colors.iconPrimary
                          }
                        />
                      </View>
                    ) : (
                      <>
                        {isActiveRoute ? (
                          <item.activeIcon color={colors.primary} />
                        ) : (
                          <item.inactiveIcon color={colors.iconSecondary} />
                        )}

                        <ThText
                          style={{
                            fontSize: fontSizes.xs2,
                            fontWeight: "medium",
                            color: isActiveRoute
                              ? colors.textPrimary
                              : colors.textSecondary,
                          }}
                        >
                          {isActiveRoute
                            ? item.activeLabel
                            : item.inactiveLabel}
                        </ThText>
                      </>
                    )}
                  </>
                </Pressable>
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
