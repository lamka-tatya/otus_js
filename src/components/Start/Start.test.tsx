import React from "react";
import { Start } from "./Start";
import { render, fireEvent, wait } from "@testing-library/react";

describe("When render start", () => {
  it("should be able to change name", async () => {
    const { container } = render(<Start onSubmit={jest.fn()} />);
    const name = container.querySelector('input[name="name"]');

    await wait(() => {
      fireEvent.change(name!, {
        target: {
          value: "test name",
        },
      });
    });

    expect((name as any).value).toBe("test name");
  });

  it("should be able call submit", async () => {
    const jestMock = jest.fn();
    const { container } = render(<Start onSubmit={jestMock} />);
    const submit = container.querySelector('button[type="submit"]');

    await wait(() => {
      fireEvent.click(submit!);
    });

    expect(jestMock).toBeCalledTimes(1);
  });
});
