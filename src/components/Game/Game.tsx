import React, { FC, useState, useEffect } from "react";
import { Settings, GameSettings } from "./Settings/Settings";
import { GameContainer } from "./Game.styles";

import Avatars, { SpriteCollection } from "@dicebear/avatars";
import { default as spritesMale } from "@dicebear/avatars-male-sprites";
import { default as spritesFemale } from "@dicebear/avatars-female-sprites";
import { default as spritesBottts } from "@dicebear/avatars-bottts-sprites";
import { Gender, withLoggedInUser } from "@/common/withLoggedInUser";
import { Redirect } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { RightSideLayout } from "./RightSideLayout";

interface User {
  name: string;
  gender: Gender;
  pic?: string;
}

export interface GameState {
  gameSettings: GameSettings;
  isSettingsVisible: boolean;
  isPlaying: boolean;
  isReset: boolean;
  user: User;
}

const GameInternal: FC<{
  userName?: string;
  userGender?: Gender;
  onLogout?: () => void;
}> = ({ userName, userGender, onLogout }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    gender: "robot" as Gender,
    pic: "",
  });
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    height: 350,
    width: 350,
    rowCount: 10,
    columnCount: 10,
    fillingPercent: 30,
    frequency: 1,
  });

  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName") ?? "";
    const gender = localStorage.getItem("userGender") as Gender;

    let sprite: SpriteCollection | undefined = undefined;
    switch (gender) {
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
      ? new Avatars(sprite, { base64: true }).create(name)
      : undefined;

    setUser({
      name,
      gender,
      pic: userPicSvg,
    });
  }, []);

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

  const onSubmitSettings = (settings: GameSettings) => {
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
          userName={user.name}
          isPlaying={isPlaying}
        />
        <RightSideLayout
          onClickSettings={onClickSettings}
          onReset={onReset}
          onLogout={onDoLogout}
          userPic={user.pic}
        />
      </GameContainer>
    </>
  );
};

export const Game = withLoggedInUser(GameInternal);
