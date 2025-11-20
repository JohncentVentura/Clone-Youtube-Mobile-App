import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeCommentsModal,
  PostCommentsModal,
} from "../../components/modals/CommentsModal";
import { useUIContext } from "../../context/UIContext";
import {
  ChannelStackScreen,
  FashionAndBeautyStackScreen,
  MainVideoStackScreen,
  SearchResultStackScreen,
  SearchStackScreen,
  ShortsStackScreen,
} from "../StackNavigator";

const Stack = createStackNavigator();

export default function FashionAndBeautyStack() {
  const { ctxHomeCommentsModal, ctxPostCommentsModal } = useUIContext();

  return (
    <>
      <Stack.Navigator>
        {FashionAndBeautyStackScreen()}
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
