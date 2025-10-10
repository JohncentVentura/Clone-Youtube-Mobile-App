import { Pressable, View } from "react-native";
import {
  ChannelScreenCoverImage,
  ChannelScreenProfileImage,
} from "../components/ImageComponents";
import { ThText } from "../components/ThemedComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function ChannelScreen({ route }) {
  const { colors, fontSizes } = useTheme();
  const { video, query } = route.params;

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.bg }]}>
      <View style={styles.paddedHorizontalContainer}>
        <ChannelScreenCoverImage
          style={{ marginBottom: 16 }}
          source={{ uri: video.picture }}
        />
        <View
          style={{
            marginBottom: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
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
          </Pressable>
          <View style={{ flex: 4, marginLeft: 8, marginBottom: 6 }}>
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
          </View>
        </View>
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
        <Pressable
          style={[styles.wideButton, { backgroundColor: colors.bgContrast }]}
          onPress={() => console.log("Subscribe pressed")}
        >
          <ThText style={{ color: colors.textContrast, fontWeight: "medium" }}>
            Subscribe
          </ThText>
        </Pressable>
      </View>
    </View>
  );
}
