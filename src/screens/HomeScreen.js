import { Text, View, Image } from "react-native";
import { styles } from "../../styles";

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenContainer}>
      <View style={styles.homeScreenVideo}>
        <Image
          source={{
            uri: "https://unsplash.com/photos/woman-in-flannel-overlooks-yosemite-valley-mountains-sTfhU9YOrhU",
          }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </View>
  );
}
