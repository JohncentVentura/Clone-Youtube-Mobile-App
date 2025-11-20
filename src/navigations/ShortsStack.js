import { createStackNavigator } from "@react-navigation/stack";
import { HomeCommentsModal } from "../components/modals/CommentsModal";
import { useUIContext } from "../context/UIContext";
import {
  ChannelStackScreen,
  SearchStackScreen,
  SearchResultStackScreen,
  ShortsStackScreen,
} from "./StackNavigator";

const Stack = createStackNavigator();

export default function ShortsStack() {
  const { ctxHomeCommentsModal } = useUIContext();
  
  return (
    <>
      <Stack.Navigator>
        {ShortsStackScreen()}
        {ChannelStackScreen()}
        {SearchStackScreen()}
        {SearchResultStackScreen()}
      </Stack.Navigator>

      {ctxHomeCommentsModal && <HomeCommentsModal />}
    </>
  );
}
