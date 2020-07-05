import React from "react";
import { Start } from ".";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initAppState } from "@/redux/state";
import { SET_USER_NAME } from "@/redux/actions";

let wrapper: ReactWrapper;
let store: any;
const mockStore = configureStore([]);

beforeEach(() => {
  localStorage.clear();
  store = mockStore(initAppState);

  wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Start />
      </BrowserRouter>
    </Provider>
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

	expect(store.getActions()).toEqual(
		expect.arrayContaining([
		  expect.objectContaining({
			type: SET_USER_NAME,
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
