import { ImageButton } from "@/common/ImageButton/ImageButton";
import React, { FC } from "react";
import {
  RightSideContainer,
  SettingsContainer,
  ImageStyled,
} from "./Game.styles";
import SettingsImg from "./assets/settings_svg.svg";

import LogoutImg from "./assets/reset.svg";
import ResetImg from "./assets/recycle.svg";

export const RightSideLayout: FC<{
  onClickSettings: () => void;
  onReset: () => void;
  onLogout: () => void;
  userPic?: string;
}> = ({ onClickSettings, onReset, onLogout, userPic }) => (
  <RightSideContainer>
    <SettingsContainer>
      <ImageButton
        key="settingsBtn"
        src={SettingsImg}
        type="button"
        title="Settings"
        onClick={onClickSettings}
      ></ImageButton>
      <ImageButton
        key="resetBtn"
        src={ResetImg}
        type="button"
        title="Reset field"
        onClick={onReset}
      ></ImageButton>
      <ImageButton
        key="logoutBtn"
        src={LogoutImg}
        type="button"
        title="Quit"
        onClick={onLogout}
      ></ImageButton>
    </SettingsContainer>
    {userPic && <ImageStyled src={userPic}></ImageStyled>}
  </RightSideContainer>
);
