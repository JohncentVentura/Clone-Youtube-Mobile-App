import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import YouTubeFlatListScreen from "../api/YouTubeFlatListScreen";
import YouTubePlayerScreen from "../api/YouTubePlayerScreen";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
  HeaderTitleText,
  HeaderYouTubeLogoImage,
} from "../components/HeaderComponents";
import {
  ChannelHeaderModal,
  ClearHistoryModal,
  FlatListVideoItemModal,
  NotificationsHeaderModal,
  NotificationsItemModal,
  RemoveSearchModal,
  SearchResultHeaderModal,
  ShareScreenModal,
} from "../components/ModalComponents";
import { ThHeaderContainer } from "../components/ThemedComponents";
import { useModal } from "../context/ModalContext";
import { useSearch } from "../context/SearchContext";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const {
  isChannelHeaderVisible,
  setIsChannelHeaderVisible,
} = useModal();
const { isClearHistoryVisible, setIsClearHistoryVisible } =
  useModal();
const {
  isFlatListVideoItemVisible,
  setIsFlatListVideoItemVisible,
} = useModal();
const {
  isNotificationsHeaderVisible,
  setIsNotificationsHeaderVisible,
} = useModal();
const {
  isNotificationsItemVisible,
  setIsNotificationsItemVisible,
} = useModal();
const {
  isRemoveSearchVisible,
  setIsRemoveSearchVisible,
} = useModal();
const {
  isShareScreenVisible,
  setIsShareScreenVisible,
} = useModal();
const { isSearchResultHeaderVisible, setIsSearchResultHeaderVisible } =
  useModal();


  const { removingSearchItem } = useSearch();
  return (
    <>
      <ChannelHeaderModal
        isModalVisible={isChannelHeaderVisible}
        setIsModalVisible={setIsChannelHeaderVisible}
      />

      <ClearHistoryModal
        isModalVisible={isClearHistoryVisible}
        setIsModalVisible={setIsClearHistoryVisible}
      />

      <FlatListVideoItemModal
        isModalVisible={isFlatListVideoItemVisible}
        setIsModalVisible={setIsFlatListVideoItemVisible}
      />

      <NotificationsHeaderModal
        isModalVisible={isNotificationsHeaderVisible}
        setIsModalVisible={
          setIsNotificationsHeaderVisible
        }
      />

      <NotificationsItemModal
        isModalVisible={isNotificationsItemVisible}
        setIsModalVisible={setIsNotificationsItemVisible}
      />

      <RemoveSearchModal
        isModalVisible={isRemoveSearchVisible}
        setIsModalVisible={setIsRemoveSearchVisible}
        removingItem={removingSearchItem}
      />

      <ShareScreenModal
        isModalVisible={isShareScreenVisible}
        setIsModalVisible={setIsShareScreenVisible}
      />

      <SearchResultHeaderModal
        isModalVisible={isSearchResultHeaderVisible}
        setIsModalVisible={setIsSearchResultHeaderVisible}
      />

      <Stack.Navigator id="YoutubeHomeStack">
        <Stack.Screen
          name="YoutubeHomeScreen"
          component={YoutubeHomeScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderYouTubeLogoImage />
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderNotificationsIcon navigation={navigation} />
                    <HeaderSearchIcon navigation={navigation} />
                  </View>
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="MainVideoScreen"
          component={MainVideoScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon onPress={() => navigation.pop()} />
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="ChannelScreen"
          component={ChannelScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() =>
                        setIsChannelHeaderVisible(true)
                      }
                    />
                  </View>
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <HeaderTitleText>Notifications</HeaderTitleText>
                  <View style={styles.headerRightContainer}>
                    <HeaderShareScreenIcon
                      onPress={() => setIsShareScreenVisible(true)}
                    />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() =>
                        setIsNotificationsHeaderVisible(
                          true
                        )
                      }
                    />
                  </View>
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={({}) => {
            return {
              headerShown: false,
            };
          }}
        />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          options={({}) => {
            return {
              headerShown: false,
            };
          }}
        />
        {/*Experimental*/}
        <Stack.Screen
          name="YouTubeFlatListScreen"
          component={YouTubeFlatListScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </ThHeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="YouTubePlayerScreen"
          component={YouTubePlayerScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <ThHeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                </ThHeaderContainer>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </>
  );
}
