import { createStore, combineReducers } from "redux";
import { isAuth, setUserInfo, setGlobalMessage } from "../redux/reducers";

const reducers = combineReducers({
  isAuth: isAuth,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
});

const reduxStore = createStore(reducers);

export default reduxStore;
