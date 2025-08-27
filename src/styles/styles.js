import { StyleSheet, Dimensions } from "react-native";

//maybe use useWindowDimensions hook???
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%

export const styles = StyleSheet.create({
  homeScreenContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: screenWidth,
  },
  homeScreenVideoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  homeScreenVideoInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  homeVideoImage: {
    width: "95%",
    height: 200,
    resizeMode: "stretch",
  },
  homeChannelImage: {
    width: "10%",
    height: "80%",
    resizeMode: "stretch",
    borderRadius: 100,
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
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitleTextSize: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkTextSize: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
