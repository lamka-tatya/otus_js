import { initGameState } from "../state/gameState";
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    setIsSettingsVisible(state, action) {
      state.isSettingsVisible = action.payload;
    },
    setIsReset(state, action) {
      state.isReset = action.payload;
    },
    setUserpic(state, action) {
      state.userpic = action.payload;
    },
    goToGame(state, _) {
      state.isLogout = false;
      state.isGoGame = true;
    },
    logout(state) {
      state.isLogout = true;
      state.isGoGame = false;
    },
    setSettings(state, action) {
      state.settings = action.payload;
    },
  },
});

export const {
  setSettings,
  setIsPlaying,
  setIsSettingsVisible,
  setIsReset,
  setUserpic,
  goToGame,
  logout,
} = gameSlice.actions;
export default gameSlice.reducer;