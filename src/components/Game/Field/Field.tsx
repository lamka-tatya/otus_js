import React, { FC } from "react";
import { Cell, CellState, CellModel } from "./Cell/Cell";
import { RowStyled, FieldStyled } from "./Field.styles";

export interface FieldProps {
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  height: number;
  width: number;
}

export interface FieldState {
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  cells: CellModel[];
}

const prepareCells: (fieldProps: FieldProps) => CellModel[] = (fieldProps) => {
  const result: CellModel[] = [];
  const cellsCount = fieldProps.columnCount * fieldProps.rowCount;
  const maxAliveCount = (cellsCount / 100) * fieldProps.fillingPercent;
  let aliveCount = 0;

  for (let x = 0; x < fieldProps.columnCount; x++) {
    for (let y = 0; y < fieldProps.rowCount; y++) {
      let cellState = CellState.dead;

      if (Math.round(Math.random() * 100) <= fieldProps.fillingPercent) {
        aliveCount++;
        if (aliveCount <= maxAliveCount) {
          cellState = CellState.alive;
        }
      }

      result.push({
        row: y,
        column: x,
        cellState,
      });
    }
  }

  return result;
};

export class Field extends React.Component<FieldProps, FieldState> {
  state = {
    rowCount: this.props.rowCount,
    columnCount: this.props.columnCount,
    fillingPercent: this.props.fillingPercent,
    cells: prepareCells(this.props),
  };

  onCellClick = (col: number, row: number) => {
    const cellIndex = this.state.cells.findIndex(
      (x) => x.column === col && x.row === row
    );

    if (cellIndex !== -1) {
      const cells = [...this.state.cells];
      cells[cellIndex] = {
        ...this.state.cells[cellIndex],
        cellState: CellState.alive,
      };

      this.setState({ cells });
    }
  };

  getRow(row: number) {
    const cells = [];

    for (let col = 0; col < this.props.columnCount; col++) {
      const cell = this.state.cells.find(
        (c) => c.column === col && c.row === row
      );

      if (!cell) {
        throw TypeError("Unexpected error");
      }

      const cellModel: CellModel = {
        column: col,
        row: row,
        cellState: cell.cellState,
      };

      cells.push(
        <Cell key={col} cell={cellModel} onClick={this.onCellClick} />
      );
    }

    return cells;
  }

  static getDerivedStateFromProps(props: FieldProps, state: FieldState) {
    if (
      state.columnCount !== props.columnCount ||
      state.rowCount !== props.rowCount ||
      state.fillingPercent !== props.fillingPercent
    ) {
      return {
        rowCount: props.rowCount,
        columnCount: props.columnCount,
        fillingPercent: props.fillingPercent,
        cells: prepareCells(props),
      };
    }

    return null;
  }

  render() {
    const rows: JSX.Element[] = [];

    for (let row = 0; row < this.props.rowCount; row++) {
      rows.push(<RowStyled key={row}>{this.getRow(row)}</RowStyled>);
    }

    return (
      <FieldStyled width={this.props.width} height={this.props.height}>
        {rows}
      </FieldStyled>
    );
  }
}
