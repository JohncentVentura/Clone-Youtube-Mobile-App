import { Dimensions, StyleSheet } from "react-native";

//TODO: export and use screenWidth and screenHeight to other components
export const screenWidth = Dimensions.get("window").width * 1; //Multiply by 1 to get 100%
export const screenHeight = Dimensions.get("window").height * 1; //Multiply by 1 to get 100%
export const globalHorizontalSpacing = 16;

export const styles = StyleSheet.create({
  /******************************Headers******************************/
  headerLeft: {
    marginVertical: 8,
  },
  headerTitle: {
    marginLeft: 14,
  },
  headerRightContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    marginLeft: 24,
    marginVertical: 8,
  },
  /******************************Containers******************************/
  screenContainer: {
    width: screenWidth,
    flex: 1,
  },
  paddedHorizontalContainer: {
    paddingHorizontal: globalHorizontalSpacing,
    width: "100%",
  },
  /******************************Images******************************/
  coverImages: {
    borderRadius: 8,
    width: "100%",
    height: screenHeight * 0.15,
  },
  /******************************Videos******************************/
  videoView: {
    width: "100%`",
    height: screenHeight * 0.25,
  },
  /******************************Buttons******************************/
  baseButton: {
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  iconTextButton: {
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  wideButton: {
    borderRadius: 99,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  /******************************Text******************************/
  fontBold: {
    fontFamily: "roboto-bold",
  },
  fontMedium: {
    fontFamily: "roboto-medium",
  },
  fontRegular: {
    fontFamily: "roboto-regular",
  },
  fontSize2XS: {
    fontSize: 10,
  },
  fontSizeXS: {
    fontSize: 12,
  },
  fontSizeSM: {
    fontSize: 14,
  },
  fontSizeBase: {
    fontSize: 16,
  },
  fontSizeLG: {
    fontSize: 18,
  },
  fontSizeXL: {
    fontSize: 20,
  },
  fontSize2XL: {
    fontSize: 24,
  },
  /******************************Icons******************************/
  iconSizeBase: {
    width: 24,
    height: 24,
  },
});
