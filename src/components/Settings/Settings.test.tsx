import { mount } from "enzyme";
import React from "react";
import { Settings } from "./Settings";

describe("When change width", () => {
  it("should call handler with new value", () => {
    const jestMock = jest.fn();
    const wrapper = mount(
      <Settings
        onWidthChange={jestMock}
        onHeightChange={jest.fn()}
        initHeight={30}
        initWidth={30}
      />
    );

    wrapper
      .findWhere((x) => x.key() === "width")
      .simulate("change", { target: { value: "123" } });

    expect(jestMock).toBeCalledWith(123);
  });
});

describe("When change height", () => {
  it("should call handler with new value", () => {
    const jestMock = jest.fn();
    const wrapper = mount(
      <Settings
        onWidthChange={jest.fn()}
        onHeightChange={jestMock}
        initHeight={30}
        initWidth={30}
      />
    );

    wrapper
      .findWhere((x) => x.key() === "height")
      .simulate("change", { target: { value: "654" } });

    expect(jestMock).toBeCalledWith(654);
  });
});
