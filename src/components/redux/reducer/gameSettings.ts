import { Action } from "redux";
import * as actionTypes from "../actions";
import {
  initGameSettingsState,
  GameSettingsState,
} from "../state/gameSettingsState";

export function gameSettings(
  state: GameSettingsState = initGameSettingsState,
  action: Action & { payload?: any }
) {
  switch (action.type) {
    case actionTypes.SET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
  }

  return state;
}
