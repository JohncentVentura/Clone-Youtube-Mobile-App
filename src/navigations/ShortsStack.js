import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderDotVerticalIcon,
  HeaderMicIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HomeCommentsModal } from "../components/modals/CommentsModal";
import { BaseText, TextInputView } from "../components/TextComponents";
import { useSearchContext } from "../context/SearchContext";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import ChannelScreen from "../screens/ChannelScreen";
import SearchScreen from "../screens/SearchScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import ShortsScreen from "../screens/ShortsScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const {
    ctxIsShortsVideoPlaying,
    ctxSetChannelHeaderModal,
    ctxSetSearchResultHeaderModal,
    ctxHomeCommentsModal,
  } = useUIContext();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ShortsScreen"
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
        <Stack.Screen
          name="SearchScreen"
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
                      onPress={() => ctxSetSearchResultHeaderModal(true)}
                    />
                  </View>
                </HeaderContainer>
              );
            },
          })}
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
                      onPress={() => ctxSetChannelHeaderModal(true)}
                    />
                  </View>
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
