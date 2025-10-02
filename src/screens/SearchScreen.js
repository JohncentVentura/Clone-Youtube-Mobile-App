import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeaderArrowBack, HeaderMic } from "../components/HeaderComponents";
import { ThTextInput, ThView } from "../components/ThemedComponents";
import { styles } from "../styles/styles";
import { hideMainBottomTabBar } from "../utils/utils";

export default function SearchScreen({ navigation, route }) {
  const { search } = route.params;

  hideMainBottomTabBar(navigation);

  return (
    <ThView style={styles.screenContainer}>
      <SearchScreenHeader navigation={navigation} search={search} />
    </ThView>
  );
}

function SearchScreenHeader({ navigation, search }) {
  const insets = useSafeAreaInsets();
  const [newSearch, setNewSearch] = useState(search);

  return (
    <ThView
      style={{
        marginTop: insets.top + 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <HeaderArrowBack navigation={navigation} />
      <ThTextInput
        style={{ marginLeft: 12, flex: 1 }}
        value={newSearch}
        onChangeText={setNewSearch}
        autoFocus={true}
        onSubmitEditing={() =>
          navigation.push("SearchResultScreen", { search: newSearch })
        }
      />
      <ThView style={styles.headerRightIconsContainer}>
        <HeaderMic style={{ marginLeft: 12 }} />
      </ThView>
    </ThView>
  );
}
