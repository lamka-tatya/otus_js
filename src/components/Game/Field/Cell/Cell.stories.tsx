import { Cell, CellState, CellModel } from "./Cell";
import React, { FC } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

export const AliveCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.alive);
  const cellModel: CellModel = { cellState: cellState, row: 0, column: 0 };
  return <Cell cell={cellModel} onClick={action("Click")} />;
};

export const DeadCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.dead);
  const cellModel: CellModel = { cellState: cellState, row: 0, column: 0 };
  return <Cell cell={cellModel} onClick={action("Click")} />;
};

export const EmptyCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.empty);
  const cellModel: CellModel = { cellState: cellState, row: 0, column: 0 };
  return <Cell cell={cellModel} onClick={action("Click")} />;
};