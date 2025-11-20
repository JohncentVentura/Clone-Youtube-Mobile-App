import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeCommentsModal,
  PostCommentsModal,
} from "../../components/modals/CommentsModal";
import { useUIContext } from "../../context/UIContext";
import {
  ChannelStackScreen,
  GamingStackScreen,
  MainVideoStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
} from "../StackNavigator";

const Stack = createStackNavigator();

export default function GamingStack() {
  const { ctxHomeCommentsModal, ctxPostCommentsModal } = useUIContext();

  return (
    <>
      <Stack.Navigator>
        {GamingStackScreen()}
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
