import { Image, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/styles";
import { imagePaths } from "../utils/paths";
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

export function HeaderContainer({ style, children, ...rest }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.paddedHorizontalContainer,
        {
          paddingTop: insets.top,
          height:
            Platform.OS === "android"
              ? insets.top + 56 //Android header height
              : insets.top + 44, //iOS header height
          backgroundColor: colors.bg,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
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

export function HeaderSearchIcon({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRight, style]}
      onPress={() => {
        navigation.navigate("SearchScreen", { search: "" });
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
      style={[{ width: 95, height: 25 }, style]}
      resizeMode={"stretch"}
      source={
        colorScheme === "light"
          ? imagePaths.youTubeLogoLightMode
          : imagePaths.youTubeLogoDarkMode
      }
      alt="Channel Image"
      {...rest}
    />
  );
}
