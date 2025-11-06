import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import { HomeCommentsModal } from "../components/modals/CommentsModal";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderYoutubeLogoImage } from "../components/ImageComponents";
import {
  BaseText,
  HeaderTitleText,
  TextInputView,
} from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useSearchContext } from "../context/SearchContext";
import { useUIContext } from "../context/UIContext";
import ChannelScreen from "../screens/ChannelScreen";
import MainVideoScreen from "../screens/MainVideoScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import ShortsScreen from "../screens/ShortsScreen";
import YoutubeHomeScreen from "../screens/YoutubeHomeScreen";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import YoutubeFlatListScreen from "../youtubeAPI/YoutubeFlatListScreen";
import YoutubePlayerScreen from "../youtubeAPI/YoutubePlayerScreen";

const Stack = createStackNavigator();

export default function YoutubeHomeStack() {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const {
    ctxIsShortsVideoPlaying,
    ctxSetChannelHeaderModal,
    ctxSetNotifHeaderModal,
    ctxSetSearchResultHeaderModal,
    ctxHomeCommentsModal,
  } = useUIContext();

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
        <Stack.Screen
          name={navPaths.mainVideoScreen}
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
          name={navPaths.channelScreen}
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
                      onPress={() => ctxSetChannelHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name={navPaths.notificationsScreen}
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
                      onPress={() => ctxSetNotifHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              ),
            };
          }}
        />
        <Stack.Screen
          name={navPaths.searchScreen}
          component={SearchScreen}
          options={({ navigation, route }) => ({
            header: () => {
              const { ctxSearchInput, ctxSetSearchInput, ctxHandleSearch } =
                useSearchContext();
              const [searchInput, setSearchInput] = useState(
                route.params.search
              );

              return (
                <HeaderContainer>
                  <HeaderArrowBackIcon navigation={navigation} />
                  <TextInputView
                    autoFocus={true}
                    value={ctxSearchInput ? ctxSearchInput : searchInput}
                    onChangeText={
                      ctxSearchInput ? ctxSetSearchInput : setSearchInput
                    }
                    onSubmitEditing={() => {
                      ctxHandleSearch({
                        navigation,
                        searchInput: ctxSearchInput
                          ? ctxSearchInput
                          : searchInput,
                      });
                      ctxSetSearchInput("");
                    }}
                    setClearButton={() => {
                      ctxSetSearchInput("");
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
          name={navPaths.searchResultScreen}
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
                      navigation.navigate(navPaths.searchScreen, {
                        search: searchInput,
                      })
                    }
                    setClearButton={() => {
                      navigation.navigate(navPaths.searchScreen, {
                        search: "",
                      });
                    }}
                  />
                  <View style={styles.headerRightIconsContainer}>
                    <HeaderMicIcon style={{ marginLeft: 16 }} />
                    <HeaderShareScreenIcon />
                    <HeaderDotVerticalIcon
                      onPress={() => ctxSetSearchResultHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              );
            },
          })}
        />
        <Stack.Screen
          name={navPaths.shortsScreen}
          component={ShortsScreen}
          options={() => {
            return {
              header: ({ navigation }) => (
                <HeaderContainer
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  {!ctxIsShortsVideoPlaying && (
                    <BaseText
                      style={{
                        fontSize: ctxFontSizes.xl2,
                        fontWeight: "bold",
                        color: ctxColors.white,
                      }}
                    >
                      Shorts
                    </BaseText>
                  )}
                  <View style={[styles.headerRightIconsContainer]}>
                    <HeaderShareScreenIcon color={ctxColors.white} />
                    <HeaderSearchIcon
                      color={ctxColors.white}
                      navigation={navigation}
                    />
                    <HeaderDotVerticalIcon
                      style={[styles.headerRightIcon]}
                      color={ctxColors.white}
                    />
                  </View>
                </HeaderContainer>
              ),
            };
          }}
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

      {ctxHomeCommentsModal && <HomeCommentsModal />}
    </>
  );
}
