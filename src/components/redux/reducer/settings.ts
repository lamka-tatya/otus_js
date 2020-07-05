import { Action } from "redux";
import * as actionTypes from "../actions";
import {
	initSettingsState,
	SettingsState,
} from "../state/settingsState";

export function settings(
	state: SettingsState = initSettingsState,
	action: Action & { payload?: SettingsState }
) {
	switch (action.type) {
		case actionTypes.SET_SETTINGS:
			return action.payload;
	}

	return state;
}
