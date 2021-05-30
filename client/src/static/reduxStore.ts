import { createStore, combineReducers, compose } from "redux";
import * as Reducers from "../redux/reducers";
//auto imported as combine-reducers object

const reducers = combineReducers(Reducers);

//Chrome redux devtools:
const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reduxStore = createStore(reducers, composeEnhancers());

export default reduxStore;
