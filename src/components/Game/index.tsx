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
import { GameSettingsState } from "@/redux/state";
import { withLoggedInUser } from "@/common/withLoggedInUser";
import { User } from "@models/User";

const GameInternal: FC<{
  user?: User;
  onLogout?: () => void;
}> = ({ user, onLogout }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [userpic, setUserpic] = useState("");
  const [gameSettings, setGameSettings] = useState<GameSettingsState>({
    height: 350,
    width: 350,
    rowCount: 10,
    columnCount: 10,
    fillingPercent: 30,
    frequency: 1,
  });

  const [isLogout, setIsLogout] = useState(false);

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

  const onCancelSettings = () => {
    setIsSettingsVisible(false);
  };

  const onSubmitSettings = (settings: GameSettingsState) => {
    setGameSettings(settings);
    setIsSettingsVisible(false);
  };

  const onDoLogout = () => {
    onLogout && onLogout();
    setIsLogout(true);
  };

  return isLogout ? (
    <Redirect to="/" push={true} />
  ) : (
    <>
      <Settings
        key="settingsWindow"
        visible={isSettingsVisible}
        settings={gameSettings}
        onSubmit={onSubmitSettings}
        onCancel={onCancelSettings}
      />
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

export const Game = withLoggedInUser(GameInternal);
