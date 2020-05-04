import { mount } from "enzyme";
import React from "react";
import { App } from "./App";
import { FieldState } from "./Field/Field";

describe("When change field size", () => {
  it("should not change cells states", () => {
    const wrapper = mount(<App />);
    const deadCell = wrapper.find("button").first();
    deadCell.simulate("click");
    const cellStateBeforeChangeSize = (wrapper
      .findWhere((x) => x.key() === "field")
      .state() as FieldState).cells[0].cellState;

    wrapper
      .findWhere((x) => x.key() === "width")
      .simulate("change", { target: { value: "123" } });
    wrapper
      .findWhere((x) => x.key() === "height")
      .simulate("change", { target: { value: "123" } });

    const cellStateAfterChangeSize = (wrapper
      .findWhere((x) => x.key() === "field")
      .state() as FieldState).cells[0].cellState;
    expect(cellStateAfterChangeSize).toBe(cellStateBeforeChangeSize);
  });
});
