import { shallow } from "enzyme";
import { HelloButton } from "./HelloButton";
import React from "react";

describe("When HelloButton is rendered", () => {
  it("should has text 'Hello!'", () => {
    const wrapper = shallow(<HelloButton onClick={jest.fn()} />);

    expect(wrapper.matchesElement(<button>Hello!</button>)).toBeTruthy();
  });
});

describe("When click HelloButton", () => {
  it("should call handler once", () => {
    const jestMock = jest.fn();
    const wrapper = shallow(<HelloButton onClick={jestMock} />);

    wrapper.simulate("click");

    expect(jestMock).toBeCalledTimes(1);
  });
});
