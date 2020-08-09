import React from "react";
import { CellStyled } from "./Cell.styles";
import { CellState } from "@models/CellState";
import { CellModel } from "@models/CellModel";

export interface CellProps {
  cell: CellModel;
  cellHeight: number;
  cellWidth: number;
  onClick: () => void;
}

interface CellComponentState {
  cellState: CellState;
  newCellState: boolean;
}

export class Cell extends React.Component<CellProps, CellComponentState> {
  state = {
    cellState: this.props.cell.cellState,
    newCellState: this.props.cell.isNewState,
  };

  componentDidUpdate(prevProps: CellProps) {
    if (this.props.cell.cellState !== prevProps.cell.cellState) {
      this.setState({ newCellState: true });
    } else if (
      this.props.cell.cellState === prevProps.cell.cellState &&
      this.state.newCellState
    ) {
      setTimeout(() => this.setState({ newCellState: false }), 20);
    }
  }

  render() {
    return (
      <CellStyled
        newCellState={this.state.newCellState}
        cellState={this.props.cell.cellState}
        cellHeight={this.props.cellHeight}
        cellWidth={this.props.cellWidth}
        onClick={this.props.onClick}
      ></CellStyled>
    );
  }
}
