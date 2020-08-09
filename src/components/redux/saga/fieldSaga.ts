import {
  put,
  select,
  takeEvery,
  take,
  all,
  fork,
  delay,
  cancel,
} from "redux-saga/effects";
import { playGame, stopGame } from "../reducer/game";
import { setField, selectors, nextGeneration } from "../reducer/game";

function* playWorker() {
  const { frequency } = yield select(selectors.settings);

  while (true) {
    const nextFieldRows = yield select(nextGeneration);
    yield put(setField(nextFieldRows));
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
  yield all([startGameSaga()]);
}
