import {
  ArrowBackIcon,
  DotVerticalIcon,
  MicIcon,
  NotificationIcon,
  SearchIcon,
  ShareScreenIcon,
  YoutubeMainIcon,
} from "./IconComponents";
import { ThText, AnimFadeRoundButton } from "./ThemedComponents";
import { styles } from "../styles/styles";
import { useTheme } from "../styles/ThemeContext";

export function HeaderArrowBackIcon({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerLeftIcon, style]}
      onPress={() => navigation.goBack()}
      {...rest}
    >
      <ArrowBackIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderDotVerticalIcon({ style, setIsModalVisible, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRightIcon, style]} {...rest}>
      <DotVerticalIcon onPress={() => setIsModalVisible(true)}/>
    </AnimFadeRoundButton>
  );
}

export function HeaderMicIcon({ style, ...rest }) {
  return (
    <AnimFadeRoundButton style={[styles.headerRightIcon, style]} {...rest}>
      <MicIcon />
    </AnimFadeRoundButton>
  );
}

export function HeaderNotificationsIcon({ style, navigation, ...rest }) {
  return (
    <AnimFadeRoundButton
      style={[styles.headerRightIcon, style]}
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
      style={[styles.headerRightIcon, style]}
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
      style={[styles.headerRightIcon, style]}
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
          fontWeight: "bold",
        },
      ]}
      {...rest}
    >
      {children}
    </ThText>
  );
}

export function HeaderYoutubeIcon({ style, ...rest }) {
  const { colors } = useTheme();

  return (
    <AnimFadeRoundButton style={[styles.headerLeftIcon, style]} {...rest}>
      <YoutubeMainIcon color={colors.primary} />
    </AnimFadeRoundButton>
  );
}
