import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeCommentsModal,
  PostCommentsModal,
} from "../../components/modals/CommentsModal";
import { useUIContext } from "../../context/UIContext";
import {
  ChannelStackScreen,
  MainVideoStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
  SportsStackScreen,
} from "../StackNavigator";

const Stack = createStackNavigator();

export default function SportsStack() {
  const { ctxHomeCommentsModal, ctxPostCommentsModal } = useUIContext();

  return (
    <>
      <Stack.Navigator>
        {SportsStackScreen()}
        {ChannelStackScreen()}
        {MainVideoStackScreen()}
        {SearchStackScreen()}
        {SearchResultStackScreen()}
        {ShortsStackScreen()}
      </Stack.Navigator>

      {ctxHomeCommentsModal && <HomeCommentsModal />}
      {ctxPostCommentsModal && <PostCommentsModal />}
    </>
  );
}
