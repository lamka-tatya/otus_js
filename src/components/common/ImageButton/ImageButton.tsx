import React, { FC } from "react";
import { ImageStyled, ButtonStyled } from "./ImageButton.styles";

export const ImageButton: FC<{
  src: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
}> = ({ src, type, onClick, disabled }) => (
  <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
    <ImageStyled src={src} disabled={disabled || false} />
  </ButtonStyled>
);
