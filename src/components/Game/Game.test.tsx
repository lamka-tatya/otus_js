import React from "react";
import { Game, GameState } from "./Game";
import { mount, ReactWrapper } from "enzyme";

let wrapper: ReactWrapper;

beforeEach(() => {
  wrapper = mount(<Game />);
});

describe("When click on settings button", () => {
  it("should show settings form", async () => {
    const settingsBtn = wrapper.findWhere((x) => x.key() === "settingsBtn");
    const settingsIsVisibleBefore = wrapper.state("isSettingsVisible");

    settingsBtn.simulate("click");

    const settingsIsVisibleAfter = wrapper.state("isSettingsVisible");
    expect(settingsIsVisibleBefore).toBeFalsy();
    expect(settingsIsVisibleAfter).toBeTruthy();
  });
});

describe("When click on play button", () => {
  it("should change play|pause state", async () => {
    const settingsBtn = wrapper.findWhere((x) => x.key() === "playBtn");
    const isPlayingBefore = wrapper.state("isPlaying");

    settingsBtn.simulate("click");

    const isPlayingAfter = wrapper.state("isPlaying");
    expect(isPlayingBefore).toBeFalsy();
    expect(isPlayingAfter).toBeTruthy();
  });
});
