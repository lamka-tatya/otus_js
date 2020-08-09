import React, { FC, useCallback } from "react";
import { Cell } from "./Cell";
import { RowStyled, FieldStyled } from "./Field.styles";
import { connect } from "react-redux";
import { AppState } from "@/redux/store";
import {
  setField,
  makeCellAlive,
  getCellHeight,
  getCellWidth,
} from "@/redux/reducer/game";

const mapStateToProps = (state: AppState) => ({
  field: state.game.field,
  gameSettings: state.game.settings,
  cellHeight: getCellHeight(state),
  cellWidht: getCellWidth(state),
});

const mapDispatchToProps = { setField, makeCellAlive };

export type FieldProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const FieldInternal: FC<FieldProps> = ({
  setField,
  makeCellAlive,
  gameSettings,
  field,
  cellHeight,
  cellWidht,
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
              cellHeight={cellHeight}
              cellWidth={cellWidht}
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
