import { combineReducers } from "redux";
import statsSlice from "./stats-slice/stats-slice";
import offersSlice from "./offers-slice/offers-slice";
import authorizationSlice from "./authorization-slice/authorization-slice";

const rootReducer = combineReducers({
  stats: statsSlice,
  offers: offersSlice,
  authorization: authorizationSlice,
})

export default rootReducer