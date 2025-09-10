import {
  ThemedView,
  ThemedFlatList,
  ThemedText,
  ThemedTouchableOpacity,
  ThemedIcon,
} from "../components/ThemedComponents";
import { PexelsVideoView } from "../components/VideoComponents";
import { HomeChannelImage } from "../components/ImageComponents";
import { Button } from "react-native";
import { PexelsAPIFlatList } from "./HomeScreen";

export default function HomeVideoScreen({ navigation, route }) {
  const { video } = route.params;

  return (
    <ThemedView>
      <PexelsVideoView video={video} />
      <ThemedView>
        <ThemedText>Video Title</ThemedText>
        <ThemedView style={{ flexDirection: "row" }}>
          <ThemedText>{video.id} views * 1y ago * ...more (Link)</ThemedText>
        </ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <HomeChannelImage source={{ uri: video.video_pictures[0].picture }} />
          <ThemedText>Channel Name {video.id} Subsribers</ThemedText>
          <Button title="Subscribe" />
        </ThemedView>
        <ThemedView style={{ flexDirection: "row" }}>
          <Button title="Like | Dislike" />
          <Button title="Share" />
          <Button title="Remix" />
          <Button title="Download" />
        </ThemedView>
        <ThemedView>
          <ThemedText>Comments 5.1k</ThemedText>
          <ThemedView style={{ flexDirection: "row" }}>
            <HomeChannelImage
              source={{ uri: video.video_pictures[0].picture }}
            />
            <ThemedText>{video.video_pictures[0].picture}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      {/* TODO: Create a component that returns PexelsAPIFlatList  */}
      <PexelsAPIFlatList/>
    </ThemedView>
  );
}
