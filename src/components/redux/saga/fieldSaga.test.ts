import { initialAppState, rootReducer } from "../reducer";
import { expectSaga } from "redux-saga-test-plan";
import { fieldSaga } from "./fieldSaga";
import { makeCellAlive } from "../reducer/field";
import { CellState } from "@models/CellState";
import { initGameState, initSettingsState } from "../state/gameState";
import { setSettings, playGame } from "../reducer/game";
import { delay } from "redux-saga/effects";
import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";

describe("Field saga", () => {
  it("should make cell alive on click", async () => {
    const initialState = {
      ...initialAppState,
      field: {
        rows: [
          {
            cells: [
              {
                cellState: CellState.dead,
                isNewState: false,
              },
            ],
          },
        ],
      },
    };

    const saga = expectSaga(fieldSaga).withReducer(rootReducer, initialState);

    const result = await saga
      .dispatch(makeCellAlive({ colIndex: 0, rowIndex: 0 }))
      .run();

    expect(result.storeState.field.rows[0].cells[0].cellState).toBe(
      CellState.alive
    );
  });
  it("should implement settings to field on set settings", async () => {
    const saga = expectSaga(fieldSaga).withReducer(
      rootReducer,
      initialAppState
    );

    const result = await saga
      .dispatch(
        setSettings({
          ...initSettingsState,
          rowCount: 23,
          columnCount: 11,
        })
      )
      .run();

    expect(result.storeState.field.rows.length).toBe(23);
    expect(result.storeState.field.rows[0].cells.length).toBe(11);
  });
  it("should end up with all cells dead if start game with 100% filling", async () => {
    const saga = expectSaga(fieldSaga).withReducer(
      rootReducer,
      initialAppState
    );

    const result = await saga
      .dispatch(
        setSettings({
          ...initSettingsState,
          fillingPercent: 100,
          frequency: 1,
        })
      )
      .dispatch(playGame())
      .run();

    delay(1000);

    const allCells = [].concat(
      ...result.storeState.field.rows.map((x: CellRow) => x.cells)
    );
    expect(
      allCells.findIndex((x: CellModel) => x.cellState === CellState.alive)
    ).toBe(-1);
  });
});
