import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { App } from ".";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { sagaMiddleware, store } from "@/redux/store";
import { combineReducers } from "redux";
import { restore } from "./redux/reducer";

describe("On app start", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    localStorage.clear();

    store.dispatch(restore());

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it("should not show settings", () => {
    const settingsForm = wrapper.findWhere((x) => x.key() === "settingsForm");

    expect(settingsForm.exists()).toBeFalsy();
  });

  it("should not go to the game if name is not set", () => {
    const form = wrapper.find('form[name="startForm"]');

    form.simulate("submit");

    expect(window.location.href).toBe("http://localhost/");
  });

  it("should go to the game if name is set", async () => {
    const form = wrapper.find('form[name="startForm"]');
    const name = wrapper.find('input[name="userName"]');

    expect(window.location.href).toBe("http://localhost/");

    name.simulate("change", {
      target: {
        value: "test name",
      },
    });
    form.simulate("submit");

    expect(window.location.href).toBe("http://localhost/game");
  });
});
