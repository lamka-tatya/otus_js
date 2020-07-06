import * as actions from "../actions";
import { GameState, initGameState } from "../state/gameState";
import { createReducer } from "@reduxjs/toolkit";

export const game = createReducer<GameState>(initGameState, {
  [actions.setIsPlaying.type]: (state, action) => {
    return {
      ...state,
      isPlaying: action.payload,
    };
  },
  [actions.setIsSettingsVisible.type]: (state, action) => {
    return {
      ...state,
      isSettingsVisible: action.payload,
    };
  },
  [actions.setIsReset.type]: (state, action) => {
    return {
      ...state,
      isReset: action.payload,
    };
  },
  [actions.setUserpic.type]: (state, action) => {
    return {
      ...state,
      userpic: action.payload,
    };
  },
  [actions.goToGame.type]: (state, _) => {
    return {
      ...state,
      isLogout: false,
    };
  },
  [actions.logout.type]: (state, _) => {
    return {
      ...state,
      isLogout: true,
    };
  },
});
