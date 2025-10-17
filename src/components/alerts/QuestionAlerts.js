import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useSearch } from "../../context/SearchContext";
import { useTheme } from "../../context/ThemeContext";
import { BaseText } from "../TextComponents";

function QuestionAlert({ showAlert, setShowAlert, children }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={showAlert}
      onBackdropPress={() => setShowAlert(false)} //Modal backdrop area
      onRequestClose={() => setShowAlert(false)} //Android back button
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

export function RemoveSearchItemAlert({ showAlert, setShowAlert }) {
  const { colors, fontSizes } = useTheme();
  const { removingSearchItem, setRemovingSearchItem, removeSearchHistoryItem } =
    useSearch();

  return (
    <QuestionAlert showAlert={showAlert} setShowAlert={setShowAlert}>
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
        <Pressable onPress={() => setShowAlert(false)}>
          <BaseText style={{ color: colors.primary }}>Cancel</BaseText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            removeSearchHistoryItem(removingSearchItem.text);
            setRemovingSearchItem("");
            setShowAlert(false);
          }}
        >
          <BaseText style={{ color: colors.primary }}>Remove</BaseText>
        </Pressable>
      </View>
    </QuestionAlert>
  );
}

export function ClearSearchHistoryAlert({ showAlert, setShowAlert }) {
  const { colors } = useTheme();
  const { clearSearchHistory } = useSearch();

  return (
    <QuestionAlert showAlert={showAlert} setShowAlert={setShowAlert}>
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
        <Pressable onPress={() => setShowAlert(false)}>
          <BaseText style={{ color: colors.primary }}>Cancel</BaseText>
        </Pressable>
        <Pressable
          style={{ marginLeft: 48 }}
          onPress={() => {
            clearSearchHistory();
            setShowAlert(false);
          }}
        >
          <BaseText style={{ color: colors.primary }}>Clear</BaseText>
        </Pressable>
      </View>
    </QuestionAlert>
  );
}
