import { getUserpic } from "./userpicSaga";
import { setUser } from "../reducer/auth";
import { setUserpic } from "../reducer/game";
import { put } from "redux-saga/effects";

describe("When call userpic saga", () => {
  it("should set userpic", () => {
    const generator = getUserpic({
      type: setUser.type,
      payload: { name: "test", gender: "robot" },
    });

    const putSetUser = generator.next();
    const putValue = putSetUser.value as any;

    expect(putSetUser.done).toBeFalsy();
    expect(putValue.type).toBe("PUT");
    expect(putValue.payload.action).toEqual(
      expect.objectContaining({
        type: setUserpic.type,
        payload: expect.any(String),
      })
    );
  });

  it("should set empty userpic if gender not set", () => {
    const generator = getUserpic({
      type: setUser.type,
      payload: { name: "test" },
    });

    const putSetUser = generator.next();
    const putValue = putSetUser.value as any;

    expect(putSetUser.done).toBeFalsy();
    expect(putValue.type).toBe("PUT");
    expect(putValue.payload.action).toEqual(
      expect.objectContaining({
        type: setUserpic.type,
        payload: "",
      })
    );
  });

  it("should set empty userpic if name not set", () => {
    const generator = getUserpic({
      type: setUser.type,
      payload: { gender: "robot" },
    });

    const putSetUser = generator.next();
    const putValue = putSetUser.value as any;

    expect(putSetUser.done).toBeFalsy();
    expect(putValue.type).toBe("PUT");
    expect(putValue.payload.action).toEqual(
      expect.objectContaining({
        type: setUserpic.type,
        payload: "",
      })
    );
  });
});
