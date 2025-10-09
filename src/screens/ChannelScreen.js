import {
  ChannelScreenCoverImage,
  ChannelScreenProfileImage,
} from "../components/ImageComponents";
import { ThPressable, ThText, ThView } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../context/ThemeContext";

export default function ChannelScreen({ route }) {
  const { colors, fontSizes } = useTheme();
  const { video, query } = route.params;

  return (
    <ThView style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <ThView style={styles.paddedHorizontalContainer}>
        <ChannelScreenCoverImage
          style={{ marginBottom: 16 }}
          source={{ uri: video.picture }}
        />
        <ThView
          style={{
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ThPressable
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            onPress={() => {
              console.log("ChannelScreenProfileImage pressed");
            }}
          >
            <ChannelScreenProfileImage source={{ uri: video.picture }} />
          </ThPressable>
          <ThView style={{ flex: 4, marginLeft: 8, marginBottom: 6 }}>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.xl2,
                fontWeight: "bold",
              }}
            >
              {video.channelName}
            </ThText>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.xs,
                fontWeight: "medium",
              }}
            >
              {video.channelTag}
            </ThText>
            <ThText
              style={{
                color: colors.textSecondary,
                fontSize: fontSizes.xs,
              }}
            >
              {video.channelSubscribers} subscribers • {video.channelVideos}{" "}
              videos
            </ThText>
          </ThView>
        </ThView>
        <ThText
          style={{
            marginBottom: 12,
            color: colors.textSecondary,
            fontSize: fontSizes.xs,
          }}
        >
          {video.channelDescription}
          {video.channelDescription}
          {video.channelDescription}
          <ThText
            style={{
              fontWeight: "medium",
              fontSize: fontSizes.xs,
            }}
            onPress={() => {
              console.log("...more press");
            }}
          >
            ...more
          </ThText>
        </ThText>
        <ThPressable
          style={[styles.wideButton, { backgroundColor: colors.bgContrast }]}
          onPress={() => console.log("Subscribe pressed")}
        >
          <ThText style={{ color: colors.textContrast, fontWeight: "medium" }}>
            Subscribe
          </ThText>
        </ThPressable>
      </ThView>
    </ThView>
  );
}
