import { shallow } from "enzyme";
import { Cell } from ".";
import React from "react";
import { CellModel, CellState } from "@/redux/state";

describe("Cell is rendered", () => {
  it.each`
    stateName  | state
    ${"alive"} | ${CellState.alive}
    ${"dead"}  | ${CellState.dead}
  `(`when cell is $stateName`, (state) => {
    const cellModel: CellModel = {
      cellState: state,
      isNewState: false,
    };
    const cell = shallow(<Cell cell={cellModel} onClick={jest.fn()} />);

    expect(cell.exists()).toBeTruthy();
  });
});

describe("When click on cell", () => {
  it("should call handler from props", () => {
    const mock = jest.fn();
    const cellModel: CellModel = {
      cellState: CellState.dead,
      isNewState: false,
    };
    const wrapper = shallow(<Cell cell={cellModel} onClick={mock} />);

    wrapper.simulate("click");

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
