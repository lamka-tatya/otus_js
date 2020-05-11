import React from "react";
import { Settings } from "./Settings";
import { render, fireEvent, wait } from "@testing-library/react";

const changeNumberInput = async (input: Element, value: number) => {
  await wait(() => {
    fireEvent.change(input, {
      target: {
        value,
      },
    });
  });
};

describe("When change settings and call submit", () => {
  it("should call handler with new values", async () => {
    const jestMock = jest.fn();
    const { container } = render(
      <Settings
        visible={true}
        settings={{
          height: 123,
          width: 123,
          rowCount: 3,
          columnCount: 3,
          emptyPercent: 3,
          frequency: 4,
        }}
        onSubmit={jestMock}
        onCancel={jest.fn()}
      />
    );
    const frequency = container.querySelector('input[name="frequency"]');
    const emptyPercent = container.querySelector('input[name="emptyPercent"]');
    const height = container.querySelector('input[name="height"]');
    const width = container.querySelector('input[name="width"]');
    const columnCount = container.querySelector('input[name="columnCount"]');
    const rowCount = container.querySelector('input[name="rowCount"]');
    const submit = container.querySelector('button[type="submit"]');

    await changeNumberInput(frequency!, 1);
    await changeNumberInput(emptyPercent!, 2);
    await changeNumberInput(height!, 3);
    await changeNumberInput(width!, 4);
    await changeNumberInput(columnCount!, 5);
    await changeNumberInput(rowCount!, 6);
    await wait(() => {
      fireEvent.click(submit!);
    });

    expect(jestMock).toBeCalledWith(
      expect.objectContaining({
        height: 3,
        width: 4,
        rowCount: 6,
        columnCount: 5,
        emptyPercent: 2,
        frequency: 1,
      }),
      expect.anything()
    );
  });
});
