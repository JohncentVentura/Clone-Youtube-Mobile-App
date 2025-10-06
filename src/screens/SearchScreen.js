import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  HeaderArrowBackIcon,
  HeaderMicIcon,
} from "../components/HeaderComponents";
import {
  ArrowUpLeftIcon,
  ClockRotateLeftIcon,
} from "../components/IconComponents";
import { SearchScreenHistoryImage } from "../components/ImageComponents";
import {
  ClearSearchHistoryModal,
  RemoveSearchHistoryModal,
} from "../components/ModalComponents";
import {
  ThFlatList,
  ThPressable,
  ThText,
  ThTextInput,
  ThView,
  ThTextInputCloseButton,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { hideMainBottomTabBar } from "../utils/utils";

const SEARCH_HISTORY_KEY = "searchHistory";

export default function SearchScreen({ navigation, route }) {
  const { colors, fontSizes, iconSizes } = useTheme();
  const insets = useSafeAreaInsets();
  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [searchHistory, setSearchHistory] = useState([]); //Contains search text & search image
  const [removingItem, setRemovingItem] = useState(null);
  const [isRemoveSearchModalVisible, setIsRemoveSearchModalVisible] =
    useState(false);
  const [isClearHistoryModalVisible, setIsClearHistoryModalVisible] =
    useState(false);

  hideMainBottomTabBar(navigation);

  //Save history every time it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      (async () => {
        try {
          await AsyncStorage.setItem(
            SEARCH_HISTORY_KEY,
            JSON.stringify(searchHistory)
          );
        } catch (e) {
          console.log("Failed to save history: ", e);
        }
      })();
    }
  }, [searchHistory]);

  //Load history when screen mounts
  useEffect(() => {
    (async () => {
      try {
        const loadedSearchHistory = await AsyncStorage.getItem(
          SEARCH_HISTORY_KEY
        );
        if (loadedSearchHistory)
          setSearchHistory(JSON.parse(loadedSearchHistory));
      } catch (e) {
        console.log("Failed to load history: ", e);
      }
    })();
  }, []);

  const handleSearch = async (navigation, searchText) => {
    if (!searchText) return; //Ignores empty search input

    let searchPicture = "";
    try {
      //fetch data for the searched picture only after searching it
      const data = await fetchPexelsData(searchText, 1);
      searchPicture = data[0].picture;
    } catch (e) {
      console.log("Failed to fetch on handleSearch: ", e);
      return;
    }

    const searchedItem = {
      text: searchText,
      picture: searchPicture,
    };

    setSearchHistory((prevSearchHistory) => {
      if (prevSearchHistory.some((item) => item.text === searchText))
        return prevSearchHistory; //Prevents duplicate searches
      return [searchedItem, ...prevSearchHistory]; //Add new searched item
    });

    navigation.push("SearchResultScreen", { search: searchedItem.text });
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (e) {
      console.log("Failed to clear history: ", e);
    }
  };

  const removeSearchHistoryItem = async (itemText) => {
    try {
      const updated = searchHistory.filter((item) => item.text !== itemText);
      setSearchHistory(updated);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Failed to remove item: ", e);
    }
  };

  return (
    <>
      <RemoveSearchHistoryModal
        isModalVisible={isRemoveSearchModalVisible}
        setIsModalVisible={setIsRemoveSearchModalVisible}
        removingItem={removingItem}
        removeSearchHistoryItem={removeSearchHistoryItem}
      />

      <ClearSearchHistoryModal
        isModalVisible={isClearHistoryModalVisible}
        setIsModalVisible={setIsClearHistoryModalVisible}
        clearSearchHistory={clearSearchHistory}
      />

      <ThView style={styles.screenContainer}>
        {/*Header*/}
        <ThView
          style={{
            marginTop: insets.top + 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HeaderArrowBackIcon navigation={navigation} />
          <ThView style={{ marginLeft: 14, flex: 1 }}>
            <ThTextInput
              value={searchInput}
              onChangeText={setSearchInput}
              autoFocus={true}
              onSubmitEditing={() => handleSearch(navigation, searchInput)}
            />
            <ThTextInputCloseButton onPress={() => setSearchInput("")} />
          </ThView>
          <ThView style={styles.headerRightIconsContainer}>
            <HeaderMicIcon style={{ marginLeft: 14 }} />
          </ThView>
        </ThView>

        {/*Search History*/}
        <ThFlatList
          data={searchHistory}
          keyExtractor={(item, index) => item.text + index}
          renderItem={({ item }) => (
            <ThPressable
              style={({ pressed }) => ({
                paddingVertical: 12,
                backgroundColor: pressed ? colors.bgMuted : colors.bg,
              })}
              onPress={() => handleSearch(navigation, item.text)}
              onLongPress={() => {
                setRemovingItem(item);
                setIsRemoveSearchModalVisible(true);
              }}
              delayLongPress={100}
            >
              <ThView
                style={[
                  styles.paddedHorizontalContainer,
                  {
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <ClockRotateLeftIcon size={iconSizes.sm} />
                <ThText style={{ marginLeft: 12, flexShrink: 1 }}>
                  {item.text}
                </ThText>
                <SearchScreenHistoryImage
                  style={{ marginLeft: "auto" }}
                  source={{
                    uri: item.picture,
                  }}
                />
                <ArrowUpLeftIcon style={{ marginLeft: 12 }} />
              </ThView>
            </ThPressable>
          )}
          ListFooterComponent={
            searchHistory.length > 0 ? (
              <ThPressable
                style={styles.baseButton}
                onPress={() => setIsClearHistoryModalVisible(true)}
              >
                <ThText
                  style={{
                    color: colors.textMuted,
                    fontSize: fontSizes.sm,
                    textAlign: "center",
                  }}
                >
                  Clear History
                </ThText>
              </ThPressable>
            ) : null
          }
        />
      </ThView>
    </>
  );
}
