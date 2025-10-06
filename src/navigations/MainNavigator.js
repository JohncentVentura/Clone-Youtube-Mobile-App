import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ActiveHomeIcon,
  ActiveShortsIcon,
  ActiveSubscriptionIcon,
  ActiveUploadIcon,
  ActiveYouIcon,
  CourseIcon,
  InactiveHomeIcon,
  InactiveShortsIcon,
  InactiveSubscriptionIcon,
  InactiveUploadIcon,
  InactiveYouIcon,
  FashionAndBeautyIcon,
  GamingIcon,
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
import { ThText, ThView } from "../components/ThemedComponents";
import { useTheme } from "../styles/ThemeContext";
import { getMainBottomTabBarStyle } from "../utils/utils";
import ShortsStack from "./ShortsStack";
import SubscriptionsStack from "./SubscriptionsStack";
import UploadStack from "./UploadStack";
import YouStack from "./YouStack";
import YoutubeHomeStack from "./YoutubeHomeStack";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

//TODO: Change drawerItems components into the actual component based on the same route name
const drawerItems = [
  {
    route: "YoutubeHomeStack",
    icon: YoutubeMainIcon,
    label: "Youtube",
    component: YoutubeHomeStack,
  },
  {
    route: "MusicStack",
    icon: MusicIcon,
    label: "Music",
    component: ShortsStack,
  },
  {
    route: "MoviesStack",
    icon: MovieIcon,
    label: "Movies",
    component: UploadStack,
  },
  {
    route: "LiveStack",
    icon: LiveIcon,
    label: "Live",
    component: SubscriptionsStack,
  },
  {
    route: "GamingStack",
    icon: GamingIcon,
    label: "Gaming",
    component: YouStack,
  },
  {
    route: "NewsStack",
    icon: NewsIcon,
    label: "News",
    component: YoutubeHomeStack,
  },
  {
    route: "SportsStack",
    icon: SportsIcon,
    label: "Sports",
    component: YoutubeHomeStack,
  },
  {
    route: "CoursesStack",
    icon: CourseIcon,
    label: "Courses",
    component: YoutubeHomeStack,
  },
  {
    route: "FashionAndBeautyStack",
    icon: FashionAndBeautyIcon,
    label: "Fashion & Beauty",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubePremiumStack",
    icon: YoutubePremiumIcon,
    label: "Youtube Premium",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubeMusicStack",
    icon: YoutubeMusicIcon,
    label: "Youtube Music",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubeKidsStack",
    icon: YoutubeKidsIcon,
    label: "Youtube Kids",
    component: YoutubeHomeStack,
  },
];

//HomeComponent in the parameter will change into the component of the currently selected Drawer route
const bottomTabItems = (HomeComponent = YoutubeHomeStack) => [
  {
    route: "HomeStack",
    activeIcon: ActiveHomeIcon,
    inactiveIcon: InactiveHomeIcon,
    activeLabel: "Welcome",
    inactiveLabel: "Home",
    component: HomeComponent,
  },
  {
    route: "ShortsStack",
    activeIcon: ActiveShortsIcon,
    inactiveIcon: InactiveShortsIcon,
    activeLabel: "or Trunks?",
    inactiveLabel: "Shorts",
    component: ShortsStack,
  },
  {
    route: "UploadStack",
    activeIcon: ActiveUploadIcon,
    inactiveIcon: InactiveUploadIcon,
    activeLabel: "B-But I'm shy...",
    inactiveLabel: "Upload",
    component: UploadStack,
  },
  {
    route: "SubscriptionsStack",
    activeIcon: ActiveSubscriptionIcon,
    inactiveIcon: InactiveSubscriptionIcon,
    activeLabel: "Please like &",
    inactiveLabel: "Subscriptions",
    component: SubscriptionsStack,
  },
  {
    route: "YouStack",
    activeIcon: ActiveYouIcon,
    inactiveIcon: InactiveYouIcon,
    activeLabel: "Who? M-Me?",
    inactiveLabel: "You",
    component: YouStack,
  },
];

