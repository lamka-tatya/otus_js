import React, { FC } from "react";
import { ContainerStyled, LabelStyled, InputStyled } from "./Settings.styles";

export const Settings: FC<{
  initHeight: number;
  initWidth: number;
  onWidthChange: (w: number) => void;
  onHeightChange: (h: number) => void;
}> = ({ onHeightChange, onWidthChange, initHeight, initWidth }) => (
  <ContainerStyled>
    <ContainerStyled>
      <LabelStyled>Высота:</LabelStyled>
      <InputStyled
        key="height"
        type="number"
        value={initHeight}
        onChange={(event) => onHeightChange(Number(event.target.value))}
      ></InputStyled>
    </ContainerStyled>
    <ContainerStyled>
      <LabelStyled>Ширина:</LabelStyled>
      <InputStyled
        key="width"
        type="number"
        value={initWidth}
        onChange={(event) => onWidthChange(Number(event.target.value))}
      ></InputStyled>
    </ContainerStyled>
  </ContainerStyled>
);
