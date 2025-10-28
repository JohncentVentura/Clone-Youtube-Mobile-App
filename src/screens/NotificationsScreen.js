import { useRef, useState } from "react";
import { View } from "react-native";
import { ScreenScrollView } from "../components/ContainerComponents";
import { DotVerticalIcon } from "../components/IconComponents";
import {
  NotifThumbnailImage,
  NotifProfileImage,
} from "../components/ImageComponents";
import { BasePressable, RippleButton } from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";

export default function NotificationsScreen({ navigation }) {
  const { setShowNotifItemModal } = useUI();
  const { colors, fontSizes } = useTheme();
  const scrollToTopRef = useRef(null);
  const [newQuery, setNewQuery] = useState("food");
  const [newVideos, setNewVideos] = useState([]);
  const [oldQuery, setOldQuery] = useState("sweets");
  const [oldVideos, setOldVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: newQuery,
    queryResults: 4,
    setVideos: setNewVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: oldQuery,
    queryResults: 4,
    setVideos: setOldVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView ref={scrollToTopRef} isLoading={isLoading}>
      <BaseText
        style={[
          styles.screenPadLeft,
          {
            marginBottom: 6,
            fontSize: fontSizes.sm,
            color: colors.textSecondary,
          },
        ]}
      >
        New
      </BaseText>
      {newVideos.map((item) => (
        <NotificationItem
          key={item.id}
          navigation={navigation}
          query={newQuery}
          videoData={item}
          setVisible={setShowNotifItemModal}
        />
      ))}
      <BaseText
        style={[
          styles.screenPadLeft,
          {
            marginVertical: 6,
            fontSize: fontSizes.sm,
            color: colors.textSecondary,
          },
        ]}
      >
        Old
      </BaseText>
      {oldVideos.map((item) => (
        <NotificationItem
          key={item.id}
          navigation={navigation}
          query={oldQuery}
          videoData={item}
          setVisible={setShowNotifItemModal}
        />
      ))}
    </ScreenScrollView>
  );
}

function NotificationItem({ navigation, query, videoData, setVisible }) {
  const { colors, fontSizes, iconSizes } = useTheme();

  return (
    <BasePressable
      style={{ paddingVertical: 10 }}
      onPress={() => {
        navigation.push("MainVideoScreen", {
          query: query,
          videoData: videoData,
        });
      }}
    >
      <View
        style={[
          styles.screenPadHorizontal,
          {
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
          },
        ]}
      >
        <NotifProfileImage
          style={{
            marginLeft: 4,
          }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            navigation.navigate("ChannelScreen", {
              videoData: videoData,
              query: query,
            });
          }}
        />

        <View
          style={{
            marginLeft: 16,
            flexShrink: 1,
          }}
        >
          <BaseText style={{ fontSize: fontSizes.sm, fontWeight: "bold" }}>
            {videoData.channelName}
          </BaseText>
          <BaseText style={{ fontSize: fontSizes.sm }}>
            {videoData.description}
          </BaseText>
          <BaseText
            style={{ fontSize: fontSizes.xs, color: colors.textSecondary }}
          >
            {videoData.uploadedDate}
          </BaseText>
        </View>

        <NotifThumbnailImage
          style={{ marginLeft: 12 }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            navigation.push("MainVideoScreen", {
              query: query,
              videoData: videoData,
            });
          }}
        />

        <RippleButton
          style={{ marginLeft: 4 }}
          rippleSize={2}
          onPress={() => {
            setVisible(true);
          }}
        >
          <DotVerticalIcon size={iconSizes.sm} />
        </RippleButton>
      </View>
    </BasePressable>
  );
}
