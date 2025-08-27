import { Text, View, Image } from "react-native";
import { styles } from "../styles/styles";
import { ThemedText, ThemedView } from "../components/ThemedComponents";
import {
  HomeVideoImage,
  HomeChannelImage,
} from "../components/ImageComponents";

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenContainer}>
      <ThemedView style={styles.homeScreenVideoContainer}>
        <HomeVideoImage
          //source={require('../assets/images/adaptive-icon.png')}
          source={{
            uri: "https://i.ytimg.com/vi/QZHMZPPbJkE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDCLVpdluplzqfFcs-0BbonX_dswA",
          }}
        />
        <ThemedView style={styles.homeScreenVideoInfoContainer}>
          <HomeChannelImage
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIDlX73Bezvep3MYr26IQSFBElpVGpNW0QAS6nsZdgpffU-ptjpyjccu-PUz6J2E3J_Y&usqp=CAU",
            }}
          />
          <ThemedView>
            <ThemedText type="title">Video Title</ThemedText>
            <ThemedText type="small">Channel Name * Views Count * Uploaded Date</ThemedText>
          </ThemedView>
          <ThemedView>
            <ThemedText>...</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </View>
  );
}
