import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { CellState } from "./Cell";
import { SerializedStyles } from "@emotion/serialize";

const aliveStyle = css`
  border-color: green;
  background: green;
`;

const deadStyle = css`
  border-color: red;
  background: red;
`;

const emptyStyle = css`
  border-color: grey;
  opacity: 0.5;
`;

const getStyle: (cellState: CellState) => SerializedStyles = (cellState) => {
  switch (cellState) {
    case CellState.alive:
      return aliveStyle;
    case CellState.dead:
      return deadStyle;
    case CellState.empty:
      return emptyStyle;
    default:
      throw TypeError("Unknown cell state");
  }
};

export const CellStyled = styled.button<{ state: CellState }>`
  width: 25px;
  height: 25px;
  border: 1px solid;
  display: inline-block;
  border-radius: 25px;
  line-height: 25px;
  margin: 5px;

  ${(props) => getStyle(props.state)};
`;
