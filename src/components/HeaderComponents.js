import { Image } from "react-native";
import { AnimFadeRoundButton } from "./AnimatedComponents";
import {
  ArrowBackIcon,
  DotVerticalIcon,
  MicIcon,
  NotificationIcon,
  SearchIcon,
  ShareScreenIcon,
} from "./IconComponents";
import { ThText } from "./ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";
import { imagePaths } from "../utils/paths";

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

export function HeaderDotVerticalIcon({ style, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRight, style]} {...rest}>
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

export function HeaderShareScreenIcon({ style, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRight, style]} {...rest}>
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
        [
          {
            fontSize: fontSizes.xl,
            fontWeight: "medium",
          },
          style,
        ],
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
      style={[{ width: 90, height: 25 }, style]}
      resizeMode={"stretch"}
      source={
        colorScheme === "light"
          ? imagePaths.youtubeLogoLightMode
          : imagePaths.youtubeLogoDarkMode
      }
      alt="Channel Image"
      {...rest}
    />
  );
}
