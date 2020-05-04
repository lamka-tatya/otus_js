import styled from "@emotion/styled";

export const FieldStyled = styled.div<{ height: number; width: number }>`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  display: flex;
  flex-direction: column;
  align-items: start;
  border: 1px solid;
  overflow: overlay;
`;

export const RowStyled = styled.div`
  display: flex;
  align-items: start;
`;
