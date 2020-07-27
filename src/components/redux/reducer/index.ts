import { combineReducers } from "redux";
import authReducer from "./auth";
import fieldReducer from "./field";
import gameReducer from "./game";
import { startSlice } from "@modules/Start";

export const reducer = combineReducers({
  start: startSlice.reducer,
  auth: authReducer,
  game: gameReducer,
  field: fieldReducer,
});
