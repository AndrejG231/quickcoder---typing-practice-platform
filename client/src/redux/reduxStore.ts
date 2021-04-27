import { createStore, combineReducers, compose } from "redux";

import { refreshAuthReducer, setUserInfo } from "./reducers/authentication";
import { setGlobalMessage } from "./reducers/globalMessage";
import { practiceReducer } from "./reducers/practicer";
import { practiceUserStatsReducer } from "./reducers/practiceUserStatsReducer";
import { practiceSelectionReducer } from "./reducers/practiceSelectionReducer";
import { animationReducer } from "./reducers/animations";

const reducers = combineReducers({
  checkAuth: refreshAuthReducer,
  UserInfo: setUserInfo,
  globalMessage: setGlobalMessage,
  Practice: practiceReducer,
  PracticeUserStats: practiceUserStatsReducer,
  PracticeSelection: practiceSelectionReducer,
  Animation: animationReducer,
});

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reduxStore = createStore(reducers, composeEnhancers());

export default reduxStore;
