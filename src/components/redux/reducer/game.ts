import { initGameState, GameSettings } from "../state/gameState";
import { createSlice } from "@reduxjs/toolkit";
import { CellRow } from "@models/CellRow";
import { CellState } from "@models/CellState";
import { CellModel } from "@models/CellModel";
import { createSelector } from "reselect";
import { AppState } from "../store";

const prepareField = (settings: GameSettings) => {
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

const makeCellAliveField = (
  oldField: CellRow[],
  colIndex: number,
  rowIndex: number
) => {
  if (oldField[rowIndex].cells[colIndex].cellState !== CellState.alive) {
    const newRows = [...oldField];
    const rowCells = [...newRows[rowIndex].cells];
    const cell = rowCells[colIndex];
    rowCells[colIndex] = { ...cell, cellState: CellState.alive };
    newRows[rowIndex] = { cells: rowCells };

    return newRows;
  }
  return oldField;
};

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
    reset(state) {
      state.field = prepareField(state.settings);
    },
    setUserpic(state, action) {
      state.userpic = action.payload;
    },
    goToGame(state) {
      state.isLogout = false;
      state.isGoGame = true;
      state.field = prepareField(state.settings);
    },
    logout(state) {
      state.isLogout = true;
      state.isGoGame = false;
    },
    setSettings(state, action) {
      state.settings = action.payload;
      state.field = prepareField(action.payload);
    },
    setField(state, action) {
      state.field = action.payload;
    },
    makeCellAlive(state, action) {
      state.field = makeCellAliveField(
        state.field,
        action.payload.colIndex,
        action.payload.rowIndex
      );
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
  setField,
  makeCellAlive,
} = gameSlice.actions;
export default gameSlice.reducer;

export const selectors = {
  settings: ({ game }: AppState) => game.settings,
  field: ({ game }: AppState) => game.field,
  gameIsPlaying: ({ game }: AppState) => game.isPlaying,
};

function getNewCell(oldCell: CellModel, neighbours: CellModel[]): CellModel {
  const aliveNeighbourCount = neighbours.filter(
    (x) => x.cellState === CellState.alive
  ).length;

  if (
    (oldCell.cellState === CellState.alive &&
      (aliveNeighbourCount === 2 || aliveNeighbourCount === 3)) ||
    (oldCell.cellState === CellState.dead && aliveNeighbourCount === 3)
  ) {
    return {
      cellState: CellState.alive,
      isNewState: true,
    };
  }

  return {
    cellState: CellState.dead,
    isNewState: true,
  };
}

export const nextGeneration = createSelector(
  [selectors.field, selectors.settings],
  (oldField, settings) => {
    const getCellIndex = (index: number) =>
      index < 0
        ? 0
        : index > settings.columnCount
        ? settings.columnCount
        : index;

    return oldField.reduce(
      (
        newField: CellRow[],
        currentRow: CellRow,
        rowIndex: number,
        allRows: CellRow[]
      ) => {
        const newCells = currentRow.cells.reduce(
          (
            newRowCells: CellModel[],
            currentCell: CellModel,
            cellIndex: number,
            allCells: CellModel[]
          ) => {
            const neighbours: CellModel[] = [];
            allRows[rowIndex - 1] &&
              neighbours.push(
                ...allRows[rowIndex - 1].cells.slice(
                  getCellIndex(cellIndex - 1),
                  getCellIndex(cellIndex + 2)
                )
              );
            allRows[rowIndex + 1] &&
              neighbours.push(
                ...allRows[rowIndex + 1].cells.slice(
                  getCellIndex(cellIndex - 1),
                  getCellIndex(cellIndex + 2)
                )
              );
            allCells[cellIndex - 1] && neighbours.push(allCells[cellIndex - 1]);
            allCells[cellIndex + 1] && neighbours.push(allCells[cellIndex + 1]);
            newRowCells.push(getNewCell(currentCell, neighbours));
            return newRowCells;
          },
          []
        );

        newField.push({ cells: newCells });
        return newField;
      },
      []
    );
  }
);
