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

const newCellStateStyle = css`
  opacity: 0.7;
`;

export const CellStyled = styled.button<{
  cellState: CellState;
  newCellState: boolean;
}>`
  width: 25px;
  height: 25px;
  border: 1px solid;
  display: inline-block;
  border-radius: 25px;
  line-height: 25px;
  margin: 5px;
  cursor: pointer;
  outline: none;

  ${(props) => getStyle(props.cellState)};

  ${(props) => (props.newCellState ? newCellStateStyle : null)};
`;
