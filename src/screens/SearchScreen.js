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
  RemoveSearchFromHistoryModal,
} from "../components/ModalComponents";
import { useModal } from "../context/ModalContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import {
  ThFlatList,
  ThPressable,
  ThText,
  ThTextInput,
  ThView,
  ThHeaderContainer,
} from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { hideMainBottomTabBar } from "../utils/utils";

export default function SearchScreen({ navigation, route }) {
  const {
    setIsClearHistoryModalVisible,
    setIsRemoveSearchFromHistoryModalVisible,
  } = useModal();
  const { searchHistory, setRemovingSearchItem, handleSearch } = useSearch();
  const { colors, fontSizes, iconSizes } = useTheme();

  const { search } = route.params;
  const [searchInput, setSearchInput] = useState(search);
  const [removingSearch, setRemoveSearch] = useState(null);

  hideMainBottomTabBar(navigation);

  return (
    <>
      <ThView style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
        <ThHeaderContainer>
          <HeaderArrowBackIcon navigation={navigation} />
          <ThTextInput
            style={{ marginHorizontal: 12 }}
            value={searchInput}
            onChangeText={setSearchInput}
            autoFocus={true}
            onSubmitEditing={() =>
              handleSearch({ navigation, searchInput: searchInput })
            }
            setClearButton={() => setSearchInput("")}
          />
          <HeaderMicIcon style={styles.headerRightContainer} />
        </ThHeaderContainer>

        <ThFlatList
          data={searchHistory}
          keyExtractor={(item, index) => item.text + index}
          renderItem={({ item }) => (
            <ThPressable
              style={({ pressed }) => ({
                paddingVertical: 12,
                backgroundColor: pressed ? colors.bgInteractive : colors.bg,
              })}
              onPress={() => {
                navigation.push("SearchResultScreen", { search: item.text });
              }}
              delayLongPress={200}
              onLongPress={() => {
                setRemovingSearchItem(item);
                setIsRemoveSearchFromHistoryModalVisible(true);
              }}
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
                <ClockRotateLeftIcon size={iconSizes.xs} />
                <ThText style={{ marginLeft: 12, flexShrink: 1 }}>
                  {item.text}
                </ThText>
                <SearchScreenHistoryImage
                  style={{ marginLeft: "auto" }}
                  source={{
                    uri: item.picture,
                  }}
                />
                <ArrowUpLeftIcon
                  style={{ marginLeft: 12 }}
                  onPress={() => {
                    setSearchInput(item.text);
                  }}
                />
              </ThView>
            </ThPressable>
          )}
          ListFooterComponent={
            searchHistory.length > 0 ? (
              <ThPressable onPress={() => setIsClearHistoryModalVisible(true)}>
                <ThText
                  style={{
                    color: colors.textSecondary,
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
