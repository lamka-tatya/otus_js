import React, { Component, PureComponent } from "react";
import { CellStyled } from "./Cell.styles";

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
      this.setState({ ...this.state, newCellState: true });
    } else if (
      this.props.cell.cellState === prevProps.cell.cellState &&
      this.state.newCellState
    ) {
      setTimeout(
        () => this.setState({ ...this.state, newCellState: false }),
        300
      );
    }
  }

  render() {
    return (
      <CellStyled
        newCellState={this.state.newCellState}
        cellState={this.props.cell.cellState}
        disabled={this.props.cell.cellState === CellState.empty}
        onClick={() =>
          this.props.onClick(this.props.cell.column, this.props.cell.row)
        }
      ></CellStyled>
    );
  }
}
