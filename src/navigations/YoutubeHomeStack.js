import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import {
  HomeCommentsModal,
  PostCommentsModal,
} from "../components/modals/CommentsModal";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderYoutubeLogoImage } from "../components/ImageComponents";
import { useUIContext } from "../context/UIContext";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import YoutubeFlatListScreen from "../youtubeAPI/YoutubeFlatListScreen";
import YoutubePlayerScreen from "../youtubeAPI/YoutubePlayerScreen";
import {
  ChannelStackScreen,
  MainVideoStackScreen,
  NotificationsStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
} from "./StackNavigator";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const { ctxHomeCommentsModal, ctxPostCommentsModal } = useUIContext();

  return (
    <>
      <Stack.Navigator id="YoutubeHomeStack">
        <Stack.Screen
          name={navPaths.youtubeHomeScreen}
          component={YoutubeHomeScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderYoutubeLogoImage />
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderShareScreenIcon />
                    <HeaderNotificationsIcon navigation={navigation} />
                    <HeaderSearchIcon navigation={navigation} />
                  </View>
                </HeaderContainer>
              ),
            };
          }}
        />
        {ChannelStackScreen()}
        {MainVideoStackScreen()}
        {NotificationsStackScreen()}
        {SearchStackScreen()}
        {SearchResultStackScreen()}
        {ShortsStackScreen()}
        {/*Experimental*/}
        <Stack.Screen
          name="YouTubeFlatListScreen"
          component={YoutubeFlatListScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </HeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="YouTubePlayerScreen"
          component={YoutubePlayerScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </HeaderContainer>
              ),
            };
          }}
        />
      </Stack.Navigator>

      {ctxHomeCommentsModal && <HomeCommentsModal />}
      {ctxPostCommentsModal && <PostCommentsModal />}
    </>
  );
}
