import { shallow } from "enzyme";
import { Cell, CellState, CellModel } from "./Cell";
import React from "react";

describe("Cell is rendered", () => {
  it.each`
    stateName  | state
    ${"alive"} | ${CellState.alive}
    ${"dead"}  | ${CellState.dead}
  `(`when cell is $stateName`, (state) => {
    const cellModel: CellModel = {
      cellState: state,
      row: 0,
      column: 0,
    };
    const cell = shallow(<Cell cell={cellModel} onClick={jest.fn()} />);

    expect(cell.exists()).toBeTruthy();
  });
});

describe("When click on cell", () => {
  it("should call handler with row and column numbers", () => {
    const mock = jest.fn();
    const cellModel: CellModel = {
      cellState: CellState.dead,
      row: 4,
      column: 44,
    };
    const wrapper = shallow(<Cell cell={cellModel} onClick={mock} />);

    wrapper.simulate("click");

    expect(mock).toBeCalledWith(44, 4);
  });
});
