import { createStackNavigator } from "@react-navigation/stack";
import { HomeCommentsModal } from "../components/modals/CommentsModal";
import { useUIContext } from "../context/UIContext";
import {
  ChannelScreenStack,
  SearchScreenStack,
  SearchResultScreenStack,
  ShortsScreenStack,
} from "./NavigationConfig";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { ctxHomeCommentsModal } = useUIContext();
  
  return (
    <>
      <Stack.Navigator>
        {ShortsScreenStack()}
        {ChannelScreenStack()}
        {SearchScreenStack()}
        {SearchResultScreenStack()}
      </Stack.Navigator>

      {ctxHomeCommentsModal && <HomeCommentsModal />}
    </>
  );
}
