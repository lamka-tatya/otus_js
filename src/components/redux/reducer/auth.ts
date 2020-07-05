import { Action } from "redux";
import * as actionTypes from "../actions";
import { AuthState, initAuthState } from "../state/authState";

export function auth(
	state: AuthState = initAuthState,
	action: Action & { payload?: any }
) {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				...state,
				user: action.payload,
			};
		case actionTypes.SET_IS_CHECKING:
			return {
				...state,
				isChecking: action.payload,
			};
	}

	return state;
}
