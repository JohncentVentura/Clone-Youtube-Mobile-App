import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useThemeContext } from "../context/ThemeContext";
import { useUIContext } from "../context/UIContext";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";
import { RippleButton } from "./PressableComponents";

export function BaseIcon({ IconComponent, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <IconComponent
      size={ctxIconSizes.base}
      color={ctxColors.iconPrimary}
      {...rest}
    />
  );
}

//#region BottomTabBar Icons
export function ActiveHomeIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="home-sharp" {...rest} />;
}

export function InactiveHomeIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="home-outline" {...rest} />;
}

export function ActiveShortsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="videocam" {...rest} />;
}

export function InactiveShortsIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="videocam-outline" {...rest} />
  );
}

export function UploadIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="plus" {...rest} />;
}

export function ActiveSubscriptionIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="albums" {...rest} />;
}

export function InactiveSubscriptionIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="albums-outline" {...rest} />;
}

export function ActiveYouIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="person-circle" {...rest} />;
}

export function InactiveYouIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="person-circle-outline" {...rest} />
  );
}
//#endregion

//#region Header Icons
export function HeaderArrowBackIcon({ navigation, onPress, size, color, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <RippleButton  onPress={onPress ? onPress : () => navigation.goBack()} {...rest}>
      <ArrowBackIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}

export function HeaderDotVerticalIcon({ style, size, color, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <RippleButton style={[styles.headerRightIcon, style]} {...rest}>
      <DotVerticalIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}

export function HeaderMicIcon({ style, size, color, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <RippleButton style={[styles.headerRightIcon, style]} {...rest}>
      <MicIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}

export function HeaderNotificationsIcon({
  style,
  navigation,
  size,
  color,
  ...rest
}) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <RippleButton
      style={[styles.headerRightIcon, style]}
      onPress={() => {
        navigation.navigate(navPaths.notificationsScreen);
      }}
      {...rest}
    >
      <NotificationsIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}

export function HeaderSearchIcon({ style, navigation, size, color, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <RippleButton
      style={[styles.headerRightIcon, style]}
      onPress={() => {
        navigation.navigate(navPaths.searchScreen, { search: "" });
      }}
      {...rest}
    >
      <SearchIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}

export function HeaderSettingsIcon({ style, size, color, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();

  return (
    <RippleButton style={[styles.headerRightIcon, style]} {...rest}>
      <SettingsIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}

export function HeaderShareScreenIcon({ style, size, color, ...rest }) {
  const { ctxColors, ctxIconSizes } = useThemeContext();
  const { ctxSetShareScreenModal } = useUIContext();

  return (
    <RippleButton
      style={[styles.headerRightIcon, style]}
      onPress={() => ctxSetShareScreenModal(true)}
      {...rest}
    >
      <ShareScreenIcon
        size={size || ctxIconSizes.base}
        color={color || ctxColors.iconPrimary}
      />
    </RippleButton>
  );
}
//#endregion

//#region Menu Icons
export function AccountBoxMultipleIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="account-box-multiple-outline"
      {...rest}
    />
  );
}

export function ArrowBackIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="arrow-back" {...rest} />;
}

export function ArrowUpLeftIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="arrow-up-left" {...rest} />;
}

export function ClockRotateLeftIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={FontAwesome6} name="clock-rotate-left" {...rest} />
  );
}

export function ClockIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="clock" {...rest} />;
}

export function CloseIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="close" {...rest} />;
}

export function CompassIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="compass-outline" {...rest} />;
}

export function CourseIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={SimpleLineIcons} name="graduation" {...rest} />
  );
}

export function DislikeIcon({ ...rest }) {
  return <BaseIcon IconComponent={SimpleLineIcons} name="dislike" {...rest} />;
}

export function DontRecommendChannelIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="person-off" {...rest} />;
}

export function DotVerticalIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="dots-vertical"
      {...rest}
    />
  );
}

export function DownloadIcon({ ...rest }) {
  return <BaseIcon IconComponent={Octicons} name="download" {...rest} />;
}

