import { getUserpic, createAvatar } from "./userpicSaga";
import { setUser } from "../reducer/auth";
import { setUserpic } from "../reducer/game";
import { put, call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

describe("When call userpic saga", () => {
  it("should set userpic", () => {
    const user = { name: "test", gender: "robot" };
    return expectSaga(getUserpic, {
      type: setUser.type,
      payload: user,
    })
      .provide([[call(createAvatar, user.gender, user.name), "test svg stub"]])
      .put(setUserpic("test svg stub"))
      .run();
  });

  it("should set empty userpic if gender not set", () => {
    const user = { name: "test" };
    return expectSaga(getUserpic, {
      type: setUser.type,
      payload: user,
    })
      .put(setUserpic(""))
      .run();
  });

  it("should set empty userpic if name not set", () => {
    const user = { gender: "robot" };
    return expectSaga(getUserpic, {
      type: setUser.type,
      payload: user,
    })
      .put(setUserpic(""))
      .run();
  });
});
