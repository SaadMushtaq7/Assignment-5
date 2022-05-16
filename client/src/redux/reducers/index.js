import { combineReducers } from "redux";
import { weatherReducer, tourReducer, myTourReducer } from "./filesReducer";
const reducers = combineReducers({
  allweatherupdates: weatherReducer,
  alltours: tourReducer,
  allmytours: myTourReducer,
});
export default reducers;
