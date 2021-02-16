import { createStore, combineReducers } from "redux";
import {
  isAuth,
  setUserInfo,
  setGlobalMessage,
  ReduxAnimationHandler,
} from "../redux/reducers";

const reducers = combineReducers({
  isAuth: isAuth,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
  Animations: ReduxAnimationHandler,
});

const reduxStore = createStore(reducers);

export default reduxStore;
