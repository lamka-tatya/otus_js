export type Gender = "robot" | "male" | "female";

export interface User {
  name: string;
  gender: Gender;
}

export interface GameSettings {
  height: number;
  width: number;
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  frequency: number;
}

export enum CellState {
  alive = "alive",
  dead = "dead",
}

export interface CellModel {
  cellState: CellState;
  isNewState: boolean;
}

export interface CellRow {
  cells: CellModel[];
}

export interface GameState {
  user?: User;
  gameSettings: GameSettings;
  field: CellRow[];
}

export const initGameState: GameState = {
  user: undefined,
  gameSettings: {
    height: 350,
    width: 350,
    rowCount: 10,
    columnCount: 10,
    fillingPercent: 30,
    frequency: 1,
  },
  field: [],
};
