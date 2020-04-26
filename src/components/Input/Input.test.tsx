import { shallow, mount } from "enzyme";
import { Input } from "./Input";
import React from "react";

describe("When Input is rendered", () => {
  it("should has label with text 'Введите имя:'", () => {
    const wrapper = mount(<Input onChange={jest.fn()} />);
    const label = wrapper.find("label");

    expect(label.text()).toBe("Введите имя:");
  });

  it("should has empty input", () => {
    const wrapper = mount(<Input onChange={jest.fn()} />);
    const input = wrapper.find("input");

    expect(input.text()).toBe("");
  });
});

describe("When change Input", () => {
  it("should call handler once", () => {
    const jestMock = jest.fn();
    const wrapper = mount(<Input onChange={jestMock} />);

    wrapper.find("input").simulate("change");

    expect(jestMock).toBeCalledTimes(1);
  });

  it("should call handler with change value", () => {
    const jestMock = jest.fn();
    const wrapper = mount(<Input onChange={jestMock} />);

    wrapper.find("input").simulate("change", { target: { value: "qweqwe" } });

    expect(jestMock).toBeCalledWith("qweqwe");
  });
});
