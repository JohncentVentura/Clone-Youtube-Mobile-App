import { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowUpLeftIcon,
  ClockRotateLeftIcon,
} from "../components/IconComponents";
import { SearchHistoryThumbnailImage } from "../components/ImageComponents";
import { ThText } from "../components/ThemedComponents";
import { useModal } from "../context/ModalContext";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setIsClearSearchHistoryVisible, setIsRemoveSearchItemVisible } =
    useModal();
  const { setGlobalSearch, searchHistory, setRemovingSearchItem } = useSearch();
  const { colors, fontSizes, iconSizes } = useTheme();
  const scrollToTopRef = useRef(null);

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);

  return (
    <>
      <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
        <FlatList
          data={searchHistory}
          ref={scrollToTopRef}
          keyExtractor={(item, index) => index + item.text}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => ({
                paddingVertical: 12,
                backgroundColor: pressed ? colors.bgInteractive : colors.bg,
              })}
              onPress={() => {
                setGlobalSearch("");
                navigation.push("SearchResultScreen", { search: item.text });
              }}
              delayLongPress={200}
              onLongPress={() => {
                setRemovingSearchItem(item);
                setIsRemoveSearchItemVisible(true);
              }}
            >
              <View
                style={[
                  styles.screenPadHorizontal,
                  {
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  },
                ]}
              >
                <ClockRotateLeftIcon size={iconSizes.xs} />
                <ThText
                  style={{
                    marginLeft: 32,
                    fontWeight: "medium",
                    flexShrink: 1,
                  }}
                >
                  {item.text}
                </ThText>
                <SearchHistoryThumbnailImage
                  style={{ marginLeft: "auto" }}
                  source={{ uri: item.picture }}
                />
                <ArrowUpLeftIcon
                  style={{ marginLeft: 12 }}
                  onPress={() => {
                    setGlobalSearch(item.text);
                  }}
                />
              </View>
            </Pressable>
          )}
          ListFooterComponent={
            searchHistory.length > 0 ? (
              <Pressable
                style={({ pressed }) => ({
                  marginBottom: insets.bottom + 8,
                  opacity: pressed ? 0.4 : 1,
                })}
                onPress={() => setIsClearSearchHistoryVisible(true)}
              >
                <ThText
                  style={{
                    fontSize: fontSizes.sm,
                    color: colors.textSecondary,
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
