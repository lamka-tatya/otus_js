import React, { FC, useCallback } from "react";
import { Cell } from "./Cell";
import { RowStyled, FieldStyled } from "./Field.styles";
import { CellRow } from "@models/CellRow";
import { CellState } from "@models/CellState";
import { connect } from "react-redux";
import { AppState } from "@/redux/store";
import { setField } from "@/redux/reducer/field";
import { GameSettings } from "@/redux/state/gameState";

export interface FieldProps {
  setField: (field: CellRow[]) => void;
  gameSettings: GameSettings;
  field: CellRow[];
}

const FieldInternal: FC<FieldProps> = ({ setField, gameSettings, field }) => {
  const onCellClick = useCallback(
    (colIndex: number, rowIndex: number) => {
      const newRows = [...field];
      const rowCells = [...newRows[rowIndex].cells];
      const cell = rowCells[colIndex];
      rowCells[colIndex] = { ...cell, cellState: CellState.alive };
      newRows[rowIndex] = { cells: rowCells };

      setField(newRows);
    },
    [field, setField]
  );
  return (
    <FieldStyled width={gameSettings.width} height={gameSettings.height}>
      {field.map((row, rowIndex) => (
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

const mapStateFromProps = (state: AppState) => ({
  field: state.field.rows,
  gameSettings: state.game.settings,
});

export const Field = connect(mapStateFromProps, { setField })(FieldInternal);
