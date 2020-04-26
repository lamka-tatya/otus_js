import { mount, render, shallow } from "enzyme";
import Field, { FieldState } from "./Field";
import React from "react";
import { CellState } from "./Cell/Cell";

describe("Field is rendered with 2 columns and 2 rows", () => {
  it("should has 4 cells", () => {
    const wrapper = render(
      <Field columnCount={2} emptyPercent={0} rowCount={2} />
    );
    const cells = wrapper.find("button.cell");

    expect(cells.length).toBe(4);
  });
});

describe("Dead cell is clicked", () => {
  it("should became alive", () => {
    const wrapper = mount(
      <Field columnCount={1} emptyPercent={0} rowCount={1} />
    );
    const deadCell = wrapper.find("button.cell.cell-is-dead").first();

    deadCell.simulate("click");

    const cellState = (wrapper.state() as FieldState).cells[0].state;
    expect(cellState).toBe(CellState.alive);
  });
});
