import { StyleSheet, Dimensions } from "react-native";

//maybe use useWindowDimensions hook???
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%

export const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    width: screenWidth,
  },
  homeVideoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: screenHeight * 0.025,
  },
  homeVideoInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  homeChannelImage: {
    borderRadius: 100,
    width: "10%",
    height: "100%",
  },
  largeVideo: {
    width: "100%",
    height: screenHeight * 0.3,
    overflow: "hidden",
  },
  /********************TEXTS********************/
  defaultTextSize: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBoldTextSize: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  smallTextSize:{
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
