import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeCommentsModal,
  PostCommentsModal,
} from "../../components/modals/CommentsModal";
import { useUIContext } from "../../context/UIContext";
import {
  ChannelStackScreen,
  MainVideoStackScreen,
  MusicTrackStackScreen,
  MusicStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
} from "../StackNavigator";

const Stack = createStackNavigator();

export default function MusicStack() {
  const { ctxHomeCommentsModal, ctxPostCommentsModal } = useUIContext();

  return (
    <>
      <Stack.Navigator>
        {MusicStackScreen()}
        {MusicTrackStackScreen()}
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
