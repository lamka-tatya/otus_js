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
import { AppState } from "@/redux/store";

const mapStateToProps = (state: AppState) => ({
  isPlaying: state.game.isPlaying,
  isLogout: state.game.isLogout,
  userpic: state.game.userpic,
  user: state.auth.user,
});

const mapDispatchToProps = {
  setIsPlaying,
  setIsSettingsVisible,
  reset,
  logout,
};

type GameProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { onLogout?: any };

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
    logout();
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

const connectedGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameInternal);

export const Game = withLoggedInUser(connectedGame);
