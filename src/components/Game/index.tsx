import React, { FC, useState, useEffect } from "react";
import { Settings } from "./Settings";
import { GameContainer } from "./Game.styles";

import Avatars, { SpriteCollection } from "@dicebear/avatars";
import { default as spritesMale } from "@dicebear/avatars-male-sprites";
import { default as spritesFemale } from "@dicebear/avatars-female-sprites";
import { default as spritesBottts } from "@dicebear/avatars-bottts-sprites";
import { Redirect } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { RightSideLayout } from "./RightSideLayout";
import { withLoggedInUser } from "@/common/withLoggedInUser";
import { User } from "@models/User";
import { connect } from "react-redux";
import { AppState } from "@/redux/state";
import {
  setIsPlaying,
  setIsSettingsVisible,
  setIsReset,
  setUserpic,
  logout,
} from "@/redux/reducer/game";
import { GameSettings } from "@/redux/state/gameState";

interface GameProps {
  user?: User;
  onLogout?: () => void;
  isPlaying: boolean;
  setIsPlaying: (x: boolean) => void;
  setIsSettingsVisible: (x: boolean) => void;
  isReset: boolean;
  setIsReset: (x: boolean) => void;
  userpic: string;
  setUserpic: (x: string) => void;
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
  setUserpic,
  gameSettings,
  isLogout,
  logout,
}) => {
  const [] = useState(false);

  useEffect(() => {
    let sprite: SpriteCollection | undefined = undefined;
    switch (user?.gender) {
      case "robot":
        sprite = spritesBottts;
        break;
      case "male":
        sprite = spritesMale;
        break;
      case "female":
        sprite = spritesFemale;
        break;
    }

    const userPicSvg = !!sprite
      ? new Avatars(sprite, { base64: true }).create(user?.name ?? "")
      : "";

    setUserpic(userPicSvg);
  }, [user, setUserpic]);

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
  setUserpic,
  logout,
})(GameInternal);

export const Game = withLoggedInUser(connectedGame);
