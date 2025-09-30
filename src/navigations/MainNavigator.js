import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThIcon, ThText, ThView } from "../components/ThemedComponents";
import { icons } from "../styles/icons";
import { useTheme } from "../styles/ThemeContext";
import { getMainBottomTabBarStyle } from "../utils/utils";
import ShortsStack from "./ShortsStack";
import SubscriptionsStack from "./SubscriptionsStack";
import UploadStack from "./UploadStack";
import YouStack from "./YouStack";
import YoutubeHomeStack from "./YoutubeHomeStack";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

//TODO: Change drawerItems component into the actual component based on the same route name
const drawerItems = [
  {
    route: "YoutubeHomeStack",
    iconComponent: icons.youtubeMain.iconComponent,
    iconName: icons.youtubeMain.iconName,
    label: "Youtube",
    component: YoutubeHomeStack,
  },
  {
    route: "MusicStack",
    iconComponent: icons.music.iconComponent,
    iconName: icons.music.iconName,
    label: "Music",
    component: ShortsStack,
  },
  {
    route: "MoviesStack",
    iconComponent: icons.movie.iconComponent,
    iconName: icons.movie.iconName,
    label: "Movies",
    component: UploadStack,
  },
  {
    route: "LiveStack",
    iconComponent: icons.live.iconComponent,
    iconName: icons.live.iconName,
    label: "Live",
    component: SubscriptionsStack,
  },
  {
    route: "GamingStack",
    iconComponent: icons.gaming.iconComponent,
    iconName: icons.gaming.iconName,
    label: "Gaming",
    component: YouStack,
  },
  {
    route: "NewsStack",
    iconComponent: icons.news.iconComponent,
    iconName: icons.news.iconName,
    label: "News",
    component: YoutubeHomeStack,
  },
  {
    route: "SportsStack",
    iconComponent: icons.sports.iconComponent,
    iconName: icons.sports.iconName,
    label: "Sports",
    component: YoutubeHomeStack,
  },
  {
    route: "CoursesStack",
    iconComponent: icons.course.iconComponent,
    iconName: icons.course.iconName,
    label: "Courses",
    component: YoutubeHomeStack,
  },
  {
    route: "FashionAndBeautyStack",
    iconComponent: icons.fashionAndBeauty.iconComponent,
    iconName: icons.fashionAndBeauty.iconName,
    label: "Fashion & Beauty",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubePremiumStack",
    iconComponent: icons.youtubePremium.iconComponent,
    iconName: icons.youtubePremium.iconName,
    label: "Youtube Premium",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubeMusicStack",
    iconComponent: icons.youtubeMusic.iconComponent,
    iconName: icons.youtubeMusic.iconName,
    label: "Youtube Music",
    component: YoutubeHomeStack,
  },
  {
    route: "YoutubeKidsStack",
    iconComponent: icons.youtubeKids.iconComponent,
    iconName: icons.youtubeKids.iconName,
    label: "Youtube Kids",
    component: YoutubeHomeStack,
  },
];

//HomeComponent in the parameter will change into the component of the currently selected Drawer route
const bottomTabItems = (HomeComponent = YoutubeHomeStack) => [
  {
    route: "HomeStack",
    activeIconComponent: icons.activeHome.iconComponent,
    inactiveIconComponent: icons.inactiveHome.iconComponent,
    activeIconName: icons.activeHome.iconName,
    inactiveIconName: icons.inactiveHome.iconName,
    activeLabel: "Welcome",
    inactiveLabel: "Home",
    component: HomeComponent,
  },
  {
    route: "ShortsStack",
    activeIconComponent: icons.activeShorts.iconComponent,
    inactiveIconComponent: icons.inactiveShorts.iconComponent,
    activeIconName: icons.activeShorts.iconName,
    inactiveIconName: icons.inactiveShorts.iconName,
    activeLabel: "or Trunks?",
    inactiveLabel: "Shorts",
    component: ShortsStack,
  },
  {
    route: "UploadStack",
    activeIconComponent: icons.activeUpload.iconComponent,
    inactiveIconComponent: icons.inactiveUpload.iconComponent,
    activeIconName: icons.activeUpload.iconName,
    inactiveIconName: icons.inactiveUpload.iconName,
    activeLabel: "B-But I'm shy...",
    inactiveLabel: "Upload",
    component: UploadStack,
  },
  {
    route: "SubscriptionsStack",
    activeIconComponent: icons.activeSubscription.iconComponent,
    inactiveIconComponent: icons.inactiveSubscription.iconComponent,
    activeIconName: icons.activeSubscription.iconName,
    inactiveIconName: icons.inactiveSubscription.iconName,
    activeLabel: "Please like &",
    inactiveLabel: "Subscriptions",
    component: SubscriptionsStack,
  },
  {
    route: "YouStack",
    activeIconComponent: icons.activeYou.iconComponent,
    inactiveIconComponent: icons.inactiveYou.iconComponent,
    activeIconName: icons.activeYou.iconName,
    inactiveIconName: icons.inactiveYou.iconName,
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
                        <ThIcon
                          IconComponent={item.iconComponent}
                          name={item.iconName}
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
                            marginLeft: isCurrentItemYoutubeHomeStack ? -8 : 8,
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
          tabBarIcon: ({ focused }) => (
            <ThIcon
              IconComponent={
                focused
                  ? currentTabItem.activeIconComponent
                  : currentTabItem.inactiveIconComponent
              }
              name={
                focused
                  ? currentTabItem.activeIconName
                  : currentTabItem.inactiveIconName
              }
              color={focused ? colors.primary : colors.iconMuted}
            />
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
