import { Action } from "redux";
import * as actionTypes from "../actions";
import { GameState, initGameState } from "../state/gameState";

export function game(
	state: GameState = initGameState,
	action: Action & { payload?: any }
) {
	switch (action.type) {
		case actionTypes.SET_IS_PLAYING:
			return {
				...state,
				isPlaying: action.payload,
			};
		case actionTypes.SET_IS_SETTINGS_VISIBLE:
			return {
				...state,
				isSettingsVisible: action.payload,
			};
		case actionTypes.SET_IS_RESET:
			return {
				...state,
				isReset: action.payload,
			};
		case actionTypes.SET_USERPIC:
			return {
				...state,
				userpic: action.payload,
			};
		case actionTypes.GO_TO_GAME:
			return {
				...state,
				isLogout: false,
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				isLogout: true,
			};
	}

	return state;
}
