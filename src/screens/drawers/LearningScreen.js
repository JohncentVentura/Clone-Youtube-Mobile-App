import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  MusicTrackCard,
  VideoHorizontalPreviewCard,
  VideoVerticalPreviewCard,
} from "../../components/CardsComponents";
import {
  DrawerDivider,
  ColumnScrollView,
  LinearGradientView,
  RowScrollView,
  ScreenScrollView,
} from "../../components/ContainerComponents";
import {
  ActiveSubscriptionIcon,
  MembershipIndividualIcon,
  MembershipFamilyIcon,
  PhoneSpeakerIcon,
  PhoneTextIcon,
  VideoIcon,
  YoutubeMusicIcon,
  LearningIcon,
} from "../../components/IconComponents";
import {
  ChannelProfileImage,
  YoutubePremiumLogoImage,
} from "../../components/ImageComponents";
import {
  MinimizingButton,
  OutlinedButton,
  SubscribeButton,
} from "../../components/PressableComponents";
import { BaseText } from "../../components/TextComponents";
import { MainVideoView } from "../../components/VideoComponents";
import { useThemeContext } from "../../context/ThemeContext";
import { useScrollToTopOnFocus } from "../../hooks/useScrollToTopOnFocus";
import { useSetImageData } from "../../hooks/useSetImageData";
import { useSetVideoData } from "../../hooks/useSetVideoData";
import { screenWidth, styles } from "../../styles/styles";
import { navPaths } from "../../utils/constants";
import { shortenText } from "../../utils/utils";

export default function LearningScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [featuredLearningVideos, setFeaturedLearningVideos] = useState([]);
  const [comSciLearningVideos, setComSciLearningVideos] = useState([]);
  const [cookingLessonsVideos, setCookingLessonsVideos] = useState([]);
  const [literacyClassicsVideos, setLiteracyClassicsVideos] = useState([]);
  const [coffeeVideos, setCoffeeVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "New Learning",
    queryResults: 5,
    setVideos: setFeaturedLearningVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Computer Science",
    queryResults: 5,
    setVideos: setComSciLearningVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Cooking Lessons",
    queryResults: 5,
    setVideos: setCookingLessonsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Literacy Classics",
    queryResults: 5,
    setVideos: setLiteracyClassicsVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Coffee",
    queryResults: 5,
    setVideos: setCoffeeVideos,
    setIsLoading,
  });

  return (
    <ScreenScrollView isLoading={isLoading} ref={scrollToTopRef}>
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          styles.screenPadLeft,
        ]}
      >
        <View
          style={{
            borderRadius: 99,
            padding: 10,
            backgroundColor: ctxColors.primary,
          }}
        >
          <LearningIcon size={ctxIconSizes.xl2} color={ctxColors.white} />
        </View>
        <BaseText
          style={{
            marginLeft: 10,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          Learning
        </BaseText>
      </View>

      <View style={[{ marginTop: 16 }, styles.screenPadHorizontal]}>
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Featured
        </BaseText>
      </View>
      <RowScrollView style={{ marginTop: 4 }}>
        {featuredLearningVideos.map((videoData, index) => (
          <VideoVerticalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>

      <DrawerDivider />
      <View style={[styles.screenPadHorizontal]}>
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Computer Science
        </BaseText>
        <BaseText
          style={{ fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary }}
        >
          Computers are a part of every aspect of life, even in areas you don't
          immediately realize. Learning about Computer Science is ...
        </BaseText>
      </View>
      <RowScrollView style={{ marginTop: 4 }}>
        {comSciLearningVideos.map((videoData, index) => (
          <VideoVerticalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>

      <DrawerDivider />
      <View style={[styles.screenPadHorizontal]}>
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Cooking Lessons
        </BaseText>
        <BaseText
          style={{ fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary }}
        >
          From home meal preparation to restaurant cooking, learn how to cook
          from home cook to an expert chef.
        </BaseText>
      </View>
      <RowScrollView style={{ marginTop: 4 }}>
        {cookingLessonsVideos.map((videoData, index) => (
          <VideoVerticalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>

      <DrawerDivider />
      <View style={[styles.screenPadHorizontal]}>
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          Literacy Classics
        </BaseText>
        <BaseText
          style={{ fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary }}
        >
          A literacy classic is a noteworthy novel that represents a genre of
          writing style and has made a lasting contribution to literature.
        </BaseText>
      </View>
      <RowScrollView style={{ marginTop: 4 }}>
        {literacyClassicsVideos.map((videoData, index) => (
          <VideoVerticalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>

      <DrawerDivider />
      <View style={[styles.screenPadHorizontal]}>
        <BaseText style={{ fontSize: ctxFontSizes.lg, fontWeight: "bold" }}>
          All About Coffeee
        </BaseText>
        <BaseText
          style={{ fontSize: ctxFontSizes.xs, color: ctxColors.textSecondary }}
        >
          Coffee is a lifeline for many, but there are so many ways coffee can
          be harvested, brewed and even served. This playlist will...
        </BaseText>
      </View>
      <RowScrollView style={{ marginTop: 4 }}>
        {coffeeVideos.map((videoData, index) => (
          <VideoVerticalPreviewCard
            key={index + videoData.id}
            videoData={videoData}
            onPress={() =>
              navigation.navigate(navPaths.mainVideoScreen, {
                query: videoData.title,
                videoData,
              })
            }
          />
        ))}
      </RowScrollView>
    </ScreenScrollView>
  );
}
