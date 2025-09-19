import { Dimensions, StyleSheet } from "react-native";

//Maybe use useWindowDimensions hook?
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
const globalHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  headerLeftIcon: {
    paddingLeft: globalHorizontalSpacing,
  },
  headerRightIconsContainer: {
    paddingRight: globalHorizontalSpacing,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightIcon: {
    paddingLeft: 24,
  },
  horizontalPaddedContainer: {
    paddingHorizontal: globalHorizontalSpacing,
    width: "100%",
  },
  homeContainer: {
    width: screenWidth,
    flex: 1,
  },
  homeVideoContainer: {
    marginBottom: 8,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  homeVideoInfoContainer: {
    marginBottom: 16,
    paddingHorizontal: globalHorizontalSpacing,
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
