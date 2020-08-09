import { initialAppState, rootReducer } from "../reducer";
import { expectSaga } from "redux-saga-test-plan";
import { fieldSaga } from "./fieldSaga";
import { CellState } from "@models/CellState";
import { initSettingsState } from "../state/gameState";
import { setSettings, playGame } from "../reducer/game";
import { delay } from "redux-saga/effects";
import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";

describe("Field saga", () => {
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
      ...result.storeState.game.field.map((x: CellRow) => x.cells)
    );
    expect(
      allCells.findIndex((x: CellModel) => x.cellState === CellState.alive)
    ).toBe(-1);
  });
});
