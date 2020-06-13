import React, { FC } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Cell } from ".";
import { CellState } from "@models/CellState";
import { CellModel } from "@models/CellModel";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

export const AliveCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.alive);
  const cellModel: CellModel = { cellState: cellState, isNewState: false };
  return <Cell cell={cellModel} onClick={action("Click")} />;
};

export const DeadCellStory: FC = () => {
  const cellState = select("Cell state", CellState, CellState.dead);
  const cellModel: CellModel = { cellState: cellState, isNewState: false };
  return <Cell cell={cellModel} onClick={action("Click")} />;
};
