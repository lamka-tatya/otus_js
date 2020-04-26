import React, { FC } from "react";
import "./Cell.css";

export enum CellState {
  empty = "empty",
  alive = "alive",
  dead = "dead",
}

export interface CellModel {
  row: number;
  column: number;
  cellState: CellState;
}

export const Cell: FC<CellModel> = ({ cellState, column, row }) => {
  const cssName = `cell cell-is-${cellState}`;
  return <div className={cssName}></div>;
};
