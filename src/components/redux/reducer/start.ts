import { Action } from "redux";
import * as actionTypes from "../actions";
import { StartState, initStartState } from "../state/startState";

export function start(
	state: StartState = initStartState,
	action: Action & { payload?: any }
) {
	switch (action.type) {
		case actionTypes.SET_USER_NAME:
			return {
				...state,
				userName: action.payload,
			};
		case actionTypes.SET_USER_GENDER:
			return {
				...state,
				userGender: action.payload,
			};
		case actionTypes.GO_TO_GAME:
			return {
				...state,
				isGoGame: true,
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				isGoGame: false,
			};
	}

	return state;
}
