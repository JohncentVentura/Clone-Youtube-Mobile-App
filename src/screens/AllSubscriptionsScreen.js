import { useState } from "react";
import { View } from "react-native";
import {
  ColumnScrollView,
  ScreenContainer,
} from "../components/ContainerComponents";
import {
  KeyboardArrowDownIcon,
  NotificationsIcon,
} from "../components/IconComponents";
import { MainVideoChannelImage } from "../components/ImageComponents";
import { BasePressable } from "../components/PressableComponents";
import { BaseText } from "../components/TextComponents";
import { useThemeContext } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

export default function AllSubscriptionsScreen({ navigation, route }) {
  const { ctxColors, ctxFontSizes, ctxIconSizes } = useThemeContext();
  const unsortedChannels = route.params.subscribedChannels;
  const [channels, setChannels] = useState(route.params.subscribedChannels);
  const [sortMode, setSortMode] = useState("A-Z");

  const handleSortPress = () => {
    let sortedChannels = [...channels];

    if (sortMode === "A-Z") {
      sortedChannels.sort((a, b) => a.channelName.localeCompare(b.channelName));
      setSortMode("Random");
    } else {
      sortedChannels = unsortedChannels;
      setSortMode("A-Z");
    }

    setChannels(sortedChannels);
  };

  return (
    <ScreenContainer>
      <View style={styles.screenPadHorizontal}>
        <BasePressable
          style={[
            {
              marginTop: 6,
              backgroundColor: ctxColors.bgSecondary,
              alignSelf: "flex-start",
            },
            styles.smallButton,
          ]}
          onPress={handleSortPress}
        >
          <BaseText>{sortMode}</BaseText>
          <KeyboardArrowDownIcon />
        </BasePressable>
      </View>
      <ColumnScrollView style={{ marginTop: 10 }}>
        {channels.map((channel) => (
          <BasePressable
            key={channel.channelName}
            style={[
              {
                paddingVertical: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              },
              styles.screenPadHorizontal,
            ]}
            onPress={() => {
              navigation.navigate(navPaths.channelScreen, {
                videoData: channels.find(
                  (videoDataChannel) =>
                    videoDataChannel.channelName === channel.channelName
                ),
              });
            }}
          >
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <MainVideoChannelImage source={{ uri: channel.picture }} />
              <View style={{ marginLeft: 12 }}>
                <BaseText style={{ fontWeight: "medium" }}>
                  {channel.channelName}
                </BaseText>
                <BaseText style={{ fontSize: ctxFontSizes.sm }}>
                  {channel.channelTag}
                </BaseText>
              </View>
            </View>

            <BasePressable
              style={[
                { backgroundColor: ctxColors.bgSecondary },
                styles.smallButton,
              ]}
            >
              <NotificationsIcon size={ctxIconSizes.xs} />
              <KeyboardArrowDownIcon size={ctxIconSizes.xs} />
            </BasePressable>
          </BasePressable>
        ))}
      </ColumnScrollView>
    </ScreenContainer>
  );
}
