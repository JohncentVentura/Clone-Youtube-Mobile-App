import Modal from "react-native-modal";
import { ThIcon, ThPressable, ThText, ThView } from "./ThemedComponents";
import { icons } from "../styles/icons";
import { useTheme } from "../styles/ThemeContext";
import { fontSizes } from "../styles/theme";

function SwipeDownModal({ visible, setVisible, children }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)} //Modal backdrop area
      onRequestClose={() => setVisible(false)} //Android back button
      onSwipeComplete={() => setVisible(false)} //When swiped down
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <ThView
        style={{
          paddingTop: 8,
          borderRadius: 12,
          width: "100%",
          backgroundColor: colors.bg,
        }}
      >
        {/*Swipe Bar*/}
        <ThView
          style={{
            marginBottom: 4,
            borderRadius: 12,
            width: 42,
            height: 4,
            backgroundColor: colors.borderGray,
            alignSelf: "center",
          }}
        ></ThView>
        {children}
      </ThView>
    </Modal>
  );
}

export function FlatListVideoItemModal({ visible, setVisible }) {
  const { colors } = useTheme();

  const modalItems = [
    {
      iconComponent: icons.playNextInQueue.iconComponent,
      iconName: icons.playNextInQueue.iconName,
      modalName: "Play Next In Queue",
    },
    {
      iconComponent: icons.saveToWatchLater.iconComponent,
      iconName: icons.saveToWatchLater.iconName,
      modalName: "Save to Watch later",
    },
    {
      iconComponent: icons.save.iconComponent,
      iconName: icons.save.iconName,
      modalName: "Save to playlist",
    },
    {
      iconComponent: icons.share.iconComponent,
      iconName: icons.share.iconName,
      modalName: "Share",
    },
    {
      iconComponent: icons.notInterested.iconComponent,
      iconName: icons.notInterested.iconName,
      modalName: "Not Interested",
    },
    {
      iconComponent: icons.dontRecommendChannel.iconComponent,
      iconName: icons.dontRecommendChannel.iconName,
      modalName: "Don't recommend channel",
    },
    {
      iconComponent: icons.report.iconComponent,
      iconName: icons.report.iconName,
      modalName: "Report",
    },
  ];

  return (
    <SwipeDownModal visible={visible} setVisible={setVisible}>
      {modalItems.map((item) => {
        return (
          <ThPressable
            key={item.modalName}
            style={({ pressed }) => ({
              paddingLeft: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: pressed ? colors.textGray : "transparent",
            })}
            onPress={() => console.log(item.modalName + " pressed")}
          >
            <ThIcon IconComponent={item.iconComponent} name={item.iconName} />
            <ThText style={{ marginLeft: 28 }}>{item.modalName}</ThText>
          </ThPressable>
        );
      })}
    </SwipeDownModal>
  );
}

export function ScreenShareModal({ visible, setVisible }) {
  const { colors, fontSizes } = useTheme();

  const modalItems = [
    {
      iconComponent: icons.screenShare.iconComponent,
      iconName: icons.screenShare.iconName,
      modalName: "Link with TV code",
    },
    {
      iconComponent: icons.information.iconComponent,
      iconName: icons.information.iconName,
      modalName: "Learn More",
    },
  ];

  return (
    <SwipeDownModal visible={visible} setVisible={setVisible}>
      <ThText
        style={{ marginLeft: 10, paddingBottom: 4, fontSize: fontSizes.sm }}
      >
        Select a device
      </ThText>
      {modalItems.map((item) => {
        return (
          <ThPressable
            key={item.modalName}
            style={({ pressed }) => ({
              paddingLeft: 20,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: pressed ? colors.textGray : "transparent",
            })}
            onPress={() => console.log(item.modalName + " pressed")}
          >
            <ThIcon IconComponent={item.iconComponent} name={item.iconName} />
            <ThText style={{ marginLeft: 28 }}>{item.modalName}</ThText>
          </ThPressable>
        );
      })}
    </SwipeDownModal>
  );
}
