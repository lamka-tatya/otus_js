import { reducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";
import { userpicSaga } from "./saga/userpicSaga";

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield fork(userpicSaga);
}

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof reducer>;
