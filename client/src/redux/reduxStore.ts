import { createStore, combineReducers } from "redux";

import { isAuth, setUserInfo } from "../redux/reducers/authReducer";
import { setGlobalMessage } from "../redux/reducers/globalMessageReducer";
import { ReduxAnimationHandler } from "../redux/reducers/animationsReducer";

const reducers = combineReducers({
  isAuth: isAuth,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
  Animations: ReduxAnimationHandler,
});

const reduxStore = createStore(reducers);

export default reduxStore;
