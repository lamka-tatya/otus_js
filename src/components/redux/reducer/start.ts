import * as actions from "../actions";
import { StartState, initStartState } from "../state/startState";
import { createReducer } from "@reduxjs/toolkit";

export const start = createReducer<StartState>(initStartState, {
  [actions.setUserName.type]: (state, action) => {
    state.userName = action.payload;
    return state;
  },
  [actions.setUserGender.type]: (state, action) => {
    state.userGender = action.payload;
    return state;
  },
  [actions.goToGame.type]: (state, _) => {
    state.isGoGame = true;
    return state;
  },
  [actions.logout.type]: (state, _) => {
    state.isGoGame = false;
    return state;
  },
});
