import { combineReducers } from "redux";
import authReducer from "./auth";
import startReducer from "./start";
import fieldReducer from "./field";
import gameReducer from "./game";

export const reducer = combineReducers({
  start: startReducer,
  auth: authReducer,
  game: gameReducer,
  field: fieldReducer,
});
