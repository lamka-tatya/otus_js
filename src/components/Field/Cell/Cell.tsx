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
  state: CellState;
}

export interface CellProps {
  cell: CellModel;
  onClick: (c: number, r: number) => void;
}

export const Cell: FC<CellProps> = ({ cell, onClick }) => {
  const cssName = `cell cell-is-${cell.state}`;
  return (
    <button
      className={cssName}
      disabled={cell.state === CellState.empty}
      onClick={() => onClick(cell.column, cell.row)}
    ></button>
  );
};