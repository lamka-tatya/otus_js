import React, { FC } from "react";
import "./Cell.css";

export enum CellState {
  empty = "empty",
  alive = "alive",
  dead = "dead",
}

export interface Cell {
  row: number;
  column: number;
  cellState: CellState;
}

export const Cell: FC<Cell> = ({ cellState }) => {
  const cssName = `cell cell-is-${cellState}`;
  return <div className={cssName}></div>;
};
