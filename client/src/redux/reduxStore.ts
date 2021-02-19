import { createStore, combineReducers } from "redux";

import { isAuth, setUserInfo } from "./reducers/authReducer";
import { setGlobalMessage } from "./reducers/globalMessageReducer";
import { ReduxAnimationHandler } from "./reducers/animationsReducer";
import {
  practiceReducer,
  practiceAnimationReducer,
} from "./reducers/practiceReducer";

const reducers = combineReducers({
  isAuth: isAuth,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
  Animations: ReduxAnimationHandler,
  Practice: practiceReducer,
  PracticeOffset: practiceAnimationReducer,
});

const reduxStore = createStore(reducers);

export default reduxStore;
