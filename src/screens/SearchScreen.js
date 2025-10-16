import { useRef } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenContainer } from "../components/ContainerComponents";
import {
  ArrowUpLeftIcon,
  ClockRotateLeftIcon,
} from "../components/IconComponents";
import { SearchHistoryThumbnailImage } from "../components/ImageComponents";
import { BaseText } from "../components/TextComponents";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setIsClearSearchHistoryVisible, setIsRemoveSearchItemVisible } =
    useUI();
  const { setGlobalSearch, searchHistory, setRemovingSearchItem } = useSearch();
  const { colors, fontSizes, iconSizes } = useTheme();
  const scrollToTopRef = useRef(null);

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);

  return (
    <ScreenContainer>
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
            delayLongPress={300}
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
              <ClockRotateLeftIcon
                style={{ marginLeft: 4 }}
                size={iconSizes.xs}
              />
              <BaseText
                style={{
                  marginLeft: 32,
                  fontWeight: "medium",
                  flexShrink: 1,
                }}
              >
                {item.text}
              </BaseText>
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
              <BaseText
                style={{
                  fontSize: fontSizes.sm,
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                Clear History
              </BaseText>
            </Pressable>
          ) : null
        }
      />
    </ScreenContainer>
  );
}
