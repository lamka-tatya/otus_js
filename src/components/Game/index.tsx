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
  setIsReset,
  logout,
} from "@/redux/reducer/game";
import { GameSettings } from "@/redux/state/gameState";
import { AppState } from "@/redux/store";

interface GameProps {
  user?: User;
  onLogout?: () => void;
  isPlaying: boolean;
  setIsPlaying: (x: boolean) => void;
  setIsSettingsVisible: (x: boolean) => void;
  isReset: boolean;
  setIsReset: (x: boolean) => void;
  userpic: string;
  gameSettings: GameSettings;
  isLogout: boolean;
  logout: (v: string) => void;
}

const GameInternal: FC<GameProps> = ({
  user,
  onLogout,
  isPlaying,
  setIsPlaying,
  setIsSettingsVisible,
  isReset,
  setIsReset,
  userpic,
  gameSettings,
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
    setIsReset(true);
  };

  const afterReset = () => {
    setIsReset(false);
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
          gameSettings={gameSettings}
          isReset={isReset}
          afterReset={afterReset}
          onClickPlayPause={onClickPlayPause}
          userName={user?.name ?? ""}
          isPlaying={isPlaying}
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
  isReset: state.game.isReset,
  userpic: state.game.userpic,
  gameSettings: state.game.settings,
  user: state.auth.user,
});

const connectedGame = connect(mapStateFromProps, {
  setIsPlaying,
  setIsSettingsVisible,
  setIsReset,
  logout,
})(GameInternal);

export const Game = withLoggedInUser(connectedGame);
