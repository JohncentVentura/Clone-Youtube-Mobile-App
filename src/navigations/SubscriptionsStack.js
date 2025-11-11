import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import {
  HomeCommentsModal,
  PostCommentsModal,
} from "../components/modals/CommentsModal";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderYoutubeLogoImage } from "../components/ImageComponents";
import { HeaderTitleText } from "../components/TextComponents";
import { useUIContext } from "../context/UIContext";
import AllSubscriptionsScreen from "../screens/AllSubscriptionsScreen";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import {
  ChannelStackScreen,
  MainVideoStackScreen,
  NotificationsStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
} from "./NavigationConfig";

const Stack = createStackNavigator();

export default function SubscriptionsStack() {
  const { ctxHomeCommentsModal, ctxPostCommentsModal } = useUIContext();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={navPaths.subscriptionsScreen}
          component={SubscriptionsScreen}
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
        <Stack.Screen
          name={navPaths.allSubscriptionsScreen}
          component={AllSubscriptionsScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <HeaderTitleText>All subscriptions</HeaderTitleText>
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderShareScreenIcon />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon />
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
      </Stack.Navigator>

      {ctxHomeCommentsModal && <HomeCommentsModal />}
      {ctxPostCommentsModal && <PostCommentsModal />}
    </>
  );
}
