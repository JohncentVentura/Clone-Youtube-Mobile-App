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
import { BasePressable } from "../components/PressableComponents";
import { useSearchContext } from "../context/SearchContext";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { useHideBottomTabBarOnFocus } from "../hooks/useHideBottomTabBarOnFocus";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const {
    ctxSetSearchInput,
    ctxSearchHistory,
    ctxIsSearchHistoryLoading,
    ctxSetRemoveSearchText,
  } = useSearchContext();
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const { ctxSetClearSearchHistoryModal, ctxSetRemoveSearchItemModal } =
    useUIContext();
  const scrollToTopRef = useRef(null);

  useHideBottomTabBarOnFocus();
  useScrollToTopOnFocus(scrollToTopRef);

  return (
    <ScreenContainer isLoading={ctxIsSearchHistoryLoading}>
      <FlatList
        data={ctxSearchHistory}
        ref={scrollToTopRef}
        keyExtractor={(item, index) => index + item.text}
        renderItem={({ item }) => (
          <BasePressable
            style={{ paddingVertical: 12 }}
            onPress={() => {
              ctxSetSearchInput("");
              navigation.push("SearchResultScreen", { search: item.text });
            }}
            delayLongPress={300}
            onLongPress={() => {
              ctxSetRemoveSearchText(item.text);
              ctxSetRemoveSearchItemModal(true);
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
                size={ctxIconSizes.xs}
              />
              <BaseText
                style={{
                  marginLeft: 30,
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
                  ctxSetSearchInput(item.text);
                }}
              />
            </View>
          </BasePressable>
        )}
        ListFooterComponent={
          ctxSearchHistory.length > 0 ? (
            <Pressable
              style={({ pressed }) => ({
                marginBottom: insets.bottom + 8,
                opacity: pressed ? 0.5 : 1,
              })}
              onPress={() => ctxSetClearSearchHistoryModal(true)}
            >
              <BaseText
                style={{
                  fontSize: ctxFontSizes.sm,
                  color: ctxColors.textSecondary,
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
