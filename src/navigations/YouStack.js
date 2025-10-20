import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderArrowBackIcon,
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderTitleText } from "../components/TextComponents";
import YouScreen from "../screens/YouScreen";
import { styles } from "../styles/styles";

const Stack = createStackNavigator();

export default function YouStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="You"
        component={YouScreen}
        options={({ navigation }) => {
          return {
            header: () => (
              <HeaderContainer>
                <HeaderArrowBackIcon navigation={navigation} />
                <HeaderTitleText>You</HeaderTitleText>
                <View style={styles.headerRightIconsContainer}>
                  <HeaderShareScreenIcon />
                  <HeaderNotificationsIcon navigation={navigation} />
                  <HeaderSearchIcon navigation={navigation} />
                </View>
              </HeaderContainer>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
