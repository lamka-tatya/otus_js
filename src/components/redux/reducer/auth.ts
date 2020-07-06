import * as actions from "../actions";
import { AuthState, initAuthState } from "../state/authState";
import { createReducer } from "@reduxjs/toolkit";

export const auth = createReducer<AuthState>(initAuthState, {
  [actions.setUser.type]: (state, action) => {
    return {
      ...state,
      user: action.payload,
    };
  },
  [actions.setIsChecking.type]: (state, action) => {
    return {
      ...state,
      isChecking: action.payload,
    };
  },
});
