import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import {
  ArrowBackIcon,
  DotVerticalIcon,
  MicIcon,
  NotificationIcon,
  SearchIcon,
  ShareScreenIcon,
  YoutubeIcon,
} from "../components/IconComponents";
import { ScreenShareModal } from "../components/ModalComponents";
import {
  ThText,
  ThTextInput,
  ThView,
  AnimFadeRoundButton,
} from "../components/ThemedComponents";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchVideoScreen from "../screens/SearchVideoScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const { colors, fontSizes } = useTheme();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <ScreenShareModal visible={visible} setVisible={setVisible} />

      <Stack.Navigator
        id="YoutubeHomeStack"
        screenOptions={({ navigation }) => {
          return {
            headerStyle: {
              backgroundColor: colors.bg,
              elevation: 0, //Android: removes drop shadow
              shadowOpacity: 0, //iOS: removes drop shadow
            },
            headerLeft: () => <HeaderArrowBack navigation={navigation} />,
            headerTitle: () => {
              return null;
            },
          };
        }}
      >
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={({ navigation }) => {
            return {
              headerLeft: () => (
                <YoutubeIcon
                  style={styles.headerLeftIcon}
                  color={colors.primary}
                />
              ),
              headerTitle: () => (
                <ThText
                  style={[
                    styles.headerTitle,
                    {
                      fontSize: fontSizes.xl,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Youtube
                </ThText>
              ),
              headerRight: () => (
                <ThView style={styles.headerRightIconsContainer}>
                  <HeaderShareScreen setVisible={setVisible} />
                  <HeaderNotifications navigation={navigation} />
                  <HeaderSearch navigation={navigation} search={search} />
                </ThView>
              ),
            };
          }}
        />
        <Stack.Screen name="MainVideoScreen" component={MainVideoScreen} />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <ThView style={styles.headerRightIconsContainer}>
                  <HeaderShareScreen setVisible={setVisible} />
                  <HeaderSearch navigation={navigation} search={search} />
                  <HeaderDotVertical navigation={navigation} />
                </ThView>
              ),
            };
          }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <ThText
                  style={[
                    styles.headerTitle,
                    {
                      fontSize: fontSizes.xl,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Notifications
                </ThText>
              ),
              headerRight: () => (
                <ThView style={styles.headerRightIconsContainer}>
                  <HeaderShareScreen setVisible={setVisible} />
                  <HeaderSearch navigation={navigation} search={search} />
                  <HeaderDotVertical navigation={navigation} />
                </ThView>
              ),
            };
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchVideoScreen"
          component={SearchVideoScreen}
          options={{ headerShown: false }}
        />
        {/*Experimental*/}
        <Stack.Screen
          name="YouTubeFlatListScreen"
          component={YouTubeFlatListScreen}
        />
        <Stack.Screen
          name="YouTubePlayerScreen"
          component={YouTubePlayerScreen}
        />
      </Stack.Navigator>
    </>
  );
}

function HeaderArrowBack({navigation}) {
  return (
    <AnimFadeRoundButton
      style={styles.headerLeftIcon}
      onPress={() => navigation.goBack()}
    >
      <ArrowBackIcon />
    </AnimFadeRoundButton>
  );
}

function HeaderDotVertical() {
  return (
    <AnimFadeRoundButton style={styles.headerRightIcon}>
      <DotVerticalIcon />
    </AnimFadeRoundButton>
  );
}

function HeaderNotifications({navigation}) {
  return (
    <AnimFadeRoundButton
      style={styles.headerRightIcon}
      onPress={() => {
        navigation.push("NotificationsScreen");
      }}
    >
      <NotificationIcon />
    </AnimFadeRoundButton>
  );
}

function HeaderSearch({navigation, search}) {
  return (
    <AnimFadeRoundButton
      style={styles.headerRightIcon}
      onPress={() => {
        navigation.push("SearchScreen", { search: search });
      }}
    >
      <SearchIcon />
    </AnimFadeRoundButton>
  );
}

function HeaderShareScreen({setVisible}) {
  return (
    <AnimFadeRoundButton
      style={styles.headerRightIcon}
      onPress={() => setVisible(true)}
    >
      <ShareScreenIcon />
    </AnimFadeRoundButton>
  );
}
