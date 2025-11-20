import { useRef, useState } from "react";
import { View } from "react-native";
import { ScreenScrollView } from "../components/ContainerComponents";
import { DotVerticalIcon } from "../components/IconComponents";
import {
  NotifThumbnailImage,
  NotifProfileImage,
} from "../components/ImageComponents";
import { BasePressable, RippleFXPressable } from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { useSetVideoData } from "../hooks/useSetVideoData";
import { useScrollToTopOnFocus } from "../hooks/useScrollToTopOnFocus";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

export default function NotificationsScreen({ navigation }) {
  const { ctxSetNotifItemModal } = useUIContext();
  const { ctxColors, ctxFontSizes } = useThemeContext();
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
            fontSize: ctxFontSizes.sm,
            color: ctxColors.textSecondary,
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
          setVisible={ctxSetNotifItemModal}
        />
      ))}
      <BaseText
        style={[
          styles.screenPadLeft,
          {
            marginVertical: 6,
            fontSize: ctxFontSizes.sm,
            color: ctxColors.textSecondary,
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
          setVisible={ctxSetNotifItemModal}
        />
      ))}
    </ScreenScrollView>
  );
}

function NotificationItem({ navigation, query, videoData, setVisible }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();

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
            navigation.navigate(navPaths.channelScreen, {
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
          <BaseText style={{ fontSize: ctxFontSizes.sm, fontWeight: "bold" }}>
            {videoData.channelName}
          </BaseText>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>
            {videoData.description}
          </BaseText>
          <BaseText
            style={{ fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary }}
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

        <RippleFXPressable
          style={{ marginLeft: 4 }}
          rippleSize={2}
          onPress={() => {
            setVisible(true);
          }}
        >
          <DotVerticalIcon size={ctxIconSizes.sm} />
        </RippleFXPressable>
      </View>
    </BasePressable>
  );
}
