import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderDotVerticalIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderTitleText, BaseText } from "../components/TextComponents";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import ShortsScreen from "../screens/ShortsScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { colors, fontSizes } = useTheme();
  const { isShortsVideoPlaying } = useUI();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="ShortsScreen"
        component={ShortsScreen}
        options={({ navigation }) => {
          return {
            header: () => (
              <HeaderContainer
                style={{
                  position: "absolute",
                  top: 12,
                  left: 0,
                  backgroundColor: "transparent",
                }}
              >
                {!isShortsVideoPlaying && (
                  <BaseText
                    style={{
                      fontSize: fontSizes.xl2,
                      fontWeight: "bold",
                      color: colors.white,
                    }}
                  >
                    Shorts
                  </BaseText>
                )}
                <View style={[styles.headerRightIconsContainer]}>
                  <HeaderShareScreenIcon color={colors.white} />
                  <HeaderSearchIcon color={colors.white} />
                  <HeaderDotVerticalIcon
                    style={[styles.headerRightIcon]}
                    color={colors.white}
                  />
                </View>
              </HeaderContainer>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
