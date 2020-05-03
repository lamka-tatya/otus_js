import React, { FC } from "react";
import "./Field.css";
import { Cell, CellState, CellModel } from "./Cell/Cell";

export interface FieldProps {
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
}

export interface FieldState {
  cells: CellModel[];
}

class Field extends React.Component<FieldProps, FieldState> {
  prepareCells(props: FieldProps): CellModel[] {
    const result: CellModel[] = [];

    for (let x = 0; x < props.columnCount; x++) {
      for (let y = 0; y < props.rowCount; y++) {
        // todo: handle emptyPercent
        result.push({
          row: y,
          column: x,
          state: y % 2 === 0 ? CellState.dead : CellState.empty,
        });
      }
    }

    return result;
  }

  constructor(props: FieldProps) {
    super(props);
    this.state = {
      cells: this.prepareCells(props),
    };

    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(col: number, row: number) {
    const cellIndex = this.state.cells.findIndex(
      (x) => x.column === col && x.row === row
    );

    if (cellIndex !== -1) {
      const cells = [...this.state.cells];
      cells[cellIndex] = {
        ...this.state.cells[cellIndex],
        state: CellState.alive,
      };

      this.setState({
        cells,
      });
    }
  }

  getRow(row: number) {
    const cells = [];

    for (let col = 0; col < this.props.columnCount; col++) {
      const cell = this.state.cells.find(
        (c) => c.column === col && c.row === row
      );

      if (!cell) {
        throw TypeError("Unexpected error");
      }

      const cellModel: CellModel = { column: col, row: row, state: cell.state };

      cells.push(
        <Cell key={col} cell={cellModel} onClick={this.onCellClick} />
      );
    }

    return cells;
  }

  render() {
    const rows: JSX.Element[] = [];

    for (let row = 0; row < this.props.rowCount; row++) {
      rows.push(
        <div className="field-row" key={row}>
          {this.getRow(row)}
        </div>
      );
    }

    return <div className="field">{rows}</div>;
  }
}

export default Field;
