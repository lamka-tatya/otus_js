import React from "react";
import { Game } from ".";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import localStorageAuth from "@services/authService";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initStartState } from "@/redux/state/startState";
import { initSettingsState } from "@/redux/state/settingsState";
import { initFieldState } from "@/redux/state/fieldState";
import { initGameState } from "@/redux/state/gameState";
import {
  SET_IS_SETTINGS_VISIBLE,
  SET_IS_PLAYING,
  SET_IS_RESET,
} from "@/redux/actions";

let wrapper: ReactWrapper;
let store: any;
const mockStore = configureStore([]);

beforeEach(() => {
  localStorageAuth.login({ name: "test", gender: "robot" });

  store = mockStore({
    start: initStartState,
    auth: {
      user: {
        name: "test",
        gender: "robot",
      },
      isChecking: false,
    },
    game: initGameState,
    settings: initSettingsState,
    field: initFieldState,
  });

  wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Game />
      </BrowserRouter>
    </Provider>
  );
});

describe("When click on settings button", () => {
  it("should show settings form", () => {
    const settingsBtn = wrapper.findWhere((x) => x.key() === "settingsBtn");

    settingsBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: SET_IS_SETTINGS_VISIBLE,
          payload: true,
        }),
      ])
    );
  });
});

describe("When click on play button", () => {
  it("should change play|pause state", () => {
    const playBtn = wrapper.findWhere((x) => x.key() === "playBtn");

    playBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: SET_IS_PLAYING,
          payload: true,
        }),
      ])
    );
  });
});

describe("When click on reset button", () => {
  it("should purge isReset state after reset", () => {
    const resetBtn = wrapper.findWhere((x) => x.key() === "resetBtn");

    resetBtn.simulate("click");

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: SET_IS_RESET,
          payload: true,
        }),
      ])
    );
  });
});
