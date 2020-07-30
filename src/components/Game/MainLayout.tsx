import React, { FC } from "react";
import {
  MainContainer,
  BottomContainer,
  ButtonsContainer,
  FieldContainer,
} from "./Game.styles";
import { Field } from "./Field";
import { ImageButton } from "@/common/ImageButton";
import PlayImg from "./assets/play_pause.svg";
import BackImg from "./assets/back.svg";
import ForwardImg from "./assets/forward.svg";

export const MainLayout: FC<{
  onClickPlayPause: () => void;
  userName: string;
}> = ({ onClickPlayPause, userName }) => (
  <MainContainer>
    <FieldContainer>
      <Field key="field" />
    </FieldContainer>
    <BottomContainer>
      <ButtonsContainer>
        <ImageButton
          src={BackImg}
          type="button"
          disabled={true}
          title="Previous state"
        ></ImageButton>
        <ImageButton
          key="playBtn"
          src={PlayImg}
          type="button"
          title="Play"
          onClick={onClickPlayPause}
        ></ImageButton>
        <ImageButton
          src={ForwardImg}
          type="button"
          title="Next state"
          disabled={true}
        ></ImageButton>
      </ButtonsContainer>
      {userName}
    </BottomContainer>
  </MainContainer>
);
