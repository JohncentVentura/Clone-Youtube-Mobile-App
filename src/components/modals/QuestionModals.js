import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useSearchContext } from "../../context/SearchContext";
import { useThemeContext } from "../../context/ThemeContext";
import { BaseText } from "../TextComponents";

function QuestionModal({ isVisible, setIsVisible, children }) {
  const { ctxColors } = useThemeContext();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsVisible(false)} //Android back button
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 24,
          width: "80%",
          backgroundColor: ctxColors.bg,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}

export function RemoveSearchItemModal({ isVisible, setIsVisible }) {
  const { ctxColors, ctxFontSizes } = useThemeContext();
  const { ctxRemoveSearchText, ctxSetRemoveSearchText, ctxRemoveSearch } =
    useSearchContext();

  return (
    <QuestionModal isVisible={isVisible} setIsVisible={setIsVisible}>
      <BaseText
        style={{
          fontSize: ctxFontSizes.xl,
          fontWeight: "medium",
        }}
      >
        {ctxRemoveSearchText}
      </BaseText>
      <BaseText style={{ marginTop: 6 }}>Remove from search history?</BaseText>
      <View
        style={{
          marginTop: 48,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setIsVisible(false)}>
          <BaseText style={{ color: ctxColors.primary }}>Cancel</BaseText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            ctxRemoveSearch(ctxRemoveSearchText);
            ctxSetRemoveSearchText("");
            setIsVisible(false);
          }}
        >
          <BaseText style={{ color: ctxColors.primary }}>Remove</BaseText>
        </Pressable>
      </View>
    </QuestionModal>
  );
}

export function ClearSearchHistoryModal({ isVisible, setIsVisible }) {
  const { ctxColors } = useThemeContext();
  const { ctxClearSearchHistory } = useSearchContext();

  return (
    <QuestionModal isVisible={isVisible} setIsVisible={setIsVisible}>
      <BaseText style={{ fontWeight: "medium" }}>
        Clear all search history?
      </BaseText>
      <View
        style={{
          marginTop: 48,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => setIsVisible(false)}>
          <BaseText style={{ color: ctxColors.primary }}>Cancel</BaseText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            ctxClearSearchHistory();
            setIsVisible(false);
          }}
        >
          <BaseText style={{ color: ctxColors.primary }}>Clear</BaseText>
        </Pressable>
      </View>
    </QuestionModal>
  );
}
