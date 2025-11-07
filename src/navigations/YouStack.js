import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { HeaderContainer } from "../components/ContainerComponents";
import {
  HeaderNotificationsIcon,
  HeaderSearchIcon,
  HeaderSettingsIcon,
  HeaderShareScreenIcon,
} from "../components/IconComponents";
import YouScreen from "../screens/YouScreen";
import { styles } from "../styles/styles";
import {
  ChannelScreenStack,
  MainVideoScreenStack,
  NotificationsScreenStack,
  SearchResultScreenStack,
  SearchScreenStack,
  ShortsScreenStack,
} from "./NavigationConfig";

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
                <View style={styles.headerRightIconsContainer}>
                  <HeaderShareScreenIcon />
                  <HeaderNotificationsIcon navigation={navigation} />
                  <HeaderSearchIcon navigation={navigation} />
                  <HeaderSettingsIcon />
                </View>
              </HeaderContainer>
            ),
          };
        }}
      />
      {ChannelScreenStack()}
      {MainVideoScreenStack()}
      {NotificationsScreenStack()}
      {SearchScreenStack()}
      {SearchResultScreenStack()}
      {ShortsScreenStack()}
    </Stack.Navigator>
  );
}
