import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThIcon, ThText, ThView } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import YoutubeHomeStack from "./YoutubeHomeStack";
import ShortsStack from "./ShortsStack";
import UploadStack from "./UploadStack";
import SubscriptionsStack from "./SubscriptionsStack";
import YouStack from "./YouStack";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

//TODO: Change drawerItems component props of objects into the actual component based on the same route name
const drawerItems = [
  {
    route: "YoutubeHomeStack",
    iconComponent: Fontisto,
    iconName: "youtube-play",
    label: "Youtube",
    component: YoutubeHomeStack,
  },
  {
    route: "MusicStack",
    iconComponent: Ionicons,
    iconName: "musical-note-outline",
    label: "Music",
    component: ShortsStack,
  },
  {
    route: "MoviesStack",
    iconComponent: MaterialCommunityIcons,
    iconName: "movie-open-outline",
    label: "Movies",
    component: YoutubeHomeStack,
  },
  {
    route: "LiveStack",
    iconComponent: MaterialIcons,
    iconName: "live-tv",
    label: "Live",
    component: YoutubeHomeStack,
  },
  {
    route: "GamingStack",
    iconComponent: MaterialCommunityIcons,
    iconName: "youtube-gaming",
    label: "Gaming",
    component: YoutubeHomeStack,
  },
  {
    route: "NewsStack",
    iconComponent: Ionicons,
    iconName: "newspaper-outline",
    label: "News",
    component: YoutubeHomeStack,
  },
  {
    route: "SportsStack",
    iconComponent: Ionicons,
    iconName: "trophy-outline",
    label: "Sports",
    component: YoutubeHomeStack,
  },
  {
    route: "CoursesStack",
    iconComponent: SimpleLineIcons,
    iconName: "graduation",
    label: "Courses",
    component: YoutubeHomeStack,
  },
  {
    route: "FashionAndBeautyStack",
    iconComponent: Ionicons,
    iconName: "brush-outline",
    label: "Fashion & Beauty",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubePremiumStack",
    iconComponent: MaterialCommunityIcons,
    iconName: "youtube-tv",
    label: "Youtube Premium",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubeMusicStack",
    iconComponent: Entypo,
    iconName: "youtube-with-circle",
    label: "Youtube Music",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubeKidsStack",
    iconComponent: Feather,
    iconName: "youtube",
    label: "Youtube Kids",
    component: YoutubeHomeStack,
  },
];

//HomeComponent parameter will change into the component of the currently selected Drawer route
const bottomTabItems = (HomeComponent = YoutubeHomeStack) => [
  {
    route: "HomeStack",
    activeIconName: "home-sharp",
    inactiveIconName: "home-outline",
    activeLabel: "Welcome",
    inactiveLabel: "Home",
    component: HomeComponent,
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

export default function MainNavigator({ route }) {
  const { colors, fontSizes, iconSizes } = useTheme();
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
                const isCurrentItem =
                  drawerItems[props.state.index].route === item.route;
                const isYoutubeCurrentItem =
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
                          isCurrentItem && !isYoutubeCurrentItem
                            ? colors.primary
                            : colors.bg,
                      }}
                      icon={() => (
                        <ThIcon
                          IconComponent={item.iconComponent}
                          name={item.iconName}
                          color={
                            isYoutubeCurrentItem ||
                            drawerItems[drawerItems.length - 3].route ===
                              item.route ||
                            drawerItems[drawerItems.length - 2].route ===
                              item.route ||
                            drawerItems[drawerItems.length - 1].route ===
                              item.route
                              ? isCurrentItem && !isYoutubeCurrentItem
                                ? colors.bg
                                : colors.primary
                              : isCurrentItem
                              ? colors.bg
                              : colors.icon
                          }
                        />
                      )}
                      label={() => (
                        <ThText
                          style={{
                            marginLeft: isYoutubeCurrentItem ? -8 : 8,
                            fontSize: isYoutubeCurrentItem
                              ? fontSizes.xl
                              : fontSizes.base,
                            fontWeight: isYoutubeCurrentItem
                              ? "bold"
                              : isCurrentItem
                              ? "bold"
                              : "medium",
                            color:
                              isCurrentItem && !isYoutubeCurrentItem
                                ? colors.bg
                                : colors.text,
                          }}
                        >
                          {item.label}
                        </ThText>
                      )}
                      onPress={() => props.navigation.navigate(item.route)}
                    />
                  </React.Fragment>
                );
              })}
            </DrawerContentScrollView>

            <ThView
              style={{
                marginBottom: insets.bottom + 6,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <ThText
                style={{
                  color: colors.textGray,
                  fontSize: fontSizes.xs,
                }}
                onPress={() => console.log("Privacy Policy Press")}
              >
                Privacy Policy
              </ThText>
              <ThText
                style={{
                  marginLeft: 4,
                  color: colors.textGray,
                  fontSize: fontSizes.xs,
                }}
              >
                •
              </ThText>
              <ThText
                style={{
                  marginLeft: 4,
                  color: colors.textGray,
                  fontSize: fontSizes.xs,
                }}
                onPress={() => console.log("Terms of Service Press")}
              >
                Terms of Service
              </ThText>
            </ThView>
          </ThView>
        );
      }}
    >
      {drawerItems.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          component={MainBottomTabs}
        />
      ))}
    </Drawer.Navigator>
  );
}

