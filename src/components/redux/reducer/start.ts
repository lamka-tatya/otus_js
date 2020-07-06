import { Action } from "redux";
import * as actions from "../actions";
import { StartState, initStartState } from "../state/startState";
import { createReducer } from "@reduxjs/toolkit";

export const start = createReducer<StartState>(initStartState, {
  [actions.setUserName.type]: (state, action) => {
    return {
      ...state,
      userName: action.payload,
    };
  },
  [actions.setUserGender.type]: (state, action) => {
    return {
      ...state,
      userGender: action.payload,
    };
  },
  [actions.goToGame.type]: (state, _) => {
    return {
      ...state,
      isGoGame: true,
    };
  },
  [actions.logout.type]: (state, _) => {
    return {
      ...state,
      isGoGame: false,
    };
  },
});
