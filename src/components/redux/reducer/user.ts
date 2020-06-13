import { User } from "@models/User";
import { Action } from "redux";
import * as actionTypes from "../actions";

export function user(
  state: User | null = null,
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
