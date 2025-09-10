import { StyleSheet, Dimensions } from "react-native";

//maybe use useWindowDimensions hook???
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const globaloffsetHorizontal = 15;

export const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: globaloffsetHorizontal,
  },
  headerRightIconsContainer: {
    marginRight: globaloffsetHorizontal,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightIcon: {
    marginLeft: 25,
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
    paddingHorizontal: globaloffsetHorizontal,
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
  /****************************************Texts****************************************/
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
