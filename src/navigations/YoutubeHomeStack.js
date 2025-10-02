import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import {
  HeaderArrowBack,
  HeaderDotVertical,
  HeaderNotifications,
  HeaderSearch,
  HeaderShareScreen,
  HeaderText,
} from "../components/HeaderComponents";
import { YoutubeIcon } from "../components/IconComponents";
import { ScreenShareModal } from "../components/ModalComponents";
import { ThView } from "../components/ThemedComponents";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
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
            headerTitle: () => null,
            headerRight: () => null,
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
              headerTitle: () => <HeaderText>YouTube</HeaderText>,
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
        <Stack.Screen
          name="MainVideoScreen"
          component={MainVideoScreen}
          options={({ navigation }) => {
            return {
              headerLeft: () => (
                <HeaderArrowBack onPress={() => navigation.pop()} />
              ),
            };
          }}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <ThView style={styles.headerRightIconsContainer}>
                  <HeaderShareScreen setVisible={setVisible} />
                  <HeaderSearch navigation={navigation} search={search} />
                  <HeaderDotVertical />
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
              headerTitle: () => <HeaderText>Notifications</HeaderText>,
              headerRight: () => (
                <ThView style={styles.headerRightIconsContainer}>
                  <HeaderShareScreen setVisible={setVisible} />
                  <HeaderSearch navigation={navigation} search={search} />
                  <HeaderDotVertical />
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
          name="SearchResultScreen"
          component={SearchResultScreen}
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
