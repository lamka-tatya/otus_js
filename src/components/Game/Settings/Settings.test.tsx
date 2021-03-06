import React from "react";
import { Settings } from ".";
import { render, fireEvent, wait } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initStartState } from "@modules/Start/startState";
import { initGameState } from "@/redux/state/gameState";
import { initAuthState } from "@/redux/state/authState";
import { setSettings } from "@/redux/reducer/game";

const changeNumberInput = (input: Element, value: number): Promise<void> => {
  return wait(() => {
    fireEvent.change(input, {
      target: {
        value,
      },
    });
  });
};

describe("When change settings and call submit", () => {
  it("should call handler with new values", async () => {
    const mockStore = configureStore([]);
    const store = mockStore({
      start: initStartState,
      auth: initAuthState,
      game: { ...initGameState, isSettingsVisible: true },
      field: [],
    });
    const { container } = render(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
    const frequency = container.querySelector('input[name="frequency"]');
    const fillingPercent = container.querySelector(
      'input[name="fillingPercent"]'
    );
    const height = container.querySelector('input[name="height"]');
    const width = container.querySelector('input[name="width"]');
    const columnCount = container.querySelector('input[name="columnCount"]');
    const rowCount = container.querySelector('input[name="rowCount"]');
    const submit = container.querySelector('button[type="submit"]');

    await changeNumberInput(frequency!, 1);
    await changeNumberInput(fillingPercent!, 2);
    await changeNumberInput(height!, 3);
    await changeNumberInput(width!, 4);
    await changeNumberInput(columnCount!, 5);
    await changeNumberInput(rowCount!, 6);
    await wait(() => {
      fireEvent.click(submit!);
    });

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: setSettings.type,
          payload: {
            height: 3,
            width: 4,
            rowCount: 6,
            columnCount: 5,
            fillingPercent: 2,
            frequency: 1,
          },
        }),
      ])
    );
  });
});