export default function MainNavigator() {
  const { colors, fontSizes } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      id="MainNavigator"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => {
        return (
          <ThView style={{ flex: 1, justifyContent: "space-between" }}>
            <DrawerContentScrollView style={{ backgroundColor: colors.bg }}>
              {drawerItems.map((item, index) => {
                const isCurrentItemThisRoute =
                  drawerItems[props.state.index].route === item.route;
                const isCurrentItemYoutubeHomeStack =
                  drawerItems[0].route === item.route;

                return (
                  <React.Fragment key={item.route}>
                    {/*Render divider if index is in the last 3 items of drawerItems*/}
                    {index === drawerItems.length - 3 && (
                      <ThView
                        style={{
                          marginVertical: 12,
                          backgroundColor: colors.primary,
                          width: "100%",
                          height: 1,
                        }}
                      />
                    )}

                    <DrawerItem
                      style={{
                        marginBottom: 2,
                        backgroundColor:
                          isCurrentItemThisRoute &&
                          !isCurrentItemYoutubeHomeStack
                            ? colors.primary
                            : colors.bg,
                      }}
                      onPress={() => props.navigation.navigate(item.route)}
                      icon={() => (
                        <item.icon
                          color={
                            isCurrentItemYoutubeHomeStack ||
                            drawerItems[drawerItems.length - 3].route ===
                              item.route ||
                            drawerItems[drawerItems.length - 2].route ===
                              item.route ||
                            drawerItems[drawerItems.length - 1].route ===
                              item.route
                              ? isCurrentItemThisRoute &&
                                !isCurrentItemYoutubeHomeStack
                                ? colors.iconAccent
                                : colors.primary
                              : isCurrentItemThisRoute
                              ? colors.iconAccent
                              : colors.icon
                          }
                        />
                      )}
                      label={() => (
                        <ThText
                          style={{
                            marginLeft: isCurrentItemYoutubeHomeStack
                              ? -10
                              : 10,
                            fontSize: isCurrentItemYoutubeHomeStack
                              ? fontSizes.xl
                              : fontSizes.base,
                            fontWeight: isCurrentItemYoutubeHomeStack
                              ? "bold"
                              : isCurrentItemThisRoute
                              ? "bold"
                              : "medium",
                            color:
                              isCurrentItemThisRoute &&
                              !isCurrentItemYoutubeHomeStack
                                ? colors.textAccent
                                : colors.text,
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

            {/*Drawer Footer*/}
            <ThView
              style={{
                marginBottom: insets.bottom + 6,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <DrawerFooterText
                onPress={() => console.log("Privacy Policy Press")}
              >
                Privacy Policy
              </DrawerFooterText>
              <DrawerFooterText
                style={{
                  marginHorizontal: 6,
                }}
              >
                •
              </DrawerFooterText>
              <DrawerFooterText
                onPress={() => console.log("Terms of Service Press")}
              >
                Terms of Service
              </DrawerFooterText>
            </ThView>
          </ThView>
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
        const currentTabItem = bottomTabItems().find(
          (bottomTabItem) => bottomTabItem.route === route.name
        );
        return {
          headerShown: false,
          tabBarStyle: getMainBottomTabBarStyle(colors),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <currentTabItem.activeIcon color={colors.primary} />
            ) : (
              <currentTabItem.inactiveIcon color={colors.iconMuted} />
            ),
          tabBarLabel: ({ focused }) => (
            <ThText
              style={{
                color: focused ? colors.text : colors.textMuted,
                fontWeight: "medium",
                fontSize: fontSizes.xs2,
              }}
            >
              {focused
                ? currentTabItem.activeLabel
                : currentTabItem.inactiveLabel}
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
      style={[
        {
          color: colors.textMuted,
          fontSize: fontSizes.xs,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </ThText>
  );
}
