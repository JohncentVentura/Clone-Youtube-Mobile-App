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
  FashionAndBeautyIcon,
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

export default function FashionAndBeautyScreen({ navigation }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const scrollToTopRef = useRef(null);
  const [womensWearVideos, setWomensWearVideos] = useState([]);
  const [mensWearVideos, setMensWearVideos] = useState([]);
  const [kidsWearVideos, setKidsWearVideos] = useState([]);
  const [accessoriesVideos, setAccessoriesVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTopOnFocus(scrollToTopRef);
  useSetVideoData({
    query: "Womans Wear",
    queryResults: 5,
    setVideos: setWomensWearVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Mens Wear",
    queryResults: 5,
    setVideos: setMensWearVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Kids Wear",
    queryResults: 5,
    setVideos: setKidsWearVideos,
    setIsLoading,
  });
  useSetVideoData({
    query: "Accessories",
    queryResults: 5,
    setVideos: setAccessoriesVideos,
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
          <FashionAndBeautyIcon
            size={ctxIconSizes.xl2}
            color={ctxColors.white}
          />
        </View>
        <BaseText
          style={{
            marginLeft: 10,
            fontSize: ctxFontSizes.xl2,
            fontWeight: "bold",
          }}
        >
          Fashion & Beauty
        </BaseText>
      </View>

      <View
        style={[
          {
            marginTop: 16,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
          Women's Wear
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {womensWearVideos.map((videoData, index) => (
        <VideoHorizontalPreviewCard
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

      <DrawerDivider />
      <View
        style={[
          {
            marginTop: 16,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
          Men's Wear
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {mensWearVideos.map((videoData, index) => (
        <VideoHorizontalPreviewCard
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

      <DrawerDivider />
      <View
        style={[
          {
            marginTop: 16,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
          Kid's Wear
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {kidsWearVideos.map((videoData, index) => (
        <VideoHorizontalPreviewCard
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

      <DrawerDivider />
      <View
        style={[
          {
            marginTop: 16,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styles.screenPadHorizontal,
        ]}
      >
        <BaseText style={{ fontSize: ctxFontSizes.xl, fontWeight: "bold" }}>
          Accessories
        </BaseText>
        <OutlinedButton>
          <BaseText style={{ fontSize: ctxFontSizes.sm }}>View All</BaseText>
        </OutlinedButton>
      </View>
      {accessoriesVideos.map((videoData, index) => (
        <VideoHorizontalPreviewCard
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
    </ScreenScrollView>
  );
}
