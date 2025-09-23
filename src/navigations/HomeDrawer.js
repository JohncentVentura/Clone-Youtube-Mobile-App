import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { ThIcon, ThText, ThView } from "../components/ThemedComponents";
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
    route: "CoursesScreen",
    iconComponent: SimpleLineIcons,
    iconName: "graduation",
    label: "Courses",
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
      drawerContent={(props) => <CustomDrawerContentView {...props} />}
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
              {currentItem.label}
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

function CustomDrawerContentView(props) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <ThView style={{ flex: 1, justifyContent: "space-between" }}>
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
                    focused && !isYoutubeCurrentItem
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
                  <ThText
                    style={{
                      marginLeft: isYoutubeCurrentItem ? -8 : 8,
                      fontSize: isYoutubeCurrentItem
                        ? fontSizes.xl
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
          marginBottom: 10,
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
            marginLeft: 8,
            color: colors.textGray,
            fontSize: fontSizes.xs,
          }}
        >
          •
        </ThText>
        <ThText
          style={{
            marginLeft: 8,
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
}