function MainBottomTabs({ navigation, route }) {
  const { colors, fontSizes } = useTheme();
  const parentNav = navigation.getParent("MainNavigator");

  // Updates bottomTabItems so the HomeStack route tab uses the component of the currently selected Drawer route.
  const tabItems = bottomTabItems( drawerItems[parentNav.getState().index].component );

  return (
    <BottomTab.Navigator
      key={colors.bg} // force remount on theme change
      id="MainBottomTabs"
      screenOptions={({ navigation, route }) => {
        const currentDrawerItem = drawerItems.find(
          (drawerItem) =>
            drawerItem.route ===
            parentNav.getState().routes[parentNav.getState().index].name
        );
        const currentTabItem = bottomTabItems().find(
          (bottomTabItem) => bottomTabItem.route === route.name
        );
        const isYoutubeCurrentDrawerItem =
          drawerItems[0].route ===
          parentNav.getState().routes[parentNav.getState().index].name;

        return {
          headerShown: route.name === bottomTabItems()[0].route,
          headerStyle: {
            backgroundColor: colors.bg,
            elevation: 0, //Android: removes drop shadow
            shadowOpacity: 0, //iOS: removes drop shadow
          },
          headerLeft: () =>
            isYoutubeCurrentDrawerItem ? (
              <ThIcon
                style={styles.headerLeftIcon}
                IconComponent={Fontisto}
                name="youtube-play"
                color={colors.primary}
              />
            ) : (
              <ThIcon
                style={styles.headerLeftIcon}
                IconComponent={Ionicons}
                name="arrow-back"
                onPress={() => navigation.goBack()}
              />
            ),
          headerTitle: () => (
            <ThText
              style={[
                styles.headerTitleIcon,
                {
                  fontSize: fontSizes.xl,
                  fontWeight: "bold",
                },
              ]}
            >
              {currentDrawerItem.label}
            </ThText>
          ),
          headerRight: () => (
            <ThView style={styles.headerRightIconsContainer}>
              <ThIcon
                style={styles.headerRightIcon}
                IconComponent={MaterialIcons}
                name="screen-share"
                onPress={() => console.log("Screen share pressed")}
              />
              <ThIcon
                style={styles.headerRightIcon}
                IconComponent={Ionicons}
                name="notifications-outline"
                onPress={() => console.log("Notification pressed")}
              />
              <ThIcon
                style={styles.headerRightIcon}
                IconComponent={Ionicons}
                name="search"
                onPress={() => console.log("Search pressed")}
              />
            </ThView>
          ),
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
                  ? currentTabItem.activeIconName
                  : currentTabItem.inactiveIconName
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
              {focused
                ? currentTabItem.activeLabel
                : currentTabItem.inactiveLabel}
            </ThText>
          ),
        };
      }}
    >
      {tabItems.map((item) => (
        <BottomTab.Screen
          key={item.route}
          name={item.route}
          component={item.component}
        />
      ))}
    </BottomTab.Navigator>
  );
}
