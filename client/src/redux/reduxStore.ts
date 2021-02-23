import { createStore, combineReducers, compose } from "redux";

import { refreshAuthReducer, setUserInfo } from "./reducers/authReducer";
import { setGlobalMessage } from "./reducers/globalMessageReducer";
import { ReduxAnimationHandler } from "./reducers/animationsReducer";
import {
  practiceReducer,
  practiceAnimationReducer,
} from "./reducers/practiceReducer";
import { practiceMenuReducer } from "./reducers/practiceMenuReducer";

const reducers = combineReducers({
  AuthCount: refreshAuthReducer,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
  Animations: ReduxAnimationHandler,
  Practice: practiceReducer,
  PracticeOffset: practiceAnimationReducer,
  PracticeMenu: practiceMenuReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reduxStore = createStore(reducers, composeEnhancers());

export default reduxStore;
