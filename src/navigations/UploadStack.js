import { createStackNavigator } from "@react-navigation/stack";
import UploadScreen from '../screens/UploadScreen';

const Stack = createStackNavigator();

export default function UploadStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Upload" component={UploadScreen} />
    </Stack.Navigator>
  );
}
