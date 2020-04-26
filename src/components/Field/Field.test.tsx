import { mount, render } from "enzyme";
import Field from "./Field";
import React from "react";

describe("Field is rendered with 2 columns and 2 rows", () => {
  it("should has 4 cells", () => {
    const wrapper = render(
      <Field columnCount={2} emptyPercent={0} rowCount={2} />
    );
    const cells = wrapper.find("div.cell");

    expect(cells.length).toBe(4);
  });
});
