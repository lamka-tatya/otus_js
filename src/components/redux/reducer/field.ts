import { Action } from "redux";
import * as actionTypes from "../actions";
import { FieldState, initFieldState } from "../state/fieldState";

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
