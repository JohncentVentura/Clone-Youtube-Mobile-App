import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  ClearSearchHistoryModal,
  RemoveSearchItemModal,
} from "../components/modals/QuestionModals";
import {
  HomeCommentsModal,
  HomeCommentsProfileModal,
} from "../components/modals/CommentsModal";
import {
  FlatListVideoItemModal,
  HomeCommentsItemModal,
  HomeCommentsProfileItemModal,
  NotificationsItemModal,
  ShareScreenModal,
} from "../components/modals/SwipeDownModals";
import {
  ChannelHeaderModal,
  NotificationsHeaderModal,
  SearchResultHeaderModal,
} from "../components/modals/TopRightModals";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderYoutubeLogoImage } from "../components/ImageComponents";
import { HeaderTitleText, TextInputView } from "../components/TextComponents";
import { useSearch } from "../context/SearchContext";
import { useUI } from "../context/UIContext";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";
import YoutubeFlatListScreen from "../youtubeAPI/YoutubeFlatListScreen";
import YoutubePlayerScreen from "../youtubeAPI/YoutubePlayerScreen";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const {
    setShowChannelHeaderModal,
    setShowNotifHeaderModal,
    setShowSearchResultHeaderModal,
    showHomeCommentsModal,
  } = useUI();

  return (
    <>
      {renderModalComponents()}

      <Stack.Navigator id="YoutubeHomeStack">
        <Stack.Screen
          name="YoutubeHomeScreen"
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
        <Stack.Screen
          name="MainVideoScreen"
          component={MainVideoScreen}
          options={({ navigation }) => {
            return {
              header: () => (
                <HeaderContainer>
                  <HeaderArrowBackIcon onPress={() => navigation.pop()} />
                </HeaderContainer>
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
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderShareScreenIcon />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() => setShowChannelHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
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
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <HeaderTitleText>Notifications</HeaderTitleText>
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderShareScreenIcon />
                    <HeaderSearchIcon navigation={navigation} />
                    <HeaderDotVerticalIcon
                      onPress={() => setShowNotifHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={({ navigation, route }) => ({
            header: () => {
              const { globalHomeSearch, setGlobalHomeSearch, handleSearch } =
                useSearch();
              const [searchInput, setSearchInput] = useState(
                route.params.search
              );

              return (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <TextInputView
                    autoFocus={true}
                    value={globalHomeSearch ? globalHomeSearch : searchInput}
                    onChangeText={setSearchInput}
                    onSubmitEditing={() => {
                      handleSearch({
                        navigation,
                        searchInput: globalHomeSearch
                          ? globalHomeSearch
                          : searchInput,
                      });
                      setGlobalHomeSearch("");
                    }}
                    setClearButton={() => {
                      setGlobalHomeSearch("");
                      setSearchInput("");
                    }}
                  />
                  <HeaderMicIcon />
                </HeaderContainer>
              );
            },
          })}
        />
        <Stack.Screen
          name="SearchResultScreen"
          component={SearchResultScreen}
          options={({ navigation, route }) => ({
            header: () => {
              const [searchInput, setSearchInput] = useState(
                route.params?.search || ""
              );

              return (
                <HeaderContainer>
                  <HeaderArrowBackIcon
                    onPress={() => {
                      navigation.pop(2);
                    }}
                  />
                  <TextInputView
                    value={searchInput}
                    onPress={() =>
                      navigation.navigate("SearchScreen", {
                        search: searchInput,
                      })
                    }
                    setClearButton={() => {
                      navigation.navigate("SearchScreen", { search: "" });
                    }}
                  />
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderMicIcon style={{ marginLeft: 16 }} />
                    <HeaderShareScreenIcon />
                    <HeaderDotVerticalIcon
                      onPress={() => setShowSearchResultHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              );
            },
          })}
        />
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

      {showHomeCommentsModal && <HomeCommentsModal />}
    </>
  );
}

function renderModalComponents() {
  const {
    showChannelHeaderModal,
    setShowChannelHeaderModal,
    showClearSearchHistoryModal,
    setShowClearSearchHistoryModal,
    showFlatListVideoItemModal,
    setShowFlatListVideoItemModal,
    showHomeCommentsItemModal,
    setShowHomeCommentsItemModal,
    showHomeCommentsProfileModal,
    setShowHomeCommentsProfileModal,
    showHomeCommentsProfileItemModal,
    setShowHomeCommentsProfileItemModal,
    showNotifHeaderModal,
    setShowNotifHeaderModal,
    showRemoveSearchItemModal,
    setShowRemoveSearchItemModal,
    showNotifItemModal,
    setShowNotifItemModal,
    showSearchResultHeaderModal,
    setShowSearchResultHeaderModal,
    showShareScreenModal,
    setShowShareScreenModal,
  } = useUI();

  return (
    <>
      <ClearSearchHistoryModal
        showModal={showClearSearchHistoryModal}
        setShowModal={setShowClearSearchHistoryModal}
      />

      <ChannelHeaderModal
        showModal={showChannelHeaderModal}
        setShowModal={setShowChannelHeaderModal}
      />

      <FlatListVideoItemModal
        showModal={showFlatListVideoItemModal}
        setShowModal={setShowFlatListVideoItemModal}
      />

      <HomeCommentsItemModal
        showModal={showHomeCommentsItemModal}
        setShowModal={setShowHomeCommentsItemModal}
      />

      <HomeCommentsProfileModal
        showModal={showHomeCommentsProfileModal}
        setShowModal={setShowHomeCommentsProfileModal}
      />

      <HomeCommentsProfileItemModal
        showModal={showHomeCommentsProfileItemModal}
        setShowModal={setShowHomeCommentsProfileItemModal}
      />

      <NotificationsHeaderModal
        showModal={showNotifHeaderModal}
        setShowModal={setShowNotifHeaderModal}
      />

      <NotificationsItemModal
        showModal={showNotifItemModal}
        setShowModal={setShowNotifItemModal}
      />
      
      <RemoveSearchItemModal
        showModal={showRemoveSearchItemModal}
        setShowModal={setShowRemoveSearchItemModal}
      />

      <SearchResultHeaderModal
        showModal={showSearchResultHeaderModal}
        setShowModal={setShowSearchResultHeaderModal}
      />

      <ShareScreenModal
        showModal={showShareScreenModal}
        setShowModal={setShowShareScreenModal}
      />
    </>
  );
}
