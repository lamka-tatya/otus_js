import { rootReducer, reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { userpicSaga } from "./saga/userpicSaga";
import { fieldSaga } from "./saga/fieldSaga";

export const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield fork(userpicSaga);
  yield fork(fieldSaga);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof reducer>;
