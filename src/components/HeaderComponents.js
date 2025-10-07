import { Image } from "react-native";
import {
  ArrowBackIcon,
  DotVerticalIcon,
  MicIcon,
  NotificationIcon,
  SearchIcon,
  ShareScreenIcon,
} from "./IconComponents";
import { ThText, AnimFadeRoundButton } from "./ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

export function HeaderArrowBackIcon({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerLeft, style]}
      onPress={() => navigation.goBack()}
      {...rest}
    >
      <ArrowBackIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderDotVerticalIcon({ style, setIsModalVisible, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRight, style]}
      onPress={() => setIsModalVisible(true)}
      {...rest}
    >
      <DotVerticalIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderMicIcon({ style, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRight, style]} {...rest}>
      <MicIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderNotificationsIcon({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRight, style]}
      onPress={() => {
        navigation.navigate("NotificationsScreen");
      }}
      {...rest}
    >
      <NotificationIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderSearchIcon({ style, navigation, search, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRight, style]}
      onPress={() => {
        navigation.navigate("SearchScreen", { search: search });
      }}
      {...rest}
    >
      <SearchIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderShareScreenIcon({ style, setIsModalVisible, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRight, style]}
      onPress={() => setIsModalVisible(true)}
      {...rest}
    >
      <ShareScreenIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderTitleText({ style, children, ...rest }) {
  const { fontSizes } = useTheme();

  return (
    <ThText
      style={[
        styles.headerTitle,
        {
          fontSize: fontSizes.xl,
          fontWeight: "medium",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </ThText>
  );
}

export function HeaderYouTubeLogoImage({ style, ...rest }) {
  const { colorScheme } = useTheme();

  return (
    <Image
      style={[styles.headerLeft, { width: 95, height: 95 }, style]}
      resizeMode={"contain"}
      source={
        colorScheme === "light"
          ? require("../assets/images/youtube-logo-light-mode.png")
          : require("../assets/images/youtube-logo-dark-mode.png")
      }
      alt="Channel Image"
      {...rest}
    />
  );
}
