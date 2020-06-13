import { mount } from "enzyme";
import React from "react";
import { App } from ".";

describe("When render application", () => {
  it("should not show settings", () => {
    const wrapper = mount(<App />);

    const settingsForm = wrapper.findWhere((x) => x.key() === "settingsForm");

    expect(settingsForm.exists()).toBeFalsy();
  });
});
