import React, { FC, useState, useEffect, useCallback } from "react";
import { Cell } from "./Cell";
import { RowStyled, FieldStyled } from "./Field.styles";
import { CellRow } from "@models/CellRow";
import { CellModel } from "@models/CellModel";
import { CellState } from "@models/CellState";

export interface FieldProps {
  rowCount: number;
  columnCount: number;
  fillingPercent: number;
  height: number;
  width: number;
  frequency: number;
  isPlaying: boolean;
  isReset: boolean;
  afterReset: () => void;
}

const prepareCells: (
  columnCount: number,
  rowCount: number,
  fillingPercent: number
) => CellRow[] = (columnCount, rowCount, fillingPercent) => {
  const result: CellRow[] = [];
  const cellsCount = columnCount * rowCount;
  const maxAliveCount = (cellsCount / 100) * fillingPercent;
  let aliveCount = 0;

  for (let y = 0; y < rowCount; y++) {
    const rowCells: CellModel[] = [];

    for (let x = 0; x < columnCount; x++) {
      let cellState = CellState.dead;

      if (Math.round(Math.random() * 100) <= fillingPercent) {
        aliveCount++;
        if (aliveCount <= maxAliveCount) {
          cellState = CellState.alive;
        }
      }

      rowCells.push({
        cellState,
        isNewState: false,
      });
    }
    result.push({ cells: rowCells });
  }

  return result;
};

export const Field: FC<FieldProps> = ({
  rowCount,
  columnCount,
  fillingPercent,
  height,
  width,
  frequency,
  isPlaying,
  isReset,
  afterReset,
}) => {
  const [rows, setRows] = useState<CellRow[]>([]);

  useEffect(() => {
    setRows(prepareCells(columnCount, rowCount, fillingPercent));

    isReset && afterReset();
  }, [columnCount, rowCount, fillingPercent, isReset, afterReset]);

  const onCellClick = useCallback(
    (colIndex: number, rowIndex: number) => {
      const newRows = [...rows];
      const rowCells = [...newRows[rowIndex].cells];
      const cell = rowCells[colIndex];
      rowCells[colIndex] = { ...cell, cellState: CellState.alive };
      newRows[rowIndex] = { cells: rowCells };

      setRows(newRows);
    },
    [rows, setRows]
  );

  return (
    <FieldStyled width={width} height={height}>
      {rows.map((row, rowIndex) => (
        <RowStyled key={rowIndex}>
          {row.cells.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              cell={{ cellState: cell.cellState, isNewState: false }}
              onClick={() => onCellClick(colIndex, rowIndex)}
            />
          ))}
        </RowStyled>
      ))}
    </FieldStyled>
  );
};
