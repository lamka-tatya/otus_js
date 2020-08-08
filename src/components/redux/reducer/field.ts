import { initFieldState } from "../state/fieldState";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { createSelector } from "reselect";
import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";
import { CellState } from "@models/CellState";

const fieldSlice = createSlice({
  name: "field",
  initialState: initFieldState,
  reducers: {
    setField(state, action) {
      state.rows = action.payload;
    },
    /* eslint-disable @typescript-eslint/no-empty-function */
    makeCellAlive(state, action) {},
    /* eslint-enable @typescript-eslint/no-empty-function */
  },
});

export const { setField, makeCellAlive } = fieldSlice.actions;
export default fieldSlice.reducer;

export const selectors = {
  settings: ({ game }: AppState) => game.settings,
  field: ({ field }: AppState) => field,
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

    return (oldField.rows as CellRow[]).reduce(
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
