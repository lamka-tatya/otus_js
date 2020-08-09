import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { SerializedStyles } from "@emotion/serialize";
import { CellState } from "@models/CellState";

const aliveStyle = css`
  border-color: green;
  background: green;
`;

const deadStyle = css`
  border-color: grey;
  opacity: 0.5;
`;

const getStyle: (cellState: CellState) => SerializedStyles = (cellState) => {
  switch (cellState) {
    case CellState.alive:
      return aliveStyle;
    case CellState.dead:
      return deadStyle;
    default:
      throw TypeError("Unknown cell state");
  }
};

const newCellAliveStateStyle = css`
  border-color: #02a702;
  background: #02a702;
`;

const newCellDeadStateStyle = css`
  border-color: #025402;
  background: #025402;
  opacity: 1;
`;

export const CellStyled = styled.button<{
  cellState: CellState;
  newCellState: boolean;
  cellWidth: number;
  cellHeight: number;
}>`
  width: ${(props) => props.cellWidth}px;
  height: ${(props) => props.cellHeight}px;
  border: 1px solid;
  display: inline-block;
  border-radius: 20px;
  line-height: 25px;
  margin: 2px;
  cursor: pointer;
  outline: none;

  ${(props) => getStyle(props.cellState)};

  ${(props) =>
    props.newCellState
      ? props.cellState === CellState.alive
        ? newCellAliveStateStyle
        : newCellDeadStateStyle
      : null};
`;
