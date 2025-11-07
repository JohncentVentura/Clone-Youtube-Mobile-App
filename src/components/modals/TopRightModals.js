import { View } from "react-native";
import Modal from "react-native-modal";
import { useThemeContext } from "../../context/ThemeContext";
import { BasePressable } from "../PressableComponents";
import { BaseText } from "../TextComponents";

function TopRightListModal({ isVisible, setIsVisible, items = [] }) {
  const { ctxColors } = useThemeContext();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)} //Modal backdrop area
      onRequestClose={() => setIsVisible(false)} //Android back button
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      style={{
        margin: 10,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
      }}
    >
      <View style={{ backgroundColor: ctxColors.bg }}>
        {items.map((item, index) => {
          return (
            <BasePressable
              key={index + item.name}
              onPress={item.onPress}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <BaseText style={{ flexShrink: 1 }}>{item.name}</BaseText>
            </BasePressable>
          );
        })}
      </View>
    </Modal>
  );
}

export function ChannelHeaderModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Share",
      onPress: () => console.log("Share pressed"),
    },
    {
      name: "Report user",
      onPress: () => console.log("Report user pressed"),
    },
    {
      name: "Settings",
      onPress: () => console.log("Settings pressed"),
    },
    {
      name: "Watch on TV",
      onPress: () => console.log("Watch on TV pressed"),
    },
    {
      name: "Terms & privacy policy",
      onPress: () => console.log("Terms & privacy policy pressed"),
    },
    {
      name: "Help & feedback",
      onPress: () => console.log("Help & feedback pressed"),
    },
  ];

  return (
    <TopRightListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function NotificationsHeaderModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Settings",
      onPress: () => console.log("Settings pressed"),
    },
    {
      name: "Watch on TV",
      onPress: () => console.log("Watch on TV pressed"),
    },
    {
      name: "Terms & privacy policy",
      onPress: () => console.log("Terms & privacy policy pressed"),
    },
    {
      name: "Help & feedback",
      onPress: () => console.log("Help & feedback pressed"),
    },
  ];

  return (
    <TopRightListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}

export function SearchResultHeaderModal({ isVisible, setIsVisible }) {
  const modalItems = [
    {
      name: "Search filters",
      onPress: () => console.log("Search filters pressed"),
    },
    {
      name: "Help & feedback",
      onPress: () => console.log("Help & feedback pressed"),
    },
  ];

  return (
    <TopRightListModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={modalItems}
    />
  );
}
