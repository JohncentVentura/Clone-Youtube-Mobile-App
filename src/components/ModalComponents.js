import Modal from "react-native-modal";
import { ThIcon, ThPressable, ThText, ThView } from "./ThemedComponents";
import { icons } from "../styles/icons";
import { useTheme } from "../styles/ThemeContext";

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
          borderRadius: 12,
          width: "100%",
          backgroundColor: colors.bg,
        }}
      >
        {/*Swipe Bar*/}
        <ThView
          style={{
            marginVertical: 8,
            borderRadius: 12,
            width: 42,
            height: 4,
            backgroundColor: colors.borderMuted,
            alignSelf: "center",
          }}
        ></ThView>
        {children}
      </ThView>
    </Modal>
  );
}

function SwipeDownModalItem({ item, ...rest }) {
  const { colors } = useTheme();

  return (
    <ThPressable
      style={({ pressed }) => ({
        paddingLeft: 20,
        paddingVertical: 10,
        backgroundColor: pressed ? colors.bgMuted : "transparent",
        flexDirection: "row",
        alignItems: "center",
      })}
      {...rest}
    >
      <ThIcon IconComponent={item.iconComponent} name={item.iconName} />
      <ThText style={{ marginLeft: 28, flexShrink: 1 }}>
        {item.modalItemName}
      </ThText>
    </ThPressable>
  );
}

function QuestionModal({ visible, setVisible, children }) {
  const { colors } = useTheme();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)} //Modal backdrop area
      onRequestClose={() => setVisible(false)} //Android back button
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThView
        style={{
          padding: 24,
          width: "80%",
          backgroundColor: colors.bg,
        }}
      >
        {children}
      </ThView>
    </Modal>
  );
}

export function FlatListVideoItemModal({ visible, setVisible }) {
  const modalItems = [
    {
      iconComponent: icons.playNextInQueue.iconComponent,
      iconName: icons.playNextInQueue.iconName,
      modalItemName: "Play Next In Queue",
    },
    {
      iconComponent: icons.saveToWatchLater.iconComponent,
      iconName: icons.saveToWatchLater.iconName,
      modalItemName: "Save to Watch later",
    },
    {
      iconComponent: icons.save.iconComponent,
      iconName: icons.save.iconName,
      modalItemName: "Save to playlist",
    },
    {
      iconComponent: icons.share.iconComponent,
      iconName: icons.share.iconName,
      modalItemName: "Share",
    },
    {
      iconComponent: icons.notInterested.iconComponent,
      iconName: icons.notInterested.iconName,
      modalItemName: "Not Interested",
    },
    {
      iconComponent: icons.dontRecommendChannel.iconComponent,
      iconName: icons.dontRecommendChannel.iconName,
      modalItemName: "Don't recommend channel",
    },
    {
      iconComponent: icons.report.iconComponent,
      iconName: icons.report.iconName,
      modalItemName: "Report",
    },
  ];

  return (
    <SwipeDownModal visible={visible} setVisible={setVisible}>
      {modalItems.map((item) => {
        return (
          <SwipeDownModalItem
            key={item.modalItemName}
            item={item}
            onPress={() => console.log(item.modalItemName + " pressed")}
          />
        );
      })}
    </SwipeDownModal>
  );
}

export function ScreenShareModal({ visible, setVisible }) {
  const { fontSizes } = useTheme();

  const modalItems = [
    {
      iconComponent: icons.screenShare.iconComponent,
      iconName: icons.screenShare.iconName,
      modalItemName: "Link with TV code",
    },
    {
      iconComponent: icons.information.iconComponent,
      iconName: icons.information.iconName,
      modalItemName: "Learn More",
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
          <SwipeDownModalItem
            key={item.modalItemName}
            item={item}
            onPress={() => console.log(item.modalItemName + " pressed")}
          />
        );
      })}
    </SwipeDownModal>
  );
}

export function NotificationsScreenDotVerticalModal({ visible, setVisible }) {
  const modalItems = [
    {
      iconComponent: icons.saveToWatchLater.iconComponent,
      iconName: icons.saveToWatchLater.iconName,
      modalItemName: "Save to Watch later",
    },
    {
      iconComponent: icons.eyeInvisble.iconComponent,
      iconName: icons.eyeInvisble.iconName,
      modalItemName: "Hide this notification",
    },
    {
      iconComponent: icons.notificationsOff.iconComponent,
      iconName: icons.notificationsOff.iconName,
      modalItemName: "Turn off all from this channel",
    },
    {
      iconComponent: icons.notificationsOff.iconComponent,
      iconName: icons.notificationsOff.iconName,
      modalItemName: "Turn off all recommendation notifications",
    },
  ];

  return (
    <SwipeDownModal visible={visible} setVisible={setVisible}>
      {modalItems.map((item) => {
        return (
          <SwipeDownModalItem
            key={item.modalItemName}
            item={item}
            onPress={() => console.log(item.modalItemName + " pressed")}
          />
        );
      })}
    </SwipeDownModal>
  );
}

export function RemoveSearchHistoryModal({
  visible,
  setVisible,
  removingItem,
  removeSearchHistoryItem,
}) {
  const { colors, fontSizes } = useTheme();

  if (!removingItem) return null;

  return (
    <QuestionModal visible={visible} setVisible={setVisible}>
      <ThText
        style={{ marginBottom: 4, fontSize: fontSizes.xl, fontWeight: "bold" }}
      >
        {removingItem.text}
      </ThText>
      <ThText style={{ marginBottom: 40 }}>Remove from search history?</ThText>
      <ThView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ThPressable onPress={() => setVisible(false)}>
          <ThText style={{ color: colors.primary }}>Cancel</ThText>
        </ThPressable>
        <ThPressable
          style={{ marginLeft: 20, color: colors.primary }}
          onPress={() => {
            removeSearchHistoryItem(removingItem.text);
            setVisible(false);
          }}
        >
          <ThText style={{ marginLeft: 12, color: colors.primary }}>
            Remove
          </ThText>
        </ThPressable>
      </ThView>
    </QuestionModal>
  );
}

export function ClearSearchHistoryModal({
  visible,
  setVisible,
  clearSearchHistory,
}) {
  const { colors, fontSizes } = useTheme();

  return (
    <QuestionModal visible={visible} setVisible={setVisible}>
      <ThText
        style={{ marginBottom: 40, fontSize: fontSizes.xl, fontWeight: "bold" }}
      >
        Clear History?
      </ThText>
      <ThView
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ThPressable onPress={() => setVisible(false)}>
          <ThText style={{ color: colors.primary }}>Cancel</ThText>
        </ThPressable>
        <ThPressable
          style={{ marginLeft: 20, color: colors.primary }}
          onPress={() => {
            clearSearchHistory();
            setVisible(false);
          }}
        >
          <ThText style={{ marginLeft: 12, color: colors.primary }}>
            Clear
          </ThText>
        </ThPressable>
      </ThView>
    </QuestionModal>
  );
}
