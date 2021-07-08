import { createStore, combineReducers } from "redux";
import * as Reducers from "../redux/reducers";
//auto imported as combine-reducers object

const reducers = combineReducers(Reducers);

const reduxStore = createStore(reducers);

export default reduxStore;
