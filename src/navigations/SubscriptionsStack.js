import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import { HeaderYoutubeLogoImage } from "../components/ImageComponents";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";
import { styles } from "../styles/styles";
import { navPaths } from "../utils/constants";

const Stack = createStackNavigator();

export default function SubscriptionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navPaths.subscriptionsScreen}
        component={SubscriptionsScreen}
        options={({ navigation }) => {
          return {
            header: () => (
              <HeaderContainer>
                <HeaderYoutubeLogoImage />
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
