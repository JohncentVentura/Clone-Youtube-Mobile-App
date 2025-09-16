import { Dimensions, StyleSheet } from "react-native";

//Maybe use useWindowDimensions hook?
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const globalOffsetHorizontal = 16;

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
});
