import React, { FC } from "react";
import "./Cell.css";

export enum CellState {
  empty = "empty",
  alive = "alive",
  dead = "dead",
}

export interface CellProps {
  // x: number;
  // y: number;
  cellState: CellState;
}

export const Cell: FC<CellProps> = ({ cellState }) => {
  const cssName = `cell cell-is-${cellState}`;
  return <div className={cssName}></div>;
};
