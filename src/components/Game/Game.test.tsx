import React from "react";
import { Game } from "./Game";
import { mount } from "enzyme";

describe("When click on settings button", () => {
  it("should show settings form", async () => {
    const wrapper = mount(<Game />);
    const settingsBtn = wrapper.findWhere((x) => x.key() === "settingsBtn");
    const settingsFormBefore = wrapper.findWhere(
      (x) => x.key() === "settingsForm"
    );

    settingsBtn.simulate("click");

    const settingsFormAfter = wrapper.findWhere(
      (x) => x.key() === "settingsForm"
    );
    expect(settingsFormBefore.isEmpty()).toBeTruthy();
    expect(settingsFormAfter.isEmpty()).toBeFalsy();
  });
});

describe("When click on play button", () => {
  it("should change play|pause state", async () => {
    const wrapper = mount(<Game />);
    const settingsBtn = wrapper.findWhere((x) => x.key() === "playBtn");
    const isPlayingBefore = wrapper.state("isPlaying");

    settingsBtn.simulate("click");

    const isPlayingAfter = wrapper.state("isPlaying");
    expect(isPlayingBefore).toBeFalsy();
    expect(isPlayingAfter).toBeTruthy();
  });
});
