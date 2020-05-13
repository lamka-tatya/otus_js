import React, { FC } from "react";
import { Cell, CellState, CellModel } from "./Cell/Cell";
import { RowStyled, FieldStyled } from "./Field.styles";

export interface FieldProps {
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
  height: number;
  width: number;
}

export interface FieldState {
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
  cells: CellModel[];
}

const prepareCells: (fieldProps: FieldProps) => CellModel[] = (fieldProps) => {
  const result: CellModel[] = [];

  for (let x = 0; x < fieldProps.columnCount; x++) {
    for (let y = 0; y < fieldProps.rowCount; y++) {
      // todo: handle emptyPercent
      result.push({
        row: y,
        column: x,
        cellState: y % 2 === 0 ? CellState.dead : CellState.empty,
      });
    }
  }

  return result;
};

export class Field extends React.Component<FieldProps, FieldState> {
  state = {
    rowCount: this.props.rowCount,
    columnCount: this.props.columnCount,
    emptyPercent: this.props.emptyPercent,
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
      state.emptyPercent !== props.emptyPercent
    ) {
      return {
        rowCount: props.rowCount,
        columnCount: props.columnCount,
        emptyPercent: props.emptyPercent,
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
