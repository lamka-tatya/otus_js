import { mount } from "enzyme";
import { Field } from "./Field";
import React from "react";

describe("Field is rendered with 2 columns and 2 rows", () => {
  it("should has 4 cells", () => {
    const wrapper = mount(
      <Field
        frequency={0}
        isPlaying={false}
        width={200}
        height={200}
        columnCount={2}
        fillingPercent={0}
        rowCount={2}
        isReset={false}
        afterReset={jest.fn()}
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
        frequency={0}
        isPlaying={false}
        width={200}
        height={200}
        columnCount={1}
        fillingPercent={0}
        rowCount={1}
        isReset={false}
        afterReset={jest.fn()}
      />
    );
    const deadCell = wrapper.find("button");

    deadCell.simulate("click");

    const cell = wrapper.find("button");
    expect(
      (cell.instance() as any).className.indexOf("aliveStyle")
    ).toBeGreaterThanOrEqual(0);
  });
});

describe("Field is rendered due to reset", () => {
  it("should call afterReset function", () => {
    const mock = jest.fn();
    const wrapper = mount(
      <Field
        frequency={0}
        isPlaying={false}
        width={200}
        height={200}
        columnCount={1}
        fillingPercent={0}
        rowCount={1}
        isReset={true}
        afterReset={mock}
      />
    );

    expect(mock).toBeCalledTimes(1);
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
          frequency={0}
          isPlaying={false}
          width={200}
          height={200}
          columnCount={10}
          fillingPercent={percent}
          rowCount={10}
          isReset={false}
          afterReset={jest.fn()}
        />
      );

      const aliveCellsCount = wrapper
        .find("button")
        .filter(
          (x) => (x as any).instance().className.indexOf("aliveStyle") >= 0
        ).length;

      expect(aliveCellsCount).toBeLessThanOrEqual(maxAliveCount);
    }
  );
});
