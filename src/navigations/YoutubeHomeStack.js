import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import {
  ArrowBackIcon,
  DotVerticalIcon,
  NotificationIcon,
  SearchIcon,
  ShareScreenIcon,
  YoutubeIcon,
} from "../components/IconComponents";
import { ScreenShareModal } from "../components/ModalComponents";
import { ThText, ThView } from "../components/ThemedComponents";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import ChannelScreen from "../screens/ChannelScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const { colors, fontSizes } = useTheme();
  const [visible, setVisible] = useState(false);

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
            headerLeft: () => (
              <ArrowBackIcon
                style={styles.headerLeftIcon}
                navigation={navigation}
              />
            ),
            headerTitle: () => {
              return null;
            },
            headerRight: () => (
              <ThView style={styles.headerRightIconsContainer}>
                <ShareScreenIcon
                  style={styles.headerRightIcon}
                  onPress={() => setVisible(true)}
                />
                <NotificationIcon
                  style={styles.headerRightIcon}
                  onPress={() => {
                    navigation.navigate("NotificationsScreen");
                  }}
                />
                <SearchIcon style={styles.headerRightIcon} />
              </ThView>
            ),
          };
        }}
      >
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={{
            headerLeft: () => (
              <YoutubeIcon
                style={styles.headerLeftIcon}
                color={colors.primary}
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
                Youtube
              </ThText>
            ),
          }}
        />
        <Stack.Screen
          name="MainVideoScreen"
          component={MainVideoScreen}
          options={{
            headerRight: () => {
              return null;
            },
          }}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={{
            headerRight: () => (
              <ThView style={styles.headerRightIconsContainer}>
                <ShareScreenIcon
                  style={styles.headerRightIcon}
                  onPress={() => setVisible(true)}
                />
                <SearchIcon style={styles.headerRightIcon} />
                <DotVerticalIcon style={styles.headerRightIcon} />
              </ThView>
            ),
          }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
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
