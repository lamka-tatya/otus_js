import { initGameState } from "../state/gameState";
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: initGameState,
  reducers: {
    playGame(state) {
      state.isPlaying = true;
    },
    stopGame(state) {
      state.isPlaying = false;
    },
    setIsSettingsVisible(state, action) {
      state.isSettingsVisible = action.payload;
    },
    /* eslint-disable @typescript-eslint/no-empty-function */
    reset(_) {},
    /* eslint-enable @typescript-eslint/no-empty-function */
    setUserpic(state, action) {
      state.userpic = action.payload;
    },
    goToGame(state) {
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
  playGame,
  stopGame,
  setIsSettingsVisible,
  reset,
  setUserpic,
  goToGame,
  logout,
} = gameSlice.actions;
export default gameSlice.reducer;
