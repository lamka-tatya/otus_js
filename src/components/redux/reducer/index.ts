import { combineReducers } from "redux";
import authReducer from "./auth";
import fieldReducer from "./field";
import gameReducer from "./game";
import { startSlice } from "@modules/Start";
import { createReducer, createAction } from "@reduxjs/toolkit";
import { initStartState } from "@modules/Start/startState";
import { initFieldState } from "../state/fieldState";
import { initAuthState } from "../state/authState";
import { initGameState } from "../state/gameState";

export const initialAppState = {
  start: initStartState,
  auth: initAuthState,
  game: initGameState,
  field: initFieldState,
};

export const reducer = combineReducers({
  start: startSlice.reducer,
  auth: authReducer,
  game: gameReducer,
  field: fieldReducer,
});

export const restore = createAction("restore");

export const rootReducer = (state: any, action: any) => {
  if (action.type === restore.type) {
    state = { ...initialAppState };
  }

  return reducer(state, action);
};
