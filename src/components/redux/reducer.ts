import { initGameState, GameState } from "./state";
import { Action } from "redux";
import * as actionTypes from "./actions";

export function reducer(
  state: GameState = initGameState,
  action: Action & { payload?: any }
) {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return {
        ...state,
        field: action.payload,
      };
    case actionTypes.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }

  return state;
}
