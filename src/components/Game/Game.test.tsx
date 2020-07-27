import React from "react";
import { Game } from ".";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import localStorageAuth from "@services/authService";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initStartState } from "@modules/Start/startState";
import { initFieldState } from "@/redux/state/fieldState";
import { initGameState } from "@/redux/state/gameState";
import {
  setIsSettingsVisible,
  setIsPlaying,
  setIsReset,
} from "@/redux/reducer/game";

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
          type: setIsSettingsVisible.type,
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
          type: setIsPlaying.type,
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
          type: setIsReset.type,
          payload: true,
        }),
      ])
    );
  });
});
