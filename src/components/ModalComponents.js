import { ThIcon, ThPressable, ThText, ThView } from "./ThemedComponents";
import Modal from "react-native-modal";
import { styles } from "../styles/styles";
import { icons } from "../styles/icons";
import { useTheme } from "../styles/ThemeContext";

export function FlatListVideoItemModal({ style, visible, setVisible }) {
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
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)} //Modal backdrop area
      onRequestClose={() => setVisible(false)} //Android back button
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="down"
      onSwipeComplete={() => setVisible(false)}
      backdropTransitionOutTiming={0}
      style={[
        {
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        },
        style,
      ]}
    >
      <ThView
        style={{
          paddingTop: 18,
          borderRadius: 12,
          width: "100%",
          backgroundColor: colors.bg,
        }}
      >
        <ThView
          style={{
            marginBottom: 8,
            backgroundColor: colors.textGray,
            width: "20%",
            height: 2,
            alignSelf: "center",
          }}
        ></ThView>
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
              onPress={() => console.log(item.label + " pressed")}
            >
              <ThIcon IconComponent={item.iconComponent} name={item.iconName} />
              <ThText style={{ marginLeft: 28 }}>{item.modalName}</ThText>
            </ThPressable>
          );
        })}
      </ThView>
    </Modal>
  );
}
