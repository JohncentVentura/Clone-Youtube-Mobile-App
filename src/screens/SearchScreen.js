import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import {
  HeaderArrowBackIcon,
  HeaderMicIcon,
} from "../components/HeaderComponents";
import {
  ArrowUpLeftIcon,
  ClockRotateLeftIcon,
} from "../components/IconComponents";
import { SearchScreenHistoryImage } from "../components/ImageComponents";
import { useModal } from "../context/ModalContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import {
  ThText,
  ThTextInputView,
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
      <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
        <ThHeaderContainer>
          <HeaderArrowBackIcon navigation={navigation} />
          <ThTextInputView
            style={{ marginHorizontal: 12 }}
            autoFocus={true}
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={() =>
              handleSearch({ navigation, searchInput: searchInput })
            }
            setClearButton={() => setSearchInput("")}
          />
          <HeaderMicIcon style={styles.headerRightContainer} />
        </ThHeaderContainer>

        <FlatList
          data={searchHistory}
          keyExtractor={(item, index) => index + item.text}
          renderItem={({ item }) => (
            <Pressable
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
              <View
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
              </View>
            </Pressable>
          )}
          ListFooterComponent={
            searchHistory.length > 0 ? (
              <Pressable onPress={() => setIsClearHistoryModalVisible(true)}>
                <ThText
                  style={{
                    color: colors.textSecondary,
                    fontSize: fontSizes.sm,
                    textAlign: "center",
                  }}
                >
                  Clear History
                </ThText>
              </Pressable>
            ) : null
          }
        />
      </View>
    </>
  );
}
