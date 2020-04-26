import { Cell, CellState } from "./Cell";
import React, { FC } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

export const AliveCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.alive);
  return <Cell cellState={cellState} />;
};

export const DeadCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.dead);
  return <Cell cellState={cellState} />;
};

export const EmptyCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.empty);
  return <Cell cellState={cellState} />;
};
