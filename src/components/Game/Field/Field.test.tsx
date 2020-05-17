import { mount, render, shallow } from "enzyme";
import { Field, FieldState } from "./Field";
import React from "react";
import { CellState, CellModel } from "./Cell/Cell";

describe("Field is rendered with 2 columns and 2 rows", () => {
  it("should has 4 cells", () => {
    const wrapper = render(
      <Field
        width={200}
        height={200}
        columnCount={2}
        fillingPercent={0}
        rowCount={2}
      />
    );
    const cells = wrapper.find("button");

    expect(cells.length).toBe(4);
  });
});

describe("Dead cell is clicked", () => {
  it("should became alive", () => {
    const wrapper = mount(
      <Field
        width={200}
        height={200}
        columnCount={1}
        fillingPercent={0}
        rowCount={1}
      />
    );
    const deadCell = wrapper.find("button");

    deadCell.simulate("click");

    const cellState = (wrapper.state() as FieldState).cells[0].cellState;
    expect(cellState).toBe(CellState.alive);
  });
});

describe("Field is rendered with 10 columns and 10 rows", () => {
  it.each([
    [4, 4],
    [25, 25],
    [2, 2],
    [6, 6],
    [96, 96],
  ])(
    "and max alive percent is %s, it should has less or equal %s alive cells",
    (percent, maxAliveCount) => {
      const wrapper = mount(
        <Field
          width={200}
          height={200}
          columnCount={10}
          fillingPercent={percent}
          rowCount={10}
        />
      );

      const aliveCellsCount = wrapper
        .state<CellModel[]>("cells")
        .filter((x) => x.cellState === CellState.alive).length;

      expect(aliveCellsCount).toBeLessThanOrEqual(maxAliveCount);
    }
  );
});