export function ExclamationCircleIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={AntDesign} name="exclamation-circle" {...rest} />
  );
}

export function EyeInvisbleIcon({ ...rest }) {
  return <BaseIcon IconComponent={AntDesign} name="eye-invisible" {...rest} />;
}

export function FashionAndBeautyIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="brush-outline" {...rest} />;
}

export function GamingIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="youtube-gaming"
      {...rest}
    />
  );
}

export function GoogleIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={Ionicons}
      name="logo-google"
      {...rest}
    />
  );
}

export function IncognitoIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="incognito"
      {...rest}
    />
  );
}

export function InformationIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="information-outline"
      {...rest}
    />
  );
}

export function KeyboardArrowDownIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialIcons}
      name="keyboard-arrow-down"
      {...rest}
    />
  );
}

export function KeyboardArrowRightIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialIcons}
      name="keyboard-arrow-right"
      {...rest}
    />
  );
}

export function LikeIcon({ ...rest }) {
  return <BaseIcon IconComponent={SimpleLineIcons} name="like" {...rest} />;
}

export function LiveIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="live-tv" {...rest} />;
}

export function LockIcon({ ...rest }) {
  return <BaseIcon IconComponent={SimpleLineIcons} name="lock" {...rest} />;
}

export function MessageTextIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="message-text-outline"
      {...rest}
    />
  );
}

export function MicIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="mic" {...rest} />;
}

export function MovieIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="movie-open-outline"
      {...rest}
    />
  );
}

export function MusicIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="musical-note-outline" {...rest} />
  );
}

export function NewsIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="newspaper-outline" {...rest} />
  );
}

export function NotificationsIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="notifications-outline" {...rest} />
  );
}

export function NotificationsOffIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={Ionicons}
      name="notifications-off-outline"
      {...rest}
    />
  );
}

export function NotInterestedIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="block" {...rest} />;
}

export function PauseIcon({ ...rest }) {
  return <BaseIcon IconComponent={FontAwesome} name="pause" {...rest} />;
}

export function PlayIcon({ ...rest }) {
  return <BaseIcon IconComponent={FontAwesome} name="play" {...rest} />;
}

export function PlayNextInQueueIcon({ ...rest }) {
  return <BaseIcon IconComponent={MaterialIcons} name="queue" {...rest} />;
}

export function QuestionCircleIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={FontAwesome5} name="question-circle" {...rest} />
  );
}

export function RemixIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="videocam-outline" {...rest} />
  );
}

export function ReportIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="flag-outline" {...rest} />;
}

export function SaveIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Ionicons} name="bookmark-outline" {...rest} />
  );
}

export function SaveToWatchLaterIcon({ ...rest }) {
  return <BaseIcon IconComponent={FontAwesome5} name="clock" {...rest} />;
}

export function SearchIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="search" {...rest} />;
}

export function SettingsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="settings" {...rest} />;
}

export function ShareIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={MaterialCommunityIcons} name="share" {...rest} />
  );
}

export function ShareScreenIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={MaterialIcons} name="connected-tv" {...rest} />
  );
}

export function ShuffleIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Entypo} name="shuffle" {...rest} />
  );
}

export function SportsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="trophy-outline" {...rest} />;
}

export function StatsChartIcon({ ...rest }) {
  return <BaseIcon IconComponent={Ionicons} name="stats-chart-sharp" {...rest} />;
}

export function VideoIcon({ ...rest }) {
  return <BaseIcon IconComponent={Octicons} name="video" {...rest} />;
}

export function YoutubeKidsIcon({ ...rest }) {
  return <BaseIcon IconComponent={Feather} name="youtube" {...rest} />;
}

export function YoutubeMusicIcon({ ...rest }) {
  return (
    <BaseIcon IconComponent={Entypo} name="youtube-with-circle" {...rest} />
  );
}

export function YoutubePremiumIcon({ ...rest }) {
  return (
    <BaseIcon
      IconComponent={MaterialCommunityIcons}
      name="youtube-tv"
      {...rest}
    />
  );
}
//#endregion
