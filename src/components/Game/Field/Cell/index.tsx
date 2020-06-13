import React, { Component, PureComponent } from "react";
import { CellStyled } from "./Cell.styles";
import { CellModel, CellState } from "@/redux/state";

export interface CellProps {
  cell: CellModel;
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
      setTimeout(() => this.setState({ newCellState: false }), 300);
    }
  }

  render() {
    return (
      <CellStyled
        newCellState={this.state.newCellState}
        cellState={this.props.cell.cellState}
        onClick={this.props.onClick}
      ></CellStyled>
    );
  }
}
