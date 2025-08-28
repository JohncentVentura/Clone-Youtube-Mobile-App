import { Text, View, FlatList, ScrollView } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../styles/styles";
import { ThemedText, ThemedView } from "../components/ThemedComponents";
import { useThemeColor } from "../hooks/useThemeColor";
import {
  HomeVideoImage,
  HomeChannelImage,
} from "../components/ImageComponents";
import { AutoPlayVideo } from "../components/VideoComponents";

const videos = [
  {
    id: "1",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "2",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "4",
    source: "https://www.pexels.com/download/video/3843091/",
    thumbnail:
      "https://images.pexels.com/videos/3843091/clouds-country-hiking-mountain-3843091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.homeScreenContainer}>
      {videos.map((video) => (
        <ThemedView style={styles.homeScreenVideoContainer} key={video.id}>
          <AutoPlayVideo source={video.source} thumbnail={video.thumbnail} />
          <ThemedView style={styles.homeScreenVideoInfoContainer}>
            <HomeChannelImage
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIDlX73Bezvep3MYr26IQSFBElpVGpNW0QAS6nsZdgpffU-ptjpyjccu-PUz6J2E3J_Y&usqp=CAU",
              }}
              style={{ flex: 2 }}
            />
            <ThemedView style={{ flex: 10 }}>
              <ThemedText type="title">Video Title</ThemedText>
              <ThemedText type="small">
                Channel Name * Views Count * Uploaded Date
              </ThemedText>
            </ThemedView>
            <ThemedView style={{ flex: 1 }}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color={useThemeColor({}, "text")}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      ))}
    </ScrollView>
  );
}
