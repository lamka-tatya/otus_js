import { shallow } from "enzyme";
import { Cell, CellState, CellModel } from "./Cell";
import React from "react";

describe("Cell is rendered", () => {
  it("when cell is alive", () => {
    const cellModel: CellModel = { state: CellState.alive, row: 0, column: 0 };
    const html = shallow(<Cell cell={cellModel} onClick={jest.fn()} />).html();

    expect(html).toBe('<button class="cell cell-is-alive"></button>');
  });

  it("when cell is dead", () => {
    const cellModel: CellModel = { state: CellState.dead, row: 0, column: 0 };
    const html = shallow(<Cell cell={cellModel} onClick={jest.fn()} />).html();

    expect(html).toBe('<button class="cell cell-is-dead"></button>');
  });

  it("when cell is empty", () => {
    const cellModel: CellModel = { state: CellState.empty, row: 0, column: 0 };
    const html = shallow(<Cell cell={cellModel} onClick={jest.fn()} />).html();

    expect(html).toBe(
      '<button class="cell cell-is-empty" disabled=""></button>'
    );
  });
});

describe("When click on cell", () => {
  it("should call handler with row and column numbers", () => {
    const mock = jest.fn();
    const cellModel: CellModel = { state: CellState.dead, row: 4, column: 44 };
    const wrapper = shallow(<Cell cell={cellModel} onClick={mock} />);

    wrapper.simulate("click");

    expect(mock).toBeCalledWith(44, 4);
  });
});
