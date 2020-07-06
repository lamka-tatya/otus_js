import * as actions from "../actions";
import { AuthState, initAuthState } from "../state/authState";
import { createReducer } from "@reduxjs/toolkit";

export const auth = createReducer<AuthState>(initAuthState, {
  [actions.setUser.type]: (state, action) => {
    state.user = action.payload;
    return state;
  },
  [actions.setIsChecking.type]: (state, action) => {
    state.isChecking = action.payload;
    return state;
  },
});
