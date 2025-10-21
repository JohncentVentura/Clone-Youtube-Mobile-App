import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useSearch } from "../../context/SearchContext";
import { useTheme } from "../../context/ThemeContext";
import { BaseText } from "../TextComponents";

function QuestionModal({ showModal, setShowModal, children }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)} //Modal backdrop area
      onRequestClose={() => setShowModal(false)} //Android back button
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
          backgroundColor: colors.bg,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}

export function RemoveSearchItemModal({ showModal, setShowModal }) {
  const { colors, fontSizes } = useTheme();
  const { removingSearchItem, setRemovingSearchItem, removeSearchHistoryItem } =
    useSearch();

  return (
    <QuestionModal showModal={showModal} setShowModal={setShowModal}>
      <BaseText
        style={{
          fontSize: fontSizes.xl,
          fontWeight: "medium",
        }}
      >
        {removingSearchItem.text}
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
        <Pressable onPress={() => setShowModal(false)}>
          <BaseText style={{ color: colors.primary }}>Cancel</BaseText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            removeSearchHistoryItem(removingSearchItem.text);
            setRemovingSearchItem("");
            setShowModal(false);
          }}
        >
          <BaseText style={{ color: colors.primary }}>Remove</BaseText>
        </Pressable>
      </View>
    </QuestionModal>
  );
}

export function ClearSearchHistoryModal({ showModal, setShowModal }) {
  const { colors } = useTheme();
  const { clearSearchHistory } = useSearch();

  return (
    <QuestionModal showModal={showModal} setShowModal={setShowModal}>
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
        <Pressable onPress={() => setShowModal(false)}>
          <BaseText style={{ color: colors.primary }}>Cancel</BaseText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            clearSearchHistory();
            setShowModal(false);
          }}
        >
          <BaseText style={{ color: colors.primary }}>Clear</BaseText>
        </Pressable>
      </View>
    </QuestionModal>
  );
}
