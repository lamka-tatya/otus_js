import React, { Component, PureComponent } from "react";
import { CellStyled } from "./Cell.styles";

export enum CellState {
  alive = "alive",
  dead = "dead",
}

export interface CellModel {
  row: number;
  column: number;
  cellState: CellState;
}

export interface CellProps {
  cell: CellModel;
  onClick: (c: number, r: number) => void;
}

interface CellComponentState {
  cellState: CellState;
  newCellState: boolean;
}

export class Cell extends PureComponent<CellProps, CellComponentState> {
  state = {
    cellState: this.props.cell.cellState,
    newCellState: false,
  };

  componentDidUpdate(prevProps: CellProps) {
    if (this.props.cell.cellState !== prevProps.cell.cellState) {
      this.setState({ newCellState: true });
    } else if (
      this.props.cell.cellState === prevProps.cell.cellState &&
      this.state.newCellState
    ) {
      setTimeout(() => this.setState({ newCellState: false }), 300);
    }
  }

  render() {
    return (
      <CellStyled
        newCellState={this.state.newCellState}
        cellState={this.props.cell.cellState}
        onClick={() =>
          this.props.onClick(this.props.cell.column, this.props.cell.row)
        }
      ></CellStyled>
    );
  }
}
