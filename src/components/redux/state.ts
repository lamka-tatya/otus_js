import { User } from "@models/User";
import { CellRow } from "@models/CellRow";

export interface GameSettingsState {
  height: number;
  width: number;
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  frequency: number;
}
export const initGameSettingsState: GameSettingsState = {
  height: 350,
  width: 350,
  rowCount: 10,
  columnCount: 10,
  fillingPercent: 30,
  frequency: 1,
};

export interface FieldState {
  rows: CellRow[];
}
export const initFieldState: FieldState = { rows: [] };

export interface GameState {
  user?: User;
  gameSettings: GameSettingsState;
  field: FieldState;
}
export const initGameState: GameState = {
  user: undefined,
  gameSettings: initGameSettingsState,
  field: initFieldState,
};
