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

export interface CellRow {
  cells: CellModel[];
}

export interface FieldState {
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  rows: CellRow[];
}

const prepareCells: (fieldProps: FieldProps) => CellRow[] = (fieldProps) => {
  const result: CellRow[] = [];
  const cellsCount = fieldProps.columnCount * fieldProps.rowCount;
  const maxAliveCount = (cellsCount / 100) * fieldProps.fillingPercent;
  let aliveCount = 0;

  for (let y = 0; y < fieldProps.rowCount; y++) {
    const rowCells: CellModel[] = [];

    for (let x = 0; x < fieldProps.columnCount; x++) {
      let cellState = CellState.dead;

      if (Math.round(Math.random() * 100) <= fieldProps.fillingPercent) {
        aliveCount++;
        if (aliveCount <= maxAliveCount) {
          cellState = CellState.alive;
        }
      }

      rowCells.push({
        cellState,
      });
    }
    result.push({ cells: rowCells });
  }

  return result;
};

export class Field extends React.Component<FieldProps, FieldState> {
  state = {
    rowCount: this.props.rowCount,
    columnCount: this.props.columnCount,
    fillingPercent: this.props.fillingPercent,
    rows: prepareCells(this.props),
  };

  onCellClick = (colIndex: number, rowIndex: number) => {
    const rows = [...this.state.rows];
    const rowCells = [...rows[rowIndex].cells];
    const cell = rowCells[colIndex];
    rowCells[colIndex] = { ...cell, cellState: CellState.alive };
    rows[rowIndex] = { cells: rowCells };

    this.setState({ rows });
  };

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
        rows: prepareCells(props),
      };
    }

    return null;
  }

  render() {
    return (
      <FieldStyled width={this.props.width} height={this.props.height}>
        {this.state.rows.map((row, rowIndex) => (
          <RowStyled key={rowIndex}>
            {row.cells.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                cell={{ cellState: cell.cellState }}
                onClick={() => this.onCellClick(colIndex, rowIndex)}
              />
            ))}
          </RowStyled>
        ))}
      </FieldStyled>
    );
  }
}
