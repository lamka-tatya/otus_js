import React, { FC, useState } from "react";
import { Settings } from "./Settings";
import { GameContainer } from "./Game.styles";

import { Redirect } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { RightSideLayout } from "./RightSideLayout";
import { withLoggedInUser } from "@/common/withLoggedInUser";
import { User } from "@models/User";
import { connect } from "react-redux";
import {
  setIsPlaying,
  setIsSettingsVisible,
  reset,
  logout,
} from "@/redux/reducer/game";
import { GameSettings } from "@/redux/state/gameState";
import { AppState } from "@/redux/store";

interface GameProps {
  user?: User;
  onLogout?: any;
  isPlaying: boolean;
  setIsPlaying: (x: boolean) => void;
  setIsSettingsVisible: (x: boolean) => void;
  reset: any;
  userpic: string;
  isLogout: boolean;
  logout: any;
}

const GameInternal: FC<GameProps> = ({
  user,
  onLogout,
  isPlaying,
  setIsPlaying,
  setIsSettingsVisible,
  reset,
  userpic,
  isLogout,
  logout,
}) => {
  const [] = useState(false);

  const onClickPlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onClickSettings = () => {
    setIsSettingsVisible(true);
  };

  const onReset = () => {
    reset();
  };

  const onDoLogout = () => {
    onLogout && onLogout();
    logout("");
  };

  return isLogout ? (
    <Redirect to="/" push={true} />
  ) : (
    <>
      <Settings key="settingsWindow" />
      <GameContainer>
        <MainLayout
          onClickPlayPause={onClickPlayPause}
          userName={user?.name ?? ""}
        />
        <RightSideLayout
          onClickSettings={onClickSettings}
          onReset={onReset}
          onLogout={onDoLogout}
          userPic={userpic}
        />
      </GameContainer>
    </>
  );
};

const mapStateFromProps = (state: AppState) => ({
  isPlaying: state.game.isPlaying,
  isLogout: state.game.isLogout,
  userpic: state.game.userpic,
  user: state.auth.user,
});

const connectedGame = connect(mapStateFromProps, {
  setIsPlaying,
  setIsSettingsVisible,
  reset,
  logout,
})(GameInternal);

export const Game = withLoggedInUser(connectedGame);
