import React from "react";
import { Start } from "./Start";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { actions } from "@modules/Start/reducer";
import { initialAppState } from "@/redux/reducer";

describe("When render start", () => {
  let wrapper: ReactWrapper;
  let store: any;
  const mockStore = configureStore([]);

  beforeEach(() => {
    localStorage.clear();
    store = mockStore(initialAppState);

    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Start />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should be able to change name", () => {
    const name = wrapper.find('input[name="userName"]');

    name.simulate("change", {
      target: {
        value: "test name",
      },
    });

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: actions.setUserName.type,
          payload: "test name",
        }),
      ])
    );
  });

  //  TODO: move to saga test

  //   it("should save user name to localStorage", () => {
  //     const form = wrapper.find('form[name="startForm"]');
  //     const userNameBefore = localStorage.getItem("userName");
  //     const name = wrapper.find('input[name="userName"]');

  //     name.simulate("change", {
  //       target: {
  //         value: "test name",
  //       },
  //     });
  //     form.simulate("submit");

  //     const userNameAfter = localStorage.getItem("userName");
  //     expect(userNameBefore).toBeUndefined;
  //     expect(userNameAfter).toBe("test name");
  //   });

  //   it("should save user gender to localStorage", () => {
  //     const form = wrapper.find('form[name="startForm"]');
  //     const userGenderBefore = localStorage.getItem("userGender");
  //     const gender = wrapper.find('input[value="male"]');

  //     gender.simulate("change", {
  //       target: {
  //         value: "male",
  //       },
  //     });
  //     form.simulate("submit");

  //     const userGenderAfter = localStorage.getItem("userGender");
  //     expect(userGenderBefore).toBeUndefined;
  //     expect(userGenderAfter).toBe("male");
  //   });
});
