import { shallow } from "enzyme";
import { Output } from "./Output";
import React from "react";

describe("When Output is rendered", () => {
  describe("and userName is empty", () => {
    it("should be empty", () => {
      const wrapper = shallow(<Output userName={""} />);

      expect(wrapper).toEqual({});
    });
  });

  describe("and userName is AAA", () => {
    it("should has text 'Hello, AAA!'", () => {
      const wrapper = shallow(<Output userName={"AAA"} />);

      expect(wrapper.text()).toBe("Hello, AAA!");
    });
  });
});
