import { createStore, combineReducers } from "redux";
import { isAuthReducer, setUserInfoReducer } from "../redux/reducers";

const reducers = combineReducers({
  isAuth: isAuthReducer,
  UserInfo: setUserInfoReducer,
});

const reduxStore = createStore(reducers);

export default reduxStore;

