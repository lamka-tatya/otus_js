import * as actions from "../actions";
import { GameState, initGameState } from "../state/gameState";
import { createReducer } from "@reduxjs/toolkit";

export const game = createReducer<GameState>(initGameState, {
  [actions.setIsPlaying.type]: (state, action) => {
    state.isPlaying = action.payload;
    return state;
  },
  [actions.setIsSettingsVisible.type]: (state, action) => {
    state.isSettingsVisible = action.payload;
    return state;
  },
  [actions.setIsReset.type]: (state, action) => {
    state.isReset = action.payload;
    return state;
  },
  [actions.setUserpic.type]: (state, action) => {
    state.userpic = action.payload;
    return state;
  },
  [actions.goToGame.type]: (state, _) => {
    state.isLogout = false;
    return state;
  },
  [actions.logout.type]: (state, _) => {
    state.isLogout = true;
    return state;
  },
});
