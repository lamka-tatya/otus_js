import { combineReducers } from "redux";
import { user } from "./user";
import { gameSettings } from "./gameSettings";
import { field } from "./field";

export const reducer = combineReducers({
  user,
  gameSettings,
  field,
});
