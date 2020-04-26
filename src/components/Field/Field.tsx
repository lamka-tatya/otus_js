import React, { FC } from "react";
import "./Field.css";
import { Cell, CellState, CellModel } from "./Cell/Cell";

export interface FieldProps {
  rowCount: number;
  columnCount: number;
  emptyPercent: number;
}

interface FieldState {
  cells: CellModel[];
}

class Field extends React.Component<FieldProps, FieldState> {
  prepareCells(props: FieldProps): CellModel[] {
    const result: CellModel[] = [];

    for (let x = 0; x < props.columnCount; x++) {
      for (let y = 0; y < props.rowCount; y++) {
        // todo: handle emptyPercent
        result.push({ row: y, column: x, cellState: CellState.dead });
      }
    }

    return result;
  }

  constructor(props: FieldProps) {
    super(props);
    this.state = {
      cells: this.prepareCells(props),
    };
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

      cells.push(
        <Cell key={col} row={row} column={col} cellState={cell.cellState} />
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
