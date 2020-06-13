import {
  initGameSettingsState,
  GameSettingsState,
  FieldState,
  initFieldState,
} from "./state";
import { Action } from "redux";
import * as actionTypes from "./actions";
import { combineReducers } from "redux";
import { User } from "@models/User";

export function user(
  state: User | undefined = undefined,
  action: Action & { payload?: any }
) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
  }

  return state;
}

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

export function field(
  state: FieldState = initFieldState,
  action: Action & { payload?: any }
) {
  switch (action.type) {
    case actionTypes.SET_FIELD:
      return {
        ...state,
        field: action.payload,
      };
  }

  return state;
}

export const reducer = combineReducers({
  user,
  gameSettings,
  field,
});
