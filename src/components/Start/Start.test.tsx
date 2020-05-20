import React from "react";
import Start from "./Start";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";

let wrapper: ReactWrapper;

beforeEach(() => {
  localStorage.clear();

  wrapper = mount(
    <BrowserRouter>
      <Start />
    </BrowserRouter>
  );
});

describe("When render start", () => {
  it("should be able to change name", () => {
    const name = wrapper.find('input[name="userName"]');

    name.simulate("change", {
      target: {
        value: "test name",
      },
    });

    expect((name.instance() as any).value).toBe("test name");
  });

  it("should save user name to localStorage", () => {
    const form = wrapper.find('form[name="startForm"]');
    const userNameBefore = localStorage.getItem("userName");
    const name = wrapper.find('input[name="userName"]');

    name.simulate("change", {
      target: {
        value: "test name",
      },
    });
    form.simulate("submit");

    const userNameAfter = localStorage.getItem("userName");
    expect(userNameBefore).toBeUndefined;
    expect(userNameAfter).toBe("test name");
  });

  it("should save user gender to localStorage", () => {
    const form = wrapper.find('form[name="startForm"]');
    const userGenderBefore = localStorage.getItem("userGender");
    const gender = wrapper.find('input[value="male"]');

    gender.simulate("change", {
      target: {
        value: "male",
      },
    });
    form.simulate("submit");

    const userGenderAfter = localStorage.getItem("userGender");
    expect(userGenderBefore).toBeUndefined;
    expect(userGenderAfter).toBe("male");
  });
});
