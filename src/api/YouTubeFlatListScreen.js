
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { autoFetchYoutubeData } from "./youtubeAPI";

export default function YouTubeFlatListScreen({ navigation }) {
  const { videos, loading, error } = autoFetchYoutubeData("news");

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  console.log("videos:", videos);

  return (
    <FlatList
      data={videos}
      keyExtractor={(item, index) =>
        item.id?.videoId ?? item.id?.channelId ?? index.toString()
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id?.videoId ?? item.id?.channelId ?? index}
          onPress={() =>
            navigation.navigate("YouTubePlayerScreen", {
              videoId: item.id.videoId,
            })
          }
        >
          <Text>{item.snippet.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
