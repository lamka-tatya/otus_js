import React, { FC } from "react";
import { CellStyled } from "./Cell.styles";

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
  return (
    <CellStyled
      state={cell.state}
      disabled={cell.state === CellState.empty}
      onClick={() => onClick(cell.column, cell.row)}
    ></CellStyled>
  );
};
