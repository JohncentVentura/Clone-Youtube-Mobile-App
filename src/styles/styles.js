import { StyleSheet, Dimensions } from "react-native";

//Maybe use useWindowDimensions hook?
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const globalOffsetHorizontal = 16;

export const colorNames = {
  light: {
    foreground: "#282828ff",
    gray: "#8c8c8cff",
    background: "#ffffffff",
    primary: "#FF0000ff",
    //grayBackground: "#cdcdcdff",
  },
  dark: {
    foreground: "#ffffffff",
    gray: "#848484ff",
    background: "#282828ff",
    primary: "#FF0000ff",
    //grayBackground: "#363636ff",
  },
};

export const colors = {
  foreground: "foreground",
  gray: "gray",
  background: "background",
  primary: "primary",
};

export const textSizes = {
  xs2: "xs2",
  xs: "xs",
  sm: "sm",
  base: "base",
  lg: "lg",
  xl: "xl",
  xl2: "2xl",
  xl3: "3xl",
  xl4: "4xl",
  xl5: "5xl",
};

export const styles = StyleSheet.create({
  headerLeftIcon: {
    paddingLeft: globalOffsetHorizontal,
  },
  headerRightIconsContainer: {
    paddingRight: globalOffsetHorizontal,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightIcon: {
    paddingLeft: 25,
  },
  homeContainer: {
    width: screenWidth,
    flex: 1,
  },
  homeVideoContainer: {
    marginBottom: screenHeight * 0.025,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  homeVideoInfoContainer: {
    paddingTop: screenHeight * 0.005,
    paddingHorizontal: globalOffsetHorizontal,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  homeChannelImage: {
    borderRadius: 100,
    width: 45,
    height: 45,
  },
  largeVideo: {
    width: "100%",
    height: screenHeight * 0.3,
    overflow: "hidden",
  },
  /******************************Texts******************************/
  xs2TextSize: {
    fontSize: 10,
  },
  xsTextSize: {
    fontSize: 12,
  },
  smTextSize: {
    fontSize: 14,
  },
  baseTextSize: {
    fontSize: 16,
  },
  lgTextSize: {
    fontSize: 18,
  },
  xlTextSize: {
    fontSize: 20,
  },
  xl2TextSize: {
    fontSize: 22,
  },
  xl3TextSize: {
    fontSize: 24,
  },
  xl4TextSize: {
    fontSize: 26,
  },
  xl5TextSize: {
    fontSize: 28,
  },

  defaultTextSize: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBoldTextSize: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  smallTextSize: {
    fontSize: 12,
    lineHeight: 16,
  },
  titleTextSize: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitleTextSize: {
    fontSize: 19,
    fontWeight: "bold",
  },
  linkTextSize: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
