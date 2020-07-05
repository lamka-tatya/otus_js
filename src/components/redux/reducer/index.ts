import { combineReducers } from "redux";
import { auth } from "./auth";
import { start } from "./start";
import { settings } from "./settings";
import { field } from "./field";
import { game } from "./game";

export const reducer = combineReducers({
	start,
	auth,
	game,
	settings,
	field,
});
