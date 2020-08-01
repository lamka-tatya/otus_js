import {
  put,
  call,
  select,
  takeEvery,
  take,
  all,
  takeLatest,
  race,
  fork,
  delay,
  cancel,
} from "redux-saga/effects";
import {
  setSettings,
  reset,
  goToGame,
  playGame,
  stopGame,
} from "../reducer/game";
import { setField, makeCellAlive, selectors } from "../reducer/field";
import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";
import { CellState } from "@models/CellState";

export function* prepareField({
  payload,
  type,
}: ReturnType<typeof setSettings> | ReturnType<typeof reset>) {
  const { columnCount, rowCount, fillingPercent } =
    type === setSettings.type ? payload : yield select(selectors.settings);

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

  yield put(setField(result));
}

function* prepareFieldSaga() {
  yield takeLatest([setSettings.type, goToGame.type, reset.type], prepareField);
}

export function* makeAlive({ payload }: ReturnType<typeof makeCellAlive>) {
  const oldField = yield select(selectors.field);
  const { colIndex, rowIndex } = payload;

  if (oldField.rows[rowIndex].cells[colIndex].cellState !== CellState.alive) {
    const newRows = [...oldField.rows];
    const rowCells = [...newRows[rowIndex].cells];
    const cell = rowCells[colIndex];
    rowCells[colIndex] = { ...cell, cellState: CellState.alive };
    newRows[rowIndex] = { cells: rowCells };

    yield put(setField(newRows));
  }
}

function* makeCellAliveSaga() {
  yield takeEvery(makeCellAlive.type, makeAlive);
}

// todo memorize
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

function* nextGeneration() {
  const oldField = yield select(selectors.field);
  const { columnCount } = yield select(selectors.settings);
  const getCellIndex = (index: number) =>
    index < 0 ? 0 : index > columnCount ? columnCount : index;
  const nextFieldRows: CellRow[] = [];

  oldField.rows.forEach(
    (row: CellRow, rowIndex: number, allRows: CellRow[]) => {
      const newRowCells: CellModel[] = [];
      row.cells.forEach((cell, cellIndex) => {
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
        row.cells[cellIndex - 1] && neighbours.push(row.cells[cellIndex - 1]);
        row.cells[cellIndex + 1] && neighbours.push(row.cells[cellIndex + 1]);
        newRowCells.push(getNewCell(cell, neighbours));
      });
      nextFieldRows.push({ cells: newRowCells });
    }
  );

  yield put(setField(nextFieldRows));
}

function* playWorker() {
  const { frequency } = yield select(selectors.settings);

  while (true) {
    yield call(nextGeneration);
    yield delay(frequency * 100);
  }
}

function* playGameFlow() {
  const playTask = yield fork(playWorker);
  yield take(stopGame.type);
  yield cancel(playTask);
}

function* startGameSaga() {
  yield takeEvery(playGame.type, playGameFlow);
}

export function* fieldSaga() {
  yield all([prepareFieldSaga(), makeCellAliveSaga(), startGameSaga()]);
}
