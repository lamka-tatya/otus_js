export interface GameSettings {
  height: number;
  width: number;
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  frequency: number;
}

export const initSettingsState: GameSettings = {
  height: 350,
  width: 350,
  rowCount: 10,
  columnCount: 10,
  fillingPercent: 30,
  frequency: 1,
};

export interface GameState {
  settings: GameSettings;
  isPlaying: boolean;
  isSettingsVisible: boolean;
  isReset: boolean;
  userpic: string;
  isLogout: boolean;
  isGoGame: boolean;
}

export const initGameState: GameState = {
  settings: initSettingsState,
  isPlaying: false,
  isSettingsVisible: false,
  isReset: false,
  userpic: "",
  isLogout: false,
  isGoGame: false,
};
