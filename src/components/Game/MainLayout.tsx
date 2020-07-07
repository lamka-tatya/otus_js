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
import { GameSettings } from "@/redux/state/gameState";

export const MainLayout: FC<{
  gameSettings: GameSettings;
  isReset: boolean;
  afterReset: () => void;
  onClickPlayPause: () => void;
  userName: string;
  isPlaying: boolean;
}> = ({
  gameSettings,
  isReset,
  afterReset,
  onClickPlayPause,
  userName,
  isPlaying,
}) => (
  <MainContainer>
    <FieldContainer>
      <Field
        key="field"
        {...gameSettings}
        isReset={isReset}
        afterReset={afterReset}
        isPlaying={isPlaying}
      />
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
