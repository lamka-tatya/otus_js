import { combineReducers } from "redux";
import authReducer from "./auth";
import gameReducer from "./game";
import { startSlice } from "@modules/Start";
import { createAction } from "@reduxjs/toolkit";
import { initStartState } from "@modules/Start/startState";
import { initAuthState } from "../state/authState";
import { initGameState } from "../state/gameState";

export const initialAppState = {
  start: initStartState,
  auth: initAuthState,
  game: initGameState,
};

export const reducer = combineReducers({
  start: startSlice.reducer,
  auth: authReducer,
  game: gameReducer,
});

export const restore = createAction("restore");

export const rootReducer = (state: any, action: any) => {
  if (action.type === restore.type) {
    state = { ...initialAppState };
  }

  return reducer(state, action);
};
