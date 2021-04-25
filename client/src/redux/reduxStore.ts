import { createStore, combineReducers, compose } from "redux";

import { refreshAuthReducer, setUserInfo } from "./reducers/authReducer";
import { setGlobalMessage } from "./reducers/globalMessageReducer";
import {
  practiceReducer,
  practiceAnimationReducer,
} from "./reducers/practiceReducer";
import { practiceMenuReducer } from "./reducers/practiceMenuReducer";
import { practiceUserStatsReducer } from "./reducers/practiceUserStatsReducer";
import { practiceSelectionReducer } from "./reducers/practiceSelectionReducer";
import { animationReducer } from "./reducers/animationReducer";

const reducers = combineReducers({
  AuthCount: refreshAuthReducer,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
  Practice: practiceReducer,
  PracticeOffset: practiceAnimationReducer,
  PracticeMenu: practiceMenuReducer,
  PracticeUserStats: practiceUserStatsReducer,
  PracticeSelection: practiceSelectionReducer,
  Animation: animationReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reduxStore = createStore(reducers, composeEnhancers());

export default reduxStore;
