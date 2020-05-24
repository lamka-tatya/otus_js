import React from "react";
import { Game } from "./Game";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";

let wrapper: ReactWrapper;

beforeEach(() => {
  localStorage.setItem("userName", "test");
  localStorage.setItem("userGender", "robot");

  wrapper = mount(
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  );
});

describe("When click on settings button", () => {
  it("should show settings form", () => {
    const settingsBtn = wrapper.findWhere((x) => x.key() === "settingsBtn");
    const settingsIsVisibleBefore = wrapper
      .findWhere((x) => x.key() === "settingsWindow")
      .props().visible;

    settingsBtn.simulate("click");

    const settingsIsVisibleAfter = wrapper
      .findWhere((x) => x.key() === "settingsWindow")
      .props().visible;
    expect(settingsIsVisibleBefore).toBeFalsy();
    expect(settingsIsVisibleAfter).toBeTruthy();
  });
});

describe("When click on play button", () => {
  it("should change play|pause state", () => {
    const playBtn = wrapper.findWhere((x) => x.key() === "playBtn");
    const gameIsPlayingBefore = wrapper
      .findWhere((x) => x.key() === "field")
      .props().isPlaying;

    playBtn.simulate("click");

    const gameIsPlayingAfter = wrapper
      .findWhere((x) => x.key() === "field")
      .props().isPlaying;
    expect(gameIsPlayingBefore).toBeFalsy();
    expect(gameIsPlayingAfter).toBeTruthy();
  });
});

describe("When click on reset button", () => {
  it("should purge isReset state after reset", () => {
    const resetBtn = wrapper.findWhere((x) => x.key() === "resetBtn");
    const isResetBefore = wrapper.findWhere((x) => x.key() === "field").props()
      .isReset;

    resetBtn.simulate("click");

    const isResetAfter = wrapper.findWhere((x) => x.key() === "field").props()
      .isReset;
    expect(isResetBefore).toBeFalsy();
    expect(isResetAfter).toBeFalsy();
  });
});
