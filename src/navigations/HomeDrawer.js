import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import {
  HeaderRightIconsContainer,
  HeaderNotificationIcon,
  HeaderScreenShareIcon,
  HeaderSearchIcon,
  ThemedIcon,
  ThemedText,
  ThemedView,
} from "../components/ThemedComponents";
import HomeStack from "./HomeStack";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Drawer = createDrawerNavigator();
const drawerItems = [
  {
    route: "YoutubeScreen",
    iconComponent: Fontisto,
    iconName: "youtube-play",
    label: "Youtube",
    component: HomeStack,
  },
  {
    route: "MusicScreen",
    iconComponent: Ionicons,
    iconName: "musical-note-outline",
    label: "Music",
    component: HomeStack,
  },
  {
    route: "MoviesScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "movie-open-outline",
    label: "Movies",
    component: HomeStack,
  },
  {
    route: "LiveScreen",
    iconComponent: MaterialIcons,
    iconName: "live-tv",
    label: "Live",
    component: HomeStack,
  },
  {
    route: "GamingScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "youtube-gaming",
    label: "Gaming",
    component: HomeStack,
  },
  {
    route: "NewsScreen",
    iconComponent: Ionicons,
    iconName: "newspaper-outline",
    label: "News",
    component: HomeStack,
  },
  {
    route: "SportsScreen",
    iconComponent: Ionicons,
    iconName: "trophy-outline",
    label: "Sports",
    component: HomeStack,
  },
  {
    route: "LearningScreen",
    iconComponent: MaterialIcons,
    iconName: "lightbulb-outline",
    label: "Learning",
    component: HomeStack,
  },
  {
    route: "FashionAndBeautyScreen",
    iconComponent: Ionicons,
    iconName: "brush-outline",
    label: "Fashion & Beauty",
    component: HomeStack,
  },
  {
    route: "YoutubePremiumScreen",
    iconComponent: MaterialCommunityIcons,
    iconName: "youtube-tv",
    label: "Youtube Premium",
    component: HomeStack,
  },
  {
    route: "YoutubeMusicScreen",
    iconComponent: Entypo,
    iconName: "youtube-with-circle",
    label: "Youtube Music",
    component: HomeStack,
  },
  {
    route: "YoutubeKidsScreen",
    iconComponent: Feather,
    iconName: "youtube",
    label: "Youtube Kids",
    component: HomeStack,
  },
];

export default function HomeDrawer() {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <Drawer.Navigator
      id="HomeDrawer"
      drawerContent={(props) => <DrawerContentView {...props} />}
      screenOptions={({ navigation, route }) => {
        const currentItem = drawerItems.find(
          (drawerItem) => drawerItem.route === route.name
        );
        const isYoutubeCurrentItem = drawerItems[0].route === route.name;

        return {
          headerStyle: {
            backgroundColor: colors.bg,
            elevation: 0, //Android: removes drop shadow
            shadowOpacity: 0, //iOS: removes drop shadow
          },
          headerLeft: () =>
            isYoutubeCurrentItem ? (
              <ThemedIcon
                style={styles.headerLeftIcon}
                IconComponent={Fontisto}
                name="youtube-play"
                color={colors.primary}
              />
            ) : (
              <ThemedIcon
                style={styles.headerLeftIcon}
                IconComponent={Ionicons}
                name="arrow-back"
                onPress={() => navigation.goBack()}
              />
            ),
          headerTitle: () => (
            <ThemedText style={{ fontSize: fontSizes.xl, fontWeight: "bold" }}>
              {currentItem.label}
            </ThemedText>
          ),
          headerRight: () => (
            <HeaderRightIconsContainer>
              <HeaderScreenShareIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Screen Share Press")}
              />
              <HeaderNotificationIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Notification Press")}
              />
              <HeaderSearchIcon
                style={styles.headerRightIcon}
                onPress={() => console.log("Search Press")}
              />
            </HeaderRightIconsContainer>
          ),
        };
      }}
    >
      {drawerItems.map((item) => (
        <Drawer.Screen
          key={item.route}
          name={item.route}
          component={item.component}
        />
      ))}
    </Drawer.Navigator>
  );
}

function DrawerContentView(props) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <ThemedView style={{ flex: 1, justifyContent: "space-between" }}>
      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: colors.bg }}
      >
        {drawerItems.map((item, index) => {
          const focused =
            props.state.routeNames[props.state.index] === item.route;
          const isYoutubeCurrentItem = drawerItems[0].route === item.route;

          return (
            <React.Fragment key={item.route}>
              {index === drawerItems.length - 3 && (
                //ONLY render divider if index is in the last 3 items
                <ThemedView
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
                  backgroundColor:
                    focused && !isYoutubeCurrentItem
                      ? colors.primary
                      : colors.bg,
                }}
                icon={() => (
                  <ThemedIcon
                    IconComponent={item.iconComponent}
                    name={item.iconName}
                    size={isYoutubeCurrentItem ? iconSizes.xl3 : iconSizes.base}
                    color={
                      isYoutubeCurrentItem ||
                      drawerItems[drawerItems.length - 3].route ===
                        item.route ||
                      drawerItems[drawerItems.length - 2].route ===
                        item.route ||
                      drawerItems[drawerItems.length - 1].route === item.route
                        ? focused && !isYoutubeCurrentItem
                          ? colors.bg
                          : colors.primary
                        : focused
                        ? colors.bg
                        : colors.icon
                    }
                  />
                )}
                label={() => (
                  <ThemedText
                    style={{
                      fontSize: isYoutubeCurrentItem
                        ? fontSizes.xl2
                        : fontSizes.base,
                      fontWeight: isYoutubeCurrentItem
                        ? "bold"
                        : focused
                        ? "bold"
                        : "normal",
                      color:
                        focused && !isYoutubeCurrentItem
                          ? colors.bg
                          : colors.text,
                    }}
                  >
                    {item.label}
                  </ThemedText>
                )}
                onPress={() => props.navigation.navigate(item.route)}
              />
            </React.Fragment>
          );
        })}
      </DrawerContentScrollView>

      <ThemedView
        style={{
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ThemedText
          style={{
            color: colors.textGray,
            fontSize: fontSizes.xs,
          }}
          onPress={() => console.log("Privacy Policy Press")}
        >
          Privacy Policy
        </ThemedText>
        <ThemedText
          style={{
            marginHorizontal: 8,
            color: colors.textGray,
            fontSize: fontSizes.xs,
          }}
        >
          •
        </ThemedText>
        <ThemedText
          style={{
            color: colors.textGray,
            fontSize: fontSizes.xs,
          }}
          onPress={() => console.log("Terms of Service Press")}
        >
          Terms of Service
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
