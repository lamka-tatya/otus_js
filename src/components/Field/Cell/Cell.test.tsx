import { shallow } from "enzyme";
import { Cell, CellState } from "./Cell";
import React from "react";

describe("Cell is rendered", () => {
  it("when cell is alive", () => {
    const html = shallow(
      <Cell cellState={CellState.alive} row={0} column={0} />
    ).html();

    expect(html).toBe('<div class="cell cell-is-alive"></div>');
  });

  it("when cell is dead", () => {
    const html = shallow(
      <Cell cellState={CellState.dead} row={0} column={0} />
    ).html();

    expect(html).toBe('<div class="cell cell-is-dead"></div>');
  });

  it("when cell is empty", () => {
    const html = shallow(
      <Cell cellState={CellState.empty} row={0} column={0} />
    ).html();

    expect(html).toBe('<div class="cell cell-is-empty"></div>');
  });
});
