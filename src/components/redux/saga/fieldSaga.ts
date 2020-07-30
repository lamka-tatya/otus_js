import { put, call, takeLatest, select, takeEvery } from "redux-saga/effects";
import { setSettings, reset, goToGame } from "../reducer/game";
import { setField } from "../reducer/field";
import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";
import { CellState } from "@models/CellState";
import { AppState } from "../store";

export const selectors = {
  settings: ({ game }: AppState) => game.settings,
};

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

export function* fieldSaga() {
  yield takeEvery([setSettings.type, goToGame.type, reset.type], prepareField);
}
