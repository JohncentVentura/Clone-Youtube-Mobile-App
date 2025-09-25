import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { fetchPexelsData } from "../api/pexelsAPI";
import {
  MainVideoScreenChannelImage,
  MainVideoScreenCommentImage,
} from "../components/ImageComponents";
import {
  ThButton,
  ThFlatList,
  ThIcon,
  ThIconTextButton,
  ThPressable,
  ThRowScrollView,
  ThText,
  ThView,
  ThWideTextButton,
} from "../components/ThemedComponents";
import {
  FlatListVideoItem,
  MainVideoView,
} from "../components/VideoComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

import {
  ChannelScreenCoverImage,
  ChannelScreenProfileImage,
} from "../components/ImageComponents";
import { urlToTitleExtractor, hideMainHeader } from "../utils/utils";
import { VideoView } from "expo-video";

import { Modal, View, Text, Button, StyleSheet } from "react-native";

export default function ChannelScreen({ navigation, route }) {
  const { colors, fontSizes } = useTheme();
  const { video, query } = route.params;
  hideMainHeader(navigation);

  const [visible, setVisible] = useState(false);

  return (
    <ThView style={styles.screenContainer}>
      <ThView style={styles.paddedHorizontalContainer}>
        <ChannelScreenCoverImage
          style={{ marginBottom: 16 }}
          source={{ uri: video.video_pictures[0].picture }}
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
            <ChannelScreenProfileImage
              source={{ uri: video.video_pictures[0].picture }}
            />
          </ThPressable>
          <ThView style={{ flex: 4, marginLeft: 8, marginBottom: 6 }}>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.xl2,
                fontWeight: "bold",
              }}
            >
              {urlToTitleExtractor(video.url)}
              {/*placeholder for channel name*/}
            </ThText>
            <ThText
              style={{
                marginBottom: 4,
                fontSize: fontSizes.xs,
                fontWeight: "medium",
              }}
            >
              @{urlToTitleExtractor(video.url)}
            </ThText>
            <ThText
              style={{
                color: colors.textGray,
                fontSize: fontSizes.xs,
              }}
            >
              {video.video_pictures[0].id} subscribers • {video.duration} videos
              {/*placeholder for subscribers and video counts*/}
            </ThText>
          </ThView>
        </ThView>
        <ThText
          style={{
            marginBottom: 12,
            color: colors.textGray,
            fontSize: fontSizes.xs,
          }}
        >
          {urlToTitleExtractor(video.url)}
          {urlToTitleExtractor(video.url)}
          {urlToTitleExtractor(video.url)}
          {/*placeholder for comment */}
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
        <ThWideTextButton>Subscribe</ThWideTextButton>
      </ThView>

      {/* Testing Generic Modal */}
      <View style={styles2.container}>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
        <Modal
          animationType="slide" // 'slide' | 'fade' | 'none'
          transparent={true} // background see-through
          visible={visible} // show/hide
          onRequestClose={() => setVisible(false)} // Android back button
        >
          <View style={styles2.modalBackground}>
            <View style={styles2.modalContent}>
              <Text>This is a modal!</Text>
              <Button title="Close" onPress={() => setVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ThView>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
