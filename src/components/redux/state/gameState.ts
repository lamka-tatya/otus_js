import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";
import { CellState } from "@models/CellState";

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
  frequency: 10,
};

export interface GameState {
  settings: GameSettings;
  isPlaying: boolean;
  isSettingsVisible: boolean;
  userpic: string;
  isLogout: boolean;
  isGoGame: boolean;
  field: CellRow[];
}

export const getRandomField = (settings: GameSettings) => {
  const { columnCount, rowCount, fillingPercent } = settings;
  const result: CellRow[] = [];
  const cellsCount = columnCount * rowCount;
  const maxAliveCount = (cellsCount / 100) * fillingPercent;
  let aliveCount = 0;

  for (let y = 0; y < rowCount; y++) {
    const rowCells: CellModel[] = [];

    for (let x = 0; x < columnCount; x++) {
      let cellState = CellState.dead;

      if (Math.round(Math.random() * 100) <= fillingPercent) {
        aliveCount++;
        if (aliveCount <= maxAliveCount) {
          cellState = CellState.alive;
        }
      }

      rowCells.push({
        cellState,
        isNewState: false,
      });
    }
    result.push({ cells: rowCells });
  }
  return result;
};

export const initGameState: GameState = {
  settings: initSettingsState,
  isPlaying: false,
  isSettingsVisible: false,
  userpic: "",
  isLogout: false,
  isGoGame: false,
  field: getRandomField(initSettingsState),
};
