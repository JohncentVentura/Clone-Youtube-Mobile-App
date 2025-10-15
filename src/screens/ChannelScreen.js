import { Pressable, View } from "react-native";
import {
  ChannelCoverImage,
  ChannelProfileImage,
} from "../components/ImageComponents";
import { ThText } from "../components/ThemedComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function ChannelScreen({ route }) {
  const { colors, fontSizes } = useTheme();
  const { videoData } = route.params;

  return (
    <View
      style={[
        styles.screenContainer,
        styles.screenPadHorizontal,
        { backgroundColor: colors.bg },
      ]}
    >
      <ChannelCoverImage source={{ uri: videoData.picture }} />
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable>
          <ChannelProfileImage
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            source={{ uri: videoData.picture }}
            onPress={() => {
              console.log("ChannelScreenProfileImage pressed");
            }}
          />
        </Pressable>
        <View style={{ flex: 4, marginLeft: 8 }}>
          <ThText
            style={{
              fontSize: fontSizes.xl2,
              fontWeight: "bold",
            }}
          >
            {videoData.channelName}
          </ThText>
          <ThText
            style={{
              marginTop: 4,
              fontSize: fontSizes.xs,
              fontWeight: "medium",
            }}
          >
            {videoData.channelTag}
          </ThText>
          <ThText
            style={{
              marginTop: 4,
              fontSize: fontSizes.xs,
              color: colors.textSecondary,
            }}
          >
            {videoData.channelSubscribers} subscribers •{" "}
            {videoData.channelVideos} videos
          </ThText>
        </View>
      </View>
      <ThText
        style={{
          marginTop: 12,
          fontSize: fontSizes.xs,
          color: colors.textSecondary,
        }}
      >
        {videoData.channelDescription}
        {videoData.channelDescription}
        {videoData.channelDescription}
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
        style={[
          styles.wideButton,
          { marginTop: 12, backgroundColor: colors.bgContrast },
        ]}
        onPress={() => console.log("Subscribe pressed")}
      >
        <ThText style={{ fontWeight: "medium", color: colors.textContrast }}>
          Subscribe
        </ThText>
      </Pressable>
    </View>
  );
}
