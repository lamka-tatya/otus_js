import React, { FC, useCallback } from "react";
import { Cell } from "./Cell";
import { RowStyled, FieldStyled } from "./Field.styles";
import { connect } from "react-redux";
import { AppState } from "@/redux/store";
import { setField, makeCellAlive } from "@/redux/reducer/game";

const mapStateToProps = (state: AppState) => ({
  field: state.game.field,
  gameSettings: state.game.settings,
});

const mapDispatchToProps = { setField, makeCellAlive };

export type FieldProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const FieldInternal: FC<FieldProps> = ({
  setField,
  makeCellAlive,
  gameSettings,
  field,
}) => {
  const onCellClick = useCallback(
    (colIndex: number, rowIndex: number) => {
      makeCellAlive({ colIndex, rowIndex });
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

export const Field = connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldInternal);
