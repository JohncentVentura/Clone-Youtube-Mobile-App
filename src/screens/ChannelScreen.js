import { Pressable, View } from "react-native";
import { ScreenContainer } from "../components/ContainerComponents";
import {
  ChannelCoverImage,
  ChannelProfileImage,
} from "../components/ImageComponents";
import { BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";

export default function ChannelScreen({ route }) {
  const { colors, fontSizes } = useTheme();
  const { videoData } = route.params;

  return (
    <ScreenContainer style={styles.screenPadHorizontal}>
      <ChannelCoverImage source={{ uri: videoData.picture }} />
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ChannelProfileImage
          style={{
            height: "100%",
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          source={{ uri: videoData.picture }}
          onPress={() => {
            console.log("ChannelProfileImage pressed");
          }}
        />
        <View style={{ flex: 4, marginLeft: 8 }}>
          <BaseText
            style={{
              fontSize: fontSizes.xl2,
              fontWeight: "bold",
            }}
          >
            {videoData.channelName}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: fontSizes.xs,
              fontWeight: "medium",
            }}
          >
            {videoData.channelTag}
          </BaseText>
          <BaseText
            style={{
              marginTop: 4,
              fontSize: fontSizes.xs,
              color: colors.textSecondary,
            }}
          >
            {videoData.channelSubscribers} subscribers •{" "}
            {videoData.channelVideos} videos
          </BaseText>
        </View>
      </View>
      <BaseText
        style={{
          marginTop: 12,
          fontSize: fontSizes.xs,
          color: colors.textSecondary,
        }}
      >
        {videoData.channelDescription}
        {videoData.channelDescription}
        {videoData.channelDescription}
        <BaseText
          style={{
            fontWeight: "medium",
            fontSize: fontSizes.xs,
          }}
          onPress={() => {
            console.log("...more press");
          }}
        >
          ...more
        </BaseText>
      </BaseText>
      <Pressable
        style={({ pressed }) => [
          styles.wideButton,
          {
            marginTop: 12,
            backgroundColor: colors.bgContrast,
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={() => console.log("Subscribe pressed")}
      >
        <BaseText style={{ fontWeight: "medium", color: colors.textContrast }}>
          Subscribe
        </BaseText>
      </Pressable>
    </ScreenContainer>
  );
}
